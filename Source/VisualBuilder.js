
class VisualBuilder
{
	static faceOfColorWithRadius(color, radiusFace)
	{
		var body = new VisualCircle
		(
			color.name,
			radiusFace
		);

		var radiusCornea = radiusFace / 2;

		var cornea = new VisualCircle
		(
			"White",
			radiusCornea
		);

		var radiusPupil = radiusCornea / 2;

		var pupil = new VisualCircle
		(
			"Black",
			radiusPupil
		);

		var eye = new VisualMultiple
		([
			cornea, pupil
		]);

		var eyes = new VisualMultiple
		([
			new VisualOffset(new Coords(0 - radiusCornea, 0), eye),
			new VisualOffset(new Coords(radiusCornea, 0), eye)
		]);

		var eyesDown = new VisualOffset
		(
			new Coords(0, radiusCornea), eyes
		);

		var eyesLeft = new VisualOffset
		(
			new Coords(0 - radiusCornea, 0), eyes
		);

		var eyesRight = new VisualOffset
		(
			new Coords(radiusCornea, 0), eyes
		);

		var eyesUp = new VisualOffset
		(
			new Coords(0, 0 - radiusCornea), eyes
		);

		var eyesDirectional = new VisualDirectional
		([
			eyesRight,
			eyesDown,
			eyesLeft,
			eyesUp
		]);

		var face = new VisualMultiple
		([
			body,
			eyesDirectional
		]);

		return face;
	}
}