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
    starsScore;
    gameWonSound = new Audio('audio/game_won.mp3');
    gameOverSound = new Audio('audio/game_over.mp3');

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

    /**
     * 
     * @param {Object} character 
     * function hand over this world to other objects (character, enemies and longRangeattack), in order to be bounded to the object.
     */
    setWorld(character) {
        if (character) this.character = character;
        this.character.world = this;        // variable world in object character is bounded to this world and become access to this world Object
        this.level.enemies.forEach(enemy => { // variable world in each enemy Object is bounded to this world and become access to this world Object
            enemy.world = this;
        })
        this.level.longRangeAttacks.forEach(attack => { // variable world in each longRange Object is bounded to this world and become access to this world Object
            attack.world = this;
        })
    }



    /**
     * methode to draw every necessary objects for the game 
     */
    draw() {
         // delete the canvas before drawing everything again
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // methode to set camera x position as default
        this.ctx.translate(-this.camera_x, 0)
        // add all movable object from level instance    
        this.addMovableObjectToMap();
        // methode to invert camera x position for the following object, in order to stay visible on the screen
        this.ctx.translate(this.camera_x, 0)
        // ------ space for fixed objects
        this.addFixObjectsToMap();
        // set the camera x position to default for the character
        this.ctx.translate(-this.camera_x, 0);
        // draw character between both ctn.translate method to let character switch direction and be drawn correctly without changing other object
        this.drawCharacter(this.character);
        this.ctx.translate(this.camera_x, 0);

        // methode draw will be continuously fired according to GPU power
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     *  methode to add movable objects from level instance to the world (game)
     * */ 
    addMovableObjectToMap() {
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
    }

    /**
     * methode to add fix objects from level instance to the world (game)
     */
    addFixObjectsToMap() {
        this.addTomap(this.characterInformations);
        this.addTomap(this.character.characterAvatar);
        this.addObjectToMap(this.lifeBar);
        this.addObjectToMap(this.energyBar);
        this.addObjectToMap(this.magicBar);
        this.addObjectToMap(this.coinBar);
    }

    /**
     * interval method to check if character is dead and remove it if it's the case.
     */
    checkCharactersDeath() {
        const charactersdeath = setInterval(() => {
            this.removeCharacterAfterDeath();   // if dead, remove character from game
        }, 150);
        allIntervals.push(charactersdeath);
    }

    /**
     * method to end the game since character death animation ended
     */
    removeCharacterAfterDeath() {
        if (this.character.isDead() && !this.character.deathAnimationStarted) {
            this.character.startDeathAnimation();
        }
        if (this.character.deathAnimationEnded) {
            this.character.deathAnimationEnded = false;
            this.gameOver();
        }
    }


    /**
     * method to show won screen
     */
    renderWonScreen() {
        this.levelDurationEndTime = this.calcLevelDuration();
        let gameMenuCtn = document.getElementById('gameMenuCtn');
        gameMenuCtn.classList.toggle('d-none');
        let gameMainScreen = document.getElementById('gameMenu');
        gameMainScreen.innerHTML = returnWonScreen(this.starsScore);
    }

    /**
     * method to show defeat screen
     */
    renderDefeatScreen() {
        this.levelDurationEndTime = this.calcLevelDuration();
        let gameMenuCtn = document.getElementById('gameMenuCtn');
        gameMenuCtn.classList.remove('d-none');
        let gameMainScreen = document.getElementById('gameMenu');
        gameMainScreen.innerHTML = returnDefeatScreen();
    }

    /**
     * methode which calculate the time player take to finish the level
     * @returns string of numbers formated as time: "min : sec" to be rendered on end of level screen
     */
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

    /**
     * methode which formate the time player take to finish the level in full seconds
     * @param {number} timeAtEndOfLevel 
     * @returns number in fully second to be used for the score calculation
     */
    getTimePassed(timeAtEndOfLevel) {
        let elapsedTime = (timeAtEndOfLevel - this.levelDuration) / 1000;
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime % 60;
        let timePassed = minutes + seconds / 60;
        return timePassed;
    }

    /**
     * @returns number. A defined score according to the time take by player for finishing level
     */
    calcTimeScore() {
        let timeScore;
        if (this.fullElapsedLevelTime <= 3) timeScore = 500;
        if (this.fullElapsedLevelTime > 3 && this.fullElapsedLevelTime < 5) timeScore = 300;
        if (this.fullElapsedLevelTime > 5) timeScore = 100;
        return timeScore;
    }

    /**
     * calculate player endscore according to every score variables (time, amount of collected coins and killed enemies)
     */
    calcEndScore() {
        this.timeScore = this.calcTimeScore();
        this.endScore = this.character.enemyKillPoint + this.character.collectedCoins + this.timeScore;
        if (world.endScore < 1300) this.starsScore = 0;
        if (world.endScore >= 1300 && world.endScore <= 1500) this.starsScore = 1;
        if (world.endScore > 1500 && world.endScore < 2000) this.starsScore = 2;
        if (world.endScore >= 2000) this.starsScore = 3;
    }

    /**
     * interval methode to check if enemy is dead and remove it from world if it's the case
     */
    checkEnemiesDeath() {
        const enemiesDeath = setInterval(() => {
            this.countEnemyKillPoint(); // fire method to count kill point if enemy is dead
            this.removeEnemyAfterDeath(); // fire methode to remove enemy from world when dead animation ended
        }, 150);
        allIntervals.push(enemiesDeath);

    }

    /**
     * methode to check when character either inflict or receive damages
     */
    checkEnemiesCollisions() {
        this.characterInflictDamages();
        this.characterReceiveDamages();
    }

    /**
     * methode check through each enemies if character attacks on jump on it.
     * if it's the case, enemy is receiving damages
     */
    characterInflictDamages() {
        const characterInflictDamages = setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.comesFromTop(enemy) && this.character.speedY !== 0.4 && this.character.maxEnergy > 0 && !enemy.isDead()) {
                    this.character.jump(); // let character jump again if player jump on an enemy with enough energy
                    this.character.maxEnergy -= this.character.doubleJumpEnergyDrain;   // drain energy after double jump
                    enemy.hit(enemy.receivedPhysicalDamages);
                }
                if (this.character.isAttacking(enemy) && !this.character.isHurt() && enemy instanceof Snake) {
                    enemy.hit(enemy.receivedPhysicalDamages);   
                }
            });
        }, 1000 / 60);
        allIntervals.push(characterInflictDamages);
    }

    /**
     * methode check through each enemies if character collide with an enemy.
     * if it's the case, character is receiving damage
     */
    characterReceiveDamages() {
        const characterReceiveDamages = setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy) && this.character.comesFromTop(enemy) && !this.character.isAttacking(enemy) && !enemy.isDead()) { 
                    this.character.hit(enemy.inflictDamages);
                    this.resetLifeBar(); // reset lifebar before set in new
                    this.setCharacterLifeBar(); // set lifebar again
                }
            })
        }, 100);
        allIntervals.push(characterReceiveDamages);
    }

    /**
     * check through each long range attack is there's a collision with enemy that isn't a snake. 
     * if it's the case, this enemy receives damages
     */
    checkMagicalAttackCollision() {
        const magicalAttackCollison = setInterval(() => {
            this.level.longRangeAttacks.forEach(attack => { // go through long range object
                this.level.enemies.forEach(enemy => {       // go through all enemies object
                    if (attack.isColliding(enemy) && !(enemy instanceof Snake)) { // if colliding test
                        enemy.hit(enemy.receivedMagicalDamages);    // inflict damage to enemy
                    }
                })
            })
        }, 150);
        allIntervals.push(magicalAttackCollison);
    }

    /**
     * method to go throught each enemy objects and when dead, add kill point to the character
     * to be calculated at end of the game
     */
    countEnemyKillPoint() {
        this.level.enemies.forEach(enemy => { 
            if (enemy.isDead() && enemy.deathAnimationEnded) this.character.enemyKillPoint += enemy.killPoint;
        })
    }

    /**
     * check through each enemies if this is dead (life = 0). If it's the case, start the dead animation
     * and only fire end of game function when animation ended 
     */
    removeEnemyAfterDeath() {
        this.level.enemies.forEach((enemy, index) => {  // go through all enemies objects
            if (enemy.isDead() && !enemy.deathAnimationStarted) { // check if an enemy is dead and if its animation already started, if test passed
                enemy.startDeathAnimation();            // fire function to start the death animation
            }
            if (enemy.deathAnimationEnded) {            // if the death animation ended,  
                this.level.enemies.splice(index, 1);    // remove the enemy from level object 
                if (enemy instanceof Endboss) {         // and if the enemy is endboss,
                    this.endOfGame();                   // fire function to show end of the game
                }
            }
        })
    }


    /**
     * call every methods that are necessary for end of game when game won
     */
    endOfGame() {
        this.calcLevelDuration();   // calculate the time player took to finish the level
        this.calcEndScore();           // calculate total score of player
        this.saveLevelResultPoint();   // save the result in local storage
        backgroundMusic.pause();       // pause the background music
        this.gameWonSound.play();      // play music when player won the game
        this.renderWonScreen();        // show screen when game is won
    }

    /**
     * call methods necessary when game is over (character is dead)
     */
    gameOver() {
        backgroundMusic.pause();    // pause background music
        this.gameOverSound.play();  // play sound when character died
        this.renderDefeatScreen();  // show screen when game is lost
    }


    /**
     * when player won the game, he obtains a final score, this method save this score in local storage
     * and also check if this score is better or not as the one done in a possible previous game and only save the best score
     * in local storage
     */
    saveLevelResultPoint() {
        everyLevelsInformations.forEach(level => {
            if (level.name === this.level.levelName) {
                this.getPreviousScore(level);
                if (!level.levelScore) level.levelScore = this.starsScore;
                else if (this.starsScore > level.levelScore) level.levelScore = this.starsScore;
            }
            localStorage.setItem('levelScore', JSON.stringify(level.levelScore))
        })
    }


    /**
     * @param {Object} level 
     * call level score information from local storage if available
     * in order to be compared with current score when game is finished
     */
    getPreviousScore(level) {
        try {
            level.levelScore = JSON.parse(localStorage.getItem('levelScore'));
        } catch (error) {

        }
    }

    /**
     * @param {Object} objects 
     *
     * method which try to add an object (images object) to the world in order to be drawn
     */
    addObjectToMap(objects) {
        try {
            objects.forEach(o => {  // go through every objects
                this.addTomap(o);   // and call add to map method for each of them
            });
        } catch (e) {               // catch error if the image in object cannot be loaded
            console.warn('Error loading image', e);
            console.log('could not load image:', objects);
        }
    }


    /**
     * @param {Object} obj 
     * 
     * method to draw object set as parameter on the canvas context (ctx)
     */
    addTomap(obj) {
        if (obj.otherDirection)  // check if variable otherDirection in current object is true and if it's the case
            this.flipImage(obj);    // call method to invert image
        try {   
            this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);   // try to draw image from object on the canvas context
        } catch (e) {
            console.warn('Error loading image', e);  // put a warn log in console with error code
            console.log('could not load image:', this.img.src); // put a log in console with information of image which could not be loaded
        }
        if (obj.otherDirection) {   // check if variable otherDirection in current object is true and if it's the case
            this.flipImageBack(obj); // call method to invert image again
        }
    }


    /**
     * 
     * @param {Object} enemies 
     * method to draw a lifebar on top of all enemy that are not snakes
     */
    drawEnemiesLifeBar(enemies) {
        if (!(enemies instanceof Snake)) {  // check if object instance is Snake and if not the case
            enemies.forEach(enemy => {      // go through the object
                this.addObjectToMap(enemy.enemyLifeBar) // and add a lifebar for each of them
            });
        }
    }

    /**
     * 
     * @param {Object} mo 
     * method to draw a frame around an object in order to see the default border of the objects images
     */
    drawColisionFrame(mo) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '3';
        this.ctx.strokeStyle = 'blue';
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();
    }


    /**
     * 
     * @param {Object} mo 
     * method to draw a frame around an object in order to see the border of the objects images taking care of its offset informations
     */
    drawOffsetColisionFrame(mo) {
        this.ctx.beginPath(); // start a new path in order to be separate it from object image path
        this.ctx.lineWidth = '3';  // the width of the line which should be drawn
        this.ctx.strokeStyle = 'red'; // the color of the line which should be drawn
        this.ctx.rect(mo.x + mo.offset.left, mo.y + mo.offset.top, mo.width - (mo.offset.right + mo.offset.left), mo.height - (mo.offset.top + mo.offset.bottom)); // draw a square box
        this.ctx.stroke(); // draw the line with the style defined with lineWidth and strokeStyle.
    }

    /**
     * 
     * @param {Object} mo 
     * method to draw the player's character
     */
    drawCharacter(mo) {
        if (mo.otherDirection) { // check if variable otherDirection in current object is true and if it's the case
            this.flipImage(mo);  // call method to invert image
        }
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);  // draw character object images on canvas context
        if (mo.otherDirection) {    // check if variable otherDirection in current object is true and if it's the case
            this.flipImageBack(mo); // call method to invert image
        }
    }

    /**
     * 
     * @param {Object} mo 
     * method to invert character image
     */
    flipImage(mo) {
        this.ctx.save(); // save the context current state
        this.ctx.translate((mo.width / 1.2), 0); // move the image to the left before beeing flipped in order to stay at the same position

        this.ctx.scale(-1, 1);  // flip the image
        mo.x = mo.x * -1;       //  invert object x coordinate since translate() and scale() aren't changing the x coordinate from object
    }

    /**
     * 
     * @param {Object} mo 
     * method to invert character image back to default state
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;  // invert object x coordinate again before 
        this.ctx.restore(); // restore the image to default state (saved in flipImage())
    }

    /**
     * method to set the character lifebar with a for loop
     * this method is called everytime charater's life must be updated
     * for exemple by taking damages or when life is restored with heart.
     */
    setCharacterLifeBar() {
        let x = 80;
        let percentage = this.character.life;
        if (percentage > 0) {
            let HPCorner = new LifeBar('img/UI/HUD-Bar/hp_corner1.png', x, 8, 4, 12);
            this.lifeBar.push(HPCorner);
            for (let index = 1; index < percentage; index++) {
                let HP = new LifeBar('img/UI/HUD-Bar/hp_point.png', x + 4, 8, 2, 12);
                this.lifeBar.push(HP);
                x = x + 1.1;
            }
        }
        if (percentage = percentage * 4) {
            let HPEndCorner = new LifeBar('img/UI/HUD-Bar/hp_corner2.png', x + 4, 8, 4, 12);
            this.lifeBar.push(HPEndCorner);
        }
    }

    /**
     * method to set the character energyBar with a for loop
     * this method is called everytime charater's energy must be updated
     * for exemple when attacking or jumping.
     */
    setEnergyBar() {
        let x = 79;
        let percentage = this.character.maxEnergy;
        if (percentage > 0) {
            let energyCorner = new EnergyBar('img/UI/HUD-Bar/stamina_corner1.png', x, 4);
            this.energyBar.push(energyCorner);
            for (let index = 1; index < percentage; index++) {
                let energy = new EnergyBar('img/UI/HUD-Bar/stamina_point.png', x + 4, 2);
                this.energyBar.push(energy);
                x = x + 1.1;
            }
        }
        if (percentage = percentage * 4) {
            let energyEndCorner = new EnergyBar('img/UI/HUD-Bar/stamina_corner2.png', x + 4, 4);
            this.energyBar.push(energyEndCorner);
        }
    }

    /**
     * method to set the character magical energy Bar with a for loop
     * this method is called everytime charater's magical energy must be updated
     * for exemple when using magical skill or magical energy is restored widht potion.
     */
    setMagicBar() {
        let x = 79;
        let percentage = this.character.maxMagicalEnergy;
        if (percentage > 0) {
            let magicEnergyCorner = new MagicBar('img/UI/HUD-Bar/magic_corner1.png', x, 4);
            this.magicBar.push(magicEnergyCorner);
            for (let index = 1; index < percentage; index++) {
                let magicEnergy = new MagicBar('img/UI/HUD-Bar/magic_point.png', x + 4, 2);
                this.magicBar.push(magicEnergy);
                x = x + 1.1;
            }
        }
        if (percentage = percentage * 4) {
            let magicEnergyEndCorner = new MagicBar('img/UI/HUD-Bar/magic_corner2.png', x + 4, 4);
            this.magicBar.push(magicEnergyEndCorner);
        }
    }

    /**
     * method to set the coinbar with a for loop
     * this method is called everytime the coinbar must be updated
     * when character is collecting a coin.
     */
    setCoinBar() {
        let x = 79;
        let percentage = this.character.maxCoin;
        if (percentage > 0) {
            let coinBarCorner = new CoinBar('img/UI/HUD-Bar/coin_corner1.png', x, 4);
            this.coinBar.push(coinBarCorner);
            for (let index = 1; index < percentage; index++) {
                let coin = new CoinBar('img/UI/HUD-Bar/coin_point.png', x + 4, 2);
                this.coinBar.push(coin);
                x = x + 1.1;
            }
        }
        if (percentage = percentage * 4) {
            let coinEndCorner = new CoinBar('img/UI/HUD-Bar/coin_corner2.png', x + 4, 4);
            this.coinBar.push(coinEndCorner);
        }
    }

    /**
     * method to delete lifebar before being updated again
     */
    resetLifeBar() {
        this.lifeBar.splice(0);
    }

    /**
     * method to delete energybar before being updated again
     */
    resetEnergyBar() {
        this.energyBar.splice(0);
    }

    /**
     * method to delete magicbar before being updated again
     */
    resetMagicBar() {
        this.magicBar.splice(0);
    }

    /**
     * method to delete coinbar before being updated again
     */
    resetCoinBar() {
        this.coinBar.splice(0);
    }
}