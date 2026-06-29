var Assistant = window.Assistant;
Assistant.prototype.updateTopBar = function () {
    let currentLevel = GAME.char_data.level;
    let currentTime = Date.now();
    let levelsGained = currentLevel - GAME.startLevel;
    let levelsPerHour = levelsGained / ((currentTime - GAME.startTime) / 1000 / 60 / 60);
    let lvlh = levelsPerHour.toFixed(2);

    let innerHTML = `  <span class='swa_top_bar_section lvl' style='cursor:pointer;'>LVL: <span>${lvlh}/H</span></span><span class='swa_top_bar_section pvp' style='cursor:pointer;'>PVP: <span>${pvp_count}</span></span><span class='swa_top_bar_section arena' style='cursor:pointer;'>ARENA: <span>${arena_count}</span></span>  <span class='swa_top_bar_section version' style='cursor:pointer;'>Wersja: <span>${version}</span></span> `;
    $(".swa_top_bar").html(innerHTML);
    if (this.baselinePower == undefined) {
        this.baselinePower = GAME.char_data.moc;
    }
    if (this.baselineLevel == undefined) {
        this.baselineLevel = GAME.char_data.level;
    }

    let calculated_levels = GAME.dots(GAME.char_data.level - this.baselineLevel);
    $(".swa_additional_top_bar").html(`  <span class='swa_additional_top_bar_section lvlsGained' style='cursor:pointer;'>ZDOBYTE LVL: <span>${calculated_levels}</span>`);
    this.adjustCurrentCharacterId();
    this.checkTournamentsSigning();
};

Assistant.prototype.collectActivities = function () {
    let received = $("#act_prizes").find("div.act_prize.disabled").length;
    let activity = parseInt($('#char_activity').text());
    let p = [25, 50, 75, 100, 150];
    for (let i = 0; i <= 5; i++) {
        if (received < 5 && activity >= p[i]) {
            let actPrize = $(`#act_prizes button[data-ind=${i}]`).closest(".act_prize");
            if (!actPrize.hasClass("disabled")) {
                GAME.socket.emit('ga', {
                    a: 49,
                    type: 1,
                    ind: i
                });
            }
        }
    }
};

Assistant.prototype.markDaily = function () {
    let daily = ["ZADANIE PVM", "Zadanie PvP", "ROZWÓJ PLANETY ", "ZADANIE IMPERIUM", "ZADANIE KLANOWE", "NAJLEPSZY KUCHA...", "REPUTACJA", "SYMBOL WYMIARÓW", "WYMIANA CHI", "ERMITA", "Nuda", "DOSTAWCA", "BOSKA MOC", "ROZGRZEWKA", "BOSKI ULEPSZACZ", "CZAS PODRÓŻNIKÓ...", "STRAŻNIK PORZĄD...", "CODZIENNY INSTY...", "HIPER SCALACZ", "DZIWNY MEDYK"];
    daily = daily.map(item => item.trim().toLowerCase());
    $('#quest_track_con .qtrack b').each(function () {
        let zawartoscB = $(this).text().trim().toLowerCase();
        if (daily.includes(zawartoscB)) {
            $(this).css("color", "#63aaff");
        }
    });
};

Assistant.prototype.prepareFutureStatsData = function () {
    
};

Assistant.prototype.handleAdditionalTopBarVisibility = function () {
    if(this.additionalTopBarVisible) {
        this.hideAdditionalTopBar();
        this.additionalTopBarVisible = false;
    } else {
        this.showAdditionalTopBar();
        this.additionalTopBarVisible = true;
    }
};

Assistant.prototype.resetCalculatedPower = function () {
    this.baselinePower = undefined;
    this.baselineLevel = undefined;
};

Assistant.prototype.showAdditionalTopBar = function () {
    $("#game_win")[0].style.marginTop = '30px';
    $("#top_bar")[0].style.height = '60px';
    $(".swa_additional_top_bar")[0].style.marginTop = '30px';
    $(".swa_additional_top_bar")[0].style.display = 'block';
};

Assistant.prototype.hideAdditionalTopBar = function () {
    $(".swa_additional_top_bar")[0].style.display = 'none';
    $("#top_bar")[0].style.height = '30px';
    $("#game_win")[0].style.marginTop = '0px';
};

Assistant.prototype.arena_count = function () {
    arena_count++;
    $(".swa_top_bar_section.arena").html(`ARENA: ${arena_count}`);
};

Assistant.prototype.pvp_count = function () {
    pvp_count++;
    $(".swa_top_bar_section.pvp").html(`PVP: ${pvp_count}`);
};

