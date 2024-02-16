class Bear extends movableObject{

    IMAGESWAITINGBEAR = [
        'img/enemies/Bear/Walk1.png',
        'img/enemies/Bear/Walk2.png',
        'img/enemies/Bear/Walk3.png',
        'img/enemies/Bear/Walk4.png',
        'img/enemies/Bear/Walk5.png'
    ]

    x = 1972;
    y = 120;
    width = 128;
    height = 128;
    speed = 0;

    offset = {
        top: 64,
        right: 28,
        bottom: 20,
        left: 8
    }


    constructor(){
        super().loadImage(this.IMAGESWAITINGBEAR[0]);
        this.loadImages(this.IMAGESWAITINGBEAR);
        this.animate();
    }

    animate() {
        
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGESWAITINGBEAR);
        }, 180);

    }
}