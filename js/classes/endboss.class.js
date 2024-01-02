class Endboss extends movableObject{
    IMAGESWALKING = [
        'img/end_Bosses/Boss1/Walk1.png',
        'img/end_Bosses/Boss1/Walk2.png',
        'img/end_Bosses/Boss1/Walk3.png',
        'img/end_Bosses/Boss1/Walk4.png',
        'img/end_Bosses/Boss1/Walk5.png',
        'img/end_Bosses/Boss1/Walk6.png',
    ]

    x = (960 * 3) - this.width - 200;
    height = 300;
    width = 250;
    y = 240;

        
    constructor(){
        super().loadImage(this.IMAGESWALKING[0]);
        this.loadImages(this.IMAGESWALKING);
        
    }
}