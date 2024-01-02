class World {
    canvas;
    keyboard;
    ctx;
    camera_x = -200;


    character = new Character();

    level = forestLevel;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.addSnake();
        this.setFloor();
        this.setBackground();
        this.setClouds();
    }

    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(-this.camera_x, 0)

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.floorTiles);
        this.addObjectToMap(this.level.enemies);
        this.drawCharacter(this.character);
        this.ctx.translate(this.camera_x, 0);


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

    drawCharacter(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate((mo.width / 1.4), 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }


    addSnake() {
        for (let i = 0; i < 10; i++) {
            const snake = new Snake();
            this.level.enemies.push(snake);
        }
    }

    setFloor() {
        let x = -64;
        const firstFloorItem = new Floor('img/level_set/forest/Tiles/Ground_grass_0000_tile.png', -128);
        this.level.floorTiles.push(firstFloorItem);
        for (let index = 0; index < (this.level.level_end_x / 64); index++) {
            const floor = new Floor('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', x);
            this.level.floorTiles.push(floor);
            x = x + 64;
        }
        const lastFloorItem = new Floor('img/level_set/forest/Tiles/Ground_grass_0002_tile.png', this.level.level_end_x - 64);
        this.level.floorTiles.push(lastFloorItem);
    }

    setBackground() {
        let x = -960;
        let numberOfImages = Math.round(this.level.level_end_x / this.canvas.width);
        for (let index = 0; index < numberOfImages + 1; index++) {
            const sky = new BackgroundObject('img/level_set/forest/Background/Bright/sky.png', x);
            const bigClouds = new BackgroundObject('img/level_set/forest/Background/Bright/clouds_back_layer2.png', x);
            const middelClouds = new BackgroundObject('img/level_set/forest/Background/Bright/clouds_back_layer1.png', x);
            const mountains = new BackgroundObject('img/level_set/forest/Background/Bright/mountains.png', x);
            const trees = new BackgroundObject('img/level_set/forest/Background/Bright/trees.png', x);
            this.level.backgroundObjects.push(sky, bigClouds, middelClouds, mountains, trees);
            x = x + this.canvas.width;
        }
    }

    setClouds() {
        let x = 0;
        for (let index = 0; index < 10; index++) {
            const cloud = new Clouds(x);
            this.level.clouds.push(cloud);
            x = x + this.canvas.width;
        }

    }



}