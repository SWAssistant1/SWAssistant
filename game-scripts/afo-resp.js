if (typeof GAME === 'undefined') {} else {
var RESP = {
    wait: 600,
    stop: true,
    checkOST: false,
    checkSSJ: false,
    jaka: 0,
    zmiana: false,
    multifight: false,
    reload: false,
    downb: false,
    SENZU_BLUE: 'SENZU_BLUE',
    SENZU_GREEN: 'SENZU_GREEN',
    SENZU_YELLOW: 'SENZU_YELLOW',
    SENZU_RED: 'SENZU_RED',
    SENZU_MAGIC: 'SENZU_MAGIC',
    SENZU_PURPLE: 'SENZU_PURPLE',
    CONF_BLUE_AMOUNT: () => {
        return Math.floor(GAME.getCharMaxPr() / 100 * 0.9999)
    },
    CONF_BLUE_AMOUNT1: Math.floor(GAME.getCharMaxPr() / 100 * 0.9999),
    CONF_PURPLE_AMOUNT: 30,
    CONF_GREEN_AMOUNT: () => {
        return Math.floor(GAME.getCharMaxPr() / 2000 * 0.9999)
    },
    CONF_GREEN_AMOUNT1: Math.floor(GAME.getCharMaxPr() / 2000 * 0.9999),
    CONF_YELLOW_AMOUNT: 6,
    CONF_SENZU: false,
    maxRamen: 0,
    usedRamen: 0,
    lastSenzuType: null,
    minPa: 5000,
    bless: false,
    checkOST_timer: 0,
    normal: false,
    rare: false,
    leg: false,
    b1: false,
    b2: false,
    b3: false,
    b4: false,
    b5: false,
    b6: false,
    b7: false,
    b8: false,
    b9: false,
    b10: false,
    b11: false,
    b12: false,
    b13: false,
    b14: false,
    b15: false,
    b16: false,
    b17: false,
    b18: false,
    buff_imp: false,
    buff_clan: false,
    loc: GAME.char_data.loc
};
RESP.check = () => {
    console.log('checking resp');
    let imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
    let emp = GAME.char_data.empire;
    let buff = $(".emp_buff .pull-right").find("button").attr("data-option") == "activate_emp_buff";
    let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
    let who_win = $("#gne_satus").text().includes("ZŁO");
    let abut = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`);
    let isDisabled = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`).parents("tr").hasClass("disabled");
    if (GAME.char_data.pr <= RESP.min_pa()) {
        console.log("resp use sensu");
        RESP.useSenzu();
        return true;
    } else if (RESP.checkOST && $("#doubler_bar").css("display") === "none") {
        GAME.socket.emit(`ga`, {
            a: 12,
            type: 14,
            iid: GAME.quick_opts.sub[RESP.jaka].id,
            page: GAME.ekw_page,
            am: 1
        });
        return false;
    } else if (RESP.checkOST && $('#doubler_status').text() <= '00:00:03') {
        return false;
    } else if ((!RESP.checkOST && RESP.checkOST_timer <= GAME.getTime()) || (RESP.jaka == 1 && RESP.checkOST_timer <= GAME.getTime())) {
        RESP.checkOST_timer = GAME.getTime() + 60;
        return false;
    } else if (RESP.normal) {
        GAME.emitOrder({a:12,page:GAME.ekw_page});
        let ekwUsedElement = document.getElementById('ekw_used');
        let ekwUsedValue = ekwUsedElement.textContent;

        // let ekwSpaceElement = document.getElementById('ekw_space');
        // let ekwSpaceValue = ekwSpaceElement.textContent;
        if ((($(".resp_rare .resp_status").hasClass("green")) && ekwUsedValue < 1000) ||
        (($(".resp_resp1 .resp_status").hasClass("green")) && ekwUsedValue < 1000)) {
        //     window.setTimeout(function() {
        //         GAME.page_switch("game_ekw");
        //     }, 225);
        //     Response.normal = false;
            return false;
        }
        const komElements = document.querySelectorAll('#kom_con .kom');
    
        komElements.forEach(kom => {
            const closeButton = kom.querySelector('.close_kom');
            closeButton.click();
        });
        window.setTimeout(function() {
            GAME.emitOrder({a:12,page:2});
            GAME.ekw_page = 2;
            
            window.setTimeout(function() {
                RESP.DestroyItemsAtPage();
            }, 111);
        }, 570);
        window.setTimeout(function() {
            GAME.emitOrder({a:12,page:3});
            GAME.ekw_page = 3;
            
            window.setTimeout(function() {
                RESP.DestroyItemsAtPage();
            }, 111);
        }, 915);
        
        window.setTimeout(function() {
            GAME.emitOrder({a:12,page:4});
            GAME.ekw_page = 4;
            
            window.setTimeout(function() {
                RESP.DestroyItemsAtPage();
            }, 111);
        }, 1505);
        
        window.setTimeout(function() {
            GAME.emitOrder({a:12,page:5});
            GAME.ekw_page = 5;
            
            window.setTimeout(function() {
                RESP.DestroyItemsAtPage();
            }, 111);
        }, 2005);


    }
    // item jakosc
    // const targetElement = document.querySelector('.player_ekw_item[data-item_id="'+ GAME.dragged_item.id+'"]');
    // const pattern = /<span id="quality">Jakość:/;
    // if (targetElement) {
    //   // Get the value of the data-slot attribute
    //   const dataSlotValue = targetElement.getAttribute('data-original-title');
          
    //   const match = dataSlotValue.match(/\((\d+)%\)/);
  
    //   if (match) {
    //     // The value is in the first capturing group
    //     const value = match[1];
    //     console.log('Extracted value:', value); // Output: 31
    //   } else {
    //     console.log('Pattern not found.');
    //   }
    // } else {
    //   console.log('Quality span not found.');
    // }
    // wymiana ramenow insta ronina
    // GAME.emitOrder({
    //     a: 211,
    //     type: 2,
    //     exchange: 9,
    //     item: 91
    // });


    //  else if ($(".resp_normal .resp_status").hasClass("green")) {
    //     GAME.emitOrder({a:12,page:GAME.ekw_page});
    //     let ekwUsedElement = document.getElementById('ekw_used');
    //     let ekwUsedValue = ekwUsedElement.textContent;

    //     let ekwSpaceElement = document.getElementById('ekw_space');
    //     let ekwSpaceValue = ekwSpaceElement.textContent;
    //     if (ekwUsedValue > ekwSpaceElement * 0.7)
    //         RESP.normal = true;
    // }
    return false;
};

RESP.SetPageAsActive = (page, klasa) => {
    window.setTimeout(function() {
        let activePageElement = document.querySelector('.ekw_pag.option.active');
        let firstPageElement = document.querySelector('.ekw_pag.option[data-page="'+1+'"]');
        activePageElement.classList.remove('active');
        firstPageElement.classList.add('active');
        console.log("active page:", parseInt(firstPageElement.getAttribute('data-page')));

        window.setTimeout(function() {
            var items=[];
            $('#ekw_page_items .nonstackable[data-class="'+1+'"]').each(function( index ) {
                items.push(parseInt($(this).data('item_id')));
            });
            if(items.length){
                GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                console.log("niszczenie itemow na stronie:", 1, 1);
            }
        }, 20);
    }, 20);
}
RESP.DestroyItemsAtPage = () => {
    var items=[];
    window.setTimeout(function() {
    $('#ekw_page_items .nonstackable[data-class="'+1+'"]').each(function( index ) {
                        items.push(parseInt($(this).data('item_id')));
                    });
                    if(items.length){
                        GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                    }
    }, 50);
    window.setTimeout(function() {
    $('#ekw_page_items .nonstackable[data-class="'+2+'"]').each(function( index ) {
                        items.push(parseInt($(this).data('item_id')));
                    });
                    if(items.length){
                        GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                    }
    }, 100);
    window.setTimeout(function() {
    $('#ekw_page_items .nonstackable[data-class="'+3+'"]').each(function( index ) {
                        items.push(parseInt($(this).data('item_id')));
                    });
                    if(items.length){
                        GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                    }
    }, 150);

    if (RESP.leg)  {
        window.setTimeout(function() {
            $('#ekw_page_items .nonstackable[data-class="'+4+'"]').each(function( index ) {
                items.push(parseInt($(this).data('item_id')));
                    });
                    if(items.length){
                         GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                    }
            }, 150);
    }
};
RESP.min_pa = () => {
    if (GAME.char_data.doubler_rate && GAME.char_data.doubler_rate > 19) {
        return Math.max(RESP.minPa, 5000);
    }
    return RESP.minPa;
};
RESP.populateSubSelect = () => {
    var subs = (GAME.quick_opts && GAME.quick_opts.sub) || [];
    var $sel = $('#resp_Panel select[name=resp_sub_select]');
    var saved = localStorage.getItem('swa_sub_label');
    $sel.empty();
    $sel.append('<option value="">Wyłączona</option>');
    subs.forEach((s) => {
        var label = s[GAME.lang];
        $sel.append('<option value="' + label + '">' + label + ' (' + s.stack + ')</option>');
    });
    if (saved !== null) {
        $sel.val(saved);
    } else {
        var def = subs.find((s) => (s[GAME.lang] || '').includes('x4'));
        $sel.val(def ? def[GAME.lang] : '');
    }
};
RESP.action = () => {
    console.log('resp action');
    if (!RESP.stop) {
        if (!RESP.check()) {
            setTimeout(() => {
                // RESP.fight();
                RESP.go();
            }, RESP.wait);
        } else {
            setTimeout(() => {
                RESP.action();
                kom_clear();
            }, 1700);
        }
    }
};
RESP.fight = () => {
    console.log('resp fight');
    // GAME.socket.emit(`ga`,{a:13,mob_num:0,fo:GAME.map_options.ma});
    if (RESP.reload) {
        setTimeout(() => {
            GAME.maploaded = false;
            GAME.prepareMap();
        }, 300);
        RESP.reload = false;
    }
    if ((RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 0) && GAME.field_mobs[GAME.field_mob_id - 1].ranks[0] || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 1 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[1]) || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 2 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[2]) || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 3 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[3]) || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 4 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[4]) || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 5 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[5]) || !RESP.multifight) {
        GAME.socket.emit('ga', {
            a: 7,
            order: 2,
            quick: 1,
            fo: GAME.map_options.ma
        });
    } else if (RESP.MF2() > 0) {
        GAME.socket.emit('ga', {
            a: 13,
            mob_num: GAME.field_mob_id,
            fo: GAME.map_options.ma
        })
    } 
    RESP.action();
};
RESP.reload_map = () => {
    RESP.reload = true;
};
RESP.MF = () => {
    var r = 0;
    if (GAME.field_mobs) {
        for (i = 0; i < GAME.map_options.ma.length; i++) {
            if (GAME.map_options.ma[i] === 1) {
                r += parseInt(GAME.field_mobs[0].ranks[i]);
                if (GAME.field_mobs[1]) {
                    r += parseInt(GAME.field_mobs[1].ranks[i]);
                }
                if (GAME.field_mobs[2]) {
                    r += parseInt(GAME.field_mobs[2].ranks[i]);
                }
                if (GAME.field_mobs[3]) {
                    r += parseInt(GAME.field_mobs[3].ranks[i]);
                }
            }
        }
    }
    console.log(r);
    return r;
};
RESP.MF2 = () => {
    var r = 0;
    for (i = 0; i < GAME.map_options.ma.length; i++) {
        if (GAME.field_mob_id < GAME.field_mobs.length && "ranks" in GAME.field_mobs[GAME.field_mob_id] && GAME.map_options.ma[i] === 1) {
            r += parseInt(GAME.field_mobs[GAME.field_mob_id].ranks[i]);
        }
    }
    return r;
};
RESP.go = () => {
    // if (RESP.downb) {
    //     GAME.map_move(3);
    //     RESP.downb = false;
    // } else {
    //     GAME.map_move(6);
    //     RESP.downb = true;
    // }
    
    RESP.action();
};

RESP.getSenzu = (type) => {
    switch (type) {
        case RESP.SENZU_BLUE:
            return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 42); // ogromny ramen
        case RESP.SENZU_PURPLE:
            return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 41); // powiekszony ramen
        case RESP.SENZU_MAGIC:
            return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 30); // czerwona pigula
        case RESP.SENZU_GREEN:
            return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 1);  // zwykly ramion
        case RESP.SENZU_YELLOW:
            return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 29); // zolta pigula
        case RESP.SENZU_RED:
            return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 28); // zielona pigula
    }
};
RESP.selectSenzu = (type) => {
    if (RESP.lastSenzuType !== type) {
        RESP.usedRamen = 0;
    }
    RESP.lastSenzuType = type;
    RESP.updateRamenCounter();
};
RESP.updateRamenCounter = () => {
    $('#resp_Panel .resp_ramen_used').text('Zużyto: ' + RESP.usedRamen + (RESP.maxRamen > 0 ? ' / ' + RESP.maxRamen : ''));
};
RESP.consumeSenzuOnce = () => {
    let consumed = 0;
    switch (RESP.CONF_SENZU) {
        case RESP.SENZU_BLUE:
            RESP.useBlue(1);
            consumed = 1;
            break;
        case RESP.SENZU_PURPLE:
            RESP.usePurple(1);
            consumed = 1;
            break;
        case RESP.SENZU_MAGIC:
            RESP.useMagic(1);
            consumed = 1;
            break;
        case RESP.SENZU_GREEN:
            RESP.useGreen(10);
            consumed = 1;
            break;
        case RESP.SENZU_YELLOW:
            RESP.useYellow(1);
            consumed = 1;
            break;
        case RESP.SENZU_RED:
            RESP.useRed(1);
            consumed = 1;
            break;
        default:
            break;
    }
    return consumed;
};
RESP.feeding = false;
RESP.feedStep = () => {
    if (RESP.stop || GAME.char_data.pr >= GAME.getCharMaxPr()) {
        RESP.feeding = false;
        return;
    }
    if (RESP.maxRamen > 0 && RESP.usedRamen >= RESP.maxRamen) {
        RESP.feeding = false;
        return;
    }
    const consumed = RESP.consumeSenzuOnce();
    if (consumed <= 0) {
        RESP.feeding = false;
        return;
    }
    RESP.usedRamen += consumed;
    RESP.updateRamenCounter();
    setTimeout(RESP.feedStep, 250);
};
RESP.useSenzu = () => {
    console.log("use senzu", RESP.stop, RESP.CONF_SENZU);
    if (RESP.feeding) return;
    if (RESP.maxRamen > 0 && RESP.usedRamen >= RESP.maxRamen) return;
    RESP.feeding = true;
    RESP.feedStep();
};
RESP.useBlue = (amount = RESP.CONF_BLUE_AMOUNT()) => {
    const blue = RESP.getSenzu(RESP.SENZU_BLUE);
    if (!blue) {
        return;
    }
    GAME.socket.emit('ga', {
        a: 12,
        type: 8,
        iid: blue.id,
        page: GAME.ekw_page,
        am: 2
    });
};
RESP.useGreen = (amount = RESP.CONF_GREEN_AMOUNT()) => {
    const green = RESP.getSenzu(RESP.SENZU_GREEN);
    console.log("use green", green);
    if (!green) {
        return;
    }
    GAME.socket.emit('ga', {
        a: 12,
        type: 8,
        iid: green.id,
        page: GAME.ekw_page,
        am: 5
    });
};
RESP.usePurple = (amount = RESP.CONF_PURPLE_AMOUNT) => {
    const purple = RESP.getSenzu(RESP.SENZU_PURPLE);
    if (!purple) {
        return;
    }
    GAME.socket.emit('ga', {
        a: 12,
        type: 8,
        iid: purple.id,
        page: GAME.ekw_page,
        am: 3
    });
};
RESP.useYellow = (amount = RESP.CONF_YELLOW_AMOUNT) => {
    const yellow = RESP.getSenzu(RESP.SENZU_YELLOW);
    if (!yellow) {
        return;
    }
    GAME.socket.emit('ga', {
        a: 12,
        type: 8,
        iid: yellow.id,
        page: GAME.ekw_page,
        am: 1
    });
};
RESP.useRed = () => {
    const red = RESP.getSenzu(RESP.SENZU_RED);
    if (!red) {
        return;
    }
    GAME.socket.emit('ga', {
        a: 12,
        type: 8,
        iid: red.id,
        page: GAME.ekw_page,
        am: 1
    });
};
RESP.useMagic = () => {
    const magic = RESP.getSenzu(RESP.SENZU_MAGIC);
    if (!magic) {
        return;
    }
    GAME.socket.emit('ga', {
        a: 12,
        type: 8,
        iid: magic.id,
        page: GAME.ekw_page,
        am: 1
    });
};
}
