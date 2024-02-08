class ThrowableObjects extends movableObject {

    constructor(x, y) {
        super().loadImage('img/Items/Bottles/bottle1.png');
        this.width = 32;
        this.height = 32;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += 5
        }, 1000 / 60);
    }
}