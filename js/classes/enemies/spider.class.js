class Spider extends movableObject {

    IMAGES_SPIDER_WAITING = [
        'img/enemies/spider/walk1.png',
        'img/enemies/spider/walk2.png',
        'img/enemies/spider/walk3.png',
        'img/enemies/spider/walk4.png',
        'img/enemies/spider/walk5.png',
        'img/enemies/spider/walk6.png',
    ];


    x = 2440;
    y = 64;

    height = 128;
    width = 128;
    speed = 0;

    offset = {
        top: 36,
        right: 56,
        bottom: 48,
        left: 16
    }

    constructor() {
        super().loadImages(this.IMAGES_SPIDER_WAITING);
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_SPIDER_WAITING)
        }, 180);

    }
}