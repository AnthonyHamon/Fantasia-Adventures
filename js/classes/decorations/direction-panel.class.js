class DirectionPanel extends DrawableObjects{
    
    width = 32;
    height = 32;

    constructor(ImagePath, x, y){
        super().loadImage(ImagePath);
        this.x = x;
        this.y = y;
    }
}