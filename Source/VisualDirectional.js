
class VisualDirectional
{
	constructor(childrenForDirections)
	{
		this.childrenForDirections = childrenForDirections;
	}

	draw(universe, world, place, entity)
	{
		var headingInTurns = entity.disp.headingInTurns;
		var childIndex = Math.floor(headingInTurns / .25);
		var childForDirection =
			this.childrenForDirections[childIndex];
		childForDirection.draw(universe, world, place, entity);
	}
}
