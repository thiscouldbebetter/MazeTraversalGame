
class VisualNamed
{
	constructor(name, child)
	{
		this.name = name;
		this.child = child;
	}

	draw(universe, world, place, entity)
	{
		this.child.draw(universe, world, place, entity);
	}
}
