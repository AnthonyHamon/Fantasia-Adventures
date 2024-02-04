class CharacterInformation extends DrawableObjects {

    constructor(ImagePath) {
        super();
        this.loadImage(ImagePath);
        this.y = 0;
        this.width = 215;
        this.height = 80;
    }
}