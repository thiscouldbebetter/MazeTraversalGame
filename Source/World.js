
class World
{
	constructor(name, places)
	{
		this.name = name;
		this.places = places;

		this.placeCurrentIndex = 0;
		this.placeNextIndex = null;
	}

	placeCurrent()
	{
		return this.places[this.placeCurrentIndex];
	}

	// Drawing.

	draw(universe)
	{
		var placeCurrent = this.placeCurrent();
		placeCurrent.draw(universe, this);
	}

	// Places.

	initialize(universe)
	{
		// todo
	}

	updateForTimerTick(universe)
	{
		if (this.placeNextIndex != null)
		{
			this.placeCurrent().finalize(universe, this);
			this.placeCurrentIndex = this.placeNextIndex;
			this.placeNextIndex = null;
			this.placeCurrent().initialize(universe, this);
		}

		var placeCurrent = this.placeCurrent();
		placeCurrent.updateForTimerTick(universe, this);
	}
}