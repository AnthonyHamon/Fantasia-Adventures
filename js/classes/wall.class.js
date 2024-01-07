class Wall extends drawableObjects{
     
    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
     }
}