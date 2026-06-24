var checked = false;
var item_id;
var item_jakosc=false;
var item_poziom=false;
var item_jakosc_cap=0;
var item_poziom_cap=0;
if (typeof GAME === 'undefined' && extrapremium) { } else {
    let Pog = setInterval(() => {
        if (!GAME.pid) { } else {
            clearInterval(Pog);
            checked = true;
        }
    }, 50);

    let Pgg = setInterval(() => {
        clearInterval(Pgg);
        for (var i in GAME) {
            if (i.indexOf("socxxx") === 0 && i.lastIndexOf("ket") + 3 === i.length) {
                GAME.socket = GAME[i];
                break;
            }
        }
        class kwsv3 {
            constructor(charactersManager) {
                this.charactersManager = charactersManager;
                this.isLogged((data) => {
                    Object.defineProperty(GAME, 'pid', {
                        writable: false
                    });
                    Object.defineProperty(GAME, 'login', {
                        writable: false
                    });
                });
                this.isCheckingTournaments = false;
                this.tournamentCategory = undefined;
                this.newTournamentID = undefined;
                this.tourSigned = false;
                this.firstTournamentPageLoaded = false;
                this.settings = this.getSettings();
                this.createCSS();
                this.createMinimapSettings();
                if ($("#top_bar .adv").length) $("#top_bar .adv").remove();
   
                this.addToCSS(`.kom{background:url(/gfx/layout/tloPilot.png); background-size:cover; border-image:url(/gfx/layout/mapborder.png) 7 8 7 7 fill; border-style:solid; border-width:7px 8px 7px 7px; box-shadow:none;} .kom .close_kom b{background:url(/gfx/layout/tloPilot.png);} .exchange_win{max-height:500; height:auto;}`);
                this.addToCSS(`#emp_list .petopt_btns .newBtn{margin:0px 3px 3px 0px;} .newBtn.do_all_instances{color:#e5d029;}`);
                this.addToCSS(`#quick_bar{z-index:4;} .qlink.kws_active_icon{animation-name:kws_active_icon;animation-duration:1s;animation-iteration-count:infinite;}@keyframes kws_active_icon { 0% { filter: hue-rotate(168deg); } 50% { filter:hue-rotate(40deg); } 100% { filter: hue-rotate(168deg); } } .sideIcons{ width:29px; height:29px; left:-37px; background-size:contain; } .autoExpeCodes{background:#12121294; border:1px solid rgb(87, 87, 114); border-radius:5px 0px 0px 5px; position:absolute; top:-100px; left:-97px; padding:5px; display:none; color:#ffe500c7; user-select:none;} .manage_autoExpeditions:hover + .autoExpeCodes, .autoExpeCodes:hover{ display:flex; } .autoExpeCodes .newCheckbox{margin: 0 auto; display: block;} `);
                this.addToCSS(`#secondary_char_stats .instance{margin-top:10px; cursor:pointer; width:100px;} #secondary_char_stats .activities{margin-top:-5px; cursor:pointer; width:100px;} #secondary_char_stats ul {margin-top:-18px; margin-left:-18px;} .ico.a11{background:url("https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-assets/images/instances.png"); background-repeat: no-repeat; background-size: inherit; background-position: center;} .ico.a12{background-image: url(https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-assets/images/activity.png); background-repeat: no-repeat; background-size: inherit; background-position: center;}`); 
                this.addToCSS(`.ssj_uio{background:url("https://i.imgur.com/EcfEUcG.png");}`);
                this.addToCSS(`#quick_allTransformations { position:absolute; top:33px; z-index:1; background:rgb(0 0 0 / 59%); display:none; flex-direction: column-reverse; padding:5px 5px 0px 5px; border-radius:5px; box-shadow:0px 0px 5px 0px rgb(32 96 185);} .show_qat:hover + #quick_allTransformations, #quick_allTransformations:hover { display:flex; } #quick_allTransformations .option { display:block; margin:0px 0px 5px 0px; }`);
                this.addToCSS(`#player_list_con .glory_rank.war{animation:none !important;background-color:rgb(22 83 106);box-shadow:0px 0px 7px 0px rgb(0 253 255);} .player_clan.enemy img{animation:none !important;box-shadow:0px 0px 10px 1px rgb(0 253 255);}`);
                this.addToCSS(`.better_chat_loading{filter:sepia(1) hue-rotate(270deg);} .better_chat_loading:hover{filter:sepia(1) hue-rotate(90deg);} .chat_icon.load:hover{background:url(/gfx/layout/ikonyChat.png) -90px 0px !important;}`);
                this.addToCSS(`#upg_menu button[data-page="game_buffs"]{display:block !important;}`);
                this.addToCSS(`.qtrack{width:400px;} #drag_con.scroll .qtrack{width:383px;} #quest_track_con #drag_tracker{user-select:none;} #quest_track_con .sep2{height:14px;} #quest_track_con .sep3{height:14px;}`);
                this.addToCSS(`.option.ls.spawner{ position:absolute; top:60px; right:40px; background-size: 100% 100%; border: solid #6f6f6f 1px; }`);
                this.addToCSS(`#kws_minimap_settings{ margin:10px 0px 0px 0px; border-top:solid white 1px; padding-top:10px; } #field_sett #field_options{ height:407px; } #minimap_con{ ${this.minimap.side == 1 ? `left: -4px; right: unset;` : this.minimap.side == 2 ? `left: -210px; right: unset;` : ""} opacity: ${this.minimap.opacity / 100} } #minimap_range{ width:150px; display:inline-block; vertical-align:middle;} .smin_butt{background: #31313a69 !important; border: solid #ffffff4d 1px !important; width:auto !important; height:32px !important; line-height: 30px; display: inline-block; text-align: center; font-family: 'Play', sans-serif; font-size: 13px; font-weight: Bold; color: #fff; text-decoration: none; text-transform: uppercase; border: none; padding: 0 10px; border-radius: 5px; cursor: pointer; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin-top:2px; float:none !important;} .smin_input{background: #040e13; height: 31px; border: solid #ffffff4d 1px !important; display: inline-block; text-align:center; font-size: 13px; color: #305779; font-family: 'Play', sans-serif; vertical-align: middle;border-radius: 5px;}`);
                this.addToCSS(`#kws_locInfo{background:url("/gfx/layout/tloPilot.png");position: absolute;top: 220px;z-index: 2;width: 204px;padding: 5px;border-radius: 5px;border-image: url(/gfx/layout/mapborder.png) 7 8 7 7 fill;border-style: solid;border-width: 7px 8px 7px 7px; display:${this.minimap.loc_info == 0 ? `none` : `block`}} #kws_locInfo .sekcja{position:absolute;top:-20px;left:0px;background:url("https://i.imgur.com/Mi3kUpg.png");background-size:100% 100%;width:190px;}`);
                this.addToCSS(`.kws_top_bar{float:left !important; position: absolute; z-index: -1;} .kws_top_bar_section{color:white;padding:3px 5px 3px 5px;border-radius:5px;margin-right:8px;user-select:none;}`);
                this.addToCSS(`.go_to_emp_con{ position:absolute; top:33px; z-index:1; background:rgb(0 0 0 / 59%); display:none; flex-direction: column-reverse; padding:5px 5px 0px 5px; border-radius:5px; box-shadow:0px 0px 5px 0px rgb(32 96 185);} .empPos:hover + .go_to_emp_con, .go_to_emp_con:hover { display:flex; } .go_to_emp_con .qlink { display:block; margin:0px 0px 5px 0px; }`);
                this.addToCSS(`#ekw_sets_buy button, div[data-option="change_ekw_set"]{height:20px !important; line-height:19px !important; margin-top:9px !important;}`);
                this.addToCSS(`#page_game_camp .ekw_slot.smaller img{ width: 64px; } #page_game_camp div[data-item_id="1923"].smaller img { width: 32px; position: absolute; margin-top: -64px; margin-left: 34px; }`);
                // this.addToCSS(`#kws_spawn{ background: rgba(0,0,0,0.9); position: fixed; top: 120px;left: 5px; z-index: 9999; width: 200px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #kws_spawn .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(150deg); background-size: 100% 100%; width: 200px; cursor: all-scroll; } #kws_spawn .spawn_row{border-bottom:solid gray 1px; color: white; font-size: 13px; display: flex; padding:4px;}`);
                // $("#map_canvas_container").append(`<div id="kws_spawn"> <div class="sekcja"><img src="/gfx/layout/war.png" class="spawn_switch">USTAWIENIA SPAWNU</div><div id="kws_spawn2" style="">${this.spawnList()}</div>`);
                this.addToCSS(`.spawn_switch{cursor:pointer;}`);
                this.addToCSS(`.quest_roll1{position:absolute; width:50px; height:50px; background:url('/gfx/layout/dice.png') 0 0; top:-25px; left:25px; cursor:pointer; filter:drop-shadow(0px 0px 10px lime)} .quest_roll2{position:absolute; width:50px; height:50px; background:url('/gfx/layout/dice.png') 0 0; top:-25px; left:75px; cursor:pointer; filter:drop-shadow(0px 0px 10px #00fdff)} .quest_roll3{position:absolute; width:50px; height:50px; background:url('/gfx/layout/dice.png') 0 0; top:-25px; left:125px; cursor:pointer; filter:drop-shadow(0px 0px 10px #ff0000)} .quest_roll:hover{background:url('/gfx/layout/dice.png') 0 -45px;} .quest_roll1:hover{background:url('/gfx/layout/dice.png') 0 -45px;} .quest_roll2:hover{background:url('/gfx/layout/dice.png') 0 -45px;} .quest_roll3:hover{background:url('/gfx/layout/dice.png') 0 -45px;}`);
                this.addToCSS(`#lastmap_bar { top: 115px !important; }`);
                this.addToCSS(`button#changeProfileNext { position: absolute; top: 125px; left: 139px; border: none; background: none; color: #9FBAD2;font-family: 'Roboto', sans-serif;  display: block; vertical-align: middle;  }`);
                // this.addToCSS(`button#changeProfileNext:hover {
                //     background: linear-gradient(0deg, rgba(247,121,12,1) 0%, rgba(252,238,54,1) 100%);
                //     border: 0px solid #973804;
                // }`);
                this.addToCSS(`button#changeProfilePrev { position: absolute; top: 125px; left: 179px; border: none; background: none; color: #9FBAD2; font-family: 'Roboto', sans-serif;  display: block; vertical-align: middle;   }`);
                // this.addToCSS(`button#changeProfilePrev:hover {
                //     background: linear-gradient(0deg, rgba(247,121,12,1) 0%, rgba(252,238,54,1) 100%);
                //     border: 0px solid #973804;
                // }`);
                this.addToCSS(`.kws_additional_top_bar{float:left !important; position: absolute; z-index: -1; display: none} .kws_additional_top_bar_section{color:white;padding:3px 5px 3px 5px;border-radius:5px;margin-right:8px;user-select:none;}`);
                $("#top_bar").append(`<div class="kws_top_bar"></div>`);
                $("#top_bar").append(`<div class="kws_additional_top_bar"></div>`);
                $("#bless_type_2").click();
                $(`.channel_opts .option.chat_icon.load`).addClass('better_chat_loading').removeAttr('id').removeAttr('data-option');
                $("#clan_inner_planets h3").eq(0).append(`<button id="poka_telep" style="margin-left:5px;" class="newBtn">pokaż / ukryj salę telep</button>`);
                $(`<button class="newBtn free_assist_for_all" style="margin-right:5px;">Asystuj wszystkim za darmo</button>`).insertBefore(`button[data-option="clan_assist_all"]`);
                $("#clan_inner_wars h3").eq(0).append(` <button class="newBtn activate_all_clan_buffs">Aktywuj wszystkie buffy</button>`);
                $(`#minimap_con`).append(`<div id="kws_locInfo"><div class="sekcja">INFORMACJE O LOKACJI</div><div class="content"></div></div>`);
                $("#sett_page_local div").eq(0).prepend(`<b class="green">Zmień tło strony </b><div class="game_input"><input id="new_website_bg" style="width:370px;" type="text"></div><button class="option newBtn kws_change_website_bg" style="margin-left:5px;">Zmień</button><button class="option newBtn kws_reset_website_bg" style="margin-left:5px;">Reset</button><br><br>`);
                $('.MoveIcon[data-option="minimap_toggle"]').after('<div class="MoveIcon bigg option" data-option="map_multi_pvp" data-toggle="tooltip" data-original-title="<div class=tt>Multiwalka PvP<br />Klawisz skrótu:<b class=orange>B</b></div>"><img src="https://i.imgur.com/QPQBcFp.png"></div>');
                $('.MoveIcon[data-option="map_multi_pvp"]').after('<div class="MoveIcon bigg option" data-option="map_quest_skip" data-toggle="tooltip" data-original-title="<div class=tt>Opcja Dalej w otwartym zadaniu jeśli jest jedna. Atakuje bosy w zadaniach i zamyka raport z walki. W zadaniu nuda wybiera opcję na zabicie mobków. W zadaniu subki wybiera opcję za 100k. Zamyka komunikaty. Zbiera zasób na którym stoimy.<br />Klawisz skrótu:<b class=orange>X</b></div>"><img src="https://i.imgur.com/wuK91VF.png"></div>');
                $('.MoveIcon[data-option="map_quest_skip"]').after('<div class="MoveIcon bigg option" data-option="map_quest_skip_time" data-toggle="tooltip" data-original-title="<div class=tt>Używanie zegarków w zadaniach<br />Klawisz skrótu:<b class=orange>N</b></div>"><img src="https://i.imgur.com/9YCvJKe.png"></div>');
                $('.MoveIcon[data-option="map_quest_skip_time"]').after('<div class="MoveIcon bigg option" data-option="map_alternative_pilot" data-toggle="tooltip" data-original-title="<div class=tt>Ukryje pilota, pokazuje inną klawiaturę<br />Klawisz skrótu:<b class=orange>=</b></div>"><img src="https://up.be3.ovh/upload/1709400449.png"></div>');
                $('.MoveIcon[data-option="map_alternative_pilot"]').after('<div class="MoveIcon bigg option" data-option="fight_champ" data-toggle="tooltip" data-original-title="<div class=tt>Zabija championy<br />Klawisz skrótu:<b class=orange>2</b></div>"><img src="https://i.imgur.com/QPQBcFp.png"></div>');
                $('.MoveIcon[data-option="fight_champ"]').after('<div class="MoveIcon bigg option" data-option="fight_elite" data-toggle="tooltip" data-original-title="<div class=tt>Zabija elity<br />Klawisz skrótu:<b class=orange>3</b></div>"><img src="https://i.imgur.com/QPQBcFp.png"></div>');
                $('.MoveIcon[data-option="fight_elite"]').after('<div class="MoveIcon bigg option" data-option="fight_boss" data-toggle="tooltip" data-original-title="<div class=tt>Zabija bossy<br />Klawisz skrótu:<b class=orange>4</b></div>"><img src="https://i.imgur.com/QPQBcFp.png"></div>');

                $("#changeProfile").after('<button id="changeProfileNext" class="option" data-option="nextChar">Next</button>');
                $("#changeProfileNext").after('<button id="changeProfilePrev" class="option" data-option="prevChar">Prev</button>');
                $("#ekw_item_menu").append('<button id="custom_but" class="option" data-option="customUpgrade">Custom</button>')
                $("#custom_but").css({
                    "background": 'url(/gfx/layout/newbtn2.png)',
                    "height": "23px",
                    "background-clip": "padding-box",
                    "line-height": "23px",
                    "box-sizing": "content-box",
                    "display": "inline-block",
                    "text-align": "center",
                    "color": "#E5D8A5",
                    "text-decoration": "none",
                    "font-size": "12px",
                    "font-weight": "Bold",
                    "text-transform": "uppercase",
                    "border-style": "solid",
                    "border-width": "5px",
                    "border-image": 'url(/gfx/layout/btnborder.png) 5 fill repeat',
                });

                this.auto_abyss_interval = false;
                this.auto_arena = false;
                this.additionalTopBarVisible = false;
                this.baselinePower = undefined;
                this.baselineLevel = undefined;

                const item_css = `
                    #ItemPanel { background: rgba(22,22,26,0.96); position: fixed; top: 250px; left: 80%; z-index: 9999; width: 200px; padding: 10px; border-radius: 10px; border: 1px solid #e3402c; box-shadow: 0 8px 24px rgba(0,0,0,0.55); display:block; user-select: none; font-family: 'Segoe UI', Tahoma, sans-serif; color: #ddd; }
                    #ItemPanel .item_button { cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; margin-bottom: 6px; border-radius: 6px; background: rgba(255,255,255,0.04); color: #eee; font-size: 13px; transition: background .15s ease, color .15s ease; }
                    #ItemPanel .item_button:hover { background: rgba(227,64,44,0.28); color: #fff; }
                    #ItemPanel .item_status { font-size: 10px; font-weight: 700; padding: 2px 9px; border-radius: 10px; text-transform: uppercase; letter-spacing: .3px; }
                    #ItemPanel .item_status.red { background: #c0392b; color: #fff; }
                    #ItemPanel .item_status.green { background: #27ae60; color: #fff; }
                    #ItemPanel .gamee_input, #ItemPanel .gameee_input { text-align: center; margin-bottom: 6px; padding: 4px; border-radius: 6px; background: rgba(255,255,255,0.04); }
                    #ItemPanel .gamee_input input, #ItemPanel .gameee_input input { background: #2a2a30 !important; border: 1px solid #3a3a42 !important; border-radius: 4px; color: #eee !important; transition: border-color .15s ease; }
                    #ItemPanel .gamee_input input:focus, #ItemPanel .gameee_input input:focus { outline: none; border-color: #e3402c !important; }
                    #ItemPanel .gamee_input input::placeholder, #ItemPanel .gameee_input input::placeholder { color: #6b6b72; }
                    #ItemPanel .close_item { width: 100%; cursor: pointer; padding: 6px 0; border-radius: 6px; border: none; background: #e3402c; color: #fff; font-weight: 700; transition: background .15s ease; }
                    #ItemPanel .close_item:hover { background: #c0392b; }
                `;
                const item_panel = `<div id="ItemPanel">
                    <div class="gamee_input insta_capt1"><input style="width: 150px; margin-left: -2px; background: grey; text-align: center; font-size: 16;" name="jakosc_capt" type="text" value="" placeholder="jakosc" /></div> <div class="item_button item_jakosc">jakosc<strong class="item_status red">Off</strong> </div>
                    
                    <div class="gamee_input insta_capt1"><input style="width: 150px; margin-left: -2px; background: grey; text-align: center; font-size: 16;" name="poziom_capt" type="text" value="" placeholder="poziom" /></div> <div class="item_button item_poziom">poziom<strong class="item_status red">Off</strong> </div>
                    <button class="pvp_button close_item">Close</button></div>
                    </div>`;
                $("body").append(`<style>${item_css}</style>${item_panel}`);
                $("#ItemPanel").hide();

                setInterval(() => {
                    if ('char_data' in GAME) {
                        this.updateTopBar();
                    }
                }, 1000);
                this.setWebsiteBackground();
                this.bindClickHandlers();
                GAME.socket.on('gr', (res) => {
                    this.handleSockets(res);
                });
            }
            isLogged(cb) {
                let waitForID = setInterval(() => {
                    if (GAME.pid) {
                        clearInterval(waitForID);
                        cb(GAME.pid);
                    }
                }, 200);
            }
            getSettings() {
                let settings = JSON.parse(localStorage.getItem("kws_settings"));
                let settings_sample = {
                    hide_tracker: false,
                    aeCodes: false
                };
                if (settings) {
                    for (const key of Object.keys(settings_sample)) {
                        if (settings[key] === undefined) {
                            settings[key] = settings_sample[key];
                        }
                    }
                    localStorage.setItem("kws_settings", JSON.stringify(settings));
                    return settings;
                } else {
                    localStorage.setItem("kws_settings", JSON.stringify(settings_sample));
                    return settings_sample;
                }
            }
            updateSettings() {
                localStorage.setItem('kws_settings', JSON.stringify(this.settings));
            }

            manageAutoAbyss() {
                GAME.socket.emit('ga', {
                    a: 59,
                    type: 0
                });

                if ($("#ss_cd_still").css("display") == "none") {
                    setTimeout(() => {
                        GAME.socket.emit('ga', {
                            a: 59,
                            type: 1
                        });
                    }, 1000);
                    setTimeout(() => {
                        $('#fight_view').fadeOut();
                    }, 2000);
                    setTimeout(() => {
                        if ((GAME.char_data.reborn == 4 || GAME.char_data.reborn == 5) && GAME.char_data.alt_transform_expiry < GAME.getTime()) {
                            GAME.socket.emit('ga', {
                                a: 18,
                                type: 8,
                                tech_id: 134
                            });
                        }
                    }, 3000);
                }
            }
            manageAutoArena() {
                if (this.auto_arena) {
                    GAME.socket.emit('ga', {
                        a: 46,
                        type: 0
                    });
                    setTimeout(() => {
                        this.attackAutoArena();
                    }, 1000);
                } else {
                    this.stopAutoArena();
                }
            }
            attackAutoArena() {
                let opponents = $("#arena_players").find(`.player button[data-option="arena_attack"][data-quick="1"]:not(.initial_hide_forced)`);
                let opponent = parseInt(opponents.attr("data-index"));
                if (this.auto_arena) {
                    if (opponents.length > 0 && GAME.timed == 0) {
                        GAME.socket.emit('ga', {
                            a: 46,
                            type: 1,
                            index: opponent,
                            quick: 1
                        });
                        setTimeout(() => {
                            this.attackAutoArena();
                        }, 500);
                    } else {
                        setTimeout(() => {
                            this.manageAutoArena();
                        }, 5000);
                    }
                } else {
                    this.stopAutoArena();
                }
            }
            stopAutoArena() {
                this.auto_arena = false;
                $(".qlink.manage_auto_arena").removeClass("kws_active_icon");
            }

            activateAllClanBuffs() {
                let abut = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`);
                let isDisabled = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`).parents("tr").hasClass("disabled");
                let cpbt = $("#clan_planet_buffs").html();
                let acpbut = $("#has_clan_planet").find(`button[data-option="activate_prp_buff"]`);
                if (abut.length && !isDisabled) {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 26
                    });
                    setTimeout(() => {
                        this.activateAllClanBuffs();
                    }, 200);
                } else if (cpbt == 0) {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 28
                    });
                    setTimeout(() => {
                        this.activateAllClanBuffs();
                    }, 200);
                } else if (acpbut.length && $("#clan_planet_buffs .red").eq(0).text() == 0) {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 29
                    });
                    setTimeout(() => {
                        this.activateAllClanBuffs();
                    }, 200);
                } else {
                    GAME.komunikat("Wszystkie buffy zostały aktywowane!");
                }
            }

            createMinimapSettings() {
                this.manageMinimapSettings("load");
                this.manageMapSize("load");
                this.managePilot();
                $("#field_sett #field_options").append(`<br style='clear:both;'><div id="kws_minimap_settings"> <b class='orange'>Ukryj pilota kontroli postaci: </b><div class="select_input"><select id="kws_hidePilot"><option value="1" ${this.hidePilot == 1 ? "selected" : ""}>tak</option><option value="0" ${this.hidePilot == 0 ? "selected" : ""}>Nie</option></select></div> <b class='orange'>Minimapa wyświetlana ze strony: </b><div class="select_input"><select id="minimap_side"><option value="0" ${this.minimap.side == 0 ? "selected" : ""}>Prawej</option><option value="1" ${this.minimap.side == 1 ? "selected" : ""}>Lewej</option><option value="2" ${this.minimap.side == 2 ? "selected" : ""}>L - Poza</option></select></div> <b class='orange'>Przeźroczystość minimapy: </b><input id="minimap_range" type="range" value="${this.minimap.opacity}" min="10" max="100" step="1"> <b class='orange'>Dodatkowe informacje o lokacji: </b><div class="select_input"><select id="kws_sh_locInfo"><option value="1" ${this.minimap.loc_info == 1 ? "selected" : ""}>Pokaż</option><option value="0" ${this.minimap.loc_info == 0 ? "selected" : ""}>Ukryj</option></select></div> <b class='orange'>Rozmiar mapy: </b>X: <input name="kws_map_width" class="smin_input" style="width:30px;" type="text" value="${this.mapsize.x}" placeholder="13"> Y: <input name="kws_map_height" class="smin_input" style="width:30px;" type="text" value="${this.mapsize.y}" placeholder="13"><button class="smin_butt kws_mapsize_change" style="margin-left:5px;">Zmień</button><button class="smin_butt kws_mapsize_reset" style="margin-left:5px;">Reset</button> </div>`);
            }
            manageMinimapSettings(act) {
                if (act == "load") {
                    this.minimap = JSON.parse(localStorage.getItem('kws_minimap'));
                    if (this.minimap == undefined) {
                        this.minimap = {
                            side: 0,
                            opacity: 100,
                            loc_info: 0
                        };
                        localStorage.setItem('kws_minimap', JSON.stringify(this.minimap));
                    }
                } else if (act == "save") {
                    localStorage.setItem('kws_minimap', JSON.stringify(this.minimap));
                }
            }
            parseMapInfo(quests, where) {
                let mapInfo = Object.values(quests).filter(this.filterQuests);
                let mapSK = Object.keys(GAME.map_balls) ? Object.keys(GAME.map_balls).length : 0;
                $(`#kws_locInfo .content`).html(`Zadania: ${mapInfo.length}<br>SK: ${mapSK}`);
            }
            filterQuests(quest) {
                let steps = quest.length;
                if (steps > 0 && quest[steps - 1] && quest[steps - 1].end != 1) {
                    return quest;
                }
            }
            setWebsiteBackground() {
                if (localStorage.getItem('kws_wbg')) {
                    $("body").css({
                        "background": "#02070D",
                        "background-image": `url(${localStorage.getItem('kws_wbg')})`,
                        "background-size": "cover",
                        "background-attachment": "fixed"
                    });
                    $("#new_website_bg").val(localStorage.getItem('kws_wbg'));
                    $("footer").addClass("hide_before");
                }
            }
            manageWebsiteBackground(act, url) {
                if (act == "set") {
                    if (url.length > 5) {
                        localStorage.setItem('kws_wbg', url);
                        $("body").css({
                            "background": "#02070D",
                            "background-image": `url(${url})`,
                            "background-size": "cover",
                            "background-attachment": "fixed"
                        });
                        $("footer").addClass("hide_before");
                    }
                } else if (act == "reset") {
                    localStorage.removeItem("kws_wbg");
                    $("#new_website_bg").val("");
                    $("body").css({
                        "background": "#02070D",
                        "background-image": `url(/gfx/layout/bg.jpg)`,
                        "background-size": "cover",
                        "background-attachment": "fixed"
                    });
                    $("footer").removeClass("hide_before");
                }
            }
            changeMapSize(rx = 13, ry = 13) {
                rx = Math.floor(rx);
                ry = Math.floor(ry);
                GAME.map.cX = rx * 40;
                GAME.map.cY = ry * 40;
                GAME.map.rX = rx;
                GAME.map.rY = ry;
                if (GAME.map.initiated) {
                    GAME.loadMapJson(function () {
                        GAME.socket.emit('ga', {
                            a: 3,
                            vo: GAME.map_options.vo
                        }, 1);
                    });
                }
                if (rx > 13) {
                    let pgm_w = 963 + (rx - 13) * 40;
                    $("#page_game_map").css("width", pgm_w);
                } else {
                    $("#page_game_map").css("width", "963px");
                }
                $("#map_canvas_container").css({
                    "width": `${GAME.map.cX + 14}px`,
                    "height": `${GAME.map.cY + 14}px`
                });
            }
            manageMapSize(act, size = [13, 13]) {
                if (act == "load") {
                    this.mapsize = JSON.parse(localStorage.getItem('kws_mapsize'));
                    if (this.mapsize == undefined) {
                        this.mapsize = {
                            x: 13,
                            y: 13
                        };
                        localStorage.setItem('kws_mapsize', JSON.stringify(this.mapsize));
                    } else if (this.mapsize.x != 13 || this.mapsize.y != 13) {
                        this.changeMapSize(this.mapsize.x, this.mapsize.y);
                    }
                } else if (act == "change") {
                    this.changeMapSize(size[0], size[1]);
                    this.mapsize.x = size[0];
                    this.mapsize.y = size[1];
                    localStorage.setItem('kws_mapsize', JSON.stringify(this.mapsize));
                } else {
                    this.changeMapSize();
                    this.mapsize.x = 13;
                    this.mapsize.y = 13;
                    $(`input[name="kws_map_width"]`).val(13);
                    $(`input[name="kws_map_height"]`).val(13);
                    localStorage.setItem('kws_mapsize', JSON.stringify(this.mapsize));
                }
            }
            managePilot(act = false, val = 0) {
                if (act == "set") {
                    localStorage.setItem('kws_pilot', val);
                    this.hidePilot = val;
                    this.managePilot();
                } else {
                    this.hidePilot = localStorage.getItem('kws_pilot');
                    if (this.hidePilot == undefined) {
                        localStorage.setItem('kws_pilot', 0);
                        this.hidePilot = 0;
                    }
                    if (this.hidePilot == 1) {
                        $("#map_pilot").hide();
                    } else {
                        $("#map_pilot").show();
                    }
                }
            }

            getTitlesList(cb) {
                GAME.socket.emit('ga', {
                    a: 42,
                    type: 9
                });
                JQS.ldr.finish().fadeIn();
                let wait_for_titles = setInterval(() => {
                    let html = $("#char_titles").html();
                    if (html.length) {
                        clearInterval(wait_for_titles);
                        cb(html);
                    }
                }, 100);
            }
            updateTopBar() {
                let currentLevel = GAME.char_data.level;
                let currentTime = Date.now();
                let levelsGained = currentLevel - GAME.startLevel;
                let levelsPerHour = levelsGained / ((currentTime - GAME.startTime) / 1000 / 60 / 60);
                let lvlh = levelsPerHour.toFixed(2);
    
                let innerHTML = `  <span class='kws_top_bar_section lvl' style='cursor:pointer;'>LVL: <span>${lvlh}/H</span></span><span class='kws_top_bar_section pvp' style='cursor:pointer;'>PVP: <span>${pvp_count}</span></span><span class='kws_top_bar_section arena' style='cursor:pointer;'>ARENA: <span>${arena_count}</span></span>  <span class='kws_top_bar_section version' style='cursor:pointer;'>Wersja: <span>${version}</span></span> `;
                $(".kws_top_bar").html(innerHTML);
                if (this.baselinePower == undefined) {
                    this.baselinePower = GAME.char_data.moc;
                }
                if (this.baselineLevel == undefined) {
                    this.baselineLevel = GAME.char_data.level;
                }
  
                let calculated_levels = GAME.dots(GAME.char_data.level - this.baselineLevel);
                $(".kws_additional_top_bar").html(`  <span class='kws_additional_top_bar_section lvlsGained' style='cursor:pointer;'>ZDOBYTE LVL: <span>${calculated_levels}</span>`);
                this.adjustCurrentCharacterId();
                this.checkTournamentsSigning();
            }
            collectActivities() {
                let received = $("#act_prizes").find("div.act_prize.disabled").length;
                let activity = parseInt($('#char_activity').text());
                let p = [25, 50, 75, 100, 150];
                for (let i = 0; i <= 5; i++) {
                    if (received < 5 && activity >= p[i]) {
                        let actPrize = $(`#act_prizes button[data-ind=${i}]`).closest(".act_prize");
                        if (!actPrize.hasClass("disabled")) {
                            GAME.socket.emit('ga', {
                                a: 49,
                                type: 1,
                                ind: i
                            });
                        }
                    }
                }
            }
            markDaily() {
                let daily = ["ZADANIE PVM", "Zadanie PvP", "ROZWÓJ PLANETY ", "ZADANIE IMPERIUM", "ZADANIE KLANOWE", "NAJLEPSZY KUCHA...", "REPUTACJA", "SYMBOL WYMIARÓW", "WYMIANA CHI", "ERMITA", "Nuda", "DOSTAWCA", "BOSKA MOC", "ROZGRZEWKA", "BOSKI ULEPSZACZ", "CZAS PODRÓŻNIKÓ...", "STRAŻNIK PORZĄD...", "CODZIENNY INSTY...", "HIPER SCALACZ", "DZIWNY MEDYK"];
                daily = daily.map(item => item.trim().toLowerCase());
                $('#quest_track_con .qtrack b').each(function () {
                    let zawartoscB = $(this).text().trim().toLowerCase();
                    if (daily.includes(zawartoscB)) {
                        $(this).css("color", "#63aaff");
                    }
                });
            }
            wojny2() {
                var aimp = $("#e_admiral_player").find("[data-option=show_player]").attr("data-char_id");
                var imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
                if (!adimp) {
                    setTimeout(() => {
                        GAME.socket.emit('ga', {
                            a: 50,
                            type: 0,
                            empire: GAME.char_data.empire
                        });
                    }, 100);
                    adimp = true;
                    setTimeout(() => {
                        this.wojny2();
                    }, 300);
                } else if (!GAME.emp_enemies.includes(1) && ![GAME.char_data.empire].includes(1) && (kws.check_imp().includes(GAME.char_id) || kws.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 7,
                        target: 1
                    });
                    setTimeout(() => {
                        this.wojny2();
                    }, 300);
                } else if (!GAME.emp_enemies.includes(2) && ![GAME.char_data.empire].includes(2) && (kws.check_imp().includes(GAME.char_id) || kws.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 7,
                        target: 2
                    });
                    setTimeout(() => {
                        this.wojny2();
                    }, 300);
                } else if (!GAME.emp_enemies.includes(3) && ![GAME.char_data.empire].includes(3) && (kws.check_imp().includes(GAME.char_id) || kws.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 7,
                        target: 3
                    });
                    setTimeout(() => {
                        this.wojny2();
                    }, 300);
                } else if (!GAME.emp_enemies.includes(4) && ![GAME.char_data.empire].includes(4) && (kws.check_imp().includes(GAME.char_id) || kws.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 7,
                        target: 4
                    });
                    setTimeout(() => {
                        this.wojny2();
                    }, 300);
                } else { }
            }
            check_imp() {
                var tab = [];
                for (var i = 0; i < 3; i++) {
                    tab[i] = parseInt($("#empire_heroes .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
                }
                return tab;
            }
            check_imp2() {
                var tab = [];
                for (var i = 0; i < 3; i++) {
                    tab[i] = parseInt($("#empire_efrags .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
                }
                return tab;
            }
            vip() {
                var month = $("#monthly_vip_rewards").find(".vip_cat.option" + ":not(.disabled)" + ":not(.received)");
                var general = $("#general_vip_rewards").find(".vip_cat.option" + ":not(.disabled)" + ":not(.received)");
                if (month.length) {
                    var id = parseInt(month.attr("data-vip"));
                    var lvl = parseInt(month.attr("data-level"));
                    GAME.socket.emit('ga', {
                        a: 54,
                        type: 1,
                        vip: id,
                        level: lvl
                    });
                    setTimeout(() => {
                        this.vip();
                    }, 500);
                } else if (general.length) {
                    var id = parseInt(general.attr("data-vip"));
                    var lvl = parseInt(general.attr("data-level"));
                    GAME.socket.emit('ga', {
                        a: 54,
                        type: 1,
                        vip: id,
                        level: lvl
                    });
                    setTimeout(() => {
                        this.vip();
                    }, 500);
                } else {
                    GAME.komunikat("Odebrano wszystkie możliwe nagrody z Vipa!!!");
                }
            }
            bless() {
                GAME.socket.emit('ga', {
                    a: 14,
                    type: 3
                });
                setTimeout(() => {
                    var arr = $.map($('.use_buff:checked'), function (e, i) {
                        return +e.value;
                    });
                    var btype = $('input[name="bless_type"]:checked').val();
                    GAME.socket.emit('ga', {
                        a: 14,
                        type: 5,
                        buffs: arr,
                        players: $('#bless_players').val(),
                        btype: btype
                    });
                }, 500);
            }
            questProceed() {
                if (JQS.qcc.is(":visible")) {
                    if ($("button[data-option=finish_quest]").length === 1) {
                        let qb_id = $("button[data-option=finish_quest]").attr("data-qb_id");
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 2,
                            button: 1,
                            id: qb_id
                        });
                    } else if ($("button[data-option=quest_riddle]").is(":visible")) {
                        let qb_id = $("button[data-option=quest_riddle]").attr("data-qid");
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 7,
                            id: qb_id,
                            ans: $('#quest_riddle').val()
                        });
                    } else if ($("button[data-option=quest_duel]").is(":visible")) {
                        let fb_id = $("button[data-option=quest_duel]").attr("data-qid");
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 6,
                            id: fb_id
                        });
                    } else if ($(".quest_win .sekcja").text().toLowerCase() === "nuda" && $("button[data-option=finish_quest]").length === 3) {
                        let qb_id = $("button[data-option=finish_quest]").attr("data-qb_id");
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 2,
                            button: 2,
                            id: qb_id
                        });
                    } else if ($(".quest_win .sekcja").text().toLowerCase() === "zadanie substancji" && $("button[data-option=finish_quest]").length === 3) {
                        let qb_id = $("button[data-option=finish_quest]").attr("data-qb_id");
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 2,
                            button: 3,
                            id: qb_id
                        });
                    } else if ($("button[data-option=finish_quest]").length === 2 && $("button[data-option=finish_quest]").eq(1).html() === "Mam dość tej studni") {
                        let qb_id = $("button[data-option=finish_quest]").eq(1).attr("data-qb_id");
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 2,
                            button: 2,
                            id: qb_id
                        });
                    } else if ($("#field_opts_con .sekcja").html() == "Zasoby") {
                        let qb_id = $("#field_opts_con .field_option").find("[data-option=start_mine]").attr("data-mid");
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 8,
                            mid: qb_id
                        });
                    }
                    setTimeout(() => {
                        $('#fight_view').fadeOut();
                    }, 500);
                    kom_clear();
                } else if ($("button[data-option=start_mine]").length >= 1) {
                    let mineID = parseInt($("button[data-option=start_mine]").attr("data-mid"));
                    GAME.socket.emit('ga', {
                        a: 22,
                        type: 8,
                        mid: mineID
                    });
                }
            }
            pvpKill() {
                if (!JQS.chm.is(":focus")) {
                    let opponents = $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)");
                    if ($("button[data-option='load_more_players']").is(":visible")) {
                        $("button[data-option='load_more_players']").click();
                        setTimeout(() => {
                            this.pvpKill();
                        }, 11);
                    } else if (opponents.length > 0) {
                        opponents.eq(0).click();
                        setTimeout(() => {
                            this.pvpKill();
                        }, 11);
                    }
                }
            }
            useCompressor() {
                GAME.emitOrder({
                    a: 22,
                    type: 10,
                    qb_id: jQuery('#quest_con').find(`[data-option='compress_items']`).data('qb_id')
                  });
            }
            arena_count() {
                arena_count++;
                $(".kws_top_bar_section.arena").html(`ARENA: ${arena_count}`);
            }
            pvp_count() {
                pvp_count++;
                $(".kws_top_bar_section.pvp").html(`PVP: ${pvp_count}`);
            }
            check_act() {
                let recived = $("#act_prizes").find("div.act_prize.disabled").length;
                let points = $('#char_activity').text();
                if (points >= 25 && recived < 1) {
                    return true;
                } else if (points >= 50 && recived < 2) {
                    return true;
                } else if (points >= 75 && recived < 3) {
                    return true;
                } else if (points >= 100 && recived < 4) {
                    return true;
                } else if (points >= 150 && recived < 5) {
                    return true;
                } else {
                    return false;
                }
            }
            spawnList() {
                let mob = "";
                for (var i = 0; i < 6; i++) {
                    mob += `<div class="spawn_row"><div class="newCheckbox"><input id="kws_spawner_ignore_${i}" type="checkbox" class="kws_spawner_check" name="ignoreMobs" value="${i}" ${(GAME.spawner && GAME.spawner[1][i] ? 'checked' : '')} /><label for="kws_spawner_ignore_${i}"></label></div>${LNG.lab457}&nbsp;<b>${LNG['mob_rank' + i]}</b></div>`;
                }
                mob += `<div class="spawn_row" style="flex-direction: column;align-items: center;"><div>Użyte PA na spawn</div><div class="game_input small"><input id="kws_pa_max" name="usePaToSpawn" type="text" value="1000"></div></div>`;
                return mob;
            }
            updatePaToSpawn(pats) {
                let pa = parseInt(pats);
                if (!pa || pa <= 0 || pa > 1000 || pa != pats) {
                    pa = 1000;
                    $("#kws_spawn input[name=usePaToSpawn]").val(pa);
                }
                GAME.spawner[0] = pa;
            }
            calcLVL(exp) {
                let lvls_gained = 0;
                let clvl = GAME.char_data.level;
                let cexp = GAME.char_data.exp + exp;
                let next = GAME.nextLevelExp(clvl, GAME.char_data.reborn);
                if (GAME.char_data.reborn >= 2) {
                    while (cexp >= next && clvl < 100000) {
                        clvl++;
                        lvls_gained++;
                        cexp -= next;
                        next = GAME.nextLevelExp(clvl, GAME.char_data.reborn);
                    }
                } else {
                    while (cexp >= next && clvl < 1250) {
                        clvl++;
                        lvls_gained++;
                        next = GAME.nextLevelExp(clvl, GAME.char_data.reborn);
                    }
                }
                return `<b class="orange">[~${lvls_gained} lvl'i]</b>`;
            }
            
            handleSockets(res) {
                const mouseOverEvent = new MouseEvent('mouseover', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                const mouseOutEvent = new MouseEvent('mouseout', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                // console.log("KWA_HANDLE_SOCKETS: res.a == %s", res.a);
                switch (res.a) {
                    case 7: //?? PvP fight result?
                        if (!this.stopped) {
                            if("result" in res && res.result && "reward" in res.result && res.result.reward && "arena_exp" in res.result.reward && res.result.reward.arena_exp && res.result.result === 1) {
                                this.arena_count();
                            } else if ("result" in res && res.result && "reward" in res.result && res.result.reward && "empire_war" in res.result.reward && res.result.reward.empire_war && res.result.result === 1) {
                                this.pvp_count();
                            } else {
                                break;
                            }
                        } else {
                            break;
                        }
                    case 57: //Tournament related
                        if(res.tours) {
                            if (res.a === 57 && res.tours) {
                                const foundCatObject = res.tours.find(tour => tour.cat === this.tournamentCategory);
                                if (foundCatObject) {
                                    this.newTournamentID = foundCatObject.id;
                                }
                            }
                    
                        } else {
                            break;
                        }
                    
                    case 12:
                        console.log(res);
                        if (res.ekw) {
                            for (var i = 0; i < res.ekw.length; i++) {
                                console.log(res.ekw[i].id, this.item_id);
                                if (res.ekw[i].id == this.item_id) {
                                    console.log("item found");
                                    var item = document.querySelector('.player_ekw_item[data-item_id="'+ this.item_id +'"]')
                                    item.dispatchEvent(mouseOverEvent);
                                    break;
                                }
                            }
                            break;
                        }
                        if (res.tip_id) {
                                var item = document.querySelector('.player_ekw_item[data-item_id="'+ this.item_id +'"]')
                                item.dispatchEvent(mouseOutEvent);

                                if (res.tip_id == this.item_id) {
                                    console.log("item  ",this.item_jakosc, this.item_poziom);
                                    if (this.item_jakosc) {
                                        console.log("jakosc ", res.item.quality, this.item_jakosc_cap);
                                        if (res.item.quality >= this.item_jakosc_cap) {
                                            console.log("jakosc git")
                                            this.item_jakosc = false;
                                            clearInterval(this.RerollItem);
                                            $(".item_jakosc .item_status").removeClass("green").addClass("red").html("Off");
                                        } else {
                                            window.setTimeout(this.RerollItem,100);
                                        }
                                    }
                                    if (this.item_poziom) {
                                        console.log("poziom ", res.item.upgrade, this.item_poziom_cap);
                                        if (res.item.upgrade >= this.item_poziom_cap ) {
                                            console.log("poziom git")
                                            $(".item_poziom .item_jakosc").removeClass("green").addClass("red").html("Off");
                                            clearInterval(this.UpgradeItem);
                                            this.item_poziom = false;
                                        } else {
                                            window.setTimeout(this.UpgradeItem,100);
                                        }
                                    }

                                    console.log("item found ", res.item.quality, res.item.upgrade);
                                }
                            break;
                        }
                    default:
                        // console.log("KWA_HANDLE_SOCKETS: unhandeled response");
                        break;
                }
            }
            createCSS() {
                $("head").append(`<style id="kwsCSS"></style>`);
            }
            addToCSS(data) {
                $(`#kwsCSS`).append(data);
            }

            RerollItem() {
                console.log("rerol item", this.item_jakosc);
                // if (this.item_jakosc === false)
                //     return;
                reroll_item();
                window.setTimeout(function() {
                    $('[data-option="rer2_item"]').click();
                }, 300);
            }

            UpgradeItem() {
                console.log("up item", this.item_poziom);
                // if (this.item_poziom === false)
                //     return;
                upgrade_item();
                window.setTimeout(function() {
                    $('[data-option="upg2_item"]').click();
                }, 400);
            }

            bindClickHandlers() {
                $("body").on("click", ".free_assist_for_all", () => {
                    this.freeAssist();
                });
                $("body").on("click", ".activate_all_clan_buffs", () => {
                    this.activateAllClanBuffs();
                });
 
                $("#poka_telep").click(() => {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 35
                    });
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 33
                    });
                    if ($("#clan_inner_stelep").css("display") == "none") {
                        $("#clan_inner_stelep").css("cssText", `display:block;position:absolute;padding:10px;border:solid #003e60 2px;background:rgb(5 21 36 / 97%);z-index:9999;border-radius:5px;margin-top:85px;`);
                    } else {
                        $("#clan_inner_stelep").attr("style", "display:none;");
                    }
                });
                $("body").on("click", "#changeProfile", () => {
                    this.resetAFO();
                });
                $("body").on("click", "#changeProfile", () => {
                    this.resetAFO();
                });


                // itemki
                $('#ItemPanel .item_poziom').click(() => {
                    if ($(".item_poziom .item_status").hasClass("red")) {
                        $(".item_poziom .item_status").removeClass("red").addClass("green").html("On");
                        $(".item_jakosc .item_status").removeClass("green").addClass("red").html("Off");
                        this.item_jakosc = false;
                        this.item_poziom = true;
                        this.item_poziom_cap = $("#ItemPanel input[name=poziom_capt]").val();

                        window.setTimeout(this.UpgradeItem,300);
                    } else {
                        $(".item_poziom .item_status").removeClass("green").addClass("red").html("Off");
                        this.item_poziom = false;
                    }
                });

                $('#ItemPanel .item_jakosc').click(() => {
                    if ($(".item_jakosc .item_status").hasClass("red")) {
                        $(".item_jakosc .item_status").removeClass("red").addClass("green").html("On");
                        $(".item_poziom .item_status").removeClass("green").addClass("red").html("Off");
                        this.item_jakosc = true;
                        this.item_poziom = false;
                        this.item_jakosc_cap = $("#ItemPanel input[name=jakosc_capt]").val();
                        
                        window.setTimeout(this.RerollItem,300);
                    } else {
                        $(".item_jakosc .item_status").removeClass("green").addClass("red").html("Off");
                        this.item_jakosc = false;
                    }
                });
                $('#ItemPanel .close_item').click(() => {
                    $("#ItemPanel").hide();
                });
                $("body").on("click", "#custom_but", () => {
                    $("#ItemPanel").show();
                    this.item_id = GAME.dragged_item.id;
                    console.log("custom clicked", this.item_id);
                });

                $("body").on("click", "#changeProfileNext", () => {
                    this.goToNextChar();
                    this.resetCalculatedPower();
                });
                $("body").on("click", "#changeProfilePrev", () => {
                    this.goToPreviousChar();
                    this.resetCalculatedPower();
                });

                $("body").on("click", `.better_chat_loading`, () => {
                    if (GAME.chat_data[GAME.chat_channel].messages.length == 0) {
                        GAME.socket.emit('ga', {
                            a: 600,
                            channel: GAME.chat_channel,
                            lm: GAME.chat_data[GAME.chat_channel].last_message
                        });
                    } else {
                        GAME.socket.emit('ga', {
                            a: 600,
                            channel: GAME.chat_channel,
                            lm: GAME.chat_data[GAME.chat_channel].messages[0].time
                        });
                    }
                });
                $("body").on("click", `div[tp_data=go_teleport]`, (th) => {
                    const selectedText = window.getSelection().toString().trim();
                    if (!selectedText) {
                        let loc = parseInt($(th.target).closest(".qtrack").attr("data-loc"));
                        GAME.socket.emit('ga', {
                            a: 12,
                            type: 18,
                            loc: loc
                        });
                    }
                });
     
                $("body").on("click", `.kws_top_bar_section.additional_stats`, () => {
                    this.handleAdditionalTopBarVisibility();
                });
                $("body").on("click", `.kws_additional_top_bar_section.additional_stats_reset`, () => {
                    this.resetCalculatedPower();
                });
                $("body").on("click", `.kws_top_bar_section.train_upgr_info`, () => {
                    GAME.page_switch('game_train');
                });
                $('#drag_tracker').off('click').on('click', () => {
                    if (!this.settings.hide_tracker) {
                        $('#drag_con').hide();
                        this.settings.hide_tracker = true;
                    } else {
                        $('#drag_con').show();
                        this.settings.hide_tracker = false;
                    }
                    this.updateSettings();
                });
                $("body").on("click", ".qlink.get_titles_list", () => {
                    this.getTitlesList((html) => {
                        JQS.ldr.finish().fadeOut();
                        GAME.komunikat2(`<table id="char_titles_popup" class="fast_titles_table" style="margin:0 auto;">${html}</table>`);
                        option_bind();
                        tooltip_bind();
                    });
                });
                $("body").on("click", ".fast_titles_table .option", () => {
                    setTimeout(() => {
                        GAME.maploaded = false;
                        GAME.prepareMap();
                    }, 300);
                });
                $("body").on("click", `.qlink.manage_auto_abyss`, () => {
                    if (!this.auto_abyss) {
                        this.auto_abyss = true;
                        $(".qlink.manage_auto_abyss").addClass("kws_active_icon");
                        this.auto_abyss_interval = setInterval(() => {
                            this.manageAutoAbyss();
                        }, 5000);
                    } else {
                        this.auto_abyss = false;
                        $(".qlink.manage_auto_abyss").removeClass("kws_active_icon");
                        clearInterval(this.auto_abyss_interval);
                    }
                });
                $("body").on("click", `.qlink.manage_auto_arena`, () => {
                    if (!this.auto_arena) {
                        this.auto_arena = true;
                        $(".qlink.manage_auto_arena").addClass("kws_active_icon");
                        this.manageAutoArena();
                    } else {
                        this.stopAutoArena();
                    }
                });
                $("body").on("click", `.qlink.manage_autoExpeditions`, () => {
                    this.manageAutoExpeditions();
                });
                $("body").on("click", `#secondary_char_stats .activities`, (event) => {
                    GAME.socket.emit('ga', {
                        a: 49,
                        type: 0
                    });
                    setTimeout(() => {
                        this.collectActivities();
                    }, 1000);
                });
                $("body").on("click", `#secondary_char_stats .instance`, () => {
                    GAME.socket.emit('ga', {
                        a: 44,
                        type: 0
                    });
                    setTimeout(() => {
                        $("#page_game_emp .newBtn.do_all_instances").eq(0).click();
                    }, 1000);
                });
                $("body").on("click", `#page_game_ekw .ekw_bck .ekw_slot`, (e) => {
                    let slot = $(e.target).closest(".ekw_slot").attr("id");
                    let slot_number = slot.replace(/[^0-9]/g, "");
                    GAME.socket.emit('ga', {
                        a: 12,
                        type: 4,
                        slot: slot_number,
                        page: GAME.ekw_page,
                        page2: GAME.ekw_page2
                    });
                });
                $("body").on("change", "#minimap_side", (el) => {
                    let value = parseInt($(el.target).val());
                    if (value == 0) {
                        $("#minimap_con").css({
                            "right": "-5px",
                            "left": "unset"
                        });
                    } else if (value == 1) {
                        $("#minimap_con").css({
                            "left": "-4px",
                            "right": "unset"
                        });
                    } else if (value == 2) {
                        $("#minimap_con").css({
                            "left": "-210px",
                            "right": "unset"
                        });
                    }
                    this.minimap.side = value;
                    this.manageMinimapSettings("save");
                });
                $("#minimap_range").on("input", (el) => {
                    let value = parseInt($(el.target).val());
                    $("#minimap_con").css({
                        "opacity": value / 100
                    });
                    this.minimap.opacity = value;
                    this.manageMinimapSettings("save");
                }).mouseup((el) => {
                    let value = parseInt($(el.target).val());
                    $("#minimap_con").css({
                        "opacity": value / 100
                    });
                });
                $("body").on("change", "#kws_sh_locInfo", (el) => {
                    let value = parseInt($(el.target).val());
                    if (value == 1) {
                        $("#kws_locInfo").css({
                            "display": "block"
                        });
                    } else {
                        $("#kws_locInfo").css({
                            "display": "none"
                        });
                    }
                    this.minimap.loc_info = value;
                    this.manageMinimapSettings("save");
                });
                $("body").on("change", "#kws_hidePilot", (el) => {
                    let value = parseInt($(el.target).val());
                    this.managePilot("set", value);
                });
                $("body").on("click", `.kws_mapsize_change`, () => {
                    let width = parseInt($(`input[name="kws_map_width"]`).val());
                    let height = parseInt($(`input[name="kws_map_height"]`).val());
                    if (width && height) {
                        this.manageMapSize("change", [width, height]);
                    }
                });
                $("body").on("click", `.kws_mapsize_reset`, () => {
                    this.manageMapSize("reset")
                });
                $("body").on("click", `.kws_change_website_bg`, () => {
                    let url = $("#new_website_bg").val();
                    this.manageWebsiteBackground("set", url);
                });
                $("body").on("click", `.kws_reset_website_bg`, () => {
                    this.manageWebsiteBackground("reset");
                });
                $("body").on("click", `[data-option="map_multi_pvp"]`, () => {
                    this.pvpKill();
                });
                $("body").on("click", `[data-option="map_quest_skip"]`, () => {
                    this.questProceed();
                    kom_clear();
                });
                $("body").on("click", `[data-option="map_quest_skip_time"]`, () => {
                    this.useCompressor();
                });
                $("body").on("click", `[data-option="map_alternative_pilot"]`, () => {
                    this.createAlternativePilot();
                });
                $("body").on("click", `[data-option="fight_champ"]`, () => {
                    this.killChamp();
                });
                $("body").on("click", `[data-option="fight_elite"]`, () => {
                    console.log("kill elite clicked");
                    this.killElite();
                });
                $("body").on("click", `[data-option="fight_boss"]`, () => {
                    this.killBoss();
                });
                $(document).keydown((event) => {
                    if (!$("input, textarea").is(":focus")) {
                        if (event.key === "x" || event.key === "X") {
                            this.questProceed();
                            kom_clear();
                        } else if (event.key === "b" || event.key === "B") {
                            this.pvpKill();
                        } else if (event.key === "n" || event.key === "N") {
                            this.useCompressor();
                        } else if (event.key === "1") {
                            GAME.socket.emit('ga', {
                                a: 22,
                                type: 7,
                                id: GAME.quest_action_qid,
                                cnt: GAME.quest_action_max
                            });
                        } else if (event.key === "2") {
                            this.killChamp()
                        } else if (event.key === "3") {
                            this.killElite()
                        } else if (event.key === "4") {
                            this.killBoss();
                        } else if (event.key === "5") {
                            setTimeout(() => {
                                GAME.socket.emit('ga', {
                                    a: 54,
                                    type: 0
                                });
                            }, 300);
                            setTimeout(() => {
                                this.vip();
                            }, 600);
                            GAME.socket.emit('ga', {
                                a: 15,
                                type: 7
                            });
                        } else if (event.key === "6") {
                            GAME.socket.emit('ga', {
                                a: 39,
                                type: 46,
                                rent: 3
                            });
                        } else if (event.key === "7") {
                            GAME.socket.emit('ga', {
                                a: 10,
                                type: 2,
                                ct: 0
                            });
                        } else if (event.key === "8") {
                            let set = $("#ekw_sets").find(".option.ek_sets_all" + ":not(.current)").attr("data-set");
                            if (set != undefined) {
                                GAME.socket.emit('ga', {
                                    a: 64,
                                    type: 2,
                                    set: set
                                });
                            }
                        } else if (event.key === "=") {
                            this.createAlternativePilot();
                        } else if (event.key === ",") {
                            this.goToPreviousChar();
                        } else if (event.key === ".") {
                            this.goToNextChar();
                        } else if (event.key === "9" && JQS.qcc.is(":visible")) { }
                    }
                });
                $("body").on("click", ".qlink.load_afo", () => {
                    if (typeof this.afo_is_loaded == 'undefined') {
                        this.afo_is_loaded = true;
                        $.get("https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-scripts/afo-panel.js?t=" + Date.now(), (data) => {
                            $("body").append(`<script>${data}<\/script>`);
                            GAME.komunikat("załadowano afo!");
                        }).fail(() => {
                            GAME.komunikat("Wystąpił błąd w ładowaniu skryptu, odśwież stronę i spróbuj ponownie!");
                        });
                    } else {
                        GAME.komunikat("Wystąpił błąd w ładowaniu skryptu, odśwież stronę i spróbuj ponownie!");
                    }
                });

                $("body").on("click", ".qlink.go_to_emp", (el) => {
                    let emp = parseInt($(el.target).attr("emp"));
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 5,
                        e: emp
                    });
                });
                $("#kws_spawn").draggable({
                    handle: ".sekcja"
                });
                $('.spawn_switch').on('click', function () {
                    $("#kws_spawn2").toggle();
                });
                $("#kws_spawn input[type=checkbox], input[type=text]").change((chb) => {
                    switch ($(chb.target).attr("name")) {
                        case "ignoreMobs":
                            GAME.spawner[1] = $('#kws_spawn input[name="ignoreMobs"]').map((index, element) => {
                                return element.checked ? 1 : 0;
                            }).get();
                            break;
                        case "usePaToSpawn":
                            this.updatePaToSpawn($(chb.target).val());
                            break;
                    }
                });
                // $("#secondary_char_stats").append(` <div class="instance" data-toggle="tooltip" data-original-title="<div class=tt>Instancje <br /><span class=&quot;red&quot;><b>Kliknij by wykonać instancje</b></span></div>" class=""><i class="ico a11"></i> <span> <ul><ul/></span></div> <div class="activities" data-toggle="tooltip" data-original-title="<div class=tt>Aktywności <br /><span class=&quot;red&quot;><b>Kliknij by odebrać aktywności</b></span></div>" class=""><i class="ico a12"></i> <span> <ul><ul/></span></div>`);
                $("body").on('change', '.autoExpeCodes input[type=checkbox]', (el) => {
                    let name = $(el.target).attr("name");
                    if (name === 'aeCodes') {
                        this.settings.aeCodes = $(el.target).is(':checked') ? true : false;
                    }
                    this.updateSettings();
                });
                $("body").on("click", `.quest_roll1.option`, () => {
                    var id = parseInt($(".quest_roll.option").attr("data-qb_id"));
                    if (roll1) {
                        roll1 = false;
                    } else {
                        roll1 = true;
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 1,
                            id: id
                        });
                    }
                });
                $("body").on("click", `.quest_roll2.option`, () => {
                    var id = parseInt($(".quest_roll.option").attr("data-qb_id"));
                    if (roll2) {
                        roll2 = false
                    } else {
                        roll2 = true;
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 1,
                            id: id
                        });
                    }
                });
                $("body").on("click", `.quest_roll3.option`, () => {
                    var id = parseInt($(".quest_roll.option").attr("data-qb_id"));
                    if (roll3) {
                        roll3 = false;
                    } else {
                        roll3 = true;
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 1,
                            id: id
                        });
                    }
                });
            }

            killChamp(){
                var mob_id;
                var mob_size;
                for (var i = 0; i < GAME.field_mobs.length; i++) {
                    if (GAME.field_mobs[i].custom_rank == 1) {
                        mob_id = i;
                        mob_size = GAME.field_mobs[i].ranks[GAME.field_mobs[i].custom_rank];
                    }
                }
                if (mob_size > 0) {
                    GAME.emitOrder({a:7,mob_num:mob_id,rank:1});
                    setTimeout(() => {
                        $('#fight_view').fadeOut();
                    }, 200);
                }
            }
            killElite(){
                var mob_id;
                var mob_size;
                for (var i = 0; i < GAME.field_mobs.length; i++) {
                    console.log("searching elite");
                    if (GAME.field_mobs[i].custom_rank == 2) {
                        mob_id = i;
                        mob_size = GAME.field_mobs[i].ranks[GAME.field_mobs[i].custom_rank];
                        console.log("elite", mob_id, mob_size);
                    }
                }
                if (mob_size > 0) {
                    GAME.emitOrder({a:7,mob_num:mob_id,rank:2});
                    setTimeout(() => {
                        $('#fight_view').fadeOut();
                    }, 200);
                }
                
            }
            killBoss(){
                var mob_id;
                var mob_size;
                for (var i = 0; i < GAME.field_mobs.length; i++) {
                    if (GAME.field_mobs[i].custom_rank == 3) {
                        mob_id = i;
                        mob_size = GAME.field_mobs[i].ranks[GAME.field_mobs[i].custom_rank];
                    }
                }
                if (mob_size > 0) {
                    GAME.emitOrder({a:7,mob_num:mob_id,rank:3});
                    setTimeout(() => {
                        $('#fight_view').fadeOut();
                    }, 200);
                }
            }
            prepareFutureStatsData() {
                
            }
            handleAdditionalTopBarVisibility() {
                if(this.additionalTopBarVisible) {
                    this.hideAdditionalTopBar();
                    this.additionalTopBarVisible = false;
                } else {
                    this.showAdditionalTopBar();
                    this.additionalTopBarVisible = true;
                }
            }
            resetCalculatedPower() {
                this.baselinePower = undefined;
                this.baselineLevel = undefined;
            }
            showAdditionalTopBar() {
                $("#game_win")[0].style.marginTop = '30px';
                $("#top_bar")[0].style.height = '60px';
                $(".kws_additional_top_bar")[0].style.marginTop = '30px';
                $(".kws_additional_top_bar")[0].style.display = 'block';
            }
            hideAdditionalTopBar() {
                $(".kws_additional_top_bar")[0].style.display = 'none';
                $("#top_bar")[0].style.height = '30px';
                $("#game_win")[0].style.marginTop = '0px';
            }
            findTournamentCategory() {
                for (var type = 2; type <= 2; type++) {
                    for (var cat = 1; cat <= 69; cat++) {
                        if (GAME.isYourTourCat(type, cat, GAME.char_data.reborn, GAME.char_data.level)) {
                            this.tournamentCategory = cat;
                        }
                    }
                }
            }
            checkTournamentsSigning() {
                if(this.isCheckingTournaments) { console.log("KWA_TOURNAMENTS: currently handling tournaments sign"); return; }
                this.isCheckingTournaments = true;
                var currentServerTime = new Date(GAME.getTime()*1000);
                var currentServerHour = currentServerTime.getHours();
                var currentServerMinute = currentServerTime.getMinutes();
                console.log("KWA_TOURNAMENTS: Check tournaments sign");
                if(currentServerHour > 20 || currentServerHour < 18) {
                    console.log("KWA_TOURNAMENTS: Wrong hours, reset values");
                    this.tourSigned = false;
                    this.tournamentCategory = undefined;
                    this.newTournamentID = undefined;
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
                }
            }
            setTimerForTournamentsReset() {
                console.log("KWA_TOURNAMENTS: reset isCheckingTournaments flag");
                this.isCheckingTournaments = false;
            }
            createAlternativePilot() {
                document.getElementById('map_pilot').style.width = '512px';
                var customStyles = document.createElement('style');
                customStyles.type = 'text/css';
                customStyles.innerHTML = `
                    .qtrack {
                        width: 410px !important;
                        font-size: 12px !important;
                    }
                    .qtrack strong {
                        font-size: 12px !important;
                    }
                    .adv {
                        display: none !important;
                    }
                    .kom {
                        background: url(/gfx/layout/tloPilot.png) !important;
                        background-size: cover !important;
                        border-image: url(/gfx/layout/mapborder.png) 7 8 7 7 fill !important;
                        border-style: solid !important;
                        border-width: 7px 8px 7px 7px !important;
                        box-shadow: none !important;
                    }
                    .kom .close_kom b {
                        background: url(/gfx/layout/tloPilot.png) !important;
                    }
                    #war_container {
                        position: absolute !important;
                        left: 10px !important;
                        top: 565px !important;
                    }
                    #quest_con {
                        margin-top: -295px !important;
                        left: -510px !important;
                      }
                `;
                $("head").append(customStyles);
                var kwsHidePilotElement = document.getElementById('kws_hidePilot');
                var mapPilotElement = document.getElementById('map_pilot');
                if (kwsHidePilotElement) {
                    kwsHidePilotElement.value = '1';
                    var changeEvent = new Event('change');
                    kwsHidePilotElement.dispatchEvent(changeEvent);
                    if (kwsHidePilotElement.value === '1' && mapPilotElement) {
                        mapPilotElement.style.display = 'none';
                    }
                    var clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
                    kwsHidePilotElement.dispatchEvent(clickEvent);
                } else {
                    console.error('Element o ID "kws_hidePilot" nie został znaleziony.');
                }
                var minimap = document.querySelector('#minimap_canvas');
                var gridCanvas = document.querySelector('#minimap_grid_canvas');
                var minimapLay = document.querySelector('.minimap_lay');
                var kwsLocInfo = document.querySelector('#kws_locInfo');

                if (minimap) {
                    minimap.style.left = '-15px';
                    minimap.style.top = '813px';
                }

                if (gridCanvas) {
                    gridCanvas.style.left = '-15px';
                    gridCanvas.style.top = '813px';
                }

                if (minimapLay) {
                    minimapLay.style.left = '-30px';
                    minimapLay.style.top = '802px';
                }

                if (kwsLocInfo) {
                   // kwsLocInfo.style.left = '-235px';
                   // kwsLocInfo.style.top = '860px';
		  kwsLocInfo.style.left = '-35px';
		  kwsLocInfo.style.top = '1030px';                   
                }

                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:530px; left:144px; z-index:999;'><button 		 id='klawiszw' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>&#8593;</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:530px; left:65px; z-index:999;'><button id='klawiszq' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>Q</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:530px; left:225px; z-index:999;'><button id='klawisze' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>E</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:607px; left:144px; z-index:999;'><button id='klawiszs' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>&#8595;</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:607px; left:65px; z-index:999;'><button id='klawisza' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>&#8592;</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:607px; left:225px; z-index:999;'><button id='klawiszd' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>&#8594;</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:684px; left:145px; z-index:999;'><button id='klawiszx' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>x</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:684px; left:65px; z-index:999;'><button id='klawiszz' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>Z</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:684px; left:225px; z-index:999;'><button id='klawiszc' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>C</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:761px; left:100px; z-index:999;'><button id='klawiszr' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>R</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');                 
                $('#map_canvas_container').append("<div style='position:absolute; top:761px; left:11px; z-index:999;'><button id='klawiszy' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>Y</button></div>");                 
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:761px; left:189px; z-index:999;'><button id='klawiszv' style='width: 70px; height: 70px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 50px;'>V</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                // dodanie obrazka do kontenera
                $('#map_canvas_container').append("<div style='position:absolute; top:530px; left:310px; z-index:999;'><button id='klawiszqx3' style='width: 60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>Qx5</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:530px; left:373px; z-index:999;'><button id='klawiszwx3' style='width: 60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;;'>&#8593;x5</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:530px; left:436px; z-index:999;'><button id='klawiszex3' style='width: 60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>Ex5</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:595px; left:310px; z-index:999;'><button id='klawiszax3' style='width: 60px; height:60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>&#8592;x5</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:595px; left:373px; z-index:999;'><button id='klawiszsx3' style='width: 60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>x5&#8595;</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:595px; left:436px; z-index:999;'><button id='klawiszdx3' style='width:60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>&#8594;x5</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:660px; left:310px; z-index:999;'><button id='klawiszzx3' style='width: 60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>Zx5</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:660px; left:436px; z-index:999;'><button id='klawiszcx3' style='width: 60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>Cx5</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:730px; left:373px; z-index:999;'><button id='klawiszvx3' style='width: 60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>Vx5</button></div>");
                $('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
                $('#map_canvas_container').append("<div style='position:absolute; top:730px; left:310px; z-index:999;'><button id='klawiszb5' style='width:60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>B</button></div>");
                $('#map_canvas_container').append("<div style='position:absolute; top:730px; left:436px; z-index:999;'><button id='klawiszn' style='width: 60px; height: 60px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 16px;'>N</button></div>");
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:851px; left:89px; z-index:999;'><button id='klawisz1' style='width: 50px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>1</button></div>");	
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:851px; left:149px; z-index:999;'><button id='klawisz2' style='width: 50px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>2</button></div>");
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:851px; left:209px; z-index:999;'><button id='klawisz3' style='width: 50px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>3</button></div>");	
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:911px; left:89px; z-index:999;'><button id='klawisz4' style='width: 50px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>4</button></div>");
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:911px; left:149px; z-index:999;'><button id='klawisz5' style='width: 50px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>5</button></div>");	
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:911px; left:209px; z-index:999;'><button id='klawisz6' style='width: 50px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>6</button></div>");	
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:971px; left:89px; z-index:999;'><button id='klawisz7' style='width: 50px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>7</button></div>");	
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:971px; left:149px; z-index:999;'><button id='klawisz8' style='width: 50px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>8</button></div>");
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:971px; left:209px; z-index:999;'><button id='klawisz9' style='width: 50px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>9</button></div>");
	$('.clearfix').append('<div id="map_canvas_container" style="position:absolute; top:731px; left:59px; "></div>');
	$('#map_canvas_container').append("<div style='position:absolute; top:1031px; left:89px; z-index:999;'><button id='klawiszspacja' style='width: 150px; height: 50px; border-radius: 5px; border: 2px solid white; padding: 5px; background-color: black; color: white; cursor: pointer; font-size: 20px;'>----------------</button></div>");									
                this.bindAlternativePilotButtons();
            }
            bindAlternativePilotButtons() {
			$('#klawiszspacja').click(() => {
			    const originalCreateAlternativePilot = createAlternativePilot;
			    function createAlternativePilot() {
			    }

			    delete window.createAlternativePilot;

			    $('#klawiszw, #klawiszy, #klawisz1, #klawisz2, #klawisz3, #klawisz4, #klawisz5, #klawisz6, #klawisz7, #klawisz8, #klawisz9, #klawiszq, #klawisze, #klawiszs, #klawisza, #klawiszd, #klawiszx, #klawiszz, #klawiszc, #klawiszr, #klawiszy, #klawiszv, #klawiszqx3, #klawiszwx3, #klawiszex3, #klawiszax3, #klawiszsx3, #klawiszdx3, #klawiszzx3, #klawiszcx3, #klawiszvx3, #klawiszb5, #klawiszspacja, #klawiszn').remove();

			    var kwsHidePilotElement = document.getElementById('kws_hidePilot');
			    var mapPilotElement = document.getElementById('map_pilot');
			    if (kwsHidePilotElement) {
				kwsHidePilotElement.value = '0';
				var changeEvent = new Event('change');
				kwsHidePilotElement.dispatchEvent(changeEvent);
				if (kwsHidePilotElement.value === '0' && mapPilotElement) {
				    mapPilotElement.style.display = 'block';
				}
				var clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
				kwsHidePilotElement.dispatchEvent(clickEvent);
			    }
			    createAlternativePilot = originalCreateAlternativePilot;
			});
      
                $('#klawiszw').click(() => {
                    GAME.map_move(2) // klawisz 'w'
                });


        $("body").on("click", `button[data-page="custom_but"]`, () => {  
            console.log("custom clicked,")
        });     

 		  $('#klawisz1').click(() => {
		  var keyEvent = jQuery.Event('keydown');
		  keyEvent.which = 49;  // Kod klawisza '1'
		  $(document).trigger(keyEvent);
		});	
		$('#klawisz2').click(() => {
		    GAME.socket.emit('ga', {
			a: 15,
			type: 13
		    });
		});

		$('#klawisz3').click(() => {
		    GAME.socket.emit('ga', {
			a: 39,
			type: 32
		    });
		});

		$('#klawisz4').click(() => {
		    this.bless();
		});

		$('#klawisz5').click(() => {
		    setTimeout(() => {
			GAME.socket.emit('ga', {
			    a: 54,
			    type: 0
			});
		    }, 300);
		    setTimeout(() => {
			this.vip();
		    }, 600);
		    GAME.socket.emit('ga', {
			a: 15,
			type: 7
		    });
		});

		$('#klawisz6').click(() => {
		    GAME.socket.emit('ga', {
			a: 39,
			type: 46,
			rent: 3
		    });
		});

		$('#klawisz7').click(() => {
		    GAME.socket.emit('ga', {
			a: 10,
			type: 2,
			ct: 0
		    });
		});

		$('#klawisz8').click(() => {
		    let set = $("#ekw_sets").find(".option.ek_sets_all" + ":not(.current)").attr("data-set");
		    if (set != undefined) {
			GAME.socket.emit('ga', {
			    a: 64,
			    type: 2,
			    set: set
			});
		    }
		});

		$('#klawisz9').click(() => {
		    var keyEvent = jQuery.Event('keydown');
		    keyEvent.which = 57;  // Kod klawisza '9'
		    $(document).trigger(keyEvent);
		});
            
                $('#klawiszq').click(() => {
                    GAME.map_move(6) //klawisz 'q'
                });
                $('#klawisze').click(() => {
                    GAME.map_move(5)// klawisz 'e'
                });
                $('#klawiszs').click(() => {
                    GAME.map_move(1) //klawisz 's'
                });
                $('#klawisza').click(() => {
                    GAME.map_move(8) //Klawisz 'a'
                });
                $('#klawiszd').click(() => {
                    GAME.map_move(7)//klawisz 'd'
                });
                $('#klawiszx').click(() => {
                    this.questProceed();
                    kom_clear();
                    GAME.executeIx();
                });
                $('#klawiszz').click(() => {
                    GAME.map_move(4)//klawisz 'z'
                });
                $('#klawiszc').click(() => {
                    GAME.map_move(3)//klawisz 'c'
                });
                $('#klawiszr').click(() => {
                    GAME.emitOrder({ a: 13, mob_num: GAME.field_mob_id, fo: GAME.map_options.ma })//klawisz 'r'
                });
                $('#klawiszy').click(() => { 
                    GAME.emitOrder({a:444,max:GAME.spawner[0],ignore:GAME.spawner[1]})//klawisz 'y' 
                }); 
                $('#klawiszv').click(() => {
                    GAME.emitOrder({ a: 7, order: 2, quick: 1, fo: GAME.map_options.ma })// klawisz 'v'
                });
                $('#klawiszqx3').click(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            GAME.map_move(6)
                        }, i * 130);
                    }
                });
                $('#klawiszwx3').click(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            GAME.map_move(2) // klawisz 'w' x 3
                        }, i * 130);
                    }
                });
                $('#klawiszex3').click(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            GAME.map_move(5)
                        }, i * 130);
                    }
                });
                $('#klawiszax3').click(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            GAME.map_move(8)
                        }, i * 130);
                    }
                });
                $('#klawiszsx3').click(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            GAME.map_move(1)
                        }, i * 130);
                    }
                });
                $('#klawiszdx3').click(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            GAME.map_move(7)
                        }, i * 130);
                    }
                });
                $('#klawiszzx3').click(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            GAME.map_move(4)
                        }, i * 130);
                    }
                });
                $('#klawiszcx3').click(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            GAME.map_move(3)
                        }, i * 130);
                    }
                });
                $('#klawiszvx3').click(() => {
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            GAME.emitOrder({ a: 7, order: 2, quick: 1, fo: GAME.map_options.ma })
                        }, i * 130);
                    }
                });
                $('#klawiszb5').click(() => {
                    this.pvpKill();
                });
                $('#klawiszn').click(() => {
                    this.useCompressor()
                });
            }
            goToNextChar() {
                this.resetAFO();
                var charId = this.charactersManager.getNextCharId();
                GAME.emitOrder({ a: 2, char_id: charId });
            }
            goToPreviousChar() {
                this.resetAFO();
                var charId = this.charactersManager.getPreviousCharId();
                GAME.emitOrder({ a: 2, char_id: charId });
            }
            adjustCurrentCharacterId() {
                var thisCharId = GAME.char_id;
                if (thisCharId != this.charactersManager.currentCharacterId) {
                    this.charactersManager.setCurrentCharacterId(thisCharId);
                }
            }
            resetAFO() {
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
            }
        }
        const kws = new kwsv3(kwsLocalCharacters);
        GAME.komunikat2 = function (kom) {
            if (this.koms.indexOf(kom) == -1) {
                if (this.komc > 50) this.komc = 40;
                var ind = this.koms.push(kom) - 1;
                JQS.kcc.append(`<div class="kom" style="top:130px; width:480px;"><div class="close_kom" data-ind="${ind}"><b>X</b></div><div class="content">${kom}</div></div>`);
                this.komc++;
                kom_close_bind();
            }
        }
        $("body").off("click.swaKomClose").on("click.swaKomClose", ".kom .close_kom", function() {
            $(this).closest(".kom").remove();
        });
        GAME.cached_data = function () {
            var pos = $('#char_buffs').offset();
            pos.left -= 75;
            pos.top -= 75;
            this.char_buffs_pos = pos;
            if (GAME.char_id != 0 && GAME.quick_opts.online_reward) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 26,
                        type: 1
                    });
                    setTimeout(() => {
                        $('#daily_reward').fadeOut();
                        kom_clear();
                    }, 400);
                }, 1800);
            }
            setTimeout(() => {
                if (GAME.emp_wars.length < 3 && GAME.quick_opts.empire) {
                    setTimeout(() => {
                        kws.wojny2();
                    }, 300);
                }
            }, 1500);
            GAME.startLevel = GAME.char_data.level;
            GAME.startTime = Date.now();
            setTimeout(() => {
                if (GAME.char_data.planetary == 0) {
                    setTimeout(() => {
                        GAME.socket.emit('ga', {
                            a: 39,
                            type: 34
                        });
                    }, 300);
                }
            }, 1200);
            const emitCalls = [{
                a: 33,
                type: 0
            }, {
                a: 49,
                type: 0
            }, {
                a: 29,
                type: 0
            },];
            let cd = [300, 600, 900];
            emitCalls.forEach((data, i) => {
                setTimeout(() => {
                    GAME.socket.emit('ga', data);
                }, cd[i]);
            });
            $('#train_uptime').html(GAME.showTimer(GAME.char_data.train_ucd - GAME.getTime()));
            setTimeout(() => {
                if (kws.check_act()) {
                    $("#secondary_char_stats .activities").click();
                }
            }, 1200);
            GAME.parseQuickOpts(1);
            kws.workers_info = [false, false];
            arena_count = 0;
            pvp_count = 0;
            setTimeout(() => {
                if ((GAME.char_data.reborn == 4 || GAME.char_data.reborn == 5) && GAME.char_data.alt_transform_expiry < GAME.getTime()) {
                    GAME.socket.emit('ga', {
                        a: 18,
                        type: 8,
                        tech_id: 134
                    });
                }
            }, 5300);
        }
        GAME.parseQuickOpts = function (newq_bar = false) {
            var opts = '';
            if (this.quick_opts.tutorial) {
                this.tutorials = this.quick_opts.tutorial;
                opts += `<img id="open_tuts" src="/gfx/layout/helper.png" class="qlink2 option" data-option="open_tuts" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab358}</div>" />`;
                $.getJSON('/json/tutorial.json', function (json) {
                    GAME.tutorial_data = json.tuts;
                    GAME.checkTutorial();
                });
            }
            // if (this.quick_opts.private_planet) opts += `<div class="option qlink priv" data-option="private_teleport" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab138}</div>"></div>`;
            if (this.quick_opts.teleport) opts += `<div class="option qlink tele" data-option="use_teleport" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab140}</div>"></div>`;
            if (this.quick_opts.travel) opts += `<div class="option qlink trav" data-option="use_travel" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab141}</div>"></div>`;
            if (this.quick_opts.ssj) {
                opts += `<div class="option qlink ssj${this.quick_opts.ssj[0] == "116" ? "_uio" : this.quick_opts.ssj[1]} show_qat" data-option="use_transform" data-tech="${this.quick_opts.ssj[0]}"data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab139}</div>"></div>`;
                opts += `<div id="quick_allTransformations"></div>`;
            }
            if (this.quick_opts.online_reward) opts += `<div class="option qlink dail" data-option="daily_reward" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab176}</div>"></div>`;
            if (this.quick_opts.bless) opts += `<div class="select_page qlink bles" data-page="game_buffs" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab188}</div>"></div>`;
            if (this.quick_opts.sub && this.quick_opts.sub.length) opts += `<div class="option qlink subs" data-option="quick_use_subs" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab189}</div>"></div>`;
            if (this.quick_opts.senzus && this.quick_opts.senzus.length) {
                opts += `<div class="option qlink senz" data-option="quick_use_senzu" data-toggle="tooltip" data-original-title="<div class=tt>${LNG.lab190}</div>"></div>`;
            }
            if (newq_bar || GAME.char_id) {
                opts += '<br>';
            
                opts += `<div class="qlink get_titles_list" style="filter:hue-rotate(168deg);background-image: url('https://i.imgur.com/0eQCqBl.png');" data-toggle="tooltip" data-original-title="<div class=tt>Zmień tytuł</div>"></div>`;
                opts += `<div class="qlink load_afo" style="filter:hue-rotate(168deg);background-image: url('https://i.imgur.com/P8sJgQz.png');" data-toggle="tooltip" data-original-title="<div class=tt>Załaduj AFO</div>"></div>`;
                opts += `<div class="qlink sideIcons manage_auto_abyss${kws.auto_abyss ? ' kws_active_icon' : ''}" style="filter:hue-rotate(168deg);background-image: url('https://i.imgur.com/j5eQv2B.png');display:block;top:-136px;position:absolute;" data-toggle="tooltip" data-original-title="<div class=tt>[Włącz / Wyłącz] Atakowanie Otchłani</div>"></div>`;
                opts += `<div class="qlink sideIcons manage_auto_arena${kws.auto_arena ? ' kws_active_icon' : ''}" style="filter:hue-rotate(168deg);background-image: url('https://i.imgur.com/rAroNzD.png');display:block;top:-104px;position:absolute;" data-toggle="tooltip" data-original-title="<div class=tt>[Włącz / Wyłącz] Atakowanie na Arenie</div>"></div>`;
            }
            $('#quick_bar').html(opts);

            option_bind();
            tooltip_bind();
            page_bind();
        }
        GAME.parseTracker = function (track) {
            var con='';
            if(track&&track.length){
                var len=track.length;
                con+='<div class="sekcja">'+LNG.lab181+'</div>';
                for(var i=0;i<len;i++){
                    var qn=track[i].header;
                    if(qn&&qn.length>20) qn=qn.slice(0,20)+'...';
                    con+='<div id="track_quest_'+track[i].qb_id+'" class="qtrack"><div class="sep2"></div><b>'+qn+'</b> '+this.quest_want(track[i].want,track[i].qb_id)+'</div>';
                }
            }
            con+='<div class="clr"></div>';
            $('#quest_track_con').html(con);
        }

        GAME.endQuest = function (quest_end) {
            JQS.qcc.hide();
            $('#field_q_' + quest_end).fadeOut();
            for (var ind in this.map_quests) {
                if (this.map_quests.hasOwnProperty(ind)) {
                    var len = this.map_quests[ind].length;
                    for (var i = 0; i < len; i++) {
                        if (this.map_quests[ind][i].qb_id == quest_end) {
                            this.map_quests[ind][i].end = 1;
                        }
                    }
                }
            }
            if (GAME.map_quests) {
                kws.parseMapInfo(GAME.map_quests, "GAME.endQuest");
            }
        };
        GAME.moveQuest = function (quest_move) {
            if (this.char_data.loc == quest_move.loc) {
                JQS.qcc.hide();
                $('#field_q_' + quest_move.qb_id).fadeOut();
                for (var ind in this.map_quests) {
                    if (this.map_quests.hasOwnProperty(ind)) {
                        var len = this.map_quests[ind].length;
                        for (var i = 0; i < len; i++) {
                            if (this.map_quests[ind][i].qb_id == quest_move.qb_id) {
                                this.map_quests[ind][i].move = {
                                    new_x: quest_move.x,
                                    new_y: quest_move.y,
                                    start: this.getmTime(),
                                    duration: 300
                                };
                            }
                        }
                    }
                }
                if (GAME.map_quests) {
                    kws.parseMapInfo(GAME.map_quests, "GAME.moveQuest");
                }
            } else this.endQuest(quest_move.qb_id);
        };
        GAME.parseLocBons = function (loc_data) {
            kws.parseMapInfo(GAME.map_quests, "GAME.parseLocBons");
            var bons = '';
            if (loc_data.bonus_tren) bons += '<img src="/gfx/icons/loc_bon/tren.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_tren + '</b>' + LNG.item_stat15 + '</div>" />';
            if (loc_data.bonus_exp) bons += '<img src="/gfx/icons/loc_bon/exp.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_exp + '</b>' + LNG.item_stat16 + '</div>" />';
            if (loc_data.bonus_mocc) bons += '<img src="/gfx/icons/loc_bon/mc.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_mocc + '</b>' + LNG.item_stat53 + '</div>" />';
            if (loc_data.bonus_mocv) bons += '<img src="/gfx/icons/loc_bon/mv.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_mocv + '</b>' + LNG.item_stat54 + '</div>" />';
            if (loc_data.bonus_legend) bons += '<img src="/gfx/icons/loc_bon/l.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_legend + '</b>' + LNG.item_stat74 + '</div>" />';
            if (loc_data.bonus_psk) bons += '<img src="/gfx/icons/loc_bon/p.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_psk + '</b>' + LNG.item_stat67 + '</div>" />';
            if (loc_data.bonus_senzu) bons += '<img src="/gfx/icons/loc_bon/s.png" data-toggle="tooltip" data-original-title="<div class=tt><b>' + loc_data.bonus_senzu + '</b>' + LNG.item_stat78 + '</div>" />';
            return bons;
        };
        GAME.emit = function (order, data, force) {
            if (!this.is_loading || force) {
                this.load_start();
                this.socket.emit(order, data);
            } else if (this.debug) console.log('failed order', order, data);
        };
        GAME.emitOrder = function (data, force = false) {
            this.emit('ga', data, force);
        };
        GAME.initiate = function () {
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
        const kulka = new ballManager();
    
        let adimp = false;
        let arena_count = 0;
        let pvp_count = 0;
        let roll2 = false;
        let roll1 = false;
        let roll3 = false;
        let version = '1.0.0';
    }
    )
}
