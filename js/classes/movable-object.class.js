class movableObject extends DrawableObjects {
    speed = 0.20;
    otherDirection = false;
    speedY = 0;
    speedX = 0;
    gravityAcceleration = 0.5;
    // offsetY = 64;
    // offsetX = 64;
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
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        if (this instanceof ThrowableObjects) {
            return true;
        } else if (!this.isDead()) {
            return this.y < 376;
        }
    }

    jump() {
        this.speedY = 10;
    }

    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height)
    //         // &&
    //         // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }

    isColliding(obj) {
        return (this.x + this.width - this.offset.right) >= obj.x +obj.offset.left &&
            (this.y + this.height - this.offset.bottom) >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height - obj.offset.bottom) &&
            (this.x + this.offset.left) <= (obj.x + obj.width - obj.offset.bottom)
        // &&
        // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }


    isColliding2(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    // isColliding2(mo){
    //     return this.x + this.width > mo.x &&
    //     this.y + this.height > mo.y &&
    //     this.x < mo.x &&
    //     this.y < mo.y + mo.height
    // }

    hit() {
        this.life -= 0;
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