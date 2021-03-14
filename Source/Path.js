
class Path
{
	constructor(networkNodesStartToGoal)
	{
		this.networkNodesStartToGoal = networkNodesStartToGoal;
	}

	static findPathBetweenNodesInNetwork
	(
		networkNodeStart, 
		networkNodeGoal, 
		network
	)
	{
		var returnValue = null;

		var networkNodesToConsider = [];
		var pathNodesToConsider = [];
		var networkNodesAlreadyConsidered = [];
		var networkNodesAdjacentToCurrent = [];

		var pathNodeStart = new PathNode
		(
			networkNodeStart, 

			0, // costFromStart

			// costFromStartToGoalEstimated
			networkNodeGoal.pos.clone().subtract
			(
				networkNodeStart.pos
			).magnitude(),

			null // prev
		);

		networkNodesToConsider.push(networkNodeStart);
		pathNodesToConsider.push(pathNodeStart);

		while (pathNodesToConsider.length > 0)
		{
			returnValue = Path.findPathBetweenNodesInNetwork_2
			(
				networkNodeStart, 
				networkNodeGoal, 
				network,
				pathNodesToConsider,
				networkNodesToConsider,
				networkNodesAlreadyConsidered,
				networkNodesAdjacentToCurrent
			);

			if (returnValue != null)
			{
				break;
			}
		}

		return returnValue;
	}

	static findPathBetweenNodesInNetwork_2
	(
		networkNodeStart,
		networkNodeGoal,
		network,
		pathNodesToConsider,
		networkNodesToConsider,
		networkNodesAlreadyConsidered,
		networkNodesAdjacentToCurrent
	)
	{
		var returnValue;

		var pathNodeCurrent = pathNodesToConsider[0];
		var networkNodeCurrent = pathNodeCurrent.networkNode;

		if (networkNodeCurrent.pos.equals(networkNodeGoal.pos) == true)
		{
			var networkNodesInPathStartToGoal = [];
	
			while (pathNodeCurrent != null)
			{
				networkNodesInPathStartToGoal.splice
				(
					0, 0, pathNodeCurrent.networkNode
				);
				pathNodeCurrent = pathNodeCurrent.prev;
			}

			returnValue = new Path(networkNodesInPathStartToGoal);
		}
		else
		{

			pathNodesToConsider.splice(0, 1);
			networkNodesToConsider.splice(0, 1);
			networkNodesAlreadyConsidered.push(networkNodeCurrent);
	
			networkNodesAdjacentToCurrent.length = 0;
			networkNodeCurrent.nodesAdjacentInNetworkAddToList
			(
				network,
				networkNodesAdjacentToCurrent
			);
	
			for (var i = 0; i < networkNodesAdjacentToCurrent.length; i++)
			{
				var networkNodeAdjacent = networkNodesAdjacentToCurrent[i]

				Path.findPathBetweenNodesInNetwork_3
				(
					networkNodeStart,
					networkNodeGoal,
					network,
					pathNodesToConsider,
					networkNodesToConsider,
					networkNodesAlreadyConsidered,
					pathNodeCurrent,
					networkNodeCurrent,
					networkNodeAdjacent
				);
			}

			returnValue = null;
		}

		return returnValue;
	}

	static findPathBetweenNodesInNetwork_3
	(
		networkNodeStart,
		networkNodeGoal,
		network,
		pathNodesToConsider,
		networkNodesToConsider,
		networkNodesAlreadyConsidered,
		pathNodeCurrent,
		networkNodeCurrent,
		networkNodeAdjacent
	)
	{
		if (networkNodesAlreadyConsidered.indexOf(networkNodeAdjacent) == -1)
		{
			var costFromStartThroughCurrentToAdjacent = 
				pathNodeCurrent.costFromStartBestSoFar
				+ networkNodeAdjacent.pos.clone().subtract
				(
					networkNodeCurrent.pos
				).magnitude();

			var costFromAdjacentToGoalEstimated = networkNodeGoal.pos.clone().subtract
			(
				networkNodeAdjacent.pos
			).magnitude();

			var indexOfNodeAdjacentInListToConsider = 
				networkNodesToConsider.indexOf(networkNodeAdjacent);

			var pathNodeAdjacent;
			var shouldCostsBeUpdated = false;

			if (indexOfNodeAdjacentInListToConsider == -1)
			{
				shouldCostsBeUpdated = true;	
				pathNodeAdjacent = new PathNode
				(
					networkNodeAdjacent,
					costFromStartThroughCurrentToAdjacent,
					costFromStartThroughCurrentToAdjacent 
						+ costFromAdjacentToGoalEstimated,
					pathNodeCurrent
				);	

				var j = 0;

				for (j = 0; j < pathNodesToConsider.length; j++)
				{
					var pathNodeExisting = pathNodesToConsider[j];

					var costOfAdjacentMinusExisting = 
						pathNodeAdjacent.costFromStartToGoalEstimated;
						- pathNodeExisting.costFromStartToGoalEstimated;
	
					if (costOfAdjacentMinusExisting <= 0)
					{
						break;
					}
				}

				pathNodesToConsider.splice(j, 0, pathNodeAdjacent);
				networkNodesToConsider.splice(j, 0, networkNodeAdjacent);						
			}
			else 
			{
				pathNodeAdjacent = pathNodesToConsider[indexOfNodeAdjacentInListToConsider];
				if (costFromStartThroughCurrentToAdjacent < pathNodeAdjacent.costFromStartBestSoFar)
				{
					shouldCostsBeUpdated = true;
				}
			}

			if (shouldCostsBeUpdated == true)
			{
				pathNodeAdjacent.costFromStartBestSoFar = costFromStartThroughCurrentToAdjacent;
				pathNodeAdjacent.costToGoalEstimated = 
					pathNodeAdjacent.costFromStartBestSoFar
					+ costFromAdjacentToGoalEstimated;
			}
		}
	}

	// instance methods

	toString()
	{
		var nodePositions = [];

		for (var i = 0; i < this.networkNodesStartToGoal.length; i++)
		{
			var nodePos = this.networkNodesStartToGoal[i].pos;
			nodePositions.push(nodePos);
		}

		return nodePositions.toString();
	}

} // end class Path
