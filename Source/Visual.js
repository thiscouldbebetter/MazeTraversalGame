
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

		var enemyVisualVulnerable =
			VisualBuilder.faceOfColorWithRadius
			(
				colors.Blue, radiusPlayer
			);

		var enemyVisualEaten =
			VisualBuilder.faceOfColorWithRadius
			(
				colors.Transparent, radiusPlayer
			);

		var enemyVisualBuild = (enemyVisualNormal) =>
		{
			return new VisualDynamic
			(
				(u, w, p, e) =>
				{
					var visualSelected;
					if (e.hasBeenEaten)
					{
						visualSelected = enemyVisualEaten;
					}
					else
					{
						var player = p.network.moverForPlayer;
						var isVulnerable =
							(player.powerupTicksRemaining > 0);
						visualSelected =
						(
							isVulnerable
							? enemyVisualVulnerable
							: enemyVisualNormal
						);
					}
					return visualSelected;
				}
			)
		};

		var enemyAmbusherNormal = VisualBuilder.faceOfColorWithRadius
		(
			colors.Pink, radiusPlayer
		);

		this.EnemyAmbusher = new VisualNamed
		(
			"EnemyAmbusher",
			enemyVisualBuild(enemyAmbusherNormal)
		);

		var enemyChaserNormal = VisualBuilder.faceOfColorWithRadius
		(
			colors.Red, radiusPlayer
		);

		this.EnemyChaser = new VisualNamed
		(
			"EnemyChaser",
			enemyVisualBuild(enemyChaserNormal)
		);

		var enemyFlankerNormal = VisualBuilder.faceOfColorWithRadius
		(
			colors.Cyan, radiusPlayer
		);

		this.EnemyFlanker = new VisualNamed
		(
			"EnemyFlanker",
			enemyVisualBuild(enemyFlankerNormal)
		);

		var enemyLurkerNormal = VisualBuilder.faceOfColorWithRadius
		(
			colors.Orange, radiusPlayer
		);

		this.EnemyLurker = new VisualNamed
		(
			"EnemyLurker",
			enemyVisualBuild(enemyLurkerNormal)
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
