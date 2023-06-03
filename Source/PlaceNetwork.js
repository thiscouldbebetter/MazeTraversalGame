
class PlaceNetwork
{
	constructor(name, network)
	{
		this.name = name;
		this.network = network;
	}

	initialize(universe, world)
	{
		// todo
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
						if (moverForPlayer.powerUpTicksRemaining == 0)
						{
							moverForPlayer.hasBeenEaten = true;
							movers.splice
							(
								movers.indexOf(moverForPlayer),
								1
							);
							document.write("You lose!");
						}
						else
						{
							moverForEnemy.hasBeenEaten = true;
						}
					}
				}
			}

		);

		if (moverForPlayer.powerUpTicksRemaining > 0)
		{
			moverForPlayer.powerUpTicksRemaining--;
		}
	}

	// Drawing.

	drawToDisplay(display)
	{
		display.drawBackground();
		this.network.drawToDisplay(display);
	}

}