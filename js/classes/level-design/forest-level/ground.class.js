class Ground extends movableObject {
    height = 64;
    width = 64;

    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 512;
    }
}