class Heart extends movableObject{
    ANIMATEDHEARTIMAGES = [
        'img/level_set/forest/Objects_Animated/Heart/heart.png',
        'img/level_set/forest/Objects_Animated/Heart/heart2.png',
        'img/level_set/forest/Objects_Animated/Heart/heart3.png',
        'img/level_set/forest/Objects_Animated/Heart/heart4.png',
        'img/level_set/forest/Objects_Animated/Heart/heart5.png',
        'img/level_set/forest/Objects_Animated/Heart/heart6.png',
        'img/level_set/forest/Objects_Animated/Heart/heart7.png',
        'img/level_set/forest/Objects_Animated/Heart/heart8.png',
        'img/level_set/forest/Objects_Animated/Heart/heart9.png',
        'img/level_set/forest/Objects_Animated/Heart/heart10.png',
    ];


    x = 2800;
    y = 40;
    width = 32;
    height = 32;
    FPS = 180;

    constructor(x, y){
        super().loadImages(this.ANIMATEDHEARTIMAGES);
        this.animate();
        this.x = x;
        this.y = y;
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.ANIMATEDHEARTIMAGES.length;
            let path = this.ANIMATEDHEARTIMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);
    }
}