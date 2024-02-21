class Bear extends movableObject {

    IMAGES_WAITING_BEAR = [
        'img/enemies/Bear/Walk1.png',
        'img/enemies/Bear/Walk2.png',
        'img/enemies/Bear/Walk3.png',
        'img/enemies/Bear/Walk4.png',
        'img/enemies/Bear/Walk5.png'
    ]

    IMAGES_HURT = [
        'img/enemies/Bear/Hurt1.png',
        'img/enemies/Bear/Hurt2.png'
    ]

    IMAGES_DEATH = [
        'img/enemies/Bear/Death1.png',
        'img/enemies/Bear/Death2.png',
        'img/enemies/Bear/Death3.png',
        'img/enemies/Bear/Death4.png',
    ]

    IMAGES_WALKING_BEAR = [
        'img/enemies/Bear/Walk1.png',
        'img/enemies/Bear/Walk2.png',
        'img/enemies/Bear/Walk3.png',
        'img/enemies/Bear/Walk4.png',
        'img/enemies/Bear/Walk5.png'
    ]

    x = 1972;
    y = 120;
    width = 128;
    height = 128;
    speed = 0;

    startPoint = 1800;
    endPoint = 2800;

    offset = {
        top: 64,
        right: 28,
        bottom: 20,
        left: 8
    }


    constructor() {
        super().loadImage(this.IMAGES_WAITING_BEAR[0]);
        this.loadImages(this.IMAGES_WAITING_BEAR);
        this.loadImages(this.IMAGES_WALKING_BEAR);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.animate();
    }

    animate() {

        let i = 0;

        setInterval(() => {
            if (this.reachedEndPoint()) {
                this.moveLeft();
            }
            if (this.reachedStart && !this.reachedEnd) {
                    this.moveRight();
            } else if (!this.reachedStartPoint() && this.hadFirstContact) {
                    this.moveLeft();
            }
        }, 1000 / 60);

        // setInterval(() => {
        //     if (this.isDead()) {
        //         this.speed = 0;
        //     } else if (this.reachedEndPoint()) {
        //         this.moveLeft();
        //     }
        //     if (this.reachedStart && !this.reachedEnd) {
        //         this.moveRight();
        //     } else if (!this.reachedStartPoint()) {
        //         this.moveLeft();
        //     }
        // }, 1000 / 60);

        setInterval(() => {
            if (this.isDead() && this.deathAnimationStarted) {
                this.playAnimation(this.IMAGES_DEATH);
                if (this.currentImage == this.IMAGES_DEATH.length - 1) {
                    this.deathAnimationEnded = true;
                }
            } else if (this.isHurt()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_HURT)
            } else if (i < 4) {
                this.playAnimation(this.IMAGES_WAITING_BEAR);
            } else if (this.hadFirstContact) {
                this.speed = 1;
                this.playAnimation(this.IMAGES_WALKING_BEAR);
            }
            i++;

            setTimeout(() => {
                if (this.world.character.x > 1500 && !this.hadFirstContact) {
                    i = 0;
                    this.hadFirstContact = true;
                }
            }, 1000);

        }, 180);


    }
}