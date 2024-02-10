class EnergyBar extends DrawableObjects{
    width;
    height = 12;
    

    constructor(imagePath, x, width) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 26;
        this.width = width;
    }
}
