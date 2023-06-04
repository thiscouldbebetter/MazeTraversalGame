
class Network
{
	constructor
	(
		name, 
		nodes, 
		nodeIndexPairsAdjacent, 
		indicesOfNodesWithPowerups, 
		numberOfEnemiesToSpawn,
		indexOfNodeToSpawnPlayerFrom,
		indexOfNodeToSpawnEnemiesFrom
	)
	{
		this.name = name;
		this.nodes = nodes;

		this.links = [];

		for (var p = 0; p < nodeIndexPairsAdjacent.length; p++)
		{
			var nodeIndexPair = nodeIndexPairsAdjacent[p];

			var nodeIndex0 = nodeIndexPair[0];
			var nodeIndex1 = nodeIndexPair[1];

			this.nodes[nodeIndex0].nodeIndicesAdjacent.push(nodeIndex1);
			this.nodes[nodeIndex1].nodeIndicesAdjacent.push(nodeIndex0);

			var link = new NetworkLink
			(
				[ nodeIndex0, nodeIndex1 ]
			);

			this.links.push(link);

			for (var n = 0; n < link.nodeIndicesFromTo.length; n++)
			{
				var nodeIndexThis = link.nodeIndicesFromTo[n];
				var nodeIndexOther = link.nodeIndicesFromTo[1 - n];

				var nodeIndexThisAsString = "_" + nodeIndexThis;
				var nodeIndexOtherAsString = "_" + nodeIndexOther;
			
				var linksFromThisNode = this.links[nodeIndexThisAsString];
				if (linksFromThisNode == null)
				{
					linksFromThisNode = [];
					this.links[nodeIndexThisAsString] = linksFromThisNode
				}

				linksFromThisNode[nodeIndexOtherAsString] = link;
			}
		}

		for (var i = 0; i < indicesOfNodesWithPowerups.length; i++)
		{
			var indexOfNodeWithPowerup = indicesOfNodesWithPowerups[i];
			var nodeWithPowerup = this.nodes[indexOfNodeWithPowerup];
			nodeWithPowerup.hasPowerup = true;
		}

		var moverDefns = MoverDefn.Instances();

		this.movers = [];

		this.indexOfNodeToSpawnPlayerFrom = indexOfNodeToSpawnPlayerFrom;

		this.moverForPlayer = new Mover
		(
			"Player",
			moverDefns.Player.name,
			new Intelligence_Human(),
			this.indexOfNodeToSpawnPlayerFrom 
		);

		this.movers.push(this.moverForPlayer);

		this.moversForEnemies = [];

		this.numberOfEnemiesToSpawn = numberOfEnemiesToSpawn;
		this.indexOfNodeToSpawnEnemiesFrom = indexOfNodeToSpawnEnemiesFrom;

		for (var i = 0; i < numberOfEnemiesToSpawn; i++)
		{
			var moverForEnemy = new Mover
			(
				"Enemy" + i,
				moverDefns.Enemy.name,
				new Intelligence_Machine(),
				this.indexOfNodeToSpawnEnemiesFrom
			);

			this.moversForEnemies.push(moverForEnemy);
			this.movers.push(moverForEnemy);
		}

		this.numberOfLinksTraversedByPlayer = 0;
	}

	linkConnectingNodeIndices(nodeIndicesConnectedByLink)
	{
		var node0IndexAsString =
			"_" + nodeIndicesConnectedByLink[0];
		var node1IndexAsString =
			"_" + nodeIndicesConnectedByLink[1];

		var returnValue =
			this.links[node0IndexAsString][node1IndexAsString];

		return returnValue;
	}

	nodePositionsMinAndMax()
	{
		var node0Pos = this.nodes[0].pos;

		var nodePosMin = node0Pos.clone();
		var nodePosMax = node0Pos.clone();

		this.nodes.forEach
		(
			node =>
			{
				var nodePos = node.pos;
				if (nodePos.x < nodePosMin.x)
				{
					nodePosMin.x = nodePos.x;
				}
				if (nodePos.x > nodePosMax.x)
				{
					nodePosMax.x = nodePos.x;
				}
				if (nodePos.y < nodePosMin.y)
				{
					nodePosMin.y = nodePos.y;
				}
				if (nodePos.y > nodePosMax.y)
				{
					nodePosMax.y = nodePos.y;
				}
			}
		);

		return [nodePosMin, nodePosMax];
	}

	// Drawing.

	draw(universe, world, place)
	{
		var display = universe.display;

		var g = display.graphics;

		g.strokeStyle = display.colorFore;

		var links = this.links;
		var nodes = this.nodes;
		var movers = this.movers;

		links.forEach
		(
			link =>
				this.drawToDisplay_Link(display, link)
		);

		nodes.forEach
		(
			node =>
				this.drawToDisplay_Node(display, node)
		);

		movers.forEach
		(
			mover => mover.draw(universe, world, place)
		);
	}

	drawToDisplay_Link(display, link)
	{
		var g = display.graphics;
		g.strokeStyle = 
		(
			link.hasBeenTraversedByPlayer
			? display.colorHighlight
			: display.colorFore
		); 

		var nodes = this.nodes;

		var nodeFromIndex = link.nodeIndicesFromTo[0];
		var nodeToIndex = link.nodeIndicesFromTo[1];

		var nodeFrom = nodes[nodeFromIndex];
		var nodeTo = nodes[nodeToIndex];

		var startPos = nodeFrom.pos;
		var endPos = nodeTo.pos

		g.beginPath();
		g.moveTo(startPos.x, startPos.y);
		g.lineTo(endPos.x, endPos.y);
		g.stroke();
	}

	drawToDisplay_Node(display, node)
	{
		if (node.hasPowerup)
		{
			var powerupSize = 8;
			var powerupSizeHalf = powerupSize / 2;

			var drawPos = node.pos;

			var g = display.graphics;
			g.strokeStyle = display.colorFore;
			g.beginPath();
			g.moveTo(drawPos.x - powerupSizeHalf, drawPos.y);
			g.lineTo(drawPos.x, drawPos.y - powerupSizeHalf);
			g.lineTo(drawPos.x + powerupSizeHalf, drawPos.y);
			g.lineTo(drawPos.x, drawPos.y + powerupSizeHalf);
			g.closePath();
			g.stroke();
		}
	}

}
