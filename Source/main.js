function main()
{
	var network0 = new Network
	(
		"Network0",

		NetworkNode.buildManyFromMapAsStrings
		(
			new Coords(3.6, 3.6),
			[
				"..........................................................",
				"..........................................................",
				"....00........01..........02..03..........04........05....",
				"..........................................................",
				"..........................................................",
				"..........................................................",
				"....06........07....08....09..10....11....12........13....",
				"..........................................................",
				"..........................................................",
				"....14........15....16....17..18....19....20........21....",
				"..........................................................",
				"..........................................................",
				"....................22....232425....26....................",
				"..........................................................",
				"..........................................................",
				"27............28....29......30......31....32............33",
				"..........................................................",
				"..........................................................",
				"....................34..............35....................",
				"..........................................................",
				"..........................................................",
				"....36........37....38....39..40....41....42........43....",
				"..........................................................",
				"..........................................................",
				"....44..45....46....47....484950....51....52....53..54....",
				"..........................................................",
				"..........................................................",
				"....55..56....57....58....59..60....61....62....63..64....",
				"..........................................................",
				"..........................................................",
				"....65....................66..67....................68....",
				"..........................................................",
				"..........................................................",

			]	
		),

		// nodeIndexPairsAdjacent
		[
			// top

			[0, 1],
			[1, 2],
			[3, 4],
			[4, 5],

			[0, 6],
			[1, 7],
			[2, 9],
			[3, 10],
			[4, 12],
			[5, 13],

			[6, 7],
			[7, 8],
			[8, 9],
			[9, 10],
			[10, 11],
			[11, 12],
			[12, 13],

			[6, 14],
			[7, 15],
			[8, 16],
			[11, 19],
			[12, 20],
			[13, 21],
			
			[14, 15],
			[16, 17],
			[18, 19],
			[20, 21],

			[15, 28],
			[17, 23],
			[18, 25],
			[20, 32],
			
			[22, 23],
			[23, 24],
			[24, 25],
			[25, 26],
		
			[22, 29],
			[24, 30], 
			[26, 31],

			// midline

			[27, 28],
			[28, 29],
			[31, 32],
			[32, 33],

			[29, 34],
			[31, 35],

			[34, 35],

			[34, 38],
			[35, 41],
			
			[36, 37],
			[37, 38],
			[38, 39],
			[40, 41],
			[41, 42],
			[42, 43],

			[36, 44],
			[37, 46],
			[39, 48],
			[40, 50],
			[42, 52],
			[43, 54],

			[44, 45],
			[46, 47],
			[47, 48],
			[48, 49],
			[49, 50],
			[50, 51],
			[51, 52],
			[53, 54],

			[45, 56],
			[46, 57],
			[47, 58],
			[51, 61],
			[52, 62],
			[53, 63],

			[55, 56],
			[56, 57],
			[58, 59],
			[60, 61],
			[62, 63],
			[63, 64],

			[55, 65],
			[59, 66],
			[60, 67],
			[64, 68],

			// bottom			
			[65, 66],
			[66, 67],
			[67, 68],
		],
		// indicesOfNodesWithPowerups
		[
			0,
		],
		4, // numberOfEnemiesToSpawn
		49, // indexOfNodeToSpawnPlayerFrom
		30 // indexOfNodeToSpawnEnemiesFrom
	);

	var path = Path.findPathBetweenNodesInNetwork
	(
		network0.nodes[0],
		network0.nodes[network0.nodes.length - 1],
		network0
	);

	Globals.Instance.initialize
	(
		100, // millisecondsPerTimerTick
		new Coords(100, 120), // viewSizeInPixels
		network0
	);
}