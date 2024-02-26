class Ground extends movableObject {
    height = 64;
    width = 64;

    offset = {
        top: 10,
        right: 0,
        bottom: 0,
        left: 0
    }

    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 512;
    }
}