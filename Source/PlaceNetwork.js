
class PlaceNetwork
{
	constructor(name, network)
	{
		this.name = name;
		this._networkInitial = network;

		this.network = this._networkInitial.clone();
	}

	initialize(universe, world)
	{
		// todo
	}

	restart(universe, world)
	{
		this.network = this._networkInitial.clone();
	}

	updateForTimerTick(universe, world)
	{
		var network = this.network;

		var movers = network.movers;

		for (var m = 0; m < movers.length; m++)
		{
			var mover = movers[m];
			mover.updateForTimerTick(universe, world, this);
		}
		/*
		// Why doesn't this work?
		movers.forEach
		{
			mover => 
				mover.updateForTimerTick(universe, world, this)
		}
		*/

		var moverForPlayer = network.moverForPlayer;

		if (moverForPlayer.hasBeenEaten)
		{
			return;
		}

		var moversForEnemies = network.moversForEnemies;

		var collisionRadius = 4;

		moversForEnemies.forEach
		(
			moverForEnemy =>
			{
				if (moverForEnemy.hasBeenEaten == false)
				{
					var moverForPlayerPos =
						moverForPlayer.pos(network);
					var moverForEnemyPos =
						moverForEnemy.pos(network);
					var distanceFromEnemyToPlayer = 
						moverForPlayerPos.subtract
						(
							moverForEnemyPos
						).magnitude();

					if (distanceFromEnemyToPlayer <= collisionRadius)
					{
						if (moverForPlayer.powerupTicksRemaining == 0)
						{
							moverForPlayer.hasBeenEaten = true;
							movers.splice
							(
								movers.indexOf(moverForPlayer),
								1
							);
							var venueNext = new VenueMessage
							(
								"You lose!",
								(u) =>
								{
									var w = u.world;
									w.placeCurrent().restart(u, w);
									u.venueNextSet(w.toVenue() );
								}
							);
							universe.venueNextSet(venueNext);
						}
						else
						{
							moverForEnemy.hasBeenEaten = true;
						}
					}
				}
			}

		);

		if (moverForPlayer.powerupTicksRemaining > 0)
		{
			moverForPlayer.powerupTicksRemaining--;
		}
	}

	// Drawing.

	draw(universe, world)
	{
		var color = Color.Instances().Black;
		universe.display.drawBackground(color);
		this.network.draw(universe, world, this);
	}

}
