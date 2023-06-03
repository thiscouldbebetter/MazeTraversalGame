
class TimerHelper
{
	constructor(ticksPerSecond)
	{
		this.ticksPerSecond = ticksPerSecond;
	}

	millisecondsPerTick()
	{
		return Math.round(1000 / this.ticksPerSecond);
	}

	initialize(universe)
	{
		var millisecondsPerTick =
			this.millisecondsPerTick();

		setInterval
		(
			() => universe.updateForTimerTick(),
			millisecondsPerTick
		);
	}
}