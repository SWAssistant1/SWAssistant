window.setTimeout(function() {
	document.getElementsByClassName("select_page")[28].click(); // włącza okienko z instancjami
}, 500);

window.setTimeout(function() {
	document.getElementsByClassName("instance_name")[1].click(); // włącza instancję Ronina
}, 1500);

window.setTimeout(function() {
	GAME.emitOrder({a:29,type:2,instance:GAME.current_instance}); // tworzy pokój
}, 2500);

window.blocker2 = 0;
window.blocker3 = 0;
window.setTimeout(function() {
	var checker = document.getElementById("inst_rooms_container").getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML; // sprawdza który pokój Twój

	var liczba_pokoi = document.getElementById("inst_rooms_container").childElementCount; // sprawdza ile jest pokoi

	for (var x = 0; x < liczba_pokoi; x++) {
		var xy = document.getElementById("inst_rooms_container").getElementsByTagName("tr")[x].getElementsByTagName("td")[0].innerHTML;

		var tekst = GAME.char_data.name + " [S " + GAME.server + "]";

		if (xy == tekst) { // sprawdza który pokój jest Twój
			var y = x;
			document.getElementById("inst_rooms_container").getElementsByTagName("tr")[y].getElementsByTagName("td")[4].getElementsByTagName("button")[0].click(); // rozpoczyna instancje
			
			window.setTimeout(function() {
				document.getElementById("inst_rooms_container").getElementsByTagName("tr")[y].getElementsByTagName("td")[4].getElementsByTagName("button")[0].click(); //wchodzi do instancji
			}, 2000);
			
			window.setTimeout(function() {
				GAME.page_switch("game_map"); // włącza mape
			}, 4000);
			
			window.setTimeout(function() {
				document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
			}, 6000);
			
			window.setTimeout(function() {
				document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
			}, 8000);
			
			window.setTimeout(function() {
				window.arr1 = [];
				window.arr2 = [];
				window.arr3 = [];
				window.blocker = 1;
				// idzie do góry
				if (blocker == 1) {
					arr1.push(setInterval(function() {
						if (GAME.char_data.y > 14) {
							GAME.map_move(2);
						} else if (GAME.char_data.y == 14) {
						   window.setTimeout(function() {
								blocker = 0;
								arr1.map((a) => {
									clearInterval(a);
									arr1 = [];
								});
								window.setTimeout(function() {
									go2();
								}, 1300);
								
						   }, 500);
						}
						if (GAME.char_data.y < 14) {
							GAME.map_move(1);
						}
					}, 300));
				}
			
			}, 11000);
			
		}
		//break;
	}
}, 3500);

window.blocker4 = 0;

function go2() {
	arr2.push(setInterval(function() {
        if (blocker3 == 0) {
		if (GAME.char_data.x < 19) {
			GAME.map_move(7);
		} else if (GAME.char_data.x == 19) {
			window.setTimeout(function() {
                blocker3 = 1;
				arr2.map((a) => {
					clearInterval(a);
					arr2 = [];
				});
                window.setTimeout(function() {
                    go3();
                }, 1200);
			}, 500);
		}
		if (GAME.char_data.x > 19) {
			GAME.map_move(8);
		}
        }
	}, 600));
}

function go3() {
	arr3.push(setInterval(function() {
		if (GAME.char_data.y > 12) {
			GAME.map_move(2);
		} else if (GAME.char_data.y == 12) {
			window.setTimeout(function() {
				arr3.map((a) => {
					clearInterval(a);
					arr3 = [];
				});
				window.setTimeout(function() {
                    go4();
                }, 1200);
			}, 500);
		}
		if (GAME.char_data.y < 12) {
			GAME.map_move(1);
		}
	}, 600));
	
}

window.blocker5 = 0;

function go4() {
	document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
	
	window.setTimeout(function() {
		
		if (blocker2 == 0) {
		blocker2 = 1;
		for (var x = 0; x <= 1000; x++) {
			GAME.questAction();
		}
		
		window.setTimeout(function() {
			document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
		}, 1000);
		
		console.log('1');
		window.setTimeout(function() {
			document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
			
			window.setTimeout(function() {
				document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
				
				window.setTimeout(function() {
					if (blocker5 == 0) {
						blocker5 = 1;
						for (var x = 0; x <= 1000; x++) {
							GAME.questAction();
							console.log('2');
						}
						
						window.setTimeout(function() {
							document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
							
							window.setTimeout(function() {
								document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
							}, 800);
							
							window.setTimeout(function() {
								document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
							}, 1700);
							
							window.setTimeout(function() {
								document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
								
								window.setTimeout(function() {
									go5();
								}, 800);
							
							}, 2600);
							
						}, 4800);
					}
				}, 1500);
			}, 1500);
			
		}, 4500);
		}
	}, 1500);
}

function go5() {
	window.arr4 = [];
	window.arr5 = [];
	window.arr6 = [];
	
	arr4.push(setInterval(function() {
		if (GAME.char_data.x > 25) {
			GAME.map_move(8);
		}
		if (GAME.char_data.x < 25) {
			GAME.map_move(7);
		}
		if (GAME.char_data.y > 16) {
			GAME.map_move(2);
		}
		if (GAME.char_data.y < 16) {
			GAME.map_move(1);
		}
		
		if (GAME.char_data.x == 25 && GAME.char_data.y == 16) {
			arr4.map((a) => {
				clearInterval(a);
				arr4 = [];
			});
			
			window.setTimeout(function() {
				document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
				
				window.setTimeout(function() {
					document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
					
					window.setTimeout(function() {
						arr5.push(setInterval(function() {
							if (GAME.char_data.x > 24) {
								GAME.map_move(8);
							}
							
							if (GAME.char_data.x == 24) {
								arr5.map((a) => {
									clearInterval(a);
									arr5 = [];
								});
								
								window.setTimeout(function() {
									document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
									
									window.setTimeout(function() {
										document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
									}, 1000);
									
									window.setTimeout(function() {
										document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
									}, 2000);
									
									window.setTimeout(function() {
										document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
										
										window.setTimeout(function() {
											arr6.push(setInterval(function() {
												if (GAME.char_data.x < 25) {
													GAME.map_move(7);
												}
												if (GAME.char_data.x > 25) {
													GAME.map_move(8);
												}
												if (GAME.char_data.x == 25) {
													arr6.map((a) => {
														clearInterval(a);
														arr6 = [];
													});
													
													window.setTimeout(function() {
														document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
														
														window.setTimeout(function() {
															for (var x = 0; x <= 1000; x++) {
																GAME.questAction();
															}
															
															window.setTimeout(function() {
																go6();
															}, 4500);
														}, 500);
													}, 500);
												}
											}, 500));
										}, 500);
									
									}, 3000);
								}, 33000);
							}
						}, 500));
						
					}, 400);
				}, 500);
			}, 700);
		}
	}, 500));
}

function go6() {
	document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
	
	window.setTimeout(function() {
		document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
	}, 1000);
	
	window.setTimeout(function() {
		document.getElementsByClassName("quest_desc")[1].getElementsByTagName("div")[0].getElementsByTagName("strong")[0].getElementsByTagName("button")[0].click(); // atakuje Tatewaki
		
		window.setTimeout(function() {
			document.getElementById("fight_view").style.display = "none";
		}, 250);
	}, 2000);
	
	window.setTimeout(function() {
		document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
		
		window.setTimeout(function() {
			go7();
		}, 1500);
	}, 3000);
}

function go7() {
	window.arr7 = [];
	window.arr8 = [];
	window.arr9 = [];
	window.arr10 = [];
	
	arr7.push(setInterval(function() {
		if (GAME.char_data.x > 20) {
			GAME.map_move(8);
		}
		if (GAME.char_data.x < 20) {
			GAME.map_move(7);
		}
		if (GAME.char_data.y > 11) {
			GAME.map_move(2);
		}
		if (GAME.char_data.y < 11) {
			GAME.map_move(1);
		}
		
		if (GAME.char_data.x == 20 && GAME.char_data.y == 11) {
			arr7.map((a) => {
				clearInterval(a);
				arr7 = [];
			});
			
			window.setTimeout(function() {
				arr8.push(setInterval(function() {
					if (GAME.char_data.x > 29) {
						GAME.map_move(8);
					}
					if (GAME.char_data.x < 29) {
						GAME.map_move(7);
					}
					if (GAME.char_data.y > 8) {
						GAME.map_move(2);
					}
					if (GAME.char_data.y < 8) {
						GAME.map_move(1);
					}
					if (GAME.char_data.x == 29 && GAME.char_data.y == 8) {
						arr8.map((a) => {
							clearInterval(a);
							arr8 = [];
						});
						
						window.setTimeout(function() {
							arr9.push(setInterval(function() {
								if (GAME.char_data.x > 33) {
									GAME.map_move(8);
								}
								if (GAME.char_data.x < 33) {
									GAME.map_move(7);
								}
								if (GAME.char_data.y > 14) {
									GAME.map_move(2);
								}
								if (GAME.char_data.y < 14) {
									GAME.map_move(1);
								}
								if (GAME.char_data.x == 33 && GAME.char_data.y == 14) {
									arr9.map((a) => {
										clearInterval(a);
										arr9 = [];
									});
									
									window.setTimeout(function() {
										document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
									}, 500);
									
									window.setTimeout(function() {
										document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
									}, 1500);
									
									window.setTimeout(function() {
										document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
										
										window.setTimeout(function() {
											arr10.push(setInterval(function() {
												if (GAME.char_data.x > 35) {
													GAME.map_move(8);
												}
												if (GAME.char_data.x < 35) {
													GAME.map_move(7);
												}
												if (GAME.char_data.x == 35) {
													arr10.map((a) => {
														clearInterval(a);
														arr10 = [];
													});
													
													window.setTimeout(function() {
														go8();
													}, 2000);
												}
											}, 300));
										}, 1000);
									}, 2500);
								}
							}, 400));
						}, 300);
						
					}
					
				}, 400));
			}, 350);
		}
	}, 450));
}

function go8() {
	document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
	
	window.setTimeout(function() {
		document.getElementsByClassName("quest_desc")[1].getElementsByTagName("div")[0].getElementsByTagName("strong")[0].getElementsByTagName("button")[0].click(); // atakuje Marionetkę
		
		window.setTimeout(function() {
			document.getElementById("fight_view").style.display = "none";
			
			window.setTimeout(function() {
				document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
			}, 800);
			
			window.setTimeout(function() {
				document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
				
				window.setTimeout(function() {
					fight();
				}, 1000);
			}, 1800);
		}, 450);
	}, 1000);
}

function fight() {
	window.arr11 = [];
	window.arr12 = [];
	window.arr13 = [];
	window.arr14 = [];
	
	window.moby_bij = 0;
	window.multi = 0;
	arr11.push(setInterval(function() {
		GAME.emitOrder({a:7,mob_num:0,rank:0,quick:1});
		moby_bij++;
		
		if (moby_bij > 8) {
			move_up();
			moby_bij = 0;
			multi++;
		}
		
		if (multi >= 4) {
			arr11.map((a) => {
				clearInterval(a);
				arr11 = [];
			});
			
			window.setTimeout(function() {
				
				window.variab = 10;
				
				arr12.push(setInterval(function() {
					
					if (variab <= 22) {
						if (variab % 2 == 0) {
							move_up();
							variab++;
						} else if (variab % 2 == 1) {
							variab++;
							multiwalka();
						}
					}
					
					if (variab > 22) {
						
						if (variab <= 25) {
							GAME.map_move(7);
						}
						
						if (variab % 2 == 0) {
							GAME.map_move(1);
							variab++;
						} else if (variab % 2 == 1) {
							multiwalka();
							variab++;
						}
						
					}
					
					if (variab > 60) {
						arr12.map((a) => {
							clearInterval(a);
							arr12 = [];
						});
						
						window.setTimeout(function() {
							arr13.push(setInterval(function() {
								if (GAME.char_data.x > 35) {
									GAME.map_move(8);
								}
								if (GAME.char_data.x < 35) {
									GAME.map_move(7);
								}
								if (GAME.char_data.y > 14) {
									GAME.map_move(2);
								}
								if (GAME.char_data.y < 14) {
									GAME.map_move(1);
								}
								if (GAME.char_data.x == 35 && GAME.char_data.y == 14) {
									
									arr13.map((a) => {
										clearInterval(a);
										arr13 = [];
									});
						
									window.setTimeout(function() {
										document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
									}, 500);
									
									window.setTimeout(function() {
										document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
									}, 1200);
									
									window.setTimeout(function() {
										arr14.push(setInterval(function() {
											if (GAME.char_data.x > 37) {
												GAME.map_move(8);
											}
											if (GAME.char_data.x < 37) {
												GAME.map_move(7);
											}
											if (GAME.char_data.x == 37) {
												arr14.map((a) => {
													clearInterval(a);
													arr14 = [];
												});
												
												window.setTimeout(function() {
													document.getElementById("field_opts_con").getElementsByTagName("div")[1].click(); // włącza quest
												}, 700);
												
												window.setTimeout(function() {
													document.getElementsByClassName("quest_win")[0].getElementsByTagName("button")[0].click(); // klika "dalej"
												}, 1700);
												
											}
										}, 350));
									}, 2200);
								}
							}, 350));
						}, 800);
					}
					
				}, 400));
				
			}, 600);
		}
	}, 300));
}

function move_up() {
	window.setTimeout(function() {
		GAME.map_move(2);
	}, 125);
}

function multiwalka() {
	GAME.emitOrder({a:13,mob_num:0,fo:GAME.map_options.ma});
}