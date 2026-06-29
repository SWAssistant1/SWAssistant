var kwsv3 = window.kwsv3;
kwsv3.prototype.findTournamentCategory = function () {
    for (var type = 2; type <= 2; type++) {
        for (var cat = 1; cat <= 69; cat++) {
            if (GAME.isYourTourCat(type, cat, GAME.char_data.reborn, GAME.char_data.level)) {
                this.tournamentCategory = cat;
            }
        }
    }
};

kwsv3.prototype.checkTournamentsSigning = function () {
    if(this.isCheckingTournaments) { console.log("KWA_TOURNAMENTS: currently handling tournaments sign"); return; }
    this.isCheckingTournaments = true;
    var currentServerTime = new Date(GAME.getTime()*1000);
    var currentServerHour = currentServerTime.getHours();
    var currentServerMinute = currentServerTime.getMinutes();
    if(currentServerHour > 20 || currentServerHour < 18) {
        if (this.tourSigned || this.tournamentCategory !== undefined || this.newTournamentID !== undefined) {
            console.log("KWA_TOURNAMENTS: Wrong hours, reset values");
            this.tourSigned = false;
            this.tournamentCategory = undefined;
            this.newTournamentID = undefined;
        }
        this.isCheckingTournaments = false;
    } else if (!this.tourSigned) {
        console.log("KWA_TOURNAMENTS: not signed");
        if ((currentServerHour == 18 && currentServerMinute > 9) || (currentServerHour > 18 && currentServerHour < 21)) {
            console.log("KWA_TOURNAMENTS: correct time");
            this.tourSigned = true;
            this.findTournamentCategory();
            console.log("KWA_TOURNAMENTS: tournament category fetched");
            setTimeout(() => {
                console.log("KWA_TOURNAMENTS: fetch tournaments IDs");
                if (this.tournamentCategory <= 54) {
                    GAME.emitOrder({a: 57, type: 0, type2: 0, page: 1});
                } else {
                    GAME.emitOrder({a: 57, type: 0, type2: 0, page: 2});
                }
            }, 500);
            setTimeout(() => { console.log("KWA_TOURNAMENTS: sign in player");GAME.emitOrder({a: 57, type: 1, tid: this.newTournamentID}); }, 1000);
            // setTimeout(() => { console.log("KWA_TOURNAMENTS: sign in all pets");GAME.emitOrder({a: 57, type: 4}); }, 1500);
            setTimeout(() => { console.log("KWA_TOURNAMENTS: clear popups");kom_clear(); }, 2000);
            setTimeout(() => { this.setTimerForTournamentsReset(); }, 5000);
        } else {
            this.isCheckingTournaments = false;
        }
    } else {
        this.isCheckingTournaments = false;
    }
};

kwsv3.prototype.setTimerForTournamentsReset = function () {
    console.log("KWA_TOURNAMENTS: reset isCheckingTournaments flag");
    this.isCheckingTournaments = false;
};

