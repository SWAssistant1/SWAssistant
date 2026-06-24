$(document).bind('keydown', 'n', function(e) {

var quality = 50;
var id;

window.setTimeout(function() {
$('[data-option="rer_item"]').click();
}, 100);

window.setTimeout(function() {
$('[data-option="rer2_item"]').click();
 id= GAME.dragged_item.id;
}, 300);

window.setTimeout(function() {
const targetElement = document.querySelector('.player_ekw_item[data-item_id="'+id+'"]');
                const pattern = /<span id="quality">Jakość:/;
                if (targetElement) {
                  // Get the value of the data-slot attribute
                  const dataSlotValue = targetElement.getAttribute('data-original-title');
                      
                  const match = dataSlotValue.match(/\((\d+)%\)/);
              
                  if (match) {
                    // The value is in the first capturing group
                    const value = match[1];
                    if (value > quality)
                        GAME.komunikat("znaleziono jakosc");
                    console.log('Extracted value:', value); // Output: 31
                  } else {
                    console.log('Pattern not found.');
                  }
                } else {
                  console.log('Quality span not found.');
                }
            },500);
});