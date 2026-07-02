if (typeof GAME !== 'undefined') {

var PVP = {
    stop: true,
    wi: false,
    org: false,
    war_list: 0,
    war_cnt: 0,
    org_cnt: 0,
    charState: {},
    komBusy: false,
    attacked_ids: {},
    emp : 0,
    wk: false,
    caseNumber: 0,
    wait_pvp: 10,
    wait_pvp2: 80,
    czekajpvp: 160,
    WSP: 50,
    licznik: 0,
    killing: false,
    dogory: false,
    loc: 0,
    g: 1,
    tele: false,
    tabb: [],
    x: 1,
    y: 1,
    war: false,
    buff_imp: false,
    buff_clan: false,
    chars:[],
    start_char:0,
    start_char_id:null,
    wait_for_clear_ticks:0,
    attacked_this_round:false,
    empty_rounds:{},
    waiting_for_attack:false,
    wait_for_attack_since:0,
    start_wait_timeouts:0,
    start_char_disabled:false,
    stale_enemy_count:null,
    stale_enemy_since:0,
    emp_wars_next_refresh:0,
    war_cooldown_log_next:0,
};
PVP.EMP_WARS_REFRESH_INTERVAL = 15;
PVP.WAR_COOLDOWN_SANITY_LIMIT = 7 * 24 * 3600;
PVP.CAP_TTL = 86400;            // uprawnienia sprawdzamy raz dziennie
PVP.CAP_STORAGE_KEY = 'swa_pvp_caps';
PVP.ORG_HIRE_ATTEMPTS = 5;      // ile prób odczytu wyniku najmu (rejestr/OK)
PVP.ORG_HIRE_RETRY = 20;        // s: bufor między najmem a odświeżeniem emp_wars (>15s refresh)
PVP.RAPS_LIMIT = 1000;          // kasuj wszystkie raporty, gdy jest ich co najmniej tyle
PVP.RAPS_CHECK_INTERVAL = 300;  // s: jak często sprawdzać liczbę raportów
PVP.raps_next_check = 0;
PVP.raps_check_pending = false;

// ---- Stan per-postać (izolacja: rotacja nie kasuje postępu) ----
PVP.loadCaps = () => {
    try { return JSON.parse(localStorage.getItem(PVP.CAP_STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
};
PVP.saveCap = (kind, cap) => {
    var caps = PVP.loadCaps();
    if (!caps[GAME.char_id]) caps[GAME.char_id] = {};
    caps[GAME.char_id][kind] = cap;
    try { localStorage.setItem(PVP.CAP_STORAGE_KEY, JSON.stringify(caps)); } catch (e) { return; }
};
PVP.newCharState = () => {
    var s = { warCooldownUntil: 0, warCap: null, orgCap: null, orgProgress: {} };
    var caps = PVP.loadCaps()[GAME.char_id];
    if (caps) { s.warCap = caps.war || null; s.orgCap = caps.org || null; }
    return s;
};
PVP.cs = () => {
    var id = GAME.char_id;
    if (!PVP.charState[id]) PVP.charState[id] = PVP.newCharState();
    return PVP.charState[id];
};
// zwraca true (mamy uprawnienia), false (brak), null (nieznane/wygasło -> spróbuj)
PVP.getCap = (kind) => {
    var cap = kind === 'war' ? PVP.cs().warCap : PVP.cs().orgCap;
    if (cap && (GAME.getTime() - cap.at) < PVP.CAP_TTL) return cap.allowed;
    return null;
};
PVP.setCap = (kind, allowed) => {
    var cap = { allowed: allowed, at: GAME.getTime() };
    if (kind === 'war') PVP.cs().warCap = cap; else PVP.cs().orgCap = cap;
    PVP.saveCap(kind, cap);
};
PVP.refreshEmpWars = () => {
    if (GAME.getTime() < PVP.emp_wars_next_refresh) return;
    PVP.emp_wars_next_refresh = GAME.getTime() + PVP.EMP_WARS_REFRESH_INTERVAL;
    GAME.socket.emit('ga', { a: 50, type: 0, empire: GAME.char_data.village_id });
};
PVP.checkkkk = () => {
    let imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
    
    let buff = $(".emp_buff .pull-right").find("button").attr("data-option") == "activate_emp_buff";
    let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
    let who_win = $("#gne_satus").text().includes("ZŁO");
    let abut = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`);
    let isDisabled = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`).parents("tr").hasClass("disabled");
    PVP.emp = GAME.char_data.village_id;

    if (GAME.quick_opts.ssj && $("#ssj_bar").css("display") === "none" && PVP.code) {
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 18,
                type: 5,
                tech_id: GAME.quick_opts.ssj[0]
            });
        }, 1500);
        return true;
    } else if ($('#ssj_status').text() == "--:--:--" && PVP.code && GAME.quick_opts.ssj) {
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 18,
                type: 6
            });
        }, 1500);
        return true;
    } else if ($('#ssj_status').text() <= '00:00:05' && PVP.code && GAME.quick_opts.ssj) {
        return true;
    } else if ($("#train_uptime").find('.timer').length == 0 && !GAME.is_training && PVP.code) {
        GAME.socket.emit('ga', {
            a: 8,
            type: 2,
            stat: 1,
            duration: 1
        });
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 8,
                type: 5,
                apud: 'vzaaa'
            });
        }, 1600);
        return true;
    } else if (GAME.is_training && $("#train_uptime").find('.timer').length == 1 && PVP.code) {
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 8,
                type: 3
            });
        }, 1600);
        return true;
    } else if (GAME.is_training && PVP.code) {
        GAME.socket.emit('ga', {
            a: 8,
            type: 3
        });
        return true;
    } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 4) {
        GAME.socket.emit('ga', {
            a: 50,
            type: 6,
            buff: buff_id
        });
        return true;
    } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 7 && ((PVP.emp == 1 || PVP.emp == 3) && who_win)) {
        GAME.socket.emit('ga', {
            a: 50,
            type: 6,
            buff: buff_id
        });
        return true;
    } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 7 && ((PVP.emp == 2 || PVP.emp == 4) && !who_win)) {
        GAME.socket.emit('ga', {
            a: 50,
            type: 6,
            buff: buff_id
        });
        return true;
    } else if ((PVP.buff_clan || PVP.buff_imp) && $("#server_time").text() > '00:05:00' && $("#server_time").text() < '01:00:00' && typeof this.loaded == 'undefined') {
        this.loaded = true;
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 50,
                type: 0,
                empire: GAME.char_data.empire
            });
        }, 300);
        setTimeout(() => {
            GAME.emitOrder({
                a: 39,
                type: 0
            });
        }, 600);
        setTimeout(() => {
            GAME.emitOrder({
                a: 39,
                type: 23
            });
        }, 900);
        return true;
    } else if (PVP.buff_clan && GAME.klan_data != undefined && abut.length && !isDisabled) {
        $(" .newBtn.activate_all_clan_buffs").click();
        return true;
    }
    return false;
};
PVP.start = () => {
    if (!PVP.stop && !GAME.is_loading) {
        if ($("#player_list_con").find("[data-option=load_more_players]").length != 0) {
            $("#player_list_con").find("[data-option=load_more_players]").click();
        }
        PVP.action();
    } else if (GAME.is_loading) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    }
};

PVP.duties = [
    'check_position_x',   // MOVEMENT
    'check_position_y',   // MOVEMENT
    'check',              // MOVEMENT (odświeżenie mapy/wojen klanowych)
    'clean_raps',         // MAINTENANCE (kasowanie nadmiaru raportów)
    'dec_wars',           // WAR
    'orgi',               // ORG
    'check_players',      // COMBAT
    'kill_players',       // COMBAT
    'check_players2',     // COMBAT
    'wojny1',             // COMBAT (pauza)
    'check_location',     // MOVEMENT
    'check2',             // BUFF (trening/ssj/buffy)
    'check_players2',     // COMBAT
    'zmien_postc',        // ROTATION
];
PVP.action = () => {
    var i = PVP.caseNumber;
    PVP.caseNumber = (i + 1) % PVP.duties.length;
    PVP[PVP.duties[i]]();
};
PVP.check_position_x = () => {
    PVP.x = GAME.char_data.x;
    window.setTimeout(PVP.start, 5);
};
PVP.check_position_y = () => {
    PVP.y = GAME.char_data.y;
    window.setTimeout(PVP.start, 5);
};
PVP.check_players = () => {
    // nowa runda ataku na tym polu -> czyścimy pamięć zaatakowanych celów
    PVP.attacked_ids = {};
    if ($("#player_list_con").find("[data-option=load_more_players]").length != 0) {
        $("#player_list_con").find("[data-option=load_more_players]").click();
    }
    if (0 < $("#player_list_con .player").length) {
        PVP.y = GAME.char_data.y;
        if (document.getElementById("player_list_con").children[0].children[1].childElementCount == 3) {
            PVP.tabb = $("#player_list_con .player").eq(0).find(".timer").text();
            if (PVP.tabb <= '00:01:30' && PVP.y == 2 && PVP.tabb != '' || PVP.tabb <= '00:00:25' && PVP.tabb != '') {
                window.setTimeout(PVP.check_players, PVP.czekajpvp / PVP.WSPP() * 4);
            } else {
                window.setTimeout(PVP.start, PVP.czekajpvp / PVP.WSPP() / 2);
            }
        } else {
            window.setTimeout(PVP.start, PVP.czekajpvp / PVP.WSPP() / 2);
        }
    } else {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP() * 2);
    }
    PVP.licznik = 1;
};
PVP.check_players2 = () => {
    var enemy = PVP.attackableEnemies();
    // tylko jeden łańcuch kill_players1 naraz — inaczej nakładające się pętle
    // zapychają event loop i cała rotacja (bieg/atak) zwalnia z czasem
    if (!PVP.killing) PVP.kill_players1();
    window.setTimeout(PVP.start, PVP.czekajpvp / PVP.WSPP() * (enemy.length) * 2);
    PVP.licznik = 1;
};
PVP.isHiddenVillage = () => {
    return $('#map_name').text().trim().toLowerCase().indexOf('ukryta wiosk') !== -1;
};

PVP.ownCharIds = () => {
    var ids = [];
    $("li[data-option=select_char]").each(function () {
        var id = $(this).attr("data-char_id");
        if (id) ids.push(id);
    });
    return ids;
};
PVP.isOwnChar = (charId) => {
    return PVP.ownCharIds().indexOf(String(charId)) !== -1;
};
PVP.attackableEnemies = () => {
    return $("#player_list_con").find(".player button[data-quick=1]:not(.initial_hide_forced)").filter(function () {
        return !PVP.isOwnChar($(this).attr("data-char_id"));
    });
};
// cele atakowalne, których jeszcze nie tknęliśmy w tej rundzie (bez cooldownu, bez dubli)
PVP.freshEnemies = () => {
    return PVP.attackableEnemies().filter(function () {
        return !PVP.attacked_ids[$(this).attr("data-char_id")];
    });
};
// jeden atak z właściwym typem: shadow/ukryta wioska (gpvp/gxxx) => type:1, zwykły => bez type
PVP.attackButton = ($btn) => {
    var charId = parseInt($btn.attr("data-char_id"));
    var opt = $btn.attr("data-option") || '';
    PVP.attacked_ids[$btn.attr("data-char_id")] = true;
    PVP.attacked_this_round = true;
    if (opt.indexOf("gxxx") !== -1 || opt.indexOf("gpvp") !== -1) {
        GAME.socket.emit('ga', { a: 24, type: 1, char_id: charId, quick: 1 });
    } else {
        GAME.socket.emit('ga', { a: 24, char_id: charId, quick: 1 });
    }
};

PVP.refreshPlayerList = () => {
    GAME.loadMapJson(function () {
        GAME.socket.emit('ga', {
            a: 3,
            vo: GAME.map_options.vo
        }, 1);
    });
};
PVP.STALE_ENEMY_TIMEOUT = 5;
PVP.checkStaleEnemies = (count) => {
    if (count !== PVP.stale_enemy_count) {
        PVP.stale_enemy_count = count;
        PVP.stale_enemy_since = GAME.getTime();
        return;
    }
    if (count > 0 && GAME.getTime() - PVP.stale_enemy_since >= PVP.STALE_ENEMY_TIMEOUT) {
        console.log("PVP - lista przeciwników (" + count + ") nie zmienia się od " + PVP.STALE_ENEMY_TIMEOUT + "s, odświeżam");
        PVP.stale_enemy_since = GAME.getTime();
        PVP.refreshPlayerList();
    }
};
PVP.kill_players = () => {
    if (PVP.isHiddenVillage()) {
        PVP.licznik = 0;
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }
    if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
        $("#player_list_con").find("[data-option=load_more_players]").click();
        window.setTimeout(PVP.kill_players, PVP.czekajpvp / PVP.WSPP());
        return;
    }
    PVP.checkStaleEnemies(PVP.attackableEnemies().length);
    var fresh = PVP.freshEnemies();
    if (fresh.length > 0) {
        PVP.attackButton(fresh.eq(0));
        window.setTimeout(PVP.kill_players, PVP.czekajpvp / PVP.WSPP());
    } else {
        PVP.licznik = 0;
        kom_clear();
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    }
};
PVP.kill_players1 = () => {
    if (PVP.isHiddenVillage()) {
        PVP.killing = false;
        kom_clear();
        return;
    }
    if (JQS.chm.is(":focus")) {
        PVP.killing = false;
        return;
    }
    if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
        $("#player_list_con").find("[data-option=load_more_players]").click();
        PVP.killing = true;
        window.setTimeout(PVP.kill_players1, 50);
        return;
    }
    PVP.checkStaleEnemies(PVP.attackableEnemies().length);
    var fresh = PVP.freshEnemies();
    if (fresh.length > 0) {
        PVP.attackButton(fresh.eq(0));
        PVP.killing = true;
        window.setTimeout(PVP.kill_players1, 110);
    } else {
        PVP.killing = false;
        console.log("koniec wroguw", PVP.attackableEnemies().length);
        kom_clear();
    }
};
PVP.wojny1 = () => {
    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
};
PVP.zejdz = () => {
    GAME.socket.emit('ga', {
        a: 16
    });
    window.setTimeout(PVP.teleport, 2000);
};
PVP.zmien_postc = () => {
    if (!PVP.zmieniaj) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }

    var attackable = PVP.isHiddenVillage() ? [] : PVP.attackableEnemies();
    if (attackable.length > 0 && PVP.wait_for_clear_ticks < 10) {
        PVP.wait_for_clear_ticks++;
        console.log("PVP zmieniaj - jeszcze są przeciwnicy na polu (" + attackable.length + "), nie zmieniam postaci, próba " + PVP.wait_for_clear_ticks);
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }
    if (attackable.length > 0) {
        console.log("PVP zmieniaj - przekroczono limit prób czyszczenia pola, zmieniam postać mimo to");
    }
    PVP.wait_for_clear_ticks = 0;

    var currentCharId = GAME.char_id;
    if (PVP.waiting_for_attack) {
        if (PVP.attacked_this_round) {
            console.log("PVP zmieniaj - postać startowa zaatakowała, wracam do rotacji");
            PVP.waiting_for_attack = false;
            PVP.empty_rounds = {};
            PVP.attacked_this_round = false;
            PVP.start_wait_timeouts = 0;
        } else if (GAME.getTime() - PVP.wait_for_attack_since >= 300) {
            PVP.waiting_for_attack = false;
            PVP.empty_rounds = {};
            PVP.attacked_this_round = false;
            PVP.start_wait_timeouts++;
            if (PVP.start_wait_timeouts >= 2) {
                console.log("PVP zmieniaj - postać startowa nie atakuje przez kilka prób, wyłączam wracanie na nią");
                PVP.start_char_disabled = true;
            } else {
                console.log("PVP zmieniaj - 5 minut bez ataku na postaci startowej, zmieniam dalej");
            }
        } else {
            console.log("PVP zmieniaj - czekam na atak postacią startową (" + (300 - (GAME.getTime() - PVP.wait_for_attack_since)) + "s)");
            window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
            return;
        }
    } else {
        if (PVP.attacked_this_round) {
            PVP.empty_rounds[currentCharId] = 0;
        } else {
            PVP.empty_rounds[currentCharId] = (PVP.empty_rounds[currentCharId] || 0) + 1;
            console.log("PVP zmieniaj - postać " + currentCharId + " runda bez ataku (" + PVP.empty_rounds[currentCharId] + "/2)");
        }
        PVP.attacked_this_round = false;

        if (PVP.empty_rounds[currentCharId] >= 2 && PVP.start_char_id != null && !PVP.start_char_disabled && currentCharId != PVP.start_char_id && PVP.canDeclareWar()) {
            console.log("PVP zmieniaj - postać " + currentCharId + " 2 rundy bez ataku, wracam na postać startową i czekam na atak");
            PVP.empty_rounds[currentCharId] = 0;
            PVP.waiting_for_attack = true;
            PVP.wait_for_attack_since = GAME.getTime();
            GAME.emitOrder({ a: 2, char_id: PVP.start_char_id });
            window.setTimeout(PVP.start, 2000);
            return;
        } else if (PVP.empty_rounds[currentCharId] >= 2) {
            PVP.empty_rounds[currentCharId] = 0;
        }
    }

    console.log("PVP ", PVP.start_char, PVP.chars.length)
    if (PVP.start_char == PVP.chars.length) {
        PVP.start_char = 0;
        var charId0 = parseInt(PVP.chars[PVP.start_char++]);
        GAME.emitOrder({ a: 2, char_id: charId0 });
        window.setTimeout(PVP.start, 2000);
        return;
    }
    var charId = parseInt(PVP.chars[PVP.start_char++]);
    GAME.emitOrder({ a: 2, char_id: charId });

    window.setTimeout(PVP.start, 2000);
}
PVP.go = () => {
    var x = GAME.char_data.x;
    var y = GAME.char_data.y;
    if (x == 14 && y == 14 && PVP.loc === 1) {
        PVP.zejdz();
        PVP.g = 2;
        PVP.tele = true;
    } else if (x == 14 && y == 14 && PVP.loc === 2) {
        PVP.zejdz();
        PVP.g = 3;
        PVP.tele = true;
    } else if (x == 14 && y == 14 && PVP.loc === 3) {
        PVP.zejdz();
        PVP.g = 4;
        PVP.tele = true;
    } else if (x == 14 && y == 14 && PVP.loc === 4) {
        PVP.zejdz();
        PVP.g = 1;
        PVP.tele = true;
    } else if (PVP.loc === 7) {
        PVP.zejdz();
        PVP.tele = true;
    } else if (x == 8 && y == 4 && PVP.loc == 4 || x == 8 && y == 6 && PVP.loc == 4 || x == 12 && y == 7 && PVP.loc == 1 || x == 12 && y == 9 && PVP.loc == 1 || x == 4 && y == 8 && PVP.loc == 1 || x == 4 && y == 10 && PVP.loc == 1 || x == 7 && y == 13 && PVP.loc == 3 || x == 8 && y == 5 && PVP.loc == 2 || x == 8 && y == 7 && PVP.loc == 2 || x == 3 && y == 9 && PVP.loc == 5) {
        PVP.go_down();
    } else if (x == 8 && y == 5 && PVP.loc == 4 || x == 8 && y == 7 && PVP.loc == 4) {
        PVP.go_left();
    } else if (x == 5 && y == 11 && PVP.loc == 1 || x == 5 && y == 10 && PVP.loc == 1 || x == 5 && y == 9 && PVP.loc == 1 || x == 5 && y == 8 && PVP.loc == 1) {
        PVP.go_up();
    } else if (x == 8 && y == 6 && PVP.loc == 2 || x == 8 && y == 8 && PVP.loc == 2) {
        PVP.go_right();
    } else if (x == 2 && y == 11 && PVP.loc == 3) {
        PVP.cofanie();
    } else if (x == 7 && y == 7 && PVP.loc == 6 && PVP.dogory || x == 9 && y == 7 && PVP.loc == 6 && PVP.dogory) {
        PVP.prawodol();
    } else if (x == 8 && y == 8 && PVP.loc == 6 && PVP.dogory || x == 10 && y == 8 && PVP.loc == 6 && PVP.dogory) {
        PVP.prawogora();
    } else if (x < 14 && y % 2 == 0 && PVP.loc < 5 || x < 15 && y % 2 !== 0 && PVP.loc == 6 || x < 11 && y % 2 == 0 && PVP.loc == 5) {
        PVP.go_right();
    } else if (y % 2 !== 0 && x > 2 && PVP.loc < 6 || x > 1 && y % 2 == 0 && PVP.loc == 6 || x == 2 && PVP.loc == 6) {
        PVP.go_left();
    } else if (x == 14 || x == 2 && PVP.loc < 5 || x == 15 && PVP.loc == 6 || x == 1 || x == 11 && PVP.loc == 5 || x == 2 && PVP.loc == 5) {
        PVP.go_down();
    } else {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    }
};
PVP.teleport = () => {
    if (PVP.tele) {
        GAME.socket.emit('ga', {
            a: 50,
            type: 5,
            e: PVP.g
        });
        window.setTimeout(PVP.start, 2000);
        PVP.tele = false;
    } else {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    }
};
PVP.check_location = () => {
    if (GAME.char_data.loc == 351) {
        PVP.loc = 4;
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    } else if (GAME.char_data.loc == 350) {
        PVP.loc = 3;
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    } else if (GAME.char_data.loc == 349) {
        PVP.loc = 2;
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    } else if (GAME.char_data.loc == 348) {
        PVP.loc = 1;
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    } else {
        PVP.loc = 7;
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    }
};
PVP.cofanie = () => {
    PVP.x = GAME.char_data.x;
    if (PVP.x >= 7) {
        PVP.go_down();
    } else {
        GAME.emitOrder({
            a: 4,
            dir: 7,
            vo: GAME.map_options.vo
        });
        window.setTimeout(PVP.cofanie, 150);
    }
};
PVP.prawodol = () => {
    GAME.emitOrder({
        a: 4,
        dir: 3,
        vo: GAME.map_options.vo
    });
    window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
};
PVP.prawogora = () => {
    GAME.emitOrder({
        a: 4,
        dir: 5,
        vo: GAME.map_options.vo
    });
    window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
};
PVP.go_up = () => {
    GAME.emitOrder({
        a: 4,
        dir: 2,
        vo: GAME.map_options.vo
    });
    window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
};
PVP.go_down = () => {
    GAME.emitOrder({
        a: 4,
        dir: 1,
        vo: GAME.map_options.vo
    });
    window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
};
PVP.go_left = () => {
    GAME.emitOrder({
        a: 4,
        dir: 8,
        vo: GAME.map_options.vo
    });
    window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
};
PVP.go_right = () => {
    GAME.emitOrder({
        a: 4,
        dir: 7,
        vo: GAME.map_options.vo
    });
    window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
};
PVP.check = () => {
    if ($("#war_list .timer").length === 0 && PVP.wk) {
        var clanShort = PVP.war || PVP.clan_list();
        if (clanShort) {
            GAME.emitOrder({a:39,type:24,shorts:clanShort});
        }
        GAME.loadMapJson(function() {
            GAME.socket.emit('ga', {
                a: 3,
                vo: GAME.map_options.vo
            }, 1);
        });
    }
    window.setTimeout(PVP.start, 180);
};
PVP.check2 = () => {
    if (PVP.checkkkk()) {
        console.log("pvp check 1");
        window.setTimeout(PVP.check2, 1800);
    } else {
        console.log("pvp check 2");
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    }
};
PVP.clan_list = () => {
    var list = localStorage.getItem('clan_list');
    if (list === undefined) {
        list = "";
    }
    return list;
};
PVP.save_clan_list = () => {
    localStorage.setItem('clan_list', PVP.war);
};
PVP.waitForOrgHireResult = (warId, attemptsLeft, actingChar) => {
    if (actingChar !== GAME.char_id) { PVP.komBusy = false; return; }
    var failed = false, failedText = '';
    $('#kom_con .kom .content').each(function () {
        var t = $(this).text();
        if (t.indexOf('Nie masz uprawnień') !== -1) { failed = true; failedText = t.trim(); }
    });
    if (failed) {
        // brak uprawnień jest per-postać: cała postać nie może najmować (dziś)
        console.log("org - najem odrzucony na postaci " + GAME.char_id + " (\"" + failedText + "\"), wyłączam najem na tej postaci do jutra");
        PVP.setCap('org', false);
        delete PVP.cs().orgProgress[warId];
        PVP.komBusy = false;
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }
    if (attemptsLeft > 0) {
        setTimeout(() => PVP.waitForOrgHireResult(warId, attemptsLeft - 1, actingChar), 300);
    } else {
        // brak komunikatu o błędzie => najem przyjęty; zapisujemy czas próby.
        // GAME.emp_wars potwierdzi org != 0 po najbliższym odświeżeniu; do tego czasu
        // ORG_HIRE_RETRY chroni przed ponownym strzałem w tę samą wojnę.
        PVP.cs().orgProgress[warId] = GAME.getTime();
        if (PVP.getCap('org') === null) PVP.setCap('org', true);
        PVP.komBusy = false;
        PVP.orgi();   // najmujemy kolejne organizacje w tej samej wizycie
    }
};
// ID naszych wojen (village_X == nasza wioska) bez naszej organizacji (org_X == 0) — ze stanu gry.
PVP.warsNeedingOrg = () => {
    var out = [];
    if (GAME.emp_wars && GAME.emp_wars.length) {
        var myVillage = GAME.char_data.village_id;
        var matchedOurWar = false;
        for (var i = 0; i < GAME.emp_wars.length; i++) {
            var w = GAME.emp_wars[i];
            var ourOrg;
            if (w.village_1 == myVillage) ourOrg = w.org_1;
            else if (w.village_2 == myVillage) ourOrg = w.org_2;
            else continue;                 // to nie nasza wojna
            matchedOurWar = true;
            if (ourOrg == 0) out.push(w.id);
        }
        if (matchedOurWar) return out;     // emp_wars dotyczy naszej wioski -> ufamy statusowi org
        // emp_wars nieświeże / dla innej wioski -> fallback do DOM
    }
    // Fallback: wszystkie wojny z panelu (bez wiedzy o statusie org; dedup przez ORG_HIRE_RETRY)
    var wars = document.getElementsByClassName("war_win");
    for (var j = 0; j < wars.length; j++) {
        var btn = wars[j].getElementsByTagName("button")[0];
        if (btn) {
            var wid = btn.getAttribute("data-war");
            if (wid) out.push(wid);
        }
    }
    return out;
};
PVP.orgi = () => {
    if (!PVP.org || PVP.getCap('org') === false) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }
    if (PVP.komBusy) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }

    var org_id = 1;
    if ($("#pvp_Panel select[name=org_id]").val() != '')
        org_id = $("#pvp_Panel select[name=org_id]").val();

    var progress = PVP.cs().orgProgress;
    var needing = PVP.warsNeedingOrg();
    var target = null;
    for (var i = 0; i < needing.length; i++) {
        var ts = progress[needing[i]];
        if (ts && (GAME.getTime() - ts) < PVP.ORG_HIRE_RETRY) continue; // niedawno najęte, czekamy na odświeżenie emp_wars
        target = needing[i];
        break;
    }

    if (target) {
        var actingChar = GAME.char_id;
        PVP.komBusy = true;
        console.log("org - org_id=" + org_id + " cel=" + target + " (" + needing.length + " naszych wojen bez organizacji)");
        setTimeout(() => {
            if (actingChar !== GAME.char_id) { PVP.komBusy = false; return; }
            $('#kom_con .kom').remove();
            GAME.emitOrder({a:50,type:13,war:target,org:org_id});
            setTimeout(() => PVP.waitForOrgHireResult(target, PVP.ORG_HIRE_ATTEMPTS, actingChar), 300);
        }, 100);
    } else {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    }
}
PVP.isAtWarWith = (targetId) => {
    var myVillage = GAME.char_data.village_id;
    // Pewne, ustrukturyzowane źródło: GAME.emp_wars (to samo co przy najmie organizacji).
    // Wojna z targetId istnieje, jeśli któraś wojna łączy naszą wioskę z targetId.
    if (GAME.emp_wars && GAME.emp_wars.length) {
        for (var i = 0; i < GAME.emp_wars.length; i++) {
            var w = GAME.emp_wars[i];
            if ((w.village_1 == myVillage && w.village_2 == targetId) ||
                (w.village_2 == myVillage && w.village_1 == targetId)) {
                return true;
            }
        }
        return false;
    }
    // Fallback (gdyby emp_wars nie było jeszcze załadowane): stara metoda po nazwach z DOM.
    var targetName = LNG['village' + targetId];
    var ownName = LNG['village' + myVillage];
    var found = false;
    $('#emp_wars .war_win').each(function () {
        var names = $(this).find('b');
        var a = $(names[0]).text().trim();
        var b = $(names[1]).text().trim();
        if ((a === ownName && b === targetName) || (a === targetName && b === ownName)) {
            found = true;
        }
    });
    return found;
};
// Uprawnienie do wypowiadania wojen = gra pokazuje panel #emp_war_delare (dla postaci
// bez uprawnień jest ustawiony display:none). Sygnał natychmiastowy i pewny.
PVP.canDeclareWar = () => {
    var el = document.getElementById('emp_war_delare');
    return !!el && el.style.display !== 'none';
};
PVP.WAR_RESULT_ATTEMPTS = 4;   // ~1.4s okna na odczyt cooldownu
PVP.checkWarCooldownMsg = (actingChar, preCount, attemptsLeft) => {
    if (actingChar !== GAME.char_id) { PVP.komBusy = false; return; }
    if (attemptsLeft === undefined) attemptsLeft = PVP.WAR_RESULT_ATTEMPTS;

    var $timer = $('#kom_con .kom .content .timer');
    if ($timer.length) {
        var end = parseInt($timer.attr('data-end'));
        var now = GAME.getTime();
        if (end && end > now && end < now + PVP.WAR_COOLDOWN_SANITY_LIMIT) {
            console.log("dec wars - cooldown ustawiony na " + (end - now) + "s (" + Math.round((end - now) / 60) + " min)");
            PVP.cs().warCooldownUntil = end;
        } else if (end) {
            console.log("dec wars - zignorowałem podejrzanie długi cooldown (" + (end - now) + "s)");
        }
        PVP.komBusy = false;
        return;
    }
    if ($('#emp_wars .war_win').length > preCount) { PVP.komBusy = false; return; }
    if (attemptsLeft > 0) {
        setTimeout(() => PVP.checkWarCooldownMsg(actingChar, preCount, attemptsLeft - 1), 350);
    } else {
        PVP.komBusy = false;
    }
};
// Następny prawidłowy cel wojny: pomija własne imperium i wioski, z którymi już trwa wojna.
PVP.nextWarTarget = () => {
    var myVillage = GAME.char_data.village_id;
    var c = PVP.war_cnt;
    for (var i = 0; i < 10; i++) {
        if (c > 10 || c < 1) c = 1;
        if (c != myVillage && !PVP.isAtWarWith(c)) return c;
        c++;
    }
    return null;   // wszystkie wioski już w wojnie
};
PVP.dec_wars = () => {
    PVP.refreshEmpWars();
    if (!PVP.wi || !PVP.canDeclareWar()) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }
    if (PVP.komBusy) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }

    var cs = PVP.cs();
    var warDeclared = false;
    if (GAME.getTime() < cs.warCooldownUntil) {
        var remaining = cs.warCooldownUntil - GAME.getTime();
        if (remaining > PVP.WAR_COOLDOWN_SANITY_LIMIT) {
            console.log("dec wars - cooldown nieprawidłowy (" + remaining + "s), resetuję");
            cs.warCooldownUntil = 0;
        } else if (GAME.getTime() >= PVP.war_cooldown_log_next) {
            PVP.war_cooldown_log_next = GAME.getTime() + 60;
            console.log("dec wars - cooldown, czekam jeszcze " + remaining + "s (" + Math.round(remaining / 60) + " min)");
        }
    } else {
        var target = PVP.nextWarTarget();
        var empWarsSeen = $('#emp_wars .war_win').length;
        if (target != null) {
            console.log("dec wars - wypowiadam wojnę " + target + " (postać " + GAME.char_id + ", widzę " + empWarsSeen + " aktywnych wojen w panelu)");
            var actingChar = GAME.char_id;
            $('#kom_con .kom').remove();
            PVP.komBusy = true;
            GAME.emitOrder({a:50,type:7,target:target});
            PVP.war_cnt = target + 1;   // od następnej wioski przy kolejnej wizycie
            warDeclared = true;
            setTimeout(() => PVP.checkWarCooldownMsg(actingChar, empWarsSeen), 500);
            // UWAGA: nie kasujemy postępu najmu organizacji.
        }
    }

    if (PVP.war_list > $("#ewar_list .timer").length || PVP.war_list < $("#ewar_list .timer").length) {
        PVP.war_list = $("#ewar_list .timer").length;
        GAME.loadMapJson(function() {
            GAME.socket.emit('ga', {
            a: 3,
            vo: GAME.map_options.vo
            }, 1);
        });
    }
    window.setTimeout(PVP.start, warDeclared ? 1500 : PVP.wait_pvp / PVP.WSPP());
};
PVP.clean_raps = () => {
    if (PVP.raps_check_pending || GAME.getTime() < PVP.raps_next_check) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }
    PVP.raps_next_check = GAME.getTime() + PVP.RAPS_CHECK_INTERVAL;
    PVP.raps_check_pending = true;
    // odpowiedź trafi do GAME.parseData case 13 -> PVP.onRapsData
    GAME.emitOrder({ a: 11, page: 1, cat: 0 });
    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
};
// wołane z parseData(13) po odebraniu listy raportów; reagujemy tylko na nasze zapytanie
PVP.onRapsData = (res) => {
    if (!PVP.raps_check_pending) return;
    PVP.raps_check_pending = false;
    var perPage = (res && res.raps) ? res.raps.length : 0;
    if (!perPage || res.all_pages <= 1) return;
    // dolna granica: pełne strony bez ostatniej (nie znamy liczby na ostatniej stronie)
    var atLeast = (res.all_pages - 1) * perPage;
    if (atLeast >= PVP.RAPS_LIMIT) {
        console.log("clean raps - raportów co najmniej " + atLeast + " (>= " + PVP.RAPS_LIMIT + "), kasuję wszystkie");
        GAME.emitOrder({ a: 11, type: 5, cat: 0 });
    }
};
PVP.speed = () => {
    var list = localStorage.getItem('pvp_speed');
    PVP.WSP = parseInt(list);
    if (list === undefined) {
        list = "";
    }
    return list;
};
PVP.save_speed = () => {
    localStorage.setItem('pvp_speed', PVP.WSP);
};
PVP.WSPP = () => {
    var speed = PVP.WSP;
    if (speed < 10) speed = 2;
    if (speed > 100) speed = 100;
    if ($("#pvp_Panel input[name=speed_capt]").val() == '') speed = 50;
    return speed;
};
GAME.parseListPlayer = function (entry, pvp_master) {
    var res = '';
    if (entry.data) {
        var pd = entry.data;
        if (PVP.higherRebornAvoid && pd.reborn > GAME.char_data.reborn && pd.reborn > 3){return res;}
        var qb = '';
        var klan = '', erank = '';
        if (pd.klan_id) {
            var clanCls = '';
            if (this.clan_enemies.indexOf(pd.klan_id) != -1) clanCls = 'enemy';
            klan = '<b class="poption player_clan ' + clanCls + '" data-option="show_clan" data-klan_id="' + pd.klan_id + '">' + pd.klan_short + ' <img src="' + pd.emblem + '" /></b>';
        }
        var cls = '';
        if (entry.cd) {
            qb += this.showTimer(entry.cd - this.getTime(), 'data-special="10" data-pd="' + pd.id + '"', ' playercd' + pd.id + '');
            cls = 'initial_hide_forced playericons' + pd.id;
        }
        if (pd.empire) {
            var cls2 = '';
            if (this.emp_enemies.indexOf(pd.empire) != -1) {
                if (this.emp_enemies_t[pd.empire] == 1) cls2 = 'war';
                else if (this.empire_locations.indexOf(this.char_data.loc) != -1) cls2 = 'war';
            }
            if (!pd.glory_rank) pd.glory_rank = 1;
            erank = '<img src="/gfx/empire/ranks/' + pd.empire + '/' + pd.glory_rank + '.png" class="glory_rank ' + cls2 + '" />';
        }
        qb += '<button class="poption map_bicon ' + cls + '" data-option="pvp_attack" data-char_id="' + pd.id + '"><i class="ca"></i></button>';
        if (pvp_master) qb += '<button class="poption map_bicon ' + cls + '" data-option="pvp_attack" data-char_id="' + pd.id + '" data-quick="1"><i class="qa"></i></button>';
        res += '<div class="player"><div class="belka">' + erank + '<strong class="player_rank' + pd.ranga + ' poption" data-option="show_player" data-char_id="' + pd.id + '">' + pd.name + '</strong> <span>' + this.rebPref(pd.reborn) + pd.level + '</span> ' + klan + '</div><div id="pvp_opts_' + pd.id + '" class="right_btns">' + qb + '</div></div>';
    }
    else if (entry.more) {
        res += '<div class="more_players"><button class="poption" data-option="load_more_players" data-start_from="' + entry.next_from + '">+' + entry.more + '</button></div>';
    }
    return res;
};
GAME.parsePlayerShadow = function (data, pvp_master) {
    var entry = data.data;
    var res = '';
    if (entry.data) {
        var pd = entry.data;
        if ( PVP.higherRebornAvoid && pd.reborn > GAME.char_data.reborn && pd.reborn > 3){return res;}
        pd.empire = entry.empire;
        var qb = '';
        var erank = '';
        var cls = '';
        if (data.cd) {
            qb += this.showTimer(data.cd - this.getTime(), 'data-special="10" data-pd="' + pd.id + '"', ' playercd' + pd.id + '');
            cls = 'initial_hide_forced playericons' + pd.id;
        }
        if (pd.empire) {
            var cls2 = '';
            if (this.emp_enemies.indexOf(pd.empire) != -1) {
                if (this.emp_enemies_t[pd.empire] == 1) cls2 = 'war';
                else if (this.empire_locations.indexOf(this.char_data.loc) != -1) cls2 = 'war';
            }
            if (!pd.glory_rank) pd.glory_rank = 1;
            erank = '<img src="/gfx/empire/ranks/' + pd.empire + '/' + pd.glory_rank + '.png" class="glory_rank ' + cls2 + '" />';
        }
        qb += '<button class="poption map_bicon ' + cls + '" data-option="gpvp_attack" data-char_id="' + pd.id + '"><i class="ca"></i></button>';
        if (pvp_master) qb += '<button class="poption map_bicon ' + cls + '" data-option="gpvp_attack" data-char_id="' + pd.id + '" data-quick="1"><i class="qa"></i></button>';
        res += '<div class="player"><div class="belka">' + erank + '<strong class="player_rank' + pd.ranga + ' poption" data-option="show_player" data-char_id="' + pd.id + '">' + pd.name + ' - ' + LNG.lab348 + '</strong> <span>' + this.rebPref(pd.reborn) + pd.level + '</span> </div><div id="gpvp_opts_' + pd.id + '" class="right_btns">' + qb + '</div></div>';
    }
    else if (entry.more) {
        res += '<div class="more_players"><button class="poption" data-option="load_more_players" data-start_from="' + entry.next_from + '">+' + entry.more + '</button></div>';
    }
    return res;
};
}
