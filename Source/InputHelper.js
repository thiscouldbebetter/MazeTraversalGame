
class InputHelper
{
	handleEventKeyDown(event)
	{
		this.keyPressed = event.key;
	}

	initialize()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	updateForTimerTick()
	{
		this.keyCode = null;
	}
}
