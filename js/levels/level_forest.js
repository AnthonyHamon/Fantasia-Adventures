let forestLevel;
function initLevel(level){
    if(level === 'The Forest')
forestLevel = new Level(
        level,
    [
        // Snake,
        new Ent(),
        new Bear(),
        new Spider(),
        new Endboss(),
    ],

    [
        // Clouds
    ],

    [
        // Background Objects
    ],

    [
        new BlockCollision(538, 280, 48, 18),
        new BlockCollision(1792, 240, 48, 256),
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

        new Wall('img/level_set/forest/Tiles/Ground_grass_0003_tile.png', 1792, 476),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0004_tile.png', 1856, 476),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0005_tile.png', 1920, 476),

        new Wall('img/level_set/forest/Tiles/Ground_grass_0012_tile.png', 1792, 512),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0004_tile.png', 1856, 512),
        new Wall('img/level_set/forest/Tiles/Ground_grass_0011_tile.png', 1920, 512),
    ],

    [
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', -192, 300),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', -128, 300),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0022_tile.png', 336, 368),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 466, 304),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0017_tile.png', 530, 240, 30, 21, 10, 8),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 592, 304),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 1256, 368),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 1320, 368),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 1480, 272),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 1544, 272),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 1656, 320),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 1720, 320),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0000_tile.png', 1792, 220),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 1856, 220),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0027_tile.png', 1920, 220),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0037_tile.png', 2368, 120, 30, 21, 20),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0036_tile.png', 2432, 120, 30, 21),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0035_tile.png', 2496, 120, 30, 21, 0, 20),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0034_tile.png', 2594, 100, 30, 21, 20, 20),

        new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', 2752, 80),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', 2816, 80),
    ],

    [
        new Tree('img/level_set/forest/Objects/128/object_0001_tree2.png', -128, 400),
        new WoodBox('img/level_set/forest/Objects/32/object_0009_lootbox.png', 336, 492),
        new DirectionPanel('img/level_set/forest/Objects/32/object_0002_pointer_forward.png', 700, 498),
        new BigTree('img/level_set/forest/Objects/256/tree.png', 632, 322),
        new Tree('img/level_set/forest/Objects/128/object_0002_tree3.png', 1716, 426),
        new BigTree('img/level_set/forest/Objects/256/tree.png', 1920, 26),
        new Tree('img/level_set/forest/Objects/128/object_0003_bush1.png', 1928, 438),
        new Tree('img/level_set/forest/Objects/128/object_0003_bush1.png', 2670, 138),
        new Tree('img/level_set/forest/Objects/256/tree.png', 2700, 126),
        new Tree('img/level_set/forest/Objects/128/object_0002_tree3.png', 2732, 130),
        new Tree('img/level_set/forest/Objects/256/tree.png', 2764, 126),
        new Tree('img/level_set/forest/Objects/128/object_0003_bush1.png', 2800, 138),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0019_tile.png', 528, 304),
        new Platforms('img/level_set/forest/Tiles/Ground_grass_0018_tile.png', 528, 368),
    ],

    [
        new Coin(350, 330),
        new Coin(480, 268),
        new Coin(610, 268),
        new Coin(984, 268),
        new Coin(1305, 330),
        new Coin(1534, 228),
        new Coin(2608, 80),
        new Coin(2608, 440),

        new Heart(546, 216),
        new Heart(1698, 428),
        new Heart(1698, 288),
        new Heart(2840, 40),
        new Heart(2292, 440),

        new EnergyPotions(840, 400),
        new EnergyPotions(1440, 350),
        new EnergyPotions(1980, 500),
        new EnergyPotions(2040, 300),
        new EnergyPotions(2292, 180),
        new EnergyPotions(2840, 300),
        new EnergyPotions(2760, 40)
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
    new Audio('../audio/walk_grass.mp3'),
    new Audio('../audio/collect.mp3'),
);
addSnakes(forestLevel);
setGround(forestLevel);
setFirstFloor(forestLevel);
setBackground(forestLevel);
setClouds(forestLevel);
setStairway(forestLevel);
return forestLevel;
}

function addSnakes(forestLevel) {
    for (let j = 0; j < 18; j++) {
        const snake = new Snake();
        forestLevel.enemies.push(snake);
    }
}

function setGround(forestLevel) {
    let x = -64;
    const firstGroundItem = new Ground('img/level_set/forest/Tiles/Ground_grass_0000_tile.png', -128);
    forestLevel.ground.push(firstGroundItem);
    for (let index = 0; index < (forestLevel.level_end_x / 64); index++) {
        const ground = new Ground('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', x);
        forestLevel.ground.push(ground);
        x = x + 64;
    }
    const lastGroundItem = new Ground('img/level_set/forest/Tiles/Ground_grass_0002_tile.png', forestLevel.level_end_x - 64);
    forestLevel.ground.push(lastGroundItem);
}

function setFirstFloor(forestLevel) {
    let x = 1984;
    let numberOfImages = Math.round((forestLevel.level_end_x - x) / 64);
    for (let index = 0; index < numberOfImages; index++) {
        const floor = new Platforms('img/level_set/forest/Tiles/Ground_grass_0024_tile.png', x, 220);
        forestLevel.platforms.push(floor);
        x = x + 64;
    }
}

function setBackground(forestLevel) {
    let x = -960;
    let numberOfImages = Math.round(forestLevel.level_end_x / this.canvas.width);
    for (let index = 0; index < numberOfImages + 1; index++) {
        const sky = new BackgroundObject('img/level_set/forest/Background/Bright/sky.png', x);
        const bigClouds = new BackgroundObject('img/level_set/forest/Background/Bright/clouds_back_layer2.png', x);
        const middelClouds = new BackgroundObject('img/level_set/forest/Background/Bright/clouds_back_layer1.png', x);
        const mountains = new BackgroundObject('img/level_set/forest/Background/Bright/mountains.png', x);
        const treeBackground = new BackgroundObject('img/level_set/forest/Background/Bright/trees.png', x);
        forestLevel.backgroundObjects.push(sky, bigClouds, middelClouds, mountains, treeBackground);
        x = x + this.canvas.width;
    }
}

function setClouds(forestLevel) {
    let x = 0;
    for (let index = 0; index < 10; index++) {
        const cloud = new Clouds(x);
        forestLevel.clouds.push(cloud);
        x = x + this.canvas.width;
    }
}

function setStairway(forestLevel) {
    let y = 228;
    let firstStairwayTile = new Stairway('img/level_set/forest/Objects/32/object_0012_stairway_corner.png', y);
    forestLevel.stairway.push(firstStairwayTile);
    for (let index = 0; index < 8; index++) {
        let stairwayFiller = new Stairway('img/level_set/forest/Objects/32/object_0010_stairway_filler.png', y);
        forestLevel.stairway.push(stairwayFiller);
        y = y + 32;
    }
    let lastStairwayTile = new Stairway('img/level_set/forest/Objects/32/object_0011_stairway_corner2.png', 484);
    forestLevel.stairway.push(lastStairwayTile);
}