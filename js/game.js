let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);  

    console.log('My character is', world.character);
}

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
    if (e.key == 'Space')  {
        keyboard.SPACE = true;
    }
    if (e.key == 'e')  {
        keyboard.E = true;
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
    if (e.key == 'Space')  {
        keyboard.SPACE = false;
    }
    if (e.key == 'e')  {
        keyboard.E = false;
    }
});