class BackgroundObject extends movableObject {
    width = 960;
    height = 576

    constructor(ImagePath, x) {
        super().loadImage(ImagePath);
        this.x = x;
        this.y = 576 - this.height;
    }
}