
class Mover
{
	constructor(name, intelligence, nodeIndexInitial)
	{
		this.name = name;
		this.intelligence = intelligence;
		this.nodeIndexPrev = nodeIndexInitial;
		this.linkBeingTraversed = null;
		this.distanceAlongLinkBeingTraversed =  0;
		this.directionAlongLinkBeingTraversed = 0;

		this.hasBeenEaten = false;
		this.powerUpTicksRemaining = 0;
	}

	pos(network)
	{
		var nodePrevPos = network.nodes[this.nodeIndexPrev].pos;

		var nodeNextPos;

		var linkBeingTraversed = this.linkBeingTraversed;

		if (linkBeingTraversed == null)
		{
			nodeNextPos = nodePrevPos;
		}
		else
		{
			var nodeNextIndex = 
			(
				linkBeingTraversed.nodeIndicesFromTo[0] == this.nodeIndexPrev
				? linkBeingTraversed.nodeIndicesFromTo[1]
				: linkBeingTraversed.nodeIndicesFromTo[0]
			);

			var nodeNextPos = network.nodes[nodeNextIndex].pos;
		}

		var displacementFromNodePrevToNext =
			nodeNextPos.clone().subtract
			(
				nodePrevPos
			);

		var distanceFromNodePrevToNext =
			displacementFromNodePrevToNext.magnitude();

		var returnValue = nodePrevPos.clone();

		if (distanceFromNodePrevToNext > 0)
		{
			var displacementFromNodePrevToMover =
				displacementFromNodePrevToNext.divideScalar
				(
					distanceFromNodePrevToNext
				).multiplyScalar
				(
					this.distanceAlongLinkBeingTraversed
				);

			returnValue.add
			(
				displacementFromNodePrevToMover
			);
		}

		return returnValue;
	}

	updateForTimerTick(universe, world, place)
	{
		var directionToMove = this.intelligence.actionDecide
		(
			universe, world, place, this
		);

		this.updateForTimerTick_2
		(
			universe, world, place, directionToMove
		);
	}

	updateForTimerTick_2(universe, world, place, directionToMove)
	{
		var network = place.network;

		var moverNodeIndexNext;

		var linkBeingTraversed = this.linkBeingTraversed;

		if (linkBeingTraversed == null)
		{
			moverNodeIndexNext = this.nodeIndexPrev;
		}
		else 
		{
			moverNodeIndexNext = 
			(
				linkBeingTraversed.nodeIndicesFromTo[0] == this.nodeIndexPrev
				? linkBeingTraversed.nodeIndicesFromTo[1]
				: linkBeingTraversed.nodeIndicesFromTo[0]
			);
		}

		this.updateForTimerTick_2_1
		(
			universe, world, place, directionToMove, moverNodeIndexNext
		);

		this.updateForTimerTick_2_2
		(
			universe, world, place, directionToMove, moverNodeIndexNext
		);
	}

	updateForTimerTick_2_1(universe, world, place, directionToMove, moverNodeIndexNext)
	{
		if (directionToMove != null)
		{
			var network = place.network;
			var linkBeingTraversed = this.linkBeingTraversed;

			var moverNodePrev = network.nodes[this.nodeIndexPrev];

			if (linkBeingTraversed == null)
			{
				var nodeIndicesAdjacent =
					moverNodePrev.nodeIndicesAdjacent;

				for (var n = 0; n < nodeIndicesAdjacent.length; n++)
				{
					var nodeIndexAdjacent = nodeIndicesAdjacent[n];
					var nodeAdjacent = network.nodes[nodeIndexAdjacent];
					var directionToNodeAdjacent = nodeAdjacent.pos.clone().subtract
					(
						moverNodePrev.pos
					);

					if (directionToNodeAdjacent.dotProduct(directionToMove) > 0)
					{
						linkBeingTraversed = network.linkConnectingNodeIndices
						([
							this.nodeIndexPrev,
							nodeIndexAdjacent
						]);
						this.linkBeingTraversed = linkBeingTraversed;
						this.directionAlongLinkBeingTraversed = 1;
						break;
					}
				}
			}
			else
			{
				var moverNodeNext = network.nodes[moverNodeIndexNext];

				var directionToNodeNext =
					moverNodeNext.pos.clone().subtract
					(
						moverNodePrev.pos
					);

				var value =
					directionToNodeNext.dotProduct(directionToMove)
					* this.directionAlongLinkBeingTraversed;

				var shouldDirectionBeReversed = (value < 0);
				
				if (shouldDirectionBeReversed)
				{
					this.directionAlongLinkBeingTraversed *= -1;
				}
			}
		}
	}

	updateForTimerTick_2_2(universe, world, place, directionToMove, moverNodeIndexNext)
	{
		var network = place.network;
		var linkBeingTraversed = this.linkBeingTraversed;

		if (linkBeingTraversed != null)
		{
			var moverSpeed = 2; // hack

			var moverVelocity =
				moverSpeed
				* this.directionAlongLinkBeingTraversed;

			this.distanceAlongLinkBeingTraversed += moverVelocity;

			if (moverVelocity > 0)
			{
				var lengthOfLink =
					linkBeingTraversed.length(network);

				if (this.distanceAlongLinkBeingTraversed >= lengthOfLink)
				{
					if (this.name == "Player")
					{
						if (linkBeingTraversed.hasBeenTraversedByPlayer == false)
						{
							linkBeingTraversed.hasBeenTraversedByPlayer = true;
							network.numberOfLinksTraversedByPlayer++;
							if (network.numberOfLinksTraversedByPlayer >= network.links.length)
							{
								alert("You win!");
							}
						}

						var nodeArrivedAt = network.nodes[moverNodeIndexNext];

						if (nodeArrivedAt.hasPowerup)
						{
							nodeArrivedAt.hasPowerup = false;
							this.powerUpTicksRemaining = 100;
						}

						if (nodeArrivedAt.nodeToTeleportToIndex != null)
						{
							todo
						}
					}
					else if (this.name.startsWith("Enemy") )
					{
						if (this.hasBeenEaten == true)
						{
							if (moverNodeIndexNext == network.indexOfNodeToSpawnEnemiesFrom)
							{
								this.hasBeenEaten = false;
							}
						}
					}

					this.nodeIndexPrev = moverNodeIndexNext;
					this.linkBeingTraversed = null;
					this.distanceAlongLinkBeingTraversed = 0;
					this.directionAlongLinkBeingTraversed = 0;
				}
			}
			else if (this.distanceAlongLinkBeingTraversed <= 0)
			{
				this.linkBeingTraversed = null;
				this.distanceAlongLinkBeingTraversed = 0;
				this.directionAlongLinkBeingTraversed = 0;
			}
		}

	}
}
