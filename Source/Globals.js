
class Globals
{
	// instance

	static Instance()
	{
		if (Globals._instance == null)
		{
			Globals._instance = new Globals();
		}
		return Globals._instance;
	}

	// instance methods

	handleEventTimerTick()
	{
		this.network.updateForTimerTick();

		this.inputHelper.updateForTimerTick();

		this.displayHelper.drawBackground();
		this.displayHelper.drawNetwork
		(
			this.network
		);
	}

	initialize
	(
		millisecondsPerTimerTick,
		viewSizeInPixels,
		network
	)
	{
		this.network = network;

		this.displayHelper = new DisplayHelper();
		this.displayHelper.initialize(viewSizeInPixels);

		this.inputHelper = new InputHelper();
		this.inputHelper.initialize();

		this.interval = setInterval
		(
			this.handleEventTimerTick.bind(this), 
			millisecondsPerTimerTick
		);
	}
}
