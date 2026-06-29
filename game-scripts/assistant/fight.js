var Assistant = window.Assistant;
Assistant.prototype.wojny2 = function () {
    var aimp = $("#e_admiral_player").find("[data-option=show_player]").attr("data-char_id");
    var imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
    if (!adimp) {
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 50,
                type: 0,
                empire: GAME.char_data.empire
            });
        }, 100);
        adimp = true;
        setTimeout(() => {
            this.wojny2();
        }, 300);
    } else if (!GAME.emp_enemies.includes(1) && ![GAME.char_data.empire].includes(1) && (assistant.check_imp().includes(GAME.char_id) || assistant.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
        GAME.socket.emit('ga', {
            a: 50,
            type: 7,
            target: 1
        });
        setTimeout(() => {
            this.wojny2();
        }, 300);
    } else if (!GAME.emp_enemies.includes(2) && ![GAME.char_data.empire].includes(2) && (assistant.check_imp().includes(GAME.char_id) || assistant.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
        GAME.socket.emit('ga', {
            a: 50,
            type: 7,
            target: 2
        });
        setTimeout(() => {
            this.wojny2();
        }, 300);
    } else if (!GAME.emp_enemies.includes(3) && ![GAME.char_data.empire].includes(3) && (assistant.check_imp().includes(GAME.char_id) || assistant.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
        GAME.socket.emit('ga', {
            a: 50,
            type: 7,
            target: 3
        });
        setTimeout(() => {
            this.wojny2();
        }, 300);
    } else if (!GAME.emp_enemies.includes(4) && ![GAME.char_data.empire].includes(4) && (assistant.check_imp().includes(GAME.char_id) || assistant.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
        GAME.socket.emit('ga', {
            a: 50,
            type: 7,
            target: 4
        });
        setTimeout(() => {
            this.wojny2();
        }, 300);
    } else { }
};

Assistant.prototype.check_imp = function () {
    var tab = [];
    for (var i = 0; i < 3; i++) {
        tab[i] = parseInt($("#empire_heroes .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
    }
    return tab;
};

Assistant.prototype.check_imp2 = function () {
    var tab = [];
    for (var i = 0; i < 3; i++) {
        tab[i] = parseInt($("#empire_efrags .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
    }
    return tab;
};

Assistant.prototype.pvpKill = function () {
    if (!JQS.chm.is(":focus")) {
        let opponents = $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)");
        if ($("button[data-option='load_more_players']").is(":visible")) {
            $("button[data-option='load_more_players']").click();
            setTimeout(() => {
                this.pvpKill();
            }, 11);
        } else if (opponents.length > 0) {
            opponents.eq(0).click();
            setTimeout(() => {
                this.pvpKill();
            }, 11);
        }
    }
};

Assistant.prototype.useCompressor = function () {
    GAME.emitOrder({
        a: 22,
        type: 10,
        qb_id: jQuery('#quest_con').find(`[data-option='compress_items']`).data('qb_id')
      });
};

Assistant.prototype.killChamp = function () {
    var mob_id;
    var mob_size;
    for (var i = 0; i < GAME.field_mobs.length; i++) {
        if (GAME.field_mobs[i].custom_rank == 1) {
            mob_id = i;
            mob_size = GAME.field_mobs[i].ranks[GAME.field_mobs[i].custom_rank];
        }
    }
    if (mob_size > 0) {
        GAME.emitOrder({a:7,mob_num:mob_id,rank:1});
        setTimeout(() => {
            $('#fight_view').fadeOut();
        }, 200);
    }
};

Assistant.prototype.killElite = function () {
    var mob_id;
    var mob_size;
    for (var i = 0; i < GAME.field_mobs.length; i++) {
        console.log("searching elite");
        if (GAME.field_mobs[i].custom_rank == 2) {
            mob_id = i;
            mob_size = GAME.field_mobs[i].ranks[GAME.field_mobs[i].custom_rank];
            console.log("elite", mob_id, mob_size);
        }
    }
    if (mob_size > 0) {
        GAME.emitOrder({a:7,mob_num:mob_id,rank:2});
        setTimeout(() => {
            $('#fight_view').fadeOut();
        }, 200);
    }
    
};

Assistant.prototype.killBoss = function () {
    var mob_id;
    var mob_size;
    for (var i = 0; i < GAME.field_mobs.length; i++) {
        if (GAME.field_mobs[i].custom_rank == 3) {
            mob_id = i;
            mob_size = GAME.field_mobs[i].ranks[GAME.field_mobs[i].custom_rank];
        }
    }
    if (mob_size > 0) {
        GAME.emitOrder({a:7,mob_num:mob_id,rank:3});
        setTimeout(() => {
            $('#fight_view').fadeOut();
        }, 200);
    }
};

