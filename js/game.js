let canvas;
let world;
let currentCharacter;
let characterInformations;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
}

function renderGameMenu(avatar) {
    let defaultAvatar = "img/UI/character-icon/ninja.png";
    let gameMenu = document.getElementById('gameMenuCtn');
    if (currentCharacter) gameMenu.innerHTML = returnGameMenuHTML(avatar)
    else gameMenu.innerHTML = returnGameMenuHTML(defaultAvatar);
}

function renderCharacterSelection(){
    document.getElementById('gameMenu').innerHTML = returnCharacterSelection();
}

function renderCharacterInformation(avatar, name, preview){
    document.getElementById('character-info').innerHTML = returnCharacterInformation(avatar, name, preview);
}

function selectCharacter(type){
    // world = null;
    if(type === 'rogue') currentCharacter = new Rogue();
    if(type === 'knight') currentCharacter = new Knight();
    if(type === 'mage') currentCharacter = new Mage();
    world.setWorld(currentCharacter);
    renderGameMenu(currentCharacter.CHARACTERAVATAR);
    // world = new World(canvas, keyboard, currentCharacter);

}

function renderLevelSelection() {

    document.getElementById('gameMenu').innerHTML = returnLevelSelection();
    let levels = document.getElementById('levels');
    levels.innerHTML = '';
    for (let i = 0; i < world.levels.length; i++) {
        const level = world.levels[i];
        if(i === 0) levels.innerHTML += returnFirstLevels(level);
        // else levels.innerHTML += returnClosedLevels(level); // right one, second line must be deletet when finished
        levels.innerHTML += returnClosedLevels(level);
    }
}

function startGame(){
    let startMenu = document.getElementById('gameMenuCtn');
    startMenu.classList.toggle('d-none');
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