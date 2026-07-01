(function () {
if (window.__SWA_INSTA30_ENGINE_RUNNING__) return;
window.__SWA_INSTA30_ENGINE_RUNNING__ = true;

// Cały ten skrypt to jeden wielki łańcuch setTimeout/setInterval bez żadnego
// mechanizmu zatrzymania - stąd nie dało się go wyłączyć po starcie (przycisk
// "Insta 30" w core.js tylko blokował ponowne wczytanie skryptu, nie miał
// żadnego "off"). scheduleTimeout/scheduleInterval owijają natywne wywołania
// tak, żeby dało się scentralizowanie anulować WSZYSTKIE zaplanowane kroki
// jednym window.__SWA_INSTA30_STOP__() - bez przerabiania każdej z osobna
// z ~15 zagnieżdżonych funkcji tego skryptu.
var insta30Stopped = false;
var insta30Timeouts = [];
var insta30Intervals = [];
function scheduleTimeout(fn, delay) {
    var id = window.setTimeout(function () {
        if (insta30Stopped) return;
        fn();
    }, delay);
    insta30Timeouts.push(id);
    return id;
}
function scheduleInterval(fn, delay) {
    var id = window.setInterval(function () {
        if (insta30Stopped) { window.clearInterval(id); return; }
        fn();
    }, delay);
    insta30Intervals.push(id);
    return id;
}
window.__SWA_INSTA30_STOP__ = function () {
    insta30Stopped = true;
    insta30Intervals.forEach(function (id) { window.clearInterval(id); });
    insta30Timeouts.forEach(function (id) { window.clearTimeout(id); });
    window.__SWA_INSTA30_ENGINE_RUNNING__ = false;
};

scheduleTimeout(function() {
    document.getElementsByClassName("select_page")[28].click(); // włącza okienko z instancjami
}, 300);

scheduleTimeout(function() {
    document.getElementsByClassName("instance_name")[1].click(); // włącza instancję Ronina
}, 900);

scheduleTimeout(function() {
    GAME.emitOrder({a:29,type:2,instance:GAME.current_instance}); // tworzy pokój
}, 1500);

window.blocker2 = 0;
window.blocker3 = 0;
scheduleTimeout(function() {
    var liczba_pokoi = document.getElementById("inst_rooms_container").childElementCount; // sprawdza ile jest pokoi

    for (var x = 0; x < liczba_pokoi; x++) {
        var xy = document.getElementById("inst_rooms_container").getElementsByTagName("tr")[x].getElementsByTagName("td")[0].innerHTML;

        var tekst = GAME.char_data.name + " [S " + GAME.server + "]";

        if (xy == tekst) { // sprawdza który pokój jest Twój
            var y = x;
            document.getElementById("inst_rooms_container").getElementsByTagName("tr")[y].getElementsByTagName("td")[4].getElementsByTagName("button")[0].click(); // rozpoczyna instancje
            
            scheduleTimeout(function() {
                document.getElementById("inst_rooms_container").getElementsByTagName("tr")[y].getElementsByTagName("td")[4].getElementsByTagName("button")[0].click(); //wchodzi do instancji
            }, 1200);
            
            scheduleTimeout(function() {
                GAME.page_switch("game_map"); // włącza mape
            }, 2400);
            
            scheduleTimeout(function() {
                document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
            }, 3600);
            
            scheduleTimeout(function() {
                document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
            }, 4800);
            
            scheduleTimeout(function() {
                window.arr1 = [];
                window.arr2 = [];
                window.arr3 = [];
                window.blocker = 1;
                // idzie do góry
                if (blocker == 1) {
                    arr1.push(scheduleInterval(function() {
                        if (GAME.char_data.y > 14) {
                            GAME.map_move(2);
                        } else if (GAME.char_data.y == 14) {
                           scheduleTimeout(function() {
                                blocker = 0;
                                arr1.map((a) => {
                                    clearInterval(a);
                                    arr1 = [];
                                });
                                scheduleTimeout(function() {
                                    go2();
                                }, 780);
                                
                           }, 300);
                        }
                        if (GAME.char_data.y < 14) {
                            GAME.map_move(1);
                        }
                    }, 300));
                }
            
            }, 6600);
            
        }
        //break;
    }
}, 2100);

window.blocker4 = 0;

function go2() {
    arr2.push(scheduleInterval(function() {
        if (blocker3 == 0) {
        if (GAME.char_data.x < 19) {
            GAME.map_move(7);
        } else if (GAME.char_data.x == 19) {
            scheduleTimeout(function() {
                blocker3 = 1;
                arr2.map((a) => {
                    clearInterval(a);
                    arr2 = [];
                });
                scheduleTimeout(function() {
                    go3();
                }, 720);
            }, 300);
        }
        if (GAME.char_data.x > 19) {
            GAME.map_move(8);
        }
        }
    }, 600));
}

function go3() {
    arr3.push(scheduleInterval(function() {
        if (GAME.char_data.y > 12) {
            GAME.map_move(2);
        } else if (GAME.char_data.y == 12) {
            scheduleTimeout(function() {
                arr3.map((a) => {
                    clearInterval(a);
                    arr3 = [];
                });
                scheduleTimeout(function() {
                    go4();
                }, 720);
            }, 300);
        }
        if (GAME.char_data.y < 12) {
            GAME.map_move(1);
        }
    }, 600));
    
}

window.blocker5 = 0;

function go4() {
    document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
    
    scheduleTimeout(function() {
        
        if (blocker2 == 0) {
        blocker2 = 1;
        for (var x = 0; x <= 1000; x++) {
            GAME.questAction();
        }
        
        scheduleTimeout(function() {
            document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
        }, 600);
        
        console.log('1');
        scheduleTimeout(function() {
            document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
            
            scheduleTimeout(function() {
                document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
                
                scheduleTimeout(function() {
                    if (blocker5 == 0) {
                        blocker5 = 1;
                        for (var x = 0; x <= 1000; x++) {
                            GAME.questAction();
                            console.log('2');
                        }
                        
                        scheduleTimeout(function() {
                            document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
                            
                            scheduleTimeout(function() {
                                document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                            }, 480);
                            
                            scheduleTimeout(function() {
                                document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                            }, 1020);
                            
                            scheduleTimeout(function() {
                                document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                                
                                scheduleTimeout(function() {
                                    go5();
                                }, 480);
                            
                            }, 1560);
                            
                        }, 2880);
                    }
                }, 900);
            }, 900);
            
        }, 2700);
        }
    }, 900);
}

function go5() {
    window.arr4 = [];
    window.arr5 = [];
    window.arr6 = [];
    
    arr4.push(scheduleInterval(function() {
        if (GAME.char_data.x > 25) {
            GAME.map_move(8);
        }
        if (GAME.char_data.x < 25) {
            GAME.map_move(7);
        }
        if (GAME.char_data.y > 16) {
            GAME.map_move(2);
        }
        if (GAME.char_data.y < 16) {
            GAME.map_move(1);
        }
        
        if (GAME.char_data.x == 25 && GAME.char_data.y == 16) {
            arr4.map((a) => {
                clearInterval(a);
                arr4 = [];
            });
            
            scheduleTimeout(function() {
                document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
                
                scheduleTimeout(function() {
                    document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                    
                    scheduleTimeout(function() {
                        arr5.push(scheduleInterval(function() {
                            if (GAME.char_data.x > 24) {
                                GAME.map_move(8);
                            }
                            
                            if (GAME.char_data.x == 24) {
                                arr5.map((a) => {
                                    clearInterval(a);
                                    arr5 = [];
                                });
                                
                                scheduleTimeout(function() {
                                    document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
                                    
                                    scheduleTimeout(function() {
                                        document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                                    }, 600);
                                    
                                    scheduleTimeout(function() {
                                        document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                                    }, 1200);
                                    
                                    scheduleTimeout(function() {
                                        document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                                        
                                        scheduleTimeout(function() {
                                            arr6.push(scheduleInterval(function() {
                                                if (GAME.char_data.x < 25) {
                                                    GAME.map_move(7);
                                                }
                                                if (GAME.char_data.x > 25) {
                                                    GAME.map_move(8);
                                                }
                                                if (GAME.char_data.x == 25) {
                                                    arr6.map((a) => {
                                                        clearInterval(a);
                                                        arr6 = [];
                                                    });
                                                    
                                                    scheduleTimeout(function() {
                                                        document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
                                                        
                                                        scheduleTimeout(function() {
                                                            for (var x = 0; x <= 1000; x++) {
                                                                GAME.questAction();
                                                            }
                                                            
                                                            scheduleTimeout(function() {
                                                                go6();
                                                            }, 2700);
                                                        }, 300);
                                                    }, 300);
                                                }
                                            }, 500));
                                        }, 300);
                                    
                                    }, 1800);
                                }, 33000); // celowo nietknięte przy skracaniu odstępów - 33s odstaje od reszty (rząd 1-3s), możliwe że to realny wymagany czas oczekiwania w grze w tym miejscu, a nie tylko zapas na animację; do zweryfikowania na żywo
                            }
                        }, 500));
                        
                    }, 240);
                }, 300);
            }, 420);
        }
    }, 500));
}

function go6() {
    document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
    
    scheduleTimeout(function() {
        document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
    }, 600);
    
    scheduleTimeout(function() {
        document.getElementsByClassName("quest_desc")[1].getElementsByTagName("div")[0].getElementsByTagName("strong")[0].getElementsByTagName("button")[0].click(); // atakuje Tatewaki
        
        scheduleTimeout(function() {
            document.getElementById("fight_view").style.display = "none";
        }, 150);
    }, 1200);
    
    scheduleTimeout(function() {
        document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
        
        scheduleTimeout(function() {
            go7();
        }, 900);
    }, 1800);
}

function go7() {
    window.arr7 = [];
    window.arr8 = [];
    window.arr9 = [];
    window.arr10 = [];
    
    arr7.push(scheduleInterval(function() {
        if (GAME.char_data.x > 20) {
            GAME.map_move(8);
        }
        if (GAME.char_data.x < 20) {
            GAME.map_move(7);
        }
        if (GAME.char_data.y > 11) {
            GAME.map_move(2);
        }
        if (GAME.char_data.y < 11) {
            GAME.map_move(1);
        }
        
        if (GAME.char_data.x == 20 && GAME.char_data.y == 11) {
            arr7.map((a) => {
                clearInterval(a);
                arr7 = [];
            });
            
            scheduleTimeout(function() {
                arr8.push(scheduleInterval(function() {
                    if (GAME.char_data.x > 29) {
                        GAME.map_move(8);
                    }
                    if (GAME.char_data.x < 29) {
                        GAME.map_move(7);
                    }
                    if (GAME.char_data.y > 8) {
                        GAME.map_move(2);
                    }
                    if (GAME.char_data.y < 8) {
                        GAME.map_move(1);
                    }
                    if (GAME.char_data.x == 29 && GAME.char_data.y == 8) {
                        arr8.map((a) => {
                            clearInterval(a);
                            arr8 = [];
                        });
                        
                        scheduleTimeout(function() {
                            arr9.push(scheduleInterval(function() {
                                if (GAME.char_data.x > 33) {
                                    GAME.map_move(8);
                                }
                                if (GAME.char_data.x < 33) {
                                    GAME.map_move(7);
                                }
                                if (GAME.char_data.y > 14) {
                                    GAME.map_move(2);
                                }
                                if (GAME.char_data.y < 14) {
                                    GAME.map_move(1);
                                }
                                if (GAME.char_data.x == 33 && GAME.char_data.y == 14) {
                                    arr9.map((a) => {
                                        clearInterval(a);
                                        arr9 = [];
                                    });
                                    
                                    scheduleTimeout(function() {
                                        document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
                                    }, 300);
                                    
                                    scheduleTimeout(function() {
                                        document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                                    }, 900);
                                    
                                    scheduleTimeout(function() {
                                        document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                                        
                                        scheduleTimeout(function() {
                                            arr10.push(scheduleInterval(function() {
                                                if (GAME.char_data.x > 35) {
                                                    GAME.map_move(8);
                                                }
                                                if (GAME.char_data.x < 35) {
                                                    GAME.map_move(7);
                                                }
                                                if (GAME.char_data.x == 35) {
                                                    arr10.map((a) => {
                                                        clearInterval(a);
                                                        arr10 = [];
                                                    });
                                                    
                                                    scheduleTimeout(function() {
                                                        go8();
                                                    }, 1200);
                                                }
                                            }, 300));
                                        }, 600);
                                    }, 1500);
                                }
                            }, 400));
                        }, 180);
                        
                    }
                    
                }, 400));
            }, 210);
        }
    }, 450));
}

function go8() {
    document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
    
    scheduleTimeout(function() {
        document.getElementsByClassName("quest_desc")[1].getElementsByTagName("div")[0].getElementsByTagName("strong")[0].getElementsByTagName("button")[0].click(); // atakuje Marionetkę
        
        scheduleTimeout(function() {
            document.getElementById("fight_view").style.display = "none";
            
            scheduleTimeout(function() {
                document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
            }, 480);
            
            scheduleTimeout(function() {
                document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                
                scheduleTimeout(function() {
                    fight();
                }, 600);
            }, 1080);
        }, 270);
    }, 600);
}

function fight() {
    window.arr11 = [];
    window.arr12 = [];
    window.arr13 = [];
    window.arr14 = [];
    
    window.moby_bij = 0;
    window.multi = 0;
    arr11.push(scheduleInterval(function() {
        GAME.emitOrder({a:7,mob_num:0,rank:0,quick:1});
        moby_bij++;
        
        if (moby_bij > 8) {
            move_up();
            moby_bij = 0;
            multi++;
        }
        
        if (multi >= 4) {
            arr11.map((a) => {
                clearInterval(a);
                arr11 = [];
            });
            
            scheduleTimeout(function() {
                
                window.variab = 10;
                
                arr12.push(scheduleInterval(function() {
                    
                    if (variab <= 22) {
                        if (variab % 2 == 0) {
                            move_up();
                            variab++;
                        } else if (variab % 2 == 1) {
                            variab++;
                            multiwalka();
                        }
                    }
                    
                    if (variab > 22) {
                        
                        if (variab <= 25) {
                            GAME.map_move(7);
                        }
                        
                        if (variab % 2 == 0) {
                            GAME.map_move(1);
                            variab++;
                        } else if (variab % 2 == 1) {
                            multiwalka();
                            variab++;
                        }
                        
                    }
                    
                    if (variab > 60) {
                        arr12.map((a) => {
                            clearInterval(a);
                            arr12 = [];
                        });
                        
                        scheduleTimeout(function() {
                            arr13.push(scheduleInterval(function() {
                                if (GAME.char_data.x > 35) {
                                    GAME.map_move(8);
                                }
                                if (GAME.char_data.x < 35) {
                                    GAME.map_move(7);
                                }
                                if (GAME.char_data.y > 14) {
                                    GAME.map_move(2);
                                }
                                if (GAME.char_data.y < 14) {
                                    GAME.map_move(1);
                                }
                                if (GAME.char_data.x == 35 && GAME.char_data.y == 14) {
                                    
                                    arr13.map((a) => {
                                        clearInterval(a);
                                        arr13 = [];
                                    });
                        
                                    scheduleTimeout(function() {
                                        document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
                                    }, 300);
                                    
                                    scheduleTimeout(function() {
                                        document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                                    }, 720);
                                    
                                    scheduleTimeout(function() {
                                        arr14.push(scheduleInterval(function() {
                                            if (GAME.char_data.x > 37) {
                                                GAME.map_move(8);
                                            }
                                            if (GAME.char_data.x < 37) {
                                                GAME.map_move(7);
                                            }
                                            if (GAME.char_data.x == 37) {
                                                arr14.map((a) => {
                                                    clearInterval(a);
                                                    arr14 = [];
                                                });
                                                
                                                scheduleTimeout(function() {
                                                    document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
                                                }, 420);
                                                
                                                scheduleTimeout(function() {
                                                    document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
                                                }, 1020);
                                                
                                            }
                                        }, 350));
                                    }, 1320);
                                }
                            }, 350));
                        }, 480);
                    }
                    
                }, 400));
                
            }, 360);
        }
    }, 300));
}

function move_up() {
    scheduleTimeout(function() {
        GAME.map_move(2);
    }, 125);
}

function multiwalka() {
    GAME.emitOrder({a:13,mob_num:0,fo:GAME.map_options.ma});
}
})();