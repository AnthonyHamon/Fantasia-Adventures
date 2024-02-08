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
    
    
    constructor(x, y) {
        super().loadImages(this.TORNADO_IMAGES);
        this.animate(x);
        this.useLongRangeAttack(x);
        this.y = y;
        this.width = 128;
        this.height = 128;
    }
    
    stopAttackAnimation(animation, x) {
        if (this.x >= x + 208) {
            clearInterval(animation);
            console.log('characterposition:', x, 'tornado position:', this.x)
        }
    }
}

