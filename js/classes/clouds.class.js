class Clouds extends movableObject{
    width = 960;
    height = 540;


    constructor(){
        super().loadImage('img/level_set/forest/Background/Bright/clouds_small.png');
        this.y = 0;
        this.x = 0;
    };
}