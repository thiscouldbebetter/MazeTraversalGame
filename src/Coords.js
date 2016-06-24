
// classes

function Coords(x, y)
{
	this.x = x;
	this.y = y;
}

{
	Coords.prototype.absolute = function()
	{
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		
		return this;
	}

	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;

		return this;
	}

	Coords.prototype.clone = function()
	{
		return new Coords(this.x, this.y);
	}

	Coords.prototype.divideScalar = function(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;

		return this;
	}

	Coords.prototype.dotProduct = function(other)
	{
		return this.x * other.x + this.y * other.y;
	}

	Coords.prototype.equals = function(other)
	{
		return (this.x == other.x && this.y == other.y);
	}

	Coords.prototype.magnitude = function()
	{
		return Math.sqrt
		(
			this.x * this.x
			+ this.y * this.y
		);
	}


	Coords.prototype.multiply = function(other)
	{
		this.x *= other.x;
		this.y *= other.y;

		return this;
	}

	Coords.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;

		return this;
	}

	Coords.prototype.normalize = function()
	{
		var magnitude = this.magnitude();

		if (magnitude > 0)
		{
			this.divideScalar(magnitude);
		}

		return this;
	}

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;

		return this;
	}

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;

		return this;
	}

	Coords.prototype.sumOfComponents = function()
	{
		return this.x + this.y;
	}

	Coords.prototype.toString = function()
	{
		return "x" + this.x + "y" + this.y;
	}
}
