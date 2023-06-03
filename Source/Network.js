
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

		this.movers = [];

		this.indexOfNodeToSpawnPlayerFrom = indexOfNodeToSpawnPlayerFrom;

		this.moverForPlayer = new Mover
		(
			"Player",
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
				new Intelligence_Machine(),
				this.indexOfNodeToSpawnEnemiesFrom
			);

			this.moversForEnemies.push(moverForEnemy);
			this.movers.push(moverForEnemy);
		}

		this.numberOfLinksTraversedByPlayer = 0;
	}

	updateForTimerTick()
	{
		for (var i = 0; i < this.movers.length; i++)
		{
			var mover = this.movers[i];
			mover.updateForTimerTick(this);
		}

		if (this.moverForPlayer.hasBeenEaten == true)
		{
			return;
		}

		var collisionRadius = 4;

		for (var i = 0; i < this.moversForEnemies.length; i++)
		{
			var moverForEnemy = this.moversForEnemies[i];
			if (moverForEnemy.hasBeenEaten == false)
			{
				var distanceFromEnemyToPlayer = 
					this.moverForPlayer.pos().subtract
					(
						moverForEnemy.pos()
					).magnitude();

				if (distanceFromEnemyToPlayer <= collisionRadius)
				{
					if (this.moverForPlayer.powerUpTicksRemaining == 0)
					{
						this.moverForPlayer.hasBeenEaten = true;
						this.movers.splice
						(
							this.movers.indexOf(this.moverForPlayer),
							1
						);
						document.write("You lose!");
						break;
					}
					else
					{
						moverForEnemy.hasBeenEaten = true;
					}
				}
			}
		}

		if (this.moverForPlayer.powerUpTicksRemaining > 0)
		{
			this.moverForPlayer.powerUpTicksRemaining--;
		}
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
}
