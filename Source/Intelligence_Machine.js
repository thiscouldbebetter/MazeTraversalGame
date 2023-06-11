
class Intelligence_Machine
{
	constructor(nodeIndexChoose)
	{
		this._nodeIndexChoose =
			nodeIndexChoose || Intelligence_Machine.nodeIndexChooseRandom;
	}

	actionDecide(universe, world, place, actor)
	{
		var network = place.network;
		var nodeCurrent = network.nodes[actor.nodeIndexPrev];

		this.actionDecide_1_Path
		(
			universe, world, place, actor, nodeCurrent
		);

		var nodeNext =
			this.actionDecide_2_NodeNext
			(
				universe, world, place, actor, nodeCurrent
			);

		var returnValue = nodeNext.pos.clone().subtract
		(
			nodeCurrent.pos
		).normalize();

		return returnValue;
	}

	actionDecide_1_Path
	(
		universe, world, place, actor, nodeCurrent
	)
	{
		if (actor.path != null)
		{
			return;
		}

		var network = place.network;
		var nodeIndexToTarget;

		if (actor.hasBeenEaten)
		{
			nodeIndexToTarget =
				network.indexOfNodeToSpawnEnemiesFrom;
		}
		else
		{
			nodeIndexToTarget =
				this.nodeIndexChoose(universe, world, place, actor);
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

	actionDecide_2_NodeNext
	(
		universe, world, place, actor, nodeCurrent
	)
	{
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

		return nodeNext;
	}

	nodeIndexChoose(universe, world, place, entity)
	{
		return this._nodeIndexChoose(universe, world, place, entity);
	}

	// NodeIndexChoose instances.

	static nodeIndexChooseAmbusher(universe, world, place, actor)
	{
		var network = place.network;
		var player = network.moverForPlayer;
		var nodeIndexChosen = player.nodeNextIndex();
		return nodeIndexChosen;
	}

	static nodeIndexChooseChaser(universe, world, place, actor)
	{
		var network = place.network;
		var player = network.moverForPlayer;
		var nodeIndexChosen = player.nodeIndexPrev;
		return nodeIndexChosen;
	}

	static nodeIndexChooseFlanker(universe, world, place, actor)
	{
		var nodeIndexChosen = Intelligence_Machine.nodeIndexChooseRandom
		(
			universe, world, place, actor
		);

		return nodeIndexChosen;
	}

	static nodeIndexChooseLurker(universe, world, place, actor)
	{
		var nodeIndexChosen;

		var distance = 0;
		var distanceThreshold = 10;

		if (distance < distanceThreshold)
		{
			nodeIndexChosen = Intelligence_Machine.nodeIndexChooseRandom
			(
				universe, world, place, actor
			);
		}
		else
		{
			nodeIndexChosen = Intelligence_Machine.nodeIndexChooseRandom
			(
				universe, world, place, actor
			);
		}

		return nodeIndexChosen;
	}

	static nodeIndexChooseRandom(universe, world, place, actor)
	{
		return Math.floor
		(
			Math.random()
			* place.network.nodes.length
		);
	}

	// Convenience constructors.

	static ambusher()
	{
		return new Intelligence_Machine(Intelligence_Machine.nodeIndexChooseAmbusher);
	}

	static chaser()
	{
		return new Intelligence_Machine(Intelligence_Machine.nodeIndexChooseChaser);
	}

	static flanker()
	{
		return new Intelligence_Machine(Intelligence_Machine.nodeIndexChooseFlanker);
	}

	static lurker()
	{
		return new Intelligence_Machine(Intelligence_Machine.nodeIndexChooseLurker);
	}

}
