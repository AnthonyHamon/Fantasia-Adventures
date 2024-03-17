let canvas;
let world;
let characterInformations;
let keyboard = new Keyboard();
let currentCharacter;
let currentLevel;
let allIntervals = [];
let wantToStartGame = false;


let allCharactersInformations = [new RogueInformations(), new MageInformations(), new KnightInformations()];
let everyLevelsInformations = [new ForestLevelInformation()];


function init() {
    canvas = document.getElementById('canvas');
    renderGameMenu();
}

function renderGameMenu() {
    wantToStartGame = false;
    let defaultAvatar = "img/UI/character-icons/character-selection-img.png";
    let gameMenu = document.getElementById('gameMenuCtn');
    if (currentCharacter) gameMenu.innerHTML = returnGameMenuHTML(currentCharacter.avatar);
    else gameMenu.innerHTML = returnGameMenuHTML(defaultAvatar);
}

function renderCharacterSelection(){
    document.getElementById('gameMenu').innerHTML = returnCharacterSelection();
    let backToLevelSelectionButton = document.getElementById('back-to-level-selection-button');
    let rendeGameMenuButton = document.getElementById('backward-button');
    if(wantToStartGame)
    backToLevelSelectionButton.classList.toggle('d-none'),
    rendeGameMenuButton.classList.toggle('d-none');

}

function renderCharacterInformation(name, avatar, characterPreview, walkRightPreview, walkLeftPreview, climbPreview, jumpPreview, magicalAttackPreview, closeAttackPreview){
    let characterInformations = document.getElementById('character-info');
    characterInformations.innerHTML = returnCharacterInformation(name, avatar, characterPreview, walkRightPreview, walkLeftPreview, climbPreview, jumpPreview, magicalAttackPreview, closeAttackPreview);
    let characterselectionButton = document.getElementById('select-character-button');
    if(wantToStartGame) characterselectionButton.classList.toggle('d-none');
}


function selectCharacter(type){
    if(currentCharacter) world.resetWorld();
    if(type === 'Rogue') currentCharacter = new Rogue();
    if(type === 'Knight') currentCharacter = new Knight();
    if(type === 'Mage') currentCharacter = new Mage();
    world = new World(canvas, keyboard, currentCharacter, currentLevel);
    world.setWorld(currentCharacter);
    world.START = true;
    let startMenu = document.getElementById('gameMenuCtn');
    startMenu.classList.toggle('d-none');
    // world = new World(canvas, keyboard, currentCharacter);
}

function selectLevel(level){
    if(currentLevel) world.resetWorld();
    let selectedLevel = initLevel(level);
    currentLevel = selectedLevel;
    renderCharacterSelection();
}

function renderLevelSelection() {
    document.getElementById('gameMenu').innerHTML = returnLevelSelection();
    currentLevel = null;
}

function renderLevelInformation(levelName, levelBgImage, levelDescription, firstQuestName, firstQuestImage){
    let levelInformationCtn = document.getElementById('level-informations');
    levelInformationCtn.classList.toggle('d-none');
    let backwardButton = document.getElementById('backward-button');
    backwardButton.classList.toggle('d-none');
    levelInformationCtn.innerHTML = returnLevelInformations(levelName, levelBgImage, levelDescription, firstQuestName, firstQuestImage);
    let selectLevelButton = document.getElementById('select-level-btn');
    if(wantToStartGame) selectLevelButton.classList.toggle('d-none');
}

function closeLevelInformation(){
    let levelInformationCtn = document.getElementById('level-informations');
    let backwardButton = document.getElementById('backward-button');
    levelInformationCtn.classList.toggle('d-none');
    backwardButton.classList.toggle('d-none');
    
}

function startGame(){
    wantToStartGame = true;
    renderLevelSelection();
}

function returnToLevelMenu(){
    resetWorld();
    renderLevelSelection();
}

function resetWorld(){
    debugger
    allIntervals.forEach(interval => {
        clearInterval(interval);
    });
    currentLevel = null;
    currentCharacter = null;
    // window.cancelAnimationFrame(world.self);
    world.character.characterAvatar = null;
    world.character = null;
    world = null; 


    // world.worldReseted = true;
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