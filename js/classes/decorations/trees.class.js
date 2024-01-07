class Tree extends drawableObjects {

    width = 128;
    height = 128;

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}