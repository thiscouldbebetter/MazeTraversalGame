
class VisualRectangle
{
	constructor(colorName, size)
	{
		this.colorName = colorName;
		this.size = size;
	}

	static fromSizeAndColorName(size, colorName)
	{
		return new VisualRectangle(colorName, size);
	}

	color()
	{
		return Color.byName(this.colorName);
	}

	draw(universe, world, place, entity)
	{
		var pos = entity.disp.pos;
		universe.display.drawRectangleWithCenterSizeAndColor
		(
			pos, this.size, this.color()
		);
	}
}
