class Character extends movableObject {
    IMAGESWALKING = [
        'img/character/Rogue/Walk/walk1.png',
        'img/character/Rogue/Walk/walk2.png',
        'img/character/Rogue/Walk/walk3.png',
        'img/character/Rogue/Walk/walk4.png',
        'img/character/Rogue/Walk/walk5.png',
        'img/character/Rogue/Walk/walk6.png'
    ];

    IMAGESJUMPING = [
        'img/character/Rogue/Jump/jump1.png',
        'img/character/Rogue/Jump/jump2.png',
        'img/character/Rogue/Jump/jump3.png',
        'img/character/Rogue/Jump/jump4.png',
        'img/character/Rogue/Jump/jump5.png',
        'img/character/Rogue/Jump/jump6.png',
        'img/character/Rogue/Jump/jump7.png',
    ];

    world;
    speed = 3;
    // x = 0;
    // x = 2100;
    y = 376;

    constructor() {
        // super().loadImage(this.IMAGESWALKING[0]);
        super().loadImages(this.IMAGESWALKING);
        this.loadImages(this.IMAGESJUMPING);
        this.animate();
        this.applyGravity();
    };


    animate() {

        setInterval(() => {
            this.world.level.walking_sound_grass.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - (this.width / 2)) {
                this.moveRight();
                // this.world.level.walking_sound_grass.play();
                console.log('character position is', this.x);
            }

            if (this.world.keyboard.LEFT && this.x > -120 && this.x < 1944 || this.world.keyboard.LEFT && this.x > 1945) {
                this.moveLeft();
                // this.world.level.walking_sound_grass.play();
                console.log('character position is', this.x);
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }


            if (this.x > 696 && this.world.camera_x < this.world.canvas.width * 2) {
                this.world.camera_x = this.x - 200;
            }
            if (this.x <= 696) {
                this.world.camera_x = -200;
            }
            if (this.world.camera_x == this.world.canvas.width * 2) {
                this.world.camera_x = this.world.canvas.width * 2;
            }
        }, 1000 / 60);


        setInterval(() => {

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGESJUMPING);
            } else {
                this.loadImage(this.IMAGESWALKING[0])
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGESWALKING);
                }
            }
        }, 150);
    }

}

