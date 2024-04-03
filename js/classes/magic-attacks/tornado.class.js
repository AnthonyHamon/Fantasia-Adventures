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

    tornado_effect = new Audio('audio/tornado_effect.mp3');
    
    
    constructor(x, y, otherDirection) {
        super().loadImages(this.TORNADO_IMAGES);
        this.animate();
        this.useLongRangeAttack(x, otherDirection);
        this.playTornadoEffect();
        this.y = y;
        this.x = x;
        this.width = 128;
        this.height = 128;
    }
  

    stopAttackAnimation(animation) {
        if (this.currentImage == this.TORNADO_IMAGES.length) {
            clearInterval(animation);
        }
    }

    
}

