
class Display
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;

		this.colorFore = "Gray";
		this.colorHighlight = "White";
		this.colorLowlight = "DarkGray";
		this.colorBack = "Black";
	}

	drawBackground(color)
	{
		this.drawRectangleAtPosWithSizeAndColorsFillAndBorder
		(
			Coords.zeroes(),
			this.sizeInPixels,
			this.colorBack,
			null // colorBorder
		);
	}

	drawRectangleAtPosWithSizeAndColorsFillAndBorder
	(
		pos, size, colorFill, colorBorder
	)
	{
		var g = this.graphics;

		if (colorFill != null)
		{
			g.fillStyle = colorFill;
			g.fillRect(pos.x, pos.y, size.x, size.y);
		}

		if (colorBorder != null)
		{
			g.strokeStyle = colorBorder;
			g.strokeRect(pos.x, pos.y, size.x, size.y);
		}
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
