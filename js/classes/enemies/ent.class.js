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
    speed = 0;


    constructor(){
        super().loadImages(this.IMAGESWAITINGENT);
        this.animate();
    }

    animate() {
        
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGESWAITINGENT);
        }, 180);

    }
}