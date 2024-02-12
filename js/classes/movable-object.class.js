class movableObject extends DrawableObjects {
    speed = 0.20;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    gravityAcceleration = 0.5;
    life = 100;
    lastHit = 0;

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
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
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.gravityAcceleration;
            }else{
                this.speedY = 0;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObjects) {
            return true;
        } else if (!this.isDead()) {
            return this.y < 312; ;
        }
    }

    jump() {
        return this.speedY = 11;
    }

    isColliding(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x +obj.offset.left &&
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) &&
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.right) // change to right because seems to be logical , change to bottom if problems
        // &&
        // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
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

    
}