class FirstFloor extends DrawableObjects {

    width = 64;
    height = 64;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 220;
    }
}