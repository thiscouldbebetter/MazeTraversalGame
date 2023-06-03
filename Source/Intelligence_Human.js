
class Intelligence_Human
{
	actionDecide(universe, world, place, actor)
	{
		var directionToMove;

		var directionsAll = Direction.Instances()._All;

		var inputHelper = universe.inputHelper;
		var keyPressed = inputHelper.keyPressed;
		if (keyPressed == "a" || keyPressed == "ArrowLeft")
		{
			directionToMove = directionsAll.West.offset;
		}
		else if (keyPressed == "d" || keyPressed == "ArrowRight")
		{
			directionToMove = directionsAll.East.offset;
		}
		else if (keyPressed == "s" || keyPressed == "ArrowDown")
		{
			directionToMove = directionsAll.South.offset;
		}
		else if (keyPressed == "w" || keyPressed == "ArrowUp")
		{
			directionToMove = directionsAll.North.offset;
		}
		else
		{
			directionToMove = null;
		}

		return directionToMove;
	}
}
