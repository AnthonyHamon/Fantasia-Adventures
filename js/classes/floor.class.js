class Floor extends movableObject {
    height = 64;
    width = 64;

    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 540 - this.height;
    }

    // calcFloorPosition(){
    //     let x = 0;
    //         this.floorTiles.forEach((floor)=>{
    //             x = floor.x + 64;
    //             return x;
    //     });
       
    // }
}