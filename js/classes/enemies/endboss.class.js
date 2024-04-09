class Endboss extends movableObject {
    IMAGES_ATTACKING_BOSS = [
        'img/end_Bosses/Boss1/Attack1.png',
        'img/end_Bosses/Boss1/Attack2.png',
        'img/end_Bosses/Boss1/Attack3.png',
        'img/end_Bosses/Boss1/Attack4.png',
        'img/end_Bosses/Boss1/Attack5.png',
        'img/end_Bosses/Boss1/Attack6.png',
        'img/end_Bosses/Boss1/Attack7.png'
    ]

    IMAGES_WALKING_BOSS = [
        'img/end_Bosses/Boss1/Walk1.png',
        'img/end_Bosses/Boss1/Walk2.png',
        'img/end_Bosses/Boss1/Walk3.png',
        'img/end_Bosses/Boss1/Walk4.png',
        'img/end_Bosses/Boss1/Walk5.png',
        'img/end_Bosses/Boss1/Walk6.png'
    ]

    IMAGES_HURT = [
        'img/end_Bosses/Boss1/Hurt1.png',
        'img/end_Bosses/Boss1/Hurt2.png'
    ]

    IMAGES_DEATH = [
        'img/end_Bosses/Boss1/Death1.png',
        'img/end_Bosses/Boss1/Death2.png',
        'img/end_Bosses/Boss1/Death3.png',
        'img/end_Bosses/Boss1/Death4.png',
        'img/end_Bosses/Boss1/Death5.png',
    ]

    width = 250;
    height = 300;
    x = (960 * 3) - this.width;
    y = 278;
    life = 200;
    speed = 2;
    startPoint = 2000;
    endPoint = 2850;
    inflictDamages = 10;
    receivedPhysicalDamages = 2;
    receivedMagicalDamages = 5;
    killPoint = 1000;
    attack_sound = new Audio('audio/endBoss_attack.mp3');
    hurt_sound = new Audio('audio/endBoss_hurt.mp3');



    offset = {
        top: 120,
        right: 118,
        bottom: 54,
        left: 64
    }

    constructor() {
        super().loadImages(this.IMAGES_WALKING_BOSS);
        this.loadImages(this.IMAGES_ATTACKING_BOSS);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
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
            } else if (!this.reachedStartPoint()) { // check enemys position to a given coordinate
                this.moveLeft(); // enemy is moving left
            }

            this.updateLifeBar('boss'); // lifebar stay on top of enemy + size updated for endboss

        }, 1000 / 60);
        allIntervals.push(letEnemyMove);
    }


    /**
     * method to animate enemy
     */
    animate() {
        const animate = setInterval(() => {
            let i = 0;
            if (this.world)
                if (this.isDead() && this.deathAnimationStarted) {
                    this.playAnimation(this.IMAGES_DEATH);
                    if (this.currentImage == this.IMAGES_DEATH.length - 1) {
                        this.deathAnimationEnded = true;    // set variable to stop at end of animation
                    }
                } else if (this.isHurt()) {
                    this.speed = 0;
                    this.playAnimation(this.IMAGES_HURT) // play hurt animation
                } else if (!this.isColliding(this.world.character)) {
                    this.speed = 2;
                    this.playAnimation(this.IMAGES_WALKING_BOSS); // play walk animation
                } else if (this.isColliding(this.world.character)) {
                    this.playAnimation(this.IMAGES_ATTACKING_BOSS) // play attack animation
                }
            i++;
        }, 180);
        allIntervals.push(animate);
    }

}