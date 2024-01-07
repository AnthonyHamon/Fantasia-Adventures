class Crystal extends movableObject{

    ANIMATEDCRYSTALIMAGES = [
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

    constructor(){
        super().loadImages();
        animate();
    }
}