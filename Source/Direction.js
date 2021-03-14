
class Direction
{
	constructor(name, offset)
	{
		this.name = name;
		this.offset = offset;
	}

	static Instances()
	{
		if (Direction._instances == null)
		{
			Direction._instances = new Direction_Instances();
		}
		return Direction._instances;
	}
}

class Direction_Instances
{
	constructor()
	{
		this.East = new Direction("East", new Coords(1, 0));
		this.North = new Direction("North", new Coords(0, -1));
		this.South = new Direction("South", new Coords(0, 1));
		this.West = new Direction("West", new Coords(-1, 0));

		this._All = 
		[
			this.East,
			this.North,
			this.South,
			this.West,
		];

		for (var i = 0; i < this._All.length; i++)
		{
			var direction = this._All[i];
			this._All[direction.name] = direction;
		}
	}
}
