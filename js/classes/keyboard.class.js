class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    E = false;
    F = false;
    S = false;

    HUD_ARROW_IMAGE = document.getElementById('hud-arrow-image');


    constructor() {
        this.keyboardPressEvent();
        this.hudTouchEvent();
    }


    keyboardPressEvent() {
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
        });
    }

    hudTouchEvent() {
        this.characterMovementOverlayTouchEvent();

        document.getElementById('close-attack-HUD').addEventListener('touchstart', (event) => {
            this.F = true;
        }, {passive: true});
        document.getElementById('close-attack-HUD').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.F = false;
        });
        document.getElementById('magical-attack-HUD').addEventListener('touchstart', (event) => {
            this.E = true;
        }, {passive: true});
        document.getElementById('magical-attack-HUD').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.E = false;
        });
    }



    characterMovementOverlayTouchEvent() {

        const leftArrowArea = { x: 0, y: 35, width: 35, height: 35 };
        const rightArrowArea = { x: 70, y: 35, width: 35, height: 35 };
        const upArrowArea = { x: 35, y: 0, width: 35, height: 35 };
        const downArrowArea = { x: 35, y: 70, width: 35, height: 35 };


        this.HUD_ARROW_IMAGE.addEventListener('touchstart', (event) => {
            const rect = this.HUD_ARROW_IMAGE.getBoundingClientRect();
            const touchX = event.targetTouches[0].clientX - rect.left;
            const touchY = event.targetTouches[0].clientY - rect.top;

            if (this.isTouchInArea(touchX, touchY, leftArrowArea)) {
                this.LEFT = true;
            }
            else if (this.isTouchInArea(touchX, touchY, rightArrowArea)) {
                this.RIGHT = true;
            }

            if (this.isTouchInArea(touchX, touchY, upArrowArea)) {
                this.UP = true;
            }
            else if (this.isTouchInArea(touchX, touchY, downArrowArea)) {
                this.DOWN = true;
            }
        }, {passive: true});

        this.HUD_ARROW_IMAGE.addEventListener('touchmove', (event) => {
            const rect = this.HUD_ARROW_IMAGE.getBoundingClientRect();
            const touchX = event.targetTouches[0].clientX - rect.left;
            const touchY = event.targetTouches[0].clientY - rect.top;


            this.UP = false;
            this.DOWN = false;

            if (this.isTouchInArea(touchX, touchY, leftArrowArea)) {
                this.LEFT = true;
                this.RIGHT = false;
            }
            else if (this.isTouchInArea(touchX, touchY, rightArrowArea)) {
                this.RIGHT = true;
                this.LEFT = false;
            }

            if (this.isTouchInArea(touchX, touchY, upArrowArea)) {
                this.UP = true;
            }
            else if (this.isTouchInArea(touchX, touchY, downArrowArea)) {
                this.DOWN = true;
            }
        }, { passive: true });

        this.HUD_ARROW_IMAGE.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.LEFT = false;
            this.RIGHT = false;
            this.UP = false;
            this.DOWN = false;
        });
    }



    isTouchInArea(touchX, touchY, area) {
        return (touchX >= area.x && touchX <= (area.x + area.width) &&
            touchY >= area.y && touchY <= (area.y + area.height));
    }
}