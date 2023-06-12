
class VenueMessage
{
	constructor(message, acknowledge)
	{
		this.message = message;
		this._acknowledge = acknowledge;
	}

	acknowledge(universe)
	{
		this._acknowledge(universe);
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
		world.draw(universe);

		var display = universe.display;

		var centerPos = display.sizeInPixelsHalf;
		display.drawTextWithFontHeightAndColorAtCenterPos
		(
			this.message,
			"sans-serif", // fontName
			48, // heightInPixels
			Color.Instances().Gray,
			centerPos
		);

		var inputHelper = universe.inputHelper;
		if (inputHelper.keyIsPressed("Enter"))
		{
			this.acknowledge(universe);
		}
	}
}
