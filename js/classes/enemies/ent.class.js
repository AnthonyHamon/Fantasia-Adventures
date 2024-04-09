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
    attack_sound = new Audio('audio/ent_attack.mp3');
    hurt_sound = new Audio('audio/ent_hurt2.mp3');



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
                this.moveLeft();    // enemy is moving left
            }
            if (this.reachedStart && !this.reachedEnd) {
                this.moveRight();   // enemy is moving right
            } else if (!this.reachedStartPoint()) {
                this.moveLeft();    // enemy is moving left
            }
            this.updateLifeBar();   // lifebar stay on top of enemy
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
                    this.playAnimation(this.IMAGES_WAITING_ENT); // play idle animation when character reached this enemy then let enemy moves
                } else if (this.hadFirstContact && !this.isColliding(this.world.character)) {
                    this.speed = 1;
                    this.playAnimation(this.IMAGES_WALKING); // play walk animation
                } else if (this.isColliding(this.world.character)) {
                    this.playAnimation(this.IMAGES_ATTACKING)   // play attack animation
                }
                i++;

                if (this.world && this.world.character.x > 900 && !this.hadFirstContact) {
                    i = 0;
                    this.hadFirstContact = true;    // set variable to animate enemy only after test is passed
                }
            }
        }, 180);

        allIntervals.push(animate);
    }
}