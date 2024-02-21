class Ent extends movableObject {

    IMAGES_WAITING_ENT = [
        'img/enemies/ent/idle1.png',
        'img/enemies/ent/idle2.png',
        'img/enemies/ent/idle3.png',
        'img/enemies/ent/idle4.png'
    ];

    IMAGES_HURT = [
        'img/enemies/ent/hurt1.png',
        'img/enemies/ent/hurt2.png',
        'img/enemies/ent/hurt3.png',
    ]

    IMAGES_DEATH = [
        'img/enemies/ent/death1.png',
        'img/enemies/ent/death2.png',
        'img/enemies/ent/death3.png',
        'img/enemies/ent/death4.png',
        'img/enemies/ent/death5.png',
        'img/enemies/ent/death6.png',
        'img/enemies/ent/death7.png',
    ]

    IMAGES_WALKING = [
        'img/enemies/ent/walk1.png',
        'img/enemies/ent/walk2.png',
        'img/enemies/ent/walk3.png',
        'img/enemies/ent/walk4.png',
        'img/enemies/ent/walk5.png',
        'img/enemies/ent/walk6.png',
    ]

    x = 1500;
    y = 308;
    width = 256;
    height = 256;
    speed = 1;
    endPoint = 1750;

    offset = {
        top: 78,
        right: 112,
        bottom: 78,
        left: 52
    }

    constructor() {
        super().loadImages(this.IMAGES_WAITING_ENT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
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
                setTimeout(() => {
                    this.moveRight();
                }, 500);
            } else if (!this.reachedStartPoint() && this.hadFirstContact) {
                setTimeout(() => {
                    this.moveLeft();
                }, 500);
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
                this.playAnimation(this.IMAGES_WAITING_ENT);
            } else if (this.hadFirstContact) {
                this.speed = 1;
                this.playAnimation(this.IMAGES_WALKING);

            }
            i++;

            setTimeout(() => {
                if (this.world.character.x > 900 && !this.hadFirstContact) {
                    i = 0;
                    this.hadFirstContact = true;
                }
            }, 1000);

        }, 180);

    }
}