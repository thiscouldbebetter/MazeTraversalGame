
class NetworkLink
{
	constructor(nodeIndicesFromTo)
	{
		this.nodeIndicesFromTo = nodeIndicesFromTo;

		this.hasBeenTraversedByPlayer = false;
	}

	length(network)
	{
		var returnValue = network.nodes[this.nodeIndicesFromTo[1]].pos.clone().subtract
		(
			network.nodes[this.nodeIndicesFromTo[0]].pos
		).magnitude();

		return returnValue;
	}
}
