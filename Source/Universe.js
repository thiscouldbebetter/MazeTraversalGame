
class Universe
{
	constructor
	(
		display,
		timerHelper,
		world
	)
	{
		this.display = display;
		this.timerHelper = timerHelper;
		this.world = world;

		this.inputHelper = new InputHelper();
	}

	initialize()
	{
		this.display.initialize(this);
		this.world.initialize(this);
		this.inputHelper.initialize(this);
		this.timerHelper.initialize(this);

		var venueInitial = new VenueMessage
		(
			"Press Enter to start.",
			(u) => u.venueNextSet(u.world.toVenue() )
		);
		this.venueNextSet(venueInitial);
	}

	updateForTimerTick()
	{
		if (this.venueNext != null)
		{
			if (this.venueCurrent != null)
			{
				this.venueCurrent.finalize(this);
			}
			this.venueCurrent = this.venueNext;
			this.venueCurrent.initialize(this);
		}

		this.venueCurrent.updateForTimerTick(this);
		this.inputHelper.updateForTimerTick(this);
	}

	venueNextSet(value)
	{
		this.venueNext = value;
	}
}
