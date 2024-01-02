class BackgroundObject extends movableObject {
    width = 960;
    height = 540

    constructor(ImagePath, x) {
        super().loadImage(ImagePath);
        this.x = x;
        this.y = 540 - this.height;
    }
}