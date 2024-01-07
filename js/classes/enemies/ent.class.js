class Ent extends movableObject{

    IMAGESWAITINGENT = [
        'img/enemies/ent/idle1.png',
        'img/enemies/ent/idle2.png',
        'img/enemies/ent/idle3.png',
        'img/enemies/ent/idle4.png'
    ];

    x = 1500
    ;
    y = 308;
    width = 256;
    height = 256;


    constructor(){
        super().loadImages(this.IMAGESWAITINGENT);
        this.animate();
    }

    animate() {
        // this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGESWAITINGENT.length;
            let path = this.IMAGESWAITINGENT[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);

    }
}