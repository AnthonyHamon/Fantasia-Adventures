class movableObject extends DrawableObjects {
    hadFirstContact = false;
    reachedStart = false;
    reachedEnd = false;
    otherDirection = false;
    deathAnimationStarted = false;
    deathAnimationEnded = false;
    ground = 346;
    speed = 0.20;
    speedY = 0;
    speedX = 0;
    gravityAcceleration = 0.4;
    life = 100;
    lastMove = 0;
    lastHit = 0;
    startPoint = -130;
    endPoint = 1790;
    enemyLifeBar = [];

    /**
     * method to set time of character last move
     */
    stay() {
        this.lastMove = new Date().getTime();
    }

    /**
     *      
     * method to set if character is inactive (time pased since last move is higher than 5 sec)
     * @returns true or false
     */
    isInactiv() {
        let timePassed = new Date().getTime() - this.lastMove;
        timePassed = timePassed / 1000;
        if (timePassed > 5) { // 5
            return true;
        } else {
            return false;
        }
    }


    /**
     * 
     * @param {number} speedX 
     * method for walking to the right at the, as parameter, given speed
     */
    moveRight(speedX) {
        if (speedX) this.speed = speedX;
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * 
     * @param {number} speedX 
     * method for walking to the left at the, as parameter, given speed
     */
    moveLeft(speedX) {
        if (speedX) {
            this.speed = speedX;
            this.x += this.speed;
            this.otherDirection = true;
        } 
        else if (!speedX) {
            this.x -= this.speed;
            this.otherDirection = true;
        }
    }

    /**
     * 
     * @param {Array} images 
     * method is fired with interval an set current image path according to array length thanks modulo operator 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // i set with modulo operator
        let path = images[i];                      // path set from image array according to index (i)  
        this.img = this.imageCache[path];          // image is now set from image cache and can be drawn
        this.currentImage++;                       // current image get higher, methode fired again thanks interval and animation is drawn at interval speed
    }


    /**
     * methode to let character fall if in the air
     */
    applyGravity() {
        const applyGravity = setInterval(() => {
            this.y += this.speedY;                      // y is character y coordinate, speedY is character speed when jumping
            this.speedY += this.gravityAcceleration;    // gravity acceleration make character falling always faster by adding value to speedY.
        }, 1000 / 60);
        allIntervals.push(applyGravity);
    }

    

    /**
     * 
     * @param {string} boss 
     * method to draw enemy lifebar. If enemy is endboss, lifebar is bigger 
     */
    setEnemyLifeBar(boss) {
        let x = this.x + this.offset.left;
        let y = this.y + this.offset.top - 20;
        let height = 8
        if (boss) height = 10, x = this.x + 20, y = this.y + this.offset.top - 40
        let percentage = this.life / 10;
        if (percentage > 0) {
            let HPCorner = new LifeBar('img/UI/HUD-Bar/hp_corner1.png', x, y, 4, height);
            this.enemyLifeBar.push(HPCorner);
            for (let index = 1; index < percentage; index++) {
                let HP = new LifeBar('img/UI/HUD-Bar/hp_point.png', x + 4, y, 10, height);
                this.enemyLifeBar.push(HP);
                x = x + 10;
            }
        }
        if (percentage = percentage * 10) {
            let HPEndCorner = new LifeBar('img/UI/HUD-Bar/hp_corner2.png', x + 4, y, 4, height);
            this.enemyLifeBar.push(HPEndCorner);
        }
    }

    /**
     * method to reset enemy lifebar in order to be updated
     */
    resetEnemyLifeBar() {
        this.enemyLifeBar.splice(0)
    }

     /**
     * method to continuously set and reset lifebar for continuously update thank interval
     */
     updateLifeBar(boss) {
        this.resetEnemyLifeBar();    // reset the lifebar
        this.setEnemyLifeBar(boss);  // set lifebar again
    }


    /**
     * 
     * @returns the speed by jump (how hight character is jumping)
     */
    jump() {
        this.isJumping = true;
        return this.speedY = -8;
    }

    /**
     * 
     * @param {Object} obj 
     * @returns true or false if test is passed
     * test is to check if the current object (character or enemy), is colliding with another object in all possible direction
     */
    isColliding(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) &&
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) // change to right because seems to be logical , change to bottom if problems
        // && obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }


    /**
     * 
     * @param {Object} obj 
     * @returns true or false if test is passed
     * test is to check if there's a collision against a obstacle block
     */
    obstacleCollision(obj) {
        return (
            this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
            this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom &&
            this.x + this.offset.left <= obj.x + obj.width &&
            this.x + this.width - this.offset.right >= obj.x
        )
    }


    /**
     * 
     * @param {number} damages 
     * method to make character or enemy losing life accfording to the damage given as parameter
     */
    hit(damages) {
        this.life -= damages;
        if (this.life < 0) this.life = 0;   // objet life cannot get under 0
        else this.lastHit = new Date().getTime();  // set variable when the last time object got hurt 
    }

    /**
     * 
     * @returns true or false if timepassed between two hit is under 0.5sec
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;  // set variable timePassed to calc tiem passed between two hit
        timePassed = timePassed / 1000;     // formate timePassed in sec
        return timePassed < 0.5;            // return true or false if timePassed under 0.5sec
    }

    /**
     * 
     * @returns true or false if object life is 0;
     */
    isDead() {
        return this.life == 0;
    }

    /**
     * method to let death animation starting at the beginning
     */
    startDeathAnimation() {
        this.currentImage = 0;
        this.speed = 0;
        this.deathAnimationStarted = true;
    }

    /**
     * 
     * @returns true or false if object reached a the startgame coordinate
     */
    reachedStartPoint() {
        if (this.x + this.offset.left <= this.startPoint) {
            this.reachedStart = true;
            this.reachedEnd = false;
            this.otherDirection = true;
            return true;
        }
        return false
    }


    /**
     * 
     * @returns true or false if object reached a the endgame coordinate
     */
    reachedEndPoint() {
        if (this.x + this.width - this.offset.right >= this.endPoint) {
            this.reachedEnd = true
            this.otherDirection = false;
            return true;
        }
        return false;
    }

}