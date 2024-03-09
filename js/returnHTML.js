function returnGameMenuHTML() {
    return `
    <div id="gameMenu" class="start_menu">
        <div onclick="renderCharacterSelection()" id="character-selection-button">
            <img src="img/menu/square_border_big_full.png" >
            <img id="current-character" src="img/UI/character-icon/ninja.png">
        </div>
        <div class="start_menu_content">
            <h2>Fantasia Adventures</h2>
            <div> 
                <img src="./img/menu/characters.png" alt="">
            </div>
            <div class="button_ctn">
                <button>Options</button>
                <button>Start Game</button>
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
                <div class="character_thumbnail_img">
                    <img class="character_selection_img_frame" src="img/menu/char_sell.png">
                    <img class="character-selection-avatar" src="img/menu/con9.png">
                </div>
                <div class="character_thumbnail_img">
                    <img class="character_selection_img_frame" src="img/menu/char_sell.png">
                    <img class="character-selection-avatar" src="img/menu/con8.png">
                </div>
                <div class="character_thumbnail_img">
                    <img class="character_selection_img_frame" src="img/menu/char_sell.png">
                    <img class="character-selection-avatar" src="img/menu/con7.png">
                </div>
            </div>
            <div class="character_info_ctn">
                <img src="img/menu/char_bg.png">
                <div class="character_informations">
                    <div>
                        <div class="flex j_content_center padding_top_24">
                            <img class="b_radius_50" src="img/menu/con9-bg.png">
                        </div>

                        <div class="flex column_center_x m_top_24">
                            <span id="selected-character-name">Rogue</span>
                            <div class="character_preview_ctn">
                                <img class="character_preview" src="img/character/Rogue/rogue.png">
                                <img class="character_shadow" src="img/menu/shadow.png">
                            </div>    
                        </div>
                    </div>

                    <button>Confirm</button>
                </div>
            </div>
        </div>
    <section/>
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