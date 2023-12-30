class movableObject {
    x = 0;
    y = 540 - 164;
    height = 128;
    width = 128;
    img;
    imageCache = {};
    currentImage = 0;




    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving Right');
    }

    moveLeft() {


    }

}