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
                <button onclick="">Options</button>
                <button onclick="gameStartLevelSelection()">Start Game</button>
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
            <img onclick="renderGameMenu()" id="backward-button" src="./img/UI/menu/backward_button.png" class="backward_button">
            <img onclick="renderLevelSelection()" id="back-to-level-selection-button" src="./img/UI/menu/backward_button.png" class="backward_button d-none">
        </div>
        <section class="content_ctn">
            <h2>Select a Character</h2>
            <div id="characters" class="character_selection_ctn">
                <div class="button_ctn align_item_center">
                    <div id="character-button" class="character_selection gap_12">
                        ${returnCharacterButton()}
                    </div>
                    <div style="width:50%" class="flex j_content_center align_item_center">
                        <div id="character-info" class="character_info_ctn"></div>
                    </div>    
                </div>
            </div>
        </section>
    `
}

function returnCharacterButton() {
    let html = '';
    allCharactersInformations.forEach(character => {
        html += `
        <div onclick="renderCharacterInformation('${character.name}', '${character.avatar}', '${character.characterPreview}', '${character.characterWalkRightPreview}', '${character.characterWalkLeftPreview}', '${character.characterClimbPreview}', '${character.characterJumpPreview}', '${character.magicalAttackPreview}', '${character.closeAttackPreview}')" class="character_thumbnail_img">
            <img class="character_selection_img_frame" src="img/UI/menu/char_sell.png">
            <img class="character-selection-avatar" src="${character.avatar}">
        </div>
        `
    });
    return html;
}


function returnCharacterInformation(name, avatar, characterPreview, walkRightPreview, walkLeftPreview, climbPreview, jumpPreview, magicalAttackPreview, closeAttackPreview) {
    return `
        <img src="img/UI/menu/char_bg.png">
            <div class="p-absolute">
                <div class="flex minus_margin_24">
                    <img class="b_radius_50" src="${avatar}">
                </div>
                <div class="flex column_center_x gap_12">
                    <span id="selected-character-name">${name}</span>
                    <div class="character_preview_ctn">
                        <div class="character_preview">
                            <img src="${characterPreview}">
                        </div>
                        <div class="character_shadow" >
                            <img src="img/UI/menu/shadow.png">
                        </div>
                    </div>  
                    <div class="flex column_center_x align_item_center gap_12">
                        <span>Keyboard</span>
                        <div class="keyboard_preview flex column_center_x gap_12">
                            <span>A & D = <img src="${walkLeftPreview}"> & <img src="${walkRightPreview}"></span>
                            <span>W = <img src="${jumpPreview}"></span>
                            <span>S = <img src="${climbPreview}"> (climb down)</span>
                            <span>E & F = <img src="${magicalAttackPreview}"> & <img src="${closeAttackPreview}"></span>
                        </div>
                    </div>  
                </div>
                <div id="select-character-button" onclick="selectCharacter('${name}')" class="select_level_btn d-none">
                    <img src="img/UI/fantasy-platformer-game-ui/PNG/08Quest/play_button.png">
                </div>
            </div>
    `
}

function returnLevelSelection() {
    let html = '';
    everyLevelsInformations.forEach(level => {
        html += `
        <div class="navbar">
            <img onclick="renderGameMenu()" id="backward-button" src="./img/UI/menu/backward_button.png" class="backward_button">
        </div>
        <section class="content_ctn">
            <h2>Select a Level</h2>
            <div id="levels" class="level_selection">
                <div onclick="renderLevelInformation('${level.name}', '${level.levelAvatar}', '${level.description}', '${level.firstQuestName}', '${level.firstQuestImage}')" style= "background: url('${level.backgroundImage}') bottom no-repeat;" class="level_ctn">
                    <div class="level">
                        ${returnDoorlevel(level)}
                        <span>${level.name}</span>
                    </div>
                </div>
            </div>
            <div id="level-informations" class="level_information p-absolute d-none"></div>
        </section>
        `
    });
    return html;
}

function returnDoorlevel(level) {
    if (level.open) {
        return '<img src="./img/UI/level_selection/door.png">'
    } else if (level.close) {
        return '<img src="./img/UI/level_selection/full_door_blocked.png">'
    }
}

function returnLevelInformations(levelName, levelImage, levelDescription, firstQuestName, firstQuestImage) {
    return `
    <div class="level_description_banner">
        <h3 class="p-absolute flex j_content_center align_item_center font_24">Level Description</h3>
        <img src="img/UI/fantasy-platformer-game-ui/PNG/08Quest/tape.png">
    </div>
    <section class="level_description_section">
        <div class="level_description_ctn">
            <div class="level_description">
                <div>
                    <div style="background-image: url('${levelImage}')" class="level_avatar_ctn">
                    </div>
                    <div class="flex column_center_x align_item_center gap_24 m_top_12">
                        <span class="font_24">Quests</span>
                        <span class="flex align_item_center gap_12"><img src="${firstQuestImage}"> ${firstQuestName}</span>
                        <span style="width:max-content">Defeat the enemies</span>
                    </div>
                </div>
                <div class="flex column_center_x align_item_center padding_top_24">
                    <span class="font_24">${levelName}</span>
                    <p>${levelDescription}</p>
                </div> 
            </div>
            <div id="select-level-btn" onclick="selectLevel('${levelName}')" class="select_level_btn d-none">
                <img src="img/UI/fantasy-platformer-game-ui/PNG/08Quest/play_button.png">
            </div>
                <div onclick="closeLevelInformation()" class="close_button">
                    <img src="img/UI/fantasy-platformer-game-ui/PNG/06Level_select/x_button.png">
                </div>    
            </div>
    </section>
    `
}


function returnWonScreen() {
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
                        <span>${world.calcLevelDuration()}</span>
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
                    <span onclick="returnToLevelMenuAfterEndgame()" class="height_90_percent p-absolute flex j_content_center align_item_center">Continue</span>
                </div>
                <div class="p-relative pointer">
                    <img src="img/UI/defeat/button_yellow.png">
                    <span onclick="restartGame('${selectedLevel.levelName}', '${currentCharacter.characterName}')" class="height_90_percent p-absolute flex j_content_center align_item_center">Restart</span>
                </div>
            </div>
        </div>
    `
}

function returnDefeatScreen() {
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
                    <span>${world.calcLevelDuration()}</span>
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
                <span onclick="returnToLevelMenuAfterEndgame()" class="height_90_percent p-absolute flex j_content_center align_item_center">Continue</span>
            </div>
            <div class="p-relative pointer">
                <img src="img/UI/defeat/button.png">
                <span onclick="restartGame('${selectedLevel.levelName}', '${currentCharacter.characterName}')" class="height_90_percent p-absolute flex j_content_center align_item_center">Restart</span>
            </div>
        </div>
    </div>
    `
}

function returnCredits() {

}