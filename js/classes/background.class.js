class BackgroundObject extends movableObject {
    width = 960;
    height = 540

    constructor(ImagePath) {
        super().loadImage(ImagePath);
        this.x = 960 - this.width;
        this.y = 540 - this.height;
    }
}