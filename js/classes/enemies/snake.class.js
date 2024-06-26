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
    y = 444;
    height = 128;
    width = 128;
    inflictDamages = 2;
    receivedPhysicalDamages = 2;
    receivedMagicalDamages = 0;
    killPoint = 10;
    attack_sound = new Audio('audio/snake_attack.mp3');
    hurt_sound = new Audio('audio/snake_attack.mp3');




    offset = {
        top: 48,
        right: 48,
        bottom: 40,
        left: 38
    }

    constructor() {
        super().loadImage(this.IMAGES_WALKING_SNAKE[0]);
        this.loadImages(this.IMAGES_WALKING_SNAKE);
        this.loadImages(this.IMAGES_ATTACKING_SNAKE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 200 + Math.random() * 1450;
        this.speed = 0.15 + Math.random() * 0.5;
        this.letEnemyMove();
        this.animate();
        this.playEnemiesSoundEffect();
    };


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
        }, 1000 / 60);

        allIntervals.push(letEnemyMove);
    }


     /**
     * method to animate enemy
     */
    animate() {
        const animate = setInterval(() => {
            if (this.world)
                if (this.isDead() && this.deathAnimationStarted) {
                    this.playAnimation(this.IMAGES_DEATH);
                    if (this.currentImage == this.IMAGES_DEATH.length - 1) {
                        this.deathAnimationEnded = true;    // set variable to stop at end of animation
                    }
                } else if (this.isHurt()) { 
                    this.playAnimation(this.IMAGES_HURT); // play hurt animation
                } else if (this.isColliding(this.world.character)) {
                    this.playAnimation(this.IMAGES_ATTACKING_SNAKE); // play attack animation
                } else {
                    this.playAnimation(this.IMAGES_WALKING_SNAKE); // play walk animation
                }
        }, 180);

        allIntervals.push(animate);
    }

}