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
    inflictDamages = 6;
    receivedPhysicalDamages = 5;
    receivedMagicalDamages = 7;
    killPoint = 50;
    attack_sound = new Audio('audio/bear_attack.mp3');
    hurt_sound = new Audio('audio/bear_attack.mp3');


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
        this.letEnemyMove();
        this.playEnemiesSoundEffect();
    }


    /**
     * methode to make enemy move if passed a test
     */
    letEnemyMove() {
        const letEnemyMove = setInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
            } else if (this.reachedEndPoint()) { // check enemys position to a given coordinate
                this.moveLeft(); // enemy is moving left
            }
            if (this.reachedStart && !this.reachedEnd) {
                this.moveRight(); // enemy is moving right
            } else if (!this.reachedStartPoint()) {  // check enemys position to a given coordinate
                this.moveLeft(); // enemy is moving left
            }
            this.updateLifeBar(); // lifebar stay on top of enemy
        }, 1000 / 60);
        allIntervals.push(letEnemyMove);
    }


    /**
     * method to animate enemy
     */
    animate() {
        let i = 0;
        const animate = setInterval(() => {
            if (this.world) {
                if (this.isDead() && this.deathAnimationStarted) {
                    this.playAnimation(this.IMAGES_DEATH);
                    if (this.currentImage == this.IMAGES_DEATH.length - 1) {
                        this.deathAnimationEnded = true;    // set variable to stop at end of animation
                    }
                } else if (this.isHurt()) {
                    this.speed = 0;
                    this.playAnimation(this.IMAGES_HURT) // play hurt animation
                } else if (i < 4) {
                    this.playAnimation(this.IMAGES_WAITING_BEAR); // play idle animation when character reached this enemy then let enemy moves
                } else if (this.hadFirstContact && !this.isColliding(this.world.character)) {
                    this.speed = 1;
                    this.playAnimation(this.IMAGES_WALKING_BEAR); // play walk animation
                } else if (this.isColliding(this.world.character)) {
                    this.playAnimation(this.IMAGES_ATTACKING)       // play attack animation
                }
                i++;

                if (this.world.character.x > 1200 && !this.hadFirstContact) {
                    i = 0;
                    this.hadFirstContact = true; // set variable to animate enemy only after test is passed
                }
            }
        }, 180);

        allIntervals.push(animate);
    }
}