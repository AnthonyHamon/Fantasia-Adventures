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


    constructor(){
        super().loadImage(this.IMAGESWAITINGBEAR[0]);
        this.loadImages(this.IMAGESWAITINGBEAR);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGESWAITINGBEAR.length;
            let path = this.IMAGESWAITINGBEAR[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);

    }
}