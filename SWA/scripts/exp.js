(function () {
if (window.__SWA_EXP_ENGINE_RUNNING__) return;
window.__SWA_EXP_ENGINE_RUNNING__ = true;

let wait2_exp = 2


// -----------------------------------

// -----------------------------------

// ===================================
// user config
/**
 * Wybór subki jest konfigurowany w panelu AFO (sekcja PVM, lista "Subka") i zapisywany
 * w localStorage pod kluczem 'swa_sub_label' — odczytywany tutaj dynamicznie przez getConfSub(),
 * więc zmiana w panelu działa bez przeładowania tego skryptu.
 *
 * '' / brak wpisu w localStorage - subka wyłączona
 */
function getConfSub() {
    const v = localStorage.getItem('swa_sub_label')
    return v === null ? 'x4' : v
}
// ===================================
// Uwaga: jedzenie ramenów/senzu NIE jest obsługiwane przez ten skrypt — odpowiada za to
// wyłącznie panel AFO (sekcja PVM, przyciski ramenów + "Min PA"/"Max ramenów"), działający
// niezależnie od tego, czy ten skrypt jest aktywny.

// -----------------------------------
// elements
const $doubler_bar = document.getElementById('doubler_bar')
// -----------------------------------

// -----------------------------------
// script variables
let left = false
let right = true
let up = false
let down = false

let antybotPath = false
let stop_exp = true
let moveTimeout

// -----------------------------------

// -----------------------------------

// -----------------------------------
// functions
/**
 * Recursive function for finding path to the target.
 *
 * @param {Number} x - current X position
 * @param {Number} y - current Y position
 * @param {Array} path - array with cell positions as a path to the target
 * @returns {Array} - array with cell positions as a path to the target
 */
function check (x, y, path, p, tX, tY) {
    x = parseInt(x)
    y = parseInt(y)
    tX = parseInt(tX)
    tY = parseInt(tY)

    const cP = `${x}_${y}` // current position

    const p1 = `${x - 1}_${y - 1}`
    const d1 = !path.includes(p1) && p[p1]

    const p2 = `${x}_${y - 1}`
    const d2 = !path.includes(p2) && p[p2]

    const p3 = `${x + 1}_${y - 1}`
    const d3 = !path.includes(p3) && p[p3]

    const p4 = `${x - 1}_${y}`
    const d4 = !path.includes(p4) && p[p4]

    const p5 = `${x + 1}_${y}`
    const d5 = !path.includes(p5) && p[p5]

    const p6 = `${x - 1}_${y + 1}`
    const d6 = !path.includes(p6) && p[p6]

    const p7 = `${x}_${y + 1}`
    const d7 = !path.includes(p7) && p[p7]

    const p8 = `${x + 1}_${y + 1}`
    const d8 = !path.includes(p8) && p[p8]

    // debugger

    // found player position path
    if (x === tX && y === tY) return [...path, cP]

    let r = false

    if (d1 === 1) {
        r = check(x - 1, y - 1, [...path, cP], p, tX, tY)
        if (r) return r
    }

    if (d2 === 1) {
        r = check(x, y - 1, [...path, cP], p, tX, tY)
        if (r) return r
    }

    if (d3 === 1) {
        r = check(x + 1, y - 1, [...path, cP], p, tX, tY)
        if (r) return r
    }

    if (d4 === 1) {
        r = check(x - 1, y, [...path, cP], p, tX, tY)
        if (r) return r
    }

    if (d5 === 1) {
        r = check(x + 1, y, [...path, cP], p, tX, tY)
        if (r) return r
    }

    if (d6 === 1) {
        r = check(x - 1, y + 1, [...path, cP], p, tX, tY)
        if (r) return r
    }

    if (d7 === 1) {
        r = check(x, y + 1, [...path, cP], p, tX, tY)
        if (r) return r
    }

    if (d8 === 1) {
        r = check(x + 1, y + 1, [...path, cP], p, tX, tY)
        if (r) return r
    }

    return false
}

/**
 * Returns move direction.
 * Same as used by game.
 *
 * 	6	2	5
 * 	8		7
 * 	4	1	3
 * @param {Number} x - current X position
 * @param {Number} y - current Y position
 * @param {Number} nx - next X position
 * @param {Number} ny - nexy Y position
 * @returns {Number} - move direction
 */
function getDir(x, y, nx, ny) {
    x = parseInt(x)
    y = parseInt(y)
    nx = parseInt(nx)
    ny = parseInt(ny)
    if (x > nx && y > ny) return 6
    if (x === nx && y > ny) return 2
    if (x < nx && y > ny) return 5
    if (x > nx && y === ny) return 8
    if (x < nx && y === ny) return 7
    if (x > nx && y < ny) return 4
    if (x === nx && y < ny) return 1
    if (x < nx && y < ny) return 3
}

/**
 * Converts array with positions to directions array.
 *
 * @param {Array} result - array with results
 * @returns {Array} - array with directions
 */
function getMoves (result) {
    return result
    // get move directions
        .map((item, index, arr) => {
            if (!arr[index + 1]) return
            const [x, y] = item.split('_')
            const [nx, ny] = arr[index + 1].split('_')
            return getDir(x, y, nx, ny)
        })
        // filter only moves
        .filter(item => item)
}

/**
 * Returns position with target cell
 *
 * @returns {Array}
 */
function getFinalPosition(premiumData) {
    return Object.keys(premiumData)
        .filter(key => premiumData[key] === 2)[0]
        .split('_')
}
// -----------------------------------

function canGoLeft () {
    const x = GAME.char_data.x;
    const y = GAME.char_data.y;

    return GAME.mapcell[`${x - 1}_${y}`] && GAME.mapcell[`${x - 1}_${y}`].m == 1
}

function canGoRight () {
    const x = GAME.char_data.x;
    const y = GAME.char_data.y;

    return GAME.mapcell[`${x + 1}_${y}`] && GAME.mapcell[`${x + 1}_${y}`].m == 1
}

function canGoUp () {
    const x = GAME.char_data.x;
    const y = GAME.char_data.y;

    return GAME.mapcell[`${x}_${y - 1}`] && GAME.mapcell[`${x}_${y - 1}`].m == 1
}

function canGoDown () {
    const x = GAME.char_data.x;
    const y = GAME.char_data.y;

    return GAME.mapcell[`${x}_${y + 1}`] && GAME.mapcell[`${x}_${y + 1}`].m == 1
}

function goLeft () {
    if (canGoLeft()) {
        GAME.emitOrder({a:4,dir:8,vo:GAME.map_options.vo});
    } else {
        down = true
        move()
    }
}

function goRight () {
    if (canGoRight()) {
        GAME.emitOrder({a:4,dir:7,vo:GAME.map_options.vo});
    } else {
        down = true
        move()
    }
}

function goUp () {
    if (canGoUp()) {
        GAME.emitOrder({a:4,dir:2,vo:GAME.map_options.vo});
    } else {
        up = false
        right = canGoRight()
        left = canGoLeft()
        move()
    }
}

function goDown () {
    down = false

    if (right) {
        right = false
        left = true
    } else {
        right = true
        left = false
    }

    if (canGoDown()) {
        GAME.emitOrder({a:4,dir:1,vo:GAME.map_options.vo});
    } else {
        if (!canGoLeft() || !canGoRight()) {
            right = false
            left = false
            up = true
        }
        move ()
    }
}

function isAntybotActive () {
    return !!GAME.premiumData
}

// ===================================
// FIGHT
// Ranks index: 0 = Normal, 1 = Champion, 2 = Elite, 3 = Boss
// Wybór, które poziomy mobów mają być atakowane, jest konfigurowany w panelu AFO
// (sekcja PVM, przyciski Normal/Champion/Elite/Boss) i zapisywany w localStorage.
function getEnabledRanks () {
    try {
        return JSON.parse(localStorage.getItem('swa_exp_ranks')) || [true, true, true, true]
    } catch (e) {
        return [true, true, true, true]
    }
}

function fight (mob_num = 0) {
    if (stop_exp) return

    const ranks = getEnabledRanks()
    const mob = GAME.field_mobs[mob_num]

    // check if mob exists on field and has no multi fight yet
    if (ranks[1] && mob.ranks[1] && GAME.mf[mob.mob_id] !== 3) fightLegend(mob_num) // kill champion if exists
    else if (ranks[2] && mob.ranks[2]) fightEpic(mob_num) // kill elite if exists
    else if (ranks[3] && mob.ranks[3]) fightMystic(mob_num) // kill boss if exists
    else if (ranks[0] && mob.ranks[0] && GAME.field_mf && GAME.field_mf[mob_num] >= 0) GAME.emitOrder({a: 13, mob_num: mob_num, fo: ranks}) // multi fight unlocked
    else if (ranks[0] && mob.ranks[0]) GAME.emitOrder({a: 7, mob_num: mob_num, rank: 0, quick: 1}) // normal fight until multi fight unlocks
}

function fightLegend (mob_num = 0) {
    GAME.emitOrder({a: 7, mob_num: mob_num, rank: 1, quick: 1});
}

function fightEpic (mob_num = 0) {
    GAME.emitOrder({a: 7, mob_num: mob_num, rank: 2, quick: 1});
}

function fightMystic (mob_num = 0) {
    GAME.emitOrder({a: 7, mob_num: mob_num, rank: 3, quick: 1});
}

function areMobsOnField() {
    const ranks = getEnabledRanks()
    const mob_index = GAME.field_mobs.findIndex(field_mob => {
        return field_mob.ranks.some((rank, index) => {
            // first part checks if this rank is selected for attacking in the AFO panel
            // second part checks if mob with specified rank exists in the cell
            return ranks[index] && rank > 0
        })
    })

    if (mob_index === -1) return false
    else return { mob_num: mob_index }
}

// ===================================
// SUBSTANCE
function useSub () {
    const confSub = getConfSub()
    if (!confSub) return

    const subs = GAME.quick_opts.sub || []
    const chosen = subs.find(s => (s[GAME.lang] || '').includes(confSub))

    if (!chosen) return

    GAME.emitOrder({
        a: 12,
        type: 8,
        sel: 0,
        iid: chosen.id
    })
}

// ===================================
// MOVE
function move () {
    if (($(".resp_rare .resp_status").hasClass("red"))) {
        stop_exp = true;
        window.setTimeout(move, 300);
        return;
    } else {
        stop_exp = false;
    }
    if (moveTimeout) clearTimeout(moveTimeout)
    moveTimeout = setTimeout(move, 700) // trigger move after 7 seconds without move action

    if (isAntybotActive()) {
        console.log('antybot active')

        const x = GAME.char_data.x
        const y = GAME.char_data.y

        const premiumData = {...GAME.premiumData, [`${x}_${y}`]: 1}

        const [tX, tY] = getFinalPosition(premiumData)

        if (!antybotPath) {
            console.time('path')
            const p = {...premiumData, [`${tX}_${tY}`]: 1}
            const result = check(x, y, [], p, tX, tY)
            const moves = result && getMoves(result)

            antybotPath = [...moves]
            console.timeEnd('path')
            console.log('PATH', antybotPath)

            // moves.pop() // don't move to last cell
            // antybotPath.pop() // don't move to last cell
        }

        const dir = antybotPath.shift()
        if (dir) {
            GAME.emitOrder({a:4, dir: dir, vo:GAME.map_options.vo})
        } else {
            antybotPath = false
        }

        return
    }

    if (down) goDown()
    else if (up) goUp()
    else if (left) goLeft()
    else if (right) goRight()
}

// ===================================
// RESPONSE HANDLING
function handleResponse (res) {
    // on move response
    console.log("exp response");
    if (res.a === 4 && res.char_id === GAME.char_id) setTimeout(() => {
        // when in the cell are some mobs
        const mobs = areMobsOnField()
        if (mobs) {
            fight(mobs.mob_num)
            return
        }
         fight()
    }, wait2_exp);

    // on fight response (single attack or multi attack)
    else if (res.a === 7 || res.a === 13) setTimeout(() => {
        // when in the cell are some mobs
        const mobs = areMobsOnField()
        if (mobs) {
            fight(mobs.mob_num)
            return
        }
        move()
    }, wait2_exp);

    // on speed potion use response
    else if (res.a === 12 && res.type === 8) move()

    // on SSJ use response
    else if (res.a === 18 && res.ssj) move()

    // on collect CSK use response
    else if (res.a === 21) {
        move()
    }

    // on empty response (e.g. when player can't move)
    else if (res.a === undefined) setTimeout(() => {
        console.log('try to move')
        antybotPath = false
        move()
    }, 50);
}

GAME.socket.on('gr', handleResponse);

// ===================================
// SUBSTANCE LOOP
// Runs independently of move()/fight() so substance activation isn't starved while the bot
// is busy fighting continuously (fight() can loop on itself for a long time without ever
// calling move(), where the substance check used to live).
function subStep () {
    const expOn = !$(".resp_rare .resp_status").hasClass("red")
    const confSub = getConfSub()
    const barHidden = $doubler_bar && $doubler_bar.style.display === 'none'
    const expired = GAME.doubler_end * 1000 < new Date().getTime()
    if (expOn && confSub && (barHidden || expired)) {
        useSub()
    }
    setTimeout(subStep, 1000)
}
subStep()

// Arms the move()/fight() loop as soon as the engine is injected — move() itself idles
// (re-checking every 300ms) while the AFO "exp" toggle (.resp_rare) is off, so calling it
// once here is enough; no separate start button is needed anymore.
move()
})();