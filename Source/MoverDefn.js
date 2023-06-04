
class MoverDefn
{
	constructor(name, visual)
	{
		this.name = name;
		this.visual = visual;
	}

	static Instances()
	{
		if (MoverDefn._instances == null)
		{
			MoverDefn._instances =
				new MoverDefn_Instances();
		}
		return MoverDefn._instances;
	}

	static byName(name)
	{
		return MoverDefn.Instances().byName(name);
	}
}

class MoverDefn_Instances
{
	constructor()
	{
		var colors = Color.Instances();
		var sizeDefault = new Coords(10, 10);

		this.Enemy = new MoverDefn
		(
			"Enemy",
			VisualRectangle.fromSizeAndColorName
			(
				sizeDefault, colors.Red.name
			)
		);

		this.Player = new MoverDefn
		(
			"Player",
			VisualRectangle.fromSizeAndColorName
			(
				sizeDefault, colors.Blue.name
			)
		);

		this._All =
		[
			this.Enemy,
			this.Player
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x] ) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
