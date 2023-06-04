
class Color
{
	constructor(name, systemColor)
	{
		this.name = name;
		this.systemColor = systemColor;
	}

	static Instances()
	{
		if (Color._instances == null)
		{
			Color._instances = new Color_Instances();
		}
		return Color._instances;
	}

	static byName(name)
	{
		return Color.Instances().byName(name);
	}
}

class Color_Instances
{
	constructor()
	{
		this.Black = new Color("Black", "Black");
		this.Blue = new Color("Blue", "Blue");
		this.Red = new Color("Red", "Red");
		this.White = new Color("White", "White");

		this._All =
		[
			this.Black,
			this.Blue,
			this.Red,
			this.White
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x] ) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}