
class VisualCircle
{
	constructor(colorName, radius)
	{
		this.colorName = colorName;
		this.radius = radius;
	}

	color()
	{
		return Color.byName(this.colorName);
	}

	draw(universe, world, place, entity)
	{
		var pos = entity.disp.pos;
		universe.display.drawCircleWithCenterRadiusAndColor
		(
			pos, this.radius, this.color()
		);
	}
}
