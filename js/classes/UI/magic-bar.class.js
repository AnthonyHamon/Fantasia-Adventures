class MagicBar extends DrawableObjects {
    width;
    height = 12;


    constructor(imagePath, x, width) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 44;
        this.width = width;
    }
}