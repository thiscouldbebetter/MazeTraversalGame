
class VisualMultiple
{
	constructor(children)
	{
		this.children = children;
	}

	draw(universe, world, place, entity)
	{
		this.children.forEach
		(
			x => x.draw(universe, world, place, entity)
		);
	}
}
