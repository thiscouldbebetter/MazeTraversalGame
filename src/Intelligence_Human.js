
function Intelligence_Human()
{
	// do nothing
}

{
	Intelligence_Human.prototype.actionDecide = function(network, actor)
	{
		var directionToMove;

		var directionsAll = Direction.Instances._All;

		var keyCodePressed = Globals.Instance.inputHelper.keyCodePressed;
		if (keyCodePressed == 65) // a
		{
			directionToMove = directionsAll.West.offset;
		}
		else if (keyCodePressed == 68) // d
		{
			directionToMove = directionsAll.East.offset;
		}
		else if (keyCodePressed == 83) // s
		{
			directionToMove = directionsAll.South.offset;
		}
		else if (keyCodePressed == 87) // w
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
