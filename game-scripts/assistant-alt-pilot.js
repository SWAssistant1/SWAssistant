kwsv3.prototype.createAlternativePilot = function () {
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
};

kwsv3.prototype.bindAlternativePilotButtons = function () {
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
};

