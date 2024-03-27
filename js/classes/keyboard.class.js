class Keyboard{
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    E = false;
    F = false;
    S = false;

    HUD_ARROW_IMAGE = document.getElementById('hud-arrow-image');


    constructor(){
        this.keyboardPressEvent();
    }


    keyboardPressEvent(){
        window.addEventListener('keydown', (e) => {
            if (e.key == 'd') {
                keyboard.RIGHT = true;
            }
            if (e.key == 'a') {
                keyboard.LEFT = true;
            }
            if (e.key == 'w') {
                keyboard.UP = true;
            }
            if (e.key == 's') {
                keyboard.DOWN = true;
            }
            if (e.key == 'Space') {
                keyboard.SPACE = true;
            }
            if (e.key == 'e') {
                keyboard.E = true;
            }
            if (e.key == 'f') {
                keyboard.F = true;
            }
            if (e.key == 's') {
                keyboard.S = true;
            }
        });
        
        
        window.addEventListener('keyup', (e) => {
            if (e.key == 'd') {
                keyboard.RIGHT = false;
            }
            if (e.key == 'a') {
                keyboard.LEFT = false;
            }
            if (e.key == 'w') {
                keyboard.UP = false;
            }
            if (e.key == 's') {
                keyboard.DOWN = false;
            }
            if (e.key == 'Space') {
                keyboard.SPACE = false;
            }
            if (e.key == 'e') {
                keyboard.E = false;
            }
            if (e.key == 'f') {
                keyboard.F = false;
            }
            if (e.key == 's') {
                keyboard.S = false;
            }
        });
    }



    hudTouchEvent(){

    }
}