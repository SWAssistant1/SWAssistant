if (typeof GAME === 'undefined') {} else {
kwsv3.prototype.manageAutoAbyss = function () {
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
        }, 1000);
        setTimeout(() => {
            $('#fight_view').fadeOut();
        }, 2000);
        setTimeout(() => {
            if ((GAME.char_data.reborn == 4 || GAME.char_data.reborn == 5) && GAME.char_data.alt_transform_expiry < GAME.getTime()) {
                GAME.socket.emit('ga', {
                    a: 18,
                    type: 8,
                    tech_id: 134
                });
            }
        }, 3000);
    }
};

kwsv3.prototype.manageAutoArena = function () {
    if (this.auto_arena) {
        GAME.socket.emit('ga', {
            a: 46,
            type: 0
        });
        setTimeout(() => {
            this.attackAutoArena();
        }, 1000);
    } else {
        this.stopAutoArena();
    }
};

kwsv3.prototype.attackAutoArena = function () {
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
            }, 500);
        } else {
            setTimeout(() => {
                this.manageAutoArena();
            }, 5000);
        }
    } else {
        this.stopAutoArena();
    }
};

kwsv3.prototype.stopAutoArena = function () {
    this.auto_arena = false;
    $(".qlink.manage_auto_arena").removeClass("kws_active_icon");
};

}
