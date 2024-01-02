class movableObject {
    x = 0;
    y = 0;
    height = 128;
    width = 128;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;




    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}