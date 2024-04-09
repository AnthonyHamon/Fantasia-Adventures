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

    /**
     * event listener which check when event (keydown) is fired and activate the key to allow other function being fired.
     */
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

        /**
         * event listener which check when event (keydown) is fired and desactivate the key (bounded function do not work anymore).
         */
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


    /**
     * event listener which check when event (touchstart and touchend) are fired and activate or desactivate the key. 
     * this event listener is for simple image which has onely one function
     */
    hudTouchEvent() {
        this.characterMovementOverlayTouchEvent();

        document.getElementById('close-attack-HUD').addEventListener('touchstart', (event) => {
            this.F = true;
        }, { passive: true });
        document.getElementById('close-attack-HUD').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.F = false;
        });
        document.getElementById('magical-attack-HUD').addEventListener('touchstart', (event) => {
            this.E = true;
        }, { passive: true });
        document.getElementById('magical-attack-HUD').addEventListener('touchend', (event) => {
            event.preventDefault();
            this.E = false;
        });
    }


    /**
     * event listener which check when event (touchstart, touchend and touchmove) are fired and activate or desactivate the key. 
     * this event listener is for complex image which has many function (moving in many direction)
     */
    characterMovementOverlayTouchEvent() {

        const leftArrowArea = { x: 0, y: 35, width: 35, height: 35 };
        const rightArrowArea = { x: 70, y: 35, width: 35, height: 35 };
        const upArrowArea = { x: 35, y: 0, width: 35, height: 35 };
        const downArrowArea = { x: 35, y: 70, width: 35, height: 35 };


        this.HUD_ARROW_IMAGE.addEventListener('touchstart', (event) => {
            const rect = this.HUD_ARROW_IMAGE.getBoundingClientRect();       // get coordinate of the image 
            const touchX = event.targetTouches[0].clientX - rect.left;       // get  X coordinate where player touch the screen 
            const touchY = event.targetTouches[0].clientY - rect.top;        // get  Y coordinate where player touch the screen

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
        }, { passive: true });


        /**
         * event listener to allow function being fired when finger is moved to another image coordinate
         */
        this.HUD_ARROW_IMAGE.addEventListener('touchmove', (event) => {
            const rect = this.HUD_ARROW_IMAGE.getBoundingClientRect();
            const touchX = event.targetTouches[0].clientX - rect.left;
            const touchY = event.targetTouches[0].clientY - rect.top;


            this.UP = false;
            this.DOWN = false;

            if (this.isTouchInArea(touchX, touchY, leftArrowArea)) { // check if area touch by player is same as given coordinate in image
                this.LEFT = true;
                this.RIGHT = false;
            }
            else if (this.isTouchInArea(touchX, touchY, rightArrowArea)) { // check if area touch by player is same as given coordinate in image
                this.RIGHT = true;
                this.LEFT = false;
            }

            if (this.isTouchInArea(touchX, touchY, upArrowArea)) { // check if area touch by player is same as given coordinate in image
                this.UP = true;
            }
            else if (this.isTouchInArea(touchX, touchY, downArrowArea)) { // check if area touch by player is same as given coordinate in image
                this.DOWN = true;
            }
        }, { passive: true });


        /**
         * event listener to reset key after player doesn't touch screen anymore
         */
        this.HUD_ARROW_IMAGE.addEventListener('touchend', (event) => {
            event.preventDefault();
            this.LEFT = false;
            this.RIGHT = false;
            this.UP = false;
            this.DOWN = false;
        });
    }


    /**
     * 
     * @param {number} touchX 
     * @param {number} touchY 
     * @param {number} area 
     * @returns true or false
     * 
     * this method check if coordinate from parameters are similar and return true or false
     */
    isTouchInArea(touchX, touchY, area) {
        return (touchX >= area.x && touchX <= (area.x + area.width) &&
            touchY >= area.y && touchY <= (area.y + area.height));
    }
}