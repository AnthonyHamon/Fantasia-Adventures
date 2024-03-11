function returnGameMenuHTML(avatar) {
    return `
    <div id="gameMenu" class="start_menu">
        <div onclick="renderCharacterSelection()" id="character-selection-button">
            <img src="img/UI/menu/square_border_big_full.png" >
            <img id="current-character" src="${avatar}">
        </div>
        <div class="start_menu_content">
            <h2>Fantasia Adventures</h2>
            <div> 
                <img src="./img/UI/menu/characters.png" alt="">
            </div>
            <div class="button_ctn">
                <button onclick="renderWonScreen()">Options</button>
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
        <img onclick="renderGameMenu('${world.character.CHARACTERAVATAR}')" id="backward-button" src="./img/UI/menu/backward_button.png">
    </div>
    <section>
        <h2>Select Your Character</h2>
        <div id="characters" class="character_selection_ctn">
            <div id="character-button" class="character_selection gap_12">
                ${returnCharacterButton()}
            </div>
            <div id="character-info" class="character_info_ctn"></div>
        </div>
    <section/>
    `
}

function returnCharacterButton(){
    let html = '';
    world.allCharactersInformations.forEach(character => {
        html += `
        <div onclick="renderCharacterInformation('${character.name}', '${character.avatar}', '${character.characterPreview}')" class="character_thumbnail_img">
            <img class="character_selection_img_frame" src="img/UI/menu/char_sell.png">
            <img class="character-selection-avatar" src="${character.avatar}">
        </div>
        `
    });
    return html;
}

function returnCharacterInformation(name, avatar, characterPreview){
    return `
    <img src="img/UI/menu/char_bg.png">
        <div class="character_informations">
            <div>
                <div class="flex j_content_center padding_top_24">
                    <img class="b_radius_50" src="${avatar}">
                </div>

                <div class="flex column_center_x m_top_24">
                    <span id="selected-character-name">${name}</span>
                    <div class="character_preview_ctn">
                        <img class="character_preview" src="${characterPreview}">
                        <img class="character_shadow" src="img/UI/menu/shadow.png">
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
        <img onclick="renderGameMenu('${world.character.CHARACTERAVATAR}')" id="backward-button" src="./img/UI/menu/backward_button.png">
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
        <img src="./img/UI/level_selection/full_door_blocked.png">
    </div>    
    `
}

function returnFirstLevels() {
    return `
    <div class="level_ctn">
        <img src="./img/UI/level_selection/door.png">
    </div>
    `
}

function returnWonScreen(){
    return `
        <div class="game_finished_ctn won_bg">
            <div class="p-relative">
                <img src="img/UI/victory/knight+tape.png">
                <span class="p-absolute victory_text">Victory!</span>
            </div>
            <div class="flex gap_12">
                <img src="img/UI/victory/big_star_yellow.png">
                <img src="img/UI/victory/big_star_yellow.png">
                <img src="img/UI/victory/big_star.png">
            </div>
            <div class="p-relative">
                <img src="img/UI/defeat/begie_border2.png">
                <div class="level_statistics">
                    <div class="statistic_ctn">
                        <img src="img/UI/defeat/star_small.png">
                        <span>Score:</span>
                        <span>${world.character.enemyKillPoint}</span>
                    </div>
                    <div class="statistic_ctn">
                        <img src="img/UI/defeat/clock_yellow.png">
                        <span>Time:</span>
                        <span>5:08</span>
                    </div>
                    <div class="statistic_ctn">
                        <img src="img/UI/defeat/coin.png">
                        <span>Money:</span>
                        <span>${world.character.collectedCoins}</span>
                    </div>
                </div>
            </div>
            <div class="flex column_center_x">
                <div class="p-relative pointer">
                    <img src="img/UI/defeat/button_yellow.png">
                    <span onclick="renderGameMenu('${world.character.CHARACTERAVATAR}')" class="height_90_percent p-absolute flex j_content_center align_item_center">Continue</span>
                </div>
                <div class="p-relative pointer">
                    <img src="img/UI/defeat/button_yellow.png">
                    <span class="height_90_percent p-absolute flex j_content_center align_item_center">Restart</span>
                </div>
            </div>
        </div>
    `
}

function returnDefeatScreen(){
    return `
    <div class="game_finished_ctn defeat_bg">
        <div>
            <img src="img/UI/defeat/knight_loose.png">
        </div>
        <span id="defeat">Defeat...</span>
        <div class="p-relative">
            <img src="img/UI/defeat/begie_border2.png">
            <div class="level_statistics">
                <div class="statistic_ctn">
                    <img src="img/UI/defeat/star_small.png">
                    <span>Score:</span>
                        <span>${world.character.enemyKillPoint}</span>
                </div>
                <div class="statistic_ctn">
                    <img src="img/UI/defeat/clock_yellow.png">
                    <span>Time:</span>
                    <span>5:08</span>
                </div>
                <div class="statistic_ctn">
                    <img src="img/UI/defeat/coin.png">
                    <span>Money:</span>
                        <span>${world.character.collectedCoins}</span>
                </div>
            </div>
        </div>
        <div class="flex column_center_x">
            <div class="p-relative pointer">
                <img src="img/UI/defeat/button_yellow.png">
                <span onclick="renderGameMenu('${world.character.CHARACTERAVATAR}')" class="height_90_percent p-absolute flex j_content_center align_item_center">Continue</span>
            </div>
            <div class="p-relative pointer">
                <img src="img/UI/defeat/button.png">
                <span class="height_90_percent p-absolute flex j_content_center align_item_center">Restart</span>
            </div>
        </div>
    </div>
    `
}

function returnCredits() {

}