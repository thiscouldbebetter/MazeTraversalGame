
class VisualOffset
{
	constructor(offset, child)
	{
		this.offset = offset;
		this.child = child;
	}

	draw(universe, world, place, entity)
	{
		var pos = entity.disp.pos;
		pos.add(this.offset);
		this.child.draw(universe, world, place, entity);
		pos.subtract(this.offset);
	}
}
