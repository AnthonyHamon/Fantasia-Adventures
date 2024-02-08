class LifeBar extends DrawableObjects {
    width;
    height = 12;
    percentage = 25;
    

    constructor(imagePath, x, width) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 8;
        this.width = width;
    }
}

