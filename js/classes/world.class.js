class World {
    canvas;
    ctx;
    character = new Character();
    enemies = [
        new Snake(),
        new Snake(),
        new Snake()
    ];
    clouds = [
        new Clouds()
    ];

    backgroundObjects = [
        new BackgroundObject('img/level_set/forest/Background/Bright/sky.png'),
        new BackgroundObject('img/level_set/forest/Background/Bright/clouds_back_layer2.png'),
        new BackgroundObject('img/level_set/forest/Background/Bright/clouds_back_layer1.png'),
        new BackgroundObject('img/level_set/forest/Background/Bright/mountains.png'),
        new BackgroundObject('img/level_set/forest/Background/Bright/trees.png')
    ]

    floorTiles = [
        new Floor('img/level_set/forest/Tiles/Ground_grass_0000_tile.png', 0),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 64),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 128),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 192),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 256),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 320),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 384),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 448),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0002_tile.png', 512),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0000_tile.png', 704),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 768),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 832),
        new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', 896)
    ];


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectToMap(this.backgroundObjects);
        this.addObjectToMap(this.clouds);
        this.addObjectToMap(this.floorTiles);
        this.addObjectToMap(this.enemies);
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addTomap(o);
        });
    }


    addTomap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }


}