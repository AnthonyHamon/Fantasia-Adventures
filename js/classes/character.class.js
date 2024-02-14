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

    world;
    maxEnergy = 80;
    maxMagicalEnergy = 80;
    maxCoin = 0;
    speed = 3;
    x = -240;
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
        super().loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
        this.applyGravity();
    };


    animate() {

        setInterval(() => {
            this.world.level.walking_sound_grass.pause();
            if (!this.isDead() && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - (this.width / 2)) {
                this.moveRight();
                // this.world.level.walking_sound_grass.play();
                // console.log('character position is', this.x);
            }

            if (!this.isDead() && this.world.keyboard.LEFT && this.x > -240 && this.x < 1810 || this.world.keyboard.LEFT && this.x >= 1890) {
                this.moveLeft();
                // this.world.level.walking_sound_grass.play();
                // console.log('character position is', this.x);
            }

            if (!this.isDead() && this.world.keyboard.UP && !this.isAboveGround() && this.maxEnergy > 15) {
                this.maxEnergy -= 0;
                this.jump();
                this.world.resetEnergyBar();
                this.world.setEnergyBar();
            }

            if (!this.isDead() && this.world.keyboard.F) {
                this.maxEnergy -= 0.4;
                if (this.maxEnergy < 0) {
                    this.maxEnergy = 0
                }
                this.world.resetEnergyBar();
                this.world.setEnergyBar();
            }

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


        setInterval(() => {
            this.restoreJumpEnergy();
        }, 1000 / 60);


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEATH);
                this.y = 316;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround() && !this.isOnPlatform && !this.isDead()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.attacks()) {
                this.playAnimation(this.IMAGES_ATTACKING)
            } else {
                this.loadImage(this.IMAGES_WALKING[0])
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 150);
    }

    magicAttack() {
        if (!this.isDead() && this.world.keyboard.E && this.maxMagicalEnergy > 25) {
            this.maxMagicalEnergy -= 25;
            this.world.resetMagicBar();
            this.world.setMagicBar();
            let tornado = new Tornado(this.x + 95, this.y + 65);
            this.world.level.longRangeAttacks.push(tornado);
            for (let index = 0; index < this.world.level.longRangeAttacks.length; index++) {
                setTimeout(() => {
                    this.world.level.longRangeAttacks.splice(index, 1);
                }, 1700);
            };
        }
    }

    attacks() {
        if (this.world.keyboard.F && this.maxEnergy > 5) {
            return true;
        }
    }

    // closeAttacks() {
    //     if (!this.isDead() && this.attacks() && this.maxEnergy > 5) {
    //         this.maxEnergy -= 1;
    //         this.world.resetEnergyBar();
    //         this.world.setEnergyBar();
    //     }
    // }


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
        return (this.x + this.width - this.offset.right) >= obj.x +obj.offset.left &&
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




}