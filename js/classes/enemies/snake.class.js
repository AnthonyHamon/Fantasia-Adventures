class Snake extends movableObject {
    IMAGESWALKINGSNAKE = [
        'img/enemies/Snake/Walk1.png',
        'img/enemies/Snake/Walk2.png',
        'img/enemies/Snake/Walk3.png',
        'img/enemies/Snake/Walk4.png'
    ];

    y = 540 - 136;
    height = 128;
    width = 128;

    offset = {
        top: 48,
        right: 38,
        bottom: 40,
        left: 48
    }

    constructor() {
        super().loadImage(this.IMAGESWALKINGSNAKE[0]);
        this.loadImages(this.IMAGESWALKINGSNAKE);
        // this.x = 300 + Math.random() * 1300;
        this.x = 1590 + Math.random() * -560;
        this.speed = 0.15 + Math.random() * 0.4;
        this.animate();
    };

    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGESWALKINGSNAKE)
        }, 180);

    }
}