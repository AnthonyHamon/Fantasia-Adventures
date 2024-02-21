class Character extends movableObject {
    CHARACTERAVATAR = 'img/UI/character-icon/ninja.png';

    IMAGES_WALKING = [
        'img/character/Rogue/Walk/walk1.png',
        'img/character/Rogue/Walk/walk2.png',
        'img/character/Rogue/Walk/walk3.png',
        'img/character/Rogue/Walk/walk4.png',
        'img/character/Rogue/Walk/walk5.png',
        'img/character/Rogue/Walk/walk6.png'
    ];

    IMAGES_JUMPING = [
        'img/character/Rogue/Jump/jump1.png',
        'img/character/Rogue/Jump/jump2.png',
        'img/character/Rogue/Jump/jump3.png',
        'img/character/Rogue/Jump/jump4.png',
        'img/character/Rogue/Jump/jump5.png',
        'img/character/Rogue/Jump/jump6.png',
        'img/character/Rogue/Jump/jump7.png',
    ];

    IMAGES_ATTACKING = [
        'img/character/Rogue/Attack/Attack1.png',
        'img/character/Rogue/Attack/Attack2.png',
        'img/character/Rogue/Attack/Attack3.png',
        'img/character/Rogue/Attack/Attack4.png',
        'img/character/Rogue/Attack/Attack5.png',
        'img/character/Rogue/Attack/Attack6.png',
        'img/character/Rogue/Attack/Attack7.png',
    ]

    IMAGES_HURT = [
        'img/character/Rogue/Hurt/hurt1.png',
        'img/character/Rogue/Hurt/hurt2.png',
        'img/character/Rogue/Hurt/hurt3.png',
        'img/character/Rogue/Hurt/hurt4.png'
    ];

    IMAGES_DEATH = [
        'img/character/Rogue/Death/death1.png',
        'img/character/Rogue/Death/death2.png',
        'img/character/Rogue/Death/death3.png',
        'img/character/Rogue/Death/death4.png',
        'img/character/Rogue/Death/death5.png',
        'img/character/Rogue/Death/death6.png',
        'img/character/Rogue/Death/death7.png',
        'img/character/Rogue/Death/death8.png',
        'img/character/Rogue/Death/death9.png',
        'img/character/Rogue/Death/death10.png'
    ];

    IMAGES_IDLE = [
        'img/character/Rogue/Idle/idle1.png',
        'img/character/Rogue/Idle/idle2.png',
        'img/character/Rogue/Idle/idle3.png',
        'img/character/Rogue/Idle/idle4.png',
        'img/character/Rogue/Idle/idle5.png',
        'img/character/Rogue/Idle/idle6.png',
        'img/character/Rogue/Idle/idle7.png',
        'img/character/Rogue/Idle/idle8.png',
        'img/character/Rogue/Idle/idle9.png',
        'img/character/Rogue/Idle/idle10.png',
        'img/character/Rogue/Idle/idle12.png',
        'img/character/Rogue/Idle/idle13.png',
        'img/character/Rogue/Idle/idle14.png',
        'img/character/Rogue/Idle/idle15.png',
        'img/character/Rogue/Idle/idle16.png',
        'img/character/Rogue/Idle/idle17.png',
        'img/character/Rogue/Idle/idle18.png'
    ];

    IMAGES_CLIMBING = [
        'img/character/Rogue/Climb/climb1.png',
        'img/character/Rogue/Climb/climb2.png',
        'img/character/Rogue/Climb/climb3.png',
        'img/character/Rogue/Climb/climb4.png',
    ]

    world;
    isAlreadyAFK = false;
    isClimbing = false;
    maxEnergy = 80;
    maxMagicalEnergy = 80;
    maxCoin = 0;
    speed = 3;
    x = 2200; // -240
    x = -240
    y = 200;
    height = 256;
    width = 256;


    offset = {
        top: 128,
        right: 128,
        bottom: 80,
        left: 80
    }

    constructor() {
        super();
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_CLIMBING);
        this.moveCharacter();
        this.checkCharacterStats();
        this.animate();
        this.moveCamera();
        this.checkEnemiesCollisions();
        this.magicAttack();
        this.applyGravity();
    };


    moveCharacter() {
        setInterval(() => {
            this.world.level.walking_sound_grass.pause();
            if (this.canMoveRight()) {
                this.isAlreadyAFK = false;
                this.moveRight();
                // this.world.level.walking_sound_grass.play();
            } else if (this.canMoveLeft()) {
                this.isAlreadyAFK = false;
                this.moveLeft();
                // this.world.level.walking_sound_grass.play();
            } else if (this.attacks()) {
                this.isAlreadyAFK = false;
                this.updateCharacterEnergy(0.4);
            } else if (this.canClimbUp()) {
                this.climbUp();
            } else if (this.canClimbDown()) {
                this.climbDown()
            } else if (!this.isAlreadyAFK) {
                this.isAlreadyAFK = true;
                this.stay();
            }

            if (this.canJump()) {
                this.isAlreadyAFK = false;
                this.jump();
                this.updateCharacterEnergy(30);
            }
            // if (this.moveLeft() || this.moveRight() || this.jump || this.keyboard.F){
            //     this.world.START = false;
            // } 
        }, 1000 / 60);
    }


    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEATH);
                this.y = 316;
            } else if (this.isInactiv() && this.isAlreadyAFK && !this.isHurt() || this.world.START) {
                this.playAnimation(this.IMAGES_IDLE)
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround() && !this.isOnPlatform && !this.isDead()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.attacks()) {
                this.playAnimation(this.IMAGES_ATTACKING);
            } else if (this.isClimbing){
                this.playAnimation(this.IMAGES_CLIMBING)
            } else {
                this.loadImage(this.IMAGES_WALKING[0])
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 150);
    }

    canMoveRight() {
        return !this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - (this.width / 2)
    }

    canMoveLeft() {
        return !this.isDead() && this.world.keyboard.LEFT && this.x > -240 && this.x < 1810 || this.world.keyboard.LEFT && this.x >= 1890
    }

    canJump() {
        return !this.isDead() && this.world.keyboard.UP && !this.isAboveGround() && this.maxEnergy > 15
    }

    canClimbUp() {
        return
    }

    canClimbDown() {
        return !this.isDead() && this.world.keyboard.S && this.y < 312;
    }

    checkCharacterStats() {
        setInterval(() => {
            this.restoreJumpEnergy();
        }, 1000 / 60);
    }

    moveCamera() {
        setInterval(() => {

            // if (this.x > 696 && this.world.camera_x < this.world.canvas.width * 2) {     // camera follow player since he reached end of  previous screen
            //     this.world.camera_x = this.x - 200;
            // }

            if (this.world.camera_x < this.world.canvas.width * 2) {    // camera goes with player from beginning
                this.world.camera_x = this.x - 200;
            }

            // if (this.x <= 696) {             // camera stays at beginning position until player reached end of screen then camera jump to player and follow
            //     this.world.camera_x = -200;
            // }

            if (this.world.camera_x == this.world.canvas.width * 2) {
                this.world.camera_x = this.world.canvas.width * 2;
            }
        }, 1000 / 60);
    }


    climbDown() {
        setInterval(() => {
            this.world.level.stairway.forEach(step => {
                if(this.isColliding(step)){
                    this.isClimbing = true;
                    this.y += 0.2;
                }
                if(!this.isColliding(step)){
                    this.isClimbing = false;
                }
            });
        }, 150);
    }


    magicAttack() {
        setInterval(() => {
            if (!this.isDead() && this.world.keyboard.E && this.maxMagicalEnergy > 25) {
                this.maxMagicalEnergy -= 25;
                this.world.resetMagicBar();
                this.world.setMagicBar();
                let tornado = new Tornado(this.x + 95, this.y + 65, this.otherDirection);
                this.world.level.longRangeAttacks.push(tornado);
                for (let index = 0; index < this.world.level.longRangeAttacks.length; index++) {
                    setTimeout(() => {
                        this.world.level.longRangeAttacks.splice(index, 1);
                    }, 1700);
                };
            }
        }, 150);
    }

    attacks() {
        if (!this.isDead() && this.world.keyboard.F && this.maxEnergy > 5) {
            return true;
        }
    }

    updateCharacterEnergy(lostEnergy) {
        this.maxEnergy -= lostEnergy;
        if (this.maxEnergy < 0) {
            this.maxEnergy = 0;
        }
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
            if (this.life > 80) {
                this.life = 100;
            } else {
                this.life += 20;
            }
            this.world.resetLifeBar();
            this.world.setLifeBar();
        }
        if (object instanceof Coin) {
            this.maxCoin += 10;
            this.world.level.collectableObjects.splice(index, 1);
            this.world.resetCoinBar();
            this.world.setCoinBar();
        }
        if (object instanceof EnergyPotions && this.maxMagicalEnergy < 70) {
            this.maxMagicalEnergy += 25;
            this.world.level.collectableObjects.splice(index, 1);
            this.world.resetMagicBar();
            this.world.setMagicBar();
        }
    }

    comesFromTop(obj) {
        const thisBottom = this.y + this.height - this.offset.bottom;
        const enemyTop = obj.y + obj.offset.top;
        if (this.isColliding(obj) &&
            this.isAboveGround &&
            this.speedY < 0 &&
            thisBottom >= enemyTop
        ) {
            return true;
        } else {
            return false;
        }
    }

    jumpOnPlatform(obj) {
        const thisBottom = this.y + this.height - this.offset.bottom;
        const platformTop = obj.y + obj.offset.top;

        if (this.comesFromTop(obj) &&
            this.isAboveGround(obj) &&
            thisBottom >= platformTop) {
            this.isOnPlatform = true;
            return true;
        }
        if (this.isOverTheGround(obj)) {
            this.isOnPlatform = false;
        }
    }

    isOnPlatformTop(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) &&
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right)
    }

    isOverTheGround(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            (this.x + this.offset.left) >= (obj.x + obj.width - obj.offset.right)
    }

    collideFromSide(obj) {
        return (this.x + this.width - this.offset.right >= obj.x) &&
            (this.x - this.offset.left) <= obj.x &&
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top
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

    checkEnemiesCollisions() {
        setInterval(() => {
            this.world.level.enemies.forEach((enemy) => {
                if (this.comesFromTop(enemy) && (enemy instanceof Snake || enemy instanceof Spider) && this.maxEnergy >= 0) {
                    this.jump();
                    this.maxEnergy -= 30;
                    enemy.hit(2);
                }
                if (this.isAttacking(enemy) && !this.isHurt() && enemy instanceof Snake) {
                    enemy.hit(2);
                }
            });
        }, 1000 / 60);


        setInterval(() => {
            this.world.level.enemies.forEach(enemy => {
                if (this.isColliding(enemy) && !this.comesFromTop(enemy) && !this.isAttacking(enemy) && !this.isDead()) {
                    this.hit(0); // 4
                    this.world.resetLifeBar();
                    this.world.setLifeBar();
                }
            })
        }, 100);
    }


}