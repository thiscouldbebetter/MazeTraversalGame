
class Intelligence_Human
{
	actionDecide(network, actor)
	{
		var directionToMove;

		var directionsAll = Direction.Instances()._All;

		var keyPressed = Globals.Instance().inputHelper.keyPressed;
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
