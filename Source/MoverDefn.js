
class MoverDefn
{
	constructor(name, intelligence, visual)
	{
		this.name = name;
		this.intelligence = intelligence;
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

		var intelligenceAmbusher = Intelligence_Machine.ambusher();
		var intelligenceChaser = Intelligence_Machine.chaser();
		var intelligenceFlanker = Intelligence_Machine.flanker();
		var intelligenceLurker = Intelligence_Machine.lurker();

		this.EnemyAmbusher = new MoverDefn
		(
			"EnemyAmbusher",
			intelligenceAmbusher,
			visuals.EnemyAmbusher
		);

		this.EnemyChaser = new MoverDefn
		(
			"EnemyChaser",
			intelligenceChaser,
			visuals.EnemyChaser
		);

		this.EnemyFlanker = new MoverDefn
		(
			"EnemyFlanker",
			intelligenceFlanker,
			visuals.EnemyFlanker
		);

		this.EnemyLurker = new MoverDefn
		(
			"EnemyLurker",
			intelligenceLurker,
			visuals.EnemyLurker
		);

		this.Player = new MoverDefn
		(
			"Player",
			new Intelligence_Human(),
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
