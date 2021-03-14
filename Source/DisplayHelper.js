
class DisplayHelper
{
	drawBackground()
	{
		this.graphics.fillStyle = "White";
		this.graphics.strokeStyle = "Gray";

		this.graphics.fillRect
		(
			0, 0,
			this.viewSize.x, this.viewSize.y
		);

		this.graphics.strokeRect
		(
			0, 0,
			this.viewSize.x, this.viewSize.y
		);
	}

	drawNetwork(networkToDraw)
	{
		this.graphics.strokeStyle = "Gray";

		var links = networkToDraw.links;
		var nodes = networkToDraw.nodes;
		var movers = networkToDraw.movers;

		for (var i = 0; i < links.length; i++)
		{
			var link = links[i];

			this.drawNetwork_Link
			(
				networkToDraw,
				link
			);	
		}

		for (var i = 0; i < nodes.length; i++)
		{
			var node = nodes[i];
			this.drawNetwork_Node
			(
				networkToDraw, 
				node
			);
		}

		for (var i = 0; i < movers.length; i++)
		{
			var mover = movers[i];

			this.drawNetwork_Mover
			(
				networkToDraw, 
				mover
			);
		}
	}

	drawNetwork_Link(network, link)
	{
		this.graphics.strokeStyle = 
		(
			link.hasBeenTraversedByPlayer == true 
			? "Black"
			: "Gray"
		); 

		var startPos = network.nodes[link.nodeIndicesFromTo[0]].pos;
		var endPos = network.nodes[link.nodeIndicesFromTo[1]].pos

		this.graphics.beginPath();
		this.graphics.moveTo(startPos.x, startPos.y);
		this.graphics.lineTo(endPos.x, endPos.y);
		this.graphics.stroke();
	}

	drawNetwork_Mover(network, mover)
	{
		if (mover.name == "Player")
		{
			this.drawNetwork_Mover_Player(network, mover);
		}
		else
		{
			this.drawNetwork_Mover_Enemy(network, mover);
		}
	}

	drawNetwork_Mover_Enemy(network, mover)
	{
		var cursorSize = 8;
		var cursorSizeHalf = cursorSize / 2;

		var drawPos = mover.pos();

		var colorToUse = 
		(
			mover.hasBeenEaten == true
			? "LightGray"
			: "Gray"
		);

		this.graphics.strokeStyle = colorToUse;
		this.graphics.moveTo(drawPos.x,	drawPos.y - cursorSizeHalf),
		this.graphics.lineTo(drawPos.x + cursorSizeHalf, drawPos.y + cursorSizeHalf),
		this.graphics.lineTo(drawPos.x - cursorSizeHalf, drawPos.y + cursorSizeHalf),
		this.graphics.closePath();
		this.graphics.stroke();

	}

	drawNetwork_Mover_Player(network, mover)
	{
		var cursorSize = 8;
		var cursorSizeHalf = cursorSize / 2;

		var nodePrevPos = network.nodes[mover.nodeIndexPrev].pos;

		var nodeNextPos;

		var linkBeingTraversed = mover.linkBeingTraversed;

		if (linkBeingTraversed == null)
		{
			nodeNextPos = nodePrevPos;
		}
		else
		{
			var nodeNextIndex = 
			(
				linkBeingTraversed.nodeIndicesFromTo[0] == mover.nodeIndexPrev
				? linkBeingTraversed.nodeIndicesFromTo[1]
				: linkBeingTraversed.nodeIndicesFromTo[0]
			);

			var nodeNextPos = network.nodes[nodeNextIndex].pos;
		}

		var displacementFromNodePrevToNext = nodeNextPos.clone().subtract
		(
			nodePrevPos
		);

		var distanceFromNodePrevToNext = displacementFromNodePrevToNext.magnitude();

		var drawPos = nodePrevPos.clone();

		if (distanceFromNodePrevToNext > 0)
		{
			var displacementFromNodePrevToMover = displacementFromNodePrevToNext.divideScalar
			(
				distanceFromNodePrevToNext
			).multiplyScalar
			(
				mover.distanceAlongLinkBeingTraversed
			);

			drawPos.add
			(
				displacementFromNodePrevToMover						
			);
		}

		this.graphics.strokeStyle = "Black";
		this.graphics.beginPath();
		this.graphics.moveTo(nodePrevPos.x, nodePrevPos.y);
		this.graphics.lineTo(drawPos.x, drawPos.y);
		this.graphics.stroke();

		var colorToUse = 
		(
			mover.powerUpTicksRemaining > 0 
			? "Black"
			: "Gray"
		);

		this.graphics.strokeStyle = "Gray";	
		this.graphics.strokeRect
		(
			drawPos.x - cursorSizeHalf,
			drawPos.y - cursorSizeHalf,
			cursorSize,
			cursorSize
		);
	}

	drawNetwork_Node(network, node)
	{
		if (node.hasPowerup == true)
		{
			var powerupSize = 8;
			var powerupSizeHalf = powerupSize / 2;

			var drawPos = node.pos;

			this.graphics.strokeStyle = "Gray";
			this.graphics.beginPath();
			this.graphics.moveTo(drawPos.x - powerupSizeHalf, drawPos.y);
			this.graphics.lineTo(drawPos.x, drawPos.y - powerupSizeHalf);
			this.graphics.lineTo(drawPos.x + powerupSizeHalf, drawPos.y);
			this.graphics.lineTo(drawPos.x, drawPos.y + powerupSizeHalf);
			this.graphics.closePath();
			this.graphics.stroke();
		}
	}

	initialize(viewSize)
	{
		this.viewSize = viewSize;

		var canvas = document.createElement("canvas");
		canvas.width = this.viewSize.x;
		canvas.height = this.viewSize.y;
		document.body.appendChild(canvas);

		this.graphics = canvas.getContext("2d");
	}
}
