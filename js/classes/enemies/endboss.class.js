class Endboss extends movableObject{
    IMAGESWAITINGBOSS = [
        'img/end_Bosses/Boss1/Idle1.png',
        'img/end_Bosses/Boss1/Idle2.png',
        'img/end_Bosses/Boss1/Idle3.png',
    ]

    IMAGESANGRYBOSS = [
        'img/end_Bosses/Boss1/Anger1.png',
        'img/end_Bosses/Boss1/Anger2.png',
        'img/end_Bosses/Boss1/Anger3.png',
        'img/end_Bosses/Boss1/Anger4.png',
        'img/end_Bosses/Boss1/Anger5.png',
    ]

    IMAGESWALKINGBOSS = [
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
    speed = 0;

        
    constructor(){
        // super().loadImage(this.IMAGESWALKINGBOSS[0]);
        super().loadImages(this.IMAGESANGRYBOSS);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playWalkAnimation(this.IMAGESANGRYBOSS);
        }, 180);

    }
}