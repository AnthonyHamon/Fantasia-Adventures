class Spider extends movableObject{

    IMAGESSPIDERWAITING = [
        'img/enemies/spider/idle1.png',
        'img/enemies/spider/idle2.png',
        'img/enemies/spider/idle3.png',
        'img/enemies/spider/idle4.png'
    ];


    x = 2384;
    y = 64;

    height = 128;
    width = 128;

    constructor(){
        super().loadImages(this.IMAGESSPIDERWAITING);
        this.animate();
    }

    animate() {
        // this.moveLeft();
        setInterval(() => {
            this.playWalkAnimation(this.IMAGESSPIDERWAITING)
        }, 180);

    }
}