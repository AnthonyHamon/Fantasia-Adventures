class Character extends movableObject {
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

    IMAGES_HURT = [
        'img/character/Rogue/Hurt/hurt1.png',
        'img/character/Rogue/Hurt/hurt2.png',
        'img/character/Rogue/Hurt/hurt3.png',
        'img/character/Rogue/Hurt/hurt4.png'
    ]

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
    ]

    world;
    maxEnergy = 80;
    maxMagicalEnergy = 80;
    maxCoin = 80;
    speed = 3;
    y = 312;
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

            if (!this.isDead() && this.world.keyboard.LEFT && this.x > -120 && this.x < 1944 || this.world.keyboard.LEFT && this.x > 1881) {
                this.moveLeft();
                // this.world.level.walking_sound_grass.play();
                // console.log('character position is', this.x);
            }

            if (!this.isDead() && this.world.keyboard.UP && !this.isAboveGround() && this.maxEnergy > 15) {
                this.maxEnergy -= 30;
                this.jump();
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
        }, 1000);


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEATH);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround() & !this.isDead()) {
                this.playAnimation(this.IMAGES_JUMPING);
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
        if (!this.isDead() && this.world.keyboard.E && !this.maxMagicalEnergy <= 0) {
            this.maxMagicalEnergy -= 20;
            this.world.resetMagicBar();
            this.world.setMagicBar();
            let tornado = new Tornado(this.x + 35, this.y + 5);
            this.world.level.longRangeAttacks.push(tornado);
            for (let index = 0; index < this.world.level.longRangeAttacks.length; index++) {
                setTimeout(() => {
                    this.world.level.longRangeAttacks.splice(index, 1);
                }, 1700);
            };
        }
    }

    restoreJumpEnergy(){
        if (this.maxEnergy < 80) {
            this.maxEnergy += 1;
            this.world.resetEnergyBar();
            this.world.setEnergyBar();
        }
    }
}





