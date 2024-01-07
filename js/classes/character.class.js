class Character extends movableObject {
    IMAGESWALKING = [
        'img/character/Rogue/Walk/walk1.png',
        'img/character/Rogue/Walk/walk2.png',
        'img/character/Rogue/Walk/walk3.png',
        'img/character/Rogue/Walk/walk4.png',
        'img/character/Rogue/Walk/walk5.png',
        'img/character/Rogue/Walk/walk6.png'
    ];
    world;
    speed = 3;
    // x = 0;
    x = 2100;
    y = 376;
    // y = 200;

    constructor() {
        super().loadImage('img/character/Rogue/Walk/walk1.png');
        this.loadImages(this.IMAGESWALKING);
        this.animate();
    };


    animate() {

        setInterval(() => {
            this.world.level.walking_sound_grass.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - (this.width / 2)) {
                this.x += this.speed;
                this.otherDirection = false;
                // this.world.level.walking_sound_grass.play();
                console.log('character position is', this.x);
            }

            if (this.world.keyboard.LEFT && this.x > -120 && this.x < 1944 || this.world.keyboard.LEFT && this.x > 1945) {
                this.x -= this.speed;
                this.otherDirection = true;
                // this.world.level.walking_sound_grass.play();
                console.log('character position is', this.x);
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
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                // Walk animation
                let i = this.currentImage % this.IMAGESWALKING.length;
                let path = this.IMAGESWALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 150);
    }

    jump() {

    }
}