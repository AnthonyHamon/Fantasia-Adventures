class Clouds extends movableObject {
    width = 960;
    height = 540;


    constructor(x) {
        super().loadImage('img/level_set/forest/Background/Bright/clouds_small.png');
        this.y = -200 + Math.random() * 100;
        this.animate();
        this.x = x;
    };

    animate() {
        this.moveLeft();
    }
}