class Crystal extends movableObject{

    ANIMATEDCRYSTALIMAGES = [
        'img/level_set/forest/Objects_Animated/Crystal/crystal.png',
        'img/level_set/forest/Objects_Animated/Crystal/crystal2.png',
        'img/level_set/forest/Objects_Animated/Crystal/crystal3.png',
        'img/level_set/forest/Objects_Animated/Crystal/crystal4.png',
        'img/level_set/forest/Objects_Animated/Crystal/crystal5.png',
        'img/level_set/forest/Objects_Animated/Crystal/crystal6.png',
        'img/level_set/forest/Objects_Animated/Crystal/crystal7.png',
        'img/level_set/forest/Objects_Animated/Crystal/crystal8.png',
        'img/level_set/forest/Objects_Animated/Crystal/crystal9.png',
        'img/level_set/forest/Objects_Animated/Crystal/crystal10.png',
    ];

    width = 32;
    height = 32;

    constructor(x, y){
        super().loadImages(this.ANIMATEDCRYSTALIMAGES);
        this.animate();
        this.x = x;
        this.y = y;
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.ANIMATEDCRYSTALIMAGES.length;
            let path = this.ANIMATEDCRYSTALIMAGES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);
    }
}