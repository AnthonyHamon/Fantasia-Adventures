class LifeBar extends DrawableObjects {
    LIFE_BAR_IMAGES = [];

    width = 5;
    height = 12;
    percentage = 25;
    

    constructor(imagePath, x) {
        // super();
        super().loadImage(imagePath);
        this.x = x;
        this.y = 8;
        // this.width = width;
        // this.setLifeBar();
        // this.loadImages(this.LIFE_BAR_IMAGES);
    }


    setPercentage(percentage){
        this.percentage = percentage;
    }


    // resolveImageIndex(){
    //     for (let index = this.percentage; index > this.percentage; index--) {
                
    //         }
    //     }
    // }

    // setLifeBar(percentage){
    //     if(percentage > 0) {
    //         this.LIFE_BAR_IMAGES[0] = 'img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_corner1.png';
    //     }
    //     for (let index = 1; index < percentage; index++){
    //         this.LIFE_BAR_IMAGES.splice(index, 0, 'img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_point.png');
    //     }
    //     if(percentage = 100){
    //         this.LIFE_BAR_IMAGES[100] = 'img/UI/fantasy-platformer-game-ui/PNG/16Inner_Interface/hp_corner2.png';
    //     }
    // }

    updateLifeBar(){
        this.percentage -= 1;
        // this.setLifeBar(this.percentage);   
        console.log('percentage of life is:', this.percentage)
    }
}

