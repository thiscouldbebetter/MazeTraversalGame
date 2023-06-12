
class Display
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;

		this.colorFore = "Gray";
		this.colorHighlight = "White";
		this.colorLowlight = "DarkGray";
		this.colorBack = "Black";

		this.sizeInPixelsHalf = this.sizeInPixels.clone().half();

		this._sizeHalf = new Coords();
		this._drawPos = new Coords();
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

	// Drawing.

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

	drawCircleWithCenterRadiusAndColor(center, radius, color)
	{
		var g = this.graphics;
		g.fillStyle = color.systemColor;
		g.beginPath();
		g.arc
		(
			center.x, center.y, radius, 0, Math.PI * 2
		);
		g.fill();
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

	drawTextWithFontHeightAndColorAtCenterPos
	(
		text, fontName, heightInPixels, color, centerPos
	)
	{
		var g = this.graphics;

		var sizeAndFontAsString = heightInPixels + "px " + fontName;
		g.font = sizeAndFontAsString;

		var textWidth = g.measureText(text).width;

		var drawPos = this._drawPos.overwriteWith
		(
			centerPos
		).addXY
		(
			0 - textWidth / 2, 0 // - heightInPixels / 2 // ?
		);

		g.fillStyle = color.systemColor;

		g.fillText(text, drawPos.x, drawPos.y);
	}

}
