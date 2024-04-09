class EnergyPotions extends DrawableObjects {

    width = 32;
    height = 32;
    x = 250 + Math.random() * 1800;
    y = 290 + Math.random() * 86;

    constructor(x, y) {
        super().loadImage('img/Items/collectable-items/Bottles/1_0006_Bottle7.png');
        this.x = x;
        this.y = y;
    }


    /**
     * interval to start animation of the energy potion in game
     */
    animate() {
        const animate = setInterval(() => {
            let i = this.currentImage % this.IMAGES_BOTTLES.length;
            let path = this.IMAGES_BOTTLES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 250);
        allIntervals.push(animate);
    }
}