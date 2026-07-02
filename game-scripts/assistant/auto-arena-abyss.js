var Assistant = window.Assistant;
Assistant.prototype.manageAutoAbyss = function () {
    GAME.socket.emit('ga', {
        a: 59,
        type: 0
    });

    if ($("#ss_cd_still").css("display") == "none") {
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 59,
                type: 1
            });
        }, 100);
        setTimeout(() => {
            $('#fight_view').fadeOut();
        }, 200);
        setTimeout(() => {
            if ((GAME.char_data.reborn == 4 || GAME.char_data.reborn == 5) && GAME.char_data.alt_transform_expiry < GAME.getTime()) {
                GAME.socket.emit('ga', {
                    a: 18,
                    type: 8,
                    tech_id: 134
                });
            }
        }, 300);
    }
};

Assistant.prototype.manageAutoArena = function () {
    if (this.auto_arena) {
        this.arena_loaded_for_char = GAME.char_id;
        GAME.socket.emit('ga', {
            a: 46,
            type: 0
        });
        setTimeout(() => {
            this.attackAutoArena();
        }, 100);
    } else {
        this.stopAutoArena();
    }
};

Assistant.prototype.attackAutoArena = function () {
    if (GAME.char_id !== this.arena_loaded_for_char) {
        setTimeout(() => {
            this.manageAutoArena();
        }, 1000);
        return;
    }
    let opponents = $("#arena_players").find(`.player button[data-option="arena_attack"][data-quick="1"]:not(.initial_hide_forced)`);
    let opponent = parseInt(opponents.attr("data-index"));
    if (this.auto_arena) {
        if (opponents.length > 0 && GAME.timed == 0) {
            GAME.socket.emit('ga', {
                a: 46,
                type: 1,
                index: opponent,
                quick: 1
            });
            setTimeout(() => {
                this.attackAutoArena();
            }, 50);
        } else {
            setTimeout(() => {
                this.manageAutoArena();
            }, 500);
        }
    } else {
        this.stopAutoArena();
    }
};

Assistant.prototype.stopAutoArena = function () {
    this.auto_arena = false;
    $(".qlink.manage_auto_arena").removeClass("swa_active_icon");
};

