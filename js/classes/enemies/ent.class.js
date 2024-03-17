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

    IMAGES_ATTACKING = [
        'img/enemies/ent/attack1.png',
        'img/enemies/ent/attack2.png',
        'img/enemies/ent/attack3.png',
        'img/enemies/ent/attack4.png',
        'img/enemies/ent/attack5.png'
    ]

    x = 1500;
    y = 346;
    width = 256;
    height = 256;
    speed = 0;
    endPoint = 1790;
    inflictDamages = 5;
    receivedPhysicalDamages = 5;
    receivedMagicalDamages = 7;
    killPoint = 30;



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
        this.loadImages(this.IMAGES_ATTACKING);
        this.animate();
        this.letEnemyMove();
    }

    letEnemyMove(){
        const letEnemyMove = setInterval(() => {
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

        allIntervals.push(letEnemyMove);
    }

    animate() {
        let i = 0;
        const animate = setInterval(() => {
            if (this.world) {
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
                } else if (this.hadFirstContact && !this.isColliding(this.world.character)) {
                    this.speed = 1;
                    this.playAnimation(this.IMAGES_WALKING);
                } else if (this.isColliding(this.world.character)) {
                    this.playAnimation(this.IMAGES_ATTACKING)
                }
                i++;

                if (this.world && this.world.character.x > 900 && !this.hadFirstContact) {
                    i = 0;
                    this.hadFirstContact = true;
                }
            }
        }, 180);

        allIntervals.push(animate);
    }
}