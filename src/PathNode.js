
function PathNode
(
	networkNode, 
	costFromStartBestSoFar, 
	costFromStartToGoalEstimated, 
	prev
)
{
	this.networkNode = networkNode;
	this.costFromStartBestSoFar = costFromStartBestSoFar;
	this.costFromStartToGoalEstimated = costFromStartToGoalEstimated;
	this.prev = prev;
}
