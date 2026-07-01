
(function () {
if (window.__SWA_RESPAWN_ENGINE_RUNNING__) return;
window.__SWA_RESPAWN_ENGINE_RUNNING__ = true;

var wait_resp = 2; //szybkość skryptu 1-1000 im mniejsza wartość tym szybciej
var useBlueBeans = false; // czy ma być użyta niebieska fasolka
var useRedBeans = true; // czy ma być użyta czerwona fasolka
var collectBlueSenzuOn = false; //zatrzyamnie skryptu po zebraniu maksymalnej ilości niebieskich fasolek
var limitPA = 1400 // ilość PA przy której używana jest fasolka
var stopIfAnotherPlayerOn = true;
var stop_resp = false; //zatrzyamnie skryptu
var killLegend = true; //zbijanie legend
var killEpic = true; // zbijanie epic
var killMystic = true; //zbijanie mistic
var killAuto = true; // zbijanie autowalka
var collectDB = true; // skrypt do zbierania czarnych kul
var moveCount = 0;
var moveCountTarget = 13;

//---------------------------------------------------------------------------------------------------------
var downb = false;
var whatNow = 0;
var max_Senzu = Math.floor(GAME.char_data.pr_max/100*2*(1+GAME.getStat(99)/100));

var antybotPath = false; // pozostałe kroki do rozwiązania zagadki antybotowej
var savedPos = false; // kratka, na której skrypt został zatrzymany przez zagadkę
var returning = false; // czy skrypt wraca na zapisaną kratkę po rozwiązaniu zagadki
var returnMoveWait = 300; // ms - odstęp między krokami powrotu, żeby serwer zdążył zaktualizować pozycję
var returnMoveNextAt = 0; // kiedy wolno wysłać kolejny krok powrotu
//---------------------WYGLAD----------------------------------

// const $css = `<style>
// 	.gh_btn {
// 		height: 26px;
// 		line-height: 26px;
// 		display: inline-block;
// 		text-align: center;
// 		width: 103px;
// 		color: #030033;
// 		text-decoration: none;
// 		font-size: 10px;
// 		font-weight: Bold;
// 		text-transform: uppercase;
// 		border: none;
// 		cursor: pointer;
// 	}</style>`
// const $main = '<div id="gh_game_helper" style="position: fixed; top: 30px; right: 0; padding: 10px; background: rgba(8, 0, 1, 0.9); z-index: 5;"></div>'
// const $resp = '<button id="gh_resp_button" class="gh_btn" style="display: block; margin-bottom: 10px;">Respienie: <span id="gh_resp_status" class="green">ON</span></button>'

// $('body').append($main).append($css);
// $('#gh_game_helper')
// 	.append($resp);

// $('#gh_resp_button').click(() => {
// 	if (stop_resp) {
// 		$('#gh_resp_status').text('ON').attr('class', 'green');
// 		stop_resp = false
// 		start()
// 	} else {
// 		$('#gh_resp_status').text('OFF').attr('class', 'red');
// 		stop_resp = true
// 	}
// });
// //---------------------------------------------------------------------------------------------------------

// ===================================
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
 * Returns move direction. Same as used by game.
 *
 * 	6	2	5
 * 	8		7
 * 	4	1	3
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

// converts array with positions to directions array
function getMoves (result) {
    return result
        .map((item, index, arr) => {
            if (!arr[index + 1]) return
            const [x, y] = item.split('_')
            const [nx, ny] = arr[index + 1].split('_')
            return getDir(x, y, nx, ny)
        })
        .filter(item => item)
}

// returns position of target cell
function getFinalPosition(premiumData) {
    return Object.keys(premiumData)
        .filter(key => premiumData[key] === 2)[0]
        .split('_')
}

function start(){

if(!GAME.is_loading && collectBlueSenzu()){
if(checkAntyBot()){
solveAntybot();
}else if(returning){
returnToSavedPos();
}else{
action();
}
}
window.setTimeout(start,wait_resp);
}

function solveAntybot(){
if(!savedPos) savedPos = {x: GAME.char_data.x, y: GAME.char_data.y};

var x = GAME.char_data.x;
var y = GAME.char_data.y;

var premiumData = Object.assign({}, GAME.premiumData);
premiumData[x + '_' + y] = 1;

var finalPos = getFinalPosition(premiumData);
var tX = finalPos[0];
var tY = finalPos[1];

if(!antybotPath){
var p = Object.assign({}, premiumData);
p[tX + '_' + tY] = 1;
var result = check(x, y, [], p, tX, tY);
var moves = result && getMoves(result);
antybotPath = moves || [];
}

var dir = antybotPath.shift();
if(dir){
GAME.emitOrder({a:4, dir: dir, vo:GAME.map_options.vo});
}else{
antybotPath = false;
returning = true;
}
}

function returnToSavedPos(){
if(!savedPos){
returning = false;
return;
}

var x = GAME.char_data.x;
var y = GAME.char_data.y;

if(x === savedPos.x && y === savedPos.y){
savedPos = false;
returning = false;
returnMoveNextAt = 0;
return;
}

// start() woła tę funkcję co wait_resp (domyślnie 2ms) - bez tego opóźnienia
// kolejny krok leciał zanim GAME.char_data.x/y zdążyło się zaktualizować po
// poprzednim, więc kierunek liczył się wciąż z tej samej (już nieaktualnej)
// pozycji i postać potrafiła wbić się w ścianę i utknąć.
if(Date.now() < returnMoveNextAt) return;
returnMoveNextAt = Date.now() + returnMoveWait;

var dir = getDir(x, y, savedPos.x, savedPos.y);
GAME.emitOrder({a:4, dir: dir, vo:GAME.map_options.vo});
}

function action(){
	if ($(".resp_resp1 .resp_status").hasClass("red"))
		return;
switch (whatNow) {
case 0:
whatNow++;
go();
break;
case 1:
moveCount++;
if(moveCount >= moveCountTarget){
whatNow++;
moveCount = 0;
}else{
whatNow = 0;
}
if(killMystic)
kill_mystic();
break;
case 2:
whatNow++;
if(killAuto)
kill_auto();
break;
case 3:
whatNow++;
if(collectDB)
click_db();
break;
case 4:
whatNow++;
if(killLegend)
kill_legend();
break;
case 5:
whatNow++;
if(killEpic)
kill_epic();
break;
case 6:
whatNow=0;
if(stopIfAnotherPlayerOn)
stopIfAnotherPlayer();
break;
default:

}
}
function checkAntyBot(){
if(GAME.premiumData === undefined || GAME.premiumData === null){
return false;
}else{
return true;
}

}
function go(){
if(GAME.char_data.pr < limitPA && (useBlueBeans || useRedBeans)){
stop_resp==true;
}
if(downb){
go_down();
}else {
go_up();
}
}
function go_down(){
GAME.map_move(3);
downb = false;

}
function go_up(){
GAME.map_move(6);
downb = true;
}
function kill_auto(){
var mob = GAME.field_mobs && GAME.field_mobs[0];
if (!mob || !mob.ranks[0]) return;
if (GAME.field_mf && GAME.field_mf[0] >= 0) GAME.emitOrder({a:13,mob_num:0,fo:GAME.map_options.ma}); // multi fight unlocked
else GAME.emitOrder({a:7,mob_num:0,rank:0,quick:1}); // normal fight until multi fight unlocks
}
function kill_mystic() {
$('[data-mob-rank="1"]').click();
$('#fight_con').css('display', 'none');
$('#fight_t1').css('display', 'none');
$('#fight_t0').css('display', 'none');
window.setTimeout(function() {
$('#fight_con').remove();
$('#fight_t1').remove();
$('#fight_t0').remove();
}, 100);
}
function kill_legend() {
//GAME.emitOrder({a:7,mob_num:0,rank:2,quick:1});
$('[data-mob-rank="2"]').click();
$('#fight_con').css('display', 'none');
$('#fight_t1').css('display', 'none');
$('#fight_t0').css('display', 'none');
window.setTimeout(function() {
$('#fight_con').remove();
$('#fight_t1').remove();
$('#fight_t0').remove();
}, 100);
}
function kill_epic() {
//if('[data-option="qroup_attack"]')
//$('[data-option="qroup_attack"]').click();
//GAME.emitOrder({a:7,mob_num:0,rank:3,quick:1});
$('[data-mob-rank="3"]').click();
$('#fight_con').css('display', 'none');
$('#fight_t1').css('display', 'none');
$('#fight_t0').css('display', 'none');
window.setTimeout(function() {
$('#fight_con').remove();
$('#fight_t1').remove();
$('#fight_t0').remove();
}, 100);
}
function click_db(){

if($(".black_db").length>0){
if($(".black_db")[$(".black_db").length-1].style[3] != "opacity")
$(".black_db")[$(".black_db").length-1].click();
}
}

function collectBlueSenzu(){
if(collectBlueSenzuOn){
if(GAME.char_data.senzu_limit < max_Senzu){ //Sprawdzenie czy ilość zebranych fasolek jest mniejsza od maksymalnej dopuszczalnej liczby fasolek do zebrania
return true;
}else {
return false;
}
}else{
return true;
}
}

function stopIfAnotherPlayer(){
if(stopIfAnotherPlayerOn){
//if(Object.keys(GAME.map_players).length <= 2 && GAME.map_players[1499].y >=39){//Sprawdzanie czy na planszy sa inni gracze
if(Object.keys(GAME.map_players).length <= 0){
return true;
}else{
return false;
}
}else{
scriptOn();
return true;
}
}
function scriptOn(){
stop_resp = false;
}
function scriptOff(){
console.log("scriptOff");
stop_resp = true;
}
start();
})();


