class LongRangeAttack extends movableObject {
    speedX = 2;

    useLongRangeAttack(x) {
        let characterPosition = x;
        let attackRange = setInterval(() => {
            this.x = x += this.speedX;
            this.stopAttackAnimation(attackRange, characterPosition);
        }, 1000 / 60);
    }

    animate(x) {
        let attackAnimation = setInterval(() => {
            let i = this.currentImage % this.TORNADO_IMAGES.length;
            let path = this.TORNADO_IMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.stopAttackAnimation(attackAnimation, x);
        }, 150);
    }

}