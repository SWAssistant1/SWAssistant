if (typeof GAME !== 'undefined') {
var KOM = {
    hide: false,
    observer: null,
    patched: false,
};
KOM.remove_fight_msgs = () => {
    $('#fight_con, #fight_t1, #fight_t0').hide();
};
KOM.patch_komunikaty = () => {
    if (KOM.patched) return;
    KOM.patched = true;
    var orig_komunikat = GAME.komunikat;
    GAME.komunikat = function(kom) {
        // keep interactive dialogs (require a user choice) even when hiding plain messages
        var isInteractive = typeof kom === 'string' && /data-option=|<(button|input|select|textarea)\b/i.test(kom);
        if (KOM.hide && !isInteractive) return;
        return orig_komunikat.apply(this, arguments);
    };
    var orig_pushNotification = GAME.pushNotification;
    GAME.pushNotification = function() {
        if (KOM.hide) return;
        return orig_pushNotification.apply(this, arguments);
    };
};
KOM.start = () => {
    KOM.hide = true;
    KOM.patch_komunikaty();
    KOM.remove_fight_msgs();
    if (!KOM.observer) {
        KOM.observer = new MutationObserver(() => {
            if (KOM.hide) KOM.remove_fight_msgs();
        });
        KOM.observer.observe(document.body, { childList: true, subtree: true });
    }
};
KOM.stop = () => {
    KOM.hide = false;
    if (KOM.observer) {
        KOM.observer.disconnect();
        KOM.observer = null;
    }
    $('#fight_con, #fight_t1, #fight_t0').show();
};

}
