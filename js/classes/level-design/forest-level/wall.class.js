class Wall extends DrawableObjects {

    width = 64;
    height = 64;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}