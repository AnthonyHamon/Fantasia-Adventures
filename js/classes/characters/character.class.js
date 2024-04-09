class Character extends movableObject {
    world;
    isInTheAir = false;
    hasAlreadyJumped = false;
    isOnTheGround = false;
    isOnPlatform = false;
    isAlreadyAFK = false;
    isClimbing = false;
    maxEnergy = 80;
    attackEnergyDrain = 0.4;
    jumpEnergyDrain = 15;
    doubleJumpEnergyDrain = 30;
    maxMagicalEnergy = 80;
    magicalEnergyDrain = 20;
    maxCoin = 0;
    speedRight = 3;
    speedLeft = -3;
    x = -240
    y = 134;
    height = 256;
    width = 256;
    collectedCoins = 0;
    enemyKillPoint = 0;
    timePassed = 0;
    isJumping = false;
    isCollectingObject = false;
    jump_sound = new Audio('audio/jump_all_character.mp3');



    offset = {
        top: 124,
        right: 128,
        bottom: 80,
        left: 80
    }

    /**
     * function to call setInterval methodes for character
     */
    updateCharacter() {
        this.checkCharacterEvents();
        this.moveCharacter();
        this.checkCharacterStats();
        this.animate();
        this.moveCamera();
        this.magicAttack();
        this.applyGravity();
        this.playCharacterSoundEffect();
    }

    /**
     * function to chech all collision and item collection
     */

    checkCharacterEvents() {
        const checkCharacterEvents = setInterval(() => {
            this.checkGroundCollision();
            this.checkPlatformsCollision();
            this.checkObstacleCollision();
            this.checkCollection();
        }, 1000 / 60);
        allIntervals.push(checkCharacterEvents);
    }

    /**
     * methode to let character move if passed a test
     */
    moveCharacter() {
        const moveCharacter = setInterval(() => {
            if (this.canMoveRight() || this.canMoveLeft() || this.attacks() || this.canJump()) // character moved in some direction
                this.world.START = false, this.isAlreadyAFK = false; // if START = false, idle animation is not shown
            if (this.canMoveRight()) this.moveRight(this.speedRight); // move character at the seted speed
            else if (this.canMoveLeft()) this.moveLeft(this.speedLeft);  // move character at the seted speed
            if (this.attacks()) this.updateCharacterEnergy(this.attackEnergyDrain); // drain seted energy when attacking
            if (this.canClimbDown()) this.climbDown(); // climb down if possible
            if (!this.isAlreadyAFK) this.isAlreadyAFK = true, this.stay(); // calculate inactive time for idle animation

            if (this.isJumping) this.isInTheAir = true;
            if (this.canJump()) {
                this.updateCharacterEnergy(this.jumpEnergyDrain); // drain seted energy when jumping
                this.jump(); // character jump
                setTimeout(() => {
                    this.hasAlreadyJumped = true; // allow double jump
                }, 200);
            } else if (this.canDoubleJump()) {
                this.updateCharacterEnergy(this.doubleJumpEnergyDrain); // drain seted energy when jumping
                this.jump(); // character jump again
                this.hasAlreadyJumped = false; // disallow double jump
            }
        }, 1000 / 60);
        allIntervals.push(moveCharacter);
    }

    /**
     * methode to animate character if passed a test
     */

    animate() {
        const animate = setInterval(() => {
            if (this.isDead() && this.deathAnimationStarted) {
                this.playAnimation(this.IMAGES_DEATH);
                if (this.currentImage == this.IMAGES_DEATH.length - 1) {
                    this.deathAnimationEnded = true;    // set variable to stop at end of animation 
                }
            } else if (this.isInactiv() && this.isAlreadyAFK && !this.isHurt() || this.world.START) {
                this.playAnimation(this.IMAGES_IDLE)    // play idle animation 
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);   // play character hurt animation
            } else if (!this.isDead() && this.speedY !== 0 && this.speedY !== 0.4) {
                this.playAnimation(this.IMAGES_JUMPING); // play jump animation
            } else if (this.attacks()) {
                this.playAnimation(this.IMAGES_ATTACKING); // play (close) attack animation
            } else if (this.isClimbing) {
                this.playAnimation(this.IMAGES_CLIMBING)    // play climb animation
            } else {
                this.loadImage(this.IMAGES_WALKING[0])  // set default image for between idle and movement animation
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALKING); // play walk animation
                }
            }
        }, 150);
        allIntervals.push(animate);
    }

    /**
     * 
     * @returns test conditions for moving right
     */
    canMoveRight() {
        return !this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - (this.width / 2) && !this.obstacle;
    }

    /**
     * 
    * @returns test conditions for moving left
    */
    canMoveLeft() {
        return !this.isDead() && this.world.keyboard.LEFT && this.x > -240;
    }

    /**
     * 
     * @returns test conditions for jumping
     */
    canJump() {
        return !this.isDead() && this.world.keyboard.UP && !this.isClimbing && (this.speedY === 0) && this.maxEnergy > 15;
    }


    /**
     * 
     * @returns test conditions for double jump
     */
    canDoubleJump() {
        return !this.isDead() && this.hasAlreadyJumped && !this.isClimbing && this.world.keyboard.UP && this.maxEnergy > 15;
    }


    /**
     * 
     * @returns test conditions for climbing down
     */
    canClimbDown() {
        return !this.isDead() && this.world.keyboard.DOWN && this.y < 346;
    }


    /**
     * 
     * @returns test conditions to use magic skill
     */
    canUseMagicalSkill() {
        return this.world.keyboard.E && this.maxMagicalEnergy >= 20
    }


    /**
     * interval to restore character energy
     */
    checkCharacterStats() {
        const checkCharacterStats = setInterval(() => {
            this.restoreJumpEnergy();
        }, 1000 / 60);
        allIntervals.push(checkCharacterStats);

    }


    /**
     * method which check if character collides with collectable item then collect it
     */
    checkCollection() {
        this.world.level.collectableObjects.forEach((object) => {
            if (this.isColliding(object)) {
                this.collect(object);
            }
        });
    }

    /**
     * method to move the camera following character
     */
    moveCamera() {
        const moveCamera = setInterval(() => {

            if (this.world.camera_x < this.world.canvas.width * 2) {    // camera goes with player from beginning
                this.world.camera_x = this.x - 200;
            }

            if (this.x <= this.world.canvas.width * 2 - 100) {    // player can go back from 1 floor platforms
                this.world.camera_x = this.x - 200;
            }
        }, 1000 / 60);
        allIntervals.push(moveCamera);
    }



    /**
     * methode to check if character touchs a stairway and climb it down if character passed the test
     */
    climbDown() {
        this.world.level.stairway.forEach(step => {
            if (this.isColliding(step)) {
                this.isClimbing = true;
                this.y += 1, this.x = 2200, this.isOnPlatform = false;
                if (this.speedY >= 0) this.speedY = 0
            }
        })

    }

    /**
     * methode to use magical skill if passed a test
     */
    magicAttack() {
        const magicAttack = setInterval(() => {
            if (this.canUseMagicalSkill()) {
                this.updateCharacterMagicalEnergy(this.magicalEnergyDrain); // drain seted energy when using magical skill
                let tornado = new Tornado(this.x + 95, this.y + 65, this.otherDirection); // create new tornado object
                this.world.level.longRangeAttacks.push(tornado); // push created object into the world
                this.world.level.longRangeAttacks.forEach(index => {
                    setTimeout(() => {
                        this.world.level.longRangeAttacks.splice(index, 1); // remove object after lapstime (animation end) 
                    }, 1700);
                })
            }
        }, 150);
        allIntervals.push(magicAttack);
    }


    /**
     * 
     * @returns true and play sound effect if passed a test 
     */
    attacks() {
        if (!this.isDead() && this.world.keyboard.F && this.maxEnergy > 5) {
            this.close_attack_sound.play();
            return true;
        }
    }


    /**
     * 
     * @param {number} lifePoint 
     * method to update character lifebar
     */
    updateCharacterLife(lifePoint) {
        if (this.life > 80) {
            this.life = 100;
        } else {
            this.life += lifePoint;
        }
        this.world.resetLifeBar();
        this.world.setCharacterLifeBar();
    }

    /**
     * 
     * @param {number} lostEnergy 
     * method to update character energybar
     */
    updateCharacterEnergy(lostEnergy) {
        this.maxEnergy -= lostEnergy;
        this.world.resetEnergyBar();
        this.world.setEnergyBar();
    }

    /**
     * 
     * @param {number} magicalEnergyDrain 
     * method to update character magicalenergybar
     */
    updateCharacterMagicalEnergy(magicalEnergyDrain) {
        this.maxMagicalEnergy -= magicalEnergyDrain;
        this.world.resetMagicBar();
        this.world.setMagicBar();
    }

    /**
     * methode to restore energy continuously if not attacking
     */
    restoreJumpEnergy() {
        if (this.maxEnergy < 80 && !this.world.keyboard.F) {
            this.maxEnergy += 0.3;
            this.world.resetEnergyBar();
            this.world.setEnergyBar();
        }
    }


    /**
     * 
     * @param {Object} object 
     * methode to collect object if passed a test
     */
    collect(object) {
        let index = this.world.level.collectableObjects.indexOf(object);
        if (object instanceof Heart && this.life < 99) {
            this.world.level.collectableObjects.splice(index, 1);
            this.updateCharacterLife(20);
            this.isCollectingObject = true;
        }
        if (object instanceof Coin) {
            this.collectedCoins += 100;
            this.maxCoin += 10;
            this.world.level.collectableObjects.splice(index, 1);
            this.world.resetCoinBar();
            this.world.setCoinBar();
            this.isCollectingObject = true;
        }
        if (object instanceof EnergyPotions && this.maxMagicalEnergy < 70) {
            this.maxMagicalEnergy += 20;
            this.world.level.collectableObjects.splice(index, 1);
            this.world.resetMagicBar();
            this.world.setMagicBar();
            this.isCollectingObject = true;
        }
    }

    /**
     * 
     * @param {Object} obj 
     * @returns boolean
     * methode to check if character is coming from top of an object
     */
    comesFromTop(obj) {
        if (
            this.speedY > 0 &&      // character if falling down 
            this.isColliding(obj)   // chartacter collides with object while falling down
        ) {
            return true;
        } else {
            return false;
        }
    }


    /**
     * methode to check when character is on the ground
     */
    checkGroundCollision() {
        this.world.level.ground.forEach(ground => {
            this.tryToLandOn(ground);
        })
    }


    /**
     * methode to check when character is on a platform
     */
    checkPlatformsCollision() {
        this.world.level.platforms.forEach(platform => {
            this.tryToLandOn(platform);
        })
    }

    /**
     * 
     * @param {Object} object 
     * help methode calling test to pass for staying on the ground or platform
     */
    tryToLandOn(object) {
        this.landOnPlatform(object);
        this.landOnTheGround(object);
        if (this.isClimbing) {
            if (this.isOnPlatform || this.isOnTheGround) this.isClimbing = false;
        }
    }


    /**
     * 
     * @param {Object} platform 
     * test condition for character beeing on a platform
     */
    landOnPlatform(platform) {
        if (platform instanceof Platforms && this.isAboveGroundOf(platform) && !this.isClimbing) {
            if (this.speedY > 0) {
                this.y = ((platform.y + platform.offset.top) - (this.height - this.offset.bottom));
                this.speedY = 0;
                this.hasAlreadyJumped = false;
            }
            if (platform instanceof Platforms) this.isOnPlatform = true, this.isOnTheGround = false, this.isInTheAir = false
            else this.isOnPlatform = false;
        }
    }


    /**
     * 
     * @param {Object} ground 
     * test condition for character beeing on the ground
     */
    landOnTheGround(ground) {
        if (ground instanceof Ground && this.isAboveGroundOf(ground)) {
            if (this.speedY > 0) {
                this.y = ((ground.y + ground.offset.top) - (this.height - this.offset.bottom));
                this.speedY = 0;
                this.hasAlreadyJumped = false;
            }
            if (ground instanceof Ground) this.isOnTheGround = true, this.isOnPlatform = false, this.isInTheAir = false
            else this.isOnTheGround = false;
        }
    }

    /**
     * 
     * @param {Object} obj 
     * @returns true or false
     * methode to check character and object coordinates, return true if character coordinate are above the object one
     */
    isAboveGroundOf(obj) {
        return (
            this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
            this.y + this.height - this.offset.bottom <= obj.y + obj.height - obj.offset.bottom &&
            this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
            this.x + this.width - this.offset.right >= obj.x + obj.offset.left)
    }


    /**
     * 
     * @param {Object} obj 
     * @returns true or false
     * methode to check character and object coordinates, return true if character collides the object
     */
    obstacleCollision(obj) {
        return (
            this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
            this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom &&
            this.x + this.offset.left <= obj.x + obj.width &&
            this.x + this.width - this.offset.right >= obj.x
        )
    }

    /**
     * methode to check if the character collides a block (obstacle)
     */
    checkObstacleCollision() {
        this.world.level.wall.forEach(block => {
            this.stopGoingThrough(block);
        });
        this.world.level.blockCollision.forEach(block => {
            this.stopGoingThrough(block);
        });
    }

    /**
     * 
     * @param {Object} block 
     * methode to stop character if colliding an obstacle
     */
    stopGoingThrough(block) {
        if (this.obstacleCollision(block)) {
            if (this.speed > 0) {
                this.speed = 0;
                this.x = block.x - this.offset.right
            }
            if (this.speed < 0) {
                this.speed = 0;
                this.x = block.x + block.width - this.offset.left
            }
        }
    }


    /**
     * 
     * @param {Object} enemy 
     * @returns true or false
     * if character is colliding an enemy while using close attack, character shall not take damages, return true, else, return false
     */
    isAttacking(enemy) {
        if (this.isColliding(enemy) &&
            this.world.keyboard.F &&
            this.attacks()) {
            return true
        } else {
            return false;
        }
    }
}