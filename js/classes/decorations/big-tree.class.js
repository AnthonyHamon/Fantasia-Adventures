class BigTree extends drawableObjects{
    
    width = 256;
    height = 256;
    
    
    constructor(imagePath, x, y ){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}