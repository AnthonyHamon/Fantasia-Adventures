let canvas;
let world;
let characterInformations;
let keyboard = new Keyboard();
let currentCharacter;
let selectedLevel;
let currentLevel = false;
let allIntervals = [];
let wantToStartGame = false;
let backgroundMusicStarted = false;
let backgroundMusic = new Audio(src = 'audio/background_music.mp3', autoplay = true, muted = true);
let allSoundArrays = [];
let musicVolume = 0.1;


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
    gameMenu.innerHTML = returnGameMenuHTML(defaultAvatar);
}

function renderCharacterSelection(event) {
    stopPropagation(event);
    document.getElementById('gameMenu').innerHTML = returnCharacterSelection();
    let backToLevelSelectionButton = document.getElementById('back-to-level-selection-button');
    let rendeGameMenuButton = document.getElementById('backward-button');
    if (wantToStartGame)
        backToLevelSelectionButton.classList.toggle('d-none'),
            rendeGameMenuButton.classList.toggle('d-none');

}

function renderCharacterInformation(name, avatar, characterPreview, walkRightPreview, walkLeftPreview, climbPreview, jumpPreview, magicalAttackPreview, closeAttackPreview) {
    let characterInformations = document.getElementById('character-info');
    characterInformations.innerHTML = returnCharacterInformation(name, avatar, characterPreview, walkRightPreview, walkLeftPreview, climbPreview, jumpPreview, magicalAttackPreview, closeAttackPreview);
    let characterselectionButton = document.getElementById('select-character-button');
    if (wantToStartGame) characterselectionButton.classList.toggle('d-none');
}


function selectCharacter(type) {
    if (type === 'Rogue') currentCharacter = new Rogue();
    if (type === 'Knight') currentCharacter = new Knight();
    if (type === 'Mage') currentCharacter = new Mage();
    startGame();
}

function selectLevel(level, event) {
    selectedLevel = initLevel(level);
    if (!currentLevel) renderCharacterSelection(event);
}

function renderLevelSelection(event) {
    stopPropagation(event);
    document.getElementById('gameMenu').innerHTML = returnLevelSelection();
    selectedLevel = null;
    currentCharacter = null;
}

function renderLevelInformation(levelName, levelBgImage, levelDescription, firstQuestName, firstQuestImage) {
    let levelInformationCtn = document.getElementById('level-informations');
    levelInformationCtn.classList.toggle('d-none');
    let backwardButton = document.getElementById('backward-button');
    backwardButton.classList.toggle('d-none');
    levelInformationCtn.innerHTML = returnLevelInformations(levelName, levelBgImage, levelDescription, firstQuestName, firstQuestImage);
    let selectLevelButton = document.getElementById('select-level-btn');
    if (wantToStartGame) selectLevelButton.classList.toggle('d-none');
}

function closeLevelInformation() {
    let levelInformationCtn = document.getElementById('level-informations');
    let backwardButton = document.getElementById('backward-button');
    levelInformationCtn.classList.toggle('d-none');
    backwardButton.classList.toggle('d-none');

}

function startGame() {
    currentLevel = true;
    world = new World(canvas, keyboard, currentCharacter, selectedLevel);
    world.setWorld(currentCharacter);
    world.START = true;
    let startMenu = document.getElementById('gameMenuCtn');
    startMenu.classList.toggle('d-none');
}

function gameStartLevelSelection(event) {
    stopPropagation(event);
    wantToStartGame = true;
    renderLevelSelection(event);
}

function restartGame(curentLevelName, currentCharacterName) {
    resetWorld();
    selectLevel(curentLevelName);
    selectCharacter(currentCharacterName)
}

function returnToLevelMenuAfterEndgame(event) {
    currentLevel = false;
    resetWorld();
    renderLevelSelection(event);
}

function clearAllInterval() {
    allIntervals.forEach(interval => {
        clearInterval(interval);
    });
}

function resetWorld() {
    clearAllInterval();
    selectedLevel = null;
    currentCharacter = null;
    world = null;
}

window.addEventListener("click", () => {
    if (!backgroundMusicStarted)
    initBackgroundMusic()
    backgroundMusicStarted = true;
})

function initBackgroundMusic() {
    backgroundMusic.muted = false;
    backgroundMusic.play();
    backgroundMusic.volume = musicVolume;
    backgroundMusic.loop = true;
}

function toggleMusicSound() {
    let musicON = document.getElementById('music-on');
    let musicOFF = document.getElementById('music-off');
    if (musicON.classList.contains('d-none'))
        musicON.classList.toggle('d-none'),
            musicOFF.classList.toggle('d-none'),
            initBackgroundMusic();
    else if (musicOFF.classList.contains('d-none'))
        musicON.classList.toggle('d-none'),
            musicOFF.classList.toggle('d-none'),
            muteBackgroundMusic()
}

function muteBackgroundMusic() {
    backgroundMusic.muted = true;
    backgroundMusic.pause();
}

function toggleOptionsMenu(event){
    stopPropagation(event);
    let optionMenu = document.getElementById('options-menu');
    optionMenu.classList.toggle('d-none');
}

function closeOptionMenu(){
    let optionMenu = document.getElementById('options-menu');
    optionMenu.classList.add('d-none');
}

function stopPropagation(event){
    event.stopPropagation();
}


// window.addEventListener('keydown', (e) => {
//     if (e.key == 'd') {
//         keyboard.RIGHT = true;
//     }
//     if (e.key == 'a') {
//         keyboard.LEFT = true;
//     }
//     if (e.key == 'w') {
//         keyboard.UP = true;
//     }
//     if (e.key == 's') {
//         keyboard.DOWN = true;
//     }
//     if (e.key == 'Space') {
//         keyboard.SPACE = true;
//     }
//     if (e.key == 'e') {
//         keyboard.E = true;
//     }
//     if (e.key == 'f') {
//         keyboard.F = true;
//     }
//     if (e.key == 's') {
//         keyboard.S = true;
//     }
// });


// window.addEventListener('keyup', (e) => {
//     if (e.key == 'd') {
//         keyboard.RIGHT = false;
//     }
//     if (e.key == 'a') {
//         keyboard.LEFT = false;
//     }
//     if (e.key == 'w') {
//         keyboard.UP = false;
//     }
//     if (e.key == 's') {
//         keyboard.DOWN = false;
//     }
//     if (e.key == 'Space') {
//         keyboard.SPACE = false;
//     }
//     if (e.key == 'e') {
//         keyboard.E = false;
//     }
//     if (e.key == 'f') {
//         keyboard.F = false;
//     }
//     if (e.key == 's') {
//         keyboard.S = false;
//     }
// });