class DrawableObjects extends Sounds {
    world;
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


    /**
     * 
     * @param {string} path 
     * method to load one image from the path given as parameter
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * 
     * @param {Array} arr 
     * method to load all path from an array and set if for each images
     */
    loadImages(arr) {
        arr.forEach(path => {
            this.img = new Image();
            this.img.src = path;
            this.imageCache[path] = this.img;
        });
    }
}