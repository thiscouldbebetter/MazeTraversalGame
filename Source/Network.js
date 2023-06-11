
class Network
{
	constructor
	(
		name, 
		nodes, 
		nodeIndexPairsAdjacent, 
		indicesOfNodesWithPowerups, 
		indexOfNodeToSpawnPlayerFrom,
		indexOfNodeToSpawnEnemiesFrom
	)
	{
		this.name = name;
		this.nodes = nodes;

		this.powerupDurationInTicks = 250;

		this.links = [];

		for (var p = 0; p < nodeIndexPairsAdjacent.length; p++)
		{
			var nodeIndexPair = nodeIndexPairsAdjacent[p];

			var nodeIndex0 = nodeIndexPair[0];
			var nodeIndex1 = nodeIndexPair[1];

			var node0 = this.nodes[nodeIndex0];
			node0.nodeIndicesAdjacent.push(nodeIndex1);
			var node1 = this.nodes[nodeIndex1];
			node1.nodeIndicesAdjacent.push(nodeIndex0);

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
			
				var linksFromThisNode =
					this.links[nodeIndexThisAsString];
				if (linksFromThisNode == null)
				{
					linksFromThisNode = [];
					this.links[nodeIndexThisAsString] =
						linksFromThisNode;
				}

				linksFromThisNode[nodeIndexOtherAsString] = link;
			}
		}

		for (var i = 0; i < indicesOfNodesWithPowerups.length; i++)
		{
			var indexOfNodeWithPowerup =
				indicesOfNodesWithPowerups[i];
			var nodeWithPowerup =
				this.nodes[indexOfNodeWithPowerup];
			nodeWithPowerup.hasPowerup = true;
		}

		var moverDefns = MoverDefn.Instances();

		this.movers = [];

		this.indexOfNodeToSpawnPlayerFrom =
			indexOfNodeToSpawnPlayerFrom;

		this.moverForPlayer = new Mover
		(
			"Player",
			moverDefns.Player.name,
			this.indexOfNodeToSpawnPlayerFrom 
		);

		this.movers.push(this.moverForPlayer);

		this.moversForEnemies = [];

		this.indexOfNodeToSpawnEnemiesFrom =
			indexOfNodeToSpawnEnemiesFrom;

		var moverDefnsForEnemies = 
		[
			moverDefns.EnemyAmbusher,
			moverDefns.EnemyChaser,
			moverDefns.EnemyFlanker,
			moverDefns.EnemyLurker
		];

		for (var i = 0; i < moverDefnsForEnemies.length; i++)
		{
			var moverDefn = moverDefnsForEnemies[i];
			var moverForEnemy = new Mover
			(
				"Enemy" + i,
				moverDefn.name,
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
			var pos = node.pos;
			var disp = new Disposition(0, pos);
			var entityFake = { disp: disp };
			var universeFake = { display: display };
			var visual = Visual.Instances().Powerup;
			visual.draw(universeFake, null, null, entityFake);
		}
	}

}
