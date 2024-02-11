class CharacterAvatar extends DrawableObjects{
    
    width = 64;
    height = 64;
    y = 8;
    x = 8;
    
    constructor(imagePath){
        super().loadImage(imagePath);
    }
}