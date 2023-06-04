
class Coords
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}

	static ones()
	{
		return new Coords(1, 1);
	}

	static zeroes()
	{
		return new Coords(0, 0);
	}

	absolute()
	{
		this.x = Math.abs(this.x);
		this.y = Math.abs(this.y);
		
		return this;
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;

		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y);
	}

	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;

		return this;
	}

	dotProduct(other)
	{
		return this.x * other.x + this.y * other.y;
	}

	equals(other)
	{
		return (this.x == other.x && this.y == other.y);
	}

	half()
	{
		return this.divideScalar(2);
	}

	magnitude()
	{
		return Math.sqrt
		(
			this.x * this.x
			+ this.y * this.y
		);
	}


	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;

		return this;
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;

		return this;
	}

	normalize()
	{
		var magnitude = this.magnitude();

		if (magnitude > 0)
		{
			this.divideScalar(magnitude);
		}

		return this;
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;

		return this;
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;

		return this;
	}

	sumOfComponents()
	{
		return this.x + this.y;
	}

	toString()
	{
		return "x" + this.x + "y" + this.y;
	}
}
