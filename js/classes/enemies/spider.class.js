class Spider extends movableObject {

    IMAGESSPIDERWAITING = [
        'img/enemies/spider/idle1.png',
        'img/enemies/spider/idle2.png',
        'img/enemies/spider/idle3.png',
        'img/enemies/spider/idle4.png'
    ];


    x = 2384;
    y = 64;

    height = 128;
    width = 128;
    speed = 0;

    constructor() {
        super().loadImages(this.IMAGESSPIDERWAITING);
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGESSPIDERWAITING)
        }, 180);

    }
}