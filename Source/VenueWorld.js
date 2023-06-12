
class VenueWorld
{
	draw(universe)
	{
		universe.world.draw(universe);
	}

	finalize(universe)
	{
		// todo
	}

	initialize(universe)
	{
		// todo
	}

	updateForTimerTick(universe)
	{
		var world = universe.world;

		this.draw(universe);
		world.updateForTimerTick(universe);

		var inputHelper = universe.inputHelper;
		var levelSkipKeysArePressed =
		(
			inputHelper.keyIsPressed("u")
			&& inputHelper.keyIsPressed("i")
			&& inputHelper.keyIsPressed("o")
			&& inputHelper.keyIsPressed("p")
		);
		if (levelSkipKeysArePressed)
		{
			world.placeAdvance();
		}
	}
}
