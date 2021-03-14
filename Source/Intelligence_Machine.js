
class Intelligence_Machine
{
	actionDecide(network, actor)
	{
		var nodeCurrent = network.nodes[actor.nodeIndexPrev];

		if (actor.path == null)
		{
			var nodeIndexToTarget;

			if (actor.hasBeenEaten == true)
			{
				nodeIndexToTarget = network.indexOfNodeToSpawnEnemiesFrom;
			}
			else
			{
				nodeIndexToTarget = Math.floor
				(
					Math.random()
					* network.nodes.length
				);
			}

			var nodeTarget = network.nodes[nodeIndexToTarget];

			var pathToNodeTarget = Path.findPathBetweenNodesInNetwork
			(
				nodeCurrent,
				nodeTarget,
				network
			);			

			actor.path = pathToNodeTarget;
		}		

		var pathNodes = actor.path.networkNodesStartToGoal;

		var nodeNext = pathNodes[0];

		if (nodeNext == nodeCurrent)
		{
			pathNodes.splice(0, 1);
			if (pathNodes.length == 0)
			{
				nodeNext = nodeCurrent;
				actor.path = null; 
			}
			else
			{
				nodeNext = pathNodes[0];
			}
		}

		var returnValue = nodeNext.pos.clone().subtract
		(
			nodeCurrent.pos
		).normalize();

		
		return returnValue;
	}
}
