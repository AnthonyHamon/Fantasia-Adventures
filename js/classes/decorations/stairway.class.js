class Stairway extends DrawableObjects {

    x = 2292;
    height = 32;
    width = 32;

    constructor(imagePath, y) {
        super().loadImage(imagePath);
        this.y = y;
    }
}