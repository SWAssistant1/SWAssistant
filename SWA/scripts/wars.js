var i=0;
window.setInterval(function() {
if(i<10){
if(i==4)i++;
else{
GAME.emitOrder({a:50,type:7,target:i});
i++;}
}
}, 60200);

window.setTimeout(function() {
var kk = 0;
window.setInterval(function() {
if (kk <= 9) {
window.warx = document.getElementsByClassName("war_win")[kk].getElementsByTagName("button")[0].getAttribute("data-war");

window.setTimeout(function() {
GAME.emitOrder({a:50,type:13,war:warx,org:18});
}, 500);

window.setTimeout(function() {
kk += 1;
}, 1220);
}
}, 3000);
}, 603000);