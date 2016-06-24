
function InputHelper()
{}
{
	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		this.keyCodePressed = event.keyCode;
	}

	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	InputHelper.prototype.updateForTimerTick = function()
	{
		this.keyCodePressed = null;
	}
}
