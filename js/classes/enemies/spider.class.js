class Spider extends movableObject {

    IMAGES_SPIDER_WALKING = [
        'img/enemies/spider/walk1.png',
        'img/enemies/spider/walk2.png',
        'img/enemies/spider/walk3.png',
        'img/enemies/spider/walk4.png',
        'img/enemies/spider/walk5.png',
        'img/enemies/spider/walk6.png',
    ];

    IMAGES_ATTACKING = [
        'img/enemies/spider/attack1.png',
        'img/enemies/spider/attack2.png',
        'img/enemies/spider/attack3.png'
    ]

    IMAGES_HURT = [
        'img/enemies/spider/hurt1.png',
        'img/enemies/spider/hurt2.png',
        'img/enemies/spider/hurt3.png'
    ];

    IMAGES_DEATH = [
        'img/enemies/spider/death1.png',
        'img/enemies/spider/death2.png',
        'img/enemies/spider/death3.png',
        'img/enemies/spider/death4.png',
    ];


    x = 2440;
    y = 64;

    height = 128;
    width = 128;
    speed = 1;
    startPoint = 2360;
    endPoint = 2540;
    inflictDamages = 4;
    receivedPhysicalDamages = 10;
    receivedMagicalDamages = 5;
    killPoint = 30;




    offset = {
        top: 36,
        right: 56,
        bottom: 48,
        left: 16
    }

    constructor() {
        super().loadImages(this.IMAGES_SPIDER_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.letEnemyMove();
        this.animate();
    }

    letEnemyMove() {

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
            this.resetEnemyLifeBar();
            this.setEnemyLifeBar();
        }, 1000 / 60);

    }

    animate() {

        setInterval(() => {
            if (this.isDead() && this.deathAnimationStarted) {
                this.playAnimation(this.IMAGES_DEATH);
                if (this.currentImage == this.IMAGES_DEATH.length - 1) {
                    this.deathAnimationEnded = true;
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.world && this.isColliding(this.world.character)) {
                this.playAnimation(this.IMAGES_ATTACKING)
            } else {
                this.playAnimation(this.IMAGES_SPIDER_WALKING);
            }
        }, 180);
    }
}