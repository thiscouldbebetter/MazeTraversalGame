
class Visual
{
	static byName(name)
	{
		return Visual.Instances().byName(name);
	}

	static Instances()
	{
		if (Visual._instances == null)
		{
			Visual._instances = new Visual_Instances();
		}
		return Visual._instances;
	}
}

class Visual_Instances
{
	constructor()
	{
		var colors = Color.Instances();

		var radiusPlayer = 8;

		this.EnemyAmbusher = new VisualNamed
		(
			"EnemyAmbusher",
			VisualBuilder.faceOfColorWithRadius
			(
				colors.Pink, radiusPlayer
			)
		);

		this.EnemyChaser = new VisualNamed
		(
			"EnemyChaser",
			VisualBuilder.faceOfColorWithRadius
			(
				colors.Red, radiusPlayer
			)
		);

		this.EnemyFlanker = new VisualNamed
		(
			"EnemyFlanker",
			VisualBuilder.faceOfColorWithRadius
			(
				colors.Cyan, radiusPlayer
			)
		);

		this.EnemyLurker = new VisualNamed
		(
			"EnemyLurker",
			VisualBuilder.faceOfColorWithRadius
			(
				colors.Orange, radiusPlayer
			)
		);

		var player = VisualBuilder.faceOfColorWithRadius(colors.Gray, radiusPlayer);

		this.Player = new VisualNamed
		(
			"Player", player
		);

		var radiusPowerup = radiusPlayer;
		var radiusPowerupGleam = radiusPowerup / 4;

		this.Powerup = new VisualNamed
		(
			"PowerUp",
			new VisualMultiple
			([
				new VisualCircle(colors.Blue.name, radiusPowerup),
				new VisualOffset
				(
					new Coords(-1, -1).multiplyScalar(radiusPowerupGleam),
					new VisualCircle(colors.White.name, radiusPowerupGleam)
				)
			])
		);

		this._All =
		[
			this.EnemyAmbusher,
			this.EnemyChaser,
			this.EnemyFlanker,
			this.EnemyLurker,
			this.Player,
			this.Powerup
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x] ) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
