var Assistant = window.Assistant;
Assistant.prototype.activateAllClanBuffs = function () {
    let abut = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`);
    let isDisabled = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`).parents("tr").hasClass("disabled");
    let cpbt = $("#clan_planet_buffs").html();
    let acpbut = $("#has_clan_planet").find(`button[data-option="activate_prp_buff"]`);
    if (abut.length && !isDisabled) {
        GAME.socket.emit('ga', {
            a: 39,
            type: 26
        });
        setTimeout(() => {
            this.activateAllClanBuffs();
        }, 200);
    } else if (cpbt == 0) {
        GAME.socket.emit('ga', {
            a: 39,
            type: 28
        });
        setTimeout(() => {
            this.activateAllClanBuffs();
        }, 200);
    } else if (acpbut.length && $("#clan_planet_buffs .red").eq(0).text() == 0) {
        GAME.socket.emit('ga', {
            a: 39,
            type: 29
        });
        setTimeout(() => {
            this.activateAllClanBuffs();
        }, 200);
    } else {
        GAME.komunikat("Wszystkie buffy zostały aktywowane!");
    }
};

Assistant.prototype.parseMapInfo = function (quests) {
    let mapInfo = Object.values(quests).filter(this.filterQuests);
    let mapSK = Object.keys(GAME.map_balls) ? Object.keys(GAME.map_balls).length : 0;
    $(`#swa_locInfo .content`).html(`Zadania: ${mapInfo.length}<br>SK: ${mapSK}`);
};

Assistant.prototype.filterQuests = function (quest) {
    let steps = quest.length;
    if (steps > 0 && quest[steps - 1] && quest[steps - 1].end != 1) {
        return quest;
    }
};

Assistant.prototype.setWebsiteBackground = function () {
    if (localStorage.getItem('swa_wbg')) {
        $("body").css({
            "background": "#02070D",
            "background-image": `url(${localStorage.getItem('swa_wbg')})`,
            "background-size": "cover",
            "background-attachment": "fixed"
        });
        $("#new_website_bg").val(localStorage.getItem('swa_wbg'));
        $("footer").addClass("hide_before");
    }
};

Assistant.prototype.manageWebsiteBackground = function (act, url) {
    if (act == "set") {
        if (url.length > 5) {
            localStorage.setItem('swa_wbg', url);
            $("body").css({
                "background": "#02070D",
                "background-image": `url(${url})`,
                "background-size": "cover",
                "background-attachment": "fixed"
            });
            $("footer").addClass("hide_before");
        }
    } else if (act == "reset") {
        localStorage.removeItem("swa_wbg");
        $("#new_website_bg").val("");
        $("body").css({
            "background": "#02070D",
            "background-image": `url(/gfx/layout/bg.jpg)`,
            "background-size": "cover",
            "background-attachment": "fixed"
        });
        $("footer").removeClass("hide_before");
    }
};

Assistant.prototype.getTitlesList = function (cb) {
    GAME.socket.emit('ga', {
        a: 42,
        type: 9
    });
    JQS.ldr.finish().fadeIn();
    let wait_for_titles = setInterval(() => {
        let html = $("#char_titles").html();
        if (html.length) {
            clearInterval(wait_for_titles);
            cb(html);
        }
    }, 100);
};

Assistant.prototype.vip = function () {
    var month = $("#monthly_vip_rewards").find(".vip_cat.option" + ":not(.disabled)" + ":not(.received)");
    var general = $("#general_vip_rewards").find(".vip_cat.option" + ":not(.disabled)" + ":not(.received)");
    var id, lvl;
    if (month.length) {
        id = parseInt(month.attr("data-vip"));
        lvl = parseInt(month.attr("data-level"));
        GAME.socket.emit('ga', {
            a: 54,
            type: 1,
            vip: id,
            level: lvl
        });
        setTimeout(() => {
            this.vip();
        }, 500);
    } else if (general.length) {
        id = parseInt(general.attr("data-vip"));
        lvl = parseInt(general.attr("data-level"));
        GAME.socket.emit('ga', {
            a: 54,
            type: 1,
            vip: id,
            level: lvl
        });
        setTimeout(() => {
            this.vip();
        }, 500);
    } else {
        GAME.komunikat("Odebrano wszystkie możliwe nagrody z Vipa!!!");
    }
};

Assistant.prototype.bless = function () {
    GAME.socket.emit('ga', {
        a: 14,
        type: 3
    });
    setTimeout(() => {
        var arr = $.map($('.use_buff:checked'), function (e) {
            return +e.value;
        });
        var btype = $('input[name="bless_type"]:checked').val();
        GAME.socket.emit('ga', {
            a: 14,
            type: 5,
            buffs: arr,
            players: $('#bless_players').val(),
            btype: btype
        });
    }, 500);
};

Assistant.prototype.questProceed = function () {
    if (JQS.qcc.is(":visible")) {
        if ($("button[data-option=finish_quest]").length === 1) {
            let qb_id = $("button[data-option=finish_quest]").attr("data-qb_id");
            GAME.socket.emit('ga', {
                a: 22,
                type: 2,
                button: 1,
                id: qb_id
            });
        } else if ($("button[data-option=quest_riddle]").is(":visible")) {
            let qb_id = $("button[data-option=quest_riddle]").attr("data-qid");
            GAME.socket.emit('ga', {
                a: 22,
                type: 7,
                id: qb_id,
                ans: $('#quest_riddle').val()
            });
        } else if ($("button[data-option=quest_duel]").is(":visible")) {
            let fb_id = $("button[data-option=quest_duel]").attr("data-qid");
            GAME.socket.emit('ga', {
                a: 22,
                type: 6,
                id: fb_id
            });
        } else if ($(".quest_win .sekcja").text().toLowerCase() === "nuda" && $("button[data-option=finish_quest]").length === 3) {
            let qb_id = $("button[data-option=finish_quest]").attr("data-qb_id");
            GAME.socket.emit('ga', {
                a: 22,
                type: 2,
                button: 2,
                id: qb_id
            });
        } else if ($(".quest_win .sekcja").text().toLowerCase() === "zadanie substancji" && $("button[data-option=finish_quest]").length === 3) {
            let qb_id = $("button[data-option=finish_quest]").attr("data-qb_id");
            GAME.socket.emit('ga', {
                a: 22,
                type: 2,
                button: 3,
                id: qb_id
            });
        } else if ($("button[data-option=finish_quest]").length === 2 && $("button[data-option=finish_quest]").eq(1).html() === "Mam dość tej studni") {
            let qb_id = $("button[data-option=finish_quest]").eq(1).attr("data-qb_id");
            GAME.socket.emit('ga', {
                a: 22,
                type: 2,
                button: 2,
                id: qb_id
            });
        } else if ($("#field_opts_con .sekcja").html() == "Zasoby") {
            let qb_id = $("#field_opts_con .field_option").find("[data-option=start_mine]").attr("data-mid");
            GAME.socket.emit('ga', {
                a: 22,
                type: 8,
                mid: qb_id
            });
        }
        setTimeout(() => {
            $('#fight_view').fadeOut();
        }, 500);
        kom_clear();
    } else if ($("button[data-option=start_mine]").length >= 1) {
        let mineID = parseInt($("button[data-option=start_mine]").attr("data-mid"));
        GAME.socket.emit('ga', {
            a: 22,
            type: 8,
            mid: mineID
        });
    }
};

Assistant.prototype.check_act = function () {
    let recived = $("#act_prizes").find("div.act_prize.disabled").length;
    let points = $('#char_activity').text();
    if (points >= 25 && recived < 1) {
        return true;
    } else if (points >= 50 && recived < 2) {
        return true;
    } else if (points >= 75 && recived < 3) {
        return true;
    } else if (points >= 100 && recived < 4) {
        return true;
    } else if (points >= 150 && recived < 5) {
        return true;
    } else {
        return false;
    }
};

Assistant.prototype.spawnList = function () {
    let mob = "";
    for (var i = 0; i < 6; i++) {
        mob += `<div class="spawn_row"><div class="newCheckbox"><input id="swa_spawner_ignore_${i}" type="checkbox" class="swa_spawner_check" name="ignoreMobs" value="${i}" ${(GAME.spawner && GAME.spawner[1][i] ? 'checked' : '')} /><label for="swa_spawner_ignore_${i}"></label></div>${LNG.lab457}&nbsp;<b>${LNG['mob_rank' + i]}</b></div>`;
    }
    mob += `<div class="spawn_row" style="flex-direction: column;align-items: center;"><div>Użyte PA na spawn</div><div class="game_input small"><input id="swa_pa_max" name="usePaToSpawn" type="text" value="1000"></div></div>`;
    return mob;
};

Assistant.prototype.updatePaToSpawn = function (pats) {
    let pa = parseInt(pats);
    if (!pa || pa <= 0 || pa > 1000 || pa != pats) {
        pa = 1000;
        $("#swa_spawn input[name=usePaToSpawn]").val(pa);
    }
    GAME.spawner[0] = pa;
};

Assistant.prototype.calcLVL = function (exp) {
    let lvls_gained = 0;
    let clvl = GAME.char_data.level;
    let cexp = GAME.char_data.exp + exp;
    let next = GAME.nextLevelExp(clvl, GAME.char_data.reborn);
    if (GAME.char_data.reborn >= 2) {
        while (cexp >= next && clvl < 100000) {
            clvl++;
            lvls_gained++;
            cexp -= next;
            next = GAME.nextLevelExp(clvl, GAME.char_data.reborn);
        }
    } else {
        while (cexp >= next && clvl < 1250) {
            clvl++;
            lvls_gained++;
            next = GAME.nextLevelExp(clvl, GAME.char_data.reborn);
        }
    }
    return `<b class="orange">[~${lvls_gained} lvl'i]</b>`;
};

Assistant.prototype.handleSockets = function (res) {
    const mouseOverEvent = new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    const mouseOutEvent = new MouseEvent('mouseout', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    switch (res.a) {
        case 7: //?? PvP fight result?
            if (!this.stopped) {
                if("result" in res && res.result && "reward" in res.result && res.result.reward && "arena_exp" in res.result.reward && res.result.reward.arena_exp && res.result.result === 1) {
                    this.arena_count();
                } else if ("result" in res && res.result && "reward" in res.result && res.result.reward && "empire_war" in res.result.reward && res.result.reward.empire_war && res.result.result === 1) {
                    this.pvp_count();
                } else {
                    break;
                }
            } else {
                break;
            }
            // falls through
        case 57: //Tournament related
            if(res.tours) {
                if (res.a === 57 && res.tours) {
                    const foundCatObject = res.tours.find(tour => tour.cat === this.tournamentCategory);
                    if (foundCatObject) {
                        this.newTournamentID = foundCatObject.id;
                    }
                }
        
            } else {
                break;
            }
            // falls through
        case 12:
            var item;
            console.log(res);
            if (res.ekw) {
                for (var i = 0; i < res.ekw.length; i++) {
                    console.log(res.ekw[i].id, this.item_id);
                    if (res.ekw[i].id == this.item_id) {
                        console.log("item found");
                        item = document.querySelector('.player_ekw_item[data-item_id="'+ this.item_id +'"]')
                        item.dispatchEvent(mouseOverEvent);
                        break;
                    }
                }
                break;
            }
            if (res.tip_id) {
                    item = document.querySelector('.player_ekw_item[data-item_id="'+ this.item_id +'"]')
                    item.dispatchEvent(mouseOutEvent);

                    if (res.tip_id == this.item_id) {
                        console.log("item  ",this.item_jakosc, this.item_poziom);
                        if (this.item_jakosc) {
                            console.log("jakosc ", res.item.quality, this.item_jakosc_cap);
                            if (res.item.quality >= this.item_jakosc_cap) {
                                console.log("jakosc git")
                                this.item_jakosc = false;
                                clearInterval(this.RerollItem);
                                $(".item_jakosc .item_status").removeClass("green").addClass("red").html("Off");
                            } else {
                                window.setTimeout(this.RerollItem,100);
                            }
                        }
                        if (this.item_poziom) {
                            console.log("poziom ", res.item.upgrade, this.item_poziom_cap);
                            if (res.item.upgrade >= this.item_poziom_cap ) {
                                console.log("poziom git")
                                $(".item_poziom .item_jakosc").removeClass("green").addClass("red").html("Off");
                                clearInterval(this.UpgradeItem);
                                this.item_poziom = false;
                            } else {
                                window.setTimeout(this.UpgradeItem,100);
                            }
                        }

                        console.log("item found ", res.item.quality, res.item.upgrade);
                    }
                break;
            }
            // falls through
        default:
            break;
    }
};

Assistant.prototype.RerollItem = function () {
    console.log("rerol item", this.item_jakosc);
    reroll_item();
    window.setTimeout(function() {
        $('[data-option="rer2_item"]').click();
    }, 300);
};

Assistant.prototype.UpgradeItem = function () {
    console.log("up item", this.item_poziom);
    upgrade_item();
    window.setTimeout(function() {
        $('[data-option="upg2_item"]').click();
    }, 400);
};

