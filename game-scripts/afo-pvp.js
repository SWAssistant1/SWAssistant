if (typeof GAME === 'undefined') {} else {
function pvp_option_bind(){
    $('.poption').off('click').on('click',function(){
        var th=$(this);
        if(th.is(':disabled')) return false;
        th.tooltip('hide');
        var option=th.data('option');
        switch(option){
            case 'show_player':
                GAME.emitOrder({a:34,type:0,char_id:th.data('char_id')});
            break;
            case 'show_clan':
                var klan_id=parseInt(th.data('klan_id'));
                GAME.emitOrder({a:40,klan_id:klan_id});
            break;
            case 'pvp_attack':
                GAME.emitOrder({a:24,char_id:th.data('char_id'),quick:th.data('quick')});
            break;
            case 'gpvp_attack':
                GAME.emitOrder({a:24,type:1,char_id:th.data('char_id'),quick:th.data('quick')});
            break;
            case 'load_more_players':
                GAME.emitOrder({a:3,type:1,start:th.data('start_from'),vo:GAME.map_options.vo});
                $('.more_players').remove();
            break;
        }
    });
}

var PVP = {
    stop: true,
    wi: false,
    org: false,
    war_list: 0,
    war_cnt: 0,
    org_cnt: 0,
    emp : 0,
    wk: false,
    caseNumber: 0,
    wait_pvp: 10,
    wait_pvp2: 80,
    czekajpvp: 160,
    WSP: 50,
    licznik: 0,
    dogory: false,
    loc: 0,
    adimp: false,
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
    pvp_timeout:0,
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
    } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 7 && ((emp == 1 || emp == 3) && who_win)) {
        GAME.socket.emit('ga', {
            a: 50,
            type: 6,
            buff: buff_id
        });
        return true;
    } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 7 && ((emp == 2 || emp == 4) && !who_win)) {
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
    } else {}
};
PVP.action = () => {
    console.log("pvp action", PVP.caseNumber)
    switch (PVP.caseNumber) {
        case 0:
            PVP.caseNumber++;
            PVP.check_position_x();
            break;
        case 1:
            PVP.caseNumber++;
            PVP.check_position_y();
            break;
        case 2:
            PVP.caseNumber++;
            PVP.check();
            break;
        case 3:
            PVP.caseNumber++;
            PVP.check_players();
            break;
        case 4:
            PVP.caseNumber++;
            PVP.kill_players();
            break;
        case 5:
            PVP.caseNumber++;
            PVP.check_players2();
            break;
        case 6:
            PVP.caseNumber++;
            PVP.wojny1();
            break;
        case 7:
            PVP.caseNumber++;
            PVP.check_location();
            break;
        case 8:
            PVP.caseNumber++;
            PVP.check2();
            break;
        case 9:
            PVP.caseNumber++;
            PVP.check_players2();
            break;
        case 10:
            PVP.caseNumber++;
            PVP.dec_wars();
            break;
        case 11:
            PVP.caseNumber++;
            PVP.orgi();
            break;
        case 12: 
            PVP.caseNumber++;
            PVP.checkTimeout();
            break;
        case 13:
            PVP.caseNumber = 0;
            PVP.zmien_postc();
        default:
    }
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
    var enemy = $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)");
    PVP.kill_players1();
    window.setTimeout(PVP.start, PVP.czekajpvp / PVP.WSPP() * (enemy.length) * 2);
    PVP.licznik = 1;
};
PVP.kill_players = () => {
    var enemy = $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)");
    if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
        $("#player_list_con").find("[data-option=load_more_players]").click();
        window.setTimeout(PVP.kill_players, PVP.czekajpvp / PVP.WSPP());
    } else if (enemy.length == 0) {
        PVP.kill_players1();
        window.setTimeout(PVP.start, PVP.czekajpvp / PVP.WSPP() * (enemy.length) * 2);
    } else if (PVP.licznik < $("#player_list_con .player").length) {
        if ($("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-option").includes("gxxx")) {
            GAME.socket.emit('ga', {
                a: 24,
                type: 1,
                char_id: $("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-char_id"),
                quick: 1
            });
            console.log("kill ", $("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-char_id"));
            PVP.licznik++;
            window.setTimeout(PVP.kill_players, PVP.czekajpvp / PVP.WSPP());
        } else {
            GAME.socket.emit('ga', {
                a: 24,
                char_id: $("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-char_id"),
                quick: 1
            });
            console.log("kill ", $("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-char_id"));
            PVP.licznik++;
            window.setTimeout(PVP.kill_players, PVP.czekajpvp / PVP.WSPP());
        }
    } else {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        PVP.licznik = 0;
        kom_clear();
    } 
};
PVP.checkTimeout = () => {

    if (PVP.start_char !=0 || PVP.start_char-1 !=0) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }
        
        var enemy = $("#player_list_con").find(".player button" + "[data-quick=1]" + ".initial_hide_forced");
        if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
            $("#player_list_con").find("[data-option=load_more_players]").click();
            console.log("1");
            window.setTimeout(PVP.checkTimeout, PVP.czekajpvp / PVP.WSPP());
        }else if (enemy.length == 0) {
            window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP())
            console.log('2');
        }else if (PVP.licznik < $("#player_list_con .player").length) {
            if (PVP.pvp_timeout < parseInt($("#player_list_con .player").eq(PVP.licznik).find(".timer").attr("data-end")))
                PVP.pvp_timeout = parseInt($("#player_list_con .player").eq(PVP.licznik).find(".timer").attr("data-end"));
            PVP.licznik++;
            console.log("3 ", PVP.licznik, PVP.pvp_timeout);
            window.setTimeout(PVP.checkTimeout, PVP.wait_pvp / PVP.WSPP())
        } else {
            window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
            PVP.licznik = 0;
            kom_clear();
        }
    
}
PVP.kill_players1 = () => {
    if (!JQS.chm.is(":focus")) {
        var enemy = $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)");
        var bbb = $("#player_list_con").find(".player button" + "[data-option=gpvp_attack]" + "[data-quick=1]" + ":not(.initial_hide_forced)");
        var bbbb = parseInt(bbb.attr("data-char_id"));
        if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
            $("#player_list_con").find("[data-option=load_more_players]").click();
            window.setTimeout(PVP.kill_players1, 50);
        } else if (bbb.length > 0) {
            GAME.socket.emit('ga', {
                a: 24,
                type: 1,
                char_id: bbbb,
                quick: 1
            });
            window.setTimeout(PVP.kill_players1, 110);
        } else if (enemy.length > 0) {
            enemy.eq(0).click();
            window.setTimeout(PVP.kill_players1, 110);
            console.log("zabijanie ", enemy.length);
        } else {
            console.log("koniec wroguw", enemy.length);
            kom_clear();
        }
    }
};
PVP.check_imp = () => {
    var tab = [];
    for (var i = 0; i < 3; i++) {
        tab[i] = parseInt($("#empire_heroes .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
    }
    return tab;
};
PVP.check_imp2 = () => {
    var tab = [];
    for (var i = 0; i < 3; i++) {
        tab[i] = parseInt($("#empire_efrags .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
    }
    return tab;
};
PVP.wojny1 = () => {
    // if (PVP.wi) {
    //     var aimp = $("#e_admiral_player").find("[data-option=show_player]").attr("data-char_id");
    //     var imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
    //     if (!PVP.adimp) {
    //         // GAME.socket.emit('ga', {
    //         //     a: 50,
    //         //     type: 0,
    //         //     empire: GAME.char_data.empire
    //         // });
    //         PVP.adimp = true;
    //         window.setTimeout(PVP.wojny1, 500);
    //     } else if (!GAME.emp_enemies.includes(1) && ![GAME.char_data.empire].includes(1) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
    //         // GAME.socket.emit('ga', {
    //         //     a: 50,
    //         //     type: 7,
    //         //     target: 1
    //         // });
    //         window.setTimeout(PVP.wojny1, 500);
    //     } else if (!GAME.emp_enemies.includes(2) && ![GAME.char_data.empire].includes(2) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
    //         // GAME.socket.emit('ga', {
    //         //     a: 50,
    //         //     type: 7,
    //         //     target: 2
    //         // });
    //         window.setTimeout(PVP.wojny1, 500);
    //     } else if (!GAME.emp_enemies.includes(3) && ![GAME.char_data.empire].includes(3) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
    //         // GAME.socket.emit('ga', {
    //         //     a: 50,
    //         //     type: 7,
    //         //     target: 3
    //         // });
    //         window.setTimeout(PVP.wojny1, 500);
    //     } else if (!GAME.emp_enemies.includes(4) && ![GAME.char_data.empire].includes(4) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
    //         // GAME.socket.emit('ga', {
    //         //     a: 50,
    //         //     type: 7,
    //         //     target: 4
    //         // });
    //         window.setTimeout(PVP.wojny1, 500);
    //     } else {
    //         window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    //     }
    // } else {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
    // }
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
    console.log("PVP ", PVP.start_char, PVP.chars.length)
    if (PVP.start_char == PVP.chars.length) {
        
        console.log("PVP ", PVP.start_char, ((PVP.pvp_timeout-GAME.getTime()) * 1000))
        var charId = parseInt(PVP.chars[0]);
        GAME.emitOrder({ a: 2, char_id: charId });
        if (PVP.pvp_timeout > GAME.getTime()) {
            window.setTimeout(PVP.start, 1000);
            return;
        }
        PVP.start_char = 0;
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
        GAME.emitOrder({a:39,type:24,shorts:'Yuki'});
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
PVP.orgi = () => {
    console.log("org ", $("#pvp_Panel input[name=org_id]").val());
    if (!PVP.org) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }

    var org_id = 18;
    if ($("#pvp_Panel input[name=org_id]").val() != '')
        org_id = $("#pvp_Panel input[name=org_id]").val();
    setTimeout(() => {
        window.warx = document.getElementsByClassName("war_win")[PVP.org_cnt].getElementsByTagName("button")[0].getAttribute("data-war");
        GAME.emitOrder({a:50,type:13,war:warx,org:org_id});
        PVP.org_cnt +=1;
    }, 100);
    if (PVP.org_cnt > 8)
        PVP.org_cnt = 0;
    window.setTimeout(PVP.start, 300);
}
PVP.dec_wars = () => {
    console.log("dec wars");
    if (!PVP.wi) {
        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
        return;
    }
    console.log("dec wars ", PVP.war_cnt, PVP.org_cnt);
    if (PVP.war_cnt > 10)
        PVP.war_cnt = 0;

    if (PVP.war_cnt == PVP.emp)
        PVP.war_cnt++;

    PVP.wi = false;

    setTimeout(() => {
        console.log("emit order war");
        GAME.emitOrder({a:50,type:7,target:PVP.war_cnt});
        PVP.war_cnt +=1;
        PVP.wi = true;
    },602);

    if (PVP.war_list > $("#ewar_list .timer").length || PVP.war_list < $("#ewar_list .timer").length) {
        PVP.war_list = $("#ewar_list .timer").length;
        GAME.loadMapJson(function() {
            GAME.socket.emit('ga', {
            a: 3,
            vo: GAME.map_options.vo
            }, 1);
        });
    }
    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
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
            var cls = '';
            if (this.clan_enemies.indexOf(pd.klan_id) != -1) cls = 'enemy';
            klan = '<b class="poption player_clan ' + cls + '" data-option="show_clan" data-klan_id="' + pd.klan_id + '">' + pd.klan_short + ' <img src="' + pd.emblem + '" /></b>';
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
