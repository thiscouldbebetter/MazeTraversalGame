
class Display
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;

		this.colorFore = "Gray";
		this.colorHighlight = "White";
		this.colorLowlight = "DarkGray";
		this.colorBack = "Black";

		this._drawPos = new Coords();
		this._sizeHalf = new Coords();
	}

	drawBackground(color)
	{
		this.drawRectangleOfSizeAtPosWithColorsFillAndBorder
		(
			this.sizeInPixels,
			Coords.zeroes(),
			color,
			null // colorBorder
		);
	}

	drawRectangleOfSizeAtPosWithColorsFillAndBorder
	(
		size, pos, colorFill, colorBorder
	)
	{
		var g = this.graphics;

		if (colorFill != null)
		{
			g.fillStyle = colorFill.systemColor;
			g.fillRect
			(
				pos.x, pos.y,
				size.x, size.y
			);
		}

		if (colorBorder != null)
		{
			g.strokeStyle = colorBorder.systemColor;
			g.strokeRect(pos.x, pos.y, size.x, size.y);
		}
	}

	drawRectangleOfSizeWithCenterAndColorsFillAndBorder
	(
		size, pos, colorFill, colorBorder
	)
	{
		var sizeHalf =
			this._sizeHalf.overwriteWith(size).half();
		var drawPos =
			this._drawPos.overwriteWith(pos).subtract(sizeHalf);

		this.drawRectangleOfSizeAtPosWithColorsFillAndBorder
		(
			size, drawPos, colorFill, colorBorder
		);
	}

	initialize()
	{
		var d = document;
		var canvas = d.createElement("canvas");
		canvas.width = this.sizeInPixels.x;
		canvas.height = this.sizeInPixels.y;
		var divDisplay = d.getElementById("divDisplay");
		divDisplay.appendChild(canvas);

		this.graphics = canvas.getContext("2d");
	}
}
