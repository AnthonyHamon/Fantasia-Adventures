class Endboss extends movableObject {
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

    width = 250;
    height = 300;
    x = (960 * 3) - this.width;
    y = 278;
    speed = 0;
    inflictDamages = 0;
    receivedDamages = 0;

    
    offset = {
        top: 120,
        right: 118,
        bottom: 54,
        left: 64
    }

    constructor() {
        // super().loadImage(this.IMAGESWALKINGBOSS[0]);
        super().loadImages(this.IMAGESANGRYBOSS);
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.moveLeft();
                this.resetEnemyLifeBar();
                this.setEnemyLifeBar('boss'); 
        }, 1000 / 60);
    
        setInterval(() => {
            this.playAnimation(this.IMAGESANGRYBOSS);
        }, 180);

    }
}