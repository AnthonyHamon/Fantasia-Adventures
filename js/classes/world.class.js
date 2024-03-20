class World {
    canvas;
    keyboard;
    ctx;
    camera_x = 200;


    character;
    characterInformations = new CharacterInformations();
    lifeBar = [];
    energyBar = [];
    magicBar = [];
    coinBar = [];
    START = false;
    levelDuration = Date.now();
    levelDurationEndTime;
    fullElapsedLevelTime;
    timeScore;
    endScore = 0;


    level;


    constructor(canvas, keyboard, currentCharacter, selectedLevel) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.character = currentCharacter;
        this.level = selectedLevel;
        this.keyboard = keyboard;
        this.draw();
        this.checkEnemiesCollisions();
        this.checkMagicalAttackCollision();
        this.checkCharactersDeath();
        this.checkEnemiesDeath();
        this.setCharacterLifeBar();
        this.setEnergyBar();
        this.setMagicBar();
        this.setCoinBar();
        this.setWorld();
    }

    setWorld(character) {
        if (character) this.character = character;
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        })
        this.level.longRangeAttacks.forEach(attack => {
            attack.world = this;
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
        this.addObjectToMap(this.level.stairway);
        this.addObjectToMap(this.level.collectableObjects);
        this.addObjectToMap(this.level.enemies);
        this.drawEnemiesLifeBar(this.level.enemies);
        this.addObjectToMap(this.level.longRangeAttacks);
        this.addObjectToMap(this.level.throwableObjects);

        // this.drawCollisionBlock(this.level.blockCollision); // only drawn to adjust position

        this.ctx.translate(this.camera_x, 0)
        // ------ space for fixed objects
        this.addTomap(this.characterInformations);
        this.addTomap(this.character.characterAvatar);
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

    checkCharactersDeath() {
        const charactersdeath = setInterval(() => {
            this.removeCharacterAfterDeath();
        }, 150);
        allIntervals.push(charactersdeath);
    }

    removeCharacterAfterDeath() {
        if (this.character.isDead() && !this.character.deathAnimationStarted) {
            this.character.startDeathAnimation();
        }
        if (this.character.deathAnimationEnded) {
            this.renderDefeatScreen();
            this.character.deathAnimationEnded = false;
            return
        }
    }

    renderWonScreen() {
        this.levelDurationEndTime = this.calcLevelDuration();
        let gameMenuCtn = document.getElementById('gameMenuCtn');
        gameMenuCtn.classList.toggle('d-none');
        let gameMainScreen = document.getElementById('gameMenu');
        gameMainScreen.innerHTML = returnWonScreen();
    }

    renderDefeatScreen() {
        this.levelDurationEndTime = this.calcLevelDuration();
        let gameMenuCtn = document.getElementById('gameMenuCtn');
        gameMenuCtn.classList.remove('d-none');
        let gameMainScreen = document.getElementById('gameMenu');
        gameMainScreen.innerHTML = returnDefeatScreen();
    }

    calcLevelDuration() {
        let timeAtEndOfLevel = Date.now();
        let levelTimePassed = timeAtEndOfLevel - this.levelDuration;
        let fullSeconds = Math.round(levelTimePassed / 1000);
        let seconds = fullSeconds % 60;
        let formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        let minutes = Math.floor(fullSeconds / 60);
        let formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        this.fullElapsedLevelTime = this.getTimePassed(timeAtEndOfLevel);
        return `${formatedMinutes} : ${formatedSeconds}`;
    }

    getTimePassed(timeAtEndOfLevel) {
        let elapsedTime = (timeAtEndOfLevel - this.levelDuration) / 1000;
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime % 60;
        let timePassed = minutes + seconds / 60;
        return timePassed;
    }

    calcEndScore() {
        this.timeScore = this.calcTimeScore();
        this.endScore = this.character.enemyKillPoint + this.character.collectedCoins + this.timeScore
    }

    calcTimeScore() {
        let timeScore;
        if (this.fullElapsedLevelTime <= 3) timeScore = 500;
        if (this.fullElapsedLevelTime > 3 && this.fullElapsedLevelTime < 5) timeScore = 300;
        if (this.fullElapsedLevelTime > 5) timeScore = 100;
        return timeScore;
    }

    checkEnemiesDeath() {
        const enemiesDeath = setInterval(() => {
            this.countEnemyKillPoint();
            this.removeEnemyAfterDeath();
        }, 150);
        allIntervals.push(enemiesDeath);

    }

    checkEnemiesCollisions() {
        this.characterInflictDamages();
        this.characterReceiveDamages();
    }

    characterInflictDamages() {

        const characterInflictDamages = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.comesFromTop(enemy) && this.character.speedY !== 0.4 && this.character.maxEnergy > 0 && !enemy.isDead()) {
                    this.character.jump();
                    this.character.maxEnergy -= 30;
                    enemy.hit(enemy.receivedPhysicalDamages);
                }
                if (this.character.isAttacking(enemy) && !this.character.isHurt() && enemy instanceof Snake) {
                    enemy.hit(enemy.receivedPhysicalDamages);
                }
            });
        }, 1000 / 60);
        allIntervals.push(characterInflictDamages);
    }

    characterReceiveDamages() {
        const characterReceiveDamages = setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy) && this.character.comesFromTop(enemy) && !this.character.isAttacking(enemy) && !enemy.isDead()) {
                    this.character.hit(enemy.inflictDamages);
                    this.resetLifeBar();
                    this.setCharacterLifeBar();
                }
            })
        }, 100);
        allIntervals.push(characterReceiveDamages);
    }

    checkMagicalAttackCollision() {
        const magicalAttackCollison = setInterval(() => {
            this.level.longRangeAttacks.forEach(attack => {
                this.level.enemies.forEach(enemy => {
                    if (attack.isColliding(enemy) && !(enemy instanceof Snake)) {
                        enemy.hit(enemy.receivedMagicalDamages);
                    }
                })
            })
        }, 150);
        allIntervals.push(magicalAttackCollison);
    }

    countEnemyKillPoint() {
        this.level.enemies.forEach(enemy => {
            if (enemy.isDead() && enemy.deathAnimationEnded) this.character.enemyKillPoint += enemy.killPoint;
        })
    }

    removeEnemyAfterDeath() {
        this.level.enemies.forEach((enemy, index) => {
            if (enemy.isDead() && !enemy.deathAnimationStarted) {
                enemy.startDeathAnimation();
            }
            if (enemy.deathAnimationEnded) {
                this.level.enemies.splice(index, 1);
                if (enemy instanceof Endboss) {
                    this.calcLevelDuration();
                    this.calcEndScore();
                    this.renderWonScreen();
                }
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

        if ((obj instanceof Platforms)) {
            // this.drawColisionFrame(obj);
            // this.drawOffsetColisionFrame(obj);
        }
    }


    drawEnemiesLifeBar(enemies) {
        if (!(enemies instanceof Snake)) {
            enemies.forEach(enemy => {
                this.addObjectToMap(enemy.enemyLifeBar)
            });
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
        // this.drawColisionFrame(mo);
        // this.drawOffsetColisionFrame(mo);
    }

    drawCollisionBlock(obj) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '3';
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'black';
        obj.forEach(block => {
            this.ctx.rect(block.x, block.y, block.width, block.height);
        })
        this.ctx.stroke();
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

    setCharacterLifeBar() {
        let x = 80;
        let percentage = this.character.life;
        if (percentage > 0) {
            let HPCorner = new LifeBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_corner1.png', x, 8, 4, 12);
            this.lifeBar.push(HPCorner);
            for (let index = 1; index < percentage; index++) {
                let HP = new LifeBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_point.png', x + 4, 8, 2, 12);
                this.lifeBar.push(HP);
                x = x + 1.1;
            }
        }
        if (percentage = percentage * 4) {
            let HPEndCorner = new LifeBar('img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_corner2.png', x + 4, 8, 4, 12);
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

    playWalkingSound() {
        this.level.walking_sound[0].play();
    }

    playJumpSound() {
        this.level.walking_sound[0].pause();
        this.level.jump_sound[0].play();
        if (this.level.jump_sound[0].currentTime === this.level.jump_sound[0].duration)
            this.level.jump_sound[0].pause();
        this.character.isJumping = false;
    }

    playCollectionSound() {
        this.level.collect_sound[0].play();
        if (this.level.collect_sound[0].currentTime === this.level.collect_sound[0].duration)
            this.level.collect_sound[0].pause();
        this.character.isCollectingObject = false;
    }

}