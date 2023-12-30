class Character extends movableObject {


    IMAGESWALKING = [
        'img/character/Rogue/Walk/walk1.png',
        'img/character/Rogue/Walk/walk2.png',
        'img/character/Rogue/Walk/walk3.png',
        'img/character/Rogue/Walk/walk4.png',
        'img/character/Rogue/Walk/walk5.png',
        'img/character/Rogue/Walk/walk6.png'
    ];

    constructor() {
        super().loadImage('img/character/Rogue/Walk/walk1.png');
        this.loadImages(this.IMAGESWALKING);
        this.movableObjectAnimation();
        this.animate();
    };

    movableObjectAnimation() {
        this.x = setInterval(() => {
            this.x += 0.15;
        }, 1000 / 60);
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGESWALKING.length;
            let path = this.IMAGESWALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 150);
    }

    jump() {

    }
}