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
    speed = 3;
    y = 376;
    height = 128;
    width = 128;

    constructor() {
        super().loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
        this.applyGravity();
        this.deathPosition();
    };


    animate() {

        setInterval(() => {
            this.world.level.walking_sound_grass.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - (this.width / 2)) {
                this.moveRight();
                // this.world.level.walking_sound_grass.play();
                // console.log('character position is', this.x);
            }

            if (this.world.keyboard.LEFT && this.x > -120 && this.x < 1944 || this.world.keyboard.LEFT && this.x > 1945) {
                this.moveLeft();
                // this.world.level.walking_sound_grass.play();
                // console.log('character position is', this.x);
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }


            // if (this.x > 696 && this.world.camera_x < this.world.canvas.width * 2) {     // camera follow player since he reached end of  previous screen
            //     this.world.camera_x = this.x - 200;
            // }

            if (this.world.camera_x < this.world.canvas.width * 2) {    // camera goes with player from beginning
                this.world.camera_x = this.x - 200;
            }

            if(this.x > 696 && this.world.camera_x < this.world.canvas.width * 2 && this.isDead()){
                this.world.camera_x = this.x - 126;
            }

            // if (this.x <= 696) {             // camera stays at beginning position until player reached end of screen then camera jump to player and follow
            //     this.world.camera_x = -200;
            // }

            if (this.world.camera_x == this.world.canvas.width * 2) {
                this.world.camera_x = this.world.canvas.width * 2;
            }
        }, 1000 / 60);


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEATH);
                this.width = 256;
                this.height = 256;
                this.y = 328;
            }else if (this.isHurt()){
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

    deathPosition(){
        const deathInterval = setInterval(() => {
            if(this.isDead()){
                clearInterval(deathInterval);
                this.x = this.x - 72;
                this.y = 328;
            }
        }, 150);
        
    }

}

