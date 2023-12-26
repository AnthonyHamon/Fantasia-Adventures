class movableObject {
    x = 100;
    y = 410;
    img;
    height = 128;
    width = 128;


    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving Right');
    }

    moveLeft() {


    }
}