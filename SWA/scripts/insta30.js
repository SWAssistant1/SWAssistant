(function () {
if (window.__SWA_INSTA30_ENGINE_RUNNING__) return;
window.__SWA_INSTA30_ENGINE_RUNNING__ = true;

var insta30Stopped = false;
var insta30Timeouts = [];
function scheduleTimeout(fn, delay) {
    var id = window.setTimeout(function () {
        if (insta30Stopped) return;
        fn();
    }, delay);
    insta30Timeouts.push(id);
    return id;
}
window.__SWA_INSTA30_STOP__ = function () {
    insta30Stopped = true;
    insta30Timeouts.forEach(function (id) { window.clearTimeout(id); });
    if (currentWalk && currentWalk.fallback) window.clearTimeout(currentWalk.fallback);
    currentWalk = null;
    GAME.socket.off('gr', onGr);
    window.__SWA_INSTA30_ENGINE_RUNNING__ = false;
};

function rawDir(dx, dy) {
    if (dx === 0 && dy === 0) return 0;
    if (dx === 0) return dy === 1 ? 1 : 2;
    if (dy === 0) return dx === 1 ? 7 : 8;
    if (dx === 1 && dy === 1) return 3;
    if (dx === -1 && dy === 1) return 4;
    if (dx === 1 && dy === -1) return 5;
    return 6; // dx===-1 && dy===-1
}

function canStepDir(x, y, dir) {
    var nx = x, ny = y;
    if (dir === 1) ny++;
    else if (dir === 2) ny--;
    else if (dir === 3) { nx++; ny++; }
    else if (dir === 4) { nx--; ny++; }
    else if (dir === 5) { nx++; ny--; }
    else if (dir === 6) { nx--; ny--; }
    else if (dir === 7) nx++;
    else if (dir === 8) nx--;
    var cell = GAME.mapcell && GAME.mapcell[nx + '_' + ny];
    return !!(cell && cell.m != 0);
}

function pickDir(x, y, tx, ty) {
    var dx = tx === null ? 0 : (tx > x ? 1 : (tx < x ? -1 : 0));
    var dy = ty === null ? 0 : (ty > y ? 1 : (ty < y ? -1 : 0));
    var ideal = rawDir(dx, dy);
    if (ideal === 0) return 0;
    if (canStepDir(x, y, ideal)) return ideal;
    var altX = dx !== 0 ? (dx === 1 ? 7 : 8) : 0;
    if (altX && canStepDir(x, y, altX)) return altX;
    var altY = dy !== 0 ? (dy === 1 ? 1 : 2) : 0;
    if (altY && canStepDir(x, y, altY)) return altY;
    return ideal; // nic wolnego wokół - i tak spróbuj, żeby zobaczyć realny komunikat gry
}
function arrived(x, y, tx, ty) {
    return (tx === null || x === tx) && (ty === null || y === ty);
}

var currentWalk = null; // {tx, ty, onArrive, fallback}
function walkTick() {
    if (!currentWalk || insta30Stopped) return;
    var w = currentWalk;
    var x = GAME.char_data.x, y = GAME.char_data.y;
    if (arrived(x, y, w.tx, w.ty)) {
        currentWalk = null;
        window.clearTimeout(w.fallback);
        w.onArrive();
        return;
    }
    GAME.map_move(pickDir(x, y, w.tx, w.ty));
    w.fallback = scheduleTimeout(walkTick, 900); // zabezpieczenie na wypadek zgubionej odpowiedzi 'gr'
}

function walkTo(tx, ty, onArrive) {
    if (currentWalk) window.clearTimeout(currentWalk.fallback);
    currentWalk = { tx: tx, ty: ty, onArrive: onArrive, fallback: null };
    walkTick();
}

var pendingAttackTick = null;
var pendingByA = {}; // a-code -> callback czekający na najbliższą odpowiedź serwera z tym 'a'
function onGr(res) {
    if (insta30Stopped) return;
    if (currentWalk && res.a === 4 && res.char_id === GAME.char_id) {
        window.clearTimeout(currentWalk.fallback);
        scheduleTimeout(walkTick, 2);
    }
    // faza 1 walki (patrz fight()) reaguje na potwierdzenie ataku zamiast na sztywny timer
    if (pendingAttackTick && (res.a === 7 || res.a === 13)) {
        var tick = pendingAttackTick;
        pendingAttackTick = null;
        scheduleTimeout(tick, 2);
    }
    if (res.a !== undefined && pendingByA[res.a]) {
        var cb = pendingByA[res.a];
        pendingByA[res.a] = null;
        cb();
    }
}
GAME.socket.on('gr', onGr);

function waitFor(check, onReady, timeout, interval) {
    timeout = timeout || 4000;
    interval = interval || 100;
    var elapsed = 0;
    (function poll() {
        if (insta30Stopped) return;
        if (check()) { onReady(); return; }
        elapsed += interval;
        if (elapsed >= timeout) { onReady(); return; }
        scheduleTimeout(poll, interval);
    })();
}

function waitForA(aCode, onDone, timeoutMs, settleMs) {
    var done = false;
    function resolve() {
        if (done) return;
        done = true;
        pendingByA[aCode] = null;
        scheduleTimeout(onDone, settleMs === undefined ? 400 : settleMs);
    }
    pendingByA[aCode] = resolve;
    scheduleTimeout(resolve, timeoutMs || 3000);
}

function clickFieldQuest(onDone) {
    waitFor(function () { return $('#field_opts_con .field_quest').length > 0; }, function () {
        var el = $('#field_opts_con .field_quest')[0];
        if (!el) { onDone(); return; }
        el.click();
        waitForA(22, onDone);
    });
}

function clickQuestNext(onDone) {
    pollQuestButtons(onDone, 0);
}
function pollQuestButtons(onDone, elapsedMs) {
    var finishEl = $('.quest_win button[data-option="finish_quest"]')[0];
    if (finishEl) {
        finishEl.click();
        waitForA(22, onDone);
        return;
    }
    var retryEl = $('.quest_win button[data-option="quest_try_again"]')[0];
    if (retryEl) {
        retryEl.click();
        waitForA(22, function () { pollQuestButtons(onDone, elapsedMs); }, 3000, 300);
        return;
    }
    if (elapsedMs >= 60000) { onDone(); return; } // etap z limitem czasu potrafi wymagać realnie sporo czekania - długi, ale nie nieskończony timeout
    scheduleTimeout(function () {
        clickFieldQuest(function () {
            pollQuestButtons(onDone, elapsedMs + 1500);
        });
    }, 1500);
}

function findOwnRoomRow() {
    var myLabel = GAME.char_data.name + " [S " + GAME.server + "]";
    var rows = document.querySelectorAll('#inst_rooms_container tr');
    for (var i = 0; i < rows.length; i++) {
        var tds = rows[i].getElementsByTagName('td');
        if (tds.length && tds[0].innerHTML === myLabel) return rows[i];
    }
    return null;
}
function clickRoomButton(optionName, onDone) {
    waitFor(function () {
        var row = findOwnRoomRow();
        return !!(row && row.querySelector('button[data-option="' + optionName + '"]'));
    }, function () {
        var row = findOwnRoomRow();
        var btn = row && row.querySelector('button[data-option="' + optionName + '"]');
        if (btn) btn.click();
        onDone();
    }, 6000, 150);
}

scheduleTimeout(function () {
    document.getElementsByClassName("select_page")[28].click(); // włącza okienko z instancjami
}, 300);

scheduleTimeout(function () {
    document.getElementsByClassName("instance_name")[1].click(); // włącza instancję Ronina
}, 700);

scheduleTimeout(function () {
    GAME.emitOrder({ a: 29, type: 2, instance: GAME.current_instance }); // tworzy pokój
    waitFor(function () { return !!findOwnRoomRow(); }, function () {
        clickRoomButton('start_instance_room', function () {
            clickRoomButton('enter_instance_room', function () {
                scheduleTimeout(function () {
                    GAME.page_switch("game_map"); // włącza mapę
                    scheduleTimeout(function () {
                        clickFieldQuest(function () {
                            scheduleTimeout(function () {
                                clickQuestNext(function () {
                                    scheduleTimeout(leg1, 300);
                                });
                            }, 400);
                        });
                    }, 600);
                }, 300);
            });
        });
    }, 6000, 150);
}, 1100);

function leg1() {
    walkTo(null, 14, function () {
        scheduleTimeout(leg2, 400);
    });
}
// Odcinek 2: korytarz w prawo (tylko oś X)
function leg2() {
    walkTo(19, null, function () {
        scheduleTimeout(leg3, 400);
    });
}
// Odcinek 3: korytarz w górę (tylko oś Y)
function leg3() {
    walkTo(null, 12, function () {
        scheduleTimeout(go4, 400);
    });
}

function go4() {
    clickFieldQuest(function () {
        scheduleTimeout(function () {
            for (var x = 0; x <= 1000; x++) GAME.questAction(); // patrz GAME.questAction (game.js:6657) - debounce 300ms, ta pętla tylko od razu dobija licznik do maksimum, realny emit (a:22 type:7) leci po debounce
            waitForA(22, function () {
                clickFieldQuest(function () {
                    clickQuestNext(function () {
                        clickFieldQuest(function () {
                            scheduleTimeout(function () {
                                for (var x = 0; x <= 1000; x++) GAME.questAction();
                                waitForA(22, function () {
                                    clickFieldQuest(function () {
                                        clickQuestNext(function () {
                                            clickQuestNext(function () {
                                                clickQuestNext(function () {
                                                    scheduleTimeout(go5, 300);
                                                });
                                            });
                                        });
                                    });
                                });
                            }, 400);
                        });
                    });
                });
            }, 400);
        }, 400);
    });
}

function go5() {
    walkTo(25, 16, function () {
        scheduleTimeout(function () {
            clickFieldQuest(function () {
                clickQuestNext(function () {
                    scheduleTimeout(leg5, 250);
                });
            });
        }, 300);
    });
}

function leg5() {
    walkTo(24, null, function () {
        scheduleTimeout(function () {
            clickFieldQuest(function () {
                clickQuestNext(function () {
                    clickQuestNext(function () {
                        clickQuestNext(function () {
                            scheduleTimeout(leg6, 400);
                        });
                    });
                });
            });
        }, 300);
    });
}
// powrót tylko oś X
function leg6() {
    walkTo(25, null, function () {
        scheduleTimeout(function () {
            clickFieldQuest(function () {
                scheduleTimeout(function () {
                    for (var x = 0; x <= 1000; x++) GAME.questAction();
                    waitForA(22, function () {
                        scheduleTimeout(go6, 150);
                    });
                }, 150);
            });
        }, 150);
    });
}

function go6() {
    clickFieldQuest(function () {
        clickQuestNext(function () {
            waitFor(function () { return $('.quest_desc').length > 1; }, function () {
                document.getElementsByClassName("quest_desc")[1].getElementsByTagName("div")[0].getElementsByTagName("strong")[0].getElementsByTagName("button")[0].click(); // atakuje Tatewaki
                scheduleTimeout(function () {
                    document.getElementById("fight_view").style.display = "none";
                    clickQuestNext(function () {
                        scheduleTimeout(go7, 300);
                    });
                }, 150);
            });
        });
    });
}

function go7() {
    walkTo(20, 11, function () {
        scheduleTimeout(function () {
            walkTo(29, 8, function () {
                scheduleTimeout(function () {
                    walkTo(33, 14, function () {
                        clickFieldQuest(function () {
                            clickQuestNext(function () {
                                clickQuestNext(function () {
                                    scheduleTimeout(function () {
                                        walkTo(35, null, function () {
                                            scheduleTimeout(go8, 600);
                                        });
                                    }, 300);
                                });
                            });
                        });
                    });
                }, 90);
            });
        }, 90);
    });
}

function go8() {
    clickFieldQuest(function () {
        waitFor(function () { return $('.quest_desc').length > 1; }, function () {
            document.getElementsByClassName("quest_desc")[1].getElementsByTagName("div")[0].getElementsByTagName("strong")[0].getElementsByTagName("button")[0].click(); // atakuje Marionetkę
            scheduleTimeout(function () {
                document.getElementById("fight_view").style.display = "none";
                clickQuestNext(function () {
                    clickQuestNext(function () {
                        scheduleTimeout(fight, 300);
                    });
                });
            }, 150);
        });
    });
}


function isTrackedQuestDone() {
    return $('#quest_track_con .qtrack strong.green').length > 0;
}

var huntGoingUp = true;
function huntStep() {
    var x = GAME.char_data.x, y = GAME.char_data.y;
    var vertDir = huntGoingUp ? 2 : 1; // 2 = góra, 1 = dół
    if (canStepDir(x, y, vertDir)) {
        GAME.map_move(vertDir);
    } else if (canStepDir(x, y, 7)) {
        GAME.map_move(7); // krawędź mapy - krok w prawo...
        huntGoingUp = !huntGoingUp; // ...i zawróć w pionie
    } else if (canStepDir(x, y, 8)) {
        GAME.map_move(8); // gdyby prawa krawędź też była zablokowana (przeciwny róg pokoju) - zawróć w lewo zamiast utknąć
        huntGoingUp = !huntGoingUp;
    }
}
function fight() {
    function attackTick() {
        if (insta30Stopped) return;
        if (isTrackedQuestDone()) { finishFight(); return; }
        var mob = GAME.field_mobs && GAME.field_mobs[0];
        if (mob && mob.ranks && mob.ranks[0] > 0) {
            if (GAME.field_mf && GAME.field_mf[0] >= 0) multiwalka(); // multi walka odblokowana
            else GAME.emitOrder({ a: 7, mob_num: 0, rank: 0, quick: 1 }); // walka normalna do czasu odblokowania multi
            pendingAttackTick = attackTick;
        } else {
            huntStep(); // brak moba w zasięgu - przeczesujemy pokój dalej
            scheduleTimeout(attackTick, 400);
        }
    }
    attackTick();
}
function finishFight() {
    walkTo(35, 14, function () {
        scheduleTimeout(function () {
            clickFieldQuest(function () {
                clickQuestNext(function () {
                    scheduleTimeout(function () {
                        walkTo(37, null, function () {
                            scheduleTimeout(function () {
                                clickFieldQuest(function () {
                                    clickQuestNext(function () { /* koniec instancji */ });
                                });
                            }, 300);
                        });
                    }, 300);
                });
            });
        }, 200);
    });
}
function multiwalka() {
    GAME.emitOrder({ a: 13, mob_num: 0, fo: GAME.map_options.ma });
}
})();
