
class NetworkLink
{
	constructor(nodeIndicesFromTo, isInstant)
	{
		this.nodeIndicesFromTo = nodeIndicesFromTo;
		this.isInstant = isInstant || false;

		this.hasBeenTraversedByPlayer = false;
		this._displacement = new Coords();
	}

	length(network)
	{
		var returnValue;
		if (this.isInstant)
		{
			returnValue = 0;
		}
		else
		{
			var nodeIndexFrom = this.nodeIndicesFromTo[0];
			var nodeIndexTo = this.nodeIndicesFromTo[1];
			var nodes = network.nodes;
			var nodeFrom = nodes[nodeIndexFrom];
			var nodeTo = nodes[nodeIndexTo];
			var displacement = this._displacement.overwriteWith
			(
				nodeTo.pos
			).subtract
			(
				nodeFrom.pos
			)
			returnValue = displacement.magnitude();
		}

		return returnValue;
	}
}
