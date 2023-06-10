
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
			this.visualGetForMover(display, mover);
		visual.draw(universe, world, place, entity);
	}

	visualGetForMover(mover)
	{
		return this._visualGetForMover(mover);
	}
}
