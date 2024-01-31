class movableObject {
    x = 0;
    y = 0;
    height = 128;
    width = 128;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    FPS = 0;
    otherDirection = false;




    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            this.img = new Image();
            this.img.src = path;
            this.imageCache[path] = this.img;
        });
    }

    moveRight() {

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playWalkAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // animate() {
    //     setInterval(() => {
    //         let i = this.currentImage % this.imageCache.length;
    //         let path = this.imageCache[i];
    //         this.img = this.imageCache[path];
    //         this.currentImage++;
    //     }, this.FPS);
    // }

}