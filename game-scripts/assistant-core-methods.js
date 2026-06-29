if (typeof GAME === 'undefined') {} else {
kwsv3.prototype.isLogged = function (cb) {
    let waitForID = setInterval(() => {
        if (GAME.pid) {
            clearInterval(waitForID);
            cb(GAME.pid);
        }
    }, 200);
};

kwsv3.prototype.getSettings = function () {
    let settings = JSON.parse(localStorage.getItem("kws_settings"));
    let settings_sample = {
        hide_tracker: false,
        aeCodes: false
    };
    if (settings) {
        for (const key of Object.keys(settings_sample)) {
            if (settings[key] === undefined) {
                settings[key] = settings_sample[key];
            }
        }
        localStorage.setItem("kws_settings", JSON.stringify(settings));
        return settings;
    } else {
        localStorage.setItem("kws_settings", JSON.stringify(settings_sample));
        return settings_sample;
    }
};

kwsv3.prototype.updateSettings = function () {
    localStorage.setItem('kws_settings', JSON.stringify(this.settings));
};

kwsv3.prototype.createCSS = function () {
    $("head").append(`<style id="kwsCSS"></style>`);
};

kwsv3.prototype.addToCSS = function (data) {
    $(`#kwsCSS`).append(data);
};

kwsv3.prototype.bindClickHandlers = function () {
    $("body").on("click", ".free_assist_for_all", () => {
        this.freeAssist();
    });
    $("body").on("click", ".activate_all_clan_buffs", () => {
        this.activateAllClanBuffs();
    });

    $("#poka_telep").click(() => {
        GAME.socket.emit('ga', {
            a: 39,
            type: 35
        });
        GAME.socket.emit('ga', {
            a: 39,
            type: 33
        });
        if ($("#clan_inner_stelep").css("display") == "none") {
            $("#clan_inner_stelep").css("cssText", `display:block;position:absolute;padding:10px;border:solid #003e60 2px;background:rgb(5 21 36 / 97%);z-index:9999;border-radius:5px;margin-top:85px;`);
        } else {
            $("#clan_inner_stelep").attr("style", "display:none;");
        }
    });
    $("body").on("click", "#changeProfile", () => {
        this.resetAFO();
    });
    $("body").on("click", "#changeProfile", () => {
        this.resetAFO();
    });


    // itemki
    $('#ItemPanel .item_poziom').click(() => {
        if ($(".item_poziom .item_status").hasClass("red")) {
            $(".item_poziom .item_status").removeClass("red").addClass("green").html("On");
            $(".item_jakosc .item_status").removeClass("green").addClass("red").html("Off");
            this.item_jakosc = false;
            this.item_poziom = true;
            this.item_poziom_cap = $("#ItemPanel input[name=poziom_capt]").val();

            window.setTimeout(this.UpgradeItem,300);
        } else {
            $(".item_poziom .item_status").removeClass("green").addClass("red").html("Off");
            this.item_poziom = false;
        }
    });

    $('#ItemPanel .item_jakosc').click(() => {
        if ($(".item_jakosc .item_status").hasClass("red")) {
            $(".item_jakosc .item_status").removeClass("red").addClass("green").html("On");
            $(".item_poziom .item_status").removeClass("green").addClass("red").html("Off");
            this.item_jakosc = true;
            this.item_poziom = false;
            this.item_jakosc_cap = $("#ItemPanel input[name=jakosc_capt]").val();
            
            window.setTimeout(this.RerollItem,300);
        } else {
            $(".item_jakosc .item_status").removeClass("green").addClass("red").html("Off");
            this.item_jakosc = false;
        }
    });
    $('#ItemPanel .close_item').click(() => {
        $("#ItemPanel").hide();
    });
    $("body").on("click", "#custom_but", () => {
        $("#ItemPanel").show();
        this.item_id = GAME.dragged_item.id;
        console.log("custom clicked", this.item_id);
    });

    $("body").on("click", "#changeProfileNext", () => {
        this.goToNextChar();
        this.resetCalculatedPower();
    });
    $("body").on("click", "#changeProfilePrev", () => {
        this.goToPreviousChar();
        this.resetCalculatedPower();
    });

    $("body").on("click", `.better_chat_loading`, () => {
        if (GAME.chat_data[GAME.chat_channel].messages.length == 0) {
            GAME.socket.emit('ga', {
                a: 600,
                channel: GAME.chat_channel,
                lm: GAME.chat_data[GAME.chat_channel].last_message
            });
        } else {
            GAME.socket.emit('ga', {
                a: 600,
                channel: GAME.chat_channel,
                lm: GAME.chat_data[GAME.chat_channel].messages[0].time
            });
        }
    });
    $("body").on("click", `div[tp_data=go_teleport]`, (th) => {
        const selectedText = window.getSelection().toString().trim();
        if (!selectedText) {
            let loc = parseInt($(th.target).closest(".qtrack").attr("data-loc"));
            GAME.socket.emit('ga', {
                a: 12,
                type: 18,
                loc: loc
            });
        }
    });

    $("body").on("click", `.kws_top_bar_section.additional_stats`, () => {
        this.handleAdditionalTopBarVisibility();
    });
    $("body").on("click", `.kws_additional_top_bar_section.additional_stats_reset`, () => {
        this.resetCalculatedPower();
    });
    $("body").on("click", `.kws_top_bar_section.train_upgr_info`, () => {
        GAME.page_switch('game_train');
    });
    $('#drag_tracker').off('click').on('click', () => {
        if (!this.settings.hide_tracker) {
            $('#drag_con').hide();
            this.settings.hide_tracker = true;
        } else {
            $('#drag_con').show();
            this.settings.hide_tracker = false;
        }
        this.updateSettings();
    });
    $("body").on("click", ".qlink.get_titles_list", () => {
        this.getTitlesList((html) => {
            JQS.ldr.finish().fadeOut();
            GAME.komunikat2(`<table id="char_titles_popup" class="fast_titles_table" style="margin:0 auto;">${html}</table>`);
            option_bind();
            tooltip_bind();
        });
    });
    $("body").on("click", ".fast_titles_table .option", () => {
        setTimeout(() => {
            GAME.maploaded = false;
            GAME.prepareMap();
        }, 300);
    });
    $("body").on("click", `.qlink.manage_auto_abyss`, () => {
        if (!this.auto_abyss) {
            this.auto_abyss = true;
            $(".qlink.manage_auto_abyss").addClass("kws_active_icon");
            this.auto_abyss_interval = setInterval(() => {
                this.manageAutoAbyss();
            }, 5000);
        } else {
            this.auto_abyss = false;
            $(".qlink.manage_auto_abyss").removeClass("kws_active_icon");
            clearInterval(this.auto_abyss_interval);
        }
    });
    $("body").on("click", `.qlink.manage_auto_arena`, () => {
        if (!this.auto_arena) {
            this.auto_arena = true;
            $(".qlink.manage_auto_arena").addClass("kws_active_icon");
            this.manageAutoArena();
        } else {
            this.stopAutoArena();
        }
    });
    $("body").on("click", `.qlink.manage_autoExpeditions`, () => {
        this.manageAutoExpeditions();
    });
    $("body").on("click", `#secondary_char_stats .activities`, (event) => {
        GAME.socket.emit('ga', {
            a: 49,
            type: 0
        });
        setTimeout(() => {
            this.collectActivities();
        }, 1000);
    });
    $("body").on("click", `#secondary_char_stats .instance`, () => {
        GAME.socket.emit('ga', {
            a: 44,
            type: 0
        });
        setTimeout(() => {
            $("#page_game_emp .newBtn.do_all_instances").eq(0).click();
        }, 1000);
    });
    $("body").on("click", `#page_game_ekw .ekw_bck .ekw_slot`, (e) => {
        let slot = $(e.target).closest(".ekw_slot").attr("id");
        let slot_number = slot.replace(/[^0-9]/g, "");
        GAME.socket.emit('ga', {
            a: 12,
            type: 4,
            slot: slot_number,
            page: GAME.ekw_page,
            page2: GAME.ekw_page2
        });
    });
    $("body").on("change", "#minimap_side", (el) => {
        let value = parseInt($(el.target).val());
        if (value == 0) {
            $("#minimap_con").css({
                "right": "-5px",
                "left": "unset"
            });
        } else if (value == 1) {
            $("#minimap_con").css({
                "left": "-4px",
                "right": "unset"
            });
        } else if (value == 2) {
            $("#minimap_con").css({
                "left": "-210px",
                "right": "unset"
            });
        }
        this.minimap.side = value;
        this.manageMinimapSettings("save");
    });
    $("#minimap_range").on("input", (el) => {
        let value = parseInt($(el.target).val());
        $("#minimap_con").css({
            "opacity": value / 100
        });
        this.minimap.opacity = value;
        this.manageMinimapSettings("save");
    }).mouseup((el) => {
        let value = parseInt($(el.target).val());
        $("#minimap_con").css({
            "opacity": value / 100
        });
    });
    $("body").on("change", "#kws_sh_locInfo", (el) => {
        let value = parseInt($(el.target).val());
        if (value == 1) {
            $("#kws_locInfo").css({
                "display": "block"
            });
        } else {
            $("#kws_locInfo").css({
                "display": "none"
            });
        }
        this.minimap.loc_info = value;
        this.manageMinimapSettings("save");
    });
    $("body").on("change", "#kws_hidePilot", (el) => {
        let value = parseInt($(el.target).val());
        this.managePilot("set", value);
    });
    $("body").on("click", `.kws_mapsize_change`, () => {
        let width = parseInt($(`input[name="kws_map_width"]`).val());
        let height = parseInt($(`input[name="kws_map_height"]`).val());
        if (width && height) {
            this.manageMapSize("change", [width, height]);
        }
    });
    $("body").on("click", `.kws_mapsize_reset`, () => {
        this.manageMapSize("reset")
    });
    $("body").on("click", `.kws_change_website_bg`, () => {
        let url = $("#new_website_bg").val();
        this.manageWebsiteBackground("set", url);
    });
    $("body").on("click", `.kws_reset_website_bg`, () => {
        this.manageWebsiteBackground("reset");
    });
    $("body").on("click", `[data-option="map_multi_pvp"]`, () => {
        this.pvpKill();
    });
    $("body").on("click", `[data-option="map_quest_skip"]`, () => {
        this.questProceed();
        kom_clear();
    });
    $("body").on("click", `[data-option="map_quest_skip_time"]`, () => {
        this.useCompressor();
    });
    $("body").on("click", `[data-option="map_alternative_pilot"]`, () => {
        this.createAlternativePilot();
    });
    $("body").on("click", `[data-option="fight_champ"]`, () => {
        this.killChamp();
    });
    $("body").on("click", `[data-option="fight_elite"]`, () => {
        console.log("kill elite clicked");
        this.killElite();
    });
    $("body").on("click", `[data-option="fight_boss"]`, () => {
        this.killBoss();
    });
    $(document).keydown((event) => {
        if (!$("input, textarea").is(":focus")) {
            if (event.key === "x" || event.key === "X") {
                this.questProceed();
                kom_clear();
            } else if (event.key === "b" || event.key === "B") {
                this.pvpKill();
            } else if (event.key === "n" || event.key === "N") {
                this.useCompressor();
            } else if (event.key === "1") {
                GAME.socket.emit('ga', {
                    a: 22,
                    type: 7,
                    id: GAME.quest_action_qid,
                    cnt: GAME.quest_action_max
                });
            } else if (event.key === "2") {
                this.killChamp()
            } else if (event.key === "3") {
                this.killElite()
            } else if (event.key === "4") {
                this.killBoss();
            } else if (event.key === "5") {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 54,
                        type: 0
                    });
                }, 300);
                setTimeout(() => {
                    this.vip();
                }, 600);
                GAME.socket.emit('ga', {
                    a: 15,
                    type: 7
                });
            } else if (event.key === "6") {
                GAME.socket.emit('ga', {
                    a: 39,
                    type: 46,
                    rent: 3
                });
            } else if (event.key === "7") {
                GAME.socket.emit('ga', {
                    a: 10,
                    type: 2,
                    ct: 0
                });
            } else if (event.key === "8") {
                let set = $("#ekw_sets").find(".option.ek_sets_all" + ":not(.current)").attr("data-set");
                if (set != undefined) {
                    GAME.socket.emit('ga', {
                        a: 64,
                        type: 2,
                        set: set
                    });
                }
            } else if (event.key === "=") {
                this.createAlternativePilot();
            } else if (event.key === ",") {
                this.goToPreviousChar();
            } else if (event.key === ".") {
                this.goToNextChar();
            } else if (event.key === "9" && JQS.qcc.is(":visible")) { }
        }
    });
    $("body").on("click", ".qlink.load_afo", () => {
        if (typeof this.afo_is_loaded == 'undefined') {
            this.afo_is_loaded = true;
            $.get("https://raw.githubusercontent.com/SWAssistant1/SWAssistant/" + (window.__SWA_BRANCH__ || 'main') + "/game-scripts/afo-panel.js?t=" + Date.now(), (data) => {
                $("body").append(`<script>${data}<\/script>`);
                GAME.komunikat("załadowano afo!");
            }).fail(() => {
                this.afo_is_loaded = undefined;
                GAME.komunikat("Wystąpił błąd w ładowaniu skryptu, odśwież stronę i spróbuj ponownie!");
            });
        } else if ($("#main_Panel").length) {
            $("#main_Panel").show();
        } else {
            GAME.komunikat("Wystąpił błąd w ładowaniu skryptu, odśwież stronę i spróbuj ponownie!");
        }
    });

    $("body").on("click", ".qlink.go_to_emp", (el) => {
        let emp = parseInt($(el.target).attr("emp"));
        GAME.socket.emit('ga', {
            a: 50,
            type: 5,
            e: emp
        });
    });
    $("#kws_spawn").draggable({
        handle: ".sekcja"
    });
    $('.spawn_switch').on('click', function () {
        $("#kws_spawn2").toggle();
    });
    $("#kws_spawn input[type=checkbox], input[type=text]").change((chb) => {
        switch ($(chb.target).attr("name")) {
            case "ignoreMobs":
                GAME.spawner[1] = $('#kws_spawn input[name="ignoreMobs"]').map((index, element) => {
                    return element.checked ? 1 : 0;
                }).get();
                break;
            case "usePaToSpawn":
                this.updatePaToSpawn($(chb.target).val());
                break;
        }
    });
    // $("#secondary_char_stats").append(` <div class="instance" data-toggle="tooltip" data-original-title="<div class=tt>Instancje <br /><span class=&quot;red&quot;><b>Kliknij by wykonać instancje</b></span></div>" class=""><i class="ico a11"></i> <span> <ul><ul/></span></div> <div class="activities" data-toggle="tooltip" data-original-title="<div class=tt>Aktywności <br /><span class=&quot;red&quot;><b>Kliknij by odebrać aktywności</b></span></div>" class=""><i class="ico a12"></i> <span> <ul><ul/></span></div>`);
    $("body").on('change', '.autoExpeCodes input[type=checkbox]', (el) => {
        let name = $(el.target).attr("name");
        if (name === 'aeCodes') {
            this.settings.aeCodes = $(el.target).is(':checked') ? true : false;
        }
        this.updateSettings();
    });
    $("body").on("click", `.quest_roll1.option`, () => {
        var id = parseInt($(".quest_roll.option").attr("data-qb_id"));
        if (roll1) {
            roll1 = false;
        } else {
            roll1 = true;
            GAME.socket.emit('ga', {
                a: 22,
                type: 1,
                id: id
            });
        }
    });
    $("body").on("click", `.quest_roll2.option`, () => {
        var id = parseInt($(".quest_roll.option").attr("data-qb_id"));
        if (roll2) {
            roll2 = false
        } else {
            roll2 = true;
            GAME.socket.emit('ga', {
                a: 22,
                type: 1,
                id: id
            });
        }
    });
    $("body").on("click", `.quest_roll3.option`, () => {
        var id = parseInt($(".quest_roll.option").attr("data-qb_id"));
        if (roll3) {
            roll3 = false;
        } else {
            roll3 = true;
            GAME.socket.emit('ga', {
                a: 22,
                type: 1,
                id: id
            });
        }
    });
};

}
