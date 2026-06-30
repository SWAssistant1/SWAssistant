var Assistant = window.Assistant;
const assistant = new Assistant(swaLocalCharacters);
GAME.komunikat2 = function (kom) {
    if (this.koms.indexOf(kom) == -1) {
        if (this.komc > 50) this.komc = 40;
        var ind = this.koms.push(kom) - 1;
        JQS.kcc.append(`<div class="kom" style="top:130px; width:480px;"><div class="close_kom" data-ind="${ind}"><b>X</b></div><div class="content">${kom}</div></div>`);
        this.komc++;
        kom_close_bind();
    }
}
$("body").off("click.swaKomClose").on("click.swaKomClose", ".kom .close_kom", function() {
    $(this).closest(".kom").remove();
});
GAME.cached_data = function () {
    var pos = $('#char_buffs').offset();
    pos.left -= 75;
    pos.top -= 75;
    this.char_buffs_pos = pos;
    if (GAME.char_id != 0 && GAME.quick_opts.online_reward) {
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 26,
                type: 1
            });
            setTimeout(() => {
                $('#daily_reward').fadeOut();
                kom_clear();
            }, 400);
        }, 1800);
    }
    setTimeout(() => {
        if (GAME.emp_wars.length < 3 && GAME.quick_opts.empire) {
            setTimeout(() => {
                assistant.wojny2();
            }, 300);
        }
    }, 1500);
    GAME.startLevel = GAME.char_data.level;
    GAME.startTime = Date.now();
    setTimeout(() => {
        if (GAME.char_data.planetary == 0) {
            setTimeout(() => {
                GAME.socket.emit('ga', {
                    a: 39,
                    type: 34
                });
            }, 300);
        }
    }, 1200);
    const emitCalls = [{
        a: 33,
        type: 0
    }, {
        a: 49,
        type: 0
    }, {
        a: 29,
        type: 0
    }, {
        a: 22,
        type: 3
    },];
    let cd = [300, 600, 900, 1200];
    emitCalls.forEach((data, i) => {
        setTimeout(() => {
            GAME.socket.emit('ga', data);
        }, cd[i]);
    });
    $('#train_uptime').html(GAME.showTimer(GAME.char_data.train_ucd - GAME.getTime()));
    setTimeout(() => {
        if (assistant.check_act()) {
            $("#secondary_char_stats .activities").click();
        }
    }, 1200);
    GAME.parseQuickOpts(1);
    assistant.workers_info = [false, false];
    arena_count = 0;
    pvp_count = 0;
    setTimeout(() => {
        if ((GAME.char_data.reborn == 4 || GAME.char_data.reborn == 5) && GAME.char_data.alt_transform_expiry < GAME.getTime()) {
            GAME.socket.emit('ga', {
                a: 18,
                type: 8,
                tech_id: 134
            });
        }
    }, 5300);
}
GAME.parseQuickOpts = function (newq_bar = false) {
    var opts = '';
    if (this.quick_opts.tutorial) {
        this.tutorials = this.quick_opts.tutorial;
        opts += `<img id="open_tuts" src="/gfx/layout/helper.png" class="qlink2 option" data-option="open_tuts" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab358}</div>" />`;
        $.getJSON('/json/tutorial.json', function (json) {
            GAME.tutorial_data = json.tuts;
            GAME.checkTutorial();
        });
    }
    if (this.quick_opts.teleport) opts += `<div class="option qlink tele" data-option="use_teleport" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab140}</div>"></div>`;
    if (this.quick_opts.travel) opts += `<div class="option qlink trav" data-option="use_travel" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab141}</div>"></div>`;
    if (this.quick_opts.ssj) {
        opts += `<div class="option qlink ssj${this.quick_opts.ssj[0] == "116" ? "_uio" : this.quick_opts.ssj[1]} show_qat" data-option="use_transform" data-tech="${this.quick_opts.ssj[0]}"data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab139}</div>"></div>`;
        opts += `<div id="quick_allTransformations"></div>`;
    }
    if (this.quick_opts.online_reward) opts += `<div class="option qlink dail" data-option="daily_reward" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab176}</div>"></div>`;
    if (this.quick_opts.bless) opts += `<div class="select_page qlink bles" data-page="game_buffs" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab188}</div>"></div>`;
    if (this.quick_opts.sub && this.quick_opts.sub.length) opts += `<div class="option qlink subs" data-option="quick_use_subs" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab189}</div>"></div>`;
    if (this.quick_opts.senzus && this.quick_opts.senzus.length) {
        opts += `<div class="option qlink senz" data-option="quick_use_senzu" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab190}</div>"></div>`;
    }
    if (newq_bar || GAME.char_id) {
        opts += '<br>';
    
        opts += `<div class="qlink get_titles_list" style="filter:hue-rotate(168deg);background-image: url('https://i.imgur.com/0eQCqBl.png');" data-toggle="tooltip" data-original-title="<div class=tt>Zmień tytuł</div>"></div>`;
        opts += `<div class="qlink load_afo" style="filter:hue-rotate(168deg);background-image: url('https://i.imgur.com/P8sJgQz.png');" data-toggle="tooltip" data-original-title="<div class=tt>Załaduj AFO</div>"></div>`;
        opts += `<div class="qlink sideIcons manage_auto_abyss${assistant.auto_abyss ? ' swa_active_icon' : ''}" style="filter:hue-rotate(168deg);background-image: url('https://i.imgur.com/j5eQv2B.png');display:block;top:-136px;position:absolute;" data-toggle="tooltip" data-original-title="<div class=tt>[Włącz / Wyłącz] Atakowanie Otchłani</div>"></div>`;
        opts += `<div class="qlink sideIcons manage_auto_arena${assistant.auto_arena ? ' swa_active_icon' : ''}" style="filter:hue-rotate(168deg);background-image: url('https://i.imgur.com/rAroNzD.png');display:block;top:-104px;position:absolute;" data-toggle="tooltip" data-original-title="<div class=tt>[Włącz / Wyłącz] Atakowanie na Arenie</div>"></div>`;
    }
    $('#quick_bar').html(opts);

    option_bind();
    tooltip_bind();
    page_bind();
}
GAME.swa_quest_locs = GAME.swa_quest_locs || {};
var swa_orig_parseData = GAME.parseData;
GAME.parseData = function (type, res) {
    var ret = swa_orig_parseData.apply(this, arguments);
    if (type == 32 && res.qb) {
        var qbLen = res.qb.length;
        var gotNew = false;
        for (var qi = 0; qi < qbLen; qi++) {
            if (res.qb[qi].sd && res.qb[qi].sd.loc) {
                GAME.swa_quest_locs[res.qb[qi].id] = {
                    loc: res.qb[qi].sd.loc,
                    loc_name: res.qb[qi].sd.loc_name
                };
                gotNew = true;
            }
        }
        if (gotNew && GAME.swa_last_track) GAME.parseTracker(GAME.swa_last_track);
    }
    if (type == 5 && GAME.swa_last_track) GAME.parseTracker(GAME.swa_last_track);
    return ret;
};
GAME.parseTracker = function (track) {
    var con='';
    var localQuestIds={};
    this.swa_last_track=track;
    if(this.map_quests){
        for(var key in this.map_quests){
            if(Object.prototype.hasOwnProperty.call(this.map_quests,key)){
                var arr=this.map_quests[key];
                if(arr){
                    for(var j=0;j<arr.length;j++){
                        if(arr[j]&&arr[j].qb_id) localQuestIds[arr[j].qb_id]=true;
                    }
                }
            }
        }
    }
    var hereRanks={};
    var locEntry=null;
    if(this.worldData){
        for(var w=0;w<this.worldData.length;w++){
            if(this.worldData[w].id==this.char_data.loc){ locEntry=this.worldData[w]; break; }
        }
    }
    if(locEntry&&locEntry.mobs){
        for(var m=0;m<locEntry.mobs.length;m++){
            if(locEntry.mobs[m]&&locEntry.mobs[m].rank) hereRanks[locEntry.mobs[m].rank]=true;
        }
    }
    var hasNormalHere=false;
    if(this.field_mobs){
        for(var fm=0;fm<this.field_mobs.length;fm++){
            var fmEntry=this.field_mobs[fm];
            if(!fmEntry) continue;
            var fr=fmEntry.custom_rank;
            if(fr) hereRanks[fr]=true;
            else hasNormalHere=true;
        }
    }
    if(track&&track.length){
        var len=track.length;
        con+='<div class="sekcja">'+LNG.lab181+'</div>';
        for(var i=0;i<len;i++){
            var qn=track[i].header;
            if(qn&&qn.length>20) qn=qn.slice(0,20)+'...';
            var wantHtml=this.quest_want(track[i].want,track[i].qb_id);
            var wantText=wantHtml.replace(/<[^>]*>/g,'').toLowerCase();
            var isHere=!!localQuestIds[track[i].qb_id];
            if(!isHere&&hasNormalHere&&wantText.indexOf('normal')!==-1) isHere=true;
            if(!isHere){
                for(var r in hereRanks){
                    var rankName=LNG['mob_rank'+r];
                    if(rankName&&wantText.indexOf(rankName.toLowerCase())!==-1){ isHere=true; break; }
                }
            }
            var hereCls=isHere?' swa_quest_here':'';
            var qloc=this.swa_quest_locs[track[i].qb_id];
            var goBtn=qloc?' <i class="upgrade_icon tpp option swa_quest_goto" data-option="quick_travel" data-loc="'+qloc.loc+'" data-toggle="tooltip" data-original-title="<div class=tt>'+qloc.loc_name+'</div>"></i>':'';
            con+='<div id="track_quest_'+track[i].qb_id+'" class="qtrack'+hereCls+'"><div class="sep2"></div><b>'+qn+'</b>'+goBtn+' '+wantHtml+'</div>';
        }
    }
    con+='<div class="clr"></div>';
    $('#quest_track_con').html(con);
    option_bind();
    tooltip_bind();
}

GAME.endQuest = function (quest_end) {
    JQS.qcc.hide();
    $('#field_q_' + quest_end).fadeOut();
    for (var ind in this.map_quests) {
        if (Object.prototype.hasOwnProperty.call(this.map_quests, ind)) {
            var len = this.map_quests[ind].length;
            for (var i = 0; i < len; i++) {
                if (this.map_quests[ind][i].qb_id == quest_end) {
                    this.map_quests[ind][i].end = 1;
                }
            }
        }
    }
    if (GAME.map_quests) {
        assistant.parseMapInfo(GAME.map_quests, "GAME.endQuest");
    }
};
GAME.moveQuest = function (quest_move) {
    if (this.char_data.loc == quest_move.loc) {
        JQS.qcc.hide();
        $('#field_q_' + quest_move.qb_id).fadeOut();
        for (var ind in this.map_quests) {
            if (Object.prototype.hasOwnProperty.call(this.map_quests, ind)) {
                var len = this.map_quests[ind].length;
                for (var i = 0; i < len; i++) {
                    if (this.map_quests[ind][i].qb_id == quest_move.qb_id) {
                        this.map_quests[ind][i].move = {
                            new_x: quest_move.x,
                            new_y: quest_move.y,
                            start: this.getmTime(),
                            duration: 300
                        };
                    }
                }
            }
        }
        if (GAME.map_quests) {
            assistant.parseMapInfo(GAME.map_quests, "GAME.moveQuest");
        }
    } else this.endQuest(quest_move.qb_id);
};
GAME.parseLocBons = function (loc_data) {
    assistant.parseMapInfo(GAME.map_quests, "GAME.parseLocBons");
    var bons = '';
    if (loc_data.bonus_tren) bons += '<img src="/gfx/icons/loc_bon/tren.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_tren + '</b>' + LNG.item_stat15 + '</div>" />';
    if (loc_data.bonus_exp) bons += '<img src="/gfx/icons/loc_bon/exp.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_exp + '</b>' + LNG.item_stat16 + '</div>" />';
    if (loc_data.bonus_mocc) bons += '<img src="/gfx/icons/loc_bon/mc.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_mocc + '</b>' + LNG.item_stat53 + '</div>" />';
    if (loc_data.bonus_mocv) bons += '<img src="/gfx/icons/loc_bon/mv.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_mocv + '</b>' + LNG.item_stat54 + '</div>" />';
    if (loc_data.bonus_legend) bons += '<img src="/gfx/icons/loc_bon/l.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_legend + '</b>' + LNG.item_stat74 + '</div>" />';
    if (loc_data.bonus_psk) bons += '<img src="/gfx/icons/loc_bon/p.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_psk + '</b>' + LNG.item_stat67 + '</div>" />';
    if (loc_data.bonus_senzu) bons += '<img src="/gfx/icons/loc_bon/s.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_senzu + '</b>' + LNG.item_stat78 + '</div>" />';
    return bons;
};
GAME.emit = function (order, data, force) {
    if (!this.is_loading || force) {
        this.load_start();
        this.socket.emit(order, data);
    } else if (this.debug) console.log('failed order', order, data);
};
GAME.emitOrder = function (data, force = false) {
    this.emit('ga', data, force);
};
GAME.initiate = function () {
    $('#player_login').text(this.login);
    $('#game_win').show();
    if (this.char_id == 0 && this.pid > 0) {
        this.emitOrder({
            a: 1
        });
    }
    var len = this.servers.length,
        con = '';
    for (var i = 0; i < len; i++) {
        con += '<option value="' + this.servers[i] + '">' + LNG['server' + this.servers[i]] + '</option>';
    }
    $('#available_servers').html(con);
    $('#available_servers option[value=' + this.server + ']').prop('selected', true);
};
new ballManager();

// game.js already called the original GAME.parseQuickOpts once during its
// own init, before this override (with the load_afo button) was attached.
// Re-render the quick bar so the button shows up without needing a
// character switch to trigger another render. GAME.char_id/quick_opts
// timing relative to this script loading isn't guaranteed, so retry a
// few times instead of relying on a single immediate call.
(function ensureAfoButton(attempt) {
    if ($('#quick_bar .qlink.load_afo').length) return;
    if (GAME.char_id && GAME.quick_opts) {
        GAME.parseQuickOpts();
    }
    if (attempt < 10) {
        setTimeout(() => ensureAfoButton(attempt + 1), 500);
    }
})(0);

var adimp = false;
var arena_count = 0;
var pvp_count = 0;
var roll2 = false;
var roll1 = false;
var roll3 = false;
var version = '1.0.0';
