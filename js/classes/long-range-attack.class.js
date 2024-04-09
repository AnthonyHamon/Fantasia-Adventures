class LongRangeAttack extends movableObject {
    speedX = 2;

    /**
     * 
     * @param {number} x 
     * @param {boolean} otherDirection 
     * 
     * methode to activate long range attack from x coordinate and according to character's direction
     */
    useLongRangeAttack(x, otherDirection) {
        if (!otherDirection) {
            this.useLongRangeAttackRight(x)
        } else {
            this.useLongRangeAttackLeft(x)
        }
    }


    /**
     * 
     * @param {number} x 
     * 
     * methode to activate long range attack from x coordinate and if character looking to the right
     */
    useLongRangeAttackRight(x) {
        let attackRange = setInterval(() => {
            this.x = x += this.speedX;
            this.stopAttackAnimation(attackRange);
        }, 1000 / 60);
    }

    /**
     * 
     * @param {number} x 
     * 
     * methode to activate long range attack from x coordinate and if character looking to the left
     */
    useLongRangeAttackLeft(x) {
        x = x - 95;
        let attackRange = setInterval(() => {
            this.x = x -= this.speedX;
            this.stopAttackAnimation(attackRange);
        }, 1000 / 60);
    }

    /**
     * methode to animate long range skill
     */
    animate() {
        let attackAnimation = setInterval(() => {
            let i = this.currentImage % this.TORNADO_IMAGES.length;
            let path = this.TORNADO_IMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.stopAttackAnimation(attackAnimation);
        }, 150);
    }
}