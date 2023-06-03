
class DisplayHelper
{
	constructor()
	{
		this.colorFore = "Gray";
		this.colorHighlight = "White";
		this.colorLowlight = "DarkGray";
		this.colorBack = "Black";
	}

	drawBackground()
	{
		var g = this.graphics;
		g.fillStyle = this.colorBack;
		g.strokeStyle = this.colorFore;

		g.fillRect
		(
			0, 0,
			this.viewSize.x, this.viewSize.y
		);

		g.strokeRect
		(
			0, 0,
			this.viewSize.x, this.viewSize.y
		);
	}

	drawNetwork(networkToDraw, colorName)
	{
		this.graphics.strokeStyle = this.colorFore;

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
			link.hasBeenTraversedByPlayer
			? this.colorHighlight
			: this.colorFore
		); 

		var startPos = network.nodes[link.nodeIndicesFromTo[0]].pos;
		var endPos = network.nodes[link.nodeIndicesFromTo[1]].pos

		var g = this.graphics;
		g.beginPath();
		g.moveTo(startPos.x, startPos.y);
		g.lineTo(endPos.x, endPos.y);
		g.stroke();
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
			mover.hasBeenEaten
			? this.colorLowlight
			: this.colorHighlight
		);

		var g = this.graphics;
		g.strokeStyle = colorToUse;
		g.moveTo(drawPos.x,	drawPos.y - cursorSizeHalf),
		g.lineTo(drawPos.x + cursorSizeHalf, drawPos.y + cursorSizeHalf),
		g.lineTo(drawPos.x - cursorSizeHalf, drawPos.y + cursorSizeHalf),
		g.closePath();
		g.stroke();
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

		var distanceFromNodePrevToNext =
			displacementFromNodePrevToNext.magnitude();

		var drawPos = nodePrevPos.clone();

		if (distanceFromNodePrevToNext > 0)
		{
			var displacementFromNodePrevToMover =
				displacementFromNodePrevToNext.divideScalar
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

		var g = this.graphics;

		g.strokeStyle = this.colorHighlight;
		g.beginPath();
		g.moveTo(nodePrevPos.x, nodePrevPos.y);
		g.lineTo(drawPos.x, drawPos.y);
		g.stroke();

		var colorToUse = 
		(
			mover.powerUpTicksRemaining > 0 
			? this.colorBack
			: this.colorFore
		);

		g.strokeStyle = this.colorHighlight;
		g.strokeRect
		(
			drawPos.x - cursorSizeHalf,
			drawPos.y - cursorSizeHalf,
			cursorSize,
			cursorSize
		);
	}

	drawNetwork_Node(network, node)
	{
		if (node.hasPowerup)
		{
			var powerupSize = 8;
			var powerupSizeHalf = powerupSize / 2;

			var drawPos = node.pos;

			var g = this.graphics;
			g.strokeStyle = this.colorFore;
			g.beginPath();
			g.moveTo(drawPos.x - powerupSizeHalf, drawPos.y);
			g.lineTo(drawPos.x, drawPos.y - powerupSizeHalf);
			g.lineTo(drawPos.x + powerupSizeHalf, drawPos.y);
			g.lineTo(drawPos.x, drawPos.y + powerupSizeHalf);
			g.closePath();
			g.stroke();
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
