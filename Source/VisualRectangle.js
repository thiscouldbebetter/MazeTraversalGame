
class VisualRectangle
{
	constructor(size, colorName)
	{
		this.size = size;
		this.colorName = colorName;

		this._drawPos = new Coords();
	}

	static fromSizeAndColorName(size, colorName)
	{
		return new VisualRectangle(size, colorName);
	}

	color()
	{
		return Color.byName(this.colorName);
	}

	draw(universe, world, place, entity)
	{
		var entityPos = entity.pos(place.network);
		var drawPos =
			this._drawPos.overwriteWith(entityPos);
		var color = this.color();

		var display = universe.display;

		display.drawRectangleOfSizeWithCenterAndColorsFillAndBorder
		(
			this.size,
			drawPos,
			color,
			null // colorBorder
		);
	}
}