class Tornado extends LongRangeAttack{
    TORNADO_IMAGES = [
        'img/Skills/tornado/tornado1.png',
        'img/Skills/tornado/tornado2.png',
        'img/Skills/tornado/tornado3.png',
        'img/Skills/tornado/tornado4.png',
        'img/Skills/tornado/tornado5.png',
        'img/Skills/tornado/tornado6.png',
        'img/Skills/tornado/tornado7.png',
        'img/Skills/tornado/tornado8.png',
        'img/Skills/tornado/tornado9.png',
        'img/Skills/tornado/tornado10.png',
        'img/Skills/tornado/tornado11.png',
    ]

    offset = {
        top: 28,
        right: 38,
        bottom: 20,
        left: 28
    }
    
    
    constructor(x, y, otherDirection) {
        super().loadImages(this.TORNADO_IMAGES);
        this.animate(x);
        this.useLongRangeAttack(x, otherDirection);
        this.y = y;
        this.x = x;
        this.width = 128;
        this.height = 128;
    }
    
    stopAttackAnimation(animation, x) {
        if (this.x >= x + 208) {
            clearInterval(animation);
        }
    }

    useLongRangeAttack(x, otherDirection) {
        if(!otherDirection){
            this.useLongRangeAttackRight(x)
        }else{
            this.useLongRangeAttackLeft(x)
        }
    }

    useLongRangeAttackRight(x) {
        let characterPosition = x;
        let attackRange = setInterval(() => {
            this.x = x += this.speedX;
            this.stopAttackAnimation(attackRange, characterPosition);
        }, 1000 / 60);
    }


    useLongRangeAttackLeft(x) {
        let characterPosition = x;
        x = x - 95;
        let attackRange = setInterval(() => {
            this.x = x -= this.speedX;
            this.stopAttackAnimation(attackRange, characterPosition);
        }, 1000 / 60);
    }
}

