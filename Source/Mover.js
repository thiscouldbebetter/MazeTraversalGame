
class Mover
{
	constructor
	(
		name,
		defnName,
		nodeIndexInitial
	)
	{
		this.name = name;
		this.defnName = defnName;
		this.nodeIndexPrev = nodeIndexInitial;
		this.linkBeingTraversed = null;
		this.distanceAlongLinkBeingTraversed =  0;
		this.directionAlongLinkBeingTraversed = 0;

		this.hasBeenEaten = false;
		this.powerupTicksRemaining = 0;

		this.disp = Disposition.create();
	}

	defn()
	{
		return MoverDefn.byName(this.defnName);
	}

	headingInTurns(network)
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
			var nodeNextIndex = this.nodeNextIndex();

			var nodeNextPos = network.nodes[nodeNextIndex].pos;
		}

		var displacementFromNodePrevToNext =
			nodeNextPos.clone().subtract
			(
				nodePrevPos
			);

		var headingInRadians = Math.atan2
		(
			displacementFromNodePrevToNext.y,
			displacementFromNodePrevToNext.x,
		);

		var radiansPerTurn = Math.PI * 2;

		var headingInTurns = headingInRadians / radiansPerTurn;

		if (headingInTurns < 0)
		{
			headingInTurns += 1;
		}

		return headingInTurns;
	}

	nodeNextIndex()
	{
		var returnValue;

		if (this.linkBeingTraversed == null)
		{
			returnValue = this.nodeIndexPrev;
		}
		else
		{
			var nodeIndicesFromTo =
				this.linkBeingTraversed.nodeIndicesFromTo;

			var returnValue = 
			(
				nodeIndicesFromTo[0] == this.nodeIndexPrev
				? nodeIndicesFromTo[1]
				: nodeIndicesFromTo[0]
			);
		}

		return returnValue;
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
		var network = place.network;

		var disp = this.disp;
		disp.pos.overwriteWith
		(
			this.pos(network)
		);
		disp.headingInTurns = this.headingInTurns(network);

		var defn = this.defn();
		var intelligence = defn.intelligence;
		var directionToMove = intelligence.actionDecide
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

	updateForTimerTick_2_2
	(
		universe, world, place, directionToMove, moverNodeIndexNext
	)
	{
		var network = place.network;
		var linkBeingTraversed = this.linkBeingTraversed;

		if (linkBeingTraversed != null)
		{
			var moverSpeed = 3; // hack

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
								var message = "Level complete!"
								var venueNext = new VenueMessage
								(
									message,
									(u) =>
									{
										u.world.placeAdvance();
									}
								);
								universe.venueNextSet(venueNext);
							}
						}

						var nodeArrivedAt =
							network.nodes[moverNodeIndexNext];

						if (nodeArrivedAt.hasPowerup)
						{
							nodeArrivedAt.hasPowerup = false;
							this.powerupTicksRemaining =
								network.powerupDurationInTicks;
						}

						var nodeIndexPairTeleport =
							network.nodeIndexPairConnectedByTeleport;
						if (nodeIndexPairTeleport.indexOf(moverNodeIndexNext) >= 0)
						{
							moverNodeIndexNext = nodeIndexPairTeleport.find
							(
								x => x != moverNodeIndexNext
							);
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

	// Draw.

	draw(universe, world, place)
	{
		var mover = this;

		if (mover.name == "Player")
		{
			this.draw_Player(universe, world, place);
		}

		var defn = this.defn();
		var visual = defn.visual;
		visual.draw(universe, world, place, this);
	}

	draw_Player(universe, world, place)
	{
		var display = universe.display;
		var network = place.network;

		var mover = this;

		var playerSize = 8;
		var playerSizeHalf = playerSize / 2;

		var nodes = network.nodes;
		var nodeIndex = mover.nodeIndexPrev;
		var nodePrevPos = nodes[nodeIndex].pos;

		var nodeNextPos;

		var linkBeingTraversed = mover.linkBeingTraversed;

		if (linkBeingTraversed == null)
		{
			nodeNextPos = nodePrevPos;
		}
		else
		{
			var nodeNextIndex = 
			(
				linkBeingTraversed.nodeIndicesFromTo[0] == mover.nodeIndexPrev
				? linkBeingTraversed.nodeIndicesFromTo[1]
				: linkBeingTraversed.nodeIndicesFromTo[0]
			);

			var nodeNext = nodes[nodeNextIndex];
			var nodeNextPos = nodeNext.pos;
		}

		var displacementFromNodePrevToNext =
			nodeNextPos.clone().subtract
			(
				nodePrevPos
			);

		var distanceFromNodePrevToNext =
			displacementFromNodePrevToNext.magnitude();

		var drawPos = nodePrevPos.clone();

		if (distanceFromNodePrevToNext > 0)
		{
			var displacementFromNodePrevToMover =
				displacementFromNodePrevToNext.divideScalar
				(
					distanceFromNodePrevToNext
				).multiplyScalar
				(
					mover.distanceAlongLinkBeingTraversed
				);

			drawPos.add
			(
				displacementFromNodePrevToMover
			);
		}

		var g = display.graphics;

		g.strokeStyle = display.colorHighlight;
		g.beginPath();
		g.moveTo(nodePrevPos.x, nodePrevPos.y);
		g.lineTo(drawPos.x, drawPos.y);
		g.stroke();
	}

}
