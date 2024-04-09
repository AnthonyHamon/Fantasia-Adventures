class Clouds extends movableObject {
    width = 960;
    height = 540;


    constructor(x) {
        super().loadImage('img/level_set/forest/Background/Bright/clouds_small.png');
        this.y = -200 + Math.random() * 100;
        this.animate();
        this.x = x;
    };


    /**
     * method to animate clouds
     */
    animate() {
        const animate = setInterval(()=>{
            this.moveLeft(); // cloud are moving to the left
        }, 1000 / 60)
        allIntervals.push(animate);
    }
}