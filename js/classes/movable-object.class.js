class movableObject extends DrawableObjects {
    obstacle = false;
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


    stay() {
        this.lastMove = new Date().getTime();
    }

    isInactiv() {
        let timePassed = new Date().getTime() - this.lastMove;
        timePassed = timePassed / 1000;
        if (timePassed > 5000000) {
            return true;
        } else {
            return false;
        }
    }

    moveRight(speedX) {
        if (speedX) this.speed = speedX;
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft(speedX) {
        if (speedX) this.speed = speedX;
        this.x += this.speed;
        this.otherDirection = true;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            this.y += this.speedY;
            this.speedY += this.gravityAcceleration;
        }, 1000 / 60);
    }


    // applyGravity() {
    //     setInterval(() => {
    //         if(this.speedY < 0){
    //             this.y += this.speedY;
    //             this.speedY += this.gravityAcceleration;
    //         }else {
    //             this.speedY = 0;
    //         }
    //     }, 1000 / 60);
    // }


    // applyGravity() {
    //     setInterval(() => {
    //         if (this.isAboveGround() && !this.isClimbing && !this.isOnPlatform || this.speedY > 0) {
    //             console.log('applyGravity true')
    //             console.log('is on platform', this.isOnPlatform)
    //             this.y -= this.speedY;
    //             this.speedY -= this.gravityAcceleration;
    //         } else {
    //             console.log('applyGravity false')
    //             this.speedY = 0;
    //         }
    //     }, 1000 / 60);
    // }

    // isAboveGround() {
    //     if (this instanceof ThrowableObjects) {
    //         return true;
    //     } else if (!this.isOnPlatform && !this.isDead()) {
    //         return this.y <= this.ground;
    //     } else{
    //         return false;
    //     }
    // }

    jump() {
        return this.speedY = -8;// -11; // -8
    }

    isColliding(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x + obj.offset.left &&
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) &&
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) // change to right because seems to be logical , change to bottom if problems
        // && obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    obstacleCollision(obj) {
        return (
            this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
            this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom &&
            this.x + this.offset.left <= obj.x + obj.width &&
            this.x + this.width - this.offset.right >= obj.x
        )
    }



    hit(damage) {
        this.life -= damage;
        if (this.life < 0) {
            this.life = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.5;
    }

    isDead() {
        return this.life == 0;
    }

    startDeathAnimation() {
        this.currentImage = 0;
        this.speed = 0;
        this.deathAnimationStarted = true;
    }

    reachedStartPoint() {
        if (this.x + this.offset.left <= this.startPoint) {
            this.reachedStart = true;
            this.reachedEnd = false;
            this.otherDirection = true;
            return true;
        }
        return false
    }

    reachedEndPoint() {
        if (this.x + this.width - this.offset.right >= this.endPoint) {
            this.reachedEnd = true
            this.otherDirection = false;
            return true;
        }
        return false;
    }

}