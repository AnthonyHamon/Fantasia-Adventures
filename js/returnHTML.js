function returnGameMenuHTML(avatar) {
    return `
    <div id="gameMenu" class="start_menu">
        <main id="game-menu-main-ctn" onclick="closeOptionMenu()" class="flex column_center_x j_content_center align_item_center">
            <div onclick="renderCharacterSelection(event)" id="character-selection-button">
                <img src="img/UI/menu/square_border_big_full.png" >
                <img id="current-character" src="${avatar}">
            </div>
            <div class="start_menu_content">
                <h2>Fantasia Adventures</h2>
                <div> 
                    <img src="./img/UI/menu/characters.png" alt="">
                </div>
                <div class="button_ctn">
                    <div class="mobile_nav_bar p-relative">
                        <div class="p-absolute flex column_center_x align_item_center">
                            <div onclick="stopPropagation(event)" id="options-menu" class="option_menu d-none">
                                <div class="flex column_center_x align_item_center">
                                    <span id="music-on" onclick="toggleMusicSound()">Music ON</span>
                                    <span id="music-off" onclick="toggleMusicSound()" class="d-none">Music OFF</span>
                                </div>
                                <span onclick="showLegalContent('Credits', returnCredits)">Credits</span>
                                <span onclick="showLegalContent('Legal Notice', returnLegalNotice)">Legal Notice</span>
                                <span onclick="showLegalContent('Privacy Policy', returnPrivacyPolicy)">Privacy policy</span>
                            </div>
                        </div>
                        <button id="option-menu-button" onclick="toggleOptionsMenu(event)">Options</button>
                    </div>    
                    <button onclick="gameStartLevelSelection(event)">Start Game</button>
                    <button onclick="renderLevelSelection(event)">Levels</button>
                </div> 
            </div>    
        </main>
    </div>`;
}


function returnCharacterSelection() {
    return `
        <div class="navbar">
            <img onclick="renderGameMenu()" id="backward-button" src="./img/UI/menu/backward_button.png" class="backward_button">
            <img onclick="renderLevelSelection(event)" id="back-to-level-selection-button" src="./img/UI/menu/backward_button.png" class="backward_button d-none">
        </div>
        <section class="content_ctn">
            <h2 id="character-selection-titel">Select a Character</h2>
            <div id="characters" class="character_selection_ctn">
                <div class="button_ctn align_item_center">
                    <div id="character-button" class="character_selection gap_12">
                        ${returnCharacterButton()}
                    </div>
                    <div id="character-info-ctn" class="flex j_content_center align_item_center">
                        <div id="character-info"></div>
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
            <div class="character_info_ctn"">
                <div class="minus_margin_24">
                    <img id="character-info-avatar-img" class="b_radius_50" src="${avatar}">
                </div>
                <div class="character_informations">
                    <div class="mobile_character_preview_avatar">
                        <span id="selected-character-name">${name}</span>
                        <div class="character_preview_avatar_ctn">
                            <div class="character_preview">
                                <img src="${characterPreview}">
                            </div>
                            <div class="character_shadow" >
                                <img src="img/UI/menu/shadow.png">
                            </div>
                        </div>  
                    </div>
                    <div class="mobile_character_info_ctn flex column_center_x align_item_center gap_12">
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
                    <img src="img/UI/menu/play_button.png">
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
                        <div class="flex column align_item_center">
                            ${returnDoorlevel(level)}
                            <span>${level.name}</span>
                        </div>
                        <div class="flex">
                            ${returnZeroStarVictory(level.levelScore)}
                            ${returnOneStarVictory(level.levelScore)}
                            ${returnTwoStarVictory(level.levelScore)}
                            ${returnThreeStarVictory(level.levelScore)}
                        </div>
                    </div>
                </div>
            </div>
            <div id="level-informations" class="information_content_ctn_background p-absolute d-none"></div>
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
    <div class="description_banner">
        <h3 class="p-absolute flex j_content_center align_item_center font_24">Level Description</h3>
        <img src="img/UI/menu/tape.png">
    </div>
    <section class="flex j_content_center width_height_100">
        <div class="content_description_ctn">
            <div class="level_description">
                <div class="mobile_quest_section">
                    <div style="background-image: url('${levelImage}')" class="level_avatar_ctn">
                    </div>
                    <div class="mobile_quest_ctn flex column_center_x align_item_center gap_24 m_top_12">
                        <span class="font_24">Quests</span>
                        <span class="flex align_item_center gap_12"><img src="${firstQuestImage}"> ${firstQuestName}</span>
                        <span style="width:max-content">Defeat the enemies</span>
                    </div>
                </div>
                <div class="mobile_quest_description flex column_center_x align_item_center">
                    <span class="font_24">${levelName}</span>
                    <p>${levelDescription}</p>
                </div> 
            </div>
            <div id="select-level-btn" onclick="selectLevel('${levelName}', event)" class="select_level_btn d-none">
                <img src="img/UI/menu/play_button.png">
            </div>   
        </div>
        <div onclick="closeLevelInformation()" class="close_button">
            <img src="img/UI/menu/x_button.png">
        </div> 
    </section>
    `
}


function returnWonScreen(starsScore) {
    return `
        <div class="game_finished_ctn won_bg">
            <div class="p-relative">
                <img id="victory-image" src="img/UI/victory/knight+tape.png">
                <span class="p-absolute victory_text">Victory!</span>
            </div>
            <div class="endscreen_result flex column_center_x align_item_center gap_12">
                <div id="star_score" class="flex gap_12">
                    ${returnZeroStarVictory(starsScore)}
                    ${returnOneStarVictory(starsScore)}
                    ${returnTwoStarVictory(starsScore)}
                    ${returnThreeStarVictory(starsScore)}
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
                            <span>${world.levelDurationEndTime}</span>
                        </div>
                        <div class="statistic_ctn">
                            <img src="img/UI/defeat/coin.png">
                            <span>Money:</span>
                            <span>${world.character.collectedCoins}</span>
                        </div>
                    </div>
                </div>
                <div class="endScreen_button_ctn">
                    <div class="p-relative pointer">
                        <img src="img/UI/defeat/button_yellow.png">
                        <span onclick="returnToLevelMenuAfterEndgame(event)" class="height_90_percent p-absolute flex j_content_center align_item_center">Continue</span>
                    </div>
                    <div class="p-relative pointer">
                        <img src="img/UI/defeat/button_yellow.png">
                        <span onclick="restartGame('${selectedLevel.levelName}', '${currentCharacter.characterName}')" class="height_90_percent p-absolute flex j_content_center align_item_center">Restart</span>
                    </div>
                </div>
            </div>
        </div>
    `
}

function returnDefeatScreen() {
    return `
    <div class="game_finished_ctn defeat_bg">
        <div class="flex column_center_x">
            <img src="img/UI/defeat/knight_loose.png">
            <span id="defeat">Defeat...</span>
        </div>
        <div class="flex column_center_x align_item_center gap_12">
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
                        <span>${world.levelDurationEndTime}</span>
                    </div>
                    <div class="statistic_ctn">
                        <img src="img/UI/defeat/coin.png">
                        <span>Money:</span>
                        <span>${world.character.collectedCoins}</span>
                    </div>
                </div>
            </div>
            <div class="endScreen_button_ctn">
                <div class="p-relative pointer">
                    <img src="img/UI/defeat/button_yellow.png">
                    <span onclick="returnToLevelMenuAfterEndgame(event)" class="height_90_percent p-absolute flex j_content_center align_item_center">Continue</span>
                </div>
                <div class="p-relative pointer">
                    <img src="img/UI/defeat/button.png">
                    <span onclick="restartGame('${selectedLevel.levelName}', '${currentCharacter.characterName}')" class="height_90_percent p-absolute flex j_content_center align_item_center">Restart</span>
                </div>
            </div>
        </div>
    </div>
    `
}


function returnZeroStarVictory(score) {
    let html = '';
    if (score)
        if (score === 0)
            html = `
        <img src="img/UI/victory/big_star.png">
        <img src="img/UI/victory/big_star.png">
        <img src="img/UI/victory/big_star.png">
    `
    return html;
}

function returnOneStarVictory(score) {
    let html = '';
    if (score)
        if (score === 1)
            html = `
        <img src="img/UI/victory/big_star_yellow.png">
        <img src="img/UI/victory/big_star.png">
        <img src="img/UI/victory/big_star.png">
    `
    return html;
}

function returnTwoStarVictory(score) {
    let html = '';
    if (score)
        if (score === 2)
            html = `
        <img src="img/UI/victory/big_star_yellow.png">
        <img src="img/UI/victory/big_star_yellow.png">
        <img src="img/UI/victory/big_star.png">
    `
    return html;
}


function returnThreeStarVictory(score) {
    let html = '';
    if (score)
        if (score === 3)
            html = `
        <img src="img/UI/victory/big_star_yellow.png">
        <img src="img/UI/victory/big_star_yellow.png">
        <img src="img/UI/victory/big_star_yellow.png">
    `
    return html;
}

function returnLegalContent(contentName, returnlegalContent) {
    return `
    <main id="legal-content" class="content_ctn">
        <div class="information_content_ctn_background">
            <div class="description_banner">
                <h3 class="p-absolute flex j_content_center align_item_center font_24">${contentName}</h3>
                <img src="img/UI/menu/tape.png">
            </div>
            <div onclick="renderGameMenu()" id="legal-content-close-button">
                <img src="img/UI/menu/x_button.png">
            </div>
            <section class="flex j_content_center width_height_100"> 
                <div class="content_description_ctn">
                        <div class="legal_content_sidebar">
                            <span onclick="showLegalContent('Legal Notice', returnLegalNotice)">Impressum</span>
                            <span onclick="showLegalContent('Credits', returnCredits)">Credits</span>
                            <span onclick="showLegalContent('Privacy Policy', returnPrivacyPolicy)" style="width: max-content">Privacy Policy</span>
                        </div>
                        <div id="legal-content-text" class="legal_content_description">
                            ${returnlegalContent()}
                        </div> 
                </div>  
            </section>
        </div>
    </main>
    `
}

function returnCredits(){
    return `
    <div class="overflow_scroll">
        <ul>
            <li>
                Asset used for this game has been bought at <a href="https://craftpix.net/product/fantasy-platformer-game-kit-pixel-art/" target="_blank">https://craftpix.net/product/fantasy-platformer-game-kit-pixel-art/"</a>.
            </li>
            <br>
            <span>All other used icons / images and audios have a CC0 license. Nevertheless, thank you to:</span>
            <li>
                Iconic for both fullscreen icons: <br>
                <a href="https://www.iconsdb.com/black-icons/fullscreen-exit-icon.html" target="_blank">https://www.iconsdb.com/black-icons/fullscreen-exit-icon.html</a> and <br>
                <a href="https://www.iconsdb.com/black-icons/fullscreen-enter-icon.html" target="_blank">https://www.iconsdb.com/black-icons/fullscreen-enter-icon.html</a>
            </li>
            <h3>sound effect:</h3>
            <li>
                <a href="https://freesound.org/people/SlavicMagic/sounds/446015/">wpn_2 generic.wav</a> by <a href="https://freesound.org/people/SlavicMagic/">SlavicMagic</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/Qat/sounds/114683/">whack02.mp3</a> by <a href="https://freesound.org/people/Qat/">Qat</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/110110010/sounds/66396/">wood_hit.wav</a> by <a href="https://freesound.org/people/110110010/">110110010</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/kongg_/sounds/672710/">Spider Attack</a> by <a href="https://freesound.org/people/kongg_/">kongg_</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/qubodup/sounds/442817/">Goblin Growl</a> by <a href="https://freesound.org/people/qubodup/">qubodup</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a><br>
                <a href="https://freesound.org/people/strongbot/sounds/341090/">Dog snarl.mp3</a> by <a href="https://freesound.org/people/strongbot/">strongbot</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/ecfike/sounds/132874/">Monster Short Roar.wav</a> by <a href="https://freesound.org/people/ecfike/">ecfike</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/birdOfTheNorth/sounds/577968/">female-hurt.wav</a> by <a href="https://freesound.org/people/birdOfTheNorth/">birdOfTheNorth</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/cabled_mess/sounds/350902/">Jump_C_01</a> by <a href="https://freesound.org/people/cabled_mess/">cabled_mess</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/Reitanna/sounds/343927/">hiss2.wav</a> by <a href="https://freesound.org/people/Reitanna/">Reitanna</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/cabusta9/sounds/443799/">21. Golpe Attack hit.wav</a> by <a href="https://freesound.org/people/cabusta9/">cabusta9</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/Kastenfrosch/sounds/113989/">gewonnen.mp3</a> by <a href="https://freesound.org/people/Kastenfrosch/">Kastenfrosch</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/jivatma07/sounds/173859/">j1game_over_mono.wav</a> by <a href="https://freesound.org/people/jivatma07/">jivatma07</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/micahlg/sounds/413173/">male_hurt12.ogg</a> by <a href="https://freesound.org/people/micahlg/">micahlg</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/mrickey13/sounds/515624/">PlayerHurt2</a> by <a href="https://freesound.org/people/mrickey13/">mrickey13</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/TrevorG97/sounds/474806/">Wind Effect 1.ogg</a> by <a href="https://freesound.org/people/TrevorG97/">TrevorG97</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/Seth_Makes_Sounds/sounds/683835/">Video Game Music...</a> by <a href="https://freesound.org/people/Seth_Makes_Sounds/">Seth_Makes_Sounds</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/julianmateo_/sounds/522701/">Weapon, Sword, Metal sword, Swing, fast, impact</a> by <a href="https://freesound.org/people/julianmateo_/">julianmateo_</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/IENBA/sounds/698768/">Game Pickup</a> by <a href="https://freesound.org/people/IENBA/">IENBA</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/whothefuckisjojo/sounds/673305/">6 footsteps grass</a> by <a href="https://freesound.org/people/whothefuckisjojo/">whothefuckisjojo</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
            <li>
                <a href="https://freesound.org/people/lesaucisson/sounds/585237/">metal-blade-friction-4.mp3</a> by <a href="https://freesound.org/people/lesaucisson/">lesaucisson</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a>
            </li>
        </ul> 
    </div>
        `
}

function returnLegalNotice(){
    return `
    <div class='overflow_scroll'><p>Angaben gemäß § 5 TMG</p><p>Anthony Hamon <br> 
    wickratherstr. 62<br> 
    41363 Jüchen <br> 
    </p><p> <strong>Vertreten durch: </strong><br>
    Anthony Hamon<br>
    </p><p><strong>Kontakt:</strong> <br>
    Telefon: 0176-72373759<br>
    E-Mail: <a href='mailto:aesahaetrr@gmail.com'>aesahaetrr@gmail.com</a></br></p><p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung für Inhalte</strong><br><br>
    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br>
    Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br>
    Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br>
    Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
    </p><br> 
    Website Impressum erstellt durch <a href="https://www.impressum-generator.de">impressum-generator.de</a> von der <a href="https://www.kanzlei-hasselbach.de/" rel="nofollow">Kanzlei Hasselbach</a>
    </div>
     
    `
}

function returnPrivacyPolicy(){
    return `
    <div class="overflow_scroll">
    <p>Last updated: April 01, 2024</p>
    <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
    <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.termsfeed.com/privacy-policy-generator/" target="_blank">Privacy Policy Generator</a>.</p>
    <h3>Interpretation and Definitions</h3>
    <h3>Interpretation</h3>
    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
    <h3>Definitions</h3>
    <p>For the purposes of this Privacy Policy:</p>
    <ul>
    <li>
    <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
    </li>
    <li>
    <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
    </li>
    <li>
    <p><strong>Application</strong> refers to Fantasia Adventures, the software program provided by the Company.</p>
    </li>
    <li>
    <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Fantasia Adventures.</p>
    </li>
    <li>
    <p><strong>Country</strong> refers to: Nordrhein-Westfalen,  Germany</p>
    </li>
    <li>
    <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
    </li>
    <li>
    <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
    </li>
    <li>
    <p><strong>Service</strong> refers to the Application.</p>
    </li>
    <li>
    <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
    </li>
    <li>
    <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
    </li>
    <li>
    <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
    </li>
    </ul>
    <h3>Collecting and Using Your Personal Data</h3>
    <h3>Types of Data Collected</h3>
    <h4>Personal Data</h4>
    <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
    <ul>
    <li>
    <p>Email address</p>
    </li>
    <li>
    <p>Usage Data</p>
    </li>
    </ul>
    <h4>Usage Data</h4>
    <p>Usage Data is collected automatically when using the Service.</p>
    <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
    <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
    <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
    <h3>Use of Your Personal Data</h3>
    <p>The Company may use Personal Data for the following purposes:</p>
    <ul>
    <li>
    <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
    </li>
    <li>
    <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
    </li>
    <li>
    <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
    </li>
    <li>
    <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
    </li>
    <li>
    <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
    </li>
    <li>
    <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
    </li>
    <li>
    <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
    </li>
    <li>
    <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
    </li>
    </ul>
    <p>We may share Your personal information in the following situations:</p>
    <ul>
    <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
    <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
    <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
    <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
    <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
    <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
    </ul>
    <h3>Retention of Your Personal Data</h3>
    <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
    <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
    <h3>Transfer of Your Personal Data</h3>
    <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
    <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
    <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
    <h3>Delete Your Personal Data</h3>
    <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.</p>
    <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>
    <p>You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.</p>
    <p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>
    <h3>Disclosure of Your Personal Data</h3>
    <h4>Business Transactions</h4>
    <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
    <h4>Law enforcement</h4>
    <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
    <h4>Other legal requirements</h4>
    <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
    <ul>
    <li>Comply with a legal obligation</li>
    <li>Protect and defend the rights or property of the Company</li>
    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
    <li>Protect the personal safety of Users of the Service or the public</li>
    <li>Protect against legal liability</li>
    </ul>
    <h3>Security of Your Personal Data</h3>
    <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
    <h3>Children's Privacy</h3>
    <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
    <p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
    <h3>Links to Other Websites</h3>
    <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
    <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
    <h3>Changes to this Privacy Policy</h3>
    <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
    <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
    <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
    <h3>Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, You can contact us:</p>
    <ul>
    <li>By email: aesahaetrr@gmail.com</li>
    </ul>
    `
}