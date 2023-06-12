
class World
{
	constructor(name, places)
	{
		this.name = name;
		this.places = places;

		this.placeCurrentIndex = 0;
		this.placeNextIndex = null;
	}

	placeAdvance()
	{
		this.placeNextIndex = this.placeCurrentIndex + 1;
		if (this.placeNextIndex >= this.places.length)
		{
			this.placeNextIndex = 0;
		}
	}

	placeCurrent()
	{
		return this.places[this.placeCurrentIndex];
	}

	toVenue()
	{
		return new VenueWorld(this);
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
