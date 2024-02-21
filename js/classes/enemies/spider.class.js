class Spider extends movableObject {

    IMAGES_SPIDER_WALKING = [
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
    speed = 1;

    startPoint = 2300;
    endPoint = 2500;

    offset = {
        top: 36,
        right: 56,
        bottom: 48,
        left: 16
    }

    constructor() {
        super().loadImages(this.IMAGES_SPIDER_WALKING);
        this.enemiesMoveRules();
        this.animate();
    }

    enemiesMoveRules() {
        setInterval(() => {
            if (this.reachedEndPoint()) {
                this.moveLeft();
            }
            if (this.reachedStart && !this.reachedEnd) {
                setTimeout(() => {
                    this.moveRight();
                }, 500);
            } else if (!this.reachedStartPoint() && this.hadFirstContact) {
                setTimeout(() => {
                    this.moveLeft();
                }, 500);
            }
        }, 1000 / 60);
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_SPIDER_WALKING);
        }, 180);
    }
}