class ballReset {
    constructor() {
        this.synergy = 6;
        this.hasStarted = false;
        this.bonsCombinations = [];
        this.css = `
            #ballResetPanel { position: absolute; top: 35px; right: 10px; z-index: 9999999; width: 445px; padding: 12px; background: rgba(22,22,26,0.96); border: 1px solid #e3402c; border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display: none; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
            #ballResetPanel .closeBallReset { position: absolute; top: -10px; right: -10px; width: 22px; height: 22px; line-height: 22px; text-align: center; border-radius: 50%; background: #c0392b; color: #fff; font-weight: 700; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.5); transition: filter .15s ease; }
            #ballResetPanel .closeBallReset:hover { filter: brightness(1.15); }
            #ballResetPanel .controller { display: flex; flex-direction: column; align-items: stretch; gap: 6px; margin-bottom: 8px; }
            #ballResetPanel .controller button { font-weight: 700; border: none; border-radius: 6px; padding: 8px 0; cursor: pointer; transition: filter .15s ease; }
            #ballResetPanel .controller button:hover { filter: brightness(1.1); }
            #ballResetPanel .controller button.green { background: #27ae60; color: #fff !important; }
            #ballResetPanel .controller button.red { background: #c0392b; color: #fff !important; }
            #ballResetPanel .controller button:first-child { background: #e3402c; color: #fff !important; }
            #ballResetPanel .controller button:disabled { opacity: .5; background: #555; cursor: not-allowed; filter: none; }
            #ballResetPanel .ballCombination { background: rgba(255,255,255,0.04); border-radius: 6px; padding: 8px; margin-bottom: 6px; }
            #ballResetPanel .ballCombination .combinationID { text-align: center; background: #e3402c; color: #fff; font-weight: 700; font-size: 14px; padding: 4px; border-radius: 4px; margin-bottom: 6px; }
            #ballResetPanel .ballCombination select { width: 100%; margin-bottom: 6px; background: #2a2a30; border: 1px solid #3a3a42; border-radius: 4px; color: #eee; padding: 4px; transition: border-color .15s ease; }
            #ballResetPanel .ballCombination select:focus { outline: none; border-color: #e3402c; }
            #ballResetPanel .ballCombination select:last-child { margin-bottom: 0; }
        `;
        this.innerHTML = ` <div id="ballResetPanel"> <div class="closeBallReset">&times;</div> <div class="controller"> <button class="addCombination">DODAJ NOWĄ KOMBINACJE</button> <button class="startSearching green">SZUKAJ</button> </div> <div class="combinations">${this.bonsCombination(1)}</div> </div> `;
        $("body").append(`<style>${this.css}</style>${this.innerHTML}`);
        $("body").on("click", "#ballResetPanel .closeBallReset", () => {
            if (this.hasStarted) {
                this.controller();
            }
            $("#ballResetPanel").hide();
        });
        $("body").on("click", "#ballResetPanel .addCombination", () => {
            let lastID = parseInt($(".ballCombination:last").attr("combination"));
            lastID++;
            $(".combinations").append(this.bonsCombination(lastID));
        });
        $("body").on("click", "#ballResetPanel .startSearching", () => {
            this.controller();
        });
        $("body").on("click", `button[data-option="ss_page"][data-page="reset"]`, () => {
            GAME.completeProgress = () => {
                var res = GAME.progress;
                switch (res.a) {
                    case 45:
                        if (res.ball) {
                            GAME.parseData(55, res);
                            if (this.hasStarted) {
                                this.search(res);
                            }
                        }
                        break;
                }
                delete GAME.progress;
            }
            $("#ballResetPanel").show();
        });
        $("body").on("click", `button[data-option="ss_page"][data-page="upgrade"], #soulstone_interface .closeicon`, () => {
            if (this.hasStarted) {
                $("#ballResetPanel .startSearching").click();
            }
            $('.ss_stats tr').css("background", "transparent");
            $("#ballResetPanel").hide();
            $("#ss_page_reset").hide();
        });
    }
    controller() {
        if (this.hasStarted) {
            this.hasStarted = false;
            $(".startSearching").removeClass("red").addClass("green").html("SZUKAJ");
            $(".ballCombination select").prop("disabled", false);
            $(".addCombination").prop("disabled", false);
        } else {
            this.hasStarted = true;
            this.search();
            $(".startSearching").removeClass("green").addClass("red").html("STOP");
            $(".ballCombination select").prop("disabled", true);
            $(".addCombination").prop("disabled", true);
        }
    }
    search(res = false) {
        if (this.hasStarted) {
            this.bonsCombinations = this.prepareCombinations();
            if (res) {
                this.ballActualBons = this.prepareBallBons(res);
            } else {
                this.ballActualBons = [0]
            }
            if (!this.compare(this.ballActualBons, this.bonsCombinations)) {
                GAME.socket.emit('ga', {
                    a: 45,
                    type: 1,
                    bid: GAME.ball_id
                });
            } else {
                $(".startSearching").click();
            }
        }
    }
    compare(pattern, others) {
        const patternCounts = this.countOccurrences(pattern);
        for (let i = 0; i < others.length; i++) {
            const other = others[i];
            const otherCounts = this.countOccurrences(other);
            let isValid = true;
            for (const [num, count] of Object.entries(otherCounts)) {
                if (!patternCounts[num] || patternCounts[num] < count) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                return true;
            }
        }
        return false;
    }
    countOccurrences(array) {
        const counts = {};
        for (const num of array) {
            counts[num] = (counts[num] || 0) + 1;
        }
        return counts;
    }
    prepareBallBons(res) {
        let ball = res.ball;
        let bons = [];
        $('.ss_stats tr').css("background", "transparent");
        for (var s = 1; s <= 9; s++) {
            if (ball['stat' + s] && this.bonsCombinations.some(array => array.includes(ball['stat' + s]))) {
                bons.push(ball['stat' + s]);
                $('#stat' + s + '_bon').parent().css("background", "#80008075");
            }
        }
        return bons;
    }
    prepareCombinations() {
        let combinations = [];
        $(".ballCombination").each((index, element) => {
            let combination = [];
            $(element).find("select").each((idx, sel) => {
                const value = parseInt($(sel).val());
                if (value > 0) {
                    combination.push(value);
                }
            });
            if (combination.length > 0) {
                combinations.push(combination);
            }
        });
        return combinations;
    }
    bonsCombination(c) {
        let innerHTML = `<div class="ballCombination" combination="${c}"><div class="combinationID">Kombinacja #${c}</div>`;
        for (let i = 0; i < this.synergy; i++) {
            innerHTML += `${this.listOfBons(c)}`;
        }
        innerHTML += "</div>";
        return innerHTML;
    }
    listOfBons() {
        let innerHTML = ` <select> <option value="0">Brak</option> `;
        this.allBons().forEach((obiekt) => {
            innerHTML += `<option value="${obiekt.id}">${obiekt.bonus}</option>`;
        });
        innerHTML += `</select>`;
        return innerHTML;
    }
    allBons() {
        return [{
            id: 1,
            bonus: 'do obrażeń taijutsu'
        }, {
            id: 2,
            bonus: 'do obrażeń kenjutsu'
        }, {
            id: 3,
            bonus: 'do obrażeń shurikenjutsu'
        }, {
            id: 4,
            bonus: 'do obrażeń ninjutsu'
        }, {
            id: 5,
            bonus: 'do obrażeń genjutsu'
        }, {
            id: 6,
            bonus: 'do obrażeń kinjutsu'
        }, {
            id: 7,
            bonus: 'do obrażeń fizycznych'
        }, {
            id: 8,
            bonus: 'do obrażeń mentalnych'
        }, {
            id: 9,
            bonus: 'do obrony fizycznej'
        }, {
            id: 10,
            bonus: 'do obrony mentalnej'
        }, {
            id: 11,
            bonus: 'do punktów życia'
        }, {
            id: 12,
            bonus: 'do punktów chakry'
        }, {
            id: 13,
            bonus: '% do celności ataków fizycznych'
        }, {
            id: 14,
            bonus: '% do celności ataków mentalnyc'
        }, {
            id: 15,
            bonus: '% do szansy na trafienie krytyczne'
        }, {
            id: 16,
            bonus: '% do obrażeń od trafień krytycznych'
        }, {
            id: 17,
            bonus: '"% do szansy na uniknięcie trafienia krytycznego'
        }, {
            id: 18,
            bonus: '% do redukcji obrażeń od wrogich trafień krytycznych'
        }, {
            id: 19,
            bonus: '% do odporności na ogłuszenia'
        }, {
            id: 20,
            bonus: '% do odporności na zamrożenie'
        }, {
            id: 21,
            bonus: '% do odporności na paraliż'
        }, {
            id: 22,
            bonus: '% do odporności na dezorientację'
        }, {
            id: 23,
            bonus: '% do odporności na krwawienia'
        }, {
            id: 24,
            bonus: '% do odporności na uwięzienia'
        }, {
            id: 25,
            bonus: '% do odporności na żywioł wody'
        }, {
            id: 26,
            bonus: '% do odporności na żywioł ognia'
        }, {
            id: 27,
            bonus: '% do odporności na żywioł wiatru'
        }, {
            id: 28,
            bonus: '% do odporności na żywioł ziemi'
        }, {
            id: 29,
            bonus: '% do odporności na żywioł pioruna'
        }, {
            id: 30,
            bonus: '% do obrażeń'
        }, {
            id: 31,
            bonus: '% redukcja obrażeń'
        }, {
            id: 32,
            bonus: '% do obrażeń PvP'
        }, {
            id: 33,
            bonus: '% redukcja obrażeń PvP'
        }, {
            id: 34,
            bonus: '% do obrażeń PvM'
        }, {
            id: 35,
            bonus: '% redukcja obrażeń PvM'
        }, {
            id: 36,
            bonus: '% do odporności na genjutsu'
        }, {
            id: 37,
            bonus: 'do wynagrodzenia za wygrane walki'
        }, {
            id: 38,
            bonus: '% do zdobywanego doświadczenia'
        }, {
            id: 39,
            bonus: '% do obrażeń taijutsu'
        }, {
            id: 40,
            bonus: '% do obrażeń kenjutsu'
        }, {
            id: 41,
            bonus: '% do obrażeń shurikenjutsu'
        }, {
            id: 42,
            bonus: '% do obrażeń ninjutsu'
        }, {
            id: 43,
            bonus: '% do obrażeń genjutsu'
        }, {
            id: 44,
            bonus: '% do obrażeń kinjutsu'
        }, {
            id: 45,
            bonus: '% do obrażeń technik kekkei genkai'
        }, {
            id: 46,
            bonus: '% do redukcji obrażeń taijutsu'
        }, {
            id: 47,
            bonus: '% do redukcji obrażeń kenjutsu'
        }, {
            id: 48,
            bonus: '% do redukcji obrażeń shurikenjutsu'
        }, {
            id: 49,
            bonus: '% do redukcji obrażeń ninjutsu'
        }, {
            id: 50,
            bonus: '% do redukcji obrażeń genjutsu'
        }, {
            id: 51,
            bonus: '% do redukcji obrażeń kinjutsu'
        }, {
            id: 52,
            bonus: '% do redukcji obrażeń technik kekkei genkai'
        }, {
            id: 53,
            bonus: '% do odporności na podpalenia'
        }, {
            id: 54,
            bonus: '% do odporności na absorpcje chakry'
        }, {
            id: 55,
            bonus: '% do skuteczności technik blokujących'
        }, {
            id: 56,
            bonus: '% do odporności na przejęcie kontroli'
        }, {
            id: 57,
            bonus: '% do skuteczności ogłuszenia'
        }, {
            id: 58,
            bonus: '% do skuteczności ogłuszenia PvP'
        }, {
            id: 59,
            bonus: '% do skuteczności ogłuszenia PvM'
        }, {
            id: 60,
            bonus: '% do skuteczności paraliżu'
        }, {
            id: 61,
            bonus: '% do skuteczności paraliżu PvP'
        }, {
            id: 62,
            bonus: '% do skuteczności paraliżu PvM'
        }, {
            id: 63,
            bonus: '% do skuteczności dezorientacji'
        }, {
            id: 64,
            bonus: '% do do skuteczności dezorientacji PvP'
        }, {
            id: 65,
            bonus: '% do skuteczności dezorientacji PvM'
        }, {
            id: 66,
            bonus: '% do skuteczności krwawienia'
        }, {
            id: 67,
            bonus: '% do skuteczności krwawienia PvP'
        }, {
            id: 68,
            bonus: '% do skuteczności krwawienia PvM'
        }, {
            id: 69,
            bonus: '% do skuteczności uwięzienia'
        }, {
            id: 70,
            bonus: '% do skuteczności uwięzienia PvP'
        }, {
            id: 71,
            bonus: '% do skuteczności uwięzienia PvM'
        }, {
            id: 72,
            bonus: '% do skuteczności podpalenia'
        }, {
            id: 73,
            bonus: '% do skuteczności podpalenia PvP'
        }, {
            id: 74,
            bonus: '% do skuteczności podpalenia PvM'
        }, {
            id: 75,
            bonus: '% do odporności na ogłuszenia PvP'
        }, {
            id: 76,
            bonus: '% do odporności na ogłuszenia PvM'
        }, {
            id: 77,
            bonus: '% do odporności na paraliż PvP'
        }, {
            id: 78,
            bonus: '% do odporności na paraliż PvM'
        }, {
            id: 79,
            bonus: '% do odporności na dezorientację PvP'
        }, {
            id: 80,
            bonus: '% do odporności na dezorientację PvM'
        }, {
            id: 81,
            bonus: '% do odporności na krwawienia PvP'
        }, {
            id: 82,
            bonus: '% do odporności na krwawienia PvM'
        }, {
            id: 83,
            bonus: '% do odporności na uwięzienia PvP'
        }, {
            id: 84,
            bonus: '% do odporności na uwięzienia PvM'
        }, {
            id: 85,
            bonus: '% do odporności na podpalenia PvP'
        }, {
            id: 86,
            bonus: '% do odporności na podpalenia PvM'
        },
		
		
		
		
		
		];
    }
}