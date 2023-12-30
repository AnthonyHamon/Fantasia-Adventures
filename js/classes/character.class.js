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
    speed = 5;


    constructor() {
        super().loadImage('img/character/Rogue/Walk/walk1.png');
        this.loadImages(this.IMAGESWALKING);
        this.animate();
    };


    animate() {

        setInterval(() => {
            if(keyboard.RIGHT)
                this.x += this.speed;
            }, 1000 / 60);


        setInterval(() => {
            if(keyboard.LEFT)
                this.x -= this.speed;
            }, 1000 / 60);


        setInterval(() => {
            if (this.world.keyboard.RIGHT|| this.world.keyboard.LEFT) {
                // this.moveLeft(keyboard);

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