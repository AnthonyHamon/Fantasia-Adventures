class Bottles extends movableObject{
     IMAGES_BOTTLES = [
        'img/Items/Bottles/bottle1.png',
        'img/Items/Bottles/bottle2.png',
        'img/Items/Bottles/bottle3.png',
        'img/Items/Bottles/bottle4.png',
        'img/Items/Bottles/bottle5.png',
        'img/Items/Bottles/bottle6.png',
        'img/Items/Bottles/bottle7.png',
        'img/Items/Bottles/bottle8.png',
        'img/Items/Bottles/bottle9.png',
        'img/Items/Bottles/bottle10.png'
     ]

     width = 32;
     height = 32;
     x = 250;
     y = 350;

    constructor(){
        super().loadImages(this.IMAGES_BOTTLES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_BOTTLES.length;
            let path = this.IMAGES_BOTTLES[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 180);
    }
}