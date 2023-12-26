class Snake extends movableObject {
   
    constructor(){
        super().loadImage('img/enemies/Snake/Walk1.png');
        this.x = 200 + Math.random() * 500;
    };
}