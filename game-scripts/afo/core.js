if (typeof GAME === 'undefined') {} else {
function loadGithubScript(path, loadedFlagName, onSuccess) {
    if (window[loadedFlagName]) {
        if (onSuccess) onSuccess();
        return;
    }
    var branch = window.__SWA_BRANCH__ || 'main';
    var url = 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/' + branch + '/' + path + '?t=' + Date.now();
    $.get(url, function (code) {
        window[loadedFlagName] = true;
        var script = document.createElement('script');
        script.textContent = code;
        document.head.appendChild(script);
        script.remove();
        console.info('[AFO] Script injected:', path);
        if (onSuccess) onSuccess();
    }).fail(function () {
        console.error('[AFO] Script load failed:', path);
        GAME.komunikat('Błąd ładowania skryptu (' + path + '), spróbuj ponownie!');
    });
}
function loadExpEngine() {
    loadGithubScript('SWA/scripts/exp.js', '__SWA_EXP_LOADED__');
}
function loadRespawnEngine() {
    loadGithubScript('SWA/scripts/respawn.js', '__SWA_RESPAWN_LOADED__');
}
function loadMissionsEngine() {
    loadGithubScript('SWA/scripts/missions.js', '__SWA_MISSIONS_LOADED__');
}
// Ranki misji odblokowane na postaci są częścią char_data (GAME.char_data.a_1..a_5,
// patrz GAME.useChar / GAME.parseData case 10 w game.js) — dostępne od razu po wejściu
// do gry, więc można je pokazać i pozwolić je wybrać zanim w ogóle wystartuje automat misji.
// a_1..a_5 to ile misji danego ranku jest aktualnie do zrobienia — pokazujemy tylko
// te z ilością > 0, resztę i tak nie da się włączyć (nie ma czego robić).
function renderRanksFromCharData() {
    var ranks = [];
    for (var r = 1; r <= 5; r++) {
        if (parseInt(GAME.char_data['a_' + r]) > 0) {
            ranks.push(LNG['ninja_class' + r]);
        }
    }
    localStorage.setItem('swa_mission_available_ranks', JSON.stringify(ranks));
    renderMissionRankButtons(ranks);
}
function scanMissionRanks() {
    if (typeof GAME === 'undefined' || !GAME.char_data) return;
    renderRanksFromCharData();
    // char_data.a_1..a_5 jest świeże tylko po odwiedzeniu strony obozu (emitOrder a:207) —
    // odświeżamy w tle i renderujemy jeszcze raz, żeby liczby nie były nieaktualne.
    try { GAME.page_switch('game_camp'); } catch (e) { /* page_switch unavailable, skip refresh */ }
    window.setTimeout(renderRanksFromCharData, 600);
}
function renderMissionRankButtons(ranks) {
    var $container = $('#misje_Panel .misje_ranks_container');
    if (!$container.length) return;
    var enabled = {};
    try { enabled = JSON.parse(localStorage.getItem('swa_mission_ranks')) || {}; } catch (e) { enabled = {}; }
    $container.empty();
    (ranks || []).filter(function (rank) { return rank; }).forEach(function (rank) {
        var isOn = !(rank in enabled) || enabled[rank];
        var $btn = $('<div class="misje_button misje_rank" data-rank="' + rank + '">' + rank + '<b class="misje_status ' + (isOn ? 'green' : 'red') + '">' + (isOn ? 'On' : 'Off') + '</b></div>');
        $btn.click(function () {
            var current = {};
            try { current = JSON.parse(localStorage.getItem('swa_mission_ranks')) || {}; } catch (e) { current = {}; }
            var nowOn = !(rank in current) || current[rank];
            current[rank] = !nowOn;
            localStorage.setItem('swa_mission_ranks', JSON.stringify(current));
            var $status = $btn.find('.misje_status');
            if (current[rank]) $status.removeClass('red').addClass('green').html('On');
            else $status.removeClass('green').addClass('red').html('Off');
        });
        $container.append($btn);
    });
}
var SCRIPTS_REGISTRY = [
    { id: 'characterTraining', label: 'Trening postaci', file: 'SWA/scripts/character-training.js' },
    { id: 'insta30', label: 'Insta 30', file: 'SWA/scripts/insta30.js' },
    { id: 'automation7', label: 'Automatyzacja 7', file: 'SWA/scripts/automation-7.js' },
    { id: 'automation8', label: 'Automatyzacja 8', file: 'SWA/scripts/automation-8.js' },
    { id: 'automation9', label: 'Automatyzacja 9', file: 'SWA/scripts/automation-9.js' },
    { id: 'automation10', label: 'Automatyzacja 10', file: 'SWA/scripts/automation-10.js' }
];
function createPanel() {
    const css = `
        #main_Panel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: 80%; z-index: 9999; width: 200px; padding: 0 0 10px 0; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
        #main_Panel .sekcja { background: linear-gradient(135deg,#e3402c,#9c2a1c); color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .6px; text-transform: uppercase; text-align: left; padding: 9px 34px 9px 12px; margin-bottom: 8px; cursor: all-scroll; border-top-left-radius: 9px; border-top-right-radius: 9px; white-space: nowrap; box-sizing: border-box; width: 100%; position: relative; }
        #main_Panel .gh_button { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; margin: 0 8px 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; transition: background .15s ease, color .15s ease; }
        #main_Panel .gh_button:hover { background: rgba(227,64,44,0.28); color: #fff; }
        #main_Panel .gh_status { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 10px; text-transform: uppercase; letter-spacing: .3px; }
        #main_Panel .gh_status.red { background: #c0392b !important; color: #fff !important; }
        #main_Panel .gh_status.green { background: #27ae60 !important; color: #fff !important; }
        #main_Panel .gh_close { position: absolute; top: 50%; right: 10px; transform: translateY(-50%); width: 20px; height: 20px; line-height: 20px; text-align: center; cursor: pointer; color: #fff; font-weight: 700; border-radius: 50%; background: rgba(0,0,0,0.25); transition: background .15s ease; }
        #main_Panel .gh_close:hover { background: rgba(0,0,0,0.5); }
    `;
    const cssscripts = `
        #scripts_Panel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: calc(80% - 420px); z-index: 9999; width: 200px; padding: 0 0 10px 0; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
        #scripts_Panel .sekcja { background: linear-gradient(135deg,#e3402c,#9c2a1c); color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .6px; text-transform: uppercase; text-align: left; padding: 9px 34px 9px 12px; margin-bottom: 8px; cursor: all-scroll; border-top-left-radius: 9px; border-top-right-radius: 9px; white-space: nowrap; box-sizing: border-box; width: 100%; position: relative; }
        #scripts_Panel .scripts_button { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; margin: 0 8px 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; transition: background .15s ease, color .15s ease; }
        #scripts_Panel .scripts_button:hover { background: rgba(227,64,44,0.28); color: #fff; }
        #scripts_Panel .scripts_status { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 10px; text-transform: uppercase; letter-spacing: .3px; }
        #scripts_Panel .scripts_status.red { background: #c0392b !important; color: #fff !important; }
        #scripts_Panel .scripts_status.green { background: #27ae60 !important; color: #fff !important; }
    `;
    const csspvp = `
        #pvp_Panel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: calc(80% - 210px); z-index: 9999; width: 200px; padding: 0 0 10px 0; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
        #pvp_Panel .sekcja { background: linear-gradient(135deg,#e3402c,#9c2a1c); color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .6px; text-transform: uppercase; text-align: left; padding: 9px 34px 9px 12px; margin-bottom: 8px; cursor: all-scroll; border-top-left-radius: 9px; border-top-right-radius: 9px; white-space: nowrap; box-sizing: border-box; width: 100%; position: relative; }
        #pvp_Panel .pvp_button { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; margin: 0 8px 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; transition: background .15s ease, color .15s ease; }
        #pvp_Panel .pvp_button:hover { background: rgba(227,64,44,0.28); color: #fff; }
        #pvp_Panel .pvp_status { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 10px; text-transform: uppercase; letter-spacing: .3px; }
        #pvp_Panel .pvp_status.red { background: #c0392b !important; color: #fff !important; }
        #pvp_Panel .pvp_status.green { background: #27ae60 !important; color: #fff !important; }
        #pvp_Panel .gamee_input, #pvp_Panel .gameee_input { text-align: center; margin: 0 8px 6px; padding: 4px; border-radius: 6px; background: rgba(255,255,255,0.04); }
        #pvp_Panel .gamee_input input, #pvp_Panel .gameee_input input { background: #2a2a30 !important; border: 1px solid #3a3a42 !important; border-radius: 4px; color: #eee !important; transition: border-color .15s ease; }
        #pvp_Panel .gamee_input input:focus, #pvp_Panel .gameee_input input:focus { outline: none; border-color: #e3402c !important; }
        #pvp_Panel .gamee_input input::placeholder, #pvp_Panel .gameee_input input::placeholder { color: #6b6b72; }
    `;
    const cssmisje = `
        #misje_Panel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: calc(80% - 630px); z-index: 9999; width: 200px; padding: 0 0 10px 0; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
        #misje_Panel .sekcja { background: linear-gradient(135deg,#e3402c,#9c2a1c); color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .6px; text-transform: uppercase; text-align: left; padding: 9px 34px 9px 12px; margin-bottom: 8px; cursor: all-scroll; border-top-left-radius: 9px; border-top-right-radius: 9px; white-space: nowrap; box-sizing: border-box; width: 100%; position: relative; }
        #misje_Panel .misje_button { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; margin: 0 8px 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; transition: background .15s ease, color .15s ease; }
        #misje_Panel .misje_button:hover { background: rgba(227,64,44,0.28); color: #fff; }
        #misje_Panel .misje_status { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 10px; text-transform: uppercase; letter-spacing: .3px; }
        #misje_Panel .misje_status.red { background: #c0392b !important; color: #fff !important; }
        #misje_Panel .misje_status.green { background: #27ae60 !important; color: #fff !important; }
        #misje_Panel .misje_ranks_hint { text-align: center; color: #888; font-size: 11px; margin: 0 8px 6px; }
    `;
    const cssresp = `
        #resp_Panel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: calc(80% - 420px); z-index: 9999; width: 200px; padding: 0 0 10px 0; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
        #resp_Panel .sekcja { background: linear-gradient(135deg,#e3402c,#9c2a1c); color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .6px; text-transform: uppercase; text-align: left; padding: 9px 34px 9px 12px; margin-bottom: 8px; cursor: all-scroll; border-top-left-radius: 9px; border-top-right-radius: 9px; white-space: nowrap; box-sizing: border-box; width: 100%; position: relative; }
        #resp_Panel .resp_button { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; margin: 0 8px 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; transition: background .15s ease, color .15s ease; }
        #resp_Panel .resp_button:hover { background: rgba(227,64,44,0.28); color: #fff; }
        #resp_Panel .resp_status { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 10px; text-transform: uppercase; letter-spacing: .3px; }
        #resp_Panel .resp_status.red { background: #c0392b !important; color: #fff !important; }
        #resp_Panel .resp_status.green { background: #27ae60 !important; color: #fff !important; }
        #resp_Panel .gamee_input { text-align: center; margin: 0 8px 6px; padding: 4px; border-radius: 6px; background: rgba(255,255,255,0.04); }
        #resp_Panel .gamee_input input { background: #2a2a30 !important; border: 1px solid #3a3a42 !important; border-radius: 4px; color: #eee !important; text-align: center; }
        #resp_Panel .gamee_input input:focus { outline: none; border-color: #e3402c !important; }
        #resp_Panel .gamee_input label { display: block; font-size: 11px; color: #bbb; margin-bottom: 4px; }
        #resp_Panel .resp_ramen_used { text-align: center; color: #bbb; font-size: 12px; margin: 0 8px 6px; }
        #resp_Panel .resp_sub_select { margin: 0 8px 6px; }
        #resp_Panel .resp_sub_select select { width: 100%; background: #2a2a30 !important; border: 1px solid #3a3a42 !important; border-radius: 4px; color: #eee !important; padding: 4px; }
        #resp_Panel .resp_sub_select select:focus { outline: none; border-color: #e3402c !important; }
        #resp_Panel .resp_senzu_select { margin: 0 8px 6px; }
        #resp_Panel .resp_senzu_select select { width: 100%; background: #2a2a30 !important; border: 1px solid #3a3a42 !important; border-radius: 4px; color: #eee !important; padding: 4px; }
        #resp_Panel .resp_senzu_select select:focus { outline: none; border-color: #e3402c !important; }
    `;
    const cssres = `
        #res_Panel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: calc(80% - 630px); z-index: 9999; width: 200px; padding: 0 0 10px 0; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
        #res_Panel .sekcja { background: linear-gradient(135deg,#e3402c,#9c2a1c); color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .6px; text-transform: uppercase; text-align: left; padding: 9px 34px 9px 12px; margin-bottom: 8px; cursor: all-scroll; border-top-left-radius: 9px; border-top-right-radius: 9px; white-space: nowrap; box-sizing: border-box; width: 100%; position: relative; }
        #res_Panel .res_button { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; margin: 0 8px 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; transition: background .15s ease, color .15s ease; }
        #res_Panel .res_button:hover { background: rgba(227,64,44,0.28); color: #fff; }
        #res_Panel .res_status { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 10px; text-transform: uppercase; letter-spacing: .3px; }
        #res_Panel .res_status.red { background: #c0392b !important; color: #fff !important; }
        #res_Panel .res_status.green { background: #27ae60 !important; color: #fff !important; }
        #res_Panel .bt_cool { margin: 0 8px 6px; font-size: 12px; color: #bbb; }
        #res_Panel ul { list-style: none; max-height: 180px; overflow-y: auto; margin: 0 8px 4px; padding: 4px 8px; background: rgba(255,255,255,0.03); border-radius: 6px; text-align: left; }
        #res_Panel ul > div { border-bottom: 1px solid #2f2f36 !important; color: #ddd !important; padding: 6px 4px !important; margin-bottom: 0 !important; }
        #res_Panel ul > div:last-child { border-bottom: none !important; }
        #res_Panel ul input.select_mine { accent-color: #e3402c; margin-right: 6px; }
        #res_Panel ul::-webkit-scrollbar { width: 6px; }
        #res_Panel ul::-webkit-scrollbar-thumb { background: #e3402c; border-radius: 3px; }
        #res_Panel ul::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
    `;
    const cssinne = `
        #inne_Panel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: calc(80% - 840px); z-index: 9999; width: 200px; padding: 0 0 10px 0; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
        #inne_Panel .sekcja { background: linear-gradient(135deg,#e3402c,#9c2a1c); color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .6px; text-transform: uppercase; text-align: left; padding: 9px 34px 9px 12px; margin-bottom: 8px; cursor: all-scroll; border-top-left-radius: 9px; border-top-right-radius: 9px; white-space: nowrap; box-sizing: border-box; width: 100%; position: relative; }
        #inne_Panel .inne_button { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; margin: 0 8px 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; transition: background .15s ease, color .15s ease; }
        #inne_Panel .inne_button:hover { background: rgba(227,64,44,0.28); color: #fff; }
        #inne_Panel .inne_status { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 10px; text-transform: uppercase; letter-spacing: .3px; }
        #inne_Panel .inne_status.red { background: #c0392b !important; color: #fff !important; }
        #inne_Panel .inne_status.green { background: #27ae60 !important; color: #fff !important; }
        #inne_Panel .pvm_killed { text-align: center; color: #ddd; margin: 0 8px 6px; padding: 6px 0; border-bottom: 1px solid #2f2f36; font-size: 13px; }
        #inne_Panel .gamee_input { text-align: center; margin: 0 8px 6px; padding: 4px; border-radius: 6px; background: rgba(255,255,255,0.04); }
        #inne_Panel .gamee_input input { background: #2a2a30 !important; border: 1px solid #3a3a42 !important; border-radius: 4px; color: #eee !important; }
        #inne_Panel .gamee_input input:focus { outline: none; border-color: #e3402c !important; }
        #inne_Panel .inne_check { margin: 0 8px 6px; }
        #inne_Panel .inne_check select { width: 100%; background: #2a2a30 !important; border: 1px solid #3a3a42 !important; border-radius: 4px; color: #eee !important; padding: 4px; }
        #inne_Panel .inne_check select:focus { outline: none; border-color: #e3402c !important; }
    `;
    const csssety = `
        #sety_Panel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: calc(80% - 1260px); z-index: 9999; width: 220px; padding: 0 0 10px 0; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
        #sety_Panel .sekcja { background: linear-gradient(135deg,#e3402c,#9c2a1c); color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .6px; text-transform: uppercase; text-align: left; padding: 9px 34px 9px 12px; margin-bottom: 8px; cursor: all-scroll; border-top-left-radius: 9px; border-top-right-radius: 9px; white-space: nowrap; box-sizing: border-box; width: 100%; position: relative; }
        #sety_Panel .eqs_row { display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; margin: 0 8px 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; }
        #sety_Panel .eqs_name { flex: 1; min-width: 0; background: #2a2a30; border: 1px solid #3a3a42; border-radius: 4px; color: #eee; padding: 3px 6px; font-size: 12px; }
        #sety_Panel .eqs_name:focus { outline: none; border-color: #e3402c; }
        #sety_Panel .eqs_save, #sety_Panel .eqs_equip { cursor: pointer; border: none; border-radius: 4px; padding: 4px 8px; margin-left: 6px; font-size: 12px; color: #fff; }
        #sety_Panel .eqs_save { background: #3a6fb5; }
        #sety_Panel .eqs_save:hover { background: #4d85d1; }
        #sety_Panel .eqs_equip { background: #27ae60; }
        #sety_Panel .eqs_equip:hover { background: #2ecc71; }
    `;
    const csskarty = `
        #karty_Panel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: calc(80% - 1470px); z-index: 9999; width: 220px; padding: 0 0 10px 0; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
        #karty_Panel .sekcja { background: linear-gradient(135deg,#e3402c,#9c2a1c); color: #fff; font-weight: 700; font-size: 13px; letter-spacing: .6px; text-transform: uppercase; text-align: left; padding: 9px 34px 9px 12px; margin-bottom: 8px; cursor: all-scroll; border-top-left-radius: 9px; border-top-right-radius: 9px; white-space: nowrap; box-sizing: border-box; width: 100%; position: relative; }
        #karty_Panel .eqs_row { display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; margin: 0 8px 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; }
        #karty_Panel .eqs_name { flex: 1; min-width: 0; background: #2a2a30; border: 1px solid #3a3a42; border-radius: 4px; color: #eee; padding: 3px 6px; font-size: 12px; }
        #karty_Panel .eqs_name:focus { outline: none; border-color: #e3402c; }
        #karty_Panel .eqs_save, #karty_Panel .eqs_equip { cursor: pointer; border: none; border-radius: 4px; padding: 4px 8px; margin-left: 6px; font-size: 12px; color: #fff; }
        #karty_Panel .eqs_save { background: #3a6fb5; }
        #karty_Panel .eqs_save:hover { background: #4d85d1; }
        #karty_Panel .eqs_equip { background: #27ae60; }
        #karty_Panel .eqs_equip:hover { background: #2ecc71; }
    `;
    $("#main_Panel, #pvp_Panel, #resp_Panel, #res_Panel, #inne_Panel, #sety_Panel, #karty_Panel, #scripts_Panel, #misje_Panel").remove();
    const html = ` <div id="main_Panel"> <div class="sekcja panel_dragg">ALL FOR ONE<div class="gh_close">&times;</div></div> <div class='gh_button gh_resp'>PVM<b class='gh_status red'>Off</b></div> <div class='gh_button gh_pvp'>PVP<b class='gh_status red'>Off</b></div>  <div class='gh_button gh_res'>Zbierajka<b class='gh_status red'>Off</b></div> <div class='gh_button gh_inne'>Inne<b class='gh_status red'>Off</b></div> <div class='gh_button gh_kom'>Komunikaty<b class='gh_status red'>Off</b></div> <div class='gh_button gh_sety'>Sety EQ<b class='gh_status red'>Off</b></div> <div class='gh_button gh_karty'>Sety Kart<b class='gh_status red'>Off</b></div> <div class='gh_button gh_scripts'>Skrypty<b class='gh_status red'>Off</b></div> <div class='gh_button gh_misje'>Misje<b class='gh_status red'>Off</b></div> </div> `;
    const SETY_panel = ` <div id="sety_Panel" style="display:none;"> <div class="sekcja sety_dragg">SETY EKWIPUNKU</div>
        <div class='eqs_row'><input class='eqs_name' data-idx='0' value='Set 1' /><button class='eqs_save' data-idx='0'>Zapisz</button><button class='eqs_equip' data-idx='0'>Załóż</button></div>
        <div class='eqs_row'><input class='eqs_name' data-idx='1' value='Set 2' /><button class='eqs_save' data-idx='1'>Zapisz</button><button class='eqs_equip' data-idx='1'>Załóż</button></div>
        <div class='eqs_row'><input class='eqs_name' data-idx='2' value='Set 3' /><button class='eqs_save' data-idx='2'>Zapisz</button><button class='eqs_equip' data-idx='2'>Załóż</button></div>
        <div class='eqs_row'><input class='eqs_name' data-idx='3' value='Set 4' /><button class='eqs_save' data-idx='3'>Zapisz</button><button class='eqs_equip' data-idx='3'>Załóż</button></div>
        <div class='eqs_row'><input class='eqs_name' data-idx='4' value='Set 5' /><button class='eqs_save' data-idx='4'>Zapisz</button><button class='eqs_equip' data-idx='4'>Załóż</button></div>
    </div> `;
    const KARTY_panel = ` <div id="karty_Panel" style="display:none;"> <div class="sekcja karty_dragg">SETY KART DUSZ</div>
        <div class='eqs_row'><input class='eqs_name' data-idx='0' value='Karty 1' /><button class='eqs_save' data-idx='0'>Zapisz</button><button class='eqs_equip' data-idx='0'>Załóż</button></div>
        <div class='eqs_row'><input class='eqs_name' data-idx='1' value='Karty 2' /><button class='eqs_save' data-idx='1'>Zapisz</button><button class='eqs_equip' data-idx='1'>Załóż</button></div>
        <div class='eqs_row'><input class='eqs_name' data-idx='2' value='Karty 3' /><button class='eqs_save' data-idx='2'>Zapisz</button><button class='eqs_equip' data-idx='2'>Załóż</button></div>
        <div class='eqs_row'><input class='eqs_name' data-idx='3' value='Karty 4' /><button class='eqs_save' data-idx='3'>Zapisz</button><button class='eqs_equip' data-idx='3'>Załóż</button></div>
        <div class='eqs_row'><input class='eqs_name' data-idx='4' value='Karty 5' /><button class='eqs_save' data-idx='4'>Zapisz</button><button class='eqs_equip' data-idx='4'>Załóż</button></div>
    </div> `;
    const PVP_panel = ` <div id="pvp_Panel" style="display:none;"> <div class="sekcja pvp_dragg">PVP</div> <div class='pvp_button pvp_pvp'>PVP<b class='pvp_status red'>Off</b></div>  <div class='pvp_button pvp_zmieniaj'>Zmieniaj postki <b class='pvp_status red'>Off</b></div> <div class='pvp_button pvp_WI'>Wojny <b class='pvp_status red'>Off</b></div> <div class='pvp_button pvp_org'> wynajmij orge <b class='pvp_status red'>Off</b></div>   <div class='gameee_input'><select style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' name='org_id'><option value='1'>Slayers - 69 złota</option><option value='2'>Akatsuki - 1 złota</option><option value='3'>Ironman - 1 złota</option><option value='7'>Dragon - 1 złota</option><option value='10'>Power - 5000000 złota</option><option value='12'>Amagishi - 10 złota</option><option value='13'>GZSPL - 100000 złota</option></select></div> <div class='pvp_button pvp_WK'>Wojny Klanowe<b class='pvp_status red'>Off</b></div>  <div class='gamee_input'><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="Lista wojen" name='pvp_capt' value='' /></div> <div class='gameee_input'><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="Szybkość 10-100" name='speed_capt' value='50' /></div> </div> `;
    const RESP_panel = ` <div id="resp_Panel" style="display:none;"> <div class="sekcja resp_dragg">SPAWN MOBKóW</div> <div class="resp_button resp_resp">On<b class="resp_status red">Off</b></div>  <div class="resp_button resp_resp1">Resp<b class="resp_status red">Off</b></div> <div class="resp_button resp_rare">exp<b class="resp_status red">Off</b></div> <div class="resp_button resp_normal">Niszczenie eq<b class="resp_status red">Off</b></div> <div class="resp_button resp_leg">Niszczenie leq<b class="resp_status red">Off</b></div> <div class='resp_senzu_select'><select name='resp_senzu_select'><option value="">Wyłączony</option><option value="BLUE">Ogromny ramen</option><option value="GREEN">maly ramen</option><option value="PURPLE">Powiekszony ramen</option><option value="YELLOW">zolta pigula</option><option value="RED">zielona pigula</option><option value="MAGIC">Czerwona pigula</option></select></div>    <div class="resp_button resp_on">Włącz All<b class="resp_status green">On</b></div> <div class="resp_button resp_off">Wyłącz All<b class="resp_status red">Off</b></div>  <div class='gamee_input'><label>Min PA</label><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="Min PA (próg jedzenia)" name='resp_min_pa' value='5000' /></div> <div class='gamee_input'><label>Ilość ramenów do użycia (0=brak limitu)</label><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="Max ramenów (0=brak)" name='resp_max_ramen' value='0' /></div> <div class='resp_ramen_used'>Zużyto: 0</div> <div class='resp_sub_select'><select name='resp_sub_select'></select></div> <div class="resp_button resp_rank_normal">Normal<b class="resp_status green">On</b></div> <div class="resp_button resp_rank_champion">Champion<b class="resp_status green">On</b></div> <div class="resp_button resp_rank_elite">Elite<b class="resp_status green">On</b></div> <div class="resp_button resp_rank_boss">Boss<b class="resp_status green">On</b></div>   </div> `;
    const RES_panel = ` <div id="res_Panel" style="display:none;"> <div class="sekcja res_dragg">SUROWCE</div> <div class="res_button res_res">ZBIERAJ<b class="res_status red">Off</b></div> <div class="bt_cool" style="text-align:center; color:white;"></div> <ul></ul> </div> `;
    const MISJE_panel = ` <div id="misje_Panel" style="display:none;"> <div class="sekcja misje_dragg">MISJE</div> <div class="misje_button misje_main">Misje<b class="misje_status red">Off</b></div> <div class="misje_ranks_hint">Misje dostępne dla postaci:</div> <div class="misje_ranks_container"></div> </div> `;
    const SCRIPTS_panel = ` <div id="scripts_Panel" style="display:none;"> <div class="sekcja scripts_dragg">SKRYPTY</div> ` +
        SCRIPTS_REGISTRY.map(function (s) {
            return `<div class="scripts_button scripts_${s.id}" data-file="${s.file}" data-flag="__SWA_SCRIPT_${s.id}_LOADED__">${s.label}<b class="scripts_status red">Off</b></div>`;
        }).join('') +
        ` </div> `;
    const INNE_Panel = `<div id="inne_Panel" style="display:none;"> <div class="sekcja inne_dragg">Inne</div> <div class="inne_button inne_wymiana">Wymiana<strong class="inne_status red">Off</strong></div>
        <div class="inne_button inne_ronin">Ronin<strong class="inne_status red">Off</strong></div>
        <div class="inne_button inne_karciana">Karciana<strong class="inne_status red">Off</strong></div>
        <div class="inne_check ronin_opt1"><select 
        style="width: 150px; margin-left: -2px; background: grey; text-align: center; font-size: 16;" name="ronin_opt">
        <option value="82">Krysztal chakry</option>
        <option value="83">Inverter</option>
        <option value="84">Ulepszacz</option>
        <option value="85">Prowo boss</option>
        <option value="86">Misja S</option>
        <option value="87">Subka 3x</option>
        <option value="88">Zwoj resetu</option>
        <option value="89">Zwoj transferu</option>
        <option value="90">Zwoj exp</option>
        <option value="91">Maly ramen</option>
        </select></div>
        <div class="inne_check karciana_opt1"><select style="width: 150px; margin-left: -2px; background: grey; text-align: center; font-size: 16;" name="karciana_opt">
        <option value="122">Karta dusz</option>
        <option value="123">Esencja dusz</option>
        <option value="124">Powiekszony ramen</option>
        <option value="125">Epicki zwoj</option>
        <option value="126">Esencja jakosci</option>
        <option value="127">zwoj resetu</option>
        <option value="128">zwoj teleportacji</option>
        <option value="129">Inverter</option>
        <option value="130">Ulepszacz</option>
        </select>
        </div>
        <div class="gamee_input insta_capt1"><input style="width: 150px; margin-left: -2px; background: grey; text-align: center; font-size: 16;" name="insta_capt" type="text" value="50" placeholder="Szybkość 10-1000" /></div>
    </div> `
    
    $("body").append(`<style>${css}</style>${html}`);
    $("body").append(`<style>${csspvp}</style>${PVP_panel}`);
    $("body").append(`<style>${cssresp}</style>${RESP_panel}`);
    $("body").append(`<style>${cssinne}</style>${INNE_Panel}`);
    $("body").append(`<style>${cssres}</style>${RES_panel}`);
    $("body").append(`<style>${csssety}</style>${SETY_panel}`);
    $("body").append(`<style>${csskarty}</style>${KARTY_panel}`);
    $("body").append(`<style>${cssscripts}</style>${SCRIPTS_panel}`);
    $("body").append(`<style>${cssmisje}</style>${MISJE_panel}`);
    $("#pvp_Panel").hide();
    $("#resp_Panel").hide();
    $("#res_Panel").hide();
    $("#inne_Panel").hide();
    $("#sety_Panel").hide();
    $("#karty_Panel").hide();
    $("#scripts_Panel").hide();
    $("#misje_Panel").hide();
    function makeDraggable($panel, handleSelector) {
        var panel = $panel[0];
        if (!panel) return;
        var dragging = false, startX = 0, startY = 0, startLeft = 0, startTop = 0;
        $panel.on("mousedown", handleSelector, function(e) {
            if ($(e.target).closest(".gh_close").length) return;
            dragging = true;
            var rect = panel.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            startLeft = rect.left;
            startTop = rect.top;
            panel.style.left = startLeft + "px";
            panel.style.top = startTop + "px";
            panel.style.right = "auto";
            panel.style.bottom = "auto";
            e.preventDefault();
        });
        $(document).on("mousemove.swaDrag" + panel.id, function(e) {
            if (!dragging) return;
            panel.style.left = (startLeft + (e.clientX - startX)) + "px";
            panel.style.top = (startTop + (e.clientY - startY)) + "px";
        });
        $(document).on("mouseup.swaDrag" + panel.id, function() {
            dragging = false;
        });
    }
    makeDraggable($("#main_Panel"), ".panel_dragg");
    makeDraggable($("#pvp_Panel"), ".pvp_dragg");
    makeDraggable($("#resp_Panel"), ".resp_dragg");
    makeDraggable($("#res_Panel"), ".res_dragg");
    makeDraggable($("#inne_Panel"), ".inne_dragg");
    makeDraggable($("#sety_Panel"), ".sety_dragg");
    makeDraggable($("#karty_Panel"), ".karty_dragg");
    makeDraggable($("#scripts_Panel"), ".scripts_dragg");
    makeDraggable($("#misje_Panel"), ".misje_dragg");
    $('#main_Panel .gh_pvp').click(() => {
        if ($(".gh_pvp .gh_status").hasClass("red")) {
            $(".gh_pvp .gh_status").removeClass("red").addClass("green").html("On");
            $("#pvp_Panel").show();
        } else {
            $(".gh_pvp .gh_status").removeClass("green").addClass("red").html("Off");
            $("#pvp_Panel").hide();
            $(".pvp_pvp .pvp_status").removeClass("green").addClass("red").html("Off");
            PVP.stop = true;
        }
    });
    $('#main_Panel .gh_resp').click(() => {
        console.log("resp  clicked");
        if ($(".gh_resp .gh_status").hasClass("red")) {
            $(".gh_resp .gh_status").removeClass("red").addClass("green").html("On");
            $("#resp_Panel").show();
        } else {
            $(".gh_resp .gh_status").removeClass("green").addClass("red").html("Off");
            $("#resp_Panel").hide();
            RESP.stop = true;
            $(".resp_resp .resp_status").removeClass("green").addClass("red").html("Off");
        }
    });
    $('#main_Panel .gh_res').click(() => {
        console.log("res inne clicked");
        if ($(".gh_res .gh_status").hasClass("red")) {
            $(".gh_res .gh_status").removeClass("red").addClass("green").html("On");
            $("#res_Panel").show();
        } else {
            $(".gh_res .gh_status").removeClass("green").addClass("red").html("Off");
            $("#res_Panel").hide();
            RES.stop = true;
            $(".res_res .res_status").removeClass("green").addClass("red").html("Off");
        }
    });
    $('#main_Panel .gh_inne').click(() => {
        console.log("inne clicked");
        if ($(".gh_inne .gh_status").hasClass("red")) {
            $(".gh_inne .gh_status").removeClass("red").addClass("green").html("On");
            $("#inne_Panel").show();
            $("#inne_Panel .karciana_opt1").hide();
            $("#inne_Panel .insta_capt1").hide();
            $("#inne_Panel .ronin_opt1").hide();
        } else {
            $(".gh_inne .gh_status").removeClass("green").addClass("red").html("Off");
            $("#inne_Panel").hide();
            $("#inne_Panel .karciana_opt1").hide();
            $("#inne_Panel .insta_capt1").hide();
            $("#inne_Panel .ronin_opt1").hide();
            $(".inne_wymiana .inne_status").removeClass("green").addClass("red").html("Off");
        }
    });

    $('#main_Panel .gh_kom').click(() => {
        if (KOM.hide) {
            $(".gh_kom .gh_status").removeClass("green").addClass("red").html("Off");
            KOM.stop();
        } else {
            $(".gh_kom .gh_status").removeClass("red").addClass("green").html("On");
            KOM.start();
        }
    });

    $('#main_Panel .gh_sety').click(() => {
        if ($(".gh_sety .gh_status").hasClass("red")) {
            $(".gh_sety .gh_status").removeClass("red").addClass("green").html("On");
            $("#sety_Panel").show();
        } else {
            $(".gh_sety .gh_status").removeClass("green").addClass("red").html("Off");
            $("#sety_Panel").hide();
        }
    });

    $('#main_Panel .gh_karty').click(() => {
        if ($(".gh_karty .gh_status").hasClass("red")) {
            $(".gh_karty .gh_status").removeClass("red").addClass("green").html("On");
            $("#karty_Panel").show();
        } else {
            $(".gh_karty .gh_status").removeClass("green").addClass("red").html("Off");
            $("#karty_Panel").hide();
        }
    });

    $('#main_Panel .gh_scripts').click(() => {
        if ($(".gh_scripts .gh_status").hasClass("red")) {
            $(".gh_scripts .gh_status").removeClass("red").addClass("green").html("On");
            $("#scripts_Panel").show();
        } else {
            $(".gh_scripts .gh_status").removeClass("green").addClass("red").html("Off");
            $("#scripts_Panel").hide();
        }
    });

    $('#main_Panel .gh_misje').click(() => {
        if ($(".gh_misje .gh_status").hasClass("red")) {
            $(".gh_misje .gh_status").removeClass("red").addClass("green").html("On");
            $("#misje_Panel").show();
            scanMissionRanks();
        } else {
            $(".gh_misje .gh_status").removeClass("green").addClass("red").html("Off");
            $("#misje_Panel").hide();
        }
    });

    $('#main_Panel .gh_close').click((e) => {
        e.stopPropagation();
        $(".gh_pvp .gh_status, .gh_resp .gh_status, .gh_res .gh_status, .gh_inne .gh_status, .gh_kom .gh_status, .gh_sety .gh_status, .gh_karty .gh_status, .gh_scripts .gh_status, .gh_misje .gh_status").removeClass("green").addClass("red").html("Off");
        $("#pvp_Panel, #resp_Panel, #res_Panel, #inne_Panel, #sety_Panel, #karty_Panel, #scripts_Panel, #misje_Panel").hide();
        PVP.stop = true;
        RESP.stop = true;
        RES.stop = true;
        KOM.stop();
        $(".pvp_pvp .pvp_status, .resp_resp .resp_status, .res_res .res_status, .inne_wymiana .inne_status, .inne_ronin .inne_status, .inne_karciana .inne_status, .misje_main .misje_status").removeClass("green").addClass("red").html("Off");
        $("#main_Panel").hide();
    });

    $('#inne_Panel .inne_ronin').click(() => {
        if ($(".inne_ronin .inne_status").hasClass("red")) {
            $(".inne_ronin .inne_status").removeClass("red").addClass("green").html("On");
            $("#inne_Panel .insta_capt1").show();
            $("#inne_Panel .ronin_opt1").show();
            $("#inne_Panel .karciana_opt1").hide();
            $(".inne_karciana .inne_status").removeClass("green").addClass("red").html("Off");
            INNE.karciana = false;
            INNE.ronin = true;
        } else {
            $(".inne_ronin .inne_status").removeClass("green").addClass("red").html("Off");
            $("#inne_Panel .karciana_opt1").hide();
            $("#inne_Panel .insta_capt1").hide();
            $("#inne_Panel .ronin_opt1").hide();
            $(".inne_karciana .inne_status").removeClass("green").addClass("red").html("Off");
            INNE.karciana = false;
            INNE.ronin = false;
        }
    });

    $('#inne_Panel .inne_karciana').click(() => {
        if ($(".inne_karciana .inne_status").hasClass("red")) {
            $(".inne_karciana .inne_status").removeClass("red").addClass("green").html("On");
            $("#inne_Panel .insta_capt1").show();
            $("#inne_Panel .ronin_opt1").hide();
            $("#inne_Panel .karciana_opt1").show();
            $(".inne_ronin .inne_status").removeClass("green").addClass("red").html("Off");
            INNE.karciana = true;
            INNE.ronin = false;
        } else {
            $(".inne_karciana .inne_status").removeClass("green").addClass("red").html("Off");
            $("#inne_Panel .karciana_opt1").hide();
            $("#inne_Panel .insta_capt1").hide();
            $("#inne_Panel .ronin_opt1").hide();
            $(".inne_ronin .inne_status").removeClass("green").addClass("red").html("Off");
            INNE.karciana = false;
            INNE.ronin = false;
        }
    });

    $('#inne_Panel .inne_wymiana').click(() => {
        if ($(".inne_wymiana .inne_status").hasClass("red")) {
            if ($(".inne_karciana .inne_status").hasClass("red") && ($(".inne_ronin .inne_status").hasClass("red"))) {
                return;
            }
            $(".inne_wymiana .inne_status").removeClass("red").addClass("green").html("On");
            INNE.wymiana = true;
            INNE.start();
        } else {
            INNE.wymiana = false;
            INNE.karciana = false;
            INNE.ronin = false;
            $(".inne_wymiana .inne_status").removeClass("green").addClass("red").html("Off");
            $("#inne_Panel .karciana_opt1").hide();
            $("#inne_Panel .insta_capt1").hide();
            $("#inne_Panel .ronin_opt1").hide();
            $(".inne_ronin .inne_status").removeClass("green").addClass("red").html("Off");
            $(".inne_karciana .inne_status").removeClass("green").addClass("red").html("Off");

        }
    });

    $('#pvp_Panel .pvp_pvp').click(() => {
        if (PVP.stop) {
            $(".pvp_pvp .pvp_status").removeClass("red").addClass("green").html("On");
            PVP.stop = false;
            PVP.start();
            RESP.stop = true;
            RES.stop = true;
            $(".res_res .res_status").removeClass("green").addClass("red").html("Off");
            $(".resp_resp .resp_status").removeClass("green").addClass("red").html("Off");
        } else {
            $(".pvp_pvp .pvp_status").removeClass("green").addClass("red").html("Off");
            PVP.stop = true;
        }
    });

    $('#pvp_Panel .pvp_WI').click(() => {
        if (PVP.wi) {
            $(".pvp_WI .pvp_status").removeClass("green").addClass("red").html("Off");
            PVP.wi = false;
        } else {
            $(".pvp_WI .pvp_status").removeClass("red").addClass("green").html("On");
            PVP.wi = true;
        }
    });

    $('#pvp_Panel .pvp_org').click(() => {
        if (PVP.org) {
            $(".pvp_org .pvp_status").removeClass("green").addClass("red").html("Off");
            PVP.org = false;
        } else {
            $(".pvp_org .pvp_status").removeClass("red").addClass("green").html("On");
            PVP.org = true;
        }
    });

    $('#pvp_Panel .pvp_WK').click(() => {
        if (PVP.wk) {
            $(".pvp_WK .pvp_status").removeClass("green").addClass("red").html("Off");
            PVP.wk = false;
        } else {
            $(".pvp_WK .pvp_status").removeClass("red").addClass("green").html("On");
            PVP.wk = true;
        }
    });
    
    $('#pvp_Panel .pvp_zmieniaj').click(() => {
        if (PVP.zmieniaj) {
            $(".pvp_zmieniaj .pvp_status").removeClass("green").addClass("red").html("Off");
            PVP.zmieniaj = false;
            PVP.chars = [];
        } else {
            $(".pvp_zmieniaj .pvp_status").removeClass("red").addClass("green").html("On");
            for(i=0; i<GAME.player_chars; i++){
                char = $("li[data-option=select_char]").eq(i);
                PVP.chars.push(char.attr("data-char_id"));
            }
            PVP.zmieniaj = true;
        }
    });

    $("#pvp_Panel input[name=pvp_capt]").val(PVP.clan_list);
    $("#pvp_Panel input[name=speed_capt]").val(PVP.speed);

    $("#resp_Panel input[name=resp_max_ramen]").val(RESP.maxRamen);
    RESP.updateRamenCounter();
    $('#resp_Panel input[name=resp_max_ramen]').change((e) => {
        RESP.maxRamen = parseInt($(e.target).val()) || 0;
        RESP.updateRamenCounter();
    });

    $("#resp_Panel input[name=resp_min_pa]").val(RESP.minPa);
    $('#resp_Panel input[name=resp_min_pa]').change((e) => {
        RESP.minPa = parseInt($(e.target).val()) || 0;
    });

    RESP.populateSubSelect();
    $('#resp_Panel select[name=resp_sub_select]').change((e) => {
        localStorage.setItem('swa_sub_label', $(e.target).val());
    });

    var expRanks = JSON.parse(localStorage.getItem('swa_exp_ranks') || '[true,true,true,true]');
    ['normal', 'champion', 'elite', 'boss'].forEach((name, idx) => {
        var $btn = $('#resp_Panel .resp_rank_' + name);
        var $status = $btn.find('.resp_status');
        if (!expRanks[idx]) $status.removeClass('green').addClass('red').html('Off');
        $btn.click(() => {
            expRanks[idx] = !expRanks[idx];
            if (expRanks[idx]) $status.removeClass('red').addClass('green').html('On');
            else $status.removeClass('green').addClass('red').html('Off');
            localStorage.setItem('swa_exp_ranks', JSON.stringify(expRanks));
        });
    });

    $('#resp_Panel .resp_on').hide();
    $('#resp_Panel .resp_off').hide();
    $('#resp_Panel .resp_resp').click(() => {
        if (RESP.stop && GAME.field_mobs) {
            $(".resp_resp .resp_status").removeClass("red").addClass("green").html("On");
            RESP.stop = false;
            RESP.action();
            RESP.reloadint = setInterval(RESP.reload_map, 60000);
            PVP.stop = true;
            RESP.loc = GAME.char_data.loc;
            $(".pvp_pvp .pvp_status").removeClass("green").addClass("red").html("Off");
        } else {
            $(".resp_resp .resp_status").removeClass("green").addClass("red").html("Off");
            RESP.stop = true;
            clearInterval(RESP.reloadint);
        }
    });
    
    $('#resp_Panel .resp_resp1').click(() => {
        if ($(".resp_resp1 .resp_status").hasClass("red")) {
            $(".resp_resp1 .resp_status").removeClass("red").addClass("green").html("On");
            loadRespawnEngine();
        } else {
            $(".resp_resp1 .resp_status").removeClass("green").addClass("red").html("Off");
        }
    });
    $('#resp_Panel .resp_normal').click(() => {
        if (RESP.normal) {
            $(".resp_normal .resp_status").removeClass("green").addClass("red").html("Off");
            RESP.normal = false;
        } else {
            $(".resp_normal .resp_status").removeClass("red").addClass("green").html("On");
            RESP.normal = true;
        }
    });
    $('#resp_Panel .resp_rare').click(() => {
        if (RESP.rare) {
            $(".resp_rare .resp_status").removeClass("green").addClass("red").html("Off");
            RESP.rare = false;
        } else {
            $(".resp_rare .resp_status").removeClass("red").addClass("green").html("On");
            RESP.rare = true;
            loadExpEngine();
        }
    });
    $('#resp_Panel .resp_leg').click(() => {
        if (RESP.leg) {
            $(".resp_leg .resp_status").removeClass("green").addClass("red").html("Off");
            RESP.lge = false;
        } else {
            $(".resp_leg .resp_status").removeClass("red").addClass("green").html("On");
            RESP.leg = true;
        }
    });
    $('#resp_Panel .resp_sub').click(() => {
        if (RESP.checkOST) {
            $(".resp_sub .resp_status").removeClass("green").addClass("red").html("Off");
            RESP.checkOST = false;
            $('#resp_Panel .resp_ost').hide();
        } else {
            $(".resp_sub .resp_status").removeClass("red").addClass("green").html("On");
            RESP.checkOST = true;
            $('#resp_Panel .resp_ost').show();
        }
    });
    $('#resp_Panel .resp_ost').click(() => {
        if (RESP.zmiana) {
            $(".resp_ost .resp_status").html("Ost");
            RESP.zmiana = false;
            RESP.jaka = 0;
        } else {
            $(".resp_ost .resp_status").html("x20");
            RESP.zmiana = true;
            RESP.jaka = 1;
        }
    });
    $('#resp_Panel .resp_multi').click(() => {
        if (RESP.multifight) {
            $(".resp_multi .resp_status").removeClass("green").addClass("red").html("Off");
            RESP.multifight = false;
        } else {
            $(".resp_multi .resp_status").removeClass("red").addClass("green").html("On");
            RESP.multifight = true;
        }
    });
    $('#resp_Panel .resp_ssj').click(() => {
        if (RESP.checkSSJ) {
            $(".resp_ssj .resp_status").removeClass("green").addClass("red").html("Off");
            RESP.checkSSJ = false;
        } else {
            $(".resp_ssj .resp_status").removeClass("red").addClass("green").html("On");
            RESP.checkSSJ = true;
        }
    });
    var SENZU_SELECT_MAP = {
        BLUE: RESP.SENZU_BLUE,
        GREEN: RESP.SENZU_GREEN,
        PURPLE: RESP.SENZU_PURPLE,
        YELLOW: RESP.SENZU_YELLOW,
        RED: RESP.SENZU_RED,
        MAGIC: RESP.SENZU_MAGIC
    };
    $('#resp_Panel select[name=resp_senzu_select]').change((e) => {
        var val = $(e.target).val();
        if (!val) {
            RESP.CONF_SENZU = false;
        } else {
            var type = SENZU_SELECT_MAP[val];
            RESP.CONF_SENZU = type;
            RESP.selectSenzu(type);
        }
    });

    $('#res_Panel .res_res').click(() => {
        if (RES.stop && Object.entries(GAME.map_mines.mine_data).length > 0) {
            $(".res_res .res_status").removeClass("red").addClass("green").html("On");
            RES.stop = false;
            RES.Start();
            PVP.stop = true;
            RES.loc = GAME.char_data.loc;
            $(".pvp_pvp .pvp_status").removeClass("green").addClass("red").html("Off");
        } else {
            $(".res_res .res_status").removeClass("green").addClass("red").html("Off");
            RES.stop = true;
            $(".bt_cool").html("");
            clearTimeout(RES.cdt);
        }
    });
    $("body").on("click", "#res_Panel .select_mine", function() {
        if (RES.stop) {
            RES.refresh_mines = true;
            RES.mined_id = [];
            $('.select_mine').prop('checked', false);
            $(this).prop('checked', true);
            $('#res_Panel .select_mine:checked').each(function() {
                id = parseInt($(this).val());
                RES.mined_id.push(id);
            });
        } else {
            $(this).click();
            GAME.komunikat("Zatrzymaj najpierw skrypt!");
        }
    });

    $('#pvp_Panel .gameee_input').change((e) => {
        PVP.WSP = parseInt($(e.target).val());
        PVP.save_speed();
    });
    $('#pvp_Panel .gamee_input').change((e) => {
        PVP.war = $(e.target).val();
        PVP.save_clan_list();
    });

    $('#sety_Panel .eqs_save').click((e) => {
        EQS.save(parseInt($(e.currentTarget).data('idx')));
    });
    $('#sety_Panel .eqs_equip').click((e) => {
        EQS.equip(parseInt($(e.currentTarget).data('idx')));
    });

    $('#karty_Panel .eqs_save').click((e) => {
        KARTY.save(parseInt($(e.currentTarget).data('idx')));
    });
    $('#karty_Panel .eqs_equip').click((e) => {
        KARTY.equip(parseInt($(e.currentTarget).data('idx')));
    });

    $('#scripts_Panel .scripts_button').each(function () {
        var $btn = $(this);
        var file = $btn.data('file');
        var flag = $btn.data('flag');
        $btn.click(() => {
            if (window[flag]) return;
            loadGithubScript(file, flag, () => {
                $btn.find('.scripts_status').removeClass('red').addClass('green').html('On');
            });
        });
    });

    $('#misje_Panel .misje_main').click(() => {
        if ($(".misje_main .misje_status").hasClass("red")) {
            $(".misje_main .misje_status").removeClass("red").addClass("green").html("On");
            loadMissionsEngine();
        } else {
            $(".misje_main .misje_status").removeClass("green").addClass("red").html("Off");
        }
    });

    if (!window.__SWA_MISSIONS_LISTENER_BOUND__) {
        window.__SWA_MISSIONS_LISTENER_BOUND__ = true;
        window.addEventListener('swa-missions-ranks', function (e) {
            renderMissionRankButtons(e.detail);
        });
    }
    var storedMissionRanks = [];
    try { storedMissionRanks = JSON.parse(localStorage.getItem('swa_mission_available_ranks')) || []; } catch (e) { storedMissionRanks = []; }
    renderMissionRankButtons(storedMissionRanks);
}
GAME.emit = function(order, data, force) {
    if (!this.is_loading || force) {
        this.load_start();
        this.socket.emit(order, data);
    } else if (this.debug) console.log('failed order', order, data);
};
GAME.emitOrder = function(data, force = false) {
    this.emit('ga', data, force);
};
GAME.initiate = function() {
    $('#player_login').text(this.login);
    $('#game_win').show();
    if (this.char_id == 0 && this.pid > 0) {
        this.emitOrder({
            a: 1
        });
    }
    var len = this.servers.length,
        con = '';
    for (var i = 0; i < len; i++) {
        con += '<option value="' + this.servers[i] + '">' + LNG['server' + this.servers[i]] + '</option>';
    }
    $('#available_servers').html(con);
    $('#available_servers option[value=' + this.server + ']').prop('selected', true);
};
}
