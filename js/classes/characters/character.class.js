class Character extends movableObject {
    world;
    hasAlreadyJumped = false;
    isOnTheGround = false;
    isOnPlatform = false;
    isAlreadyAFK = false;
    isClimbing = false;
    maxEnergy = 80;
    maxMagicalEnergy = 80;
    maxCoin = 0;
    speed = 3;
    x = -240
    y = 134;
    height = 256;
    width = 256;
    collectedCoins = 0;
    enemyKillPoint = 0;
    timePassed = 0;
    isJumping = false;
    


    offset = {
        top: 124,
        right: 128,
        bottom: 80,
        left: 80
    }

    updateCharacter(){
        this.checkCharacterEvents();
        this.moveCharacter();
        this.checkCharacterStats();
        this.animate();
        this.moveCamera();
        this.magicAttack();
        this.applyGravity();
        this.playSoundEffect();
    }

    checkCharacterEvents() {
        const checkCharacterEvents = setInterval(() => {
            this.checkGroundCollision();
            this.checkPlatformsCollision();
            this.checkObstacleCollision();
            this.checkCollection();
        }, 1000 / 60);
        allIntervals.push(checkCharacterEvents);
    }

    moveCharacter() {
        const moveCharacter = setInterval(() => {
            if (this.canMoveRight() || this.canMoveLeft() || this.attacks() || this.canJump())
                this.world.START = false, this.isAlreadyAFK = false;
            if (this.canMoveRight()) this.moveRight(3);
            else if (this.canMoveLeft()) this.moveLeft(-3); 
            if (this.attacks()) this.updateCharacterEnergy(0.4);
            if (this.canClimbUp()) this.climbUp();
            if (this.canClimbDown()) this.climbDown();
            if (!this.isAlreadyAFK) this.isAlreadyAFK = true, this.stay();

            if (this.canJump()) {
                this.updateCharacterEnergy(15);
                this.jump();
                setTimeout(() => {
                    this.hasAlreadyJumped = true;
                }, 200);
            } else if (this.canDoubleJump()) {
                this.updateCharacterEnergy(30);
                this.jump();
                this.hasAlreadyJumped = false;
            }
        }, 1000 / 60);
        allIntervals.push(moveCharacter);
    }

    playSoundEffect(){
        const playSoundEffect = setInterval(() => {
            this.world.level.walking_sound[0].pause();
            if (this.canMoveRight() || this.canMoveLeft()) this.world.playWalkingSound()
            if (this.isJumping) this.world.playJumpSound(), console.log('canJump');
        }, 1000 / 60);
        allIntervals.push(playSoundEffect);

    }

    animate() {
        const animate = setInterval(() => {
            if (this.isDead() && this.deathAnimationStarted) {
                this.playAnimation(this.IMAGES_DEATH);
                if (this.currentImage == this.IMAGES_DEATH.length - 1) {
                    this.deathAnimationEnded = true;
                }
            } else if (this.isInactiv() && this.isAlreadyAFK && !this.isHurt() || this.world.START) {
                this.playAnimation(this.IMAGES_IDLE)
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (!this.isDead() && this.speedY !== 0 && this.speedY !== 0.4) {
                this.playAnimation(this.IMAGES_JUMPING);
                // } else if(this.hasAlreadyJumped){
                //     this.playAnimation(this.IMAGES_DOUBLE_JUMP);
            } else if (this.attacks()) {
                this.playAnimation(this.IMAGES_ATTACKING);
            } else if (this.isClimbing) {
                this.playAnimation(this.IMAGES_CLIMBING)
            } else {
                this.loadImage(this.IMAGES_WALKING[0])
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 150);
        allIntervals.push(animate);
    }

    canMoveRight() {
        return !this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - (this.width / 2) && !this.obstacle;
    }

    canMoveLeft() {
        return !this.isDead() && this.world.keyboard.LEFT && this.x > -240;
    }

    canJump() {
        return !this.isDead() && this.world.keyboard.UP && !this.isClimbing && (this.speedY === 0 || this.speedY === 0.4) && this.maxEnergy > 15;
    }

    canDoubleJump() {
        return !this.isDead() && this.hasAlreadyJumped && !this.isClimbing && this.world.keyboard.UP && this.maxEnergy > 15;
    }

    canClimbUp() {
        return
    }

    canClimbDown() {
        return !this.isDead() && this.world.keyboard.S && this.y < 346;
    }

    checkCharacterStats() {
        const checkCharacterStats = setInterval(() => {
            this.restoreJumpEnergy();
        }, 1000 / 60);
        allIntervals.push(checkCharacterStats);

    }

    checkCollection() {
        this.world.level.collectableObjects.forEach((object) => {
            if (this.isColliding(object)) {
                this.collect(object);
            }
        });
    }

    moveCamera() {
        const moveCamera = setInterval(() => {

            if (this.world.camera_x < this.world.canvas.width * 2) {    // camera goes with player from beginning
                this.world.camera_x = this.x - 200;
                // console.log(this)
            }

            if (this.x <= this.world.canvas.width * 2 - 100) {    // player can go back from 1 floor platforms
                this.world.camera_x = this.x - 200;
            }

            // if (this.world.camera_x == this.world.canvas.width * 2) {
            //     this.world.camera_x = this.world.canvas.width * 2;
            // }
        }, 1000 / 60);
        allIntervals.push(moveCamera);
    }


   

    climbDown() {
        this.world.level.stairway.forEach(step => {
            if (this.isColliding(step)) {
                this.isClimbing = true;
                this.y += 1, this.x = 2200, this.isOnPlatform = false;
                if (this.speedY >= 0) this.speedY = 0
            }
        })

    }

    magicAttack() {
        const magicAttack = setInterval(() => {
            if (!this.isDead() && this.world.keyboard.E && this.maxMagicalEnergy >= 20) {
                this.maxMagicalEnergy -= 20;
                this.world.resetMagicBar();
                this.world.setMagicBar();
                let tornado = new Tornado(this.x + 95, this.y + 65, this.otherDirection);
                this.world.level.longRangeAttacks.push(tornado);
                this.world.level.longRangeAttacks.forEach(index => {
                    setTimeout(() => {
                        this.world.level.longRangeAttacks.splice(index, 1);
                    }, 1700);
                })
            }
        }, 150);
        allIntervals.push(magicAttack);
    }

    attacks() {
        if (!this.isDead() && this.world.keyboard.F && this.maxEnergy > 5) return true;
    }

    updateCharacterLife(lifePoint) {
        if (this.life > 80) {
            this.life = 100;
        } else {
            this.life += lifePoint;
        }
        this.world.resetLifeBar();
        this.world.setCharacterLifeBar();
    }

    updateCharacterEnergy(lostEnergy) {
        this.maxEnergy -= lostEnergy;
        // if (this.maxEnergy < 0) {
        //     this.maxEnergy = 0;
        // }
        this.world.resetEnergyBar();
        this.world.setEnergyBar();
    }


    restoreJumpEnergy() {
        if (this.maxEnergy < 80 && !this.world.keyboard.F) {
            this.maxEnergy += 0.3;
            this.world.resetEnergyBar();
            this.world.setEnergyBar();
        }
    }

    collect(object) {
        let index = this.world.level.collectableObjects.indexOf(object);
        if (object instanceof Heart && this.life < 99) {
            this.world.level.collectableObjects.splice(index, 1);
            this.updateCharacterLife(20);
        }
        if (object instanceof Coin) {
            this.collectedCoins += 100;
            this.maxCoin += 10;
            this.world.level.collectableObjects.splice(index, 1);
            this.world.resetCoinBar();
            this.world.setCoinBar();
        }
        if (object instanceof EnergyPotions && this.maxMagicalEnergy < 70) {
            this.maxMagicalEnergy += 20;
            this.world.level.collectableObjects.splice(index, 1);
            this.world.resetMagicBar();
            this.world.setMagicBar();
        }
    }

    comesFromTop(obj) {
        if (
            this.speedY > 0 &&
            this.isColliding(obj)
        ) {
            return true;
        } else {
            return false;
        }
    }

    checkGroundCollision() {
        this.world.level.ground.forEach(ground => {
            this.tryToLandOn(ground);
        })
    }

    checkPlatformsCollision() {
        this.world.level.platforms.forEach(platform => {
            this.tryToLandOn(platform);
        })
    }

    tryToLandOn(object) {
        this.landOnPlatform(object);
        this.landOnTheGround(object);
        if (this.isClimbing) {
            if (this.isOnPlatform || this.isOnTheGround) this.isClimbing = false;
        }
    }

    landOnPlatform(platform) {
        if (platform instanceof Platforms && this.isAboveGroundOf(platform) && !this.isClimbing) {
            if (this.speedY > 0) {
                this.y = ((platform.y + platform.offset.top) - (this.height - this.offset.bottom));
                this.speedY = 0;
                this.hasAlreadyJumped = false;
            }
            if (platform instanceof Platforms) this.isOnPlatform = true, this.isOnTheGround = false
            else this.isOnPlatform = false;
        }
    }

    landOnTheGround(ground) {
        if (ground instanceof Ground && this.isAboveGroundOf(ground)) {
            if (this.speedY > 0) {
                this.y = ((ground.y + ground.offset.top) - (this.height - this.offset.bottom));
                this.speedY = 0;
                this.hasAlreadyJumped = false;
            }
            if (ground instanceof Ground) this.isOnTheGround = true, this.isOnPlatform = false;
            else this.isOnTheGround = false;
        }
    }

    isAboveGroundOf(obj) {
        return (
            this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
            this.y + this.height - this.offset.bottom <= obj.y + obj.height - obj.offset.bottom &&
            this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
            this.x + this.width - this.offset.right >= obj.x + obj.offset.left)
    }

    obstacleCollision(obj) {
        return (
            this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
            this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom &&
            this.x + this.offset.left <= obj.x + obj.width &&
            this.x + this.width - this.offset.right >= obj.x
        )
    }


    checkObstacleCollision() {
        this.world.level.wall.forEach(block => {
            this.stopGoingThrough(block);
        });
        this.world.level.blockCollision.forEach(block => {
            this.stopGoingThrough(block);
        });
    }

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