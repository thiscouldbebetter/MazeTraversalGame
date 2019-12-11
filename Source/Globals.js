
function Globals()
{}
{
	// instance

	Globals.Instance = new Globals();

	// instance methods

	Globals.prototype.handleEventTimerTick = function()
	{
		this.network.updateForTimerTick();

		this.inputHelper.updateForTimerTick();

		this.displayHelper.drawBackground();
		this.displayHelper.drawNetwork
		(
			this.network
		);
	}

	Globals.prototype.initialize = function
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
