if (typeof GAME !== 'undefined') {
var RES = {
    stop: true,
    last_loc: 0,
    mapcell: false,
    matrix: [],
    steps: [],
    steps_clone: [],
    path: [],
    processing: false,
    mines: [],
    last_mine: 0,
    speed: 100,
    mined_id: [],
    refresh_mines: true,
    first_mine: [],
    loc: GAME.char_data.loc
};
RES.emitOrder = function(data) {
    if (!this.processing) {
        this.processing = true;
        GAME.socket.emit('ga', data);
    }
};
RES.Start = function() {
    if (this.last_loc != GAME.char_data.loc) {
        this.CreateMatrix();
        this.last_loc = GAME.char_data.loc;
    }
    if (this.refresh_mines) {
        this.getMinesPos();
        this.refresh_mines = false;
    }
    this.steps_clone = this.steps.slice();
    if (this.steps_clone[0][0] == GAME.char_data.x && this.steps_clone[0][1] == GAME.char_data.y) {
        this.steps_clone.shift();
    }
    this.finder.setGrid(this.matrix);
    setTimeout(function() {
        RES.Action();
    }, 120);
};
RES.Action = function() {
    RES.stop = false;
    if (!this.processing) {
        this.Go();
    } else {
        setTimeout(function() {
            RES.Action();
        }, 1200);
    }
};
RES.GetCooldown = function() {
    var cd, r;
    if (Object.entries(GAME.map_mines.mine_data).length > 0 && GAME.map_mines.coords[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)][0][2] > 0) {
        cd = GAME.map_mines.coords[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)][0][2] - GAME.getTime();
        cd += 5;
        r = cd * 1000;
        $(".bt_cool").html(GAME.showTimer(r / 1000));
    } else {
        r = 1000;
    }
    return r;
};
RES.getMinesPos = function() {
    var coords = Object.entries(GAME.map_mines.coords);
    var mines = [];
    for (var i = 0; i < coords.length; i++) {
        if (this.mined_id.includes(coords[i][1][0][1])) {
            mines.push(coords[i]);
        }
    }
    this.prepareMines(mines);
};
RES.prepareMines = function(mines) {
    this.steps = [];
    for (var i = 0; i < mines.length; i++) {
        var pos = mines[i][0].split("_");
        if (i == 0) {
            RES.first_mine = [parseInt(pos[0]), parseInt(pos[1])];
        }
        this.steps.push([parseInt(pos[0]), parseInt(pos[1])]);
        this.mines[pos[0] + "_" + pos[1]] = mines[i][1][0][0];
        if (i == 0) {
            this.last_mine = pos[0] + "_" + pos[1];
        }
    }
    this.steps.push(RES.first_mine);
};
RES.listMines = function() {
    var html = "";
    var mdt = Object.entries(GAME.map_mines.mine_data);
    for (var i = 0; i < mdt.length; i++) {
        if (i == 0) {
            RES.mined_id.push(mdt[i][1].id);
            html += "<div style='margin-bottom:5px; border-bottom:solid gray 1px; padding:3px;'><input class='select_mine' type='checkbox' checked='true' value='" + mdt[i][1].id + "' " + ((mdt.length == 1) ? "disabled" : '') + "> " + mdt[i][1].name + "</div>";
        } else {
            html += "<div style='margin-bottom:5px; border-bottom:solid gray 1px; padding:3px;'><input class='select_mine' type='checkbox' value='" + mdt[i][1].id + "'> " + mdt[i][1].name + "</div>";
        }
    }
    $("#res_Panel ul").html(html);
    if (mdt.length == 0) {
        $("#res_Panel ul").html("Brak zasobów");
    }
};
RES.FindMapcell = function() {
    this.mapcell = Object.keys(GAME).find(z => GAME[z] && GAME[z]['1_1']);
    return this.mapcell;
};
RES.CreateMatrix = function() {
    for (var i = 0; i < parseInt(GAME.map.max_y); i++) {
        this.matrix[i] = [];
        for (var j = 0; j < parseInt(GAME.map.max_x); j++) {
            if (GAME.mapcell[parseInt(j + 1) + '_' + parseInt(i + 1)].m == 1) {
                this.matrix[i][j] = 1;
            } else {
                this.matrix[i][j] = 0
            }
        }
    }
};
RES.Mine = function() {
    GAME.socket.emit('ga', {
        a: 22,
        type: 8,
        mid: RES.mines[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)]
    });
};
RES.Go = function() {
    if (this.steps_clone.length > 0) {
        this.finder.findPath(GAME.char_data.x - 1, GAME.char_data.y - 1, this.steps_clone[0][0] - 1, this.steps_clone[0][1] - 1, function(path) {
            if (path !== null) {
                RES.path = path;
                if (RES.steps_clone.length > 0) {
                    RES.path.shift();
                    var cur = [GAME.char_data.x, GAME.char_data.y];
                    setTimeout(() => {
                        if (!RES.stop && RES.mines[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)] && $("button[data-mid='" + RES.mines[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)] + "']").length == 1 && RES.steps.some(r => r.length == cur.length && r.every((value, index) => cur[index] == value))) {
                            setTimeout(function() {
                                RES.Mine();
                            }, RES.speed);
                        } else if (!RES.stop) {
                            setTimeout(function() {
                                RES.Move();
                            }, RES.speed);
                        }
                    }, 1200);
                }
            }
        });
        this.finder.calculate();
    } else if (!RES.stop && (GAME.char_data.x + "_" + GAME.char_data.y) == this.last_mine) {
        setTimeout(function() {
            RES.Mine();
        }, 1200);
        this.cdt = setTimeout(function() {
            if (!RES.stop) {
                GAME.loadMapJson(function() {
                    GAME.socket.emit('ga', {
                        a: 3,
                        vo: GAME.map_options.vo
                    }, 1);
                });
                setTimeout(function() {
                    RES.Start();
                }, 2400);
                $(".bt_cool").html("");
            }
        }, this.GetCooldown());
    }
};
RES.Move = function() {
    if (!RES.stop) {
        if (this.path[0].x > GAME.char_data.x - 1 && this.path[0].y == GAME.char_data.y - 1) {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 7,
                vo: GAME.map_options.vo
            });
        } else if (this.path[0].x < GAME.char_data.x - 1 && this.path[0].y == GAME.char_data.y - 1) {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 8,
                vo: GAME.map_options.vo
            });
        } else if (this.path[0].x == GAME.char_data.x - 1 && this.path[0].y > GAME.char_data.y - 1) {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 1,
                vo: GAME.map_options.vo
            });
        } else if (this.path[0].x == GAME.char_data.x - 1 && this.path[0].y < GAME.char_data.y - 1) {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 2,
                vo: GAME.map_options.vo
            });
        } else if (this.path[0].x > GAME.char_data.x - 1 && this.path[0].y > GAME.char_data.y - 1) {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 3,
                vo: GAME.map_options.vo
            });
        } else if (this.path[0].x < GAME.char_data.x - 1 && this.path[0].y < GAME.char_data.y - 1) {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 6,
                vo: GAME.map_options.vo
            });
        } else if (this.path[0].x > GAME.char_data.x - 1 && this.path[0].y < GAME.char_data.y - 1) {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 5,
                vo: GAME.map_options.vo
            });
        } else if (this.path[0].x < GAME.char_data.x - 1 && this.path[0].y > GAME.char_data.y - 1) {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 4,
                vo: GAME.map_options.vo
            });
        } else {
            this.Go();
        }
    }
};
RES.Next = function() {
    if (this.path.length - 1 > 0) {
        this.path.shift();
        setTimeout(function() {
            RES.Move();
        }, this.speed);
    } else {
        if (this.steps_clone.length > 0) {
            this.steps_clone.shift();
            this.Go();
        }
    }
};
RES.HandleResponse = function(res) {
    if (RES.stop && res.a === 3 && PVP.stop  && RESP.stop) {
        this.listMines();
        this.getMinesPos();
    }
    if (res.a === 3 && RES.loc != GAME.char_data.loc) {
        RES.stop = true;
        $(".res_res .res_status").removeClass("green").addClass("red").html("Off");
        $(".bt_cool").html("");
        clearTimeout(RES.cdt);
    }
    if (res.a === 3 && RESP.loc != GAME.char_data.loc) {
        RESP.stop = true;
        $(".resp_resp .resp_status").removeClass("green").addClass("red").html("Off");
    }
    this.processing = false;
    if (!RES.stop && res.a === 4 && res.char_id === GAME.char_id) {
        RES.Next();
    } else if (!RES.stop && res.done && res.a === 22) {
        $("button[data-option='start_mine']").remove();
        RES.Go();
    }
};
GAME.socket.on('gr', function(res) {
    RES.HandleResponse(res);
});
RES.LoadES = function() {
    var esjs = document.createElement('script');
    esjs.src = 'https://cdn.jsdelivr.net/npm/easystarjs@0.4.3/bin/easystar-0.4.3.min.js';
    esjs.onload = () => {
        RES.finder = new EasyStar.js();
        RES.finder.enableDiagonals();
        RES.finder.setAcceptableTiles([1]);
    };
    document.head.append(esjs);
}();
}
