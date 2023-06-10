
class Disposition
{
	constructor(headingInTurns, pos)
	{
		this.headingInTurns = headingInTurns;
		this.pos = pos;
	}

	static create()
	{
		return new Disposition(0, new Coords(0, 0));
	}

	clone()
	{
		return new Disposition(this.headingInTurns, this.pos.clone() );
	}

	headingAsCoords()
	{
		return Coords.fromHeadingInTurns(this.headingInTurns);
	}
}
