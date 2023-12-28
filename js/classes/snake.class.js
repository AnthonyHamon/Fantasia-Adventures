class Snake extends movableObject {
    y = 540 - 136;
    constructor() {
        super().loadImage('img/enemies/Snake/Walk1.png');
        this.loadImages([
            'img/enemies/Snake/Walk1.png',
            'img/enemies/Snake/Walk2.png',
            'img/enemies/Snake/Walk3.png',
            'img/enemies/Snake/Walk4.png'
        ])
        this.x = 300 + Math.random() * 500;
        this.movableObjectAnimation(this.x);
    };

    movableObjectAnimation(x) {
        x = setInterval(() => {
            this.x += 0.15;
        }, 1000 / 60);
    }
}