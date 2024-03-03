class Bear extends movableObject {

    IMAGES_WAITING_BEAR = [
        'img/enemies/Bear/Idle1.png',
        'img/enemies/Bear/Idle2.png',
        'img/enemies/Bear/Idle3.png'
     
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

    IMAGES_ATTACKING = [
        'img/enemies/Bear/Attack1.png',
        'img/enemies/Bear/Attack2.png',
        'img/enemies/Bear/Attack3.png',
        'img/enemies/Bear/Attack4.png',
        'img/enemies/Bear/Attack5.png'
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
        this.loadImages(this.IMAGES_ATTACKING);
        this.animate();
        this.checkCharacterCollision();
    }

    animate() {

        let i = 0;


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
            if(this.hadFirstContact){
                this.resetEnemyLifeBar();
                this.setEnemyLifeBar(); 
            }
            
        }, 1000 / 60);

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
            } else if (this.hadFirstContact && !this.isColliding(this.world.character)) {
                this.speed = 1;
                this.playAnimation(this.IMAGES_WALKING_BEAR);
            }else if(this.isColliding(this.world.character)){
                this.playAnimation(this.IMAGES_ATTACKING)
            }
            i++;

            setTimeout(() => {
                if (this.world && this.world.character.x > 1500 && !this.hadFirstContact) {
                    i = 0;
                    this.hadFirstContact = true;
                }
            }, 1000);

        }, 180);


    }
}