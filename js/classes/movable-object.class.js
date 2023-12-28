class movableObject {
    x = 0;
    y = 540 - 164;
    height = 128;
    width = 128;
    img;
    ImageCache = {};



    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = path;
        });
    }

    movableObjectAnimation() {
        this.x = setInterval(() => {
            this.x -= 0.15;
        }, 1000 / 60);
    }

    moveRight() {
        console.log('Moving Right');
    }

    moveLeft() {


    }

}