if (typeof GAME !== 'undefined') {
var INNE = {
    ronin: false,
    karciana: false,
    wymiana: false,
    wait_wymiana: 600,
    cap_wymiana: 0,
    res_id: 0,
    exchange_id: 0,
};
INNE.start = () => {
    if (INNE.wymiana && !GAME.is_loading) {
        INNE.action();
    } else if (GAME.is_loading) {
        window.setTimeout(INNE.start, wait_wymiana);
    }
};

INNE.action = () => {
    INNE.cap_wymiana = $("#inne_Panel input[name=insta_capt]").val();
    if (INNE.ronin) {
        INNE.res_id = document.querySelector('select[name="ronin_opt"]').value;
        INNE.exchange_id = 9;
    }
    if (INNE.karciana) {
        INNE.res_id = document.querySelector('select[name="karciana_opt"]').value;
        INNE.exchange_id = 13;
    }

    window.inter_wymiana = window.setInterval(function() {
        if (INNE.cap_wymiana > 0) {
            console.log("wymiana", INNE.cap_wymiana, INNE.res_id, INNE.exchange_id);
            GAME.emitOrder({a:211,type:2,exchange:INNE.exchange_id,item:INNE.res_id});
        } else if (INNE.cap_wymiana <= 0) {
            clearInterval(inter_wymiana);
            console.log("koniec wymiany");
            INNE.wymiana = false;
            $(".inne_wymiana .inne_status").removeClass("green").addClass("red").html("Off");
        }
        INNE.cap_wymiana--;
    }, 100);
};
}
