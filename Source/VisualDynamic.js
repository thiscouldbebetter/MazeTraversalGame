
class VisualDynamic
{
	constructor(visualGetForMover)
	{
		this._visualGetForMover = visualGetForMover;
	}

	color()
	{
		return Color.byName(this.colorName);
	}

	draw(universe, world, place, entity)
	{
		var visual =
			this.visualGet(universe, world, place, entity);
		visual.draw(universe, world, place, entity);
	}

	visualGet(universe, world, place, entity)
	{
		return this._visualGetForMover(universe, world, place, entity);
	}
}
