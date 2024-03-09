function returnGameMenuHTML(avatar) {
    return `
    <div id="gameMenu" class="start_menu">
        <div onclick="renderCharacterSelection()" id="character-selection-button">
            <img src="img/menu/square_border_big_full.png" >
            <img id="current-character" src="${avatar}">
        </div>
        <div class="start_menu_content">
            <h2>Fantasia Adventures</h2>
            <div> 
                <img src="./img/menu/characters.png" alt="">
            </div>
            <div class="button_ctn">
                <button>Options</button>
                <button onclick="startGame()">Start Game</button>
                <button onclick="renderLevelSelection()">Levels</button>
            </div> 
        </div>    
    </div>`;
}

function returnGameOptions() {

}

function returnCharacterSelection() {
    return `
    <div class="navbar">
        <img onclick="renderGameMenu()" id="backward-button" src="./img/menu/backward_button.png">
    </div>
    <section>
        <h2>Select Your Character</h2>
        <div id="characters" class="character_selection_ctn">
            <div class="character_selection">
                <div onclick="renderCharacterInformation('img/menu/con9-bg.png', 'rogue', 'img/character/Rogue/rogue.png')" class="character_thumbnail_img">
                    <img class="character_selection_img_frame" src="img/menu/char_sell.png">
                    <img class="character-selection-avatar" src="img/menu/con9.png">
                </div>
                <div onclick="renderCharacterInformation('img/menu/con8-bg.png', 'mage', 'img/character/Mage/mage.png')" class="character_thumbnail_img">
                    <img class="character_selection_img_frame" src="img/menu/char_sell.png">
                    <img class="character-selection-avatar" src="img/menu/con8.png">
                </div>
                <div onclick="renderCharacterInformation('img/menu/con7-bg.png', 'knight', 'img/character/Knight/knight.png')" class="character_thumbnail_img">
                    <img class="character_selection_img_frame" src="img/menu/char_sell.png">
                    <img class="character-selection-avatar" src="img/menu/con7.png">
                </div>
            </div>
            <div id="character-info" class="character_info_ctn"></div>
        </div>
    <section/>
    `
}

function returnCharacterInformation(avatar, name, preview){
    return `
    <img src="img/menu/char_bg.png">
        <div class="character_informations">
            <div>
                <div class="flex j_content_center padding_top_24">
                    <img class="b_radius_50" src="${avatar}">
                </div>

                <div class="flex column_center_x m_top_24">
                    <span id="selected-character-name">${name}</span>
                    <div class="character_preview_ctn">
                        <img class="character_preview" src="${preview}">
                        <img class="character_shadow" src="img/menu/shadow.png">
                    </div>    
                </div>
            </div>

            <button onclick="selectCharacter('${name}', '${avatar}')">Confirm</button>
        </div>
    `
}




function returnLevelSelection() {
    return `
    <div class="navbar">
        <img onclick="renderGameMenu()" id="backward-button" src="./img/menu/backward_button.png">
    </div>
    <section>
        <h2>Select Your Level</h2>
        <div id="levels" class="level_selection"></div>
    <section/>
    `
}

function returnClosedLevels() {
    return `
    <div>
        <img src="./img/menu/full_door_blocked.png">
    </div>    
    `
}

function returnFirstLevels() {
    return `
    <div class="level_ctn">
        <img src="./img/menu/door.png">
    </div>
    `
}

function returnCredits() {

}