const forestLevel = new Level(
    [
        // Snake,
        new Ent(),
        new Bear(),
        new Spider(),
        new Endboss(),
        // new Snake(550, 404) // for test
    ],

    [
        // Clouds
    ],

    [
        // Background Objects
    ],

    [
        // Ground

    ],

    [
        // FirstFloor
    ],

    [
        new Wall('img/level_set/forest/Tiles/Ground_grass_0003_tile.png', 1792, 284),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0004_tile.png', 1856, 284),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0005_tile.png', 1920, 284),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0003_tile.png', 1792, 348),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0004_tile.png', 1856, 348),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0005_tile.png', 1920, 348),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0003_tile.png', 1792, 412),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0004_tile.png', 1856, 412),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0005_tile.png', 1920, 412),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0012_tile.png', 1792, 476),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0004_tile.png', 1856, 476),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0011_tile.png', 1920, 476),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0003_tile.png', 1792, 540),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0004_tile.png', 1856, 540),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0011_tile.png', 1920, 540),
    ],

    [
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', -192, 300),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', -128, 300),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0022_tile.png', 206, 368),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 336, 304),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0017_tile.png', 400, 240, 24),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0019_tile.png', 400, 304),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0018_tile.png', 400, 368),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 464, 304),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 1320, 368),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 1384, 368),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 1448, 272),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 1512, 272),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 1656, 320),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 1720, 320),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0000_tile.png', 1792, 220),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 1856, 220),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0027_tile.png', 1920, 220),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0037_tile.png', 2368, 120),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0036_tile.png', 2402, 120),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0035_tile.png', 2466, 120),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0034_tile.png', 2594, 100),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 2752, 80),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 2816, 80),
    ],

    [
        new Tree('img/level_set/forest/Objects/128/object_0001_tree2.png', -128, 360),
        new WoodBox('img/level_set/forest/Objects/32/object_0009_lootbox.png', 336, 452),
        new DirectionPanel('img/level_set/forest/Objects/32/object_0002_pointer_forward.png', 700, 458),
        new BigTree('img/level_set/forest/Objects/256/tree.png', 632, 282),
        new Tree('img/level_set/forest/Objects/128/object_0002_tree3.png', 1716, 386),
        new BigTree('img/level_set/forest/Objects/256/tree.png', 1920, 26),
        new Tree('img/level_set/forest/Objects/128/object_0003_bush1.png', 1928, 398),
        new Tree('img/level_set/forest/Objects/128/object_0003_bush1.png', 2670, 138),
        new Tree('img/level_set/forest/Objects/256/tree.png', 2700, 126),
        new Tree('img/level_set/forest/Objects/128/object_0002_tree3.png', 2732, 130),
        new Tree('img/level_set/forest/Objects/256/tree.png', 2764, 126),
        new Tree('img/level_set/forest/Objects/128/object_0003_bush1.png', 2800, 138),
        new WoodBox('img/level_set/forest/Objects/32/object_0009_lootbox.png', 416, 236),
    ],

    [
        new Coin(220, 330),
        new Coin(984, 268),
        new Coin(2608, 80),

        new Heart(480, 268),
        new Heart(500, 400), // just for test, must be removed
        new Heart(1698, 428),
        new Heart(1698, 288),
        new Heart(2800, 40),
        new Heart(2292, 180),

        new EnergyPotions(),
        new EnergyPotions(),
        new EnergyPotions(),
        new EnergyPotions(),
        new EnergyPotions(),
        new EnergyPotions(),
        new EnergyPotions(),
    ],

    [
        // Stairway
    ],

    [
        // throwableObjects
    ],

    [
        // longRangeAttacks
    ],

    [
        // closeAttacks
    ],
);

