class World {
    canvas;
    keyboard;
    ctx;
    camera_x = 200;


    character = new Character();
    characterInformations = new CharacterInformations();
    lifeBar = [];
    energyBar = [];
    magicBar = [];
    coinBar = [];
    characterAvatar = new CharacterAvatar(this.character.CHARACTERAVATAR);
    START = false;


    level = forestLevel;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.addSnakes();
        this.setGround();
        this.setFirstFloor();
        this.setBackground();
        this.setClouds();
        this.setStairway();
        this.checkMagicalAttackCollision();
        this.checkEnemiesDeath();
        this.setLifeBar();
        this.setEnergyBar();
        this.setMagicBar();
        this.setCoinBar();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        })
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(-this.camera_x, 0)

        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.ground);
        this.addObjectToMap(this.level.firstFloor);
        this.addObjectToMap(this.level.wall);
        this.addObjectToMap(this.level.platforms);
        this.addObjectToMap(this.level.decorations);
        this.addObjectToMap(this.level.collectableObjects);
        this.addObjectToMap(this.level.stairway);
        this.addObjectToMap(this.level.enemies, this.character);
        this.addObjectToMap(this.level.longRangeAttacks);
        this.addObjectToMap(this.level.throwableObjects);

        this.ctx.translate(this.camera_x, 0)
        // ------ space for fixed objects
        this.addTomap(this.characterInformations);
        this.addTomap(this.characterAvatar);
        this.addObjectToMap(this.lifeBar);
        this.addObjectToMap(this.energyBar);
        this.addObjectToMap(this.magicBar);
        this.addObjectToMap(this.coinBar);
        this.ctx.translate(-this.camera_x, 0);

        this.drawCharacter(this.character);
        this.ctx.translate(this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    checkEnemiesDeath() {
        setInterval(() => {
            this.removeEnemyAfterDeath();
        }, 150);
    }

    // trying to improve function to stay on platform

    // checkPlatformsCollision() {
    //     this.level.platforms.forEach(platform => {
    //         // if(!this.character.isColliding(platform)){
    //         //     this.character.obstacle = false;            // need help to resolve this, obstacle switch between true and false because of isColliding. 
    //         // }

    //         if (this.character.comesFromTop(platform)) {
    //             this.character.isOnPlatform = true;
    //             this.character.y = platform.y + platform.offset.top - this.character.height + this.character.offset.bottom;
    //         }
    //         // if (this.character.isColliding(platform) && !this.character.isOnPlatformTop(platform)) {
    //         //     this.character.isOnPlatform = true;
    //         // }
    //         // if(this.character.collideFromSide(platform)){
    //         //     console.log('coliding')
    //         //     this.character.obstacle = true;             // need help to resolve this, obstacle switch between true and false because of isColliding. 
    //         // }
    //         if (this.character.isOnPlatformTop(platform)) {
    //             this.character.isOnPlatform = false;
    //         }
    //     });
    // }

    checkMagicalAttackCollision() {
        setInterval(() => {
            this.level.longRangeAttacks.forEach(attack => {
                this.level.enemies.forEach(enemy => {
                    if (attack.isColliding(enemy) && !(enemy instanceof Snake)) {
                        enemy.hit(2.5);
                    }
                })
            })
        }, 150);
    }

    removeEnemyAfterDeath() {
        this.level.enemies.forEach((enemy, index) => {
            if (enemy.isDead() && !enemy.deathAnimationStarted) {
                enemy.startDeathAnimation();
            }
            if (enemy.deathAnimationEnded) {
                this.level.enemies.splice(index, 1);
            }
        })
    }

    // throwObjects() {
    //     if (!this.character.isDead() && this.keyboard.E) {
    //         let bottle = new throwableObjects(this.character.x + 35, this.character.y + 5);
    //         this.level.longRangeAttacks.push(bottle);
    //     }
    // }


    addObjectToMap(objects) {
        try {
            objects.forEach(o => {
                this.addTomap(o);
            });
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('could not load image:', objects);
        }
    }


    addTomap(obj) {
        if (obj.otherDirection) {
            this.flipImage(obj);
        }
        try {
            this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);                  // remove try catch when finished 
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('could not load image:', this.img.src);
        }
        if (obj.otherDirection) {
            this.flipImageBack(obj);
        }

            // this.drawColisionFrame(obj);
            // this.drawOffsetColisionFrame(obj);
        
        if((obj instanceof Platforms)){
            this.drawColisionFrame(obj); 
            this.drawOffsetColisionFrame(obj);
        }
        

    }

    drawColisionFrame(mo) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '3';
        this.ctx.strokeStyle = 'blue';
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();
    }

    drawOffsetColisionFrame(mo) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '3';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(mo.x + mo.offset.left, mo.y + mo.offset.top, mo.width - (mo.offset.right + mo.offset.left), mo.height - (mo.offset.top + mo.offset.bottom));
        this.ctx.stroke();
    }

    drawCharacter(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        this.drawColisionFrame(mo);
        this.drawOffsetColisionFrame(mo);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate((mo.width / 1.2), 0);

        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    addSnakes() {
        for (let j = 0; j < 11; j++) {
            const snake = new Snake();
            this.level.enemies.push(snake);
        }
    }

    setGround() {
        let x = -64;
        const firstGroundItem = new Ground('img/level_set/forest/Tiles/Ground_grass_0000_tile.png', -128);
        this.level.ground.push(firstGroundItem);
        for (let index = 0; index < (this.level.level_end_x / 64); index++) {
            const ground = new Ground('img/level_set/forest/Tiles/Ground_grass_0001_tile.png', x);
            this.level.ground.push(ground);
            x = x + 64;
        }
        const lastGroundItem = new Ground('img/level_set/forest/Tiles/Ground_grass_0002_tile.png', this.level.level_end_x - 64);
        this.level.ground.push(lastGroundItem);
    }

    setFirstFloor() {
        let x = 1920;
        let numberOfImages = Math.round((this.level.level_end_x - x) / 64);
        for (let index = 0; index < numberOfImages; index++) {
            const floor = new Platforms('img/level_set/forest/Tiles/Ground_grass_0024_tile.png', x, 220);
            this.level.platforms.push(floor);
            x = x + 64;
        }
    }

    setBackground() {
        let x = -960;
        let numberOfImages = Math.round(this.level.level_end_x / this.canvas.width);
        for (let index = 0; index < numberOfImages + 1; index++) {
            const sky = new BackgroundObject('img/level_set/forest/Background/Bright/sky.png', x);
            const bigClouds = new BackgroundObject('img/level_set/forest/Background/Bright/clouds_back_layer2.png', x);
            const middelClouds = new BackgroundObject('img/level_set/forest/Background/Bright/clouds_back_layer1.png', x);
            const mountains = new BackgroundObject('img/level_set/forest/Background/Bright/mountains.png', x);
            const treeBackground = new BackgroundObject('img/level_set/forest/Background/Bright/trees.png', x);
            this.level.backgroundObjects.push(sky, bigClouds, middelClouds, mountains, treeBackground);
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

    setStairway() {
        let y = 228;
        let firstStairwayTile = new Stairway('img/level_set/forest/Objects/32/object_0012_stairway_corner.png', y);
        this.level.stairway.push(firstStairwayTile);
        for (let index = 0; index < 7; index++) {
            let stairwayFiller = new Stairway('img/level_set/forest/Objects/32/object_0010_stairway_filler.png', y);
            this.level.stairway.push(stairwayFiller);
            y = y + 32;
        }
        let lastStairwayTile = new Stairway('img/level_set/forest/Objects/32/object_0011_stairway_corner2.png', 452);
        this.level.stairway.push(lastStairwayTile);
    }

    setLifeBar() {
        let x = 80;
        let percentage = this.character.life;
        if (percentage > 0) {
            let HPCorner = new LifeBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_corner1.png', x, 4);
            this.lifeBar.push(HPCorner);
            for (let index = 1; index < percentage; index++) {
                let HP = new LifeBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_point.png', x + 4, 2);
                this.lifeBar.push(HP);
                x = x + 1.1;
            }
        }
        if (percentage = percentage * 4) {
            let HPEndCorner = new LifeBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_corner2.png', x + 4, 4);
            this.lifeBar.push(HPEndCorner);
        }
    }

    setEnergyBar() {
        let x = 79;
        let percentage = this.character.maxEnergy;
        if (percentage > 0) {
            let energyCorner = new EnergyBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/stamina_corner1.png', x, 4);
            this.energyBar.push(energyCorner);
            for (let index = 1; index < percentage; index++) {
                let energy = new EnergyBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/stamina_point.png', x + 4, 2);
                this.energyBar.push(energy);
                x = x + 1.1;
            }
        }
        if (percentage = percentage * 4) {
            let energyEndCorner = new EnergyBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/stamina_corner2.png', x + 4, 4);
            this.energyBar.push(energyEndCorner);
        }
    }

    setMagicBar() {
        let x = 79;
        let percentage = this.character.maxMagicalEnergy;
        if (percentage > 0) {
            let magicEnergyCorner = new MagicBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_corner1.png', x, 4);
            this.magicBar.push(magicEnergyCorner);
            for (let index = 1; index < percentage; index++) {
                let magicEnergy = new MagicBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_point.png', x + 4, 2);
                this.magicBar.push(magicEnergy);
                x = x + 1.1;
            }
        }
        if (percentage = percentage * 4) {
            let magicEnergyEndCorner = new MagicBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/magic_corner2.png', x + 4, 4);
            this.magicBar.push(magicEnergyEndCorner);
        }
    }

    setCoinBar() {
        let x = 79;
        let percentage = this.character.maxCoin;
        if (percentage > 0) {
            let coinBarCorner = new CoinBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/coin_corner1.png', x, 4);
            this.coinBar.push(coinBarCorner);
            for (let index = 1; index < percentage; index++) {
                let coin = new CoinBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/coin_point.png', x + 4, 2);
                this.coinBar.push(coin);
                x = x + 1.1;
            }
        }
        if (percentage = percentage * 4) {
            let coinEndCorner = new CoinBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/coin_corner2.png', x + 4, 4);
            this.coinBar.push(coinEndCorner);
        }
    }

    resetLifeBar() {
        this.lifeBar.splice(0);
    }

    resetEnergyBar() {
        this.energyBar.splice(0);
    }

    resetMagicBar() {
        this.magicBar.splice(0);
    }

    resetCoinBar() {
        this.coinBar.splice(0);
    }
}