if (typeof GAME !== 'undefined') {
var RESP = {
    wait: 600,
    stop: true,
    checkOST: false,
    checkSSJ: false,
    jaka: 0,
    zmiana: false,
    multifight: false,
    reload: false,
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
    maxPaPercent: 80,
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

        if ((($(".resp_rare .resp_status").hasClass("green")) && ekwUsedValue < 1000) ||
        (($(".resp_resp1 .resp_status").hasClass("green")) && ekwUsedValue < 1000)) {
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
    return false;
};

RESP.DestroyItemsAtPage = () => {
    var items=[];
    window.setTimeout(function() {
    $('#ekw_page_items .nonstackable[data-class="'+1+'"]').each(function () {
                        items.push(parseInt($(this).data('item_id')));
                    });
                    if(items.length){
                        GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                    }
    }, 50);
    window.setTimeout(function() {
    $('#ekw_page_items .nonstackable[data-class="'+2+'"]').each(function () {
                        items.push(parseInt($(this).data('item_id')));
                    });
                    if(items.length){
                        GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                    }
    }, 100);
    window.setTimeout(function() {
    $('#ekw_page_items .nonstackable[data-class="'+3+'"]').each(function () {
                        items.push(parseInt($(this).data('item_id')));
                    });
                    if(items.length){
                        GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                    }
    }, 150);

    if (RESP.leg)  {
        window.setTimeout(function() {
            $('#ekw_page_items .nonstackable[data-class="'+4+'"]').each(function () {
                if (parseInt($(this).data('upgrade')) === 0) {
                    items.push(parseInt($(this).data('item_id')));
                }
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
// Próg na bazie procentu maxPA zamiast samego maxPA - char_data.pr aktualizuje się
// z opóźnieniem po zjedzeniu ramena, więc pętla feedStep potrafi wystrzelić kilka
// kolejnych ramenów zanim PA faktycznie się zaktualizuje. Zatrzymanie się wcześniej
// (np. 80% maxPA) daje margines na to opóźnienie i nie pozwala jeść w nieskończoność.
RESP.maxPaThreshold = () => {
    return Math.floor(GAME.getCharMaxPr() * (RESP.maxPaPercent / 100));
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
RESP.reload_map = () => {
    RESP.reload = true;
};
RESP.go = () => {
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
    if (RESP.stop || GAME.char_data.pr >= RESP.maxPaThreshold()) {
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
RESP.useBlue = () => {
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
RESP.useGreen = () => {
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
RESP.usePurple = () => {
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
RESP.useYellow = () => {
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
