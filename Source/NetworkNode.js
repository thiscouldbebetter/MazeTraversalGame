
class NetworkNode
{
	constructor
	(
		index,
		pos,
		nodeIndicesAdjacent
	)
	{
		this.index = index;
		this.pos = pos;
		this.nodeIndicesAdjacent = nodeIndicesAdjacent || [];

		this.nodeIndexToTeleportTo = null;
		this.hasPowerup = false;
	}

	// static methods

	static buildManyFromMapAsStrings
	(
		mapCellSizeInPixels,
		mapAsStrings
	)
	{
		var charsPerCell = 2;

		var nodes = [];
		var mapSizeInCells = new Coords
		(
			mapAsStrings[0].length / charsPerCell,
			mapAsStrings.length
		);
		var cellPos = new Coords(0, 0);

		for (var y = 0; y < mapSizeInCells.y; y++)
		{
			cellPos.y = y;

			var mapRowAsString = mapAsStrings[y];

			for (var x = 0; x < mapSizeInCells.x; x++)
			{
				cellPos.x = x;

				var nodeIndexAsString = mapRowAsString.substr
				(
					cellPos.x * charsPerCell, 
					charsPerCell
				);

				var nodeIndex = parseInt(nodeIndexAsString);

				if (nodeIndex != null)
				{
					var nodePos = cellPos.clone().multiply
					(
						mapCellSizeInPixels
					);

					var node = new NetworkNode
					(
						nodeIndex,
						nodePos,
						[]
					);

					nodes[nodeIndex] = node;
				}
			}
		}

		return nodes;
	}

	static buildManyFromPositions(nodePositions)
	{
		var returnValues = [];

		for (var i = 0; i < nodePositions.length; i++)
		{
			var nodePos = nodePositions[i];
			var node = new NetworkNode(i, nodePos);
			returnValues.push(node);
		}

		return returnValues;
	}

	// instance methods

	nodesAdjacentInNetworkAddToList(network, listToAddTo)
	{
		for (var i = 0; i < this.nodeIndicesAdjacent.length; i++)
		{
			var nodeIndexAdjacent = this.nodeIndicesAdjacent[i];
			var nodeAdjacent = network.nodes[nodeIndexAdjacent];
			listToAddTo.push(nodeAdjacent);
		}
	}
}
