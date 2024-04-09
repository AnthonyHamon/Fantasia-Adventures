class CoinBar extends DrawableObjects {
    width;
    height = 12;


    constructor(imagePath, x, width) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 62;
        this.width = width;
    }
}