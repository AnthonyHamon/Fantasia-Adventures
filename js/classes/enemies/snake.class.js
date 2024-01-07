class Snake extends movableObject {
    y = 540 - 136;
    IMAGESWALKINGSNAKE = [
        'img/enemies/Snake/Walk1.png',
        'img/enemies/Snake/Walk2.png',
        'img/enemies/Snake/Walk3.png',
        'img/enemies/Snake/Walk4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGESWALKINGSNAKE[0]);
        this.loadImages(this.IMAGESWALKINGSNAKE);
        // this.x = 300 + Math.random() * 1300;
        this.x = 1590 + Math.random() * -560;
        this.speed = 0.15 + Math.random() * 0.4;
        this.animate();
    };

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGESWALKINGSNAKE.length;
            let path = this.IMAGESWALKINGSNAKE[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);

    }
}