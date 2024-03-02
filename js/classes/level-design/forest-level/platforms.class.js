class Platforms extends DrawableObjects{
    
    y = 300;
    width = 64;
    height = 64;

    offset = {
        top: 10,
        right: 0,
        bottom: 41,
        left: 0
    }
    
    constructor(imagePath, x, y, offsetTop, offsetBottom, offsetLeft, offsetRight){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.setSpecialOffsets(offsetTop, offsetBottom, offsetLeft, offsetRight);
    }

    setSpecialOffsets(offsetTop, offsetBottom, offsetLeft, offsetRight){
        if(offsetTop){
            this.offset.top = offsetTop;
        }
        if(offsetBottom){
            this.offset.bottom = offsetBottom;
        }
        if(offsetLeft){
            this.offset.left = offsetLeft;
        }
        if(offsetRight){
            this.offset.right = offsetRight;
        }
    }

    // constructor(imagePath){
    //     imagePath.forEach(i => {
    //         super().loadImage(i)
    //     });
    // }






    // setStartPlatform(){
    //     const firstStartPlatformTile = new Platforms('img/level_set/forest/Tiles/Ground_grass_0016_tile.png', x);
    //     const secondStartPlatformTile = new Platforms('img/level_set/forest/Tiles/Ground_grass_0020_tile.png', x);
    //     const thirdStartPlatformTile = new Platforms('img/level_set/forest/Tiles/Ground_grass_0022_tile.png', x);
    //     const platform = [firstStartPlatformTile, secondStartPlatformTile, thirdStartPlatformTile];
    //     platform.forEach(p => {
    //         let x = this.x  + 64;
    //     });
    //     }

    // setStartPlatform(){
    //     let x = this.x
    //     this.startPlatform.forEach(p => {
    //         p = x + 64;
    //     });
    // }

}