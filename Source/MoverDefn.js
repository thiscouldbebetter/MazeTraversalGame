
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

		var visuals = Visual.Instances();

		this.EnemyAmbusher = new MoverDefn
		(
			"EnemyAmbusher",
			visuals.EnemyAmbusher
		);

		this.EnemyChaser = new MoverDefn
		(
			"EnemyChaser",
			visuals.EnemyChaser
		);

		this.EnemyFlanker = new MoverDefn
		(
			"EnemyFlanker",
			visuals.EnemyFlanker
		);

		this.EnemyLurker = new MoverDefn
		(
			"EnemyLurker",
			visuals.EnemyLurker
		);

		this.Player = new MoverDefn
		(
			"Player",
			visuals.Player
		);

		this._All =
		[
			this.EnemyAmbusher,
			this.EnemyChaser,
			this.EnemyFlanker,
			this.EnemyLurker,
			this.Player
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x] ) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
