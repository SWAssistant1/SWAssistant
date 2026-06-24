if (typeof GAME === 'undefined') {} else {
    function pvp_option_bind(){
        $('.poption').off('click').on('click',function(){
            var th=$(this);
            if(th.is(':disabled')) return false;
            th.tooltip('hide');
            var option=th.data('option');
            switch(option){
                case 'show_player':
                    GAME.emitOrder({a:34,type:0,char_id:th.data('char_id')});
                break;
                case 'show_clan':
                    var klan_id=parseInt(th.data('klan_id'));
                    GAME.emitOrder({a:40,klan_id:klan_id});
                break;
                case 'pvp_attack':
                    GAME.emitOrder({a:24,char_id:th.data('char_id'),quick:th.data('quick')});
                break;
                case 'gpvp_attack':
                    GAME.emitOrder({a:24,type:1,char_id:th.data('char_id'),quick:th.data('quick')});
                break;
                case 'load_more_players':
                    GAME.emitOrder({a:3,type:1,start:th.data('start_from'),vo:GAME.map_options.vo});
                    $('.more_players').remove();
                break;
            }
        });
    }
    
    let Pog = setInterval(() => {
            clearInterval(Pog);

            function createPanel() {
                const css = ` #main_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 250px; left: 80%; z-index: 9999; width: 200px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #main_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #main_Panel .gh_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} `;
                const csspvp = ` #pvp_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 450px; left: 80%; z-index: 9999; width: 200px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #pvp_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #pvp_Panel .pvp_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} #pvp_Panel .gamee_input{text-align:center; border-bottom:solid gray 1px; color: white;} #pvp_Panel .gamee_input input::placeholder {color: #4b4b4b;} #pvp_Panel .gameee_input{text-align:center; border-bottom:solid gray 1px; color: white;} #pvp_Panel .gameee_input input::placeholder {color: #4b4b4b;}`;
                const cssresp = ` #resp_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 450px; left: 80%; z-index: 9999; width: 200px; padding: 1px; border-radius: 5px; border-style: solid;
                 border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #resp_Panel .sekcja { position: absolute; top: -27px; left: -7px; background:
                  rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #resp_Panel .resp_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} `;
                const csscode = ` #code_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 450px; left: 80%; z-index: 9999; width: 180px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #code_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 180px; cursor: all-scroll; } #code_Panel .code_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} `;
                const cssres = ` #res_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 450px; left: 75%; z-index: 9999; width: 200px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #res_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #res_Panel .res_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} #res_Panel ul {margin-left:-30px; color:white; margin:7px 0px 5px 0px; padding: 0px; text-align: center;} `;
                const cssinne = ` #inne_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 650px; left: 80%; z-index: 9999; width: 200px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #inne_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #inne_Panel .inne_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} #inne_Panel .pvm_killed {cursor:pointer;text-align:center; border-LGtom:solid gray 1px;text-align:center; color:white;} #inne_Panel .gamee_input{text-align:center; border-bottom:solid gray 1px; color: white;} `;
                const html = ` <div id="main_Panel"> <div class="sekcja panel_dragg">ALL FOR ONE</div> <div class='gh_button gh_resp'>PVM<b class='gh_status red'>Off</b></div> <div class='gh_button gh_pvp'>PVP<b class='gh_status red'>Off</b></div>  <div class='gh_button gh_res'>Zbierajka<b class='gh_status red'>Off</b></div> <div class='gh_button gh_inne'>Inne<b class='gh_status red'>Off</b></div> </div> `;
                const PVP_panel = ` <div id="pvp_Panel"> <div class="sekcja pvp_dragg">PVP</div> <div class='pvp_button pvp_pvp'>PVP<b class='pvp_status red'>Off</b></div>  <div class='pvp_button pvp_zmieniaj'>Zmieniaj postki <b class='pvp_status red'>Off</b></div> <div class='pvp_button pvp_WI'>Wojny <b class='pvp_status red'>Off</b></div> <div class='pvp_button pvp_org'> wynajmij orge <b class='pvp_status red'>Off</b></div>   <div class='gameee_input'><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="org id" name='org_id' value='18' /></div> <div class='pvp_button pvp_WK'>Wojny Klanowe<b class='pvp_status red'>Off</b></div>  <div class='gamee_input'><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="Lista wojen" name='pvp_capt' value='' /></div> <div class='gameee_input'><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="Szybkość 10-100" name='speed_capt' value='50' /></div> </div> `;
                const RESP_panel = ` <div id="resp_Panel"> <div class="sekcja resp_dragg">SPAWN MOBKóW</div> <div class="resp_button resp_resp">On<b class="resp_status red">Off</b></div>  <div class="resp_button resp_resp1">Resp<b class="resp_status red">Off</b></div> <div class="resp_button resp_rare">exp<b class="resp_status red">Off</b></div> <div class="resp_button resp_normal">Niszczenie eq<b class="resp_status red">Off</b></div> <div class="resp_button resp_leg">Niszczenie leq<b class="resp_status red">Off</b></div> <div class="resp_button resp_blue">Ogromny ramen<b class="resp_status red">Off</b></div> <div class="resp_button resp_green">maly ramen<b class="resp_status red">Off</b></div> <div class="resp_button resp_purple">Powiekszony ramen<b class="resp_status red">Off</b></div> <div class="resp_button resp_yellow">zolta pigula<b class="resp_status red">Off</b></div> <div class="resp_button resp_red">zielona pigula<b class="resp_status red">Off</b></div> <div class="resp_button resp_magic">Czerwona pigula<b class="resp_status red">Off</b></div>    <div class="resp_button resp_on">Włącz All<b class="resp_status green">On</b></div> <div class="resp_button resp_off">Wyłącz All<b class="resp_status red">Off</b></div>   </div> `;
                const CODE_panel = ` <div id="code_Panel"> <div class="sekcja code_dragg">Inne</div> <div class="code_button code_code">KODY<b class="code_status red">Off</b></div> <div class="code_button code_acc">Konto<b class="code_status red">Off</b></div> <div class="code_button code_zast">Zastępstwa<b class="code_status red">Off</b></div> <div class="code_button code_bh1">Błogo 250% tren<b class="code_status red">Off</b></div> <div class="code_button code_bh2">Błogo 5% kod<b class="code_status red">Off</b></div> <label class='select_input'><select id='bot_what_to_train'><option value='1'>Siła</option><option value='2'>Szybkość</option><option value='3'>Wytrzymałość</option><option value='4'>Siła Woli</option><option value='5'>Energia Ki</option><option value='6'>Wtajemniczenie</option></select></label> <label class='select_input'><select id='bot_what_to_traintime'><option value='1'>1 godz.</option><option value='2'>2 godz.</option><option value='3'>3 godz.</option><option value='4'>4 godz.</option><option value='5'>5 godz.</option><option value='6'>6 godz.</option><option value='7'>7 godz.</option><option value='8'>8 godz.</option><option value='9'>9 godz.</option><option value='10'>10 godz.</option><option value='11'>11 godz.</option><option value='12'>12 godz.</option></label> </div> `;
                const RES_panel = ` <div id="res_Panel"> <div class="sekcja res_dragg">SUROWCE</div> <div class="res_button res_res">ZBIERAJ<b class="res_status red">Off</b></div> <div class="bt_cool" style="text-align:center; color:white;"></div> <ul></ul> </div> `;
                const LPVM_panel = ` <div id="lpvm_Panel"> <div class="sekcja lpvm_dragg">LISTY GOŃCZE</div> <div class='pvm_killed'>Wykonane listy: <b>0</b></div> <div class="lpvm_button lpvm_lpvm">START<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_g">G-Born<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_u">U-Born<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_s">S-Born<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_h">H-Born<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_limit">Limit<b class="lpvm_status red">Off</b></div> <div class='gamee_input'><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="Enter text" name='lpvm_capt' value='60' /></div> </div> `;
                const INNE_Panel = `<div id="inne_Panel"> <div class="sekcja inne_dragg">Inne</div> <div class="inne_button inne_wymiana">Wymiana<strong class="inne_status red">Off</strong></div>
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
                // $("body").append(`<style>${csslpvm}</style>${LPVM_panel}`);
                $("#pvp_Panel").hide();
                $("#resp_Panel").hide();
                $("#code_Panel").hide();
                $("#res_Panel").hide();
                $("#lpvm_Panel").hide();
                $("#inne_Panel").hide();
                $("#main_Panel").draggable({
                    handle: ".panel_dragg"
                });
                $("#pvp_Panel").draggable({
                    handle: ".pvp_dragg"
                });
                $("#resp_Panel").draggable({
                    handle: ".resp_dragg"
                });
                $("#res_Panel").draggable({
                    handle: ".res_dragg"
                });
                $("#inne_Panel").draggable({
                    handle: ".inne_dragg"
                });
                $("#code_Panel").draggable({
                    handle: ".code_dragg"
                });
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
                // $('#main_Panel .gh_inne').click(() => {
                //     if ($(".gh_lpvm .gh_status").hasClass("red")) {
                //         $(".gh_lpvm .gh_status").removeClass("red").addClass("green").html("On");
                //         $("#inne_Panel").show();
                //     } else {
                //         $(".gh_lpvm .gh_status").removeClass("green").addClass("red").html("Off");
                //         $("#inne_Panel").hide();
                //         LPVM.Stop = true;
                //         $(".inne_wymiana .lpvm_status").removeClass("green").addClass("red").html("Off");
                //     }
                // });
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
                        // stop = false
                    } else {
                        $(".resp_resp1 .resp_status").removeClass("green").addClass("red").html("Off");
                        // $("#resp_Panel").hide();
                        // stop = true;
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
                $('#resp_Panel .resp_red').click(() => {
                    if (RESP.CONF_SENZU == false) {
                        $(".resp_red .resp_status").removeClass("red").addClass("green").html("On");
                        RESP.CONF_SENZU = RESP.SENZU_RED;
                        $('#resp_Panel .resp_blue').hide();
                        $('#resp_Panel .resp_green').hide();
                        $('#resp_Panel .resp_purple').hide();
                        $('#resp_Panel .resp_yellow').hide();
                        $('#resp_Panel .resp_magic').hide();
                    } else {
                        $(".resp_red .resp_status").removeClass("green").addClass("red").html("Off");
                        RESP.CONF_SENZU = false;
                        $('#resp_Panel .resp_blue').show();
                        $('#resp_Panel .resp_green').show();
                        $('#resp_Panel .resp_purple').show();
                        $('#resp_Panel .resp_yellow').show();
                        $('#resp_Panel .resp_magic').show();
                    }
                });
                $('#resp_Panel .resp_blue').click(() => {
                    if (RESP.CONF_SENZU == false) {
                        $(".resp_blue .resp_status").removeClass("red").addClass("green").html("On");
                        RESP.CONF_SENZU = RESP.SENZU_BLUE;
                        $('#resp_Panel .resp_red').hide();
                        $('#resp_Panel .resp_green').hide();
                        $('#resp_Panel .resp_purple').hide();
                        $('#resp_Panel .resp_yellow').hide();
                        $('#resp_Panel .resp_magic').hide();
                    } else {
                        $(".resp_blue .resp_status").removeClass("green").addClass("red").html("Off");
                        RESP.CONF_SENZU = false;
                        $('#resp_Panel .resp_red').show();
                        $('#resp_Panel .resp_green').show();
                        $('#resp_Panel .resp_purple').show();
                        $('#resp_Panel .resp_yellow').show();
                        $('#resp_Panel .resp_magic').show();
                    }
                });
                $('#resp_Panel .resp_green').click(() => {
                    if (RESP.CONF_SENZU == false) {
                        $(".resp_green .resp_status").removeClass("red").addClass("green").html("On");
                        RESP.CONF_SENZU = RESP.SENZU_GREEN;
                        $('#resp_Panel .resp_red').hide();
                        $('#resp_Panel .resp_blue').hide();
                        $('#resp_Panel .resp_purple').hide();
                        $('#resp_Panel .resp_yellow').hide();
                        $('#resp_Panel .resp_magic').hide();
                    } else {
                        $(".resp_green .resp_status").removeClass("green").addClass("red").html("Off");
                        RESP.CONF_SENZU = false;
                        $('#resp_Panel .resp_red').show();
                        $('#resp_Panel .resp_blue').show();
                        $('#resp_Panel .resp_purple').show();
                        $('#resp_Panel .resp_yellow').show();
                        $('#resp_Panel .resp_magic').show();
                    }
                });
                $('#resp_Panel .resp_purple').click(() => {
                    if (RESP.CONF_SENZU == false) {
                        $(".resp_purple .resp_status").removeClass("red").addClass("green").html("On");
                        RESP.CONF_SENZU = RESP.SENZU_PURPLE;
                        $('#resp_Panel .resp_red').hide();
                        $('#resp_Panel .resp_blue').hide();
                        $('#resp_Panel .resp_green').hide();
                        $('#resp_Panel .resp_yellow').hide();
                        $('#resp_Panel .resp_magic').hide();
                    } else {
                        $(".resp_purple .resp_status").removeClass("green").addClass("red").html("Off");
                        RESP.CONF_SENZU = false;
                        $('#resp_Panel .resp_red').show();
                        $('#resp_Panel .resp_blue').show();
                        $('#resp_Panel .resp_green').show();
                        $('#resp_Panel .resp_yellow').show();
                        $('#resp_Panel .resp_magic').show();
                    }
                });
                $('#resp_Panel .resp_yellow').click(() => {
                    if (RESP.CONF_SENZU == false) {
                        $(".resp_yellow .resp_status").removeClass("red").addClass("green").html("On");
                        RESP.CONF_SENZU = RESP.SENZU_YELLOW;
                        $('#resp_Panel .resp_red').hide();
                        $('#resp_Panel .resp_blue').hide();
                        $('#resp_Panel .resp_green').hide();
                        $('#resp_Panel .resp_purple').hide();
                        $('#resp_Panel .resp_magic').hide();
                    } else {
                        $(".resp_yellow .resp_status").removeClass("green").addClass("red").html("Off");
                        RESP.CONF_SENZU = false;
                        $('#resp_Panel .resp_red').show();
                        $('#resp_Panel .resp_blue').show();
                        $('#resp_Panel .resp_green').show();
                        $('#resp_Panel .resp_purple').show();
                        $('#resp_Panel .resp_magic').show();
                    }
                });
                $('#resp_Panel .resp_magic').click(() => {
                    if (RESP.CONF_SENZU == false) {
                        $(".resp_magic .resp_status").removeClass("red").addClass("green").html("On");
                        RESP.CONF_SENZU = RESP.SENZU_MAGIC;
                        $('#resp_Panel .resp_red').hide();
                        $('#resp_Panel .resp_blue').hide();
                        $('#resp_Panel .resp_green').hide();
                        $('#resp_Panel .resp_purple').hide();
                        $('#resp_Panel .resp_yellow').hide();
                    } else {
                        $(".resp_magic .resp_status").removeClass("green").addClass("red").html("Off");
                        RESP.CONF_SENZU = false;
                        $('#resp_Panel .resp_red').show();
                        $('#resp_Panel .resp_blue').show();
                        $('#resp_Panel .resp_green').show();
                        $('#resp_Panel .resp_purple').show();
                        $('#resp_Panel .resp_yellow').show();
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
            }(function() {
                let a;

                // function f() {
                //     if (!a) a = Object.keys(GAME).find(z => GAME[z] && GAME[z]['1_1']);
                //     return a;
                // }
                // Object.defineProperty(GAME, 'mapcell', {
                //     get: function() {
                //         return GAME[f()];
                //     }
                // });
            })();
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
                } else {}
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

            var PVP = {
                stop: true,
                wi: false,
                org: false,
                war_list: 0,
                war_cnt: 0,
                org_cnt: 0,
                emp : 0,
                wk: false,
                caseNumber: 0,
                wait_pvp: 10,
                wait_pvp2: 80,
                czekajpvp: 160,
                WSP: 50,
                licznik: 0,
                dogory: false,
                loc: 0,
                adimp: false,
                g: 1,
                tele: false,
                tabb: [],
                x: 1,
                y: 1,
                war: false,
                buff_imp: false,
                buff_clan: false,
                chars:[],
                start_char:0,
                pvp_timeout:0,
            };
            PVP.checkkkk = () => {
                let imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
                
                let buff = $(".emp_buff .pull-right").find("button").attr("data-option") == "activate_emp_buff";
                let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
                let who_win = $("#gne_satus").text().includes("ZŁO");
                let abut = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`);
                let isDisabled = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`).parents("tr").hasClass("disabled");
                PVP.emp = GAME.char_data.village_id;

                if (GAME.quick_opts.ssj && $("#ssj_bar").css("display") === "none" && PVP.code) {
                    setTimeout(() => {
                        GAME.socket.emit('ga', {
                            a: 18,
                            type: 5,
                            tech_id: GAME.quick_opts.ssj[0]
                        });
                    }, 1500);
                    return true;
                } else if ($('#ssj_status').text() == "--:--:--" && PVP.code && GAME.quick_opts.ssj) {
                    setTimeout(() => {
                        GAME.socket.emit('ga', {
                            a: 18,
                            type: 6
                        });
                    }, 1500);
                    return true;
                } else if ($('#ssj_status').text() <= '00:00:05' && PVP.code && GAME.quick_opts.ssj) {
                    return true;
                } else if ($("#train_uptime").find('.timer').length == 0 && !GAME.is_training && PVP.code) {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 2,
                        stat: 1,
                        duration: 1
                    });
                    setTimeout(() => {
                        GAME.socket.emit('ga', {
                            a: 8,
                            type: 5,
                            apud: 'vzaaa'
                        });
                    }, 1600);
                    return true;
                } else if (GAME.is_training && $("#train_uptime").find('.timer').length == 1 && PVP.code) {
                    setTimeout(() => {
                        GAME.socket.emit('ga', {
                            a: 8,
                            type: 3
                        });
                    }, 1600);
                    return true;
                } else if (GAME.is_training && PVP.code) {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 3
                    });
                    return true;
                } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 4) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 6,
                        buff: buff_id
                    });
                    return true;
                } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 7 && ((emp == 1 || emp == 3) && who_win)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 6,
                        buff: buff_id
                    });
                    return true;
                } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 7 && ((emp == 2 || emp == 4) && !who_win)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 6,
                        buff: buff_id
                    });
                    return true;
                } else if ((PVP.buff_clan || PVP.buff_imp) && $("#server_time").text() > '00:05:00' && $("#server_time").text() < '01:00:00' && typeof this.loaded == 'undefined') {
                    this.loaded = true;
                    setTimeout(() => {
                        GAME.socket.emit('ga', {
                            a: 50,
                            type: 0,
                            empire: GAME.char_data.empire
                        });
                    }, 300);
                    setTimeout(() => {
                        GAME.emitOrder({
                            a: 39,
                            type: 0
                        });
                    }, 600);
                    setTimeout(() => {
                        GAME.emitOrder({
                            a: 39,
                            type: 23
                        });
                    }, 900);
                    return true;
                } else if (PVP.buff_clan && GAME.klan_data != undefined && abut.length && !isDisabled) {
                    $(" .newBtn.activate_all_clan_buffs").click();
                    return true;
                }
                return false;
            };
            PVP.start = () => {
                if (!PVP.stop && !GAME.is_loading) {
                    if ($("#player_list_con").find("[data-option=load_more_players]").length != 0) {
                        $("#player_list_con").find("[data-option=load_more_players]").click();
                    }
                    PVP.action();
                } else if (GAME.is_loading) {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                } else {}
            };
            PVP.action = () => {
                console.log("pvp action", PVP.caseNumber)
                switch (PVP.caseNumber) {
                    case 0:
                        PVP.caseNumber++;
                        PVP.check_position_x();
                        break;
                    case 1:
                        PVP.caseNumber++;
                        PVP.check_position_y();
                        break;
                    case 2:
                        PVP.caseNumber++;
                        PVP.check();
                        break;
                    case 3:
                        PVP.caseNumber++;
                        PVP.check_players();
                        break;
                    case 4:
                        PVP.caseNumber++;
                        PVP.kill_players();
                        break;
                    case 5:
                        PVP.caseNumber++;
                        PVP.check_players2();
                        break;
                    case 6:
                        PVP.caseNumber++;
                        PVP.wojny1();
                        break;
                    case 7:
                        PVP.caseNumber++;
                        PVP.check_location();
                        break;
                    case 8:
                        PVP.caseNumber++;
                        PVP.check2();
                        break;
                    case 9:
                        PVP.caseNumber++;
                        PVP.check_players2();
                        break;
                    case 10:
                        PVP.caseNumber++;
                        PVP.dec_wars();
                        break;
                    case 11:
                        PVP.caseNumber++;
                        PVP.orgi();
                        break;
                    case 12: 
                        PVP.caseNumber++;
                        PVP.checkTimeout();
                        break;
                    case 13:
                        PVP.caseNumber = 0;
                        PVP.zmien_postc();
                    default:
                }
            };
            PVP.check_position_x = () => {
                PVP.x = GAME.char_data.x;
                window.setTimeout(PVP.start, 5);
            };
            PVP.check_position_y = () => {
                PVP.y = GAME.char_data.y;
                window.setTimeout(PVP.start, 5);
            };
            PVP.check_players = () => {
                if ($("#player_list_con").find("[data-option=load_more_players]").length != 0) {
                    $("#player_list_con").find("[data-option=load_more_players]").click();
                }
                if (0 < $("#player_list_con .player").length) {
                    PVP.y = GAME.char_data.y;
                    if (document.getElementById("player_list_con").children[0].children[1].childElementCount == 3) {
                        PVP.tabb = $("#player_list_con .player").eq(0).find(".timer").text();
                        if (PVP.tabb <= '00:01:30' && PVP.y == 2 && PVP.tabb != '' || PVP.tabb <= '00:00:25' && PVP.tabb != '') {
                            window.setTimeout(PVP.check_players, PVP.czekajpvp / PVP.WSPP() * 4);
                        } else {
                            window.setTimeout(PVP.start, PVP.czekajpvp / PVP.WSPP() / 2);
                        }
                    } else {
                        window.setTimeout(PVP.start, PVP.czekajpvp / PVP.WSPP() / 2);
                    }
                } else {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP() * 2);
                }
                PVP.licznik = 1;
            };
            PVP.check_players2 = () => {
                var enemy = $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)");
                PVP.kill_players1();
                window.setTimeout(PVP.start, PVP.czekajpvp / PVP.WSPP() * (enemy.length) * 2);
                PVP.licznik = 1;
            };
            PVP.kill_players = () => {
                var enemy = $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)");
                if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
                    $("#player_list_con").find("[data-option=load_more_players]").click();
                    window.setTimeout(PVP.kill_players, PVP.czekajpvp / PVP.WSPP());
                } else if (enemy.length == 0) {
                    PVP.kill_players1();
                    window.setTimeout(PVP.start, PVP.czekajpvp / PVP.WSPP() * (enemy.length) * 2);
                } else if (PVP.licznik < $("#player_list_con .player").length) {
                    if ($("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-option").includes("gxxx")) {
                        GAME.socket.emit('ga', {
                            a: 24,
                            type: 1,
                            char_id: $("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-char_id"),
                            quick: 1
                        });
                        console.log("kill ", $("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-char_id"));
                        PVP.licznik++;
                        window.setTimeout(PVP.kill_players, PVP.czekajpvp / PVP.WSPP());
                    } else {
                        GAME.socket.emit('ga', {
                            a: 24,
                            char_id: $("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-char_id"),
                            quick: 1
                        });
                        console.log("kill ", $("#player_list_con .player").eq(PVP.licznik).find("[data-quick=1]").attr("data-char_id"));
                        PVP.licznik++;
                        window.setTimeout(PVP.kill_players, PVP.czekajpvp / PVP.WSPP());
                    }
                } else {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                    PVP.licznik = 0;
                    kom_clear();
                } 
            };
            PVP.checkTimeout = () => {

                if (PVP.start_char !=0 || PVP.start_char-1 !=0) {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                    return;
                }
        
                    var enemy = $("#player_list_con").find(".player button" + "[data-quick=1]" + ".initial_hide_forced");
                    if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
                        $("#player_list_con").find("[data-option=load_more_players]").click();
                        console.log("1");
                        window.setTimeout(PVP.checkTimeout, PVP.czekajpvp / PVP.WSPP());
                    }else if (enemy.length == 0) {
                        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP())
                        console.log('2');
                    }else if (PVP.licznik < $("#player_list_con .player").length) {
                        if (PVP.pvp_timeout < parseInt($("#player_list_con .player").eq(PVP.licznik).find(".timer").attr("data-end")))
                            PVP.pvp_timeout = parseInt($("#player_list_con .player").eq(PVP.licznik).find(".timer").attr("data-end"));
                        PVP.licznik++;
                        console.log("3 ", PVP.licznik, PVP.pvp_timeout);
                        window.setTimeout(PVP.checkTimeout, PVP.wait_pvp / PVP.WSPP())
                    } else {
                        window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                        PVP.licznik = 0;
                        kom_clear();
                    }
                
            }
            PVP.kill_players1 = () => {
                if (!JQS.chm.is(":focus")) {
                    var enemy = $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)");
                    var bbb = $("#player_list_con").find(".player button" + "[data-option=gpvp_attack]" + "[data-quick=1]" + ":not(.initial_hide_forced)");
                    var bbbb = parseInt(bbb.attr("data-char_id"));
                    if ($("#player_list_con").find("[data-option=load_more_players]").length == 1) {
                        $("#player_list_con").find("[data-option=load_more_players]").click();
                        window.setTimeout(PVP.kill_players1, 50);
                    } else if (bbb.length > 0) {
                        GAME.socket.emit('ga', {
                            a: 24,
                            type: 1,
                            char_id: bbbb,
                            quick: 1
                        });
                        window.setTimeout(PVP.kill_players1, 110);
                    } else if (enemy.length > 0) {
                        enemy.eq(0).click();
                        window.setTimeout(PVP.kill_players1, 110);
                        console.log("zabijanie ", enemy.length);
                    } else {
                        console.log("koniec wroguw", enemy.length);
                        kom_clear();
                    }
                }
            };
            PVP.check_imp = () => {
                var tab = [];
                for (var i = 0; i < 3; i++) {
                    tab[i] = parseInt($("#empire_heroes .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
                }
                return tab;
            };
            PVP.check_imp2 = () => {
                var tab = [];
                for (var i = 0; i < 3; i++) {
                    tab[i] = parseInt($("#empire_efrags .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
                }
                return tab;
            };
            PVP.wojny1 = () => {
                // if (PVP.wi) {
                //     var aimp = $("#e_admiral_player").find("[data-option=show_player]").attr("data-char_id");
                //     var imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
                //     if (!PVP.adimp) {
                //         // GAME.socket.emit('ga', {
                //         //     a: 50,
                //         //     type: 0,
                //         //     empire: GAME.char_data.empire
                //         // });
                //         PVP.adimp = true;
                //         window.setTimeout(PVP.wojny1, 500);
                //     } else if (!GAME.emp_enemies.includes(1) && ![GAME.char_data.empire].includes(1) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                //         // GAME.socket.emit('ga', {
                //         //     a: 50,
                //         //     type: 7,
                //         //     target: 1
                //         // });
                //         window.setTimeout(PVP.wojny1, 500);
                //     } else if (!GAME.emp_enemies.includes(2) && ![GAME.char_data.empire].includes(2) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                //         // GAME.socket.emit('ga', {
                //         //     a: 50,
                //         //     type: 7,
                //         //     target: 2
                //         // });
                //         window.setTimeout(PVP.wojny1, 500);
                //     } else if (!GAME.emp_enemies.includes(3) && ![GAME.char_data.empire].includes(3) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                //         // GAME.socket.emit('ga', {
                //         //     a: 50,
                //         //     type: 7,
                //         //     target: 3
                //         // });
                //         window.setTimeout(PVP.wojny1, 500);
                //     } else if (!GAME.emp_enemies.includes(4) && ![GAME.char_data.empire].includes(4) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                //         // GAME.socket.emit('ga', {
                //         //     a: 50,
                //         //     type: 7,
                //         //     target: 4
                //         // });
                //         window.setTimeout(PVP.wojny1, 500);
                //     } else {
                //         window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                //     }
                // } else {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                // }
            };
            PVP.zejdz = () => {
                GAME.socket.emit('ga', {
                    a: 16
                });
                window.setTimeout(PVP.teleport, 2000);
            };
            PVP.zmien_postc = () => {
                if (!PVP.zmieniaj) {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                    return;
                }
                console.log("PVP ", PVP.start_char, PVP.chars.length)
                if (PVP.start_char == PVP.chars.length) {
                    
                    console.log("PVP ", PVP.start_char, ((PVP.pvp_timeout-GAME.getTime()) * 1000))
                    var charId = parseInt(PVP.chars[0]);
                    GAME.emitOrder({ a: 2, char_id: charId });
                    if (PVP.pvp_timeout > GAME.getTime()) {
                        window.setTimeout(PVP.start, 1000);
                        return;
                    }
                    PVP.start_char = 0;
                }
                var charId = parseInt(PVP.chars[PVP.start_char++]);
                GAME.emitOrder({ a: 2, char_id: charId });

                window.setTimeout(PVP.start, 2000);
            }
            PVP.go = () => {
                var x = GAME.char_data.x;
                var y = GAME.char_data.y;
                if (x == 14 && y == 14 && PVP.loc === 1) {
                    PVP.zejdz();
                    PVP.g = 2;
                    PVP.tele = true;
                } else if (x == 14 && y == 14 && PVP.loc === 2) {
                    PVP.zejdz();
                    PVP.g = 3;
                    PVP.tele = true;
                } else if (x == 14 && y == 14 && PVP.loc === 3) {
                    PVP.zejdz();
                    PVP.g = 4;
                    PVP.tele = true;
                } else if (x == 14 && y == 14 && PVP.loc === 4) {
                    PVP.zejdz();
                    PVP.g = 1;
                    PVP.tele = true;
                } else if (PVP.loc === 7) {
                    PVP.zejdz();
                    PVP.tele = true;
                } else if (x == 8 && y == 4 && PVP.loc == 4 || x == 8 && y == 6 && PVP.loc == 4 || x == 12 && y == 7 && PVP.loc == 1 || x == 12 && y == 9 && PVP.loc == 1 || x == 4 && y == 8 && PVP.loc == 1 || x == 4 && y == 10 && PVP.loc == 1 || x == 7 && y == 13 && PVP.loc == 3 || x == 8 && y == 5 && PVP.loc == 2 || x == 8 && y == 7 && PVP.loc == 2 || x == 3 && y == 9 && PVP.loc == 5) {
                    PVP.go_down();
                } else if (x == 8 && y == 5 && PVP.loc == 4 || x == 8 && y == 7 && PVP.loc == 4) {
                    PVP.go_left();
                } else if (x == 5 && y == 11 && PVP.loc == 1 || x == 5 && y == 10 && PVP.loc == 1 || x == 5 && y == 9 && PVP.loc == 1 || x == 5 && y == 8 && PVP.loc == 1) {
                    PVP.go_up();
                } else if (x == 8 && y == 6 && PVP.loc == 2 || x == 8 && y == 8 && PVP.loc == 2) {
                    PVP.go_right();
                } else if (x == 2 && y == 11 && PVP.loc == 3) {
                    PVP.cofanie();
                } else if (x == 7 && y == 7 && PVP.loc == 6 && PVP.dogory || x == 9 && y == 7 && PVP.loc == 6 && PVP.dogory) {
                    PVP.prawodol();
                } else if (x == 8 && y == 8 && PVP.loc == 6 && PVP.dogory || x == 10 && y == 8 && PVP.loc == 6 && PVP.dogory) {
                    PVP.prawogora();
                } else if (x < 14 && y % 2 == 0 && PVP.loc < 5 || x < 15 && y % 2 !== 0 && PVP.loc == 6 || x < 11 && y % 2 == 0 && PVP.loc == 5) {
                    PVP.go_right();
                } else if (y % 2 !== 0 && x > 2 && PVP.loc < 6 || x > 1 && y % 2 == 0 && PVP.loc == 6 || x == 2 && PVP.loc == 6) {
                    PVP.go_left();
                } else if (x == 14 || x == 2 && PVP.loc < 5 || x == 15 && PVP.loc == 6 || x == 1 || x == 11 && PVP.loc == 5 || x == 2 && PVP.loc == 5) {
                    PVP.go_down();
                } else {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                }
            };
            PVP.teleport = () => {
                if (PVP.tele) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 5,
                        e: PVP.g
                    });
                    window.setTimeout(PVP.start, 2000);
                    PVP.tele = false;
                } else {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                }
            };
            PVP.check_location = () => {
                if (GAME.char_data.loc == 351) {
                    PVP.loc = 4;
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                } else if (GAME.char_data.loc == 350) {
                    PVP.loc = 3;
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                } else if (GAME.char_data.loc == 349) {
                    PVP.loc = 2;
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                } else if (GAME.char_data.loc == 348) {
                    PVP.loc = 1;
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                } else {
                    PVP.loc = 7;
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                }
            };
            PVP.cofanie = () => {
                PVP.x = GAME.char_data.x;
                if (PVP.x >= 7) {
                    PVP.go_down();
                } else {
                    GAME.emitOrder({
                        a: 4,
                        dir: 7,
                        vo: GAME.map_options.vo
                    });
                    window.setTimeout(PVP.cofanie, 150);
                }
            };
            PVP.prawodol = () => {
                GAME.emitOrder({
                    a: 4,
                    dir: 3,
                    vo: GAME.map_options.vo
                });
                window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
            };
            PVP.prawogora = () => {
                GAME.emitOrder({
                    a: 4,
                    dir: 5,
                    vo: GAME.map_options.vo
                });
                window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
            };
            PVP.go_up = () => {
                GAME.emitOrder({
                    a: 4,
                    dir: 2,
                    vo: GAME.map_options.vo
                });
                window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
            };
            PVP.go_down = () => {
                GAME.emitOrder({
                    a: 4,
                    dir: 1,
                    vo: GAME.map_options.vo
                });
                window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
            };
            PVP.go_left = () => {
                GAME.emitOrder({
                    a: 4,
                    dir: 8,
                    vo: GAME.map_options.vo
                });
                window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
            };
            PVP.go_right = () => {
                GAME.emitOrder({
                    a: 4,
                    dir: 7,
                    vo: GAME.map_options.vo
                });
                window.setTimeout(PVP.start, PVP.wait_pvp2 / PVP.WSPP());
            };
            PVP.check = () => {
                if ($("#war_list .timer").length === 0 && PVP.wk) {
                    GAME.emitOrder({a:39,type:24,shorts:'Yuki'});
                    GAME.loadMapJson(function() {
                        GAME.socket.emit('ga', {
                            a: 3,
                            vo: GAME.map_options.vo
                        }, 1);
                    });
                }
                window.setTimeout(PVP.start, 180);
            };
            PVP.check2 = () => {
                if (PVP.checkkkk()) {
                    console.log("pvp check 1");
                    window.setTimeout(PVP.check2, 1800);
                } else {
                    console.log("pvp check 2");
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                }
            };
            PVP.clan_list = () => {
                var list = localStorage.getItem('clan_list');
                if (list === undefined) {
                    list = "";
                }
                return list;
            };
            PVP.save_clan_list = () => {
                localStorage.setItem('clan_list', PVP.war);
            };
            PVP.orgi = () => {
                console.log("org ", $("#pvp_Panel input[name=org_id]").val());
                if (!PVP.org) {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                    return;
                }

                var org_id = 18;
                if ($("#pvp_Panel input[name=org_id]").val() != '')
                    org_id = $("#pvp_Panel input[name=org_id]").val();
                setTimeout(() => {
                    window.warx = document.getElementsByClassName("war_win")[PVP.org_cnt].getElementsByTagName("button")[0].getAttribute("data-war");
                    GAME.emitOrder({a:50,type:13,war:warx,org:org_id});
                    PVP.org_cnt +=1;
                }, 100);
                if (PVP.org_cnt > 8)
                    PVP.org_cnt = 0;
                window.setTimeout(PVP.start, 300);
            }
            PVP.dec_wars = () => {
                console.log("dec wars");
                if (!PVP.wi) {
                    window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
                    return;
                }
                console.log("dec wars ", PVP.war_cnt, PVP.org_cnt);
                if (PVP.war_cnt > 10)
                    PVP.war_cnt = 0;

                if (PVP.war_cnt == PVP.emp)
                    PVP.war_cnt++;

                PVP.wi = false;

                setTimeout(() => {
                    console.log("emit order war");
                    GAME.emitOrder({a:50,type:7,target:PVP.war_cnt});
                    PVP.war_cnt +=1;
                    PVP.wi = true;
                },602);

                if (PVP.war_list > $("#ewar_list .timer").length || PVP.war_list < $("#ewar_list .timer").length) {
                    PVP.war_list = $("#ewar_list .timer").length;
                    GAME.loadMapJson(function() {
                        GAME.socket.emit('ga', {
                        a: 3,
                        vo: GAME.map_options.vo
                        }, 1);
                    });
                }
                window.setTimeout(PVP.start, PVP.wait_pvp / PVP.WSPP());
            };
            PVP.speed = () => {
                var list = localStorage.getItem('pvp_speed');
                PVP.WSP = parseInt(list);
                if (list === undefined) {
                    list = "";
                }
                return list;
            };
            PVP.save_speed = () => {
                localStorage.setItem('pvp_speed', PVP.WSP);
            };
            PVP.WSPP = () => {
                var speed = PVP.WSP;
                if (speed < 10) speed = 2;
                if (speed > 100) speed = 100;
                if ($("#pvp_Panel input[name=speed_capt]").val() == '') speed = 50;
                return speed;
            };
            GAME.parseListPlayer = function (entry, pvp_master) {
                var res = '';
                if (entry.data) {
                    var pd = entry.data;
                    if (PVP.higherRebornAvoid && pd.reborn > GAME.char_data.reborn && pd.reborn > 3){return res;}
                    var qb = '';
                    var klan = '', erank = '';
                    if (pd.klan_id) {
                        var cls = '';
                        if (this.clan_enemies.indexOf(pd.klan_id) != -1) cls = 'enemy';
                        klan = '<b class="poption player_clan ' + cls + '" data-option="show_clan" data-klan_id="' + pd.klan_id + '">' + pd.klan_short + ' <img src="' + pd.emblem + '" /></b>';
                    }
                    var cls = '';
                    if (entry.cd) {
                        qb += this.showTimer(entry.cd - this.getTime(), 'data-special="10" data-pd="' + pd.id + '"', ' playercd' + pd.id + '');
                        cls = 'initial_hide_forced playericons' + pd.id;
                    }
                    if (pd.empire) {
                        var cls2 = '';
                        if (this.emp_enemies.indexOf(pd.empire) != -1) {
                            if (this.emp_enemies_t[pd.empire] == 1) cls2 = 'war';
                            else if (this.empire_locations.indexOf(this.char_data.loc) != -1) cls2 = 'war';
                        }
                        if (!pd.glory_rank) pd.glory_rank = 1;
                        erank = '<img src="/gfx/empire/ranks/' + pd.empire + '/' + pd.glory_rank + '.png" class="glory_rank ' + cls2 + '" />';
                    }
                    qb += '<button class="poption map_bicon ' + cls + '" data-option="pvp_attack" data-char_id="' + pd.id + '"><i class="ca"></i></button>';
                    if (pvp_master) qb += '<button class="poption map_bicon ' + cls + '" data-option="pvp_attack" data-char_id="' + pd.id + '" data-quick="1"><i class="qa"></i></button>';
                    res += '<div class="player"><div class="belka">' + erank + '<strong class="player_rank' + pd.ranga + ' poption" data-option="show_player" data-char_id="' + pd.id + '">' + pd.name + '</strong> <span>' + this.rebPref(pd.reborn) + pd.level + '</span> ' + klan + '</div><div id="pvp_opts_' + pd.id + '" class="right_btns">' + qb + '</div></div>';
                }
                else if (entry.more) {
                    res += '<div class="more_players"><button class="poption" data-option="load_more_players" data-start_from="' + entry.next_from + '">+' + entry.more + '</button></div>';
                }
                return res;
            };
            GAME.parsePlayerShadow = function (data, pvp_master) {
                var entry = data.data;
                var res = '';
                if (entry.data) {
                    var pd = entry.data;
                    if ( PVP.higherRebornAvoid && pd.reborn > GAME.char_data.reborn && pd.reborn > 3){return res;}
                    pd.empire = entry.empire;
                    var qb = '';
                    var erank = '';
                    var cls = '';
                    if (data.cd) {
                        qb += this.showTimer(data.cd - this.getTime(), 'data-special="10" data-pd="' + pd.id + '"', ' playercd' + pd.id + '');
                        cls = 'initial_hide_forced playericons' + pd.id;
                    }
                    if (pd.empire) {
                        var cls2 = '';
                        if (this.emp_enemies.indexOf(pd.empire) != -1) {
                            if (this.emp_enemies_t[pd.empire] == 1) cls2 = 'war';
                            else if (this.empire_locations.indexOf(this.char_data.loc) != -1) cls2 = 'war';
                        }
                        if (!pd.glory_rank) pd.glory_rank = 1;
                        erank = '<img src="/gfx/empire/ranks/' + pd.empire + '/' + pd.glory_rank + '.png" class="glory_rank ' + cls2 + '" />';
                    }
                    qb += '<button class="poption map_bicon ' + cls + '" data-option="gpvp_attack" data-char_id="' + pd.id + '"><i class="ca"></i></button>';
                    if (pvp_master) qb += '<button class="poption map_bicon ' + cls + '" data-option="gpvp_attack" data-char_id="' + pd.id + '" data-quick="1"><i class="qa"></i></button>';
                    res += '<div class="player"><div class="belka">' + erank + '<strong class="player_rank' + pd.ranga + ' poption" data-option="show_player" data-char_id="' + pd.id + '">' + pd.name + ' - ' + LNG.lab348 + '</strong> <span>' + this.rebPref(pd.reborn) + pd.level + '</span> </div><div id="gpvp_opts_' + pd.id + '" class="right_btns">' + qb + '</div></div>';
                }
                else if (entry.more) {
                    res += '<div class="more_players"><button class="poption" data-option="load_more_players" data-start_from="' + entry.next_from + '">+' + entry.more + '</button></div>';
                }
                return res;
            };
            var RESP = {
                wait: 600,
                stop: true,
                checkOST: false,
                checkSSJ: false,
                jaka: 0,
                zmiana: false,
                multifight: false,
                reload: false,
                downb: false,
                SENZU_BLUE: 'SENZU_BLUE',
                SENZU_GREEN: 'SENZU_GREEN',
                SENZU_YELLOW: 'SENZU_YELLOW',
                SENZU_RED: 'SENZU_RED',
                SENZU_MAGIC: 'SENZU_MAGIC',
                SENZU_PURPLE: 'SENZU_PURPLE',
                CONF_BLUE_AMOUNT: () => {
                    return Math.floor(GAME.getCharMaxPr() / 100 * 0.9999)
                },
                CONF_BLUE_AMOUNT1: Math.floor(GAME.getCharMaxPr() / 100 * 0.9999),
                CONF_PURPLE_AMOUNT: 30,
                CONF_GREEN_AMOUNT: () => {
                    return Math.floor(GAME.getCharMaxPr() / 2000 * 0.9999)
                },
                CONF_GREEN_AMOUNT1: Math.floor(GAME.getCharMaxPr() / 2000 * 0.9999),
                CONF_YELLOW_AMOUNT: 6,
                CONF_SENZU: false,
                bless: false,
                checkOST_timer: 0,
                normal: false,
                rare: false,
                leg: false,
                b1: false,
                b2: false,
                b3: false,
                b4: false,
                b5: false,
                b6: false,
                b7: false,
                b8: false,
                b9: false,
                b10: false,
                b11: false,
                b12: false,
                b13: false,
                b14: false,
                b15: false,
                b16: false,
                b17: false,
                b18: false,
                buff_imp: false,
                buff_clan: false,
                loc: GAME.char_data.loc
            };
            RESP.check = () => {
                console.log('checking resp');
                let imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
                let emp = GAME.char_data.empire;
                let buff = $(".emp_buff .pull-right").find("button").attr("data-option") == "activate_emp_buff";
                let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
                let who_win = $("#gne_satus").text().includes("ZŁO");
                let abut = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`);
                let isDisabled = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`).parents("tr").hasClass("disabled");
                if (GAME.char_data.pr <= RESP.min_pa()) {
                    console.log("resp use sensu");
                    RESP.useSenzu();
                    return true;
                } else if (RESP.checkOST && $("#doubler_bar").css("display") === "none") {
                    GAME.socket.emit(`ga`, {
                        a: 12,
                        type: 14,
                        iid: GAME.quick_opts.sub[RESP.jaka].id,
                        page: GAME.ekw_page,
                        am: 1
                    });
                    return false;
                } else if (RESP.checkOST && $('#doubler_status').text() <= '00:00:03') {
                    return false;
                } else if ((!RESP.checkOST && RESP.checkOST_timer <= GAME.getTime()) || (RESP.jaka == 1 && RESP.checkOST_timer <= GAME.getTime())) {
                    RESP.checkOST_timer = GAME.getTime() + 60;
                    return false;
                } else if (RESP.normal) {
                    GAME.emitOrder({a:12,page:GAME.ekw_page});
                    let ekwUsedElement = document.getElementById('ekw_used');
                    let ekwUsedValue = ekwUsedElement.textContent;

                    // let ekwSpaceElement = document.getElementById('ekw_space');
                    // let ekwSpaceValue = ekwSpaceElement.textContent;
                    if ((($(".resp_rare .resp_status").hasClass("green")) && ekwUsedValue < 1000) ||
                    (($(".resp_resp1 .resp_status").hasClass("green")) && ekwUsedValue < 1000)) {
                    //     window.setTimeout(function() {
                    //         GAME.page_switch("game_ekw");
                    //     }, 225);
                    //     Response.normal = false;
                        return false;
                    }
                    const komElements = document.querySelectorAll('#kom_con .kom');
    
                    komElements.forEach(kom => {
                        const closeButton = kom.querySelector('.close_kom');
                        closeButton.click();
                    });
                    window.setTimeout(function() {
                        GAME.emitOrder({a:12,page:2});
                        GAME.ekw_page = 2;
                        
                        window.setTimeout(function() {
                            RESP.DestroyItemsAtPage();
                        }, 111);
                    }, 570);
                    window.setTimeout(function() {
                        GAME.emitOrder({a:12,page:3});
                        GAME.ekw_page = 3;
                        
                        window.setTimeout(function() {
                            RESP.DestroyItemsAtPage();
                        }, 111);
                    }, 915);
                    
                    window.setTimeout(function() {
                        GAME.emitOrder({a:12,page:4});
                        GAME.ekw_page = 4;
                        
                        window.setTimeout(function() {
                            RESP.DestroyItemsAtPage();
                        }, 111);
                    }, 1505);
                    
                    window.setTimeout(function() {
                        GAME.emitOrder({a:12,page:5});
                        GAME.ekw_page = 5;
                        
                        window.setTimeout(function() {
                            RESP.DestroyItemsAtPage();
                        }, 111);
                    }, 2005);


                }
                // item jakosc
                // const targetElement = document.querySelector('.player_ekw_item[data-item_id="'+ GAME.dragged_item.id+'"]');
                // const pattern = /<span id="quality">Jakość:/;
                // if (targetElement) {
                //   // Get the value of the data-slot attribute
                //   const dataSlotValue = targetElement.getAttribute('data-original-title');
                      
                //   const match = dataSlotValue.match(/\((\d+)%\)/);
              
                //   if (match) {
                //     // The value is in the first capturing group
                //     const value = match[1];
                //     console.log('Extracted value:', value); // Output: 31
                //   } else {
                //     console.log('Pattern not found.');
                //   }
                // } else {
                //   console.log('Quality span not found.');
                // }
                // wymiana ramenow insta ronina
                // GAME.emitOrder({
                //     a: 211,
                //     type: 2,
                //     exchange: 9,
                //     item: 91
                // });


                //  else if ($(".resp_normal .resp_status").hasClass("green")) {
                //     GAME.emitOrder({a:12,page:GAME.ekw_page});
                //     let ekwUsedElement = document.getElementById('ekw_used');
                //     let ekwUsedValue = ekwUsedElement.textContent;

                //     let ekwSpaceElement = document.getElementById('ekw_space');
                //     let ekwSpaceValue = ekwSpaceElement.textContent;
                //     if (ekwUsedValue > ekwSpaceElement * 0.7)
                //         RESP.normal = true;
                // }
                return false;
            };

            RESP.SetPageAsActive = (page, klasa) => {
                window.setTimeout(function() {
                    let activePageElement = document.querySelector('.ekw_pag.option.active');
                    let firstPageElement = document.querySelector('.ekw_pag.option[data-page="'+1+'"]');
                    activePageElement.classList.remove('active');
                    firstPageElement.classList.add('active');
                    console.log("active page:", parseInt(firstPageElement.getAttribute('data-page')));

                    window.setTimeout(function() {
                        var items=[];
                        $('#ekw_page_items .nonstackable[data-class="'+1+'"]').each(function( index ) {
                            items.push(parseInt($(this).data('item_id')));
                        });
                        if(items.length){
                            GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                            console.log("niszczenie itemow na stronie:", 1, 1);
                        }
                    }, 20);
                }, 20);
            }
            RESP.DestroyItemsAtPage = () => {
                var items=[];
                window.setTimeout(function() {
                $('#ekw_page_items .nonstackable[data-class="'+1+'"]').each(function( index ) {
                                    items.push(parseInt($(this).data('item_id')));
                                });
                                if(items.length){
                                    GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                                }
                }, 50);
                window.setTimeout(function() {
                $('#ekw_page_items .nonstackable[data-class="'+2+'"]').each(function( index ) {
                                    items.push(parseInt($(this).data('item_id')));
                                });
                                if(items.length){
                                    GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                                }
                }, 100);
                window.setTimeout(function() {
                $('#ekw_page_items .nonstackable[data-class="'+3+'"]').each(function( index ) {
                                    items.push(parseInt($(this).data('item_id')));
                                });
                                if(items.length){
                                    GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                                }
                }, 150);

                if (RESP.leg)  {
                    window.setTimeout(function() {
                        $('#ekw_page_items .nonstackable[data-class="'+4+'"]').each(function( index ) {
                            items.push(parseInt($(this).data('item_id')));
                                });
                                if(items.length){
                                     GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
                                }
                        }, 150);
                }
            };
            RESP.min_pa = () => {
                if (GAME.char_data.doubler_rate && GAME.char_data.doubler_rate > 19) {
                    // var spawner = GAME.spawner[0];
                    // var pa_mult = cal_sub * RESP.MF() + parseInt(spawner);
                    return 1000;
                } else {
                    // var spawner = GAME.spawner[0];
                    // var pa_mult = parseInt(spawner);
                    return 1000;
                }
            };
            RESP.action = () => {
                console.log('resp action');
                if (!RESP.stop) {
                    if (!RESP.check()) {
                        setTimeout(() => {
                            // RESP.fight();
                            RESP.go();
                        }, RESP.wait);
                    } else {
                        setTimeout(() => {
                            RESP.action();
                            kom_clear();
                        }, 1700);
                    }
                }
            };
            RESP.fight = () => {
                console.log('resp fight');
                // GAME.socket.emit(`ga`,{a:13,mob_num:0,fo:GAME.map_options.ma});
                if (RESP.reload) {
                    setTimeout(() => {
                        GAME.maploaded = false;
                        GAME.prepareMap();
                    }, 300);
                    RESP.reload = false;
                }
                if ((RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 0) && GAME.field_mobs[GAME.field_mob_id - 1].ranks[0] || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 1 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[1]) || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 2 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[2]) || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 3 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[3]) || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 4 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[4]) || (RESP.MF() > 0 && GAME.field_mf[GAME.field_mob_id - 1] < 5 && GAME.field_mobs[GAME.field_mob_id - 1].ranks[5]) || !RESP.multifight) {
                    GAME.socket.emit('ga', {
                        a: 7,
                        order: 2,
                        quick: 1,
                        fo: GAME.map_options.ma
                    });
                } else if (RESP.MF2() > 0) {
                    GAME.socket.emit('ga', {
                        a: 13,
                        mob_num: GAME.field_mob_id,
                        fo: GAME.map_options.ma
                    })
                } 
                RESP.action();
            };
            RESP.reload_map = () => {
                RESP.reload = true;
            };
            RESP.MF = () => {
                var r = 0;
                if (GAME.field_mobs) {
                    for (i = 0; i < GAME.map_options.ma.length; i++) {
                        if (GAME.map_options.ma[i] === 1) {
                            r += parseInt(GAME.field_mobs[0].ranks[i]);
                            if (GAME.field_mobs[1]) {
                                r += parseInt(GAME.field_mobs[1].ranks[i]);
                            }
                            if (GAME.field_mobs[2]) {
                                r += parseInt(GAME.field_mobs[2].ranks[i]);
                            }
                            if (GAME.field_mobs[3]) {
                                r += parseInt(GAME.field_mobs[3].ranks[i]);
                            }
                        }
                    }
                }
                console.log(r);
                return r;
            };
            RESP.MF2 = () => {
                var r = 0;
                for (i = 0; i < GAME.map_options.ma.length; i++) {
                    if (GAME.field_mob_id < GAME.field_mobs.length && "ranks" in GAME.field_mobs[GAME.field_mob_id] && GAME.map_options.ma[i] === 1) {
                        r += parseInt(GAME.field_mobs[GAME.field_mob_id].ranks[i]);
                    }
                }
                return r;
            };
            RESP.go = () => {
                // if (RESP.downb) {
                //     GAME.map_move(3);
                //     RESP.downb = false;
                // } else {
                //     GAME.map_move(6);
                //     RESP.downb = true;
                // }
                
                RESP.action();
            };

            RESP.getSenzu = (type) => {
                switch (type) {
                    case RESP.SENZU_BLUE:
                        return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 42); // ogromny ramen
                    case RESP.SENZU_PURPLE:
                        return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 41); // powiekszony ramen
                    case RESP.SENZU_MAGIC:
                        return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 30); // czerwona pigula
                    case RESP.SENZU_GREEN:
                        return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 1);  // zwykly ramion
                    case RESP.SENZU_YELLOW:
                        return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 29); // zolta pigula
                    case RESP.SENZU_RED:
                        return GAME.quick_opts.senzus.find(senzu => senzu.item_id === 28); // zielona pigula
                }
            };
            RESP.useSenzu = () => {
                console.log("use senzu", RESP.stop, RESP.CONF_SENZU);
                // if (RESP.stop) return;
                const blue = RESP.getSenzu(RESP.SENZU_BLUE);
                const purple = RESP.getSenzu(RESP.SENZU_PURPLE);
                const magic = RESP.getSenzu(RESP.SENZU_MAGIC);
                const green = RESP.getSenzu(RESP.SENZU_GREEN);
                const yellow = RESP.getSenzu(RESP.SENZU_YELLOW);
                const red = RESP.getSenzu(RESP.SENZU_RED);
                switch (RESP.CONF_SENZU) {
                    case RESP.SENZU_BLUE:
                        RESP.useBlue(1);
                        break;
                    case RESP.SENZU_PURPLE:
                        RESP.usePurple(1);
                        break;
                    case RESP.SENZU_MAGIC:
                        RESP.useMagic(1);
                        break;
                    case RESP.SENZU_GREEN:
                        RESP.useGreen(10);
                        break;
                    case RESP.SENZU_YELLOW:
                        RESP.useYellow(1);
                        break;
                    case RESP.SENZU_RED:
                        RESP.useRed(1);
                        break;
                    default:
                        break;
                }
            };
            RESP.useBlue = (amount = RESP.CONF_BLUE_AMOUNT()) => {
                const blue = RESP.getSenzu(RESP.SENZU_BLUE);
                if (!blue) {
                    return;
                }
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 8,
                    iid: blue.id,
                    page: GAME.ekw_page,
                    am: 2
                });
            };
            RESP.useGreen = (amount = RESP.CONF_GREEN_AMOUNT()) => {
                const green = RESP.getSenzu(RESP.SENZU_GREEN);
                console.log("use green", green);
                if (!green) {
                    return;
                }
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 8,
                    iid: green.id,
                    page: GAME.ekw_page,
                    am: 5
                });
            };
            RESP.usePurple = (amount = RESP.CONF_PURPLE_AMOUNT) => {
                const purple = RESP.getSenzu(RESP.SENZU_PURPLE);
                if (!purple) {
                    return;
                }
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 8,
                    iid: purple.id,
                    page: GAME.ekw_page,
                    am: 3
                });
            };
            RESP.useYellow = (amount = RESP.CONF_YELLOW_AMOUNT) => {
                const yellow = RESP.getSenzu(RESP.SENZU_YELLOW);
                if (!yellow) {
                    return;
                }
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 8,
                    iid: yellow.id,
                    page: GAME.ekw_page,
                    am: 1
                });
            };
            RESP.useRed = () => {
                const red = RESP.getSenzu(RESP.SENZU_RED);
                if (!red) {
                    return;
                }
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 8,
                    iid: red.id,
                    page: GAME.ekw_page,
                    am: 1
                });
            };
            RESP.useMagic = () => {
                const magic = RESP.getSenzu(RESP.SENZU_MAGIC);
                if (!magic) {
                    return;
                }
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 8,
                    iid: magic.id,
                    page: GAME.ekw_page,
                    am: 1
                });
            };
            
            var RES = {
                stop: true,
                last_loc: 0,
                mapcell: false,
                matrix: [],
                steps: [],
                steps_clone: [],
                path: [],
                processing: false,
                mines: [],
                last_mine: 0,
                speed: 100,
                mined_id: [],
                refresh_mines: true,
                first_mine: [],
                loc: GAME.char_data.loc
            };
            RES.emitOrder = function(data) {
                if (!this.processing) {
                    this.processing = true;
                    GAME.socket.emit('ga', data);
                }
            };
            RES.Start = function() {
                if (this.last_loc != GAME.char_data.loc) {
                    this.CreateMatrix();
                    this.last_loc = GAME.char_data.loc;
                }
                if (this.refresh_mines) {
                    this.getMinesPos();
                    this.refresh_mines = false;
                }
                this.steps_clone = this.steps.slice();
                if (this.steps_clone[0][0] == GAME.char_data.x && this.steps_clone[0][1] == GAME.char_data.y) {
                    this.steps_clone.shift();
                }
                this.finder.setGrid(this.matrix);
                setTimeout(function() {
                    RES.Action();
                }, 120);
            };
            RES.Action = function() {
                RES.stop = false;
                if (!this.processing) {
                    this.Go();
                } else {
                    setTimeout(function() {
                        RES.Action();
                    }, 1200);
                }
            };
            RES.GetCooldown = function() {
                if (Object.entries(GAME.map_mines.mine_data).length > 0 && GAME.map_mines.coords[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)][0][2] > 0) {
                    cd = GAME.map_mines.coords[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)][0][2] - GAME.getTime();
                    cd += 5;
                    r = cd * 1000;
                    $(".bt_cool").html(GAME.showTimer(r / 1000));
                } else {
                    r = 1000;
                }
                return r;
            };
            RES.getMinesPos = function() {
                coords = Object.entries(GAME.map_mines.coords);
                var mines = [];
                for (i = 0; i < coords.length; i++) {
                    if (this.mined_id.includes(coords[i][1][0][1])) {
                        mines.push(coords[i]);
                    }
                }
                this.prepareMines(mines);
            };
            RES.prepareMines = function(mines) {
                this.steps = [];
                for (i = 0; i < mines.length; i++) {
                    pos = mines[i][0].split("_");
                    if (i == 0) {
                        RES.first_mine = [parseInt(pos[0]), parseInt(pos[1])];
                    }
                    this.steps.push([parseInt(pos[0]), parseInt(pos[1])]);
                    this.mines[pos[0] + "_" + pos[1]] = mines[i][1][0][0];
                    if (i == 0) {
                        this.last_mine = pos[0] + "_" + pos[1];
                    }
                }
                this.steps.push(RES.first_mine);
            };
            RES.listMines = function() {
                html = "";
                mdt = Object.entries(GAME.map_mines.mine_data);
                for (i = 0; i < mdt.length; i++) {
                    if (i == 0) {
                        RES.mined_id.push(mdt[i][1].id);
                        html += "<div style='margin-bottom:5px; border-bottom:solid gray 1px; padding:3px;'><input class='select_mine' type='checkbox' checked='true' value='" + mdt[i][1].id + "' " + ((mdt.length == 1) ? "disabled" : '') + "> " + mdt[i][1].name + "</div>";
                    } else {
                        html += "<div style='margin-bottom:5px; border-bottom:solid gray 1px; padding:3px;'><input class='select_mine' type='checkbox' value='" + mdt[i][1].id + "'> " + mdt[i][1].name + "</div>";
                    }
                }
                $("#res_Panel ul").html(html);
                if (mdt.length == 0) {
                    $("#res_Panel ul").html("Brak zasobów");
                }
            };
            RES.FindMapcell = function() {
                this.mapcell = Object.keys(GAME).find(z => GAME[z] && GAME[z]['1_1']);
                return this.mapcell;
            };
            RES.CreateMatrix = function() {
                for (var i = 0; i < parseInt(GAME.map.max_y); i++) {
                    this.matrix[i] = [];
                    for (var j = 0; j < parseInt(GAME.map.max_x); j++) {
                        if (GAME.mapcell[parseInt(j + 1) + '_' + parseInt(i + 1)].m == 1) {
                            this.matrix[i][j] = 1;
                        } else {
                            this.matrix[i][j] = 0
                        }
                    }
                }
            };
            RES.Mine = function() {
                GAME.socket.emit('ga', {
                    a: 22,
                    type: 8,
                    mid: RES.mines[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)]
                });
            };
            RES.Go = function() {
                if (this.steps_clone.length > 0) {
                    this.finder.findPath(GAME.char_data.x - 1, GAME.char_data.y - 1, this.steps_clone[0][0] - 1, this.steps_clone[0][1] - 1, function(path) {
                        if (path === null) {} else {
                            RES.path = path;
                            if (RES.steps_clone.length > 0) {
                                RES.path.shift();
                                cur = [GAME.char_data.x, GAME.char_data.y];
                                setTimeout(() => {
                                    if (!RES.stop && RES.mines[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)] && $("button[data-mid='" + RES.mines[parseInt(GAME.char_data.x) + "_" + parseInt(GAME.char_data.y)] + "']").length == 1 && RES.steps.some(r => r.length == cur.length && r.every((value, index) => cur[index] == value))) {
                                        setTimeout(function() {
                                            RES.Mine();
                                        }, RES.speed);
                                    } else if (!RES.stop) {
                                        setTimeout(function() {
                                            RES.Move();
                                        }, RES.speed);
                                    }
                                }, 1200);
                            }
                        }
                    });
                    this.finder.calculate();
                } else if (!RES.stop && (GAME.char_data.x + "_" + GAME.char_data.y) == this.last_mine) {
                    setTimeout(function() {
                        RES.Mine();
                    }, 1200);
                    this.cdt = setTimeout(function() {
                        if (!RES.stop) {
                            GAME.loadMapJson(function() {
                                GAME.socket.emit('ga', {
                                    a: 3,
                                    vo: GAME.map_options.vo
                                }, 1);
                            });
                            setTimeout(function() {
                                RES.Start();
                            }, 2400);
                            $(".bt_cool").html("");
                        }
                    }, this.GetCooldown());
                }
            };
            RES.Move = function() {
                if (!RES.stop) {
                    if (this.path[0].x > GAME.char_data.x - 1 && this.path[0].y == GAME.char_data.y - 1) {
                        GAME.socket.emit('ga', {
                            a: 4,
                            dir: 7,
                            vo: GAME.map_options.vo
                        });
                    } else if (this.path[0].x < GAME.char_data.x - 1 && this.path[0].y == GAME.char_data.y - 1) {
                        GAME.socket.emit('ga', {
                            a: 4,
                            dir: 8,
                            vo: GAME.map_options.vo
                        });
                    } else if (this.path[0].x == GAME.char_data.x - 1 && this.path[0].y > GAME.char_data.y - 1) {
                        GAME.socket.emit('ga', {
                            a: 4,
                            dir: 1,
                            vo: GAME.map_options.vo
                        });
                    } else if (this.path[0].x == GAME.char_data.x - 1 && this.path[0].y < GAME.char_data.y - 1) {
                        GAME.socket.emit('ga', {
                            a: 4,
                            dir: 2,
                            vo: GAME.map_options.vo
                        });
                    } else if (this.path[0].x > GAME.char_data.x - 1 && this.path[0].y > GAME.char_data.y - 1) {
                        GAME.socket.emit('ga', {
                            a: 4,
                            dir: 3,
                            vo: GAME.map_options.vo
                        });
                    } else if (this.path[0].x < GAME.char_data.x - 1 && this.path[0].y < GAME.char_data.y - 1) {
                        GAME.socket.emit('ga', {
                            a: 4,
                            dir: 6,
                            vo: GAME.map_options.vo
                        });
                    } else if (this.path[0].x > GAME.char_data.x - 1 && this.path[0].y < GAME.char_data.y - 1) {
                        GAME.socket.emit('ga', {
                            a: 4,
                            dir: 5,
                            vo: GAME.map_options.vo
                        });
                    } else if (this.path[0].x < GAME.char_data.x - 1 && this.path[0].y > GAME.char_data.y - 1) {
                        GAME.socket.emit('ga', {
                            a: 4,
                            dir: 4,
                            vo: GAME.map_options.vo
                        });
                    } else {
                        this.Go();
                    }
                }
            };
            RES.Next = function() {
                if (this.path.length - 1 > 0) {
                    this.path.shift();
                    setTimeout(function() {
                        RES.Move();
                    }, this.speed);
                } else {
                    if (this.steps_clone.length > 0) {
                        this.steps_clone.shift();
                        this.Go();
                    }
                }
            };
            RES.HandleResponse = function(res) {
                if (RES.stop && res.a === 3 && PVP.stop  && RESP.stop) {
                    this.listMines();
                    this.getMinesPos();
                }
                if (res.a === 3 && RES.loc != GAME.char_data.loc) {
                    RES.stop = true;
                    $(".res_res .res_status").removeClass("green").addClass("red").html("Off");
                    $(".bt_cool").html("");
                    clearTimeout(RES.cdt);
                }
                if (res.a === 3 && RESP.loc != GAME.char_data.loc) {
                    RESP.stop = true;
                    $(".resp_resp .resp_status").removeClass("green").addClass("red").html("Off");
                }
                this.processing = false;
                if (!RES.stop && res.a === 4 && res.char_id === GAME.char_id) {
                    RES.Next();
                } else if (!RES.stop && res.done && res.a === 22) {
                    $("button[data-option='start_mine']").remove();
                    RES.Go();
                }
            };
            GAME.socket.on('gr', function(res) {
                RES.HandleResponse(res);
            });
            RES.LoadES = function() {
                esjs = document.createElement('script');
                esjs.src = 'https://cdn.jsdelivr.net/npm/easystarjs@0.4.3/bin/easystar-0.4.3.min.js';
                esjs.onload = () => {
                    RES.finder = new EasyStar.js();
                    RES.finder.enableDiagonals();
                    RES.finder.setAcceptableTiles([1]);
                };
                document.head.append(esjs);
            }();
            setTimeout(() => {
                if (GAME.maploaded) {
                    RES.listMines();
                }
            }, 500);
           
            createPanel();
            setTimeout(() => {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 0,
                    empire: GAME.char_data.empire
                });
            }, 300);
            setTimeout(() => {
                GAME.emitOrder({
                    a: 39,
                    type: 0
                });
            }, 600);
            setTimeout(() => {
                GAME.emitOrder({
                    a: 39,
                    type: 23
                });
            }, 900);
    }, 50);
}
