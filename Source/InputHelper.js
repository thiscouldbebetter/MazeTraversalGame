
class InputHelper
{
	constructor()
	{
		this.keysPressed = [];
	}

	keyIsPressed(keyToCheck)
	{
		return (this.keysPressed.indexOf(keyToCheck) >= 0);
	}

	keyRelease(keyToRelease)
	{
		var keyIndex = this.keysPressed.indexOf(keyToRelease);
		if (keyIndex >= 0)
		{
			this.keysPressed.splice(keyIndex, 1);
		}
	}

	initialize()
	{
		var body = document.body;
		body.onkeydown = this.handleEventKeyDown.bind(this);
		body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	updateForTimerTick()
	{
		// todo
	}

	// Event handlers.

	handleEventKeyDown(event)
	{
		var key = event.key;
		if (this.keysPressed.indexOf(key) == -1)
		{
			this.keysPressed.push(key);
		}
	}

	handleEventKeyUp(event)
	{
		var key = event.key;
		this.keyRelease(key);
	}

}
