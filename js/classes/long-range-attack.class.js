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

    // useLongRangeAttack(x, otherDirection) {
    //     setInterval(() => {
    //         if(!otherDirection){
    //             this.x = this.longRangeAttackRight(x, otherDirection);
    //         }else{
    //             this.x = this.longRangeAttackLeft(x, otherDirection);
    //         }
    //     }, 1000 / 60);
    // }

    // longRangeAttackRight(x) {
    //         let characterPosition = x;
    //         let attackRange = setInterval(() => {
    //             x = x += this.speedX;
    //         }, 1000 / 60)
    //         this.stopAttackAnimation(attackRange, characterPosition);
    // }


    // longRangeAttackLeft(x) {
    //         let characterPosition = x;
    //         x = x -95;
    //         let attackRange = setInterval(() => {
    //             this.x = x -= this.speedX;
    //         }, 1000 / 60)
    //         this.stopAttackAnimation(attackRange, characterPosition);
    // }

}