class Coin extends movableObject {
    ANIMATEDCOINIMAGES = [
        'img/level_set/forest/Objects_Animated/Coin/coin.png',
        'img/level_set/forest/Objects_Animated/Coin/coin2.png',
        'img/level_set/forest/Objects_Animated/Coin/coin3.png',
        'img/level_set/forest/Objects_Animated/Coin/coin4.png',
        'img/level_set/forest/Objects_Animated/Coin/coin5.png',
        'img/level_set/forest/Objects_Animated/Coin/coin6.png',
        'img/level_set/forest/Objects_Animated/Coin/coin7.png',
        'img/level_set/forest/Objects_Animated/Coin/coin8.png',
        'img/level_set/forest/Objects_Animated/Coin/coin9.png',
        'img/level_set/forest/Objects_Animated/Coin/coin10.png',
    ];


    x = 2608;
    y = 80;
    width = 32;
    height = 32;

    constructor() {
        super().loadImages(this.ANIMATEDCOINIMAGES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.ANIMATEDCOINIMAGES.length;
            let path = this.ANIMATEDCOINIMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);
    }
}