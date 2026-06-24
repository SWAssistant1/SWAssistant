
var wait_resp = 2; //szybkość skryptu 1-1000 im mniejsza wartość tym szybciej
var maxDown = 0; // ustawić 0 jeśli nie używane, maksymalna wartość na mapie do której ma się poruszać postać w dół
var maxUp = 0; // ustawić 0 jeśli nie używane, maksymalna wartość na mapie do której ma się poruszać postać w górę
var maxLeft = 0; // ustawić 0 jeśli nie używane, maksymalna wartość na mapie do której ma się poruszać postać w lewo
var useBlueBeans = false; // czy ma być użyta niebieska fasolka
var useRedBeans = true; // czy ma być użyta czerwona fasolka
var quantityBlue = 1000; //ile ma być użytych niebieskich fasolek
var collectBlueSenzuOn = false; //zatrzyamnie skryptu po zebraniu maksymalnej ilości niebieskich fasolek
var limitPA = 1400 // ilość PA przy której używana jest fasolka
var stopIfAnotherPlayerOn = true;
var stop_resp = false; //zatrzyamnie skryptu
var killLegend = true; //zbijanie legend
var killEpic = true; // zbijanie epic
var killMystic = true; //zbijanie mistic
var killAuto = true; // zbijanie autowalka
var collectDB = true; // skrypt do zbierania czarnych kul
var buttonArray = $( "button[data-option='arena_attack']");
var moveCount = 0;
var moveCountTarget = 13;

//---------------------------------------------------------------------------------------------------------
var minX = 1;
var minY = 1;
var mapay = Math.sqrt(Object.keys(GAME.mapcell).length);
var leftb = true;
var rightb = false;
var upb = false;
var downb = false;
var whatNow = 0;
var arena_courent = 0;
var max_Senzu = Math.floor(GAME.char_data.pr_max/100*2*(1+GAME.getStat(99)/100));
var refresh_arena = 0;
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

function start(){

if(!GAME.is_loading && collectBlueSenzu() && !checkAntyBot() ){
action();
window.setTimeout(start,wait_resp);
}else {
window.setTimeout(start,wait_resp);
}
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
function check_X(){
return GAME.map_players[GAME.char_data.id].x;
}
function check_y(){
return GAME.map_players[GAME.char_data.id].y;
}
function kill_auto(){
GAME.emitOrder({a:13,mob_num:0,fo:GAME.map_options.ma});
}
function kill_mystic() {
//GAME.emitOrder({a:7,mob_num:0,rank:1,quick:1});
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
function use_blue(x){
GAME.emitOrder({a:12,type:14,iid:GAME.quick_opts.senzus[0].id,page:GAME.ekw_page,am:x})
}
function use_red(){
GAME.emitOrder({a:12,type:14,iid:GAME.quick_opts.senzus[4].id,page:GAME.ekw_page,am:1})
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
wait_resp_resp = 1;
//scriptOn();
return true;
}else{
//scriptOff();
wait_resp_resp = 1;
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


