class Snake extends movableObject {
    y = 540 - 136;
    IMAGESWALKING = [
        'img/enemies/Snake/Walk1.png',
        'img/enemies/Snake/Walk2.png',
        'img/enemies/Snake/Walk3.png',
        'img/enemies/Snake/Walk4.png'
    ];

    constructor() {
        super().loadImage('img/enemies/Snake/Walk1.png');
        this.loadImages(this.IMAGESWALKING);
        this.x = 300 + Math.random() * 2580;
        this.speed = 0.15 + Math.random() * 0.4;
        this.animate();
    };

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGESWALKING.length;
            let path = this.IMAGESWALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);

    }
}