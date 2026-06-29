if (typeof GAME === 'undefined') {} else {
kwsv3.prototype.goToNextChar = function () {
    this.resetAFO();
    var charId = this.charactersManager.getNextCharId();
    GAME.emitOrder({ a: 2, char_id: charId });
};

kwsv3.prototype.goToPreviousChar = function () {
    this.resetAFO();
    var charId = this.charactersManager.getPreviousCharId();
    GAME.emitOrder({ a: 2, char_id: charId });
};

kwsv3.prototype.adjustCurrentCharacterId = function () {
    var thisCharId = GAME.char_id;
    if (thisCharId != this.charactersManager.currentCharacterId) {
        this.charactersManager.setCurrentCharacterId(thisCharId);
    }
};

kwsv3.prototype.resetAFO = function () {
    console.log("KWA_RESET_AFO: reset AFO values");
    if ($("#resp_Panel .resp_status").eq(0).hasClass("green")) {
        $("#resp_Panel .resp_button.resp_resp").click();
    }
    if ($("#pvp_Panel .pvp_status").eq(0).hasClass("green")) {
        $("#pvp_Panel .pvp_button.pvp_pvp").click();
    }
    if ($("#lpvm_Panel .lpvm_status").eq(0).hasClass("green")) {
        $("#lpvm_Panel .lpvm_button.lpvm_lpvm").click();
    }
    if ($("#res_Panel .res_status").eq(0).hasClass("green")) {
        $("#res_Panel .res_button.res_res").click();
    }
    if ($(".manage_autoExpeditions").eq(0).hasClass("kws_active_icon")) {
        $(".manage_autoExpeditions").click();
    }
    setTimeout(() => {
        console.log("KWA_RESET_AFO: reset tournaments values");
        this.tourSigned = false;
        this.tournamentCategory = undefined;
        this.newTournamentID = undefined;
        this.isCheckingTournaments = false;
    }, 1000);
};

}
