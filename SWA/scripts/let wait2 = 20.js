let wait2 = 20


// -----------------------------------

// global constants
const VERSION = 'v0.1.3'

const SENZU_BLUE = 'SENZU_BLUE'
const SENZU_GREEN = 'SENZU_GREEN'
const SENZU_YELLOW = 'SENZU_YELLOW'
const SENZU_RED = 'SENZU_RED'

// -----------------------------------

// ===================================
// user config
/**
 * Określa ilość niebieskich senzu, które będą używane podczas odnawiania PA
 */
const CONF_BLUE_AMOUNT = 700

/**
 * Określa ilość zielonych senzu, które będą używane podczas odnawiania PA
 */
const CONF_GREEN_AMOUNT = 10

/**
 * Określa ilość żółtych senzu, które będą używane podczas odnawiania PA
 */
const CONF_YELLOW_AMOUNT = 1

/**
 * Określa przy jakiej ilości PA mają zostać użyte senzu
 */
const CONF_MIN_PA = 1000

/**
 * Określa jakia powinna zostać użyta subka
 *
 * false - wyłączone odpalanie subki
 * <0-7> - wartości od 0 do 7, gdzie kolejno 0 to ostka, natomiast 7 to x2
 */
const CONF_SUB = 0

/**
 * Określa jakie senzu powinny zostać użyte przy odnawianiu PA
 *
 * false - Jeśli wybór ma być automatyczny (blue -> green -> yellow -> red)
 * SENZU_<typ> - Jeśli ma użyc konkretnego senzu (np. SENZU_RED)
 *
 * !Chwilowo wspiera tylko BLUE, GREEN, YELLOW i RED
 */
const CONF_SENZU = SENZU_BLUE
// ===================================

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
let stop = true
let moveTimeout

let collectedCSK = 0
// -----------------------------------

// -----------------------------------
/* TEMPLATE */
const $css = `<style>
	.gh_btn {background: url(/gfx/layout/zalogowany-button-bg.png) no-repeat left top;
		height: 26px;
		line-height: 26px;
		display: inline-block;
		text-align: center;
		width: 103px;
		color: #01070d;
		text-decoration: none;
		font-size: 12px;
		font-weight: Bold;
		text-transform: uppercase;
		border: none;
		cursor: pointer;
	}</style>`
const $main = '<div id="gh_game_helper" style="position: fixed; top: 30px; left: 0; padding: 10px; background: rgba(70,128,193,0.9); z-index: 5;"></div>'
const $version = `<span style="position: absolute; bottom: 2px; right: 3px; color: rgb(6, 47, 88); line-height: 1; font-size: 13px; font-weight: 700;">${VERSION}</span>`
const $exp = '<button id="gh_exp_button" class="gh_btn" style="display: block; margin-bottom: 10px;">Exp: <span id="gh_exp_status" class="red">Off</span></button>'

$('body').append($main).append($css);
$('#gh_game_helper')
	.append($version)
	.append($exp);

/* ACTIONS */
$('#gh_exp_button').click(() => {
	if (stop) {
		$('#gh_exp_status').text('On').attr('class', 'green');
		stop = false
		move()
	} else {
		$('#gh_exp_status').text('Off').attr('class', 'red');
		stop = true
	}
});
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
function fight (mob_num = 0) {
	if (stop) return

	// check if mob exists on field and has no multi fight yet
	if (GAME.field_mobs[mob_num].ranks[3] && GAME.mf[GAME.field_mobs[mob_num].mob_id] !== 3) fightLegend(mob_num) // kill legend if exists
	else if (GAME.field_mobs[mob_num].ranks[4]) fightEpic(mob_num) // kill epic if exists
	else if (GAME.field_mobs[mob_num].ranks[5]) fightMystic(mob_num) // kill mystic if exists
	else GAME.emitOrder({a: 13, mob_num: mob_num, fo: GAME.map_options.ma}) // multi attack
}

function fightLegend (mob_num = 0) {
	GAME.emitOrder({a: 7, mob_num: mob_num, rank: 3, quick: 1});
}

function fightEpic (mob_num = 0) {
	GAME.emitOrder({a: 7, mob_num: mob_num, rank: 4, quick: 1});
}

function fightMystic (mob_num = 0) {
	GAME.emitOrder({a: 7, mob_num: mob_num, rank: 5, quick: 1});
}

function areMobsOnField() {
	const mob_index = GAME.field_mobs.findIndex(field_mob => {
		return field_mob.ranks.some((rank, index) => {
			// first part checks if multiattack option for specified mob rank is enabled
			// second part checks if mob with specified rank exists in the cell
			return GAME.map_options.ma[index] && rank > 0
		})
	})

	if (mob_index === -1) return false
	else return { mob_num: mob_index }
}

// ===================================
// SENZU
function getSenzu(type) {
  switch (type) {
    case SENZU_BLUE:
      return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 30)
    case SENZU_GREEN:
      return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 29)
    case SENZU_YELLOW:
      return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 28)
    case SENZU_RED:
      return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 42)
  }
}

function useSenzu () {
	if (stop) return

	if (isAntybotActive()) {
		move()
		return
	}

	const blue = getSenzu(SENZU_BLUE)
	const green = getSenzu(SENZU_GREEN)
	const yellow = getSenzu(SENZU_YELLOW)
	const red = getSenzu(SENZU_RED)

	switch (CONF_SENZU) {
		case SENZU_BLUE:
			useBlue(Math.min(CONF_BLUE_AMOUNT, blue.stack))
			break

		case SENZU_GREEN:
		  useGreen(Math.min(CONF_GREEN_AMOUNT, green.stack))
		  break

		case SENZU_YELLOW:
		  useYellow(Math.min(CONF_YELLOW_AMOUNT, yellow.stack))
		  break

		case SENZU_RED:
		  useRed()
		  break

		default:
			if (blue && blue.stack > 0)
				useBlue(Math.min(CONF_BLUE_AMOUNT, blue.stack))
			else if (green && green.stack > 0)
				useGreen(Math.min(CONF_GREEN_AMOUNT, green.stack))
			else if (yellow && yellow.stack > 0)
				useYellow(Math.min(CONF_YELLOW_AMOUNT, yellow.stack))
			else if (red && red.stack > 0)
				useRed()
	}
}

function useBlue(amount = CONF_BLUE_AMOUNT) {
  const blue = getSenzu(SENZU_BLUE)

  if (!blue) {
    move()
    return
  }

	GAME.emitOrder({
		a: 12,
		type: 14,
		iid: blue.id,
		page: GAME.ekw_page,
		am: amount
	})
}

function useGreen(amount = CONF_GREEN_AMOUNT) {
  const green = getSenzu(SENZU_GREEN)

  if (!green) {
    move()
    return
  }

  GAME.emitOrder({
    a: 12,
    type: 14,
    iid: green.id,
    page: GAME.ekw_page,
    am: amount
  })
}

function useYellow(amount = CONF_YELLOW_AMOUNT) {
  const yellow = getSenzu(SENZU_YELLOW)

  if (!yellow) {
    move()
    return
  }

  GAME.emitOrder({
    a: 12,
    type: 14,
    iid: yellow.id,
    page: GAME.ekw_page,
    am: amount
  })
}

function useRed() {
  const red = getSenzu(SENZU_RED)

  if (!red) {
    move()
    return
  }

  GAME.emitOrder({
    a: 12,
    type: 14,
    iid: red.id,
    page: GAME.ekw_page,
    am: 1
  })
}

// ===================================
// SUBSTANCE
function useSub () {
	GAME.emitOrder({
		a: 12,
		type: 19,
		iid: GAME.quick_opts.sub[CONF_SUB].id
	})
}

// ===================================
// SSJ
function useSSJ () {
	GAME.emitOrder({a: 18, type: 5, tech_id: GAME.quick_opts.ssj[0]})
}

// ===================================
// CSK
function collectCSK () {
if($(".black_db").length>0){

    GAME.emitOrder({a:21,bid:document.getElementsByClassName("black_db")[0].attributes[2].value});
    document.getElementsByClassName("black_db")[0].remove();
//if($(".black_db")[$(".black_db").length-1].style[3] != "opacity")
//$(".black_db")[$(".black_db").length-1].click();
}
}

// ===================================
// MOVE
function move () {
	if (stop) return

	if (moveTimeout) clearTimeout(moveTimeout)
	moveTimeout = setTimeout(move, 700) // trigger move after 7 seconds without move action

	if (GAME.char_data.pr <= CONF_MIN_PA) {
		useSenzu()
		return
	}
	if(CONF_SUB !== false && ($doubler_bar.style.display === 'none' || GAME.doubler_end * 1000 < new Date().getTime())) {
		useSub()
		return
	}

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
	console.log("exp response")
	if (res.a === 4 && res.char_id === GAME.char_id) setTimeout(() => {
		// when in the cell are some mobs
		const mobs = areMobsOnField()
		if (mobs) {
			fight(mobs.mob_num)
			return
		}
		 fight()
	}, wait2);

	// on fight response
	else if (res.a === 7) setTimeout(() => {
		// when in the cell are some mobs
		const mobs = areMobsOnField()
		if (mobs) {
			fight(mobs.mob_num)
			return
		}
		if(!collectCSK()) move()
	}, wait2);

	// on senzu use response
	else if (res.a === 12 && res.type === 14) move()

	// on speed potion use response
	else if (res.a === 12 && res.type === 19) move()

	// on SSJ use response
	else if (res.a === 18 && res.ssj) move()

	// on collect CSK use response
	else if (res.a === 21) {
		if (!collectCSK()) fight()
	}

	// on empty response (e.g. when player can't move)
	else if (res.a === undefined) setTimeout(() => {
		console.log('try to move')
		antybotPath = false
		move()
	}, 50);
}

GAME.socket.on('gr', handleResponse);