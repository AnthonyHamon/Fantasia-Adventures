class DrawableObjects {
    x = 0;
    y = 360;
    width;
    height;
    img;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }


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
}