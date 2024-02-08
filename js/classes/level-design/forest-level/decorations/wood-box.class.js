class WoodBox extends DrawableObjects{

    width = 32;
    height = 32;

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}