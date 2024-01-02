class Floor extends movableObject {
    height = 64;
    width = 64;

    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 540 - this.height;
    }
}