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

    life = 4;
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
        this.x = 400 + Math.random() * 1590;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    };

    animate() {

        setInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
            } else if (this.reachedEndPoint()) {
                this.moveLeft();
            }
            if (this.reachedStart && !this.reachedEnd) {
                this.moveRight();
            } else if (!this.reachedStartPoint()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead() && this.deathAnimationStarted) {
                this.playAnimation(this.IMAGES_DEATH);
                if (this.currentImage == this.IMAGES_DEATH.length - 1) {
                    this.deathAnimationEnded = true;
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                this.playAnimation(this.IMAGES_WALKING_SNAKE);
            }
        }, 200);

        // setInterval(() => {
        //     if(this.isDead()){
        //         let index = this.world.level.enemies.indexOf(this);
        //         this.world.level.enemies.splice(index, 1)
        //     }
        // }, 200);
    }
}