class Platforms extends DrawableObjects {

    y = 300;
    width = 64;
    height = 64;

    offset = {
        top: 10,
        right: 0,
        bottom: 41,
        left: 0
    }

    constructor(imagePath, x, y, offsetTop, offsetBottom, offsetLeft, offsetRight) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.setSpecialOffsets(offsetTop, offsetBottom, offsetLeft, offsetRight);
    }


    /**
     * 
     * @param {number} offsetTop 
     * @param {number} offsetBottom 
     * @param {number} offsetLeft 
     * @param {number} offsetRight 
     * 
     * platforms are blocks, some of them haven't the same proportion, this function set 
     * the offset coordinate according to the given value.
     */
    setSpecialOffsets(offsetTop, offsetBottom, offsetLeft, offsetRight) {
        if (offsetTop) {
            this.offset.top = offsetTop;
        }
        if (offsetBottom) {
            this.offset.bottom = offsetBottom;
        }
        if (offsetLeft) {
            this.offset.left = offsetLeft;
        }
        if (offsetRight) {
            this.offset.right = offsetRight;
        }
    }

}