window.Assistant = class Assistant {
    constructor(charactersManager) {
        this.charactersManager = charactersManager;
        this.isLogged(() => {
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
        this.addToCSS(`#quick_bar{z-index:4;} .qlink.swa_active_icon{animation-name:swa_active_icon;animation-duration:1s;animation-iteration-count:infinite;}@keyframes swa_active_icon { 0% { filter: hue-rotate(168deg); } 50% { filter:hue-rotate(40deg); } 100% { filter: hue-rotate(168deg); } } .sideIcons{ width:29px; height:29px; left:-37px; background-size:contain; } .autoExpeCodes{background:#12121294; border:1px solid rgb(87, 87, 114); border-radius:5px 0px 0px 5px; position:absolute; top:-100px; left:-97px; padding:5px; display:none; color:#ffe500c7; user-select:none;} .manage_autoExpeditions:hover + .autoExpeCodes, .autoExpeCodes:hover{ display:flex; } .autoExpeCodes .newCheckbox{margin: 0 auto; display: block;} `);
        this.addToCSS(`#secondary_char_stats .instance{margin-top:10px; cursor:pointer; width:100px;} #secondary_char_stats .activities{margin-top:-5px; cursor:pointer; width:100px;} #secondary_char_stats ul {margin-top:-18px; margin-left:-18px;} .ico.a11{background:url("https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-assets/images/instances.png"); background-repeat: no-repeat; background-size: inherit; background-position: center;} .ico.a12{background-image: url(https://raw.githubusercontent.com/SWAssistant1/SWAssistant/main/game-assets/images/activity.png); background-repeat: no-repeat; background-size: inherit; background-position: center;}`); 
        this.addToCSS(`.ssj_uio{background:url("https://i.imgur.com/EcfEUcG.png");}`);
        this.addToCSS(`#quick_allTransformations { position:absolute; top:33px; z-index:1; background:rgb(0 0 0 / 59%); display:none; flex-direction: column-reverse; padding:5px 5px 0px 5px; border-radius:5px; box-shadow:0px 0px 5px 0px rgb(32 96 185);} .show_qat:hover + #quick_allTransformations, #quick_allTransformations:hover { display:flex; } #quick_allTransformations .option { display:block; margin:0px 0px 5px 0px; }`);
        this.addToCSS(`#player_list_con .glory_rank.war{animation:none !important;background-color:rgb(22 83 106);box-shadow:0px 0px 7px 0px rgb(0 253 255);} .player_clan.enemy img{animation:none !important;box-shadow:0px 0px 10px 1px rgb(0 253 255);}`);
        this.addToCSS(`.better_chat_loading{filter:sepia(1) hue-rotate(270deg);} .better_chat_loading:hover{filter:sepia(1) hue-rotate(90deg);} .chat_icon.load:hover{background:url(/gfx/layout/ikonyChat.png) -90px 0px !important;}`);
        this.addToCSS(`#upg_menu button[data-page="game_buffs"]{display:block !important;}`);
        this.addToCSS(`.qtrack{width:400px;} #drag_con.scroll .qtrack{width:383px;} #quest_track_con #drag_tracker{user-select:none;} #quest_track_con .sep2{height:14px;} #quest_track_con .sep3{height:14px;}`);
        this.addToCSS(`.qtrack.swa_quest_here{background:rgba(99,170,255,0.18); box-shadow:inset 0px 0px 8px 0px #63aaff; border-radius:4px;}`);
        this.addToCSS(`.option.ls.spawner{ position:absolute; top:60px; right:40px; background-size: 100% 100%; border: solid #6f6f6f 1px; }`);
        this.addToCSS(`#swa_minimap_settings{ margin:10px 0px 0px 0px; border-top:solid white 1px; padding-top:10px; } #field_sett #field_options{ height:407px; } #minimap_con{ ${this.minimap.side == 1 ? `left: -4px; right: unset;` : this.minimap.side == 2 ? `left: -210px; right: unset;` : ""} opacity: ${this.minimap.opacity / 100} } #minimap_range{ width:150px; display:inline-block; vertical-align:middle;} .smin_butt{background: #31313a69 !important; border: solid #ffffff4d 1px !important; width:auto !important; height:32px !important; line-height: 30px; display: inline-block; text-align: center; font-family: 'Play', sans-serif; font-size: 13px; font-weight: Bold; color: #fff; text-decoration: none; text-transform: uppercase; border: none; padding: 0 10px; border-radius: 5px; cursor: pointer; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin-top:2px; float:none !important;} .smin_input{background: #040e13; height: 31px; border: solid #ffffff4d 1px !important; display: inline-block; text-align:center; font-size: 13px; color: #305779; font-family: 'Play', sans-serif; vertical-align: middle;border-radius: 5px;}`);
        this.addToCSS(`#swa_locInfo{background:url("/gfx/layout/tloPilot.png");position: absolute;top: 220px;z-index: 2;width: 204px;padding: 5px;border-radius: 5px;border-image: url(/gfx/layout/mapborder.png) 7 8 7 7 fill;border-style: solid;border-width: 7px 8px 7px 7px; display:${this.minimap.loc_info == 0 ? `none` : `block`}} #swa_locInfo .sekcja{position:absolute;top:-20px;left:0px;background:url("https://i.imgur.com/Mi3kUpg.png");background-size:100% 100%;width:190px;}`);
        this.addToCSS(`.swa_top_bar{float:left !important; position: absolute; z-index: -1;} .swa_top_bar_section{color:white;padding:3px 5px 3px 5px;border-radius:5px;margin-right:8px;user-select:none;}`);
        this.addToCSS(`.go_to_emp_con{ position:absolute; top:33px; z-index:1; background:rgb(0 0 0 / 59%); display:none; flex-direction: column-reverse; padding:5px 5px 0px 5px; border-radius:5px; box-shadow:0px 0px 5px 0px rgb(32 96 185);} .empPos:hover + .go_to_emp_con, .go_to_emp_con:hover { display:flex; } .go_to_emp_con .qlink { display:block; margin:0px 0px 5px 0px; }`);
        this.addToCSS(`#ekw_sets_buy button, div[data-option="change_ekw_set"]{height:20px !important; line-height:19px !important; margin-top:9px !important;}`);
        this.addToCSS(`#page_game_camp .ekw_slot.smaller img{ width: 64px; } #page_game_camp div[data-item_id="1923"].smaller img { width: 32px; position: absolute; margin-top: -64px; margin-left: 34px; }`);
        this.addToCSS(`.spawn_switch{cursor:pointer;}`);
        this.addToCSS(`.quest_roll1{position:absolute; width:50px; height:50px; background:url('/gfx/layout/dice.png') 0 0; top:-25px; left:25px; cursor:pointer; filter:drop-shadow(0px 0px 10px lime)} .quest_roll2{position:absolute; width:50px; height:50px; background:url('/gfx/layout/dice.png') 0 0; top:-25px; left:75px; cursor:pointer; filter:drop-shadow(0px 0px 10px #00fdff)} .quest_roll3{position:absolute; width:50px; height:50px; background:url('/gfx/layout/dice.png') 0 0; top:-25px; left:125px; cursor:pointer; filter:drop-shadow(0px 0px 10px #ff0000)} .quest_roll:hover{background:url('/gfx/layout/dice.png') 0 -45px;} .quest_roll1:hover{background:url('/gfx/layout/dice.png') 0 -45px;} .quest_roll2:hover{background:url('/gfx/layout/dice.png') 0 -45px;} .quest_roll3:hover{background:url('/gfx/layout/dice.png') 0 -45px;}`);
        this.addToCSS(`#lastmap_bar { top: 115px !important; }`);
        this.addToCSS(`button#changeProfileNext { position: absolute; top: 125px; left: 139px; border: none; background: none; color: #9FBAD2;font-family: 'Roboto', sans-serif;  display: block; vertical-align: middle;  }`);
        this.addToCSS(`button#changeProfilePrev { position: absolute; top: 125px; left: 179px; border: none; background: none; color: #9FBAD2; font-family: 'Roboto', sans-serif;  display: block; vertical-align: middle;   }`);
        this.addToCSS(`.swa_additional_top_bar{float:left !important; position: absolute; z-index: -1; display: none} .swa_additional_top_bar_section{color:white;padding:3px 5px 3px 5px;border-radius:5px;margin-right:8px;user-select:none;}`);
        $("#top_bar").append(`<div class="swa_top_bar"></div>`);
        $("#top_bar").append(`<div class="swa_additional_top_bar"></div>`);
        $("#bless_type_2").click();
        $(`.channel_opts .option.chat_icon.load`).addClass('better_chat_loading').removeAttr('id').removeAttr('data-option');
        $("#clan_inner_planets h3").eq(0).append(`<button id="poka_telep" style="margin-left:5px;" class="newBtn">pokaż / ukryj salę telep</button>`);
        $(`<button class="newBtn free_assist_for_all" style="margin-right:5px;">Asystuj wszystkim za darmo</button>`).insertBefore(`button[data-option="clan_assist_all"]`);
        $("#clan_inner_wars h3").eq(0).append(` <button class="newBtn activate_all_clan_buffs">Aktywuj wszystkie buffy</button>`);
        $(`#minimap_con`).append(`<div id="swa_locInfo"><div class="sekcja">INFORMACJE O LOKACJI</div><div class="content"></div></div>`);
        $("#sett_page_local div").eq(0).prepend(`<b class="green">Zmień tło strony </b><div class="game_input"><input id="new_website_bg" style="width:370px;" type="text"></div><button class="option newBtn swa_change_website_bg" style="margin-left:5px;">Zmień</button><button class="option newBtn swa_reset_website_bg" style="margin-left:5px;">Reset</button><br><br>`);
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
};
