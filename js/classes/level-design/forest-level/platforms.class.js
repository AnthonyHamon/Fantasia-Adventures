class Platforms extends DrawableObjects{
    
    y = 300;
    width = 64;
    height = 64;

    offset = {
        top: 10,
        right: 0,
        bottom: 18,
        left: 0
    }
    
    constructor(imagePath, x, y, offset){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        if(offset){
            this.offset.top = offset;
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