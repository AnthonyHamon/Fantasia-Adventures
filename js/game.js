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


let allCharactersInformations = [new RogueInformations(), new MageInformations(), new KnightInformations()]; // set variable with character informations objects for character selection menu
let everyLevelsInformations = [new ForestLevelInformation()]; // set variable with level information objects for level selection menu


/**
 * onload function to render game menu
 */
function init() {
    canvas = document.getElementById('canvas');
    renderGameMenu();
}


/**
 * function to render game menu
 */
function renderGameMenu() {
    wantToStartGame = false;                    // if want to start gane true, button for level and character selection going be shown
    let defaultAvatar = "img/UI/character-icons/character-selection-img.png";
    let gameMenu = document.getElementById('gameMenuCtn');
    gameMenu.innerHTML = returnGameMenuHTML(defaultAvatar); // return HTML for game menu
}

/**
 * 
 * @param {event} event 
 * function to render character menu and toggle backward button with diferent function (return to level selection or render game menu)
 */
function renderCharacterSelection(event) {
    stopPropagation(event);                 // prevent possible other function in background to be fired.
    document.getElementById('gameMenu').innerHTML = returnCharacterSelection();
    let backToLevelSelectionButton = document.getElementById('back-to-level-selection-button');
    let renderGameMenuButton = document.getElementById('backward-button');              
    if (wantToStartGame)
        backToLevelSelectionButton.classList.toggle('d-none'), // show / hide button to return to level selection
            renderGameMenuButton.classList.toggle('d-none');   // show / hide button to render game menu

}
 /**
  * 
  * @param {string} name 
  * @param {string} avatar 
  * @param {string} characterPreview 
  * @param {string} walkRightPreview 
  * @param {string} walkLeftPreview 
  * @param {string} climbPreview 
  * @param {string} jumpPreview 
  * @param {string} magicalAttackPreview 
  * @param {string} closeAttackPreview 
  * 
  * function to render informations of selected character and
  * toggle button for starting game if player is on character selection menu
  */
function renderCharacterInformation(name, avatar, characterPreview, walkRightPreview, walkLeftPreview, climbPreview, jumpPreview, magicalAttackPreview, closeAttackPreview) {
    let characterInformations = document.getElementById('character-info');
    characterInformations.innerHTML = returnCharacterInformation(name, avatar, characterPreview, walkRightPreview, walkLeftPreview, climbPreview, jumpPreview, magicalAttackPreview, closeAttackPreview);
    let characterselectionButton = document.getElementById('select-character-button');
    if (wantToStartGame) characterselectionButton.classList.toggle('d-none'); // show / hide button to to start game
}

/**
 * 
 * @param {string} type 
 * add character to level according to parameter
 */
function selectCharacter(type) {
    if (type === 'Rogue') currentCharacter = new Rogue();       // set Rogue as character
    if (type === 'Knight') currentCharacter = new Knight();     // set Knight as character
    if (type === 'Mage') currentCharacter = new Mage();         // set Mage as character
    startGame();
}

/**
 * 
 * @param {object} level 
 * @param {event} event 
 * 
 * function to select level to play according to parameter
 */
function selectLevel(level, event) {
    selectedLevel = initLevel(level);       // set variable with infomarmation of selected level Object
    if (!currentLevel) renderCharacterSelection(event); // only if no current level is present, redirect to character selection menu
}

/**
 * 
 * @param {event} event 
 * function to render level selection menu
 */
function renderLevelSelection(event) {
    stopPropagation(event);
    document.getElementById('gameMenu').innerHTML = returnLevelSelection(); // return HTML for level selection menu
    selectedLevel = null;           // delete possible previous selected level
    currentCharacter = null;        // delete possible previous selected character
}

/**
 * 
 * @param {string} levelName 
 * @param {string} levelBgImage 
 * @param {string} levelDescription 
 * @param {string} firstQuestName 
 * @param {string} firstQuestImage 
 * function to render informations of selected level and
 * toggle button for redirection to character selection menu if player is on level selection menu
 */
function renderLevelInformation(levelName, levelBgImage, levelDescription, firstQuestName, firstQuestImage) {
    let levelInformationCtn = document.getElementById('level-informations');
    levelInformationCtn.classList.toggle('d-none');
    let backwardButton = document.getElementById('backward-button');
    backwardButton.classList.toggle('d-none');
    levelInformationCtn.innerHTML = returnLevelInformations(levelName, levelBgImage, levelDescription, firstQuestName, firstQuestImage);
    let selectLevelButton = document.getElementById('select-level-btn');
    if (wantToStartGame) selectLevelButton.classList.toggle('d-none');
}

/**
 * function to hide level information window
 */
function closeLevelInformation() {
    let levelInformationCtn = document.getElementById('level-informations');
    let backwardButton = document.getElementById('backward-button');
    levelInformationCtn.classList.toggle('d-none');
    backwardButton.classList.toggle('d-none');

}


/**
 * function for starting the game by setting a new world with informaton given as parameter from
 * level and character selection menu
 */
function startGame() {
    currentLevel = true;            // a level has been started
    world = new World(canvas, keyboard, currentCharacter, selectedLevel);   // a new world is being drawn with information given as parameter
    world.START = true;             // variable set true to let character danse at the beginning
    let startMenu = document.getElementById('gameMenuCtn');
    startMenu.classList.toggle('d-none');  // hide game menu
}


/**
 * 
 * @param {event} event 
 * redirect to level selection before starting game
 */
function gameStartLevelSelection(event) {
    stopPropagation(event);
    wantToStartGame = true;
    renderLevelSelection(event);  // render all possible level to play
}


/**
 * 
 * @param {string} curentLevelName 
 * @param {string} currentCharacterName 
 * 
 * function to restart same level with same character (as defined as parameter)
 */
function restartGame(curentLevelName, currentCharacterName) {
    resetWorld();                   // delete previous world, with all intervals
    selectLevel(curentLevelName);   // select level according to parameter (same as just finished level)
    selectCharacter(currentCharacterName); // select character according to parameter (same as just played character)
    backgroundMusic.play();             // restart background music if not paused in game menu
}

/**
 * 
 * @param {event} event 
 * function to redirect to level menu after game finished
 */
function returnToLevelMenuAfterEndgame(event) {
    currentLevel = false;  // no curren level available
    resetWorld();          // delete previous world, with all intervals
    renderLevelSelection(event);  // render all possible level to play
    backgroundMusic.play();     // restart background music if not paused in game menu
}


/**
 * clear all interval array in order to stop / restart the game
 */
function clearAllInterval() {
    allIntervals.forEach(interval => {  // going through allIntervals array and clear everything
        clearInterval(interval);
    });
}


/**
 * fire clear interval function and set all world relevant variable to null
 */
function resetWorld() {
    clearAllInterval();
    selectedLevel = null;       // no level selected
    currentCharacter = null;    // no character selected
    world = null;               // no world available
}


/**
 * add event listener to start background music as soon as player interact with interface
 */
window.addEventListener("click", () => {
    if (!backgroundMusicStarted)
        initBackgroundMusic()
    backgroundMusicStarted = true;
})

/**
 * set background music parameters
 */
function initBackgroundMusic() {
    backgroundMusic.muted = false;
    backgroundMusic.play();
    backgroundMusic.volume = musicVolume;
    backgroundMusic.loop = true;
}

/**
 * function to mute / unmute background music
 */
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


/**
 * fucntion to mute background music
 */
function muteBackgroundMusic() {
    backgroundMusic.muted = true;
    backgroundMusic.pause();
}


/**
 * 
 * @param {event} event 
 * function to toggle mute / unmute music button
 */
function toggleOptionsMenu(event) {
    stopPropagation(event);
    let optionMenu = document.getElementById('options-menu');
    optionMenu.classList.toggle('d-none');
}

/**
 * function to close option menu by clicking outside menu
 */
function closeOptionMenu() {
    let optionMenu = document.getElementById('options-menu');
    optionMenu.classList.add('d-none');
}


/**
 * 
 * @param {event} event 
 * function / event which prevent propagation of function to another DOM element
 */
function stopPropagation(event) {
    event.stopPropagation();
}


/**
 * 
 * @param {Element} element 
 * function to switch to full screen modus if supported
 */
function getFullScreen(element) {
    // Check if the browser supports requesting fullscreen mode and call the appropriate method.
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
    }
}

/**
 * fucntion to close full screen mode
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
}

/**
 * function to switch between full screen and default screen
 * and change full screen icon according to current mode
 */
function toggleFullScreenModus(){
    let element = document.documentElement;
    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement) {
        getFullScreen(element);
    }else{
        exitFullscreen();
    }
    toggleFullScreenIcon();
}


/**
 * function to switch between fullscreen icon according to screen mode
 */
function toggleFullScreenIcon(){
    let fullScreenOn = document.getElementById('full-screen-on');
    let fullScreenOff = document.getElementById('full-screen-off');
    fullScreenOn.classList.toggle('d-none'),
    fullScreenOff.classList.toggle('d-none')
}


/**
 * 
 * @param {string} contentName 
 * @param {string} functionName 
 * 
 * function to render legal content according to parameter
 * content is being render in game menu if resolution (width) is over 1024 px, else
 * legal content is being opened in another tab
 */
function showLegalContent(contentName, functionName){
    if(window.innerWidth >= 1024){
        renderLegalContent(contentName, functionName)
    }else{
        redirectTo(functionName);
    }
}

/**
 * 
 * @param {string} contentName 
 * @param {string} functionName
 * 
 * function to render legal content in game menu 
 */
function renderLegalContent(contentName, functionName){
    document.getElementById('gameMenu').innerHTML = returnLegalContent(contentName, functionName);
}


/**
 * 
 * @param {string} functionName 
 * 
 * function to open legal content in another tab
 */
function redirectTo(functionName){
    window.open(`${functionName['name']}.html`, '_blank');
}