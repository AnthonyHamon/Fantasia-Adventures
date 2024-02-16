class Snake extends movableObject {
    IMAGES_WALKING_SNAKE = [
        'img/enemies/Snake/Walk1.png',
        'img/enemies/Snake/Walk2.png',
        'img/enemies/Snake/Walk3.png',
        'img/enemies/Snake/Walk4.png'
    ];

    IMAGES_ATTACKING_SNAKE = [
        'img/enemies/Snake/Attack1.png',
        'img/enemies/Snake/Attack2.png',
        'img/enemies/Snake/Attack3.png',
        'img/enemies/Snake/Attack4.png'
    ]

    IMAGES_HURT = [
        'img/enemies/Snake/Hurt1.png',
        'img/enemies/Snake/Hurt2.png'
    ];

    IMAGES_DEATH = [
        'img/enemies/Snake/Death1.png',
        'img/enemies/Snake/Death2.png',
        'img/enemies/Snake/Death3.png',
        'img/enemies/Snake/Death4.png',
    ];

    life = 2;
    y = 404;
    height = 128;
    width = 128;

    offset = {
        top: 48,
        right: 48,
        bottom: 40,
        left: 38
    }

    constructor(x, y) {
        super().loadImage(this.IMAGES_WALKING_SNAKE[0]);
        this.loadImages(this.IMAGES_WALKING_SNAKE);
        this.loadImages(this.IMAGES_ATTACKING_SNAKE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        // this.x = 300 + Math.random() * 1300; // must be restored after test
        // this.x = x; // to remove after test
        // this.y = y; // to remove after test
        this.x = 400 + Math.random() * 1590;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    };

    animate() {

        // setInterval(() => {
        //     this.moveRight();
        // }, 1000 / 60);

        setInterval(() => {
            if(this.reachedEndPoint()){
                this.moveLeft();
            }
            if(this.reachedStart && !this.reachedEnd) {
                this.moveRight();
                // this.otherDirection = true;
            } else if (!this.reachedStartPoint()) {
                this.moveLeft();
                // this.otherDirection = false;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEATH);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING_SNAKE);
            }
        }, 200);
    }

    reachedStartPoint() {
        if (this.x <= this.startPoint) {
            this.reachedStart = true;
            this.reachedEnd = false;
            this.otherDirection = true;
        }
    }

    reachedEndPoint() {
        if (this.x >= this.endPoint) {
            this.reachedEnd = true
            // this.otherDirection = false;
        }
    }
}