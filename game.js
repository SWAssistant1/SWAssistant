var JQS={
	servt:$('#server_time'),
	ldr:$('#loader'),
	kcc:$('#kom_con'),
	ltt:$('#loading_text'),
	ltb:$('#loading_bar'),
	fco:$('#fight_con'),
	mko:$('#map_kon'),
	cre:$('#creature_list_con'),
	fol:$('#field_opts_con'),
	qcc:$('#quest_con'),
	trr:$('#game_train_result'),
	chm:$('#chat_message'),
	//tup:$('#train_upgrade'),
	ctm:$('#chat_messages'),
	plc:$('#player_list_con'),
	upb:$('#eg_pas99'),
	upp:$('#prog_value')
}
var PJS={
	cre:document.getElementById("creature_list_con"),
	fol:document.getElementById('field_opts_con'),
	pra:document.getElementById('char_premium_am'),
	plc:document.getElementById('player_list_con'),
	scr:document.getElementById('special_list_con'),
	trr:document.getElementById('game_train_result')
}
var GAME ={
	pid:0,
	login:'',
	debug:parseInt(localStorage.getItem('debug'))||0,
	sitekey:'6Lfu_AgTAAAAAA3_xa7DPdQ8hdF_fjMUh8ua4XU-',
	captcha:{},
	any_captcha:false,
	response:{},
	wind_frequency:0,
	fog_frequency:0,
	fog_initial:0,
	rain_frequency:0,
	earthquake_frequency:0,
	cloud_frequency:0,
	snow_frequency:0,
	storm_frequency:0,
	fog_initial_speed:100000,
	fog_speed:5000,
	earthquake_duration:1500,
	earthquake_tick:500,
	cloud_speed:4000,
	rain_speed:50,
	snow_speed:1000,
	snow_direction_var:10,
	snow_direction_var2:-10,
	snow_move_timer:50,
	storm_speed:100,
	serv_time:0,
	char_id:0,
	komc:40,
	tour_type:0,
	tutorial_arrow_width:48,
	chat_height:326,
	chat_switch:0,
	chat_scnt:0,
	push_enabled:false,
	push_actions:[3,7,8,19,20],
	abiunlock:{},
	ctrl_pressed:false,
	mf:{},
	md:{},
	locked_pages:[],
	koms:[],
	noti_cnt:0,
	arr_status:['',''],
	atr_labels:['','sila','szyb','wytrz','swoli','ki','wta','gki'],
	empire_locations:[348,349,350,351],
	def_train_stat:1,
	map_options:{
		ma:JSON.parse(localStorage.getItem('map_opts_ma'))||[1,1,1,1,1],
		vo:JSON.parse(localStorage.getItem('map_opts_vo'))||[1,1,0],
		bo:JSON.parse(localStorage.getItem('map_opts_bo'))||[1,1],
		ef:JSON.parse(localStorage.getItem('map_opts_ef'))||[1,1],
	},
	noanitim:0,
	loaded_resources:[],
	awaiting_resources:[],
	map_resources:[],
	gfx_path:'/gfx/',
	spacebind:false,
	fight_timer:false,
	socket:io(locals.socket_url),
	chat_notifications:JSON.parse(localStorage.getItem('chat_notifications'))||[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	chat_channel:1,
	chat_channels:13,
	quest_action_tim:0,
	clan_enemies:[],
	emp_enemies:[],
	org_enemies:[],
	emp_enemies_t:{},
	chat_visible:0,
	fight_speed:parseInt(localStorage.getItem('fight_speed'))||1000,
	animations_off:parseInt(localStorage.getItem('animations_off'))||0,
	ranking_type:1,
	stats:['psk_gained','mob_power','tren_power','war_power','camps_done','frags','codes','items_gained','mob_killed','pvp_gained','pvp_wons','pvp_lose','legend_killed','senzu_gained','senzu_consumed','sk_power','arena_wons','treasuer_gained','csk_gained','epic_killed'],
	char_rank_fields:['exp','pvm','pvp','gold','pvpwins','tai','ken','shuriken','nin','gen','kin','sen','fuin','fire','water','earth','wind','thunder','arena_lvl','synergy','tour'],
	klan_rank_fields:['level','war_wins','war_loses','war_limit','pu','gold'],
	field_mob_types:1,
	field_mob_id:0,
	map_players:[],
	chat_nonread:0,
	all_skills:29,
	skill_order:[[1,2,11,12,13,14,15,16,24,25,26,27,28,29],[3,4,5,6,7,8,9,10,18,19,20,21,22,23,17]],
	missions_duration:[0,600,1000,1500,2000,3600],
	return_errors:[1,2,3],
	clan_law_labels:['struct_build','buffer','player_manage','warlord','invite','profile_edit','group_message'],
	bonus_cats:['',
		[30,32,34,7,8,138,139,1,2,3,4,5,6,13,14,15,16,39,40,41,42,43,44,45,115,117,119,137],
		[31,33,35,9,10,11,12,87,88,17,18,46,47,48,49,50,51,52,116],
		[122,125,123,124,38,37,110,111,112,113,114,89,90,91,92,93,94,95,96,97,120,121,136,128,129,130,132,131,126,127,133],
		[54,56,25,26,27,28,29,36,20,19,75,76,21,77,78,22,79,80,23,81,82,24,83,84,53,85,86],
		[118,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,55,117],
		[],
		[],
		[200,201]
	],
	essence_bonuses:[0,
		[39,33],
		[40,33],
		[41,33],
		[21,50],
		[17,50],
		[37,2],
		[19,50],
		[87,33],
		[89,33],
		[31,33]
	],
	clan_structs_cats:['',
		[3,4,23],
		[5,6,7,8,9,10,11,12,24],
		[13,14,15,16,17,18,19,20,21,22]
	],
	org_structs_cats:['',
		[3,4,5,6,7,8,9,10]
	],
	jutsu_categories:{
		1:{base:1,kg:[10,11,12,13,14],kt:[14,15]},
		2:{base:1,kg:[15,16,17,18,19],kt:[16,17]},
		3:{base:1,kg:[20,21,22,23,24],kt:[18,19]},
		4:{base:1,nin_spec:[6,7,8,9],kg:[99,1,2,3,4,5,6,7,8,9],kt:[1,2,3,4,5,6,7,8,9,10],natures:1},
		5:{base:1,kg:[25,26],kt:[11,12,13]},
		6:{kin_spec:[11,12,13,14]},
		11:{pact:1},
		12:{fuin:1}
	},
	ability_train_bonuses:{1:93,2:93,3:93,4:93,5:93,6:94,7:95,8:90,9:91,10:92,11:93,12:97,13:96},
	quest_action:0,
	item_slots:16,
	curvy:['easeInSine','easeOutSine','easeInExpo','easeInQuint','easeInOutSine','easeInOutExpo'],
	train_eff:[0,0.6,1,1.4,1.8,2.3,2.7,3.1,3.5,3.8,4.1,4.4,4.7],
	ekw_page:1,
	chat_data:{},
	lang_data:{
		'lokacje':{'pl':'name','en':'name_en'},
		'nauki':{'pl':'nazwa','en':'nazwa_en'},
		'nauki2':{'pl':'opis','en':'opis_en'},
		'dialog':{'pl':'dialog','en':'dialog_en'},
		'quests':{'pl':'qb_title','en':'qb_title_en'},
		'question':{'pl':'question','en':'question_en'},
		'quiza1':{'pl':'a1','en':'a1_en'},
		'quiza2':{'pl':'a2','en':'a2_en'},
		'quiza3':{'pl':'a3','en':'a3_en'},
		'quiza4':{'pl':'a4','en':'a4_en'}
	},
	move_speed:250,
	hero_cen:true,
	map:{
		initiated:0,
		animate:0,
		cX:520,
		cY:520,
		fX:40,fY:40,
		scam_x:1,scam_y:1,
		cam_x:0,cam_y:0,
		max_x:0,max_y:0,
		smax_x:0,smax_y:0,
		rX:13,rY:13,
		frame_control:{},
		effect_buffer:[],
		impact_buffer:[]
	},
	minimap:{
		active:false,
		canvas:'',
		ctx:'',
		cX:136,
		cY:136,
		max_x:0,
		max_y:0,
		w:8,
		h:8,
		rX:17,
		rY:17,
		box_x:136,
		box_y:136
	},
	bindings:{
		'sila':[{c:document.getElementById('char_stat_1'),ani:1,dots:1}],
		'szyb':[{c:document.getElementById('char_stat_2'),ani:1,dots:1}],
		'wytrz':[{c:document.getElementById('char_stat_3'),ani:1,dots:1}],
		'moc':[{c:document.getElementById('char_stat_4'),ani:1,dots:1}],
		'swoli':[{c:document.getElementById('char_stat_5'),ani:1,dots:1}],
		'ener':[{c:document.getElementById('char_stat_6'),ani:1,dots:1}],
		'tai':[{c:document.getElementById('char_tai'),ani:1,dots:1,is_abi:1}],
		'ken':[{c:document.getElementById('char_ken'),ani:1,dots:1,is_abi:2}],
		'shuriken':[{c:document.getElementById('char_shuriken'),ani:1,dots:1,is_abi:3}],
		'nin':[{c:document.getElementById('char_nin'),ani:1,dots:1,is_abi:4}],
		'gen':[{c:document.getElementById('char_gen'),ani:1,dots:1,is_abi:10}],
		'kin':[{c:document.getElementById('char_kin'),ani:1,dots:1,is_abi:11}],
		'sen':[{c:document.getElementById('char_sen'),ani:1,dots:1,is_abi:12}],
		'fuin':[{c:document.getElementById('char_fuin'),ani:1,dots:1,is_abi:13}],
		'nin_fire':[{c:document.getElementById('char_nin_fire'),ani:1,dots:1,is_abi:5}],
		'nin_water':[{c:document.getElementById('char_nin_water'),ani:1,dots:1,is_abi:6}],
		'nin_thunder':[{c:document.getElementById('char_nin_thunder'),ani:1,dots:1,is_abi:9}],
		'nin_wind':[{c:document.getElementById('char_nin_wind'),ani:1,dots:1,is_abi:8}],
		'nin_earth':[{c:document.getElementById('char_nin_earth'),ani:1,dots:1,is_abi:7}],
		'ap':[{c:document.getElementById('char_stat_ap')},{type:2,option:6}],
		'kk':[{c:document.getElementById('char_spremium_am'),ani:1,dots:1},{type:2,option:5}],
		'sp':[{c:document.getElementById('char_sp')}],
		'rp':[{c:document.getElementById('char_rp')},{c:document.getElementById('char_rp2')}],
		'atp':[{c:document.getElementById('char_atp')},{c:document.getElementById('char_abtra')},{c:document.getElementById('char_atp2')}],
		'exp':[{c:document.getElementById('char_exp'),ani:1,dots:1}],
		'level':[{c:document.getElementById('char_level')}],
		'soul_slots':[{c:document.getElementById('soul_slots')}],
		'pr':[{c:document.getElementById('char_pa'),ani:1,dots:1}],
		'x':[{c:document.getElementById('map_x')}],
		'y':[{c:document.getElementById('map_y')}],
		'pr_max':[{c:document.getElementById('char_pa_max'),dots:1,add_bonus:122,add_pbonus:125}],
		'pr_ph':[{c:document.getElementById('char_pa_growth'),dots:1,add_bonus:123,add_pbonus:124}],
		'pr_time':[{type:2,option:3}],
		'train_lvl':[{c:document.getElementById('game_train_level')}],
		'train_exp':[{c:document.getElementById('game_train_exp')}],
		'tpp':[{c:document.getElementById('char_tpp'),dots:1}],
		'doubler_rate':[{c:document.getElementById('doubler_ratio'),dots:1}],
		'doublerx':[{type:2,option:1}],
		'last_map':[{type:2,option:2}],
		'gold':[{c:document.getElementById('char_gold_am'),ani:1,dots:1}],
		'reborn':[{type:2,option:4}],
		'god':[{c:document.getElementById('char_god'),ani:1,dots:1}],
		'wta':[{c:document.getElementById('char_stat_6'),ani:1,dots:1}],
		'gki':[{c:document.getElementById('char_stat_7'),ani:1,dots:1}],
		'pvp':[{c:document.getElementById('char_pvp'),dots:1}],
		'kills':[{c:document.getElementById('char_pvm'),dots:1}],
		'war_points':[{c:document.getElementById('char_fame'),dots:1}],
		'school_rep':[{c:document.getElementById('char_rep'),dots:1}],
		'sentinel':[{c:document.getElementById('char_sentinel'),dots:1}],
		'divine':[{c:document.getElementById('char_godp'),dots:1}],
		'divine_particle':[{c:document.getElementById('char_divinep'),dots:1}],
		'minor_ball':[{c:document.getElementById('minorbdc'),dots:1,ani:1}],
		'friend_limit':[{c:document.getElementById('char_friend_limit'),dots:1,ani:1}],
		'trybut':[{c:document.getElementById('clan_kp_tribute'),dots:1,ani:1}],
		'trybut_gold':[{c:document.getElementById('clan_kp_tribute_gold'),dots:1,ani:1}],
		'clan_pu':[{c:document.getElementById('clan_pu_tribute'),dots:1,ani:1}],
		'level_lock':[{type:2,option:7}],
		'arena_lvl':[{c:document.getElementById('arena_lvl')}],
		'arena_exp':[{type:2,option:8}],
		'vip_level':[{c:document.getElementById('monthly_vip_level')}],
		'vip_score':[{c:document.getElementById('monthly_vip_points'),ani:1,dots:1}],
		'vip_show':[{type:2,option:9}],
		'gvip_level':[{c:document.getElementById('general_vip_level')}],
		'gvip_score':[{c:document.getElementById('general_vip_points'),ani:1,dots:1}],
		'name':[{c:document.getElementById('char_name')}],
		'surname':[{c:document.getElementById('char_surname')}],
		'max_ekw':[{c:document.getElementById('ekw_space'),dots:1}],
		'max_market':[{c:document.getElementById('auction_own_items_max'),dots:1}],
		'special':[{type:2,option:10}],
		'bagi':[{type:2,option:11}],
		'village_id':[{type:2,option:12}],
		'ranga':[{type:2,option:13}],
		'kage_ambition':[{type:2,option:14}],
		'soul_floor_resets':[{c:document.getElementById('st_floor_r')}],
		'soul_floor':[{c:document.getElementById('st_floor'),dots:1}],
		'a_1':[{c:document.getElementById('rank_miss1_ava'),dots:1}],
		'a_2':[{c:document.getElementById('rank_miss2_ava'),dots:1}],
		'a_3':[{c:document.getElementById('rank_miss3_ava'),dots:1}],
		'a_4':[{c:document.getElementById('rank_miss4_ava'),dots:1}],
		'a_5':[{c:document.getElementById('rank_miss5_ava'),dots:1}],
		'm_1':[{c:document.getElementById('rank_miss1_done'),dots:1}],
		'm_2':[{c:document.getElementById('rank_miss2_done'),dots:1}],
		'm_3':[{c:document.getElementById('rank_miss3_done'),dots:1}],
		'm_4':[{c:document.getElementById('rank_miss4_done'),dots:1}],
		'm_5':[{c:document.getElementById('rank_miss5_done'),dots:1}]
	},
	tooltip_options:{
		html:true,
		placement: 'auto right',
		container: 'body',
		trigger : 'hover'
	},
	tree_sets:{
		basic:{
			techs:['1_1','1_3','1_5','1_7','3_7','3_5','3_3','3_1','5_1','5_3','5_5','5_7','7_7','7_5','7_3','7_1','9_1','9_3','9_5','9_7','11_7','11_5','11_3','11_1'],
			arrows:[
				{d:'a_right',s:'1_2'},
				{d:'a_right',s:'1_4'},
				{d:'a_right',s:'1_6'},
				{d:'a_bottom',s:'2_7'},
				{d:'a_left',s:'3_6'},
				{d:'a_left',s:'3_4'},
				{d:'a_left',s:'3_2'},
				{d:'a_bottom',s:'4_1'},
				{d:'a_right',s:'5_2'},
				{d:'a_right',s:'5_4'},
				{d:'a_right',s:'5_6'},
				{d:'a_bottom',s:'6_7'},
				{d:'a_left',s:'7_6'},
				{d:'a_left',s:'7_4'},
				{d:'a_left',s:'7_2'},
				{d:'a_bottom',s:'8_1'},
				{d:'a_right',s:'9_2'},
				{d:'a_right',s:'9_4'},
				{d:'a_right',s:'9_6'},
				{d:'a_bottom',s:'10_7'}
			]
		},
		basic_nin:{
			techs:['1_1','1_3','1_5','1_7','3_5','3_3','5_1','5_3'],
			arrows:[
				{d:'a_right',s:'1_2'},
				{d:'a_right',s:'1_4'},
				{d:'a_right',s:'1_6'},
				{d:'a_bleft',s:'2_6'},
				{d:'a_left',s:'3_4'}
			]
		},
		nin_element:{
			techs:['1_5','3_7','5_7','7_7','9_7','11_5','11_3','9_1','7_1','5_1','3_3','3_5','5_5','7_5','9_3','7_3'],
			arrows:[
				{d:'a_bright',s:'2_6'},
				{d:'a_bottom',s:'4_7'},
				{d:'a_bottom',s:'6_7'},
				{d:'a_bottom',s:'8_7'},
				{d:'a_bleft',s:'10_6'},
				{d:'a_left',s:'11_4'},
				{d:'a_tleft',s:'10_2'},
				{d:'a_top',s:'8_1'},
				{d:'a_top',s:'6_1'},
				{d:'a_tright',s:'4_2'},
				{d:'a_right',s:'3_4'},
				{d:'a_bottom',s:'4_5'},
				{d:'a_bottom',s:'6_5'},
				{d:'a_bleft',s:'8_4'},
				{d:'a_top',s:'8_3'}
			]
		},
		nin_spec:{
			techs:['1_1','1_3','1_5','1_7','3_7','3_5','3_3','5_3','7_3','9_5','9_7','11_7','11_5','11_3'],
			arrows:[
				{d:'a_right',s:'1_2'},
				{d:'a_right',s:'1_4'},
				{d:'a_right',s:'1_6'},
				{d:'a_bottom',s:'2_7'},
				{d:'a_left',s:'3_6'},
				{d:'a_left',s:'3_4'},
				{d:'a_bottom',s:'4_3'},
				{d:'a_bottom',s:'6_3'},
				{d:'a_bright',s:'8_4'},
				{d:'a_right',s:'9_6'},
				{d:'a_bottom',s:'10_7'},
				{d:'a_left',s:'11_6'},
				{d:'a_left',s:'11_4'}
			]
		},
		gen:{
			techs:['1_1','3_3','1_5','3_7','5_5','7_3','9_1','11_3','9_5','9_7','11_7','11_5'],
			arrows:[
				{d:'a_bright',s:'2_2'},
				{d:'a_tright',s:'2_4'},
				{d:'a_bright',s:'2_6'},
				{d:'a_bleft',s:'4_6'},
				{d:'a_bleft',s:'6_4'},
				{d:'a_bleft',s:'8_2'},
				{d:'a_bright',s:'10_2'},
				{d:'a_tright',s:'10_4'},
				{d:'a_right',s:'9_6'},
				{d:'a_bottom',s:'10_7'},
				{d:'a_left',s:'11_6'}
			]
		},
		kin:{
			techs:['1_1','3_1','5_1','7_1','9_1','11_1','9_3','7_5','5_7','3_7','3_5'],
			arrows:[
				{d:'a_bottom',s:'2_1'},
				{d:'a_bottom',s:'4_1'},
				{d:'a_bottom',s:'6_1'},
				{d:'a_bottom',s:'8_1'},
				{d:'a_bottom',s:'10_1'},
				{d:'a_tright',s:'10_2'},
				{d:'a_tright',s:'8_4'},
				{d:'a_tright',s:'6_6'},
				{d:'a_top',s:'4_7'},
				{d:'a_left',s:'3_6'}
			]
		},
		sen:{
			techs:['1_4','3_4','5_4','7_4','9_4'],
			arrows:[
				{d:'a_bottom',s:'2_4'},
				{d:'a_bottom',s:'4_4'},
				{d:'a_bottom',s:'6_4'},
				{d:'a_bottom',s:'8_4'},
			]
		},
		kg_normal:{
			techs:['4_2','2_4','4_6','6_6','6_4'],
			arrows:[
				{d:'a_tright',s:'3_3'},
				{d:'a_bright',s:'3_5'},
				{d:'a_bottom',s:'5_6'},
				{d:'a_left',s:'6_5'},
			]
		},
		kg_rinne:{
			techs:['4_2','2_4','4_6','6_6','6_4','6_2','8_2','8_4','8_6','10_4','12_2'],
			arrows:[
				{d:'a_tright',s:'3_3'},
				{d:'a_bright',s:'3_5'},
				{d:'a_bottom',s:'5_6'},
				{d:'a_left',s:'6_5'},
				{d:'a_left',s:'6_3'},
				{d:'a_bottom',s:'7_2'},
				{d:'a_right',s:'8_3'},
				{d:'a_right',s:'8_5'},
				{d:'a_bleft',s:'9_5'},
				{d:'a_bleft',s:'11_3'}
			]
		},
		kt:{
			techs:['2_4','4_2','4_4','4_6','6_4','8_2','8_4','8_6'],
			arrows:[
				{d:'a_bleft',s:'3_3'},
				{d:'a_right',s:'4_3'},
				{d:'a_right',s:'4_5'},
				{d:'a_bleft',s:'5_5'},
				{d:'a_bleft',s:'7_3'},
				{d:'a_right',s:'8_3'},
				{d:'a_right',s:'8_5'}
			]
		},
		kt_activators:{
			techs:['2_4','4_2','4_4','4_6','6_4','8_2','8_4','8_6','10_4'],
			arrows:[
				{d:'a_bleft',s:'3_3'},
				{d:'a_right',s:'4_3'},
				{d:'a_right',s:'4_5'},
				{d:'a_bleft',s:'5_5'},
				{d:'a_bleft',s:'7_3'},
				{d:'a_right',s:'8_3'},
				{d:'a_right',s:'8_5'},
				{d:'a_bleft',s:'9_5'},
			]
		},
		fuin:{
			techs:['4_2','2_4','4_6','6_6','6_4','6_2','8_2','8_4','8_6','10_4','12_2','12_4'],
			arrows:[
				{d:'a_tright',s:'3_3'},
				{d:'a_bright',s:'3_5'},
				{d:'a_bottom',s:'5_6'},
				{d:'a_left',s:'6_5'},
				{d:'a_left',s:'6_3'},
				{d:'a_bottom',s:'7_2'},
				{d:'a_right',s:'8_3'},
				{d:'a_right',s:'8_5'},
				{d:'a_bleft',s:'9_5'},
				{d:'a_bleft',s:'11_3'},
				{d:'a_right',s:'12_3'}
			]
		}
	}
}
GAME.curvy_cnt=GAME.curvy.length-1,
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
//framerate func
var frame_time = 60/1000; // run the local game at 16ms/ 60hz
if('undefined' != typeof(global)) frame_time = 45; //on server we run at 45ms, 22hz
( function () {
	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
		window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
		window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
	}

	if ( !window.requestAnimationFrame ) {
		window.requestAnimationFrame = function ( callback, element ) {
			var currTime = Date.now(), timeToCall = Math.max( 0, frame_time - ( currTime - lastTime ) );
			var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if ( !window.cancelAnimationFrame ) {
		window.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };
	}
}());
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
GAME.parseEmots = function(str){
	if(str){
		var emots = new Array(
			[':lol',3],
			[':cry',4],
			[':saint',5],
			[':o',6],
			[':O',7],
			[':screwed',8],
			[':frog',20],
			[':embarrassed',11],
			[':sunglasses',13],
			[':likeaboss',14],
			[':devil',15],
			[':angry',18],
			[/:\?/i,9],
			[/:\(/i,10],
			[/:[pP]/i,12],
			[/;\)/g,16],
			[/;[dD]/g,17],
			[/:\|/i,19],
			[/:\)/i,1],
			[/:[dD]/i,2]
		);
		var len=emots.length;
		for (i = 0; i < len; i++) {
			str = str.replaceAll(emots[i][0], '<div class="emo b'+emots[i][1]+'"></div>');
		}
	}
	return str;
}
GAME.load_captcha = function(container,secure,once=0,reload=0){
	if(grecaptcha){
		if(once&&this.captcha[secure]) return false;
		if(!reload&&this.captcha[secure]) grecaptcha.reset();
		else{
			this.response[secure]=grecaptcha.render( $(container)[0], { sitekey : this.sitekey,theme:'light' });
			this.captcha[secure]=true;
			this.any_captcha=true;
		}
	}
}
GAME.getRandomInt = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
GAME.getTime = function(){
	return Math.floor(ts.now()/1000);
}
GAME.getmTime = function(){
	return ts.now();
}
GAME.parseServerTime = function(){
	var day = moment(ts.now());
	JQS.servt.text(day.format('HH')+':'+day.format('mm')+':'+day.format('ss'));
}
GAME.processServerTime = function(){
	var time=this.getTime();
	if(JQS.servt.length){
		var s=JQS.servt.text().split(':');
		s[2]=parseInt(s[2])+1;
		if(s[2]>=60){
			s[2]='00';
			s[1]=parseInt(s[1])+1;
			if(s[1]<10) s[1]='0'+s[1];
			if(s[1]>=60){
				s[1]='00';
				s[0]=parseInt(s[0])+1;
				if(s[0]<10) s[0]='0'+s[0];
				if(s[0]>=24){
					s[0]='00';
					s[1]='00';
					s[2]='00';
				}
			}
		}
		else{
			if(s[2]<10) s[2]='0'+s[2];
		}
		var seconds=parseInt(s[2])+parseInt(s[1])*60+parseInt(s[0])*3600;
		seconds++;
		JQS.servt.text(s.join(':'));
	}
	if(!this.stin_check||this.stin_check<time){
		this.stin_check=time+60;
		this.parseServerTime();
	}
}
GAME.komunikat = function(kom){
	if(this.koms.indexOf(kom)==-1){
		if(this.komc>50) this.komc=40;
		var ind=this.koms.push(kom)-1;
		JQS.kcc.append('<div class="kom" style="top:'+this.komc+'%"><div class="close_kom close_koment" data-ind="'+ind+'"><b>X</b></div><div class="content">'+kom+'</div></div>');
		this.komc++;
		kom_close_bind();
	}
}
GAME.redirect = function(path,deley){
	setTimeout(function () {
       window.location.href = path; 
    }, deley); 
}
GAME.toFix = function(i){
 var str='';
 do{
   let a = i%10;
   i=Math.trunc(i/10);
   str = a+str;
 }while(i>0)
 return str;
}
GAME.abbreviateNumber = function(number, decPlaces=0) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10,decPlaces);

    // Enumerate number abbreviations
    var abbrev = ["K", "M", "Mld","B","Bld","T","Quad","Quin","Sext","Sep","Oct","Non","Dec","Und","Duo","Tre","Quat","Quind","Sexd","Sept","Octo","Nove","Vigi"];

    // Go through the array backwards, so we do the largest first
    for (var i=abbrev.length-1; i>=0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10,(i+1)*3);

        // If the number is bigger or equal do the abbreviation
        if(size <= number) {
             // Here, we multiply by decPlaces, round, and then divide by decPlaces.
             // This gives us nice rounding to a particular decimal place.
             number = Math.floor(number*decPlaces/size)/decPlaces;

             // Handle special case where we round up to the next abbreviation
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }

             // Add the letter for the abbreviation
             number += ' '+abbrev[i];

             // We are done... stop
             break;
        }
    }
    return number;
}
GAME.number_format = function(number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
	if((number+'').length>=20) return this.abbreviateNumber(number);
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
GAME.dots = function(val){
	return this.number_format(val,0,'',' ');
}
GAME.initiate = function(){
	$('#player_login').text(this.login);
	$('#game_win').show();
	if(this.char_id==0&&this.pid>0){
		this.emitOrder({a:1});
	}
	var len=this.servers.length,con='';
	for(var i=0;i<len;i++){
		con+='<option value="'+this.servers[i]+'">'+LNG['server'+this.servers[i]]+'</option>';
	}
	$('#available_servers').html(con);
	$('#available_servers option[value='+this.server+']').prop('selected',true);
}
GAME.animate = function() {
	var parent=this;
	if(this.map.animate&&this.maploaded) this.draw_map();
	requestAnimationFrame(function(){
		parent.animate();
	});
}
GAME.draw_minimap = function(){
	this.minimap.ctx.clearRect(0, 0 ,this.minimap.canvas.width, this.minimap.canvas.height);
	this.drawMiniMap();
}
GAME.draw_map = function(){
	if(this.map.ctx){
		this.map.ctx.clearRect(0, 0 ,this.map.canvas.width, this.map.canvas.height);
		this.drawSmallMap();
	}
}
GAME.emit = function(order,data,force){
	if(!this.is_loading||force){
		this.load_start();
		this.socket.emit(order,data);
	}
	else if(this.debug) console.log('failed order',order,data);
}
GAME.emitOrder = function(data,force=false){
	this.emit('ga',data,force);
}
GAME.load_start = function(){
	this.is_loading=true;
	JQS.ldr.finish().fadeIn();
}

GAME.load_stop = function(){
	this.is_loading=false;
	JQS.ldr.finish().fadeOut();
}
GAME.rebPref = function(reborn){
	switch(reborn){
		case 1: return '<span class=r'+reborn+'>R</span>'; break;
		case 2: return '<span class=r'+reborn+'>G</span>'; break;
		case 3: return '<span class=r'+reborn+'>U</span>'; break;
		case 4: return '<span class=r'+reborn+'>S</span>'; break;
		default: return ''; break;
	}
}
GAME.floatingBind = function(){
	if(this.animations_off){
		clearTimeout(this.noanitim);
		this.noanitim=setTimeout(function () {
			$('.floating').remove();
		}, 2000);
	}
	else $('.floating').finish().animate({'opacity':0,top:'-=50px'},2000);
}
GAME.parseFightResult = function(result,quick=0,reward={}){
	var res='';
	if(quick){
		this.fight_reward=reward;
		res+=this.fightReward(1,result.result);
	}
	JQS.mko.html(res);
	if(quick) this.floatingBind();
}
GAME.removeMob = function(remove_mob){ //mob_num,mob_rank];
	var cnt=remove_mob[1].length;
	for(var m=0;m<cnt;m++){
		var rank=remove_mob[1][m];
		this.field_mobs[remove_mob[0]].ranks[rank]--;
	}
	this.showMobList();
}
GAME.parseBB = function(str){
	if(str){
		var search = new Array(
			/&/g,
			/>/g,
			/</g,
			/"/g,
			/\[b\](.*?)\[\/b\]/g,  
			/\[i\](.*?)\[\/i\]/g,
			/\[u\](.*?)\[\/u\]/g,
			/\[s\](.*?)\[\/s\]/g,
			/\[ul\]([\s\S]*?)\[\/ul\]/gm,
			/\[li\](.*?)\[\/li\]/g,
			/\[ol\]([\s\S]*?)\[\/ol\]/gm,
			/\[table\]([\s\S]*?)\[\/table\]/gm,
			/\[tr\]([\s\S]*?)\[\/tr\]/g,
			/\[td\](.*?)\[\/td\]/g,
			/\[center\]([\s\S]*?)\[\/center\]/gmi,
			/\[left\]([\s\S]*?)\[\/left\]/gm,
			/\[right\]([\s\S]*?)\[\/right\]/gm,
			/\[font\=?(.*?)?\]([\s\S]*?)\[\/font\]/g,
			/\[size\=?(.*?)?\]([\s\S]*?)\[\/size\]/g,
			/\[color\=?(.*?)?\]([\s\S]*?)\[\/color\]/g,
			/\[quote]([\s\S]*?)\[\/quote\]/g,
			/\n/g,
			/\\/g
		);
		var replace = new Array(
			'&amp;',
			'&gt;',
			'&lt;',
			'&quot;',
			'<strong>$1</strong>',
			'<em>$1</em>',
			'<u>$1</u>',
			'<s>$1</s>',
			'<ul>$1</ul>',
			'<li>$1</li>',
			'<ol>$1</ol>',
			'<table>$1</table>',
			'<tr>$1</tr>',
			'<td>$1</td>',
			'<div align="center">$1</div>',
			'<div align="left">$1</div>',
			'<div align="right">$1</div>',
			'<font face="$1">$2</font>',
			'<font size="$1">$2</font>',
			'<font color="$1">$2</font>',
			'<blockquote>$1</blockquote>',
			'<br />',
			''
		);
		for (i = 0; i < search.length; i++) {
			str = str.replaceAll(search[i], replace[i]);
		}
	}
	return str;
}
GAME.minimapToggle = function(){
	if(this.minimap.active){
		this.minimap.active=false;
		$('#minimap_con').fadeOut();
	}
	else{
		this.minimap.active=true;
		$('#minimap_con').fadeIn();
	}
}
GAME.showSpecialList = function(){
	var con='',any=false;
	if(this.field_wanted){
		any=true;
		con+='<div><div class="mob_tab d'+this.png_color(this.char_data.level,this.field_wanted.level)+'" title="'+this.field_wanted.level+'"><div class="mob_rank r6"></div><b>'+this.field_wanted.name+'</b> <span>'+LNG.lab216+'</span> </div><button class="option map_bicon" data-option="mob_desc" data-rank="10" data-mob="'+this.field_wanted.id+'"><i class="in"></i></button><button class="option map_bicon" data-option="wanted_attack" data-mob_id="'+this.field_wanted.id+'"><i class="ca"></i></button></div>';
	}
	if(this.field_boss){
		any=true;
		con+='<div><div class="mob_tab d'+this.png_color(this.char_data.level,this.field_boss.level)+'" title="'+this.field_boss.level+'"><div class="mob_rank bi"></div><b>'+this.field_boss.name+'</b> <span>'+LNG.lab336+'</span> </div><button class="option map_bicon" data-option="mob_desc" data-rank="4" data-mob="'+this.field_boss.mob_id+'"><i class="in"></i></button><button class="option map_bicon" data-option="boss_attack" data-boss_id="'+this.field_boss.id+'"><i class="ca"></i></button></div>';
	}
	PJS.scr.innerHTML=con;
	return any;
}
GAME.prepareMobList = function(){
	var data=this.field_mobs,con='';
	if(data){
		var len=data.length;
		con='<div class="sekcja">'+LNG.lab183+'</div>';
		for(var i=0;i<len;i++){
			con+='<div id="mob_'+data[i].mob_id+'_mf" class="field_option">'+LNG.lab186+' <b>'+data[i][this.lang]+'</b></span> <button class="option pull-right newBtn" data-option="multi_attack" data-mob_id="'+i+'">'+LNG.lab187+'</button><div class="clr"></div></div>';
			var r=data[i].custom_rank;
			var mob_level=data[i].mob_level;
			var secbtn='';
			if(r&&(this.party||this.instance_data)) secbtn='<button class="option map_bicon" data-option="qroup_attack" data-mob_id="'+i+'" data-mob-rank="'+r+'"><i class="ga"></i></button>';
			else secbtn='<button class="option map_bicon" data-option="quick_attack" data-mob_id="'+i+'" data-mob-rank="'+r+'"><i class="qa"></i></button>';
			con+='<div id="mob_'+data[i].mob_id+'_rank_'+r+'"><div class="mob_tab" title="'+mob_level+'"><div class="diff d'+this.png_color(this.char_data.level,mob_level)+'"></div><div class="mob_rank r'+r+'"></div><b>'+data[i][this.lang]+'</b> <span>'+this.mobRank(r)+'</span>  <div id="mob_'+data[i].mob_id+'_rank_'+r+'_am" class="amount"></div></div><button class="option map_bicon common_mob_info" data-option="mob_desc" data-rank="'+r+'" data-mob="'+data[i].mob_id+'"><i class="in"></i></button><button class="option map_bicon common_mob_attack" data-option="common_attack" data-mob_id="'+i+'" data-mob-rank="'+r+'"><i class="ca"></i></button>'+secbtn+'</div>';
		}	
		this.field_mob_types=len;
	}
	PJS.cre.innerHTML=con;
	this.mobs_prepared=true;
}
GAME.showMobList = function(){
	var data=this.field_mobs;
	this.field_mob_id=0;
	if(data){
		var len=data.length;
		for(var i=0;i<len;i++){
			if(this.field_mf&&this.field_mf[i]>=0){
				if(!this.mf[data[i].mob_id]||this.mf[data[i].mob_id]!=this.field_mf[i]){
					$('#mob_'+data[i].mob_id+'_mf').show();
					$('#mob_'+data[i].mob_id+'_mf_rank').text(this.mobRank(this.field_mf[i]));
					this.mf[data[i].mob_id]=this.field_mf[i];
				}
			}			
			else $('#mob_'+data[i].mob_id+'_mf').hide();
			var wasnt=true;
			for(var r=0;r<=3;r++){
				var amount='';
				var v=0;
				if(data[i].ranks[r]>0){
					v=1;
					if(r==0) this.field_mob_id=i;
					var con=document.getElementById('mob_'+data[i].mob_id+'_rank_'+r+'_am');
					if(con) con.innerText='x '+data[i].ranks[r];
				}
				else v=0;
				if(!this.md.hasOwnProperty(data[i].mob_id+'_'+r)||this.md[data[i].mob_id+'_'+r]!=v){
					this.md[data[i].mob_id+'_'+r]=v;
					if(v) $('#mob_'+data[i].mob_id+'_rank_'+r+'').show();
					else $('#mob_'+data[i].mob_id+'_rank_'+r+'').hide();
				}
			}
		}	
	}
	
}
GAME.pushNotification = function(kom,duration=3000){
	this.noti_cnt++;
	$('#noti_con').prepend('<div id="noti_'+this.noti_cnt+'" class="notification"><div class="sep"></div>'+kom+'</div>');
	var con=$('#noti_'+this.noti_cnt);
	con.slideDown();
	page_bind();
	setTimeout(function () {
		con.addClass('blinking');
	}, duration);
	setTimeout(function () {
		con.fadeOut(500,function(){
			$(this).remove();
		});
	}, duration+1000);
}
GAME.parseArenaPlayer = function(i,entry,pvp_master){
	var res='';
	if(entry.data&&entry.data.id){
		var pd=entry.data;
		var qb='<button class="option map_bicon" data-option="show_player" data-char_id="'+pd.id+'"><i class="in"></i></button>';
		var cls='';
		var klan='',erank='';
		if(pd.klan_id){
			klan='<b class="poption player_clan" data-option="show_clan" data-klan_id="'+pd.klan_id+'"><img src="'+pd.emblem+'" /> '+pd.surname+'</b>';
		}
		if(entry.cd){
			qb+=this.showTimer(entry.cd-this.getTime(),'data-special="10" data-pd="'+pd.id+'"',' playercd'+pd.id+'');
			cls='initial_hide_forced playericons'+pd.id;
		}
		if(pd.village_id){
			erank='<img src="/gfx/villages/head/'+pd.village_id+'.png" class="vill_head" />';
		}
		qb+='<button class="option map_bicon '+cls+'" data-option="arena_attack" data-index="'+i+'"><i class="pa"></i></button>';
		if(pvp_master) qb+='<button class="option map_bicon '+cls+'" data-option="arena_attack" data-index="'+i+'" data-quick="1"><i class="qa"></i></button>';
		res+='<div class="player"><div class="mob_tab">'+klan+' <strong class="player_rank'+pd.ranga+'">'+pd.name+'</strong> <span>'+this.rebPref(pd.reborn)+pd.level+'</span>'+erank+'</div><div id="pvp_opts_'+pd.id+'" class="right_btns">'+qb+'</div><div class="adbelka">['+pd.arena_lvl+'] <span class="grey">'+LNG['arena_rank'+pd.arena_lvl]+'</span></div></div>';
	}
	return res;
}
GAME.parseListPlayer = function(entry,pvp_master){
	var res='';
	if(entry.data){
		var pd=entry.data;
		var qb='<button class="poption map_bicon" data-option="show_player" data-char_id="'+pd.id+'"><i class="in"></i></button>';
		var klan='',erank='';
		if(pd.klan_id){
			var cls='';
			if(this.clan_enemies.indexOf(pd.klan_id)!=-1) cls='enemy';
			klan='<b class="poption player_clan '+cls+'" data-option="show_clan" data-klan_id="'+pd.klan_id+'"><img src="'+pd.emblem+'" /> '+pd.surname+'</b>';
		}
		var cls='';
		if(entry.cd){
			qb+=this.showTimer(entry.cd-this.getTime(),'data-special="10" data-pd="'+pd.id+'"',' playercd'+pd.id+'');
			cls='initial_hide_forced playericons'+pd.id;
		}
		if(pd.village_id){
			var cls2='',head='head';
			if(this.emp_enemies.indexOf(pd.village_id)!=-1||this.org_enemies.indexOf(pd.org)!=-1) cls2='war';
			if(pd.ranga==8) head='nuk';
			erank='<img src="/gfx/villages/'+head+'/'+pd.village_id+'.png" class="vill_head '+cls2+'" />';
		}
		qb+='<button class="poption map_bicon '+cls+'" data-option="pvp_attack" data-char_id="'+pd.id+'"><i class="pa"></i></button>';
		if(pvp_master) qb+='<button class="poption map_bicon '+cls+'" data-option="pvp_attack" data-char_id="'+pd.id+'" data-quick="1"><i class="qa"></i></button>';
		res+='<div class="player"><div class="mob_tab">'+klan+' <strong class="player_rank'+pd.ranga+'">'+pd.name+'</strong> <span>'+this.rebPref(pd.reborn)+pd.level+'</span>'+erank+'</div><div id="pvp_opts_'+pd.id+'" class="right_btns">'+qb+'</div></div>';
	}
	else if(entry.more){
		res+='<button class="more_players poption" data-option="load_more_players" data-start_from="'+entry.next_from+'">+'+entry.more+'</div>';
	}
	return res;
}
GAME.parsePlayerShadow = function(data,pvp_master){
	var entry=data.data;
	var res='';
	if(entry.data){
		var pd=entry.data;
		pd.village_id=entry.village_id;
		var qb='<button class="poption map_bicon" data-option="show_player" data-char_id="'+pd.id+'"><i class="in"></i></button>';
		var erank='';
		var cls='';
		if(data.cd){
			qb+=this.showTimer(data.cd-this.getTime(),'data-special="10" data-pd="'+pd.id+'"',' playercd'+pd.id+'');
			cls='initial_hide_forced playericons'+pd.id;
		}
		if(pd.village_id){
			var cls2='',head='head';
			if(this.emp_enemies.indexOf(pd.village_id)!=-1||this.org_enemies.indexOf(pd.org)!=-1) cls2='war';
			if(pd.ranga==8) head='nuk';
			erank='<img src="/gfx/villages/'+head+'/'+pd.village_id+'.png" class="vill_head '+cls2+'" />';
		}
		qb+='<button class="poption map_bicon '+cls+'" data-option="gpvp_attack" data-char_id="'+pd.id+'"><i class="pa"></i></button>';
		if(pvp_master) qb+='<button class="poption map_bicon '+cls+'" data-option="gpvp_attack" data-char_id="'+pd.id+'" data-quick="1"><i class="qa"></i></button>';
		res+='<div class="player"><div class="mob_tab"><strong class="player_rank'+pd.ranga+'">'+pd.name+' - '+LNG.lab348+'</strong> <span>'+this.rebPref(pd.reborn)+pd.level+'</span>'+erank+'</div><div id="gpvp_opts_'+pd.id+'" class="right_btns">'+qb+'</div></div>';

		//res+='<div class="player"><div class="belka">'+erank+'<strong class="player_rank'+pd.ranga+' poption" data-option="show_player" data-char_id="'+pd.id+'">'+pd.name+' - '+LNG.lab348+'</strong> <span>'+this.rebPref(pd.reborn)+pd.level+'</span> </div><div id="gpvp_opts_'+pd.id+'" class="right_btns">'+qb+'</div></div>';
	}
	else if(entry.more){
		res+='<button class="more_players poption" data-option="load_more_players" data-start_from="'+entry.next_from+'">+'+entry.more+'</div>';
	}
	return res;
}
GAME.loadMorePlayers = function(more){
	var data=more;
	var pvp_master=false;
	if(this.premiumBonus(13)) pvp_master=true;
	var len=data.length;
	var con='';
	for(var i=0;i<len;i++){
		con+=this.parseListPlayer(data[i],pvp_master);
	}	
	PJS.plc.insertAdjacentHTML('beforeend',con);
	pvp_option_bind();
}
GAME.showPlayerList = function(){
	var con='';
	var data=this.field_players;
	var pvp_master=false;
	if(this.premiumBonus(13)) pvp_master=true;
	if(data){
		var len=data.length;
		for(var i=0;i<len;i++){
			con+=this.parseListPlayer(data[i],pvp_master);
		}	
		any=true;
	}
	var data=this.field_shadows;
	if(data){
		var len=data.length;
		for(var i=0;i<len;i++){
			con+=this.parsePlayerShadow(data[i],pvp_master);
		}	
		any=true;
	}
	PJS.plc.innerHTML=con;
	pvp_option_bind();
}
GAME.levelReqCheck = function(req_lvl,req_reborn){
	var res=false;
	if(req_reborn<this.char_data.reborn) res=true;
	else if(req_reborn==this.char_data.reborn&&req_lvl<=this.char_data.level) res=true;
	return res;
}
GAME.showFieldData = function(x,y){
	var con='';
	var any=false;
	this.spacebind=false;
	if(this.field_res.tps){
		var len=this.field_res.tps.length;
		for(var i=0;i<len;i++){
			any=true;
			var tp=this.field_res.tps[i];
			var req='';
			var reqf=true;
			if(tp.lvl_req){
				var cls='red';
				if(this.levelReqCheck(tp.loc_data.level,tp.loc_data.reborn)) cls='green';
				else reqf=false;
				req+=LNG.lab24+' '+this.rebPref(tp.loc_data.reborn)+'<span class="'+cls+'">'+tp.loc_data.level+'</span><br />';
			}
			if(tp.need_quest){
				var cls='red';
				if(tp.quest_done) cls='green';
				else reqf=false;
				req+=LNG.lab85+' <span class="'+cls+'">'+tp.q[this.lang_data.quests[this.lang]]+'</span><br />';
			}
			var btn='';
			if(reqf){
				btn='<button id="use_loc_tp'+i+'" class="option newBtn pull-right" data-option="use_loc_tp" data-tpid="'+i+'">'+LNG.lab87+'</button>';
				this.spacebind='#use_loc_tp'+i;
			}
			con+='<div class="sekcja">'+LNG.lab184+'</div><div class="field_option">'+LNG.lab86+' <b>'+tp.loc_data[this.lang]+'</b> ['+tp.target_x+'|'+tp.target_y+'] '+btn+'<br /> '+req+' </div>';
		}
	}
	if(this.field_npcs&&this.field_npcs.length){
		var len=this.field_npcs.length;
		for(var i=0;i<len;i++){
			var btns='';
			if(this.field_npcs[i].exchange_id>0) btns='<button class="option newBtn" data-option="open_exchange" data-npc="'+i+'"><img src="/gfx/icons/npc_exch.png" /> '+LNG.lab439+'</button>';
			con+='<div class="field_option"><img src="/gfx/icons/mob_special.png" /> <b>'+this.field_npcs[i][this.lang_data['lokacje'][this.lang]]+'</b> <div class="pull-right">'+btns+'</div><br /><i>'+this.field_npcs[i][this.lang_data['dialog'][this.lang]]+'</i></div>';
		}
			any=true;
	}
	if(this.map_castles&&this.map_castles[x+'_'+y]){
		var data=this.map_castles[x+'_'+y],owner=LNG.prank0,time=this.getTime();
		var stat1=data.bonus*data.level;
		any=true;
		if(data.klan_id) owner='<strong class="orange option" data-option="show_clan" data-klan_id="'+data.klan_id+'">'+data.klan_name+'</strong>';
		con+='<div class="sekcja">'+LNG.lab185+'</div><div class="field_option"><h5>'+LNG.lab88+'</h5>'+LNG.lab89+': <b>'+data.level+'</b><br />'+LNG.lab447+': '+owner+'<br /><br />'+LNG.lab90+':<br /><span class="green">'+stat1+'</span>'+this.item_stat(data.bonus_upgrade)+'<br />'+LNG.lab448+': '+this.showTimer(data.next_reward-time)+'<br /><button class="btn_small_gold option" data-option="relic_attack">'+LNG.lab449+'</button></div>';
	}
	if(this.map_mines&&this.map_mines.coords[x+'_'+y]){
		var data=this.map_mines.coords[x+'_'+y];
		var len=data.length;
		var any2=false,tmp='',time=this.getTime();
		tmp+='<div class="sekcja">'+LNG.lab132+'</div>';
		for(var i=0;i<len;i++){
			if(data[i]){
				var restoring='',btn='';
				any=true;
				any2=true;
				var md=this.map_mines.mine_data[data[i][1]];
				if(data[i][2]>time){
					restoring=LNG.lab134+' '+this.showTimer(data[i][2]-time,'data-special="8" data-mid="'+data[i][0]+'"');
				}
				else btn='<button id="mining_btn_'+data[i][0]+'" class="pull-right option btn_small_gold" data-option="start_mine" data-mid="'+data[i][0]+'">'+LNG.lab133+'</button>';
				tmp+='<div class="field_option"><b class="green">'+md[this.lang_data['lokacje'][this.lang]]+'</b>'+btn+'<br />('+LNG.lab36+' <span class="orange">'+Math.min(md.chance+this.getStat(121),100)+'%</span>)<br /><span id="mining_res_'+data[i][0]+'">'+restoring+'</span><br /><div id="mining_mbar_'+data[i][0]+'" class="progress_bar initial_hide"><div id="mining_bar_'+data[i][0]+'"></div><i id="mining_pr_'+data[i][0]+'"></i></div></div>';
			}
		}
		tmp+='<div class="clr"></div></div>';
		if(any2) con+=tmp;
	}
	if(this.map_quests&&this.map_quests[x+'_'+y]&&this.map_options.vo[1]){
		var data=this.map_quests[x+'_'+y];
		var len=data.length;
		var any2=false,tmp='';
		tmp+='<div class="sekcja">'+LNG.lab109+'</div>';
		for(var i=0;i<len;i++){
			if(data[i]){
				any=true;
				any2=true;
				var add='';
				if(data[i].main) add+='<span>'+LNG.lab113+'</span>';
				if(data[i].rtype==1) add+='<span>'+LNG.lab182+'</span>';
				tmp+='<div id="field_q_'+data[i].qb_id+'" class="field_quest option" data-option="show_quest" data-qb="'+data[i].qb_id+'"><div class="qperfix m'+data[i].main+' rt'+data[i].rtype+'"></div>'+data[i].name+' '+add+'</div>';
				this.spacebind='#field_q_'+data[i].qb_id;
			}
		}
		tmp+='</div>';
		if(any2) con+=tmp;
	}
	JQS.qcc.hide();
	PJS.fol.innerHTML=con;
	return any;
}
GAME.quest_want = function(res,qid,full=0){
	var warunek=res.type,want_id=res.id,want_ile=res.amount;
	var rheader=LNG['quest_req'+warunek];
	var need='',percent=false;
	if(res.name) need=res.name;
	if(res.canbeanymob&&res.id==0) need=LNG.lab110;
	switch(warunek){
		case 3:
			need='<div class="ekw_slot" data-toggle="tooltip" data-original-title="'+res.name+'"><img src="/gfx/items/quest.png" /></div>';
		break;
		case 23:
		case 24:
			need='<div class="ekw_slot" data-toggle="tooltip" data-original-title="'+res.name+'"><img src="'+res.gfx+'" /></div>';
		break;
		case 4: need+='<img src="/gfx/gold.png" />'; break;
		case 5:
			if(res.name2) need+=' '+LNG.lab111+' '+res.name2;
		break;
		case 6:
			need=this.showTimer(res.count-this.getTime());
			if(full&&!res.is_met&&res.helpers&&res.helpers&&!this.instance_data){
				this.compress_items=res.helpers;
				need+='<button class="newBtn option pull-right" data-option="compress_items" data-qb_id="'+res.qbid+'">'+LNG.lab199+'</button>';
			}
		break;
		case 7:
			var cls='';
			need+='<br />';
			if(!res.is_met){
				if(res.lock){
					need+='<div class="quest_duel_lock">'+LNG.lab128+': '+this.showTimer(res.lock-this.getTime(),' data-special="6"')+'</div>';
					cls='disabled';
				}
				need+='<button class="option quest_btn big_button" data-option="quest_duel" data-qid="'+res.qbid+'" '+cls+'>'+LNG.lab114+'</button><button class="option map_bicon" data-option="mob_desc" data-mob="'+res.mob_duel+'" data-rank="0"><i class="in"></i></button>'; 
			}
		break;
		case 8:
			need=' <b class="ranga'+res.id+'">'+LNG['player_rank'+res.id]+'</b>';
			res.maxv=0;
		break;
		case 13:
			need=' <b class="ranga'+res.id+'">'+LNG['player_rank'+res.id]+'</b>';
			res.maxv=0;
		break;
		case 14:
			need=' <b class="ranga'+res.id+'">'+LNG['player_rank'+res.id]+'</b>';
			res.maxv=0;
		break;
		case 15: need+='<b>'+LNG['ninja_class'+res.id]+'</b>'; break;
		case 16: need+='<img src="/gfx/kk.png" />'; break;
		case 17: need+='<b>'+LNG['village'+res.id]+'</b>'; break;
		case 18: need+='<b class="ranga'+res.id+'">'+LNG['player_rank'+res.id]+'</b>'; break;
		case 25:
			need='<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+res.id+'"><img src="'+res.gfx+'" /></div>';
		break;
		case 26: need+='<b>'+LNG['kg'+res.id]+'</b>'; break;
		case 27: need+='<b>'+LNG['kt'+res.id]+'</b>'; break;
		case 39:
			if(res.is_met){
				this.quest_action=0;
			}
			else{
				this.quest_action=1;
				this.quest_action_tmp=0;
				this.quest_action_start=res.count;
				this.quest_action_count=res.count;
				this.quest_action_max=res.maxv;
				this.quest_action_qid=res.qbid;
				var pr=Math.min(res.count/res.maxv*100,100);
				if(full) need+='<br /><div class="progress_bar"><div id="quest_bar_val" style="width:'+pr+'%"></div><span id="quest_bar_val_span"></span></div><button class="option big_button" data-option="quest_action">'+LNG.lab131+'</button>';
			}
		break;
		case 40:
			if(res.is_met) need+=LNG.lab129;
			else{
				need+='<input type="text" id="quest_riddle" placeholder="'+LNG.lab130+'" /><button class="option newBtn" data-option="quest_riddle" data-qid="'+res.qbid+'">OK</button>';
			}
		break;
	}
	var counter='',cls='red';
	if(res.is_met) cls='green';
	if(res.maxv) counter='<span class="quest_warunek'+qid+'" data-count="'+res.count+'" data-max="'+res.maxv+'">'+this.dots(res.count)+'/'+this.dots(res.maxv)+'</span>'
	if(percent) counter+='%';
	var con=rheader+' <strong class="'+cls+'">'+need+' '+counter+'</strong>';
	return con;
}
GAME.quest_prize = function(res){
	var id=res.type,id2=res.id,ile=res.amount;
	switch(id){
		case 1: return '<b>'+this.dots(id2)+'</b> <i class="ico exp"></i> '+LNG['quest_prize'+id]; break; //Doświadczenie
		case 2: return '<b>'+this.dots(id2)+'</b> <img src="/gfx/gold.png" /> '+LNG['quest_prize'+id]; break;  //złoto
		case 3: return '<div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt><b>'+res.name+'</b></div>"><img src="/gfx/items/quest.png" /></div>'; break; //material
		case 4: return LNG['quest_prize'+id]; break; //special
		case 5: return LNG['quest_prize'+id]+' <b class="ranga'+id2+'">'+LNG['player_rank'+id2]+'</b>'; break; //swoli
		case 6: 
			return '<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+id2+'"><img src="'+res.gfx+'" /></div>';
		break;
		case 7: return '<b>'+this.dots(id2)+'</b> '+LNG['quest_prize'+id]; break;
		case 8: return '<b>'+this.dots(id2)+'</b> '+LNG['quest_prize'+id]; break;
		case 9: return '<b>'+this.dots(id2)+'</b> <i class="ico tai"></i> '+LNG['abi_tai']; break;
		case 10: return '<b>'+this.dots(id2)+'</b> <i class="ico ken"></i> '+LNG['abi_ken']; break;
		case 11: return '<b>'+this.dots(id2)+'</b> <i class="ico shuriken"></i> '+LNG['abi_shuriken']; break;
		case 12: return '<b>'+this.dots(id2)+'</b> <i class="ico nin"></i> '+LNG['abi_nin']; break;
		case 13: return '<b>'+this.dots(id2)+'</b> <i class="ico gen"></i> '+LNG['abi_gen']; break;
		case 14: return '<b>'+this.dots(id2)+'</b> <i class="ico kin"></i> '+LNG['abi_kin']; break;
		case 20: return LNG['quest_prize'+id]+' <b>'+res.name+'</b>';  break;
		case 21: return '<b>'+this.dots(id2)+'</b> <img src="../gfx/kk.png" align="absmiddle" />'; break; //kk
		case 22: return LNG['quest_prize'+id]+' <b>'+id2+'</b>'; break; 
		case 23: return LNG['quest_prize'+id]+' +<b>'+id2+'</b>'; break; 
		case 24: return LNG['quest_prize'+id]+': <b>'+id2+'</b>'; break; 
		case 25: return '<div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt><b>'+res.name+'</b></div>"><img src="/gfx/items/mats/'+id2+'.png" /></div>'; break; //material
		case 26: return '<b>'+this.dots(res.exp)+'</b> <i class="ico exp"></i> '+LNG['quest_prize'+id]; break; //Doświadczenia
		case 27: return '<b>'+id2+'</b> '+LNG['quest_prize'+id]; break; 
		case 28: return '<b>'+id2+'</b> '+LNG['quest_prize'+id]; break; 
		case 29: return '<b>'+id2+'</b> '+LNG['quest_prize'+id]; break; 
		case 30: return '<b>'+this.dots(id2)+'</b> <i class="ico sen"></i> '+LNG['abi_sen']; break;
		case 31: return '<b>'+id2+'</b> '+LNG['quest_prize'+id]; break; //pkt teleportacji
		case 32: return '<div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt><b>'+res.name+'</b></div>"><img src="/gfx/items/cons/'+id2+'.png" /><div>'+ile+'</div></div>'; break; //usable
		case 34: return LNG['quest_prize'+id]; break; //insta end
		case 35: return '<b>'+id2+'</b> '+LNG['quest_prize'+id]; break; 
		case 36: return '<b>'+id2+'</b> '+LNG['quest_prize'+id]; break; 
		case 37: return '<b>'+id2+'</b> '+LNG['quest_prize'+id]; break; 
		case 38: return '<b>'+this.dots(id2)+'</b> <i class="ico fuin"></i> '+LNG['abi_fuin']; break;
		case 39: return LNG['quest_prize'+id]; break; 
		case 40: return LNG['quest_prize'+id]; break; 
		case 41: return LNG['quest_prize'+id]+': <b style="color:'+res.color+';">'+res.name+'</b>'; break; //Tytuł
		case 42: return '<b>'+id2+'</b>% '+LNG['quest_prize'+id]; break; 
		case 43: return '<b>'+this.dots(id2)+'</b> '+LNG['quest_prize'+id]; break; 
		case 44: return LNG['quest_prize'+id]+' <b>'+LNG['premium_bon'+id2]+'</b> - '+this.convertSeconds(ile)+''; break; 
		default: return ''; break; //[brak]
	}
}
GAME.endQuest = function(quest_end){
	JQS.qcc.hide();
	$('#field_q_'+quest_end).fadeOut();
	for(var ind in this.map_quests){
		if(this.map_quests.hasOwnProperty(ind)){
			var len=this.map_quests[ind].length;
			for(var i=0;i<len;i++){
				if(this.map_quests[ind][i].qb_id==quest_end){
					this.map_quests[ind][i].end=1;
				}
			}
		}
	}
}
GAME.moveQuest = function(quest_move){
	if(this.char_data.loc==quest_move.loc){
		JQS.qcc.hide();
		$('#field_q_'+quest_move.qb_id).fadeOut();
		for(var ind in this.map_quests){
			if(this.map_quests.hasOwnProperty(ind)){
				var len=this.map_quests[ind].length;
				for(var i=0;i<len;i++){
					if(this.map_quests[ind][i].qb_id==quest_move.qb_id){
						this.map_quests[ind][i].move={new_x:quest_move.x,new_y:quest_move.y,start:this.getmTime(),duration:300};
					}
				}
			}
		}
	}
	else this.endQuest(quest_move.qb_id);
}
GAME.next_arena = function(lvl){
	var exp=0;
	switch(lvl){
		case 1: exp=1; break;
		case 2: exp=5; break;
		case 3: exp=10; break;
		case 4: exp=20; break;
		case 5: exp=30; break;
		case 6: exp=60; break;
		case 7: exp=120; break;
		case 8: exp=240; break;
		case 9: exp=480; break;
		case 10: exp=960; break;
		case 11: exp=1920; break;
		case 12: exp=3840; break;
		case 13: exp=4000; break;
		case 14: exp=5000; break;
		case 15: exp=6000; break;
		case 16: exp=7000; break;
		case 17: exp=8000; break;
		case 18: exp=10000; break;
		case 19: exp=13000; break;
		case 20: exp=16000; break;
		case 21: exp=20000; break;
		case 22: exp=30000; break;
		default: exp=99999; break;
	}
	return exp;
}
GAME.parseQuest = function(res){
	var quest=res.q_step;
	var con='<div class="quest_win"><h3 class="content_header">'+quest.header+'</h3><div class="option close_kom" data-option="close_quest"><b>X</b></div><div class="quest_desc"><span class="qtitle">&raquo; '+quest.title+'</span><br />'+this.parseContent(quest.content).replaceAll('&player','<b class="orange">'+this.char_data.name+'</b>').replaceAll('&Player','<b class="orange">'+this.char_data.name+'</b>').replaceAll('$player','<b class="orange">'+this.char_data.name+'</b>')+'</div>';
	var qrdy=true;
	var conf='';
	if(quest.want){
		con+='<div class="quest_desc">';
		qrdy=quest.want.is_met;
		con+='<div><b>'+LNG.lab18+'</b>:<br />'+this.quest_want(quest.want,quest.qb_id,1)+'</div>';
		if(quest.time_limit){
			con+='<div>'+LNG.lab145+': '+this.showTimer(quest.want.tl-this.getTime())+'<button class="newBtn option" data-option="quest_try_again" data-qb_id="'+quest.qb_id+'">'+LNG.lab146+'</button></div>';
		}
		con+='</div>';
	}
	if(quest.prize){
		con+='<div class="quest_desc"><b>'+LNG.lab21+'</b>:<br />'+this.quest_prize(quest.prize)+'</div>';
		if(quest.prize.type>=99) conf='data-confirm="1"';
	}
	if(qrdy){
		con+='<button class="option newBtn3" data-option="finish_quest" '+conf+' data-button="1" data-qb_id="'+quest.qb_id+'">'+quest.buttton1+'</button>';
		if(quest.buttton2) con+='<button class="option newBtn3" data-option="finish_quest" data-button="2" data-qb_id="'+quest.qb_id+'">'+quest.buttton2+'</button>';
		if(quest.buttton3) con+='<button class="option newBtn3" data-option="finish_quest" data-button="3" data-qb_id="'+quest.qb_id+'">'+quest.buttton3+'</button>';
	}
	con+='</div>';
	JQS.qcc.html(con).show();
	option_bind();
	main_ekw_item_bind();
	tooltip_bind();
}
GAME.parseFight = function(result){
	var parent=this;
	clearInterval(this.fight_timer);
	var report=result.report;
	console.log(report);
	var len=report.characters.length;
	this.report_chars=report.characters;
	var left_side='',right_side='';
	var rh={};
	for(var i=0;i<len;i++){
		var character=report.characters[i];
		
		character.max_hp=character.hp;
		character.max_mana=character.mana;
		character.max_natural_energy=character.natural_energy;
		var bfo='';
		if(character.char_id) bfo=' class="poption" data-option="show_player" data-char_id="'+character.char_id+'"';
		var html='<div class="fighter" id="fighter_'+i+'"><img src="'+character.avatar+'" alt="" /><b '+bfo+'>'+character.name+'</b><div class="fight_bar"><div id="hp_bar_'+i+'" class="hp"></div><span id="hp_val_'+i+'">'+this.dots(character.hp)+'</span></div><div class="fight_bar"><div id="mana_bar_'+i+'" class="mana"></div><span id="mana_val_'+i+'">'+this.dots(character.mana)+'</span></div>';
		if(character.natural_energy>0) html+='<div class="fight_bar"><div id="natural_bar_'+i+'" class="natural"></div><span id="natural_val_'+i+'">'+this.dots(character.natural_energy)+'</span></div>';
		html+='<div id="fighter_'+i+'_summons" class="char_summons"></div></div>';
		if(character.team==1) right_side+=html;
		else left_side+=html;
		rh[i]=character;
	}
	$('#fight_t0').html(left_side);
	$('#fight_t1').html(right_side);
	$('#fight_view').fadeIn();
	pvp_option_bind();
	JQS.fco.html('');
	this.fight_r=0;
	this.fight_characters=rh;
	this.fight_hits=report.hits;
	this.fight_reward=result.reward;
	this.fight_result=result.result;
	this.fight_tdmgs=report.tdmgs;
	this.fight_timer=setInterval(function(){ parent.fightProgress(); }, this.fight_speed);
}
GAME.hpChanged = function(i){
	if(this.fight_characters[i]){
		if(this.fight_characters[i].hp<0) this.fight_characters[i].hp=0;
		if(this.fight_characters[i].hp>this.fight_characters[i].max_hp) this.fight_characters[i].hp=this.fight_characters[i].max_hp;
		var w=Math.min(Math.floor(this.fight_characters[i].hp/this.fight_characters[i].max_hp*100),100);
		$('#hp_bar_'+i).css({'width':w+'%'});
		$('#hp_val_'+i).text(this.dots(this.fight_characters[i].hp));
	}
	else console.log('fight principant not found',i);
}
GAME.manaChanged = function(i){
	if(this.fight_characters[i]){
		if(this.fight_characters[i].mana<0) this.fight_characters[i].mana=0;
		if(this.fight_characters[i].mana>this.fight_characters[i].max_mana) this.fight_characters[i].mana=this.fight_characters[i].max_mana;
		var w=Math.min(Math.floor(this.fight_characters[i].mana/this.fight_characters[i].max_mana*100),100);
		$('#mana_bar_'+i).css({'width':w+'%'});
		$('#mana_val_'+i).text(this.dots(this.fight_characters[i].mana));
	}
	else console.log('fight principant not found',i);
}
GAME.naturalChanged = function(i){
	if(this.fight_characters[i]){
		if(this.fight_characters[i].natural_energy<0) this.fight_characters[i].natural_energy=0;
		var w=Math.min(Math.floor(this.fight_characters[i].natural_energy/this.fight_characters[i].max_natural_energy*100),100);
		$('#natural_bar_'+i).css({'width':w+'%'});
		$('#natural_val_'+i).text(this.dots(this.fight_characters[i].natural_energy));
	}
}
GAME.fightProgress = function(){
	if(this.fight_lock) return;
	var len=this.fight_hits.length;
	if(this.fight_hits[this.fight_r]){
		var hit=this.fight_hits[this.fight_r];
		var n=hit.aid;
		var t=hit.tid;
		var r=hit.r;
		if(!this.fight_characters[n]) console.log('fight principant',n, 'not specified!');
		var con='<div class="fight_team'+this.fight_characters[n].team+'">';
		if(hit.control_ends){
			var nname=this.fight_characters[n].name;
			var tname=this.fight_characters[t].name;
			con+='<span>'+nname+'</span> '+LNG.fight_label18+' <span>'+tname+'</span> !<br />';
		}
		if(hit.sealed_chakra_returns>0){
			var nname=this.fight_characters[n].name;
			console.log('test');
			this.fight_characters[n].mana+=hit.sealed_chakra_returns;
			this.manaChanged(n);
			con+='<span>'+nname+'</span> '+LNG.fight_label57+' - <b>'+this.dots(hit.sealed_chakra_returns)+'</b>!<br />';
		}
		if(hit.dot_type){
			var nname=this.fight_characters[n].name;
			var tname=this.fight_characters[t].name;
			if(hit.death_will){
				this.fight_characters[t].hp+=hit.dmg;
				con+='<span>'+tname+'</span> '+LNG['dot_type'+hit.dot_type]+' '+LNG.fight_label19+'!<br />';
			}
			else{
				con+='<span>'+tname+'</span> '+LNG['dot_type'+hit.dot_type]+' '+LNG.fight_label2+' <b>'+this.dots(hit.dmg)+'</b> '+LNG.fight_label1;
				if(hit.edmg) con+=' '+LNG.fight_label20+' <b>'+this.dots(hit.edmg)+'</b> '+LNG.fight_label21;
				con+='!<br />';
				this.fight_characters[t].hp-=hit.dmg;
				if(this.fight_characters[t].hp<0) this.fight_characters[t].hp=0;
			}
			if(hit.broken) con+='<b>'+LNG.fight_label58+'</b>';
			this.hpChanged(t);			
		}
		if(hit.heal){
			var nname=this.fight_characters[hit.heal[0]].name;
			con+='<span>'+nname+'</span> '+LNG.fight_label22+' <b>'+this.dots(hit.heal[1])+'</b> '+LNG.fight_label23+'! <br />';
			this.fight_characters[hit.heal[0]].hp+=hit.heal[1];
			this.hpChanged(hit.heal[0]);
		}
		if(hit.lock_break){
			var nname=this.fight_characters[n].name;
			con+='<span>'+nname+'</span> '+LNG.fight_label25+' !<br />';
		}
		if(hit.stun_type){
			var nname=this.fight_characters[n].name;
			con+='<span>'+nname+'</span> '+LNG['fight_stunt'+hit.stun_type]+' ';
			if(hit.stun_dmg){
				con+=LNG.fight_label2+' <b>'+this.dots(hit.stun_dmg)+'</b> '+LNG.fight_label1;
				this.fight_characters[n].hp-=hit.stun_dmg;
				this.hpChanged(n);
			}
			con+='<br />';
		}
		if(hit.energy_burn){
			var nname=this.fight_characters[n].name;
			con+='<span>'+nname+'</span> '+LNG.fight_label26+' <b>'+hit.energy_burn+'</b> '+LNG.fight_label23+'<br />';
			this.fight_characters[n].hp-=hit.energy_burn;
			this.hpChanged(n);
		}
		if(hit.no_chakra){
			con+='<span>'+this.fight_characters[hit.no_chakra[0]].name+'</span> '+LNG.fight_label52+' <b>'+hit.no_chakra[1]+'</b>, '+LNG.fight_label53+'<br />';
		}
		if(hit.blocked){
			var nname=this.fight_characters[hit.blocked[0]].name;
			var tname=this.fight_characters[hit.blocked[1]].name; 
			con+='<span>'+nname+'</span> '+LNG.fight_label31+' <span>'+tname+'</span> '+LNG.fight_label32+'!<br />';
		}
		else if(hit.blocked_tech){
			var nname=this.fight_characters[hit.blocked_tech[0]].name;
			var tname=this.fight_characters[hit.blocked_tech[1]].name; 
			con+='<span>'+nname+'</span> '+LNG.fight_label54+' <b>'+hit.blocked_tech[2]+'</b> '+LNG.fight_label55+' <span>'+tname+'</span>, '+LNG.fight_label56+'!<br />';
		}
		if(hit.normal_miss){
			var nname=this.fight_characters[hit.normal_miss[0]].name;
			var tname=this.fight_characters[hit.normal_miss[1]].name; 
			con+='<span>'+nname+'</span> '+LNG.fight_label7+' <span>'+tname+'</span> '+LNG.fight_label8+'!<br />';
		}
		else if(hit.skill_miss){
			var nname=this.fight_characters[hit.skill_miss[0]].name;
			var tname=this.fight_characters[hit.skill_miss[1]].name; 
			con+='<span>'+nname+'</span> '+LNG.fight_label28+' <b>'+hit.skill_miss[2]+'</b> '+LNG.fight_label29+' <span>'+tname+'</span> '+LNG.fight_label30+'!<br />';
		}
		else if(hit.attack){
			var nname=this.fight_characters[n].name;
			var tname=this.fight_characters[t].name;
			if(hit.attack.blinded) con+='<span>'+nname+'</span> '+LNG['fight_blind'+hit.attack.blinded]+'! <br />';
			if(hit.attack.aura_end) con+='<span>'+this.fight_characters[hit.attack.aura_end[0]].name+'</span> '+LNG.fight_label27+'! <br />';
			if(hit.attack.cummulated) con+=LNG.fight_label33+' <b>'+this.dots(hit.attack.cummulated)+'</b> '+LNG.fight_label34+'! <br />';
			if(hit.attack.heal){
				con+='<span>'+nname+'</span> '+LNG['fight_heal'+hit.attack.heal_label]+' <b>'+this.dots(hit.attack.heal)+'</b> '+LNG.fight_label23+'!<br />';
				this.fight_characters[n].hp+=hit.attack.heal;
				this.hpChanged(n);
			}
	
			if(hit.attack.labels){
				for(var j=0;j<hit.attack.labels.length;j++){
					con+=' ('+LNG['hit_effect'+hit.attack.labels[j]]+') ';
				}
			}
			if(hit.attack.use_tech){
				con+='<span>'+nname+'</span> '+LNG.fight_label10+'<br />'+this.showTech(hit.attack.use_tech.id,hit.attack.use_tech.c1,hit.attack.use_tech.c2,hit.attack.use_tech.level)+'';
			}
			if(hit.attack.normal_hit) con+='<span>'+nname+'</span> '+LNG.fight_label50+' - <br />';
			if(hit.attack.removeMana){
				this.fight_characters[hit.attack.removeMana[0]].mana-=hit.attack.removeMana[1];
				this.manaChanged(hit.attack.removeMana[0]);
			}
			if(hit.attack.addMana){
				this.fight_characters[hit.attack.addMana[0]].mana+=hit.attack.addMana[1];
				this.manaChanged(hit.attack.addMana[0]);
				con+='<span>'+this.fight_characters[hit.attack.addMana[0]].name+'</span> '+LNG.fight_label6+' <b>'+this.dots(hit.attack.addMana[1])+'</b> '+LNG.fight_label21+'! <br />';
			}
			if(hit.attack.block){
				con+='<span>'+tname+'</span> '+LNG.fight_label9+'! <br />';
			}
			else{
				var len2=hit.attack.hits.length;
				for(var i=0;i<len2;i++){
					if(hit.attack.hits[i].hasOwnProperty('target')) t=hit.attack.hits[i].target;
					tname=this.fight_characters[t].name;
					//con+='<span>'+nname+'</span> '+LNG.fight_label11+' '+LNG['fight_strike'+hit.attack.hits[i].type]+' ';
					if(hit.attack.hits[i].blocked){
						var nname=this.fight_characters[hit.attack.hits[i].blocked[0]].name;
						var tname=this.fight_characters[hit.attack.hits[i].blocked[1]].name; 
						con+='<span>'+tname+'</span> '+LNG.fight_label32+'!<br />';
					}
					else if(hit.attack.hits[i].blocked_tech){
						var nname=this.fight_characters[hit.attack.hits[i].blocked_tech[0]].name;
						var tname=this.fight_characters[hit.attack.hits[i].blocked_tech[1]].name; 
						con+='<span>'+tname+'</span> '+LNG.fight_label32+'!<br />';
					}
					if(hit.attack.hits[i].labels){
						for(var j=0;j<hit.attack.hits[i].labels.length;j++){
							con+='<small>'+LNG['hit_effect'+hit.attack.hits[i].labels[j]]+'</small><br />';
						}
					}
					if(hit.attack.hits[i].rebounded_dmg){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].rebounded_dmg[0]].name+'</span> '+LNG.fight_label36+' <b>'+this.dots(hit.attack.hits[i].rebounded_dmg[1])+'</b> '+LNG.fight_label37+'!<br />';
					}
					if(hit.attack.hits[i].chakra_shield){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].chakra_shield[0]].name+'</span> '+LNG.fight_label38+' <b>'+this.dots(hit.attack.hits[i].chakra_shield[2])+'</b> '+LNG.fight_label21+' '+LNG.fight_label39+' <span>'+this.fight_characters[hit.attack.hits[i].chakra_shield[1]].name+'</span>!<br />';
					}
					if(hit.attack.hits[i].chakra_abs){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].chakra_abs[0]].name+'</span> '+LNG.fight_label38+' <b>'+this.dots(hit.attack.hits[i].chakra_abs[1])+'</b> '+LNG.fight_label40+' <b>'+this.dots(hit.attack.hits[i].chakra_abs[2])+'</b> '+LNG.fight_label21+'!<br />';
					}
					if(hit.attack.hits[i].sprit_shield){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].sprit_shield[0]].name+'</span> '+LNG.fight_label38+' <b>'+this.dots(hit.attack.hits[i].sprit_shield[1])+'</b> '+LNG.fight_label41+' <b>'+this.dots(hit.attack.hits[i].sprit_shield[2])+'</b> '+LNG.fight_label21+'!<br />';
					}
					if(hit.attack.hits[i].add_cummulate){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].add_cummulate[0]].name+'</span> '+LNG.fight_label43+' <b>'+this.dots(hit.attack.hits[i].add_cummulate[1])+'</b>!<br />';
					}
					if(hit.attack.hits[i].life_steal){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].life_steal[0]].name+'</span> '+LNG.fight_label46+' <b>'+this.dots(hit.attack.hits[i].life_steal[1])+'</b> '+LNG.fight_label23+'!<br />';
						this.fight_characters[hit.attack.hits[i].life_steal[0]].hp+=hit.attack.hits[i].life_steal[1];
						this.hpChanged(hit.attack.hits[i].life_steal[0]);
					}
					if(hit.attack.hits[i].life_leech){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].life_leech[0]].name+'</span> '+LNG.fight_label49+' <b>'+this.dots(hit.attack.hits[i].life_leech[1])+'</b> '+LNG.fight_label23+' <span>'+this.fight_characters[hit.attack.hits[i].life_leech[2]].name+'</span>!<br />';
						this.fight_characters[hit.attack.hits[i].life_leech[0]].hp+=hit.attack.hits[i].life_leech[1];
						this.fight_characters[hit.attack.hits[i].life_leech[2]].hp-=hit.attack.hits[i].life_leech[1];
						this.hpChanged(hit.attack.hits[i].life_leech[0]);
						this.hpChanged(hit.attack.hits[i].life_leech[2]);
					}
					if(hit.attack.hits[i].big_bang){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].big_bang[0]].name+'</span> '+LNG.fight_label35+' <b>'+this.dots(hit.attack.hits[i].big_bang[1])+'</b> '+LNG.fight_label1+' <span>'+this.fight_characters[hit.attack.hits[i].big_bang[2]].name+'</span>!<br />';
					}
					if(hit.attack.hits[i].abso){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].abso[0]].name+'</span> '+LNG.fight_label5+' <b>'+this.dots(hit.attack.hits[i].abso[1])+'</b> '+LNG.fight_label21+' '+LNG.fight_label39+' <span>'+this.fight_characters[hit.attack.hits[i].abso[2]].name+'</span>!<br />';
					}
					if(hit.attack.hits[i].nabso){
						for(var a=0;a<hit.attack.hits[i].nabso.length;a++){
							var tmp=hit.attack.hits[i].nabso[a];
							con+='<span>'+this.fight_characters[tmp[0]].name+'</span> '+LNG.fight_label5+' <b>'+this.dots(tmp[1])+'</b> '+LNG.fight_label21+' '+LNG.fight_label39+' <span>'+this.fight_characters[tmp[2]].name+'</span>!<br />';
						}
					}
					if(hit.attack.hits[i].removeMana){
						this.fight_characters[hit.attack.hits[i].removeMana[0]].mana-=hit.attack.hits[i].removeMana[1];
						this.manaChanged(hit.attack.hits[i].removeMana[0]);
					}
					if(hit.attack.hits[i].nremoveMana){
						for(var a=0;a<hit.attack.hits[i].nremoveMana.length;a++){
							var tmp=hit.attack.hits[i].nremoveMana[a];
							this.fight_characters[tmp[0]].mana-=tmp[1];
							this.manaChanged(tmp[0]);
							if(tmp[2]) con+='<span>'+this.fight_characters[tmp[0]].name+'</span> '+LNG.lab154+' <b>'+this.dots(tmp[1])+'</b> '+LNG.fight_label21+'! <br />';
						}
					}
					if(hit.attack.hits[i].addMana){
						this.fight_characters[hit.attack.hits[i].addMana[0]].mana+=hit.attack.hits[i].addMana[1];
						this.manaChanged(hit.attack.hits[i].addMana[0]);
						con+='<span>'+this.fight_characters[hit.attack.hits[i].addMana[0]].name+'</span> '+LNG.fight_label6+' <b>'+this.dots(hit.attack.hits[i].addMana[1])+'</b> '+LNG.fight_label21+'! <br />';
					}
					if(hit.attack.hits[i].naddMana){
						for(var a=0;a<hit.attack.hits[i].naddMana.length;a++){
							var tmp=hit.attack.hits[i].naddMana[a];
							this.fight_characters[tmp[0]].mana+=tmp[1];
							this.manaChanged(tmp[0]);
							con+='<span>'+this.fight_characters[tmp[0]].name+'</span> '+LNG.fight_label6+' <b>'+this.dots(tmp[1])+'</b> '+LNG.fight_label21+'! <br />';
						}
					}
					if(hit.attack.hits[i].istantHpLoose){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].istantHpLoose[0]].name+'</span> '+LNG.fight_effect169+' <b>'+this.dots(hit.attack.hits[i].istantHpLoose[1])+'</b> '+LNG.fight_label23;
						this.fight_characters[hit.attack.hits[i].istantHpLoose[0]].hp-=hit.attack.hits[i].istantHpLoose[1];
						this.hpChanged(hit.attack.hits[i].istantHpLoose[0]);
					}
					if(hit.attack.hits[i].summons){
						this.fight_lock=true;
						var summ=hit.attack.hits[i].summons;
						var lens=summ.length;
						for(var s=0;s<lens;s++){
							this.fight_characters[summ[s].i]={
								hp:summ[s].hp,
								max_hp:summ[s].hp,
								mana:summ[s].mana,
								max_mana:summ[s].mana,
								max_natural_energy:summ[s].natural_energy,
								natural_energy:summ[s].natural_energy,
								minor:1,
								avatar:summ[s].avatar,
								name:summ[s].name+'('+summ[s].i+')',
								team:summ[s].team
							}
							con+='<span>'+nname+'</span> '+LNG.fight_label51+' <b>'+summ[s].name+'</b>!<br />';
							var nat='';
							if(summ[s].natural_energy>0) nat='<div id="natural_bar_'+summ[s].i+'" class="bar natural"></div>';
							var html='<div id="fighter_'+summ[s].i+'"><img src="'+summ[s].avatar+'" /><div id="hp_bar_'+summ[s].i+'" class="bar hp"></div><div id="mana_bar_'+summ[s].i+'" class="bar mana"></div>'+nat+'</div>';
							$('#fighter_'+n+'_summons').append(html);
							this.fight_lock=false;
						}
					}
					if(hit.attack.hits[i].blockade){ 
						con+='<span>'+this.fight_characters[hit.attack.hits[i].blockade[0]].name+'</span> '+LNG['fight_effect168']+' <b>'+LNG['ninja_class'+hit.attack.hits[i].blockade[2]]+'</b> '+LNG.fight_label3+' <u>'+(hit.attack.hits[i].blockade[1]-1)+'</u> '+LNG.fight_label4+' !<br />';
					}
					if(hit.attack.hits[i].new_skill_miss){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].new_skill_miss[1]].name+'</span> '+LNG.fight_label8+'!<br />';
					}
					if(hit.attack.hits[i].caused_effect){
						var len8=hit.attack.hits[i].caused_effect.length;
						for(var p=0;p<len8;p++){
							var suf='';
							if(hit.attack.hits[i].caused_effect[p][2]){
								suf=' <b>'+this.dots(hit.attack.hits[i].caused_effect[p][2])+'</b>';
								if(hit.attack.hits[i].caused_effect[p][3]) suf+='%';
							}
							con+='<span>'+this.fight_characters[hit.attack.hits[i].caused_effect[p][0]].name+'</span> '+LNG['fight_effect'+hit.attack.hits[i].caused_effect[p][1]]+' '+suf+'!<br />';
						}
					}
					if(hit.attack.hits[i].caused_timed_effect){
						var len8=hit.attack.hits[i].caused_timed_effect.length;
						for(var p=0;p<len8;p++){
							if(hit.attack.hits[i].caused_timed_effect[p][3]){
								var suf='';
								if(hit.attack.hits[i].caused_timed_effect[p][4]) suf='%';
								con+='<span>'+this.fight_characters[hit.attack.hits[i].caused_timed_effect[p][0]].name+'</span> '+LNG['fight_effect'+hit.attack.hits[i].caused_timed_effect[p][1]]+' <b>'+this.dots(hit.attack.hits[i].caused_timed_effect[p][3])+'</b>'+suf+' '+LNG.fight_label3+' <u>'+(hit.attack.hits[i].caused_timed_effect[p][2]-1)+'</u> '+LNG.fight_label4+' !<br />';
							}
							else con+='<span>'+this.fight_characters[hit.attack.hits[i].caused_timed_effect[p][0]].name+'</span> '+LNG['fight_effect'+hit.attack.hits[i].caused_timed_effect[p][1]]+' '+LNG.fight_label3+' <u>'+(hit.attack.hits[i].caused_timed_effect[p][2]-1)+'</u> '+LNG.fight_label4+' !<br />';
						}
					}
					if(hit.attack.hits[i].sealchakra) con+='<b>'+this.dots(hit.attack.hits[i].sealchakra[1])+'</b> '+LNG.fight_label21+' <span>'+this.fight_characters[hit.attack.hits[i].sealchakra[0]].name+'</span> '+LNG.fight_effect170+' <b>'+(hit.attack.hits[i].sealchakra[2]-1)+'</b> '+LNG.fight_label4+'!<br />';
					if(hit.attack.hits[i].setHP){
						this.fight_characters[hit.attack.hits[i].setHP[0]].hp=hit.attack.hits[i].setHP[1];
						this.hpChanged(hit.attack.hits[i].setHP[0]);
					}
					if(hit.attack.hits[i].heal){
						con+='<span>'+this.fight_characters[hit.attack.hits[i].heal[0]].name+'</span> '+LNG.fight_label6+' <b>'+this.dots(hit.attack.hits[i].heal[1])+'</b> '+LNG.fight_label23+'!<br />';
						this.fight_characters[hit.attack.hits[i].heal[0]].hp+=hit.attack.hits[i].heal[1];
						this.hpChanged(hit.attack.hits[i].heal[0]);
					}
					if(hit.attack.hits[i].dmg){
						con+='<span>'+tname+'</span> '+LNG.fight_label15+' ';
						var cls='';
						if(hit.attack.hits[i].crit) cls=' class="crit"';
						con+='<b'+cls+'>'+this.dots(hit.attack.hits[i].dmg)+'</b> '+LNG.fight_label1;
						this.fight_characters[t].hp-=hit.attack.hits[i].dmg;
						if(this.fight_characters[t].hp<0) this.fight_characters[t].hp=0;
					}
					con+='<br />';
				}
				this.hpChanged(t);
			}
		}
		if(hit.avoid_death){
			var tname=this.fight_characters[hit.avoid_death[1]].name;
			this.fight_characters[hit.avoid_death[1]].hp=hit.avoid_death[2];
			this.fight_characters[hit.avoid_death[1]].mana=hit.avoid_death[3];
			this.hpChanged(hit.avoid_death[1]);
			this.manaChanged(hit.avoid_death[1]);
			con+='<br /><span>'+tname+'</span> '+LNG['fight_avoid_death'+hit.avoid_death[0]]+'<br />';
		}
		if(hit.deaths&&hit.deaths.length>0){
			for(var i=0;i<hit.deaths.length;i++){
				var nname=this.fight_characters[hit.deaths[i]].name;
				this.fight_characters[hit.deaths[i]].mana=0;
				this.fight_characters[hit.deaths[i]].hp=0;
				this.manaChanged(hit.deaths[i]);
				this.hpChanged(hit.deaths[i]);
				con+='<br /><b class="death"><span>'+nname+'</span> '+LNG.fight_label14+'</b>!<br />';
				if(this.fight_characters[hit.deaths[i]].minor) $('#fighter_'+hit.deaths[i]).remove();
				else $('#fighter_'+hit.deaths[i]).addClass('dead');
			}
		}
		if(hit.unsummons&&hit.unsummons.length>0){
			for(var i=0;i<hit.unsummons.length;i++){
				if(this.fight_characters[hit.unsummons[i]]) con+='<span>'+this.fight_characters[hit.unsummons[i]].name+'</span> '+LNG.fight_label24+'!<br />';
				else console.log('unummons err',hit.unsummons[i],this.fight_characters);
				$('#fighter_'+hit.unsummons[i]).remove();
			}
		}
		con+='</div><div class="clearfix"></div>';
		JQS.fco.append(con);
	}
	this.fight_r++;
	if(this.fight_r>=len){
		JQS.fco.prepend(this.fightReward());
		main_ekw_item_bind();
		tech_bind();
		this.show_tech_dmg=false;
	}
}
GAME.move_random = function (containter,duration){
	var parent=this;
	containter.animate({'top':this.getRandomInt(5,90)+'%','left':this.getRandomInt(5,90)+'%'},duration,function(){
		parent.move_random(containter,duration);
	});
}
GAME.bindBDB = function(con){
	con.css({'top':''+this.getRandomInt(5,90)+'%','left':''+this.getRandomInt(5,90)+'%'}).fadeIn();
	this.move_random(con,this.getRandomInt(500,1000));
	setTimeout(function () {
		con.animate({'opacity':0},2000,function(){
			con.remove();
		});
	}, 8000);
	con.on('mouseover click',function(){
		con.stop().fadeOut().off('mouseover click');
		GAME.emitOrder({a:21,bid:$(this).data('bid')});
	});
}
GAME.push_notification = function(body){
	if(this.push_enabled){
		notify.createNotification(LNG.page_title, {body:body, icon: "/gfx/favicon.ico"});
	}
}
GAME.parseLocBons = function(loc_data){
	var bons='';
	if(loc_data.bonus_tren) bons+='<img src="/gfx/icons/loc_bon/tren.png" data-toggle="tooltip" data-original-title="<div class=tt><b>'+loc_data.bonus_tren+'</b>'+LNG.item_stat89+'</div>" />';
	if(loc_data.bonus_exp) bons+='<img src="/gfx/icons/loc_bon/exp.png" data-toggle="tooltip" data-original-title="<div class=tt><b>'+loc_data.bonus_exp+'</b>'+LNG.item_stat38+'</div>" />';
	return bons;
}
GAME.missionChance = function(rank,level){
	var ch=0;
	switch(rank){
		case 1:
			ch=100+level-10;
		break;
		case 2:
			ch=90+level-20;
		break;
		case 3:
			ch=75+level-30;
		break;
		case 4:
			ch=65+level-50;
		break;
		case 5:
			ch=50+level-80;
		break;
	}
	if(ch>100) ch=100;
	return ch;
}
GAME.rewardLabels = function(con,reward,quick){
		if(reward.abi_increase) con+='<b><i class="ico '+reward.abi_increase[0]+'"></i> '+LNG['abi_'+reward.abi_increase[0]]+' + <strong>'+this.dots(reward.abi_increase[1])+'</strong></b><br />';
		if(reward.exp_lose) con+='<b class="red">'+LNG.lab147+' <strong>'+this.dots(reward.exp_lose)+'</strong> '+LNG.quest_prize1+'!</b><br />';
		if(reward.pvp_lose) con+='<b class="red">'+LNG.lab147+' <strong>'+this.dots(reward.pvp_lose)+'</strong> '+LNG.lab416+'!</b><br />';
		if(reward.failed_biju) con+='<b class="red">'+LNG.lab444+' <strong>'+this.dots(reward.failed_biju)+'/25% HP</strong>!</b><br />';
		if(reward.kills_reset) con+='<b class="red">'+LNG.lab148+'</b><br />';
		if(reward.pvm_kills) con+='<b class="green">'+LNG.lab149+' <strong>'+this.dots(reward.pvm_kills)+'</strong> '+LNG.crank_kills+'!</b><br />';
		if(reward.pet_exp) con+='<b class="green">'+LNG.lab151+' <strong>'+this.dots(reward.pet_exp)+'</strong> '+LNG.quest_prize1+'!</b><br />';
		if(reward.exp_gained) con+='<b class="green">'+LNG.lab152+' <strong>'+this.dots(reward.exp_gained)+'</strong> '+LNG.quest_prize1+'!</b><br />';
		if(reward.qdi) con+='<b class="green">'+LNG.lab152+' <strong>'+this.dots(reward.qdi)+'</strong> '+LNG.lab153+'!</b><br />';
		if(reward.pvp_rank) con+='<b class="green">'+LNG.lab152+' <strong>'+this.dots(reward.pvp_rank)+'</strong> '+LNG.lab416+'!</b><br />';
		if(reward.fame) con+='<b class="green">'+LNG.lab152+' <strong>'+this.dots(reward.fame)+'</strong> '+LNG.lab420+'!</b><br />';
		if(reward.op_lose) con+='<b class="orange">'+reward.op_lose.name+' '+LNG.lab154+' <strong>'+this.dots(reward.op_lose.pvp)+'</strong> '+LNG.lab416+'!</b><br />';
		if(reward.gold_stolen) con+='<b class="orange">'+reward.gold_stolen[0]+' '+LNG.kradnie+' <strong>'+this.dots(reward.gold_stolen[1])+'</strong> <img src="/gfx/gold.png" />!</b><br />';
		if(reward.frag) con+='<b class="orange">'+reward.frag.name+' '+LNG.lab254+'!</b><br />';
		if(reward.efrag) con+='<b class="orange">'+reward.efrag.name+' '+LNG.lab346+'!</b><br />';
		if(reward.respect_gain) con+='<b class="orange">'+LNG['village'+reward.respect_gain.village]+' '+LNG.lab456+' +<b>'+reward.respect_gain.rp+'</b>!</b><br />';
		if(reward.arena_exp) con+='<b class="orange">'+reward.arena_exp.name+' '+LNG.fight_label15+' '+reward.arena_exp.value+' '+LNG.lab319+'!</b><br />';
		if(reward.gold_gained) con+='<b class="orange">'+this.dots(reward.gold_gained)+' '+LNG.lab399+'!</b><br />';
		if(reward.items&&(this.map_options.bo[0]||quick==0)){
			var items='';
			var was_any=false;
			for(ind in reward.items){
				if(reward.items.hasOwnProperty(ind)){
					var dis='';
					if(reward.items[ind].disabled) dis='disabled';
					if(quick==0){
						was_any=true;
						switch(reward.items[ind].type){
							case 2: //material
								items+='<div class="item"><img src="/gfx/items/mats/'+reward.items[ind].item_id+'.png" alt="item" /><div>'+reward.items[ind].amount+'</div></div>';
							break;
							case 1: //usable
								items+='<div class="item"><img src="/gfx/items/cons/'+reward.items[ind].item_id+'.png" alt="item" /><div>'+reward.items[ind].amount+'</div></div>';
							break;
							default:
								items+='<div class="item main_ekw_item '+dis+'" data-toggle="tooltip" data-original-title="?" data-item_id="'+reward.items[ind].item_id+'"><img src="/gfx/items/'+reward.items[ind].lvl+'/'+reward.items[ind].item_class+'/'+reward.items[ind].item_id+'.png" alt="item" /><div>'+reward.items[ind].amount+'</div></div>';
							break;
						}
						
					}
					else{
						if(reward.items[ind].disabled) continue;
						was_any=true;
						switch(reward.items[ind].type){
							case 2: //mats
								items+='<div class="item"><img src="/gfx/items/mats/'+reward.items[ind].item_id+'.png" alt="item" /><div>'+reward.items[ind].amount+'</div></div>';
							break;
							case 1: //usable
								items+='<div class="item"><img src="/gfx/items/cons/'+reward.items[ind].item_id+'.png" alt="item" /><div>'+reward.items[ind].amount+'</div></div>';
							break;
							default:
								items+='<div class="item '+dis+'"><img src="/gfx/items/'+reward.items[ind].lvl+'/'+reward.items[ind].item_class+'/'+reward.items[ind].item_id+'.png" alt="item" /></div>';
							break;
						}

					}
				}
			}
			if(was_any){
				con+='<b>'+LNG.lab175+'</b><div>'+items+'</div><div class="clr"></div>';
			}
		}
	return con;
}
GAME.fightReward = function(quick=0,result){
	clearInterval(this.fight_timer);
	var reward=this.fight_reward;
	
	var con='';
	if(quick) con='<div class="fight_reward floating"><div class="fr fr'+result+'">'+LNG['fight_result'+result]+'</div>';
	else{
		con='<div class="fight_result">'+LNG['fight_result'+this.fight_result]+'</div><div class="fight_reward">';
		if(this.fight_tdmgs) con+=LNG.lab460+'<br /><div class="fight_team0"><span>'+this.dots(this.fight_tdmgs[0])+'</span></div><div class="fight_team1"><span>'+this.dots(this.fight_tdmgs[1])+'</span></div><div class="clr"></div>';
	}
	if(this.map_options.bo[1]||quick==0){
		if(reward&&reward.length){
			var len=reward.length;
			for(var i=0;i<len;i++){
				if(reward[i].receiver) con+='<div class="clr"></div><b class="red">'+LNG.lab419+' '+reward[i].receiver+'</b><br />';
				con=this.rewardLabels(con,reward[i],0);
			}
		}
		else con=this.rewardLabels(con,reward,quick);
	}
	con+='</div>';
	return con;
}
GAME.showMissionReward = function(res){
	var con='<h2>'+LNG.done8+'</h2>';
	if(res.harder_mission) con+='<span class="red">'+LNG.lab431+'</span><br />';
	con=this.rewardLabels(con,res,0);
	this.komunikat(con);
}

GAME.prepareTechHeader = function(data){
	var req='<div><b>'+LNG.lab18+'</b><br />';
	var can_use=true;
	if(data.want_ki){
		var cls='';
		if(this.char_data.ki<data.want_ki){
			cls='red';
			can_use=false;
		}
		req+=LNG.atr5+': <span class="'+cls+'">'+this.dots(data.want_ki)+'</span><br />';
	}
	if(data.want_n){
		var cls='';
		if(!data.want_n_status){
			cls='red';
			can_use=false;
		}
		req+=LNG.lab19+': <span class="'+cls+'">'+data.want_n_name+'</span><br />';
	}
	req+='</div>';
	return {req:req,can_use:can_use};
}
GAME.bestKG = function(kg,kt){
	var abi='';
	if(kg>0) abi='<img src="/gfx/jutsus/8_'+kg+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['kg'+kg]+'</div>" />';
	if(kt>0) abi='<img src="/gfx/jutsus/9_'+kt+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['kt'+kt]+'</div>" />';
	return abi;
}
GAME.parseData = function(type,res){
	switch(type){
		case 1:
			$('#promo_item').hide();
			var deletes={};
			if(res.deletes) deletes=res.deletes;
			var con='';
			var data=res.chars.sort(function(a,b){return b.reborn-a.reborn||b.level-a.level||b.exp-a.exp});
			var len=data.length;
			this.player_chars=len;
			for(var i=0;i<len;i++){
				var add_container='';
				if(data[i].tmp_sid) add_container='<span class="red">'+LNG.lab191+'!</span>';
				if(data[i].klan_rent) add_container='<span class="orange">'+LNG.lab270+'!</span>';
				if(deletes[data[i].id]){
					add_container='<span class="orange">'+LNG.lab281+' '+this.showTimer(deletes[data[i].id].time-this.getTime())+'</span>';
				}
				con+='<li class="option" data-option="select_char" data-char_id="'+data[i].id+'"><figure><img src="'+data[i].avatar+'" alt="avatar" /></figure><h3><span>'+data[i].surname+'</span> '+data[i].name+'</h3><h4>'+LNG.lab1+' '+this.rebPref(data[i].reborn)+' '+data[i].level+'</h4><div>'+add_container+'</div></li>';
			}
			if(res.cnt<res.max) con+='<li class="new_char option" data-option="new_character"><img src="/gfx/layout/lay/plus.png" alt="newchar" /><h5>'+LNG.lab394+'</h5></li>';
			$('#char_list_con').html(con);
			$('#quest_con').hide();
			//zasts
			var con='';
			var data=res.zasts.sort(function(a,b){return b.reborn-a.reborn||b.level-a.level||b.exp-a.exp});
			var len=data.length;
			for(var i=0;i<len;i++){
				var add_container='';
				con+='<li class="option" data-option="select_zast" data-char_id="'+data[i].id+'"><figure><img src="'+data[i].avatar+'" alt="avatar" /></figure><h3><span>'+data[i].surname+'</span> '+data[i].name+'</h3><h4>'+LNG.lab1+' '+this.rebPref(data[i].reborn)+' '+data[i].level+'</h4><div>'+add_container+'</div></li>';
			}
			$('#zast_list_con').html(con);
			//
			
			var newcharava=[1];
			var nl=newcharava.length;
			for(var i=0;i<nl;i++){
				if(newcharava[i]==0){
					$('#fab'+i).removeClass('disabled').addClass('disabled');
					$('#fabr'+i).prop('disabled',true);
				}
			}
			$('.char_logged').hide();
			$('#acc_char_cnt').text(res.cnt);
			$('#acc_char_lim').text(res.max);

			this.page_switch('char_select');
			option_bind();
			$('#newCharPopUp').hide();
			var top_players=res.top_players;
			var len=top_players.length;
			var con='';
			for(var i=0;i<len;i++){
				con+='<div class="rank_player option" data-option="show_player" data-char_id="'+top_players[i].id+'"><img src="'+top_players[i].avatar+'" class="rank_pic avatar_border" /><div class="place">'+(i+1)+'</div><div class="name"><span>'+top_players[i].surname+'</span><br /><strong>'+top_players[i].name+'</strong></div><div class="clr"></div><div class="hr"></div><div class="rank_ability">'+this.bestKG(top_players[i].kgenkai,top_players[i].kakkai_touta)+'</div><div class="level">'+LNG.lab1+' '+this.rebPref(top_players[i].reborn)+' <span class="lval">'+top_players[i].level+'</span></div></div>';
			}
			$('#server_top').html(con);
			tooltip_bind();
		break;
		case 2:
			var data=res.data
			var channel=parseInt(res.channel);
			var tmp=data;
			var len=this.chat_data[channel].messages.length;
			for(var i=0;i<len;i++){
				tmp.push(this.chat_data[channel].messages[i]);
			}
			this.chat_data[channel].messages=tmp;
			
			this.showChatChannel();
			this.chat_data[channel].old_loaded=1;
		break;
		case 3:
			var data=res.data;
			var channel=parseInt(res.channel);
			if(this.chat_data[channel]){
				if(!this.chat_data[channel].messages) this.chat_data[channel].messages=[];
				this.chat_data[channel].messages.push(data);
				if(this.chat_visible){
					if(channel==this.chat_channel) this.showChatChannel();
					else if(this.chat_notifications[channel]){
						this.chat_data[channel].new_msg_cnt++;
						if(this.chat_data[channel].new_msg_cnt<99) $('#chat_channel_'+channel+'_cnt').text(this.chat_data[channel].new_msg_cnt).removeClass('empty');
						else $('#chat_channel_'+channel+'_cnt').text('99+').removeClass('empty');
					}
				}
				else if(this.chat_notifications[channel]){
					this.chat_data[channel].new_msg_cnt++;
					if(this.chat_data[channel].new_msg_cnt<99) $('#chat_channel_'+channel+'_cnt').text(this.chat_data[channel].new_msg_cnt).removeClass('empty');
					else $('#chat_channel_'+channel+'_cnt').text('99+').removeClass('empty');
					this.chat_nonread++;
					this.updateChatRead(channel);
				}
				if(this.chat_notifications[channel]){
					var is_clan_channel=false,sadd=false;
					if([6,9,10,11].indexOf(channel)!=-1) is_clan_channel=true;
					switch(this.chat_switch){
						case 1:
							if(!is_clan_channel) sadd=true;
						break;
						default:
							if(is_clan_channel) sadd=true;
						break;
					}
					if(sadd){
						this.chat_scnt++;
						if(this.chat_scnt<99) $('#chat_channel_scnt').text(this.chat_scnt).removeClass('empty');
						else $('#chat_channel_scnt').text('99+').removeClass('empty');
					}
				}
			}
		break;
		case 4:
			var con='';
			var data=res;
			var len=this.bonus_cats.length;
			for(var c=1;c<len;c++){
				var len2=this.bonus_cats[c].length;
				con+='<div class="bon_header"><td>'+LNG['bonus_cat'+c]+'</div>';
				for(var st=0;st<len2;st++){
					var s=this.bonus_cats[c][st];
					//if((s==132||s==133)&&this.char_data.race!=3) continue;
					//if(s==153&&this.char_data.race!=2) continue;
					//if(s==156&&this.char_data.race!=1) continue;
					var desc='';
					var len3=data[s].desc.length;
					var any=false;
					for(var i=0;i<len3;i++){
						any=true;
						desc+='<b>'+data[s].desc[i].value+'</b> '+LNG['item_desc'+data[s].desc[i].type]+'<br />';
					}
					con+='<div';
					if(any) con+=' data-toggle="tooltip" data-original-title="<div class=tt>'+desc+'</div>"';
					con+='><b>'+data[s].value+'</b> '+LNG['item_stat'+s]+'</div>';
				}
				
			}
			$('#game_stats_container').html(con);
			tooltip_bind();
		break;
		case 5:
			this.field_mobs=res.mobs.mobs;
			this.field_players=res.players;
			this.field_wanted=res.wanted;
			this.field_boss=res.boss;
			this.field_shadows=res.shadows;
			this.field_dball=res.dball;
			this.field_res=res.res;
			this.field_mf=res.mf;
			this.field_npcs=res.res.npcs;
			var any=false;
			if(!this.mobs_prepared){
				any=true;
				this.md={};
				this.prepareMobList();
			}
			if(this.showFieldData(res.x,res.y)&&!any) any=true;
			if(this.showSpecialList()&&!any) any=true;
			this.showPlayerList();
			this.showMobList();
			if(any) option_bind();
		break;
		case 6:
			var premie='';
			var train=res.train_res;
			var len=train.premie.length;
			for(var i=0;i<len;i++){
				switch(train.premie[i].id){
					case 1: 
					case 2:
						premie+='<b>'+LNG['train_premia'+train.premie[i].id]+'</b> : '+train.premie[i].val+'<br />'; break;
					case 3:
					case 4:
						premie+='<b>'+LNG.lab4+'</b> '+LNG['train_premia'+train.premie[i].id]+' : <b class="orange">'+train.premie[i].val+'</b>'+LNG.item_stat89+'<br />'; break;
					break;	
					case 5:
						var until='';
						if(train.premie[i].until) until='<i>'+LNG.lab5+'</i> '+this.dots(train.premie[i].until)+LNG.lab10;
						premie+='<b>'+LNG.lab4+'</b> '+LNG['train_premia'+train.premie[i].id]+' <b>'+train.premie[i].name+'</b> : <b class="orange">'+train.premie[i].val+'</b>'+LNG.item_stat89+'<br />'; break;
					break
					case 6:
						premie+='<b>'+LNG.lab4+'</b> '+LNG['train_premia'+train.premie[i].id]+' <b>'+train.premie[i].level+'</b> : <b class="orange">'+train.premie[i].val+'</b>'+LNG.item_stat89+'<br />'; break;
					break;	
				}
			}
			$('#game_train_premie').html(premie);
			this.base_train_result=train.rezultat;
			this.current_train_result=train.rezultat;
			this.base_train_speed=res.tren_speed;
			this.selected_train_stat=1;
			this.selected_train_duration=2;
			this.prepareTrainForm();
		break;
		case 7:
			var data=res;
			var con='';
			for(var i in data){
				if(!data.hasOwnProperty(i)) continue;
				con+='<b>'+data[i].name+'</b>';
				if(data[i].e) con+='<span class="red">'+LNG['error'+data[i].e]+'</span>';
				if(data[i].done) con+='<span class="green">'+LNG['done'+data[i].done]+'</span>';
				con+='<br />';
			}
			this.komunikat(con);
		break;
		case 8:
			//
			var data=res.available;

			var pages=Math.ceil(res.all_items/res.per_page);
			var page=res.page;
			
			var pagi='';
			for(var p=1;p<=pages;p++){
				var cls='';
				if(p==page) cls=' active';
				pagi+='<button class="'+cls+' option newBtn" data-option="show_know" data-page="'+p+'">['+p+']</button>';
			}
			$('#know_list_pagi').html(pagi);
			var bon=0,lim=1;
			if(this.char_data.bonus2>this.getTime()){
				$('#game_know_bonus').text(LNG.lab13);
				bon=1;
				lim=2;
			}
			else $('#game_know_bonus').text(LNG.lab14);
			var con='';
			var len=data.length;
			var rate=res.rate;
			for(var i=0;i<len;i++){
				var n=data[i];
				var req='',reqv='',reqm=0,cls='red';
				switch(n.want_type){
					case 1: 
						reqv=LNG.lab1+' <b>'+n.want_id+'</b>'; 
						if(this.levelReqCheck(n.want_id,0)) reqm=1
					break;
					case 2: 
						reqv=LNG.lab19+' <b>'+n.know_name+'</b>'; 
						if(this.learned_know.indexOf(n.want_id)!=-1) reqm=1;
					break;
					case 3: 
						reqv=LNG.lab1+' <b>'+this.rebPref(1)+n.want_id+'</b>';  
						if(this.levelReqCheck(n.want_id,1)) reqm=1
					break;
					case 4: 
						reqv=LNG.lab1+' <b>'+this.rebPref(2)+n.want_id+'</b>';  
						if(this.levelReqCheck(n.want_id,2)) reqm=1
					break;
					case 5: 
						reqv=LNG.lab1+' <b>'+this.rebPref(4)+n.want_id+'</b>';  
						if(this.levelReqCheck(n.want_id,4)) reqm=1
					break;
				}
				if(reqm) cls='green';
				req='<span class="'+cls+'">'+reqv+'</span>';
				if(n.req_loc){
					var cls='red';
					if(this.char_data.loc==n.req_loc) cls='green';
					else reqm=0;
					
					req+='<br />'+LNG.lab20+': <b class="'+cls+'">'+n.loc_name+'</b>';
				}
				
				var prize='<div class="kprize">';
				if(n.sila>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr1+'</div>"><i class="ico a1"></i> +<b>'+this.dots(n.sila*rate)+'</b></div>';
				if(n.szyb>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr2+'</div>"><i class="ico a2"></i> +<b>'+this.dots(n.szyb*rate)+'</b></div>';
				if(n.wytrz>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr3+'</div>"><i class="ico a3"></i> +<b>'+this.dots(n.wytrz*rate)+'</b></div>';
				if(n.swoli>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr4+'</div>"><i class="ico a4"></i> +<b>'+this.dots(n.swoli*rate)+'</b></div>';
				if(n.ki>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr5+'</div>"><i class="ico a5"></i> +<b>'+this.dots(n.ki*rate)+'</b></div>';
				if(n.wta>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr6+'</div>"><i class="ico a6"></i> +<b>'+this.dots(n.wta*rate)+'</b></div>';
				if(n.gki>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr7+'</div>"><i class="ico a7"></i> +<b>'+this.dots(n.gki*rate)+'</b></div>';
				prize+='</div>';
				var btn='';
				if(reqm){ //&&this.timed<lim
					var tim=(res.know_speed*n.time)/3;
					if(bon) tim*=0.25;
					if(n.special==1) tim=1200;
					btn='<button class="option gold_button" data-option="know_learn" data-know="'+n.id+'">'+LNG.lab22+' ['+this.convertSeconds(Math.floor(tim))+']</button>';
				}
				con+='<div class="knowcon"><img src="/gfx/nauki/'+n.id+'.png" /><div><h3>'+n.nazwa+'</h3><p>'+n.opis+'</p>'+LNG.lab18+': '+req+'<br />'+LNG.lab21+':<br />'+prize+'</div>'+btn+'</div>';
			}
			con+='<div class="clr"></div>';
			$('#know_list_con').html(con);
			option_bind();
			tooltip_bind();
		break;
		case 9:
			//
			var data=res.old;
			var pages=Math.ceil(res.all_items/res.per_page);
			var page=res.page;
			
			var pagi='';
			for(var p=1;p<=pages;p++){
				var cls='';
				if(p==page) cls=' active';
				pagi+='<button class="'+cls+' option newBtn" data-option="show_know2" data-page="'+p+'">['+p+']</button>';
			}
			$('#know_list_pagi').html(pagi);
			var bon=0;
			var con='';
			var len=data.length;
			for(var i=0;i<len;i++){
				var n=data[i];
				var prize='<div class="kprize">';
				if(n.sila>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr1+'</div>"><i class="ico a1"></i> +<b>'+this.dots(n.sila)+'</b></div>';
				if(n.szyb>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr2+'</div>"><i class="ico a2"></i> +<b>'+this.dots(n.szyb)+'</b></div>';
				if(n.wytrz>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr3+'</div>"><i class="ico a3"></i> +<b>'+this.dots(n.wytrz)+'</b></div>';
				if(n.swoli>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr4+'</div>"><i class="ico a4"></i> +<b>'+this.dots(n.swoli)+'</b></div>';
				if(n.ki>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr5+'</div>"><i class="ico a5"></i> +<b>'+this.dots(n.ki)+'</b></div>';
				if(n.wta>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr6+'</div>"><i class="ico a6"></i> +<b>'+this.dots(n.wta)+'</b></div>';
				if(n.gki>0) prize+='<div data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.atr7+'</div>"><i class="ico a7"></i> +<b>'+this.dots(n.gki)+'</b></div>';
				prize+='</div>';
				con+='<div class="knowcon old"><img src="/gfx/nauki/'+n.id+'.png" /><div><h3>'+n.nazwa+'</h3><p>'+n.opis+'</p><br />'+LNG.lab21+':<br />'+prize+'</div><div class="clearfix"></div></div>';
			}
			con+='<div class="clr"></div>';
			$('#know_list_con').html(con);
			option_bind();
			tooltip_bind();
		break;
		case 10: //misje
			if(res.mission){
				this.current_mission=res.mission;
				$('#sel_miss_rank').text(LNG['ninja_class'+res.mission.rank]);
				$('#sel_miss_desc').text(LNG['mission'+res.mission.rank+'_'+res.mission.desc]);
				$('#sel_miss_loc').html('<i class="upgrade_icon tpp"></i>'+res.mission[this.lang]).data('loc',res.mission.loc);
				$('#sel_miss_xy').text(res.mission.x+' | '+res.mission.y);
				var dur=this.missions_duration[res.mission.rank];
				var bon=this.getStat(130);
				if(bon>0) dur-=dur*(bon/100);
				$('#sel_miss_time').text(this.convertSeconds(Math.floor(dur)));
				var chance=this.missionChance(res.mission.rank,this.char_data.level)+this.getStat(129);
				if(chance>100) chance=100;
				$('#sel_miss_chance').text(chance);
				$('#selected_mission').show();
			}
			else{
				$('#selected_mission').hide();
			}
			var bon=0;
			if(this.premiumBonus(3)){
				$('#game_camp_bonus').text(LNG.lab13);
				bon=1;
			}
			else $('#game_camp_bonus').text(LNG.lab14);
			this.charValuesBind(['m_1','m_2','m_3','m_4','m_5','a_1','a_2','a_3','a_4','a_5']);
			for(var r=1;r<=5;r++){
				if(this.char_data['a_'+r]){
					var opt='<button class="newBtn option" data-option="init_mission" data-rank="'+r+'">'+LNG.lab430+'</button>';
					$('#rank_miss'+r+'_opt').html(opt);
				}
				else $('#rank_miss'+r+'_opt').text('');
			}
			option_bind();
		break;
		case 12:
			var con='';
			if(res.owncamps){
				var data=res.owncamps;
				var len=data.length;
				for(var i=0;i<len;i++){
					var pd=JSON.parse(data[i].prize);
					var prize='<div>';
					if(pd.exp) prize+=''+this.dots(pd.exp)+' <i class="ico exp"></i><br />';
					var len2=pd.items.length;
					for(var j=0;j<len2;j++){ 
						prize+='<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+pd.items[j].id+'"><img src="/gfx/items/'+pd.items[j].class+'/'+pd.items[j].type+'/'+pd.items[j].id+'.png" /></div>';
					}
					prize+='</div>';
					con+='<div class="single_camp"><span>'+this.convertTime(data[i].time)+'</span>'+prize+'</div>';
				}
			}
			$('#own_camps').html(con);
			con='';
			if(res.lastcamps){
				var data=res.lastcamps;
				var len=data.length;
				for(var i=0;i<len;i++){
					var pd=JSON.parse(data[i].prize);
					var prize='<div>';
					if(pd.exp) prize+=''+this.dots(pd.exp)+' <i class="ico exp"></i><br />';
					var len2=pd.items.length;
					for(var j=0;j<len2;j++){
						prize+='<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+pd.items[j].id+'"><img src="/gfx/items/'+pd.items[j].class+'/'+pd.items[j].type+'/'+pd.items[j].id+'.png" /></div>';
					}
					prize+='</div>';
					con+='<div class="single_camp"><b class="option" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].name+'</b><span>'+this.convertTime(data[i].time)+'</span> '+prize+'</div>';
				}
			}
			$('#all_camps').html(con);
			option_bind();
			main_ekw_item_bind();
			tooltip_bind();
		break;
		case 13:
			clearTimeout(this.rep_new_tim);
			var cat=res.cat;
			var pages=res.all_pages;
			var page=res.page;
			this.rap_page=page;
			this.rap_cat=cat;
			$('#reps_checkAll').prop('checked',false);
			var pagi='';
			for(var p=1;p<=pages;p++){
				var cls='';
				if(p==page) cls=' active';
				pagi+='<button class="'+cls+' newBtn option" data-option="show_reps" data-page="'+p+'" data-cat="'+cat+'">['+p+']</button>';
			}
			$('#reps_list_pagi').html(pagi);
			var con='';
			var data=res.raps;
			var len=data.length;
			var anynew=false;
			for(var i=0;i<len;i++){
				var rep='',opt='';
				if(data[i].read){
					rep+='<img id="new_rap_id'+data[i].id+'" class="new_rep_ct'+data[i].type+'" data-rid="'+data[i].id+'" src="/gfx/icons/new_rap.png" />';
					anynew=true;
				}
				if(data[i].dot) rep+='<img src="/gfx/dots/'+data[i].dot+'.png" />';
				if(data[i].type==0) opt='class="clickable option" data-option="open_rap" data-rid="'+data[i].id+'"';
				rep+=' '+this.raport_action(data[i].action,data[i].id1,data[i].id2,data[i].s1,data[i].s2);
				if(data[i].resent) rep+='<div class="rep_resnt">'+LNG.lab241+' <b class="orange option" data-option="show_player" data-char_id="'+data[i].id2+'">'+data[i].s2+'</b></div>';
				con+='<tr><td><div class="newCheckbox"><input type="checkbox" id="rep_'+data[i].id+'" class="rep_check" value="'+data[i].id+'" /><label for="rep_'+data[i].id+'"></label></div></td><td '+opt+'>'+rep+'</td><td>'+this.convertTime(data[i].time)+'</td></tr>';
			}
			$('#reps_container').html(con);
			option_bind();
			if(anynew){
				this.rep_new_tim = window.setTimeout( function() { 
					GAME.gatherNewReps();
				}, 2000 );
			}
				if(typeof PVP!=='undefined'&&PVP.onRapsData) PVP.onRapsData(res);
		break;
		case 14:
			var newr=res.new_raps;
			if(newr>0){
				var html='<div class="icon newrap" />('+this.dots(newr)+')';
				$('#new_rap_con').fadeIn().html(html);
			}
			else $('#new_rap_con').hide();
		break;
		case 15:
			var data=res.ekw.sort(function(a,b){return b.lvl-a.lvl||b.class-a.class||b.upgrade-a.upgrade});
			$('.ekw_pag').removeClass('active');
			$('#ekw_pag_'+res.page).addClass('active');
			var len=data.length;
			var con='';
			for(var i=0;i<len;i++){
				var item=data[i],stack='',drag='';
				/*
				if(item.stack>1){
					if(item.stack>=1000) stack='<div>'+this.abbreviateNumber(item.stack,1)+'</div>';
					else stack='<div>'+item.stack+'</div>';
				}
				*/
				con+='<div class="ekw_slot player_ekw_item ekw_list_item nonstackable" draggable="true" data-slot="'+item.type+'" data-toggle="tooltip" data-bound="'+item.lock_type+'" data-item_id="'+item.id+'" data-lvl="'+item.lvl+'" data-upgrade="'+item.upgrade+'" data-base_item_id="'+item.item_id+'" data-img="'+item.pic+'" data-stack="'+item.stack+'" data-class="'+item.class+'"><img src="'+item.pic+'" />'+stack+'</div>';
			}
			con+='<div class="clearfix"></div>';
			$('#ekw_used').text(res.all_items);
			$('#ekw_page_items').html(con);
			player_ekw_item_bind();
			ekw_list_bind();
			tooltip_bind();
		break;
		case 16:
			kom_clear()
			var maxpr=this.getCharMaxPr();
			var needpr=maxpr-this.char_data.pr;
			var paperitem=0;
			if(res.ifun.ap_add_constant) paperitem+=res.ifun.ap_add_constant;
			if(res.ifun.ap_add_percent) paperitem+=res.ifun.ap_add_percent/100*maxpr;
			var max=Math.min(Math.ceil(needpr/paperitem),res.stack)-1;
			GAME.dragged_item={id:res.iid};
			var kom='<div>'+LNG.lab50+'<br /><img src="'+res.gfx+'" /><div class="game_input small"><input id="item_am" type="text" value="1" data-max="'+max+'" /></div><button class="set_max btn_small_gold" data-target="#item_am" data-max="'+max+'">'+LNG.lab171+'</button><br /><br />'+LNG.lab51+': <b>'+res.stack+'</b><br /><button class="option btn_small_gold" data-option="use_item_m">OK</button></div>';
			GAME.komunikat(kom);
			setmaxBind()
			option_bind();
			$('#item_am').on('input',function(){
					var val=$(this).val();
					var max=parseInt($(this).data('max'))+1;
					if(val>max){
						val=max;
						$(this).val(val);
					}
			});
		break;
		case 17:
			//$('.kom').remove();
			var kom='<div>'+LNG.lab52+'<div class="ekw_page_items">';
			var len=res.items.length;
			for(var i=0;i<len;i++){
				kom+='<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+res.items[i].id+'"><img src="'+res.items[i].gfx+'" /><div>'+res.items[i].am+'</div></div>';
			}
			if(res.pet){
				kom+='<div class="ekw_slot"><img src="/gfx/pets/'+res.pet.type+'/'+res.pet.evo_lvl+'.png" width="70" /></div>';
			}
			if(res.employe){
				kom+='<div class="ekw_slot"><img src="/gfx/employee/'+res.employe.type+'.png" /></div>';
			}
			kom+='</div></div>';
			GAME.komunikat(kom);
			main_ekw_item_bind();
			tooltip_bind();
		break;
		case 18:
			kom_clear();
			var owned=res.stack;
			GAME.dragged_item={id:res.iid};
			var kom='<div><strong>'+LNG.lab53+'</strong><br />'+LNG.lab327+': <b class="orange">'+this.dots(owned)+'</b><div class="ekw_page_items">';
			var items=res.ifun.exchange.items;
			var len=items.length;
			for(var i=0;i<len;i++){
				var cls='green';
				if(items[i][1]>res.stack) cls='red';
				var max=Math.floor(owned/items[i][1]);
				kom+='<div class="exchange_item main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+items[i][0]+'"><span class="need_bar '+cls+'">'+LNG.lab54+':<br /><b>'+this.dots(items[i][1])+'</b></span><div class="ekw_slot set_max" data-target="#exchange_item_'+i+'" data-max="'+max+'"><img src="'+items[i][3]+'" /><div>'+items[i][2]+'</div></div>x <div class="game_input vvsmall"><input id="exchange_item_'+i+'" type="text" value="1" /></div><br /><button class="option newBtn" data-option="use_item_sel" data-sel="'+i+'">'+LNG.lab74+'</button></div>';
			}
			GAME.komunikat(kom);
			option_bind();
			main_ekw_item_bind();
			setmaxBind()
			tooltip_bind();
		break;
		case 19:
			if(res.char_id==this.char_id||res.force){
				var data=res.buffs;
				var len=data.length;
				GAME.buffs_cnt=len;
				var con='<div class="buff_con">';
				var time=this.getTime();
				for(var i=0;i<len;i++){
					con+='<div id="lb'+i+'" class="list_buff option" data-option="delete_buff" data-buff="'+data[i].id+'">'+this.showTimer(data[i].expires-time,'data-special="9" data-bid="'+i+'"')+': <b>'+data[i].value+'</b> '+this.item_stat(data[i].stat)+'</div>';
				}
				con+='<div class="clr"></div></div>';
				$('#char_buffs_cnt').text(GAME.buffs_cnt);
				$('#char_buffs').html(con);
				tooltip_bind();
				option_bind();
			}
		break;
		case 20:
			var data=res.buffs;
			var bons=res.data;
			var len=data.length;
			var lvls=[];
			var con='';
			var max=bons.reborn_2;
			var perl=50;
			if(this.char_data.reborn>=3){
				max=bons['reborn_3'];
				perl=30;
			}
			$('#buffs_point_per').text(perl);
			var used=0,ava=GAME.buff_calculate_points(this.char_data.reborn,this.char_data.level);
			for(var i=0;i<len;i++){
				var b=data[i].buff_id;
				lvls[b]=data[i].level;
				if(perl==50&&bons[b].reborn==2) used+=GAME.buff_point_calc(lvls[b]);
				if(perl==30&&bons[b].reborn==3) used+=GAME.buff_point_calc(lvls[b]);
			}
			ava-=used;
			if(ava<0) ava=0;
			$('#buffs_point_spent').text(used);
			$('#buffs_point_ava').text(ava);
			for(var b=1;b<=max;b++){
				var lvl=0;
				if(lvls[b]) lvl=lvls[b];
				var val=bons[b].val*lvl.toFixed(2),cls='',active=true,upgrade='';
				if(lvl>=bons[b].max_lvl){
					upgrade='<span class="red">'+LNG.lab55+'</span>';
					cls='inactive';
				}
				else{
					var cost=GAME.buff_cost(b,this.char_data.reborn,lvl),cls2='',cls3='';
					if(ava<cost[0]) cls2='red';
					if(this.premium<cost[1]) cls3='red';
					upgrade=''+LNG.lab57+': <b class="'+cls2+'">'+cost[0]+'</b> '+LNG.lab58+' + <b class="'+cls3+'">'+cost[1]+'</b> <img src="/gfx/kp.png" /><button class="option newBtn2" data-option="buff_upgrade" data-buff="'+b+'">'+LNG.lab56+'</button> ';
				}
				con+='<div class="'+cls+'"><img src="/gfx/buffs/'+b+'.png" class="bim" /><div class="buff_center"><b>'+LNG['game_buff'+b]+'</b><br />'+LNG.lab1+' '+lvl+'/'+bons[b].max_lvl+' <span class="green">('+(bons[b].val).toFixed(2)+'/'+LNG.lab1+')</span><br /><br /><span class="orange">'+val+'</span> '+this.item_stat(bons[b].stat)+'</span></div><div class="buff_up">'+upgrade+'</div></div>';
			}
			$('#buffs_list').html(con);
			option_bind();
		break;
		case 21:
			var data=res.ubuffs;
			var len=data.length;
			var buffs={};
			var max=0;
			var con='';
			for(var i=0;i<len;i++){
				var b=data[i].buff_id;
				if(b>max) max=b;
				buffs[b]=data[i].level;
			}
			for(var b=1;b<=max;b++){
				if(buffs[b]){
					con+='<div><div class="newCheckbox"><input id="char_buff_'+b+'" type="checkbox" class="use_buff" value="'+b+'" checked /><label for="char_buff_'+b+'"></label></div> <img src="/gfx/buffs/'+b+'.png" data-toggle="tooltip" data-original-title="<div class=tt><b>'+LNG['game_buff'+b]+'</b> ('+LNG.lab1+' '+buffs[b]+')</div>" /><b>'+buffs[b]+'</b></div>';
				}
			}
			$('#buff_use_list').html(con);
			tooltip_bind();
		break;
		case 22:
			var data=res.char_list;
			var len=data.length;
			var con='';
			for(var i=0;i<len;i++){
				con+=data[i].name+';';
			}
			$('#bless_players').val(con.slice(0, -1));
		break;
		case 23:
			kom_clear()
			var con='';
			var data=res.result;
			var len=data.length;
			for(var i=0;i<len;i++){
				con+='<b>'+data[i].player+'</b> :';
				if(data[i].wynik.e) con+='<span class="red">'+LNG['error'+data[i].wynik.e]+'</span><br />';
				else{
					con+='<br />';
					var b=data[i].wynik.b;
					for(bid in b){
						if(b.hasOwnProperty(bid)){
							con+='<u>'+LNG['game_buff'+bid]+'</u> - ';
							if(b[bid].e) con+='<span class="red">'+LNG['error'+b[bid].e]+'</span><br />';
							else con+='<span class="green">OK</span> ';
						}
					}
				}
			}
			GAME.komunikat(con);
		break;
		case 24:
			if(res.char_id==this.char_id){
				var domid='fb_'+Math.floor(this.getmTime())+'_'+this.getRandomInt(1,1000);
				var html='<div id="'+domid+'" class="floating_buff"><b>'+res.name+'</b><br />'+LNG.rap_action49+'<br /><img src="/gfx/buffs/'+res.b+'.png" /><br /><b>'+LNG['game_buff'+res.b]+'</b><br />'+LNG.lab1+' '+res.lvl+'</div>';
				$('#crap_container').append(html);
				
				var parent=this;
				$('#'+domid).animate({
					'left':[parent.char_buffs_pos.left+'px',parent.curvy[parent.getRandomInt(0,parent.curvy_cnt)]],
					'top':[parent.char_buffs_pos.top+'px',parent.curvy[parent.getRandomInt(0,parent.curvy_cnt)]]
				},
				parent.getRandomInt(1500,3000),
				function(){
					$(this).remove();
				});
				
			}
		break;
		case 25:
			var bon=0;
			if(this.char_data.bonus3>this.getTime()){
				$('#game_travel_bonus').text(LNG.lab13);
				bon=1;
			}
			else $('#game_travel_bonus').text(LNG.lab14);
			var data=res.travel_list.sort(function(a,b){return b.fav-a.fav||b.sort-a.sort});
			var len=data.length;
			var quests=res.quests;
			var con='';
			var rate=parseInt(res.travel_rate);
			for(var i=0;i<len;i++){
				var cls='',qa='';
				if(data[i].fav) cls='fav';
				var opts='';
				var bons=this.parseLocBons(data[i]);
				if(this.char_data.loc!=data[i].loc){
					var dur=this.char_data.loc-data[i].loc;
					if(dur<0) dur*=-1;
					dur=(dur*rate)/3;
					if(bon){
						dur*=0.1; 
						dur=Math.round(dur);
					}
					cls+=' option';
				}
				else cls+=' current';
				opts+='<button class="option fav" data-option="set_fav_loc" data-loc="'+data[i].id+'"></button>';
				if(quests&&quests[data[i].loc]){
					if(quests[data[i].loc][0]) qa+='<span class="hasq1">QUEST</span>';
					if(quests[data[i].loc][1]) qa+='<span class="hasq2">QUEST</span>';
				}
				con+='<tr class="'+cls+' loc_option travel_loc_'+data[i].id+'" data-reborn="'+data[i].reborn+'" data-nazwa="'+data[i].name+'" data-option="go_travel" data-loc="'+data[i].loc+'"><td>'+data[i].name+' '+qa+'</td><td>'+bons+'</td><td>'+this.rebPref(data[i].reborn)+'</td><td>'+this.convertSeconds(dur)+'</td><td>'+opts+'</td></tr>';
			}
			$('#travel_list').html(con);
			this.page_switch('game_travel');
			option_bind();
			tooltip_bind();
		break;
		case 26:
			this.charValuesBind(['tpp']);
			var data=res.tp_list.sort(function(a,b){return b.fav-a.fav||b.sort-a.sort});
			var len=data.length;
			var quests=res.quests;
			var con='';
			for(var i=0;i<len;i++){
				var cls='',qa='';
				if(data[i].fav) cls='fav';
				var opts='';
				var bons=this.parseLocBons(data[i]);
				if(this.char_data.loc!=data[i].loc){
					cls+=' option';
				}
				else cls+=' current';
				opts+='<button class="option fav" data-option="set_fav_loc" data-loc="'+data[i].id+'"></button>';
				if(quests&&quests[data[i].loc]){
					if(quests[data[i].loc][0]) qa+='<span class="hasq1">QUEST</span>';
					if(quests[data[i].loc][1]) qa+='<span class="hasq2">QUEST</span>';
				}
				con+='<tr class="'+cls+' loc2_option travel_loc_'+data[i].id+'" data-reborn="'+data[i].reborn+'" data-nazwa="'+data[i].name+'" data-option="go_teleport" data-loc="'+data[i].loc+'"><td>'+data[i].name+' '+qa+'</td><td>'+bons+'</td><td>'+this.rebPref(data[i].reborn)+'</td><td>'+opts+'</td></tr>';
			}
			$('#tp_list').html(con);
			this.page_switch('game_teleport');
			option_bind();
			tooltip_bind();
		break;
		case 27:
			$('.private_switch').hide();
			var data=res.private_list;
			var len=data.length;
			var con='';
			for(var i=0;i<len;i++){
				var koszt=Math.floor((data[i].gravity+data[i].conditions)/3*(data[i].type-259)),cls='';
				if(koszt>this.premium) cls='red';
				con+='<tr><td>'+data[i].name+'</td><td class="text-center">'+this.psize(data[i].type)+'</td><td class="text-center">'+this.dots(data[i].pop)+' ('+data[i].pn+'%)</td><td class="text-center">'+data[i].gravity+'G</td><td class="text-center">'+data[i].conditions+'</td><td class="text-center"><b class="'+cls+'">'+koszt+'</b><img src="/gfx/kp.png" /></td><td class="text-center"><button class="option btn_small_gold" data-option="buy_private" data-pid="'+data[i].id+'">'+LNG.lab67+'</button></td></tr>';
			}
			$('#private_but_list').html(con);
			$('#no_private').show();
			option_bind();
		break;
		case 28:
			var data=res.private_data;
			this.PRIVATE=data;
			var pd=res.pd;
			$('.private_switch').hide();
			$('#private_planet_name').text(data.name);
			$('#private_planet_gravity').text(data.gravity);
			$('#private_planet_conds').text(data.conditions);
			$('#private_planet_pr').text(this.dots(data.pr));
			$('#private_planet_pop').text(this.dots(data.pop));
			$('#private_planet_pn').text(data.pn+this.getStat(144));
			$('#private_planet_size').text(this.psize(data.type));
			$('#private_planet_time').text(this.convertTime(data.time));
			var trb=0,exp=0,terra='';
			trb=Math.round(pd[1].bon*data.s1+data.gravity/2);
			exp=Math.round(pd[3].bon*data.s3+data.conditions/4);
			if(data.formed) terra=LNG.lab68+'!';
			else terra='<button class="option btn_small_gold" data-option="do_terra">'+LNG.lab84+'</button>'; 
			$('#private_planet_trbon').text(trb);
			$('#private_planet_expbon').text(exp);
			$('#private_planet_terra').html(terra);
			$('#has_private').show();
			var len=pd.length,con='';
			
			for(var i=1;i<len;i++){
				var cost=pd[i].cost*(data['s'+i]*data['s'+i]*3)+10;
				var efv=pd[i].bon*data['s'+i];
				var build='';
				var max=10;
				if(i<9&&data.formed) max=15+this.getStructMaxPopBonus(data.pop);
				var l=Math.floor(data['s'+i]/3);
				if(l<1) l=1;
				if(data.pr>=cost&&data['s'+i]<max&&data.s_build==0) build='<button class="option btn_small_gold" data-option="private_str_up" data-str="'+i+'">'+LNG.lab69+'</button>';
				con+='<tr><td><div class="pstruc pstruc_'+i+'_'+l+'"></div>'+LNG['pp_str'+i]+'</td><td class="text-center">'+data['s'+i]+'/'+max+'</td><td class="grey">'+efv+this.item_stat(pd[i].stat)+'</td><td class="text-center">'+this.dots(cost)+'</td><td class="text-center">'+build+'</td></tr>';
				if(data.s_build==i){
					var time=this.getTime();
					var alls=data.s_btime-data.s_stime;
					var curs=data.s_btime-time;
					var wi=Math.round((1-curs/alls)*100);
					if(wi>100) wi=100;
					con+='<tr><td colspan=5 class="pstb"><span class="grey">&nbsp; '+LNG.lab70+':</span><div class="main_bar"><div class="progressBar style4" id="timed_bar" style="width: '+wi+'%;"></div><span>'+LNG.lab51+':  '+this.showTimer(data.s_btime-time,'data-special="2"')+'</span></div></td></tr>';
				}
				
				
			}
			$('#private_structs').html(con);
			option_bind();
		break;
		case 29:
			if(res.techs){
				var time=this.getTime();
				$('.current_techs').hide();
				if(this.char_data.tech1){
					$('#current_tech1_name').text(res.techs.tech1);
					$('#current_tech1').show();
				}
				if(this.char_data.tech2){
					$('#current_tech2_name').text(res.techs.tech2);
					$('#current_tech2').show();
				}
				//techniki
				var data=res.techs.techs;
				data=data.sort(function(a,b){return b.data.god-a.data.god||b.tech_id-a.tech_id});
				var len=data.length;
				var con='';
				var any=true;
				for(var i=0;i<len;i++){
					any=false;
					var tmp=this.prepareTechHeader(data[i].data);
					var req=tmp.req;
					var can_use=tmp.can_use;
					var opt='';
					var dmg='';
					/*
					if($techs[$i]['dmg_type']==1){$dmg=$techs[$i]['dmg']; $dtyp=LNG['TEH_CONS'];}
					if($techs[$i]['dmg_type']==2){$dmg=round(this.char_data['ki']*($techs[$i]['dmg']/100)); $dtyp=LNG['TEH_KIDE']+' - '.$techs[$i]['dmg']+' %';}
					if($techs[$i]['dmg_type']==4){$dmg=round(this.char_data['sila']*1.5+this.char_data['szyb']*1); $dtyp=LNG['TEH_TWDE']+' - 150% '+LNG['TEH_TWD1']+' + 100% '+LNG['TEH_TWD2']+'<br /><span class="red"><b>5%</b> '+LNG['TEH_TWD3']+'</b>';}
					
					*/
					switch(data[i].data.dmg_type){
						case 1: dmg=''+LNG.lab155+' <b class="green">'+this.dots(data[i].data.dmg)+'</b>'; break;
						case 2: 
							var dv=Math.round(this.char_data.ki*(data[i].data.dmg/100));
							dmg=''+LNG.lab156+' <i>'+LNG['atr5']+'<i> ( <b class="green">'+data[i].data.dmg+'</b>% ) - <b class="orange">'+this.dots(dv)+'</b>'; 
						break;
						case 4: 
							var dv=Math.round(this.char_data.sila*1.5+this.char_data.szyb);
							dmg=''+LNG.lab156+' <i>'+LNG['atr1']+'<i> ( <b class="green">150</b>% ) + <i>'+LNG['atr2']+'<i> ( <b class="green">100</b>% ) - <b class="orange">'+this.dots(dv)+'</b>'; 
						break;
					}
					if(can_use) opt='<button class="option newBtn" data-option="use_tech" data-tech="'+data[i].tech_id+'" data-slot="1">'+LNG.lab96+'</button> <button class="option newBtn" data-option="use_tech" data-tech="'+data[i].tech_id+'" data-slot="2">'+LNG.lab97+'</button>';
					con+='<tr><td><img src="/gfx/techniki/'+data[i].tech_id+'.png" /></td><td><h4>'+data[i].data.name+'</h4>'+data[i].data.opis+'<br />'+dmg+'<br />'+req+opt+'</td></tr>';
				}
				if(any) con=LNG.lab3;
				$('#tech_1_list').html(con);
				//transformacje
				var data=res.techs.transforms;
				data=data.sort(function(a,b){return b.data.god-a.data.god||b.tech_id-a.tech_id});
				var len=data.length;
				var con='';
				var any=true;
				for(var i=0;i<len;i++){
					any=false;
					var tmp=this.prepareTechHeader(data[i].data);
					var req=tmp.req;
					var can_use=tmp.can_use;
					var opt='',addop='';
					var dur=1;
					if(this.char_data.bonus8>time) dur=3;
					if(can_use) opt='<button class="option newBtn" data-option="use_transform" data-tech="'+data[i].tech_id+'">'+LNG.lab99+' [ '+dur+'h ]</button>';
					if(data[i].data.upgrade_type){
						if(data[i].data.upgrade_type==1){
							addop='<b>'+LNG.lab107+'</b><br />'+LNG.atr1+': x'+data[i].m1+'<br />'+LNG.atr2+': x'+data[i].m2+'<br />'+LNG.atr3+': x'+data[i].m3+'<br />'+LNG.atr4+': x'+data[i].m4+'<br />'+LNG.atr5+': x'+data[i].m5+'<br />';
							
							opt+='<button class="option newBtn" data-option="upgrade_mystic" data-m1="'+data[i].m1+'" data-m2="'+data[i].m2+'" data-m3="'+data[i].m3+'" data-m4="'+data[i].m4+'" data-m5="'+data[i].m5+'">'+LNG.lab56+'</button>';
						}
						if(data[i].data.upgrade_type==2&&data[i].data.ssjb){
							var can=false;
							addop=LNG.lab100+': <b>'+this.char_data.ssjb+'/'+data[i].data.ssjb_max+'</b><br />'+LNG.lab101+': <b>'+data[i].data.ssjb.ratio+'</b><br />';
							var len2=data[i].data.ssjb.bonuses.length;
							for(var j=0;j<len2;j++){
								addop+='<b>'+data[i].data.ssjb.bonuses[j][1]+'</b> '+this.item_stat(data[i].data.ssjb.bonuses[j][0])+'<br />';
							}
							if(this.char_data.ssjb>=21) data[i].data.name=LNG.lab382;
							if(this.char_data.ssjb>=26) data[i].data.name=LNG.lab383;
							if(this.char_data.ssjb<data[i].data.ssjb_max&&data[i].data.ssjb_next){
								can=true;
								addop+='<b>'+LNG.lab103+'</b>:<br />';
								var cls='';
								if(data[i].data.ssjb_next.gki_need>this.char_data.gki){
									can=false;
									cls='red';
								}
								addop+='&raquo; '+LNG.atr7+': <b class="'+cls+'">'+this.dots(data[i].data.ssjb_next.gki_need)+'</b><br />';
								var cls='';
								if(data[i].data.ssjb_next.st_need>data[i].data.tokens){
									can=false;
									cls='red';
								}
								addop+='&raquo; '+LNG.lab104+': <b class="'+cls+'">'+data[i].data.tokens+'/'+data[i].data.ssjb_next.st_need+'</b><br />';
								var cls='';
								if(data[i].data.ssjb_next.wb_need>data[i].data.badges){
									can=false;
									cls='red';
								}
								addop+='&raquo; '+LNG.lab105+': <b class="'+cls+'">'+data[i].data.badges+'/'+data[i].data.ssjb_next.wb_need+'</b><br />';
								var cls='';
								if(data[i].data.ssjb_next.cl_need>data[i].data.certs){
									can=false;
									cls='red';
								}
								addop+='&raquo; '+LNG.lab106+': <b class="'+cls+'">'+data[i].data.certs+'/'+data[i].data.ssjb_next.cl_need+'</b><br />';
								if(data[i].data.ssjb_next.ib_need){
									var cls='';
									if(data[i].data.ssjb_next.ib_need>data[i].data.bloods){
										can=false;
										cls='red';
									}
									addop+='&raquo; '+LNG.lab381+': <b class="'+cls+'">'+data[i].data.bloods+'/'+data[i].data.ssjb_next.ib_need+'</b><br />';
								}
							}
							if(can) opt+='<button class="option newBtn" data-option="upgrade_transform" data-tech="'+data[i].tech_id+'">'+LNG.lab56+'</button>';
						}
						
					}
					con+='<tr><td><img src="/gfx/techniki/'+data[i].tech_id+'.png" /></td><td><h4>'+data[i].data.name+'</h4>'+data[i].data.opis+'<br />'+addop+'<br />'+req+opt+'</td></tr>';
				}
				if(any) con=LNG.lab3;
				$('#tech_2_list').html(con);
				//uzytkowe
				var data=res.techs.utility;
				data=data.sort(function(a,b){return b.data.god-a.data.god||b.tech_id-a.tech_id});
				var len=data.length;
				var con='';
				var any=true;
				for(var i=0;i<len;i++){
					any=false;
					var tmp=this.prepareTechHeader(data[i].data);
					var req=tmp.req;
					var can_use=tmp.can_use;
					var opt='';
					if(can_use) opt='<button class="option newBtn" data-option="use_teleport">'+LNG.lab98+'</button>';
					con+='<tr><td><img src="/gfx/techniki/'+data[i].tech_id+'.png" /></td><td><h4>'+data[i].data.name+'</h4>'+data[i].data.opis+'<br />'+req+opt+'</td></tr>';
				}
				if(any) con=LNG.lab3;
				$('#tech_3_list').html(con);
				option_bind();
			}
		break;
		case 30:
			$('#mystic_item_needed').html('<b>'+res.item_name+'</b> x'+res.item_am);
			var data=res.available;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				con+='<option value="'+data[i].id+'" class="item'+data[i].class+'">'+data[i][this.lang_data['nauki'][this.lang]]+' x'+data[i].nv+'/'+data[i].stack+'</option>';
			}
			$('#mystic_item_ava').html(con);
			$('#mystic_stat_up').show();
			this.mystic_stat_choosen=res.mystic_stat;
		break;
		case 31: 
			var data=res.char_stats;
			var rfl=res.reb_fac_limit;
			var con='';
			var len=this.stats.length;
			for(var i=0;i<len;i++){
				var sid=i+1;
				var v1=0,v2=0;
				if(data[this.stats[i]]) v2=data[this.stats[i]];
				if(data['d_'+this.stats[i]]) v1=data['d_'+this.stats[i]];
				con+='<tr><td>'+LNG['char_stat'+sid]+'</td><td>'+this.dots(v1)+'</td><td>'+this.dots(v2)+'</td></tr>';
			}
			con+='<tr><td colspan="4"></td></tr><tr><td colspan="4">'+LNG.lab165+' : <span class="orange">'+this.dots(this.char_data.senzu_limit)+'</span> /'+this.dots(this.senzu_limit())+'</td></tr>';
			if(this.char_data.reborn==0){
				var moc=this.char_data.sila+this.char_data.szyb+this.char_data.wytrz+this.char_data.swoli+this.char_data.ki;
				var fb=Math.round(moc/10000000,3);
				if(rfl && fb>rfl) fb=rfl; 
				con+='<tr><td colspan="4">'+LNG.lab166+' : <span class="orange" id="future_wspol">'+this.dots(fb)+'</span></td></tr>';
			}
			if(this.char_data.reborn==1){
				var expm=Math.round(this.char_data.exp/5000),mocm=Math.round(this.char_data.moc/10);
				var fb=expm+mocm;
				con+='<tr><td colspan="4">'+LNG.lab167+' : <span class="orange" id="future_wspol">'+this.dots(fb)+'</span> ['+LNG.lab217+': <span class="green">'+this.dots(mocm)+'</span>, '+LNG.lab218+': <span class="green">'+this.dots(expm)+'</span>]</td></tr>';
			}
			if(this.char_data.reborn==2){
				var ps=0;
				var moc=this.char_data.sila+this.char_data.szyb+this.char_data.wytrz+this.char_data.swoli+this.char_data.ki;
				var mocm=Math.round(moc/100000000000);
				if(mocm>1000) mocm=1000;
				ps+=mocm;
				var wsplm=Math.round(this.char_data.reborn_bonus/100);
				if(wsplm>1000) wsplm=1000;
				ps+=wsplm;
				var fb=Math.round(this.char_data.god/10000);
				con+='<tr><td colspan="4">'+LNG.lab168+' : <span class="orange">'+this.dots(fb)+'</span></td></tr>';
				con+='<tr><td colspan="4">'+LNG.lab220+' : <span class="orange">'+this.dots(ps)+'</span> ['+LNG.lab217+': <span class="green">'+this.dots(mocm)+'</span>, '+LNG.lab219+': <span class="green">'+this.dots(wsplm)+'</span>] </td></tr>';
			}
			if(this.char_data.reborn==3){
				var gki=1000;
				var wtam=Math.floor(this.char_data.wta/100000000000);
				gki+=wtam;
				var moc=this.char_data.sila+this.char_data.szyb+this.char_data.wytrz+this.char_data.swoli+this.char_data.ki;
				var mocm1=Math.round(moc/10000000000000);
				gki+=mocm1;
				if(gki>1000000) gki=1000000;
				var ps=10;
				var levm=Math.floor(this.char_data.level/200);
				ps+=levm;
				var moc=this.char_data.sila+this.char_data.szyb+this.char_data.wytrz+this.char_data.swoli+this.char_data.ki+this.char_data.wta;
				var mocm2=Math.floor(moc/10000000000000000);
				ps+=mocm2;
				if(ps>150) ps=150;
				con+='<tr><td colspan="4">'+LNG.lab169+' : <span class="orange">'+this.dots(gki)+'</span> [1000 + '+LNG.lab217+': <span class="green">'+this.dots(mocm1)+'</span>, '+LNG.lab221+': <span class="green">'+this.dots(wtam)+'</span>]</td></tr>';
				con+='<tr><td colspan="4">'+LNG.lab170+' : <span class="orange">'+this.dots(ps)+'</span> [10+ '+LNG.lab217+': <span class="green">'+this.dots(mocm2)+'</span>, '+LNG.lab222+': <span class="green">'+this.dots(levm)+'</span>]</td></tr>';
			}
			$('#char_stats_container').html(con);
		break;
		case 32: //qb dupa
			var data=res.qb;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				var main='',track='<button class="option newBtn disabled" data-option="activate_track" data-qid="'+data[i].id+'">'+LNG.lab99+'</option>';
				if(data[i].track) track='<button class="option newBtn" data-option="cancel_track" data-qid="'+data[i].id+'">'+LNG.lab78+'</option>';
				if(data[i].main) main='[ '+LNG.lab113+' ]';
				if(data[i].rtype) main='[ '+LNG.lab182+' ]';
				if(this.char_data.instance_id) track='';
				var step='';
				if(data[i].sd){
					step='<div class="clr"></div>&raquo; <span class="grey">'+data[i].sd.title+'</span> <span class="green qb_right option" data-option="quick_travel" data-loc="'+data[i].sd.loc+'"><i class="upgrade_icon tpp"></i> '+data[i].sd.loc_name+'</span>';
				}
				con+='<tr><td><i class="mob_rank r6"></i><span class="orange qname">'+data[i].name+'</span> <div class="qb_right">'+main+'</div>'+step+'</td></td><td id="quest_track_td'+data[i].id+'">'+track+'</td></tr>';
			}
			$('#qb_list').html(con);
			option_bind();
		break;
		case 33:
			var data=res.md;
			var nm=data.name;
			if(data.rank) nm+=' [<b>'+LNG['mob_rank'+data.rank]+'</b>]';
			var add='';
			if(data.no_exp) add+='<li>'+LNG.lab115+'</li>';
			if(data.no_drop) add+='<li>'+LNG.lab116+'</li>';
			if(data.dmg_increase) add+='<li><b>'+data.dmg_increase+'</b> '+this.item_stat(30)+'</li>';
			if(data.anti_crit) add+='<li><b>'+data.anti_crit +'</b> '+this.item_stat(17)+'</li>';
			if(data.dmg_red) add+='<li><b>'+data.dmg_red+'</b> '+this.item_stat(31)+'</li>';
			if(data.stun_res) add+='<li><b>'+data.stun_res+'</b> '+this.item_stat(19)+'</li>';
			if(data.para_res) add+='<li><b>'+data.para_res+'</b> '+this.item_stat(21)+'</li>';
			if(data.dezo_res) add+='<li><b>'+data.dezo_res+'</b> '+this.item_stat(22)+'</li>';
			if(data.control_res) add+='<li><b>'+data.control_res+'</b> '+this.item_stat(56)+'</li>';
			if(data.abso_res) add+='<li><b>'+data.abso_res+'</b> '+this.item_stat(54)+'</li>';
			if(data.crit_shield) add+='<li><b>'+data.crit_shield+'</b> '+this.item_stat(18)+'</li>';
			if(data.gen_res) add+='<li><b>'+data.gen_res+'</b> '+this.item_stat(36)+'</li>';
			if(add=='') add=LNG.lab144;
			var techs='',had=false;
			for(var s=1;s<=20;s++){
				if(data['tech'+s]==0) continue;
				had=true;
				techs+='<div class="mob_tech">'+LNG.lab400+': <b>'+data['tech'+s+'_slot']+'</b>'+this.showTech(data['tech'+s],data['tech'+s+'_data'].cat_id,data['tech'+s+'_data'].cat2_id,data['tech'+s+'_lvl'])+'</div>';
			}
			if(!had) techs=LNG.lab144;
			$('#mob_desc_techs').html(techs);
			tech_bind();
			this.show_tech_dmg=false;
			$('#mob_desc_name').html(nm);
			$('#mob_desc_avatar').attr('src',data.avatar);
			$('#mob_desc_lvl').text(this.dots(data.level));
			$('#mob_desc_a1').text(this.dots(data.sila));
			$('#mob_desc_a2').text(this.dots(data.szyb));
			$('#mob_desc_a3').text(this.dots(data.wytrz));
			$('#mob_desc_a4').text(this.dots(data.moc));
			$('#mob_desc_a5').text(this.dots(data.swoli));
			$('#mob_desc_a6').text(this.dots(data.ener));
			$('#mob_desc_hp').text(this.dots(data.hp));
			$('#mob_desc_chakra').text(this.dots(data.chakra));
			$('#mob_desc_tai').text(this.dots(data.tai));
			$('#mob_desc_ken').text(this.dots(data.ken));
			$('#mob_desc_shuriken').text(this.dots(data.shuriken));
			$('#mob_desc_nin').text(this.dots(data.nin));
			$('#mob_desc_nin_fire').text(this.dots(data.nin_fire));
			$('#mob_desc_nin_water').text(this.dots(data.nin_water));
			$('#mob_desc_nin_earth').text(this.dots(data.nin_earth));
			$('#mob_desc_nin_wind').text(this.dots(data.nin_wind));
			$('#mob_desc_nin_thunder').text(this.dots(data.nin_thunder));
			$('#mob_desc_gen').text(this.dots(data.gen));
			$('#mob_desc_kin').text(this.dots(data.kin));
			$('#mob_desc_sen').text(this.dots(data.sen));
			$('#mob_desc_add').html(add);
			$('#mob_desc_con').show();
		break;
		case 34:
			var pages=res.all_pages;
			var page=res.page;
			this.log_page=page;
			var cimg='<img src="/gfx/kp.png" />';
			if(res.c==2) cimg='<img src="/gfx/kk.png" />';
			var pagi='';
			var pagi=LNG.lab272+' <b>'+page+'</b>/<b>'+pages+'</b> <button class="option newBtn" data-option="show_logs" data-page="'+(page-1)+'"><<</button> <button class="option newBtn" data-option="show_logs" data-page="'+(page+1)+'">>></button>';
			$('#clog_list_pagi').html(pagi);
			var con='';
			var data=res.logs;
			var len=data.length;
			var anynew=false;
			for(var i=0;i<len;i++){
				var serv='',charid='';
				if(data[i].char_id) charid=data[i].char_id;
				con+='<tr><td>'+LNG['kpl'+data[i].action]+'</td><td>'+this.dots(data[i].value)+' '+cimg+'</td><td>'+this.dots(data[i].balance)+' '+cimg+'</td><td>'+this.convertTime(data[i].time)+'</td><td>'+charid+'</td></tr>';
			}
			$('#clog_container').html(con);
			option_bind();
		break;
		case 35:
			var data=res.log;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				con+='<tr><td>'+this.convertTime(data[i].start_time)+' - '+this.convertTime(data[i].end_time)+'</td><td>'+data[i].login+'</td></tr>';
			}
			$('#zlog_container').html(con);
		break;
		case 36:
			//available
			var data=res.available;
			var len=data.length,con='';
			var simple=[];
			for(var i=0;i<len;i++){
				simple.push(data[i].cloth_id);
				var cls='option';
				if(this.char_data.cloth==data[i].cloth_id) cls='obtained';
				con+='<div class="cloth '+cls+'" data-option="use_cloth" data-cloth="'+data[i].cloth_id+'"><img src="/gfx/cloths/'+data[i].cloth_id+'.png" /></div>';
			}
			$('#wardobe_available').html(con);
			//defaults
			var data=res.default_gear;
			var len=data.basic[this.char_data.race].length,con='';
			for(var i=0;i<len;i++){
				var cls='option';
				var cloth=data.basic[this.char_data.race][i];
				if(simple.indexOf(cloth)!=-1) cls='obtained';
				else if(i>this.char_data.reborn) cls='notava';
				con+='<div class="cloth '+cls+'" data-option="obtain_free_cloth" data-cloth="'+i+'"><img src="/gfx/cloths/'+cloth+'.png" />'+this.rebPref(i)+'</div>';
			}
			$('#wardobe_defaults').html(con);
			con='';
			for(key in data.ranks){
				key=parseInt(key);
				if(!data.ranks.hasOwnProperty(key)) continue;
				var cls='option';
				var cloth=data.ranks[key];
				if(simple.indexOf(cloth)!=-1) cls='obtained';
				else if(this.char_data.ranga!=key) cls='notava';
				con+='<div class="cloth '+cls+'" data-option="obtain_rank_cloth" data-cloth="'+key+'"><img src="/gfx/cloths/'+cloth+'.png" />'+LNG['prank'+key]+'</div>';
			}
			$('#wardobe_ranked').html(con);
			this.maploaded=false;
			option_bind();
		break;
		case 37:
			var data=res.raids.list;
			this.raids=data;
			data=JSON.parse(JSON.stringify(data));
			var order=[0,1,5,9,2,3,4,6,7,8];
			var len=res.raids.count,con='';
			
			for(var i=1;i<=len;i++){
				var o=order[i];
				var lim=this.char_data['icd_'+data[o].id];
				con+='<tr class="option" data-option="show_instance" data-instance="'+data[o].id+'"><td class="instance_name">'+data[o][this.lang_data['lokacje'][this.lang]]+'</td><td>'+this.convertSeconds(data[o].register_time)+'</td><td>'+data[o].min_players+'/'+data[o].max_players+'</td><td>'+this.rebPref(data[o].req_reborn)+''+data[o].req_level+'</td><td>'+lim+'/'+data[o].daily_limit+'</td></tr>';
			}
			$('#inst_list_container').html(con);
			$('#instance_view').hide();
			option_bind();
		break;
		case 38:
			if(res.skill_data) this.skill_data=res.skill_data;
			for(var p=1;p<=2;p++){
				var order=this.skill_order[(p-1)];
				var con='<h1>'+LNG['skill_p'+p]+'</h1>';
				var len=order.length;
				for(var i=0;i<len;i++){
					var skill_id=order[i];
					con+=this.showSkill(skill_id);
				}
				con+='<div class="clr"></div>';
				$('#skill_page_'+p).html(con);
			}
			option_bind();
			tooltip_bind();
		break;
		case 39:
			this.sword_data=res.sword;
			if(res.sword_stats) this.sword_stats=res.sword_stats;
			$('#ts_class').removeClass().addClass('item'+this.sword_data.class).text(LNG['item_class'+this.sword_data.class]);
			if(res.sword_cost){
				var con=LNG.lab212+': <br /><div class="ekw_page_items">';
				var len=res.sword_cost.length;
				for(var i=0;i<len;i++){
					var cls='red';
					if(res.sword_cost[i].owned>=res.sword_cost[i].amount) cls='green'
					con+='<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+res.sword_cost[i].item+'"><img src="'+res.sword_cost[i].gfx+'" /><div><span class="'+cls+'">'+res.sword_cost[i].amount+'</span>/'+res.sword_cost[i].owned+'</div></div>';
				}
				con+='</div>';
				$('#ts_upgrade').html(con);
				main_ekw_item_bind();
				tooltip_bind();
			}
			else $('#ts_upgrade').html('<span class="red">'+LNG.lab211+'</span>');
			var con='<div class="spt">';
			//
			var len=this.sword_stats.length;
			for(var i=1;i<len;i++){
				con+='<span class="item'+this.sword_stats[i].need_class+'"><b>'+this.sword_stats[i].value+'</b> '+this.item_stat(this.sword_stats[i].stat)+'</span><br />';
			}
			con+='</div>';
			$('#sword_extra_stats').attr('data-original-title',con);
			//
			var bonatr=this.char_data.reborn+1;
			$('#st_bonatr').text(bonatr);
			var con='';
			for(var s=1;s<=3;s++){
				con+='<b>'+s+'</b>: <span class="orange">'+this.sword_data['stat'+s+'_val']+'</span> '+this.item_stat(this.sword_data['stat'+s])+'<br />';
			}
			$('#st_base_atrs').html(con);
			//
			var con='',used=[];
			var st=4,stm=st+bonatr;
			for(var s=st;s<stm;s++){
				if(this.sword_data['stat'+s]) used.push(this.sword_data['stat'+s]);
			}
			for(var s=st;s<stm;s++){
				var opts='<option value="0">['+LNG.lab144+']</option>';
				var len2=this.sword_stats.length;
				for(var j=1;j<len2;j++){
					if(this.sword_stats[j].need_class>this.sword_data.class) continue;
					var sel='';
					if(used.indexOf(this.sword_stats[j].stat)!=-1) sel='disabled'
					
					if(this.sword_stats[j].stat==this.sword_data['stat'+s]) sel+=' selected';
					opts+='<option value="'+j+'" '+sel+'><span class="orange">'+this.sword_stats[j].value+'</span> '+this.item_stat(this.sword_stats[j].stat)+'</option>';
				}
				con+='<b>'+s+'</b>: <div class="select_input"><select class="sword_atr_sel" data-slot="'+s+'">'+opts+'</select></div><br />';
			}
			$('#st_custom_atrs').html(con);
			$('.sword_atr_sel').off('change').on('change',function(){
				var slot=$(this).data('slot'),val=$(this).val();
				GAME.emitOrder({a:31,type:1,slot:slot,val:val,item_id:GAME.sword_data.id});
			});
			option_bind();
		break;
		case 40:
			var data=res.wanted;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				var prize='';
				if(data[i].prize.exp) prize+='<b class="green">'+this.dots(data[i].prize.exp)+'</b> <i class="ico exp"></i><br />';
				if(data[i].prize.kk) prize+='<b class="green">'+this.dots(data[i].prize.kk)+'</b> <img src="/gfx/kk.png" />';
				if(data[i].prize.item) prize+='<div class="ekw_page_items"><div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+data[i].prize.item.item_id+'"><img src="'+data[i].prize.item.gfx+'" /><div>'+data[i].prize.item.amount+'</div></div></div>';
				if(data[i].killer==this.char_id) prize+='<button class="gold_button option" data-option="wanted_prize" data-wanted="'+i+'">'+LNG.lab215+'</button>';
				con+='<div class="blueBg"><b class="red">'+data[i].name+'</b> '+LNG.lab1+' '+data[i].level+'<div class="pull-right">'+LNG.lab51+': '+this.showTimer(data[i].expires-this.getTime())+'</div><br />'+LNG.lab214+': <span class="green option" data-option="go_teleport" data-loc="'+data[i].loc+'">'+data[i][this.lang]+'</span> '+this.rebPref(data[i].reborn)+'<br />'+LNG.lab21+':<br />'+prize+'<div class="clr"></div></div>';
			}
			$('#wanted_list').html(con);
			main_ekw_item_bind();
			tooltip_bind();
			option_bind();
		break;
		case 41:
			if(res.hasOwnProperty('dbd')){
				var blacks=res.dbd;
				$('#dbdc').text(this.dots(blacks));
				if(blacks>=7){
					var sets=Math.floor(blacks/7);
					$('#dbd_sets_collected').text(this.dots(sets));
					$('#bdb_wish').show();
					$('#bsk_max').data('max',sets);
					var w2=false;
					if(this.char_data.reborn>=1&&!(this.char_data.reborn>=3&&this.char_data.reborn_bonus>=1000)&&this.char_data.reborn<4) w2=true;
					if(w2) $('#bwish2').show();
					else $('#bwish2').hide();
					var w3=false;
					if(this.char_data.reborn==2) w3=true;
					if(w3) $('#bwish3').show();
					else $('#bwish3').hide();
					var w4=false;
					if(this.char_data.reborn>=3) w4=true;
					if(w4) $('#bwish4').show();
					else $('#bwish4').hide();
					var w5=false;
					if(this.char_data.reborn>=4) w5=true;
					if(w5) $('#bwish5').show();
					else $('#bwish5').hide();
					var w6=false;
					if(this.char_data.reborn>=4) w6=true;
					if(w6) $('#bwish6').show();
					else $('#bwish6').hide();
				}
				else $('#bdb_wish').hide();
			}
			if(res.psk_reward){
				var rew='<b>'+LNG.lab223+'</b><br />';
				if(res.psk_reward.a) rew+='<span class="orange">'+LNG['atr'+res.psk_reward.a]+'</span> + <b>'+this.dots(res.psk_reward.v)+'</b><br />';
				if(res.psk_reward.psk) rew+='+ <span class="orange">'+this.dots(res.psk_reward.psk)+'</span> <b>'+LNG.shop_chup_minor_ball+'</b><br />';
				if(res.psk_reward.rb) rew+='+ <span class="orange">'+this.dots(res.psk_reward.rb)+'</span> <b>'+LNG.shop_chup_reborn_bonus+'</b><br />';
				if(res.psk_reward.god) rew+='+ <span class="orange">'+this.dots(res.psk_reward.god)+'</span> <b>'+LNG.shop_chup_god+'</b><br />';
				if(res.psk_reward.sen) rew+='+ <span class="orange">'+this.dots(res.psk_reward.sen)+'</span> <b>'+LNG.quest_prize39+'</b><br />';
				if(res.psk_reward.kk) rew+='+ <span class="orange">'+this.dots(res.psk_reward.kk)+'</span> <img src="/gfx/kk.png" /><br />';
				if(res.psk_reward.prmax) rew+='+ <span class="orange">'+this.dots(res.psk_reward.prmax)+'</span> <b>'+LNG.char_stat_pr_max+'</b><br />';
				if(res.psk_reward.prph) rew+='+ <span class="orange">'+this.dots(res.psk_reward.prph)+'</span> <b>'+LNG.char_stat_pr_ph+'</b><br />';
				if(res.psk_reward.items.length){
					var len=res.psk_reward.items.length;
					rew+='<div class="ekw_page_items">';
					for(var i=0;i<len;i++){
						rew+='<div class="ekw_slot"><img src="'+res.psk_reward.items[i].gfx+'" /><div>'+res.psk_reward.items[i].am+'</div></div>';
					}
					rew+='</div>';
				}
				this.komunikat(rew);
			}
			if(this.char_data.minor_ball>=7){
				var sets=Math.floor(this.char_data.minor_ball/7);
				$('#psk_sets_collected').text(this.dots(sets));
				$('#psk_wish').show();
				$('#psk_max').data('max',sets);
			}
			else $('#psk_wish').hide();

			if(res.hasOwnProperty('mdb')){
				var time=this.getTime();
				var owned=0;
				for(var r=0;r<=4;r++){
					var lock='';
					if(res.dbl[r]>time) lock='<b class="red">'+LNG.lab230+'</b>: '+this.showTimer(res.dbl[r]-time);
					var con='<div class="db_owners">'+lock+'<br /><b>'+LNG.lab228+'</b>:<br /><div>';
					var balls=res.mdb[r].sort(function(a,b){return a.ball_num-b.ball_num});
					for(var o=0;o<7;o++){
						var status='';
						if(balls[o].owner){
							status='<b class="orange option" data-option="show_player" data-char_id="'+balls[o].owner+'">'+balls[o].owner_name+'</b><br />['+balls[o].loc_name+']';
							if(balls[o].owner==this.char_id) owned++;
							else if(r==this.char_data.reborn) status+='<br /><button class="option btn_small_gold" data-option="ball_fight" data-ball_id="'+balls[o].id+'" data-char_id="'+balls[o].owner+'">'+LNG.lab232+'</button>';
						}
						else status='<span class="red">'+LNG.lab229+'</span>';
						con+='<div class="ball_con"><div class="dbim star'+balls[o].ball_num+'"></div><div class="dbstat">'+status+'</div></div>';
					}
					con+='</div></div><div class="db_history"><button class="btn_small_gold option" data-option="load_db_history" data-type="'+r+'">'+LNG.lab231+'</button><div id="db_story_'+r+'"></div></div>';
					$('#mdbp_'+r).html(con);
				}
				if(owned>=7){
					$('#mdb_wish').show();
				}
				else $('#mdb_wish').hide();
				var mdb=this.char_data.reborn;
				$('#mdbp_'+mdb).show();
				$('.mdbb[data-page="'+mdb+'"]').removeClass('active').addClass('active');
				option_bind();
			}
		break;
		case 42:
			var data=res.history,con='';
			var len=data.length;
			for(var i=0;i<len;i++){
				con+='<div class="dbl_entry">'+this.convertTime(data[i].time)+'<br /><b>'+data[i].char_name+'</b> - <span class="orange">'+LNG['dbwish'+data[i].wish]+'</span></div>';
			}
			$('#db_story_'+res.type).html(con);
		break;
		case 43: //player profile
			$('#klan_desc_con').hide();
			var pd=res.pd;
			var titty='';
			if(pd.titles){
				var len=pd.titles.length;
				for(var i=0;i<len;i++){
					titty+='<font color="'+pd.titles[i].color+'">&lt;'+pd.titles[i][this.lang]+'&gt;</font><br />';
				}
			}
			$('#pd_titles').html(titty);
			var abis=['ken','shuriken','nin','gen','kin','sen','fuin','nin_fire','nin_water','nin_earth','nin_wind','nin_thunder'];
			var len=abis.length;
			$('.pd_abi').hide();
			$('#pd_tai').text(this.dots(pd.tai));
			for(var i=0;i<len;i++){
				if(pd[abis[i]]){
					$('#pd_abi_'+abis[i]).show();
					$('#pd_'+abis[i]).text(this.dots(pd[abis[i]]));
				}
			}
			$('#pd_pvp_win').text(this.dots(pd.pvp_win));
			$('#pd_pvp_lose').text(this.dots(pd.pvp_lose));
			$('#pd_pvp_draw').text(this.dots(pd.pvp_draw));
			$('#pd_fame').text(this.dots(pd.war_points));
			$('#pd_mis_done').text(this.dots(pd.m_all));
			$('#pd_mis_d').text(this.dots(pd.m_1));
			$('#pd_mis_c').text(this.dots(pd.m_2));
			$('#pd_mis_b').text(this.dots(pd.m_3));
			$('#pd_mis_a').text(this.dots(pd.m_4));
			$('#pd_mis_s').text(this.dots(pd.m_5));
			$('#pd_name').html('<div class="sex sex'+pd.sex+'"></div> '+pd.name);
			$('#pd_name_avatar').attr('src',pd.avatar);
			$('#pd_lvl').html(this.rebPref(pd.reborn)+this.dots(pd.level));
			for(var a=1;a<=7;a++){
				if(pd['a'+a]==-1) $('#pd_a'+a).text('???');
				else $('#pd_a'+a).text(this.dots(pd['a'+a]));
			}
			$('#pp_quick_pw').data('char_name',pd.name)
			if(pd.id!=this.char_id) $('#pp_quick_friend').data('char_name',pd.name).show();
			else $('#pp_quick_friend').hide();
			$('#pd_rank').html('<span class="player_rank'+pd.ranga+'">'+LNG['prank'+pd.ranga]+'</span>');
			$('#pd_loc').text(pd.loc);
			$('#pd_pvm').text(this.dots(pd.kills));
			$('#pd_pvp').text(this.dots(pd.pvp));
			var klan='['+LNG.lab144+']';
			if(pd.klan_id) klan='<a>'+pd.surname+'</a>';
			$('#pd_klan').html(klan).data('klan_id',pd.klan_id);
			var empire='['+LNG.lab144+']';
			if(pd.village_id) empire='<img class="select_page" data-page="game_empire" data-arg="'+pd.village_id+'" title="'+LNG['village'+pd.village_id]+'" src="/gfx/villages/head/'+pd.village_id+'.png" width="50" /></a>';
			$('#pd_village').html(empire);
			$('#pd_hasorg').hide();
			if(pd.org){
				$('#pd_org').html(pd.org_name).data('org_id',pd.org);
				$('#pd_hasorg').show();
			}
			$('#pd_pact').html(LNG['pakt_name'+pd.pact_type]);
			var act='';
			if(pd.online) act='<img src="/gfx/dots/1.png" /> online';
			else act='<img src="/gfx/dots/5.png" />'+this.convertTime(pd.pr_time);
			$('#pd_activity').html(act);
			$('#pd_power').text(this.dots(pd.moc))
			$('#player_desc_con').show();
			$('#player_ekw').removeClass().addClass('ekw_bck').addClass('tlo_ekw'+pd.race);
			for(var s=1;s<=this.item_slots;s++){
				$('#pdekw_use_slot'+s).empty().attr('data-original-title','<div class="tt">'+LNG['item_slot'+s]+'</div>').removeClass('player_ekw_item').attr('data-item_id',0).attr('data-load_go',0).attr('data-item_class',0);
			}
			var items=pd.ekw;
			if(items&&items.length){
				var len=items.length;
				for(var i=0;i<len;i++){
					var slot=items[i].slot;
					var item='<img src="'+items[i].gfx+'" />';
					$('#pdekw_use_slot'+slot).html(item).addClass('player_ekw_item').attr('data-item_id',items[i].id);
				}
			}
			var con='';
			var len=pd.achis.length;
			for(var i=0;i<len;i++){
				con+='<img src="/gfx/medals/'+pd.achis[i].achi_id+'_'+pd.achis[i].level+'.png" data-toggle="tooltip" data-original-title="<div class=tt><b class=orange>'+LNG['game_achievement'+pd.achis[i].achi_id]+'</b></div>" />';
			}
			$('#pd_achis_con').html(con);
			if(pd.pet){
				var petd='<img src="'+pd.pet.avatar+'" data-toggle="tooltip" data-original-title="'+this.getPetDetails(pd.pet)+'" />';
				$('#pd_pet_con').html(petd);
			}
			else $('#pd_pet_con').html('');
			if(pd.emp){
				var petd='<img src="/gfx/employee/'+pd.emp.type+'.png" data-toggle="tooltip" data-original-title="'+this.getEmpDetails(pd.emp)+'" />';
				$('#pd_emp_con').html(petd);
			}
			else $('#pd_emp_con').html('');
			var friends='';
			
			var len=pd.friends.length;
			for(var i=0;i<len;i++){
				var on='<img src="/gfx/dots/5.png" class="online" />';
				if(pd.friends[i].online) on='<img src="/gfx/dots/1.png" class="online" />';
				friends+='<div class="pd_friend" data-toggle="tooltip" data-original-title="<div class=tt><b class=orange>'+pd.friends[i].name+'</b></div>">'+on+'<img src="'+pd.friends[i].avatar+'" class="option" data-option="show_player" data-char_id="'+pd.friends[i].friend_id+'" /></div>';
			}
			$('#pd_friends').html(friends);
			var pdtext=this.parseBB(pd.text);
			$('#pd_text').html(pdtext);
			var ele='';
			if(pd.cnature1&&(pd.nin_fire||pd.nin_water||pd.nin_earth||pd.nin_wind||pd.nin_thunder)) ele='<img src="/gfx/elements/'+pd.cnature1+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['element'+pd.cnature1]+'</div>" />';
			if(pd.cnature2) ele+='<img src="/gfx/elements/'+pd.cnature2+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['element'+pd.cnature2]+'</div>" />';
			if(pd.cnature3) ele+='<img src="/gfx/elements/'+pd.cnature3+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['element'+pd.cnature3]+'</div>" />';
			//if(ele!='') ele='<b>asda</b><br />'+ele;
			$('#pd_elements').html(ele);
			var spec='';
			if(pd.special2) spec+='<img src="/gfx/jutsu/4_'+pd.special2+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['ninjaspec'+pd.special2]+'</div>" />';
			if(pd.special3) spec+='<img src="/gfx/jutsu/6_'+pd.special3+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['ninjaspec'+pd.special3]+'</div>" />';
			$('#pd_specs').html(spec);
			var kg='';
			if(pd.kgenkai) kg+='<img src="/gfx/jutsus/8_'+pd.kgenkai+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['kg'+pd.kgenkai]+'</div>" />';
			if(pd.kakkai_touta) kg+='<img src="/gfx/jutsus/9_'+pd.kakkai_touta+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['kt'+pd.kakkai_touta]+'</div>" />';
			$('#pd_kekkei').html(kg);
			var bp='';
			if(pd.bc){
				bp+='<img src="/gfx/pakty/'+pd.bc+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['bpact'+pd.bc]+'</div>" />';
				
			}
			$('#pd_pact').html(bp);
			option_bind();
			tooltip_bind();
			player_ekw_item_bind();
			page_bind();
		break;
		case 44:
			if(res.hasOwnProperty('friends')){
				var data=res.friends;
				var len=data.length||0,con='',any=false;
				$('#char_friend_cnt').text(len);
				for(var i=0;i<len;i++){
					any=true;
					var on='<img src="/gfx/dots/5.png" class="online" />';
					if(data[i].online) on='<img src="/gfx/dots/1.png" class="online" />';
					con+='<div class="li_friend">'+on+'<img src="'+data[i].avatar+'" class="option" data-option="show_player" data-char_id="'+data[i].friend_id+'" data-toggle="tooltip" data-original-title="<div class=tt><b class=orange>'+data[i].name+'</b></div>" /><button class="option newBtn" data-option="delete_friend" data-char_id="'+data[i].friend_id+'">'+LNG.lab192+'</button></div>';
				}
				if(!any) con=LNG.lab3;
				$('#char_friend_list').html(con);
			}
			if(res.hasOwnProperty('on_list')){
				var data=res.on_list;
				var len=data.length,con='',any=false;
				for(var i=0;i<len;i++){
					any=true;
					var on='<img src="/gfx/dots/5.png" class="online" />';
					if(data[i].online) on='<img src="/gfx/dots/1.png" class="online" />';
					con+='<div class="li_friend">'+on+'<img src="'+data[i].avatar+'" class="option" data-option="show_player" data-char_id="'+data[i].char_id+'" data-toggle="tooltip" data-original-title="<div class=tt><b class=orange>'+data[i].name+'</b></div>" /><button class="option newBtn" data-option="delete_friend_from" data-rid="'+data[i].id+'">'+LNG.lab78+'</button></div>';
				}
				if(!any) con=LNG.lab3;
				$('#char_on_friend_list').html(con);
			}
			if(res.hasOwnProperty('own_requests')){
				var data=res.own_requests;
				var len=data.length,con='',any=false;
				for(var i=0;i<len;i++){
					any=true;
					con+='<div><b class="green option" data-option="show_player" data-char_id="'+data[i].data.receiver_id+'">'+data[i].data.target_name+'<b></div>';
				}
				if(!any) con=LNG.lab3;
				$('#char_friend_own_requests').html(con);
			}
			if(res.hasOwnProperty('others_requests')){
				var data=res.others_requests;
				var len=data.length,con='',any=false;
				for(var i=0;i<len;i++){
					any=true;
					con+='<div><b class="green option" data-option="show_player" data-char_id="'+data[i].data.sender_id+'">'+data[i].data.sender_name+'</b> <button class="option btn_small_gold" data-option="process_friend_req" data-decision="1" data-rid="'+data[i].id+'">'+LNG.lab194+'</button> <button class="option btn_small_gold" data-option="process_friend_req" data-decision="2" data-rid="'+data[i].id+'">'+LNG.lab195+'</button></div>';
				}
				if(!any) con=LNG.lab3;
				$('#char_friend_own_invites').html(con);
			}
			option_bind();
			tooltip_bind();
		break;
		case 45:
			if(res.abons) this.achi_bons=res.abons;
			if(res.adata) this.achi_data=res.adata;
			if(res.achievements){
				var data=res.achievements;
				var len=data.length,con='';
				var max_lvl=3;
				if(this.char_data.reborn>=4) max_lvl=6;
				for(var i=0;i<len;i++){
					var next=0,pr=100;
					if(data[i].level<max_lvl){
						next=this.achi_data[data[i].achi_id][data[i].level];
						pr=Math.floor(data[i].counter/next*100);
						if(pr>100) pr=100;
					}
					var bon='',prize='',medal='<div class="medal">',counter='<div class="main_bar big"><span>'+this.dots(data[i].counter)+' / '+this.dots(next)+'</span></span><div class="progressBar style3" style="width:'+pr+'%"></div></div>';
					if(data[i].level) medal+='<img src="/gfx/medals/'+data[i].achi_id+'_'+data[i].level+'.png" />';
					medal+='</div>';
					if(this.achi_bons[data[i].achi_id][0]&&data[i].level>0){
						var val=this.achi_bons[data[i].achi_id][1]*data[i].level;
						bon='<b class="green">'+val+'</b> '+this.item_stat(this.achi_bons[data[i].achi_id][0]);
					}
					var priz=this.achi_prize_check(data[i].prize_gained,data[i].level);
					if(priz) prize='<span class="pull-right">'+LNG.lab238+': <b class="orange">'+priz+'</b> <img src="/gfx/kk.png" /> <button class="btn_small_gold option" data-option="receive_achi_prize" data-achi="'+data[i].achi_id+'">'+LNG.lab239+'</button></span>';
					con+='<div class="achievement">'+medal+' <b>'+LNG['game_achievement'+data[i].achi_id]+'</b> - <span class="achi_'+data[i].level+'">'+LNG['achievement_level'+data[i].level]+'</span><span class="grey pull-right">'+LNG['achie_req'+data[i].achi_id]+'</span><br />'+counter+'<br />'+bon+prize+'<div class="clr"></div></div>';
				}
				$('#char_achievements').html(con);
				option_bind();
			}
		break;
		case 46:
			$('#new_pw_btn').show();
			//$('#new_pw_container').hide();
			$('#pw_view').hide();
			var pages=res.all_pages;
			var page=res.page;
			this.rap_page=page;
			$('#pw_checkAll').prop('checked',false);
			var pagi='';
			for(var p=1;p<=pages;p++){
				var cls='';
				if(p==page) cls=' active';
				pagi+='<button class="'+cls+' newBtn option" data-option="show_pws" data-page="'+p+'">['+p+']</button>';
			}
			$('#pw_list_pagi').html(pagi);
			
			var data=res.pws;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				var rep='',opt='';
				if(data[i].read){
					rep+='<img id="new_pw_id'+data[i].id+'" data-rid="'+data[i].id+'" src="/gfx/icons/new_pw.png" />';
					anynew=true;
				}
				opt='class="clickable option" data-option="open_pw" data-pid="'+data[i].id+'" data-page="1"';
				rep+=' '+data[i].temat;
				con+='<tr><td><div class="newCheckbox"><input type="checkbox" id="pw_'+data[i].id+'" class="pw_check" value="'+data[i].id+'" /><label for="pw_'+data[i].id+'"></label></div></td><td '+opt+'>'+rep+'</td><td><b class="orange option" data-option="show_player" data-char_id="'+data[i].nadawca+'">'+data[i].nadawca_name+'</b></td><td>'+data[i].answers+'</td><td>'+this.convertTime(data[i].time)+'</td></tr>';
			
			}
			$('#pw_container').html(con);
			option_bind();
		break;
		case 47:
			var newp=res.new_pws;
			if(newp>0){
				var html='<div class="icon newpw" />('+this.dots(newp)+')';
				$('#new_pw_con').fadeIn().html(html);
			}
			else $('#new_pw_con').hide();
		break;
		case 48:
			var data=res.pw_head;
			this.current_pw=data.id;
			this.current_pw_text=data.texts;
			var pagi='';
			for(var p=1;p<=res.ans_all_pages;p++){
				var cls='';
				if(p==res.page) cls=' active';
				pagi+='<button class="'+cls+' newBtn option" data-option="open_pw" data-pid="'+this.current_pw+'" data-page="'+p+'">['+p+']</button>';
			}
			$('#pw_ans_pagi').html(pagi);
			
			$('#pw_view').show();
			$('#new_pw_container').hide();
			$('#new_pw_btn').show();
			$('#pw_view_topic').text(data.temat);
			
			var ans=res.texts;
			var len=ans.length,con='';
			for(var i=0;i<len;i++){
				var cls='other';
				if(ans[i].autor==this.char_id) cls='me';
				con+='<div class="message '+cls+'"><div class="message_header"><b class="orange option pull-left" data-option="show_player" data-char_id="'+ans[i].autor+'">'+ans[i].autor_name+'</b> <span class="pull-right">'+this.convertTime(ans[i].time)+'</span></div><div class="clr">'+this.parseContent(ans[i].tresc)+'</div></div>';
			}
			$('#answer_list').html(con+'<div class="clr"></div>');
			option_bind();
		break;
		case 49:
			if(res.ranking.klan_rank){ //klan rank
				var data=res.ranking.klan_rank;
				var page=res.ranking.page;
				this.rank_findby=false;
				this.rank_findbyv=false;
				this.rank_page=page;
				var field=res.ranking.field;
				this.rank_field=field;
				var pp=page-1,np=page+1;;
				$('#rank_search_name').text(this.char_data.name);
				$('#rank_page_back').data('page',pp);
				$('#rank_page_next').data('page',np);
				var len=this.klan_rank_fields.length,options='';
				for(var i=0;i<len;i++){
					options+='<option value="'+this.klan_rank_fields[i]+'">'+LNG['krank_'+this.klan_rank_fields[i]]+'</option>';
				}
				var len=data.length,con='';
				$('#rank_field4').html(options);
				$('#rank_field4 option[value='+field+']').prop('selected', true)
				$('.rank_selector').prop("selectedIndex", 0);
				if(res.ranking.findby){
					this.rank_findby=res.ranking.findby;
					this.rank_findbyv=res.ranking.findbyv;
					$('#rank_'+res.ranking.findby+' option[value="'+res.ranking.findbyv+'"]').prop('selected', true)
				}
				for(var i=0;i<len;i++){
					var cls='';
					var p=((page-1)*20)+i+1;
					
					if(this.char_data.klan_id>0&&data[i].id==this.char_data.klan_id) cls='isclan';
					con+='<tr class="'+cls+'"><td>'+p+'</td><td class="al"><span class="orange option" data-option="show_clan" data-klan_id="'+data[i].id+'"><img src="'+data[i].emblem+'" /> '+data[i].short+'</span></td><td>'+data[i].players+'</td><td>'+this.dots(data[i][field])+'</td></tr>';
				}
				$('#rank_table4').html(con);
				$('#rank_4').show();
			}
			/*
			if(res.ranking.emp_rank){ //employee rank
				var data=res.ranking.emp_rank;
				var page=res.ranking.page;
				var pp=page-1,np=page+1;;
				$('#rank_page_back').data('page',pp);
				$('#rank_page_next').data('page',np);
				var len=data.length,con='';
				for(var i=0;i<len;i++){
					var cls='';
					var p=((page-1)*20)+i+1;
					if(data[i].char_id==this.char_id) cls='isme';
					con+='<tr class="'+cls+'"><td>'+p+'</td><td class="al">'+data[i].name+'</td><td class="al"><span class="orange option" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].char_name+'</span></td><td>'+this.dots(data[i].level)+'</td><td>'+data[i].maxenergy+'</td></tr>';
				}
				$('#rank_table3').html(con);
				$('#rank_3').show();
			}
			if(res.ranking.pet_rank){ //pet rank
				var data=res.ranking.pet_rank;
				var page=res.ranking.page;
				var pp=page-1,np=page+1;;
				$('#rank_page_back').data('page',pp);
				$('#rank_page_next').data('page',np);
				var len=data.length,con='';
				for(var i=0;i<len;i++){
					var cls='';
					var p=((page-1)*20)+i+1;
					if(data[i].char_id==this.char_id) cls='isme';
					con+='<tr class="'+cls+'"><td>'+p+'</td><td class="al">'+data[i].name+'</td><td class="al"><span class="orange option" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].char_name+'</span></td><td>'+data[i].evo_lvl+'</td><td>'+this.rebPref(data[i].reborn)+this.dots(data[i].level)+'</td></tr>';
				}
				$('#rank_table2').html(con);
				$('#rank_2').show();
			}
			*/
			if(res.ranking.rank){ //char_rank
				var data=res.ranking.rank;
				var page=res.ranking.page;
				this.rank_findby=false;
				this.rank_findbyv=false;
				this.rank_page=page;
				var field=res.ranking.field;
				this.rank_field=field;
				var pp=page-1,np=page+1;;
				$('#rank_search_name').text(this.char_data.name);
				$('#rank_page_back').data('page',pp);
				$('#rank_page_next').data('page',np);
				var len=this.char_rank_fields.length,options='';
				for(var i=0;i<len;i++){
					options+='<option value="'+this.char_rank_fields[i]+'">'+LNG['crank_'+this.char_rank_fields[i]]+'</option>';
				}
				var len=data.length,con='';
				$('#rank_field').html(options);
				$('#rank_field option[value='+field+']').prop('selected', true)
				$('.rank_selector').prop("selectedIndex", 0);
				if(res.ranking.findby){
					this.rank_findby=res.ranking.findby;
					this.rank_findbyv=res.ranking.findbyv;
					$('#rank_'+res.ranking.findby+' option[value="'+res.ranking.findbyv+'"]').prop('selected', true)
				}
				for(var i=0;i<len;i++){
					var klan='',empire='',change='',cls=''; 
					if(data[i].klan_id) klan='<span class="orange option" data-option="show_clan" data-klan_id="'+data[i].klan_id+'">'+data[i].klan+'</span>';
					if(data[i].village_id) empire=this.showVillage(data[i].village_id,data[i].ranga);
					if(data[i][field+'_old']==0) change='<span class="grey">'+LNG.lab242+'</span>';
					else{
						var tmp=data[i][field]-data[i][field+'_old'];
						if(tmp<0){
							tmp*=-1;
							change='<span class="rank_up">↑ '+tmp+'</span>';
						}
						else if(tmp>0) change='<span class="rank_down">↓ '+tmp+'</span>';
						else change='<span class="rank_equal">--</span>';
					}
					if(this.char_data.klan_id>0&&data[i].klan_id==this.char_data.klan_id) cls='isclan';
					if(data[i].char_id==this.char_id) cls='isme';
					con+='<tr class="'+cls+'"><td>'+data[i][field]+'</td><td>'+change+'</td><td class="al">'+klan+' <span class="orange option" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].name+'</span></td><td class="rank_kg">'+this.bestKG(data[i].kg,data[i].kt)+'</td><td class="rank_vill">'+empire+'</td><td>'+this.rebPref(data[i].reborn)+this.dots(data[i].level)+'</td><td>'+this.dots(data[i][field+'_value'])+'</td></tr>';
				}
				$('#rank_table').html(con);
				$('#rank_1').show();
			}
			option_bind();
			tooltip_bind();
			page_bind();
		break;
		case 50:
			if(res.upg_data) this.upg_data=res.upg_data;
			if(res.subs){
				this.char_subs=res.subs;
				$('#lab_substances').text(this.dots(res.subs));
			}
			if(res.upgrades){
				var ms_costs=[0,10,1000,10000,100000,500000];
				var upgs=res.upgrades;
				var len=upgs.length;
				var up_lvls={};
				for(var i=0;i<len;i++){
					up_lvls[upgs[i].upgrade_id]=upgs[i].level;
				}
				var skills=res.skills;
				var len=skills.length;
				var skills_lvls={};
				for(var i=0;i<len;i++){
					skills_lvls[skills[i].skill_id]=skills[i].level;
				}
				var char_stats=res.char_stats;
				var len=this.upg_data.length,con='';
				for(var i=1;i<len;i++){
					if(!up_lvls[i]) up_lvls[i]=0;
					var values='',levels='',bon=0,ulevel=up_lvls[i],res='';
					for(var l=1;l<=5;l++){
						var cls='orange';
						if(up_lvls[i]>=l){
							cls='green';
							levels+='<div class="lab_icon hl"></div>';
							bon+=this.upg_data[i].values[l-1];
						}
						else levels+='<div class="lab_icon nl"></div>';
						values+=' <span class="'+cls+'">'+this.dots(this.upg_data[i].values[l-1])+'</span> ';
						if(l<5) values+='+';
					}
					var upgrade='';
					if(ulevel<5){
						res=''+LNG.lab18+': ';
						var ind=ulevel; 
						switch(this.upg_data[i].req_type){
									case 1:
										var cls='red';
										if(this.char_data.reborn>=4&&this.upg_data[i].req_option=='reborn_bonus') this.upg_data[i].req_values[ind]=0;
										if(this.char_data[this.upg_data[i].req_option]>=this.upg_data[i].req_values[ind]){
											cls='green';
											can_upg=true;
										}
										res+=LNG['crank_'+this.upg_data[i].req_option]+': <b class='+cls+'>'+this.dots(this.char_data[this.upg_data[i].req_option])+'</b>/<b class=grey>'+this.dots(this.upg_data[i].req_values[ind])+'</b>';
									break;
									case 2:
										var cls='red';
										if(char_stats[this.upg_data[i].req_option]>=this.upg_data[i].req_values[ind]){
											cls='green';
											can_upg=true;
										}
										var sid=this.stats.indexOf(this.upg_data[i].req_option)+1;
										res+=LNG.lab274+' - '+LNG['char_stat'+sid]+': <b class='+cls+'>'+char_stats[this.upg_data[i].req_option]+'</b>/<b class=grey>'+this.dots(this.upg_data[i].req_values[ind])+'</b>';
									break;
									case 3:
										var cls='red';
										if(skills_lvls[this.upg_data[i].req_option]>=this.upg_data[i].req_values[ind]){
											cls='green';
											can_upg=true;
										}
										res+=LNG.lab275+' - '+LNG['skill_name'+this.upg_data[i].req_option]+': <b class='+cls+'>'+this.dots(skills_lvls[this.upg_data[i].req_option])+'</b>/<b class=grey>'+this.dots(this.upg_data[i].req_values[ind])+'</b>';
									break;
						}
						var cls3='',cls4='';
						if(this.char_subs>=ms_costs[ind+1]) cls3='green'; else cls3='red';
						if(this.premium>=1) cls4='green'; else cls4='red';
						var cst='<b class='+cls3+'>'+this.dots(ms_costs[ind+1])+'</b> '+LNG.lab276;
						if(ind==4) cst+=' + <b class='+cls4+'>1</b> <img src=/gfx/kp.png />';
						res+='<br />'+LNG.lab277+':<br />'+cst+'';
						
						upgrade='<button class="pull-right btn_small_gold option" data-option="lab_upgrade" data-upg="'+i+'" data-toggle="tooltip" data-original-title="<div class=tt al>'+res+'</div>">'+LNG.lab56+'</button>';
					}
					con+='<div class="lab_upgrade l'+ulevel+'"><div class="lab_left ekw_page_items"><div class="ekw_slot"><img src="/gfx/nauki/'+this.upg_data[i].img+'.png" /></div><div class="lab_name"><b>'+this.upg_data[i][this.lang]+'</b><br />'+values+'<br /><span class="green">'+this.dots(bon)+'</span> '+this.item_stat(this.upg_data[i].stat)+'<br />'+levels+' '+upgrade+'</div></div>';
					
					con+='</div>';
				}
				con+='<div class="clr"></div>';
				$('#lab_upgrades').html(con);
				tooltip_bind();
				option_bind();
			}
		break;
		case 51:
			var data=res.shareds;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				var opt='';
				var ts=data[i].time+604800;
				if(this.getTime()>ts) opt='<button class="option btn_small_gold" data-option="cancel_shared" data-shared="'+data[i].id+'">'+LNG.lab78+'</button>';
				con+='<tr><td>'+data[i].login1+' <-> '+data[i].login2+'</td><td>'+this.convertTime(data[i].time)+'</td><td>'+opt+'</td></tr>';
			}
			if(!len) con='<tr><td colspan=4>'+LNG.lab3+'</td></tr>';
			$('#shared_list').html(con);
			var con='';
			if(res.shared_requests){
				con=LNG.lab280+' <b>'+res.shared_requests.login+'</b> <button class="option newBtn" data-option="accept_shared">'+LNG.lab194+'</button><br />';
			}
			else con='['+LNG.lab3+']';
			$('#shared_requests').html(con);
			if(res.own_login) $('#shared_own_login').text(res.own_login);
			option_bind();
		break;
		case 52:
			if(res.texts){
				$('#profile_text').sceditor('instance').val(res.texts.text);
				$('#notes_text').sceditor('instance').val(res.texts.notes);
			}
			if(res.titles){
				var data=res.titles;
				var len=data.length,con='',active=0;
				
				for(var i=0;i<len;i++){
					var tooltip='<b>'+LNG.lab282+'</b>:<br />',cls='';
					if(data[i].active){
						cls='active';
						active=1;
					}
					var any=false;
					for(var s=1;s<=4;s++){
						if(data[i]['bonus'+s]){
							any=true;
							tooltip+='<b class=green>'+data[i]['bonus'+s+'_val']+'</b> '+this.item_stat(data[i]['bonus'+s])+'<br />';
						}
					}
					if(!any) tooltip+='<span class="grey">'+LNG.lab144+'</span>';
					con+='<tr class="'+cls+' option" data-option="select_title" data-title="'+data[i].id+'" data-toggle="tooltip" data-original-title="<div class=tt>'+tooltip+'</div>"><td><span style="color:'+data[i].color+';">'+data[i][this.lang]+'</span></td></tr>';
				}
				var cls='';
				if(active==0) cls='active';
				con='<tr class="'+cls+' option" data-option="select_title" data-title="0"><td><span class="grey">['+LNG.lab144+']</span></td></tr>'+con;
				$('#char_titles').html(con);
				tooltip_bind();
				option_bind();
			}
		break;
		case 53:
			var data=res.pets.sort(function(a,b){return b.class-a.class||b.level-a.level});
			var len=data.length,con='';
			this.pets=data;
			$('#pets_num').text(len);
			$('#pet_limit').text(this.char_data.pet_limit);
			for(var i=0;i<len;i++){
				var opts='<button class="option btn_small_gold" data-option="pet_opts" data-pet="'+i+'">'+LNG.lab453+'</button>';
				con+='<div class="petItem"><div class="leftSide"><a class="option" data-option="pet_active" data-pet="'+data[i].id+'"><img data-toggle="tooltip" data-original-title="'+this.getPetDetails(data[i])+'" src="'+data[i].avatar+'" alt="" class="activied'+data[i].active+' reb'+data[i].reborn+'" /></a></div><div class="rightSide">'+opts+'</div><div class="clr"></div></div>';
				if(i==this.current_pet) this.editPet(i);
			}
			con+='<div class="clr"></div>';
			$('#pet_list').html(con);
			tooltip_bind();
			option_bind();
		break;
		case 54:
			var data=res.emps.sort(function(a,b){return b.class-a.class||b.level-a.level});
			var len=data.length,con='';
			this.emps=data;
			$('#emp_num').text(len);
			$('#emp_limit').text(2);
			for(var i=0;i<len;i++){
				var opts='';
				if(data[i].exp>=this.employe_exp(data[i].level+1)&&data[i].level<13) opts+='<div class="levelup_btns"><button class="option btn_small_gold" data-option="emp_lvlup" data-emp="'+data[i].id+'">'+LNG.lab291+'</button></div>';
				opts+='<div class="petopt_btns"><button class="option btn_small_gold" data-option="emp_namech" data-emp="'+data[i].id+'" data-emp_local="'+i+'">'+LNG.lab294+'</button> <button class="option newBtn" data-option="emp_job" data-emp="'+data[i].id+'" data-emp_local="'+i+'">'+LNG.lab312+'</button>';
				if(data[i].energy<data[i].maxenergy) opts+='<button class="option newBtn" data-option="emp_restore" data-emp="'+data[i].id+'">'+LNG.lab318+'</button>';
				if(data[i].level>=10&&data[i].qualified==0) opts+='<button class="option btn_small_gold" data-option="emp_advace" data-emp="'+data[i].id+'">'+LNG.lab316+'</button>';
				if(data[i].maxenergy<10) opts+='<button class="option newBtn" data-option="emp_innene" data-emp="'+data[i].id+'">'+LNG.lab315+'</button>';
				opts+='</div>';
				if(data[i].active!=1) opts+='<button class="release_pet option newBtn" data-option="emp_release" data-emp="'+data[i].id+'">'+LNG.lab311+'</button>';
				con+='<div class="petItem"><div class="leftSide"><a class="option" data-option="emp_active" data-emp="'+data[i].id+'"><img data-toggle="tooltip" data-original-title="'+this.getEmpDetails(data[i])+'" src="/gfx/employee/'+data[i].type+'.png" alt="" class="activied'+data[i].active+'" /></a></div><div class="rightSide">'+opts+'</div><div class="clr"></div></div>';
			}
			con+='<div class="clr"></div>';
			$('#emp_list').html(con);
			tooltip_bind();
			option_bind();
		break;
		case 55: //kula energii
			var ball=res.ball;
			var bd=res.bd;
			this.ball_id=ball.id;
			var grade='';
			for(var g=1;g<=bd.grade;g++) grade+='<img src="/gfx/ekw_pages/star.png" />';
			$('#ss_name').text(ball[this.lang_data['nauki'][this.lang]]);
			$('#ss_level').text(bd.level);
			$('#ss_grade').html(grade);
			$('#ss_exp').text(this.dots(bd.exp)+'/'+this.dots(bd.next_lvl));
			if(bd.exp>=bd.next_lvl) $('#ss_lvlup').show();
			else $('#ss_lvlup').hide();
			var w=bd.exp/bd.next_lvl*100;
			if(w<0) w=0;
			if(w>100) w=100;
			$('#ss_exp_barer').animate({'width':w+'%'},500);
			$('#ss_synergy_lvl').text(bd.synergy_lvl);
			$('#ss_synergy').text(this.dots(this.char_data.synergy)+'/'+this.dots(bd.synergy_next));
			var w=this.char_data.synergy/bd.synergy_next*100;
			if(w<0) w=0;
			if(w>100) w=100;
			$('#ss_syn_barer').animate({'width':w+'%'},500);
			var change=0,changer=false;
			if(res.ss_change){
				changer=true;
				$('#ss_changed').show();
			}
			else{
				$('#ss_changed').hide();
			}
			for(var s=1;s<=9;s++){
				if(ball['stat'+s]){
					$('#stat'+s+'_val').text(ball['stat'+s+'_val']);
					$('#stat'+s+'_bon').text(this.item_stat(ball['stat'+s]));
					$('#ss_stat'+s+'_progress').text(bd['stat'+s]+'%');
					$('#ss_stat'+s+'_barer').animate({'width':bd['stat'+s]+'%'},500);
					var ch='';
					if(changer){
						var diff=res.ss_change[s];
						change+=diff;
						if(diff==0) ch='0%';
						else if(diff<0) ch='<span class="red">'+diff+'%</span>';
						else ch='<span class="green">+'+diff+'%</span>';
					}
					$('#ss_change_'+s).html(ch);
					$('#stat'+s+'_con').show();
				}
				else $('#stat'+s+'_con').hide();
			}
			$('#ss_reset_stack').text(res.resets);
			$('#ss_upgrade_stack').text(res.upgrades);
			var ch='';
			if(change==0) ch='0%';
			else if(change<0) ch='<b class="red">'+change+'%</b>';
			else ch='<b class="green">+'+change+'%</b>';
			
			$('#up_change').html(ch);
			$('#soulstone_interface').show();
		break;
		case 56: //arena
			var pvp_master=false;
			if(this.premiumBonus(13)) pvp_master=true;
			var data=res.area_oponents.players;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				con+=this.parseArenaPlayer(i,data[i],pvp_master);
			}
			$('#arena_players').html(con);
			$('#arena_rank').text(LNG['arena_rank'+this.char_data.arena_lvl]);
			$('#arena_expires').html(this.showTimer(res.area_oponents.expires-this.getTime()));
			this.charValuesBind(['arena_lvl','arena_exp']);
			option_bind();
		break;
		case 57:
			var data=res.auctions.auctions;
			var len=data.length,con='';
			$('#auction_own_items').text(res.own);
			var pagi='';
			var pages=res.auctions.all_pages;
			var page=res.auctions.page;
			var pagi=LNG.lab272+' <b>'+page+'</b>/<b>'+pages+'</b> <button class="option newBtn" data-option="show_auctions" data-page="'+(page-1)+'"><<</button> <button class="option newBtn" data-option="show_auctions" data-page="'+(page+1)+'">>></button>';
			$('#auction_pagi').html(pagi);
			var time=this.getTime();
			var any=false;
			for(var i=0;i<len;i++){
				if(data[i].expire<=time) continue;
				any=true;
				var auction='',opts='';
				if(data[i].start>0){
					auction=LNG.lab334+': <b>'+data[i].start+'</b><img src="/gfx/kp.png" /><br />';
					if(data[i].current>0) auction+=LNG.lab329+': <b>'+data[i].current+'</b><img src="/gfx/kp.png" /> - <b class="orange option" data-option="show_player" data-char_id="'+data[i].cur_char+'">'+data[i].cur_chn+'</b>';
				}
				else auction='<span class="grey">'+LNG.lab331+'</span>';
				if(data[i].char_id==this.char_id){
					if(data[i].current==0) opts='<button class="option newBtn" data-option="withdraw_auction" data-aid="'+data[i].id+'" data-page="'+page+'">'+LNG.lab330+'</button>';
				}
				else{
					if(data[i].buy_now>0) opts+='<button class="option newBtn" data-option="buynow_auction" data-aid="'+data[i].id+'" data-page="'+page+'">'+LNG.lab332+'</button>: '+data[i].buy_now+'<img src="/gfx/kp.png" /><br />';
					if(data[i].start>0) opts+='<div class="game_input vsmall"><input type="text" id="a_bid_'+data[i].id+'" value="'+(Math.max(data[i].current,data[i].start)+1)+'" /></div><img src="/gfx/kp.png" /><button class="option newBtn" data-option="bid_auction" data-aid="'+data[i].id+'" data-page="'+page+'">'+LNG.lab333+'</button>';
				}
				var timer='';
				if(data[i].expire>time) timer=this.convertTime(data[i].expire)+'<br />'+this.showTimer(data[i].expire-time);
				else timer='<span class="grey">'+LNG.lab335+'...</span>';
				con+='<tr><td><b class="orange option" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].char_name+'</b></td><td class="ekw_page_items"><div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+data[i].item_id+'" data-upgrade="'+data[i].upgrade+'" data-quality="'+data[i].quality+'"><img src="/gfx/items/'+data[i].lvl+'/'+data[i].class+'/'+data[i].item_id+'.png" /></div></td><td>'+timer+'</td><td class="al">'+auction+'</td><td>'+opts+'</td></tr>';
			}
			if(!any) con+='<tr><td colspan="9" class="ac">['+LNG.lab3+']</td></tr>';
			$('#auction_list').html(con);
			main_ekw_item_bind();
			tooltip_bind();
			option_bind();
		break;
		case 58:
			var data=res.bosses.sort(function(a,b){return b.id-a.id});
			var len=data.length,con='';
			var any=false;
			for(var i=0;i<len;i++){
				any=true;
				var owner='',loc='',owner2='';
				if(data[i].owner){
					owner='<b class="option" data-option="show_player" data-char_id="'+data[i].owner+'">'+data[i].owner_name+'</b>';
					loc=data[i].location+' ['+data[i].x+'|'+data[i].y+']';
					switch(data[i].owner_type){
						case 1:
							owner2=LNG.lab459+' <b>'+data[i].org_name+'</b><br /><b class="orange">'+this.essence_bonuses[data[i].id][1]+'</b> <span class="green">'+this.item_stat(this.essence_bonuses[data[i].id][0])+'</span>';
						break;
						case 2:
							owner2='<b>'+LNG['village'+data[i].new_owner_id]+'</b><br /><b class="orange">'+this.essence_bonuses[data[i].id][1]+'</b> <span class="green">'+this.item_stat(this.essence_bonuses[data[i].id][0])+'</span>';
						break;
					}
				}
				else{
					owner=LNG.lab144;
					loc='???';
				}
				con+='<tr><td>'+data[i].mob_name+'</td><td>'+owner+'</td><td>'+loc+'</td><td>'+owner2+'</td></tr>';
			}
			if(!any) con+='<tr><td colspan="5" class="ac grey">['+LNG.lab3+']</td></tr>';
			$('#boss_list').html(con);
			option_bind();
		break;
		case 59:
			var points=0;
			var adata=res.adata;
			$('#char_activity').text(adata.p);
			var w=Math.min(100,adata.p);
			$('#activity_bar').css({'width':w+'%'});
			var data=res.activities;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				var cls=''; 
				if(adata.ap[i]) cls='disabled';
				con+='<div class="act_prize '+cls+'">'+LNG.done82+' <b>'+data[i].req_points+'</b><div class="ekw_page_items">';
				var len2=data[i].prizes.length;
				for(var j=0;j<len2;j++){
					switch(data[i].prizes[j].type){
						case 1:
							con+='<div class="ekw_slot"><img src="/gfx/items/kk.png" /><div>'+data[i].prizes[j].am+'</div></div>';
						break;
						case 2:
							var am=data[i].prizes[j].am;
							if(data[i].prizes[j].chance) am+=' - <b>'+data[i].prizes[j].chance+'</b>%';
							con+='<div class="ekw_slot" data-toggle="tooltip" data-original-title="'+this.getUsableItemDesc(data[i].prizes[j].data)+'"><img src="/gfx/items/cons/'+data[i].prizes[j].item_id+'.png" /><div>'+am+'</div></div>';
						break;
					}
				}
				con+='</div><button class="option newBtn pull-right" data-option="receive_activity_reward" data-ind="'+i+'">'+LNG.lab239+'</button><div class="clr"></div></div>';
			}
			$('#act_prizes').html(con);
			
			var con='';
			for(var i=1;i<=12;i++){
				var done='';
				if(adata.a[i]) done='<img src="/gfx/layout/done.png" />';
				con+='<div class="activity">&raquo; '+LNG['activity'+i]+' '+done+' <span class="pull-right">'+res.points[i]+'<b class="orange">p</b></span></div>';
			}
			$('#char_activieties').html(con);
			main_ekw_item_bind();
			tooltip_bind();
			option_bind();
		break;
		case 60:
				if(res.edata){
					var edata=res.edata;
					var empire=edata.id;
					$('#leader_name').text(LNG['empireleader'+empire]);
					$('#emp_img').attr('src','/gfx/villages/head/'+empire+'.png');
					var rank='';
					if(this.char_data.glory_rank&&res.rank){
						var rd=res.rank;
						var rdet='',len=rd.length;
						for(var i=0;i<len;i+=2){
							var n=rd[i+1];
							rdet+='<b class=green>'+n+'</b> '+this.item_stat(rd[i])+'<br />';
						}
						rank='<span data-toggle="tooltip" data-original-title="<div class=tt>'+rdet+'</div>"><img src="/gfx/empire/ranks/'+empire+'/'+this.char_data.glory_rank+'.png" /> <span class="orange">'+LNG['erank'+empire+'_'+this.char_data.glory_rank]+'</span></span>';
						
					}
					else rank='['+LNG.lab144+']';
					if(empire==this.char_data.village_id){
						$('.is_own_emp').show();
						$('#own_glory').text(this.dots(this.char_data.war_points));
						//$('#glory_need').text(this.dots(res.next_rank));
						//$('#own_emp_rank').html(rank);
					}
					else $('.is_own_emp').hide();
					
					
					var leader='',admiral='';
					if(edata.kage) leader='('+this.leader_num(edata.kage_number)+') <b class="green option" data-option="show_player" data-char_id="'+edata.kage+'">'+edata.leader_name+'</b>';
					else leader='['+LNG.lab144+']';
					if(edata.admiral) admiral='<b class="green option" data-option="show_player" data-char_id="'+edata.admiral+'">'+edata.admiral_name+'</b>';
					else admiral='['+LNG.lab144+']';
					$('#leader_player').html(leader);
					$('#e_admiral_player').html(admiral);
					$('#vill_story').data('arg',empire);
					$('#empire_respect').text(this.dots(edata.respect));
					$('#empire_ww').text(this.dots(edata.wons));
					$('#empire_wl').text(this.dots(edata.loses));
					//$('#emp_teleport option[value="'+empire+'"]').prop('selected',true);
					$('#emp_war_declare option').prop('disabled',false);
					$('#emp_war_declare option[value="'+empire+'"]').prop('disabled',true);
					$('#emp_war_delare').hide();
					if(edata.kage==this.char_id||edata.admiral==this.char_id) $('#emp_war_delare').show();
					var can_build=false;
					if(edata.kage==this.char_id) can_build=true;
					if(res.structs){
						var con='',data=res.structs;
						var len=data.cnt;
						for(var i=1;i<=len;i++){
							var sdetail='<div class=tt><b>'+LNG['estr'+i]+'</b> ('+LNG.lab1+' <span class=orange>'+edata['s'+i]+'</span>/'+data[i].max+')<br />';
							var upb='',build='';
							var bon=data[i].bv*edata['s'+i];
							if(data[i].stat) sdetail+='<b class=green>'+bon+'</b> '+this.item_stat(data[i].stat)+'<br />';
							if(data[i].es) sdetail+=LNG['estat'+data[i].es]+' <b class=green>'+bon+'</b><br /><br />';
							if(edata['s'+i]<data[i].max){
								var cls1='green',cls2='green'; //$str_cos[$bid]*($vd[$lvid]*$vd[$lvid]*100)+8
								var cost=data[i].c1*edata['s'+i]*edata['s'+i]*66+8;
								if(cost>edata.respect) cls1='red';
								if(can_build) upb='<button class="newBtn option" data-option="emp_struct" data-sid="'+i+'">'+LNG.lab69+'</button>';
								sdetail+=LNG.lab339+':<br />'+LNG.lab340+': <b class='+cls1+'>'+this.dots(cost)+'</b>';
							}
							sdetail+='</div>';
							if(edata.s_build==i){
								var time=this.getTime();
								var w=100-(edata.s_btime-time)/(edata.s_btime-edata.s_stime)*100;
								if(w<0) w=0;
								if(w>100) w=100;
								build='<br /><b class="red">'+LNG.lab70+'...</b> <div class="main_bar">'+this.showTimer(edata.s_btime-time)+'</span><div class="progressBar style4" style="width:'+w+'%"></div></div>';
							}
							con+='<div class="emp_struct"><b class="stru_name" data-toggle="tooltip" data-original-title="'+sdetail+'">'+LNG['estr'+i]+'</b> ('+LNG.lab1+' <span class="orange">'+edata['s'+i]+'</span>) '+upb+' '+build+'</div>';
						}
						$('#emp_structs').html(con);
					}
					/*
					if(res.buffs){
						var time=this.getTime();
						var data=res.buffs,con='';
						var len=data.length;
						for(var i=1;i<len;i++){
							var bdetail='<b>'+LNG['ebuff'+i]+'</b><br /><span class=orange>'+LNG['ebufft'+data[i][1]]+'</span><br />'+LNG.lab57+':<br />';
							switch(data[i][1]){
								case 1:
									var cls='green';
									if(edata.pp<data[i][2]) cls='red';
									bdetail+='<span class=grey>'+LNG.lab340+'</span>: <b class='+cls+'>'+this.dots(data[i][2])+'</b>';
								break;
								case 2:
									var cls='green';
									if(edata.ip<data[i][2]) cls='red';
									bdetail+='<span class=grey>'+LNG.lab341+'</span>: <b class='+cls+'>'+this.dots(data[i][2])+'</b>';
								break;
							}
							if(data[i][4]) bdetail+='<br /><b>'+LNG.lab347+'</b>';
							bdetail+='<br /><br />';
							for(var j=0;j<data[i][3].length;j+=2){
								bdetail+='<b class=green>'+data[i][3][(j+1)]+'</b> '+this.item_stat(data[i][3][j])+'<br />';
							}
							var buffstatus='';
							if(edata['buff'+i]>time) buffstatus='<span class="green">'+LNG.lab164+'</span> '+this.showTimer(edata['buff'+i]-time,'','grey');
							else if(can_build) buffstatus='<button class="btn_small_gold option" data-option="activate_emp_buff" data-buff="'+i+'">'+LNG.lab99+'</button>';
							con+='<div class="emp_buff"><b data-toggle="tooltip" data-original-title="<div class=tt>'+bdetail+'</div>">'+LNG['ebuff'+i]+'</b> <div class="pull-right">'+buffstatus+'</div></div>';
						}
						$('#emp_buffs').html(con);
					}
					var gne=52;
					var suma=res.good_points+res.evil_points;
					if(suma>0) gne=100-Math.round(res.good_points/suma*100-2);
					var cubon='',tt='<div class=tt>'+LNG.lab343+':<br />&raquo; <b class=green>15</b> <span class=orange>'+this.item_stat(15)+'</span><br />&raquo; <b class=green>5</b> <span class=orange>'+this.item_stat(17)+'</span></div>';
					switch(res.last_gne){
						case 1: 
							cubon=LNG.lab342+' <b class="green">'+LNG.lab338+'</b>!'; 
						break;
						case 2: 
							cubon=LNG.lab342+' <b class="red">'+LNG.lab337+'</b>!'; 
						break;
						default: 
							cubon=''; 
							tt='';
						break;
					}
					$('#gne_good_p').text(this.dots(res.good_points));
					$('#gne_evil_p').text(this.dots(res.evil_points));
					$('#gne_satus').html(cubon).attr('data-original-title',tt);
					$('#e_gne').css({'background-position':gne+'%'});
					*/
					var data=edata.heroes,con='';
					var len=data.length;
					for(var i=0;i<len;i++){
						var rank='';
						//if(data[i].glory_rank) rank='<img src="/gfx/empire/ranks/'+empire+'/'+data[i].glory_rank+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['erank'+empire+'_'+data[i].glory_rank]+'</div>" />';
						con+='<tr class="activity"><td><b class="player_rank'+data[i].ranga+' option" data-option="show_player" data-char_id="'+data[i].id+'">'+data[i].name+'</b></td><td>'+this.rebPref(data[i].reborn)+this.dots(data[i].level)+'</td><td>'+rank+'</td><td>'+this.dots(data[i].war_points)+'</td></tr>';
					}
					$('#empire_heroes').html(con);
					/*
					var data=edata.efrags,con='';
					var len=data.length;
					for(var i=0;i<len;i++){
						var rank='';
						if(data[i].glory_rank) rank='<img src="/gfx/empire/ranks/'+empire+'/'+data[i].glory_rank+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['erank'+empire+'_'+data[i].glory_rank]+'</div>" />';
						con+='<tr class="activity"><td><b class="player_rank'+data[i].ranga+' option" data-option="show_player" data-char_id="'+data[i].id+'">'+data[i].name+'</b></td><td>'+this.rebPref(data[i].reborn)+this.dots(data[i].level)+'</td><td>'+rank+'</td><td>'+this.dots(data[i].empire_monthly_frags)+'</td></tr>';
					}
					$('#empire_efrags').html(con);
					*/
					var any=false,con='';
					if(res.wars){
						var data=res.wars,time=this.getTime();
						var len=data.length;
						for(var i=0;i<len;i++){
							any=true;
							var rent='';
							if((edata.kage==this.char_id||edata.admiral==this.char_id)&&((data[i].village_1==empire&&data[i].org_1==0)||(data[i].village_2==empire&&data[i].org_2==0))){
								rent='<br />'+LNG.lab445+':<br /><div class="select_input"><select id="war_'+data[i].id+'_org">';
								if(res.rentable){
									var len2=res.rentable.length;
									for(var j=0;j<len2;j++){
										rent+='<option value="'+res.rentable[j].id+'">'+res.rentable[j].short+' - '+LNG.lab57+': '+res.rentable[j].cost+' '+LNG.lab399+'</option>';
									}
								}
								rent+='</select></div><br /><button class="newBtn option" data-option="emp_war_hire" data-war="'+data[i].id+'">'+LNG.lab446+'</button>';
							}
							con+='<div class="war_win"><span class="orange">'+LNG['empirewar'+data[i].war_type]+'</span><br /><b>'+LNG['village'+data[i].village_1]+'</b> vs. <b>'+LNG['village'+data[i].village_2]+'</b><br />'+data[i].org_1_name+' <b>'+data[i].score_1+'</b> : <b>'+data[i].score_2+'</b> '+data[i].org_2_name+'<br />'+this.showTimer(data[i].expires-time)+'<br /><button class="newBtn option" data-option="emp_war_table" data-war="'+data[i].id+'">'+LNG.lab345+'</button>'+rent+'</div>';
						}
					}
					if(!any) con='[<span class="grey">'+LNG.lab344+'</span>]';
					$('#emp_wars').html(con);
				}
				$('#has_empire').show();
				$('#village_name').text(LNG['village'+empire]);
				option_bind();
				tooltip_bind();
		break;
		case 61:
			var data=res.war_tab.sort(function(a,b){return b.kills-a.kills||a.deaths-b.deaths});
			var len=data.length,con='';
			var n=1;
			for(var i=0;i<len;i++){
				var cls='enemy',shadow='';
				if(data[i].empire==this.char_data.village_id) cls='ally';
				if(data[i].shadow) shadow='- '+LNG.lab348;
				con+='<tr class="'+cls+'"><td>'+n+'</td><td><b class="orange option" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].name+'</b> '+shadow+'</td><td>'+data[i].kills+'</td><td>'+data[i].deaths+'</td><td>'+data[i].streak+'</td></tr>';
				n++;
			}
			$('#war_table').html(con);
			option_bind();
			this.page_switch('game_war_table');
		break;
		case 62:
			if(res.hasOwnProperty('special_loc')){
				$('.slocop').hide();
				if(res.special_loc) $('#special_loc_btn').show();
				else $('#no_event').show();
			}
			if(res.hasOwnProperty('challenge')){
				var con='';
				switch(res.challenge.status){
					case 3:
						con+='<b>'+LNG.lab351+'</b>: <b class="green">'+LNG['chprize'+res.challenge.prize]+'</b>';
					break;
					case 2:
						con+='<b class="red">'+LNG.lab350+'</b>';
					break;
					case 1:
						var num=res.challenge.counter;
						if(num>res.challenge.need) num=res.challenge.need;
						con+='<b class="orange">'+LNG.lab352+'</b><br />'+LNG.lab18+': <b class="orange">'+LNG['chpreq'+res.challenge.req]+'</b> ('+this.dots(num)+'/'+this.dots(res.challenge.need)+')<br /><br /><b>'+LNG.lab353+'</b>: <b class="green">'+LNG['chprize'+res.challenge.prize]+'</b>' ;
					break;
					default:
						con='<b class="orange">'+LNG.lab349+'</b>';
					break;
				}
				$('#sch_result').html(con);
			}
			if(res.hasOwnProperty('tokens')) $('#space_trade_tokens').text(res.tokens);
			if(res.hasOwnProperty('trader')){
				var stat=LNG.lab354;
				if(res.trader.status){
					stat=LNG.lab355;
				}
				$('#space_trade_status').text(stat);
				if(res.trader.goods){
					var con='';
					var json=res.trader.goods;
					var len=json.length;
					for(var i=0;i<len;i++){
						var opts='',cls='';
						if(json[i].bought_by){
							cls='bought';
							opts=LNG.lab356+'<br /><span class="orange">'+json[i].bought_by+'</span>';
						}
						else{
							var cls2='red';
							if(res.tokens>=json[i].dt) cls2='green';
							opts=LNG.lab357+': <span class="'+cls2+'">'+json[i].dt+'</span><br /><button class="option newBtn" data-option="buy_from_trader" data-item="'+i+'">'+LNG.lab67+'</button>';
						}
						con+='<div class="trade_good '+cls+'"><div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+json[i].item+'"><img src="'+json[i].gfx+'" /><div>'+json[i].amount+'</div></div><br />'+opts+'</div>';
					}
					con+='<div class="clr"></div>';
					$('#trader_goods').html(con);
					main_ekw_item_bind();
					tooltip_bind();
					option_bind();
				}
			}
		break;
		case 63:
			var done=[];
			var len=this.tutorials.length;
			for(var i=0;i<len;i++) done.push(this.tutorials[i].tutorial);
			var con='';
			var len=this.tutorial_data.cnt;
			
			for(var i=1;i<=len;i++){
				var tut=this.tutorial_data['t'+i];
				var reqs='';
				var canstart=true;
				var cls='',rreb=0;
				if(tut.req_reb) rreb=tut.req_reb;
				if(!this.levelReqCheck(tut.req_lvl,rreb)){
					canstart=false;
					cls='red';
				}
				reqs=LNG.lab24+' : <b class="'+cls+'">'+this.rebPref(rreb)+tut.req_lvl+'</b>';
				
				var btn='';
				
				if(this.current_tutorial&&this.current_tutorial.id==i){
					btn='<button class="option f_right tut_btn" data-option="cancel_tutorial" data-t="'+i+'">'+LNG.lab78+'</button>';
				}
				var mark='';
				var stat=LNG.lab359;
				if(done.indexOf(tut.id)!=-1){
					mark='<img src="/gfx/layout/done.png" width=20 align="absmiddle" />';
					stat=LNG.lab360;
					canstart=false;
				}
				if(!this.current_tutorial&&canstart) btn='<button class="option f_right tut_btn" data-option="start_tutorial" data-t="'+i+'">'+LNG.lab197+'</button>';
				con+='<div class="tutse"><div class="tut_selector option pull-left" data-option="show_tut_data" data-t="'+i+'">'+tut['title_'+this.lang]+' '+mark+'</div><div class="pull-right">'+reqs+'</div><div id="tut_desc_'+i+'" class="clr initial_hide"><div class="pull-left">'+LNG.lab361+': <span class="orange">'+stat+'</span><br />'+LNG.lab21+':<br />'+this.tutprizelist(tut.prize)+'</div>'+btn+'</div><div class="clr"></div></div>';
			}
			$('#tutorial').toggle();
			$('#tut_list').html(con);
			option_bind();
		break;
		case 64:
			this.charValuesBind(['vip_level','vip_score','vip_show','gvip_level','gvip_score']);
			if(res.hasOwnProperty('vip')) this.vip_data=res.vip;
			var data=this.vip_data.monthly,con='';
			var gfx={minor_ball:'/gfx/layout/daily/psk.png',tpp:'/gfx/layout/daily/tpp.png'};
			var len=data.length;
			var ava=-1;
			if(this.char_data.reborn>=3) ava=0;
			if(this.char_data.vip_level>0) ava=this.char_data.vip_level;
			for(var i=0;i<len;i++){
				var cls='';
				if(i!=ava) cls='disabled';
				else if(res.monthly_lock) cls='received';
				con+='<div class="vip_cat '+cls+' option" data-option="obtain_vip" data-vip="0" data-level="'+i+'"><div class="vip_label">'+LNG['vip'+i]+'</div><div class="vip_items ekw_page_items">';
				var len2=data[i].length;
				for(var j=0;j<len2;j++){
					switch(data[i][j].type){
						case 1:
							con+='<div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['shop_chup_'+data[i][j].id]+'</div>"><img src="'+gfx[data[i][j].id]+'" /><div>'+data[i][j].am+'</div></div>';
						break;
						case 2:
							con+='<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+data[i][j].id+'"><img src="'+data[i][j].gfx+'" /><div>'+data[i][j].am+'</div></div>';
						break;
						case 3:
							con+='<div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.item_func15+': <b class=green>'+LNG['game_buff'+data[i][j].id]+'</b> '+LNG.lab1+' <b>'+data[i][j].level+'</b><br /><br />'+LNG.lab392+': '+this.convertSeconds(data[i][j].duration)+'</div>"><img src="/gfx/items/0/207/1750.png" /><div></div></div>';
						break;
					}
				}
				con+='<div class="clr"></div></div></div>';
			}
			$('#monthly_vip_rewards').html(con);
			var data=this.vip_data.general,con='';
			var len=data.length;
			var ava=0;
			if(this.char_data.gvip_level>0) ava=this.char_data.gvip_level;
			
			for(var i=1;i<len;i++){
				var cls='';
				if(i!=ava) cls='disabled';
				else if(res.general_lock) cls='received';
				con+='<div class="vip_cat '+cls+' option"  data-option="obtain_vip" data-vip="1" data-level="'+i+'"><div class="vip_label">'+LNG['vip'+i]+'</div><div class="vip_items ekw_page_items">';
				var len2=data[i].length;
				for(var j=0;j<len2;j++){
					switch(data[i][j].type){
						case 1:
							con+='<div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['shop_chup_'+data[i][j].id]+'</div>"><img src="'+gfx[data[i][j].id]+'" /><div>'+data[i][j].am+'</div></div>';
						break;
						case 2:
							con+='<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+data[i][j].id+'"><img src="'+data[i][j].gfx+'" /><div>'+data[i][j].am+'</div></div>';
						break;
						case 3:
							con+='<div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.item_func15+': <b class=green>'+LNG['game_buff'+data[i][j].id]+'</b> '+LNG.lab1+' <b>'+data[i][j].level+'</b><br /><br />'+LNG.lab392+': '+this.convertSeconds(data[i][j].duration)+'</div>"><img src="/gfx/items/0/207/1750.png" /><div></div></div>';
						break;
					}
				}
				con+='<div class="clr"></div></div></div>';
			}
			$('#general_vip_rewards').html(con);
			tooltip_bind();
			option_bind();
			main_ekw_item_bind();
		break;
		case 65:
			this.page_switch('game_weeding');
			$('.weed_page').hide();
			if(this.char_data.spouse>0){
				$('#is_married').show();
				$('#my_spouse').text(res.spouse_name);
				var data=res.kids;
				var len=data.length;
				$('#my_kis').text(len);
				$('#kids_limit').text(res.klim);
				var con='';
				if(res.newborn){
					con+='<b>'+LNG.lab367+'</b> ';
					if(res.newborn.status==0){
						if(res.newborn.father_id==this.char_id) con='<b>'+LNG.lab371+'</b> <button class="option btn_small_gold" data-option="newborn_answer" data-ans="1">'+LNG.lab194+'</button> <button class="option btn_small_gold" data-option="newborn_answer" data-ans="2">'+LNG.lab195+'</button>';
						else con='<b>'+LNG.lab370+'</b>';
					}
					else con+=LNG.lab368+': <b>'+res.newborn.code+'</b> <i>'+LNG.lab369+'</i>';
				}
				$('#newborn').html(con);
				var con='';
				for(var i=0;i<len;i++){
					con+='<div>&raquo; <b class="green option" data-option="show_player" data-char_id="'+data[i].id+'">'+data[i].name+'</b></div>';
				}
				$('#kids_list').html(con);
				option_bind();
			}
			else{
				$('#is_single').show();
				if(this.char_data.sex==1){
					
				}
				else{
					var data=res.invites;
					var len=data.length,con='';
					for(var i=0;i<len;i++){
						con+='<div><b class="orange option" data-option="show_player" data-char_id="'+data[i].send_id+'">'+data[i].name+'</b> '+LNG.lab366+' : <button class="option btn_small_gold" data-option="proposal_answer" data-pip="'+data[i].id+'" data-ans="1">'+LNG.lab194+'</button> <button class="option btn_small_gold" data-pip="'+data[i].id+'" data-option="proposal_answer" data-ans="2">'+LNG.lab195+'</button></div>';
					}
					$('#weed_proposal_list').html(con);
					option_bind();
				}
			}
		break;
		case 66:
			if(res.report){
				this.parseFight(JSON.parse(res.report));
			}
			if(res.head){
				var data=res.rounds,con='<table><tr>';
				var len=data.length;
				var last_num=0;
				for(var i=0;i<len;i++){
					var ado1='class="',ado2='class="';
					if(data[i].p1==data[i].winner){
						ado1+='won';
						ado2+='lost';
					}
					else{
						ado2+='won';
						ado1+='lost';
					}
					if(res.head.type==0&&data[i].p1_type==0) ado1+=' option" data-option="show_player" data-char_id="'+data[i].p1+'';
					if(res.head.type==0&&data[i].p2_type==0) ado2+=' option" data-option="show_player" data-char_id="'+data[i].p2+'';
					ado1+='"';
					ado2+='"';
					if(data[i].runda!=last_num){
						if(last_num==0) con+='<td>';
						else con+='</td><td>';
						last_num=data[i].runda;
					}
					con+='<div class="tduel" data-round="'+data[i].runda+'_'+data[i].numer+'"><span class="option" data-option="show_tour_fight" data-id="'+data[i].id+'">'+LNG.lab376+' '+data[i].runda+'_'+data[i].numer+'</span><div '+ado1+'>'+data[i].p1_name+'</div><div '+ado2+'>'+data[i].p2_name+'</div></div>';
					if(i==len-1) con+='</td>';
				}
				con+='</tr></table>';
				$('#tour_details_con').html(con);
				$('#tour_list_tab').hide();
				$('#tour_details').show();
				option_bind();
			}
			if(res.tours){
				var pagi='';
				var pages=res.all_pages;
				var page=res.page;
				var pagi=LNG.lab272+' <b>'+page+'</b>/<b>'+pages+'</b> <button class="option newBtn" data-option="show_tour_page" data-page="'+(page-1)+'"><<</button> <button class="option newBtn" data-option="show_tour_page" data-page="'+(page+1)+'">>></button>';
				var pd=res.pet_data;
				if(pd){
					$('#tpet_data').html(LNG.lab377+': <b class="item'+pd.class+'">'+pd.name+'</b> '+this.rebPref(pd.reborn)+this.dots(pd.level)+' <button class="newBtn option f_right" data-option="sign_all_pets">'+LNG.lab380+'</button>');
				}
				else $('#tpet_data').text('');
				$('#tour_pagi').html(pagi);
				var con='',data=res.tours;
				var len=data.length;
				var time=this.getTime();
				for(var i=0;i<len;i++){
					var ads='',prize='',opts='';
					switch(data[i].status){
						case 0:
							if(data[i].end_time<time){
								data[i].status=1;
							}
							else{
								ads=LNG.lab51+': '+this.showTimer(data[i].end_time-time);
								var can=false;
								if(data[i].type==0&&this.isYourTourCat(data[i].type,data[i].cat,this.char_data.reborn,this.char_data.level)) can=true;
								if(data[i].type==1&&pd&&pd.level&&this.isYourTourCat(data[i].type,data[i].cat,pd.reborn,pd.level)) can=true;
								if(can) opts+='<button class="option newBtn" data-option="tournament_sign" data-tid="'+data[i].id+'">'+LNG.lab373+'</button>';
							}
						break;
						case 2:
							var ado='"';
							if(data[i].type==0) ado='option" data-option="show_player" data-char_id="'+data[i].winner_id+'"';
							ads='<span class="orange">'+this.convertTime(data[i].end_time)+'</span> '+LNG.lab374+': <b class="orange '+ado+'>'+data[i].winner+'</b>';
							opts+='<button class="option newBtn" data-option="tournament_details" data-tid="'+data[i].id+'">'+LNG.lab375+'</button>';
						break;
						case 3:
							ads=''+this.convertTime(data[i].end_time)+'';
						break;
					}
					switch(data[i].prize_type){
						case 1: //kp
							prize='<span class="orange">'+data[i].prize_value+'</span> <img src="/gfx/kp.png" />';
						break;
						case 2: //gold
							prize='<span class="green">'+this.dots(data[i].prize_value)+'</span> <img src="/gfx/gold.png" />';
						break;
						case 3: //item
							prize='<div class="ekw_page_items treward"><div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+data[i].prize_value+'"><img src="'+data[i].gfx+'" /></div></div>';
						break;
						case 4:
							prize='<span class="green">'+data[i].prize_value+'</span> '+LNG.rap_action26;
						break;
						case 5: //title
							prize='<span class="yellow">'+LNG.lab432+'</span>';
						break;
						case 6: //material
							prize='<div class="ekw_page_items treward"><div class="ekw_slot"><img src="/gfx/items/mats/'+data[i].prize_value+'.png" /></div></div>';
						break;
					}
					var cls='';
					
					con+='<tr><td>'+this.tour_kategoria(data[i].cat,data[i].type)+'</td><td>'+LNG['tour_stat'+data[i].status]+' <span class="grey">'+ads+'</span></td><td><span class="orange">'+data[i].members_in+'</span> / '+data[i].max_members+'</td><td>'+prize+'</td><td>'+opts+'</td></tr>';
				}
				
				$('#tour_list').html(con);
				option_bind();
				tooltip_bind();
				main_ekw_item_bind();
			}
		break;
		case 67: //tech set
			if(res.sets){
				var con='';
				for(var s=1;s<=res.sets;s++){
					var cls='';
					if(s==(this.char_data.skill_set+1)){
						cls='active';
					}
					con+='<button class="option newBtn skillsets '+cls+'" data-option="change_skill_set" data-set="'+(s-1)+'">'+s+'</button> ';
				}
				$('#fight_sets').html(con);
				this.showTechSet(this.char_data.skill_set);
			}
			if(res.learned_techs){
				var chakra=this.CHA_wzor(this.char_data.ener,this.char_data.wytrz,this.char_data.level)+this.getStat(12);
				var bon=this.getStat(88);
				if(bon>0) chakra=Math.floor(chakra*(1+bon/100));
				this.max_chakra=chakra;
				this.max_energy=this.char_data.sen;
				$('#char_fight_mana').text(this.dots(chakra));
				$('#char_fight_energy').text(this.dots(this.char_data.sen));
				$('#char_setmax_mana').text(this.dots(chakra));
				$('#char_set_maxenergy').text(this.dots(this.char_data.sen));
				var lt=res.learned_techs.sort(function(a,b){return b.req_lvl-a.req_lvl});
				var learned_cats={},learned_techs={};
				var len=lt.length;
				for(var i=0;i<len;i++){
					var ind=lt[i].cat_id+'_'+lt[i].cat2_id;
					if(!learned_cats[ind]) learned_cats[ind]={c1:lt[i].cat_id,c2:lt[i].cat2_id,techs:[]};
					learned_cats[ind].techs.push(lt[i]);
					learned_techs[lt[i].tech_id]=lt[i];
				}
				var cats='';
				var single=[11],selected_cat='';
				for(var key in learned_cats){
					var ind='';
					selected_cat=key;
					if(learned_cats[key].c2==0||single.indexOf(learned_cats[key].c1)!=-1) ind=learned_cats[key].c1;
					else ind=learned_cats[key].c1+'_'+learned_cats[key].c2;
					cats+='<button class="option otbutton" data-option="switch_own_cat" data-cat="'+key+'"><img src="/gfx/jutsu/'+ind+'.png" /></button>';
				}
				this.learned_cats=learned_cats;
				this.learned_techs=learned_techs;
				$('#owned_techs_cats').html(cats);
				this.selectOwnTechCat(selected_cat);
			}
			if(res.set_techs){
				$('.skillsets').removeClass('active');
				$('.skillsets[data-set="'+res.set+'"]').addClass('active');
				var td={};
				var sets=res.set_techs;
				var len=sets.length;
				for(var s=1;s<=20;s++){
					$('#tech_slot_'+s).html('');
					td[s]=0;
				}
				for(var i=0;i<len;i++){
					var tech_id=sets[i].tech_id;
					td[sets[i].turn]=tech_id;
					if(tech_id>0) $('#tech_slot_'+sets[i].turn).html(this.showTech(tech_id,this.learned_techs[tech_id].cat_id,this.learned_techs[tech_id].cat2_id,this.learned_techs[tech_id].tech_lvl));
				}
				this.current_set=td;
				this.rebuildSet();
				this.show_tech_dmg=true;
				tech_bind();
			}
			option_bind();
		break;
		case 68: //party view
			this.party=res.party;
			this.mobs_prepared=false;
			this.prepareChatChannels();
			if(res.party){
				$('#no_party').hide();
				$('#has_party').show();
				if(res.party.leader==this.char_id) $('.is_party_leader').show();
				else $('.is_party_leader').hide();
				var player='<span class="option" data-option="show_player" data-char_id="'+res.party.leader+'">'+res.party.leader_nick+' '+this.showOnlineStatus(res.party.leader_online)+'</span>';
				$('#party_leader').html(player);
				var mems='';
				for(var m=1;m<=3;m++){
					if(res.party['char'+m]){
						mems+='<span class="option" data-option="show_player" data-char_id="'+res.party['char'+m]+'">'+res.party['char'+m+'_nick']+' '+this.showOnlineStatus(res.party['char'+m+'_online'])+'</span>';
						if(res.party['char'+m]==this.char_id) mems+='<button class="newBtn option" data-option="leave_party">'+LNG.lab196+'</button>';
						if(res.party.leader==this.char_id) mems+='<button class="newBtn option" data-option="kick_party" data-num="'+m+'">KICK</button>';
						mems+='<br />';
					}
				}
				$('#party_members').html(mems);
			}
			else{
				var con='';
				if(res.invites&&res.invites.length){
					var len=res.invites.length;
					for(var i=0;i<len;i++){
						con+=LNG.lab418+' <b class="option" data-option="show_player" data-char_id="'+res.invites[i].leader+'">'+res.invites[i].name+'</b><button class="option newBtn" data-option="party_decision" data-inv="'+i+'" data-dec="0">'+LNG.lab195+'</button> <button class="option newBtn" data-option="party_decision" data-inv="'+i+'" data-dec="1">'+LNG.lab194+'</button><br />';
					}
				}
				else con='['+LNG.lab3+']';
				$('#party_invites').html(con);
				$('#has_party').hide();
				$('#no_party').show();
			}
			option_bind();
		break;
		case 69:
			var pages=res.all_pages;
			var page=res.page;
			this.banker_page=page;
			var pagi='';
			var pagi=LNG.lab272+' <b>'+page+'</b>/<b>'+pages+'</b> <button class="option newBtn" data-option="show_bank" data-page="'+(page-1)+'"><<</button> <button class="option newBtn" data-option="show_bank" data-page="'+(page+1)+'">>></button>';
			$('#bank_pagi').html(pagi);
			var con='';
			var data=res.banker;
			var len=data.length;
			for(var i=0;i<len;i++){
				var opts='';
				if(data[i].char_id==this.char_id) opt='<button class="newBtn option" data-option="withdraw_gold" data-offer="'+data[i].id+'">'+LNG.lab330+'</button>';
				else opt='<div class="game_input vsmall"><input id="gold_buy_'+data[i].id+'" type="text" value="1" /></div> <img src="/gfx/kp.png" /> <button class="newBtn option" data-offer="'+data[i].id+'" data-option="buy_gold">'+LNG.lab435+'</button>';
				con+='<tr><td>'+this.dots(data[i].price)+'<img src="/gfx/gold.png" /></td><td>x'+this.dots(data[i].amount)+'</td><td>'+opt+'</td></tr>';
			}
			$('#bank_offers').html(con);
			option_bind();
		break;
		case 70:
			var data=res.manus.sort(function(a,b){return b.cat_id-a.cat_id||b.level-a.level||a.tech_id-b.tech_id||b.type-a.type});
			var len=data.length;
			var active='',rest='',used=0;
			for(var i=0;i<len;i++){
				
				if(data[i].active){
					var manu='<div class="manuscript option" data-option="unuse_scroll" data-scroll="'+data[i].id+'" data-toggle="tooltip" data-original-title="'+this.showManuscript(data[i])+'"><img src="../gfx/jutsu/'+data[i].cat_id+'/'+data[i].cat2_id+'/'+data[i].tech_id+'.png" class="m'+data[i].type+'" /><span>x'+data[i].stack+'</span>';
					manu+='</div>';
					active+=manu;
					used++;
				}
				else{
					var manu='<div class="manuscript option" data-toggle="tooltip" data-original-title="'+this.showManuscript(data[i])+'"><img class="option m'+data[i].type+'" data-option="use_scroll" data-scroll="'+data[i].id+'" src="../gfx/jutsu/'+data[i].cat_id+'/'+data[i].cat2_id+'/'+data[i].tech_id+'.png" /><span>x'+data[i].stack+'</span>';
					if(data[i].stack>=3&&data[i].level<10) manu+='<button class="option scroll_upgrade" data-option="upgrade_scroll" data-scroll="'+data[i].id+'"></button>';
					manu+='<div class=newCheckbox><input class="delete_manuscript" type=checkbox id="delete_manuscript_'+data[i].id+'" value="'+data[i].id+'" data-level="'+data[i].level+'" /><label for="delete_manuscript_'+data[i].id+'"></label></div></div>';
					rest+=manu;
				}
			}
			$('#used_manus').text(used);
			$('#max_manus').text(1+Math.floor(this.char_data.level/30));
			$('#manu_active').html(active);
			$('#manu_view').html(rest);
			tooltip_bind();
			option_bind();
		break;
		case 71:
			var data=res.villstory;
			var len=data.length;
			var con='';
			for(var i=0;i<len;i++){
				con+='<tr><td>'+this.convertTime(data[i].time)+'</td><td>'+this.kageLog(data[i],res.village)+'</td></tr>';
			}
			$('#vill_story_con').html(con);
			option_bind();
		break;
		case 72:
			var data=res.kagefights;
			var len=data.length;
			var con='<b>'+LNG.lab443+'</b><br />';
			var r=0,w=1;
			for(var i=0;i<len;i++){
				if(data[i].round!=r){
					con+='<br /><b>R '+data[i].round+'</b>: ';
					r=data[i].round;
				}
				con+='<button class="newBtn option" data-option="show_kage_fight" data-rid='+data[i].id+'"">'+LNG.lab376+' '+w+'</button> ';
				w++;
			}
			$('#kage_fights').html(con);
			option_bind();
		break;
		case 73:
			var data=res.current,con='';
			var len=data.length,num=1;
			for(var i=0;i<len;i++){
				con+='<tr><td class="sm">'+num+'</td><td><b class="option green" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].name+'</b></td></tr>';
				num++;
			}
			if(len==0) con+='<tr><td>'+LNG.lab3+'</td></tr>';
			$('#current_masters').html(con);
			
			var data=res.future,con='';
			var len=data.length,num=1;
			for(var i=0;i<len;i++){
				var cls='';
				if(num<=7) cls='class="swa"';
				else cls='class="swn"';
				con+='<tr><td '+cls+'>'+num+'</td><td><b class="option" data-option="show_player" data-char_id="'+data[i].id+'">'+data[i].name+'</b></td><td>'+this.dots(data[i].monthly_wins)+'</td></tr>';
				num++;
			}
			if(len==0) con+='<tr><td>'+LNG.lab3+'</td></tr>';
			$('#future_masters').html(con);
			option_bind();
		break;
		case 74: 
			if(res.card_data) this.card_data=res.card_data;
			var owned=res.owned||[];
			var len=owned.length;
			var con='['+LNG.lab463+']';
			$('#sc_slots').removeClass().addClass('slots'+this.char_data.soul_slots);
			if(res.hasOwnProperty('ess')) $('#lab_soulessences').text(this.dots(res.ess));
			if(this.char_data.soul_slots<7) $('#soul_upgrade_cost').text(this.dots(this.soulCost(this.char_data.soul_slots)));
			else $('#soul_upgrade_cost').text('--');
			if(len){
				con='';
				$('.card_slot').html('');
				var active_cards=[];
				for(var i=0;i<len;i++){
					owned[i].class=this.card_data.cards[owned[i].card_id].class;
					if(owned[i].slot==0) continue;
					active_cards.push(owned[i].card_id);
				}
				this.active_cards=active_cards;
				owned=owned.sort(function(a,b){return b.class-a.class||b.card_id-a.card_id||b.level-a.level});
				for(var i=0;i<len;i++){
					if(owned[i].slot>0) $('#card_slot'+owned[i].slot).html('<div class="small_card" data-toggle="tooltip_left2" data-original-title="'+this.showCardDesc(owned[i].card_id,this.card_data.cards[owned[i].card_id],owned[i].level)+'"><span>'+owned[i].level+'</span><img src="/gfx/cards/'+owned[i].card_id+'.png" /></div>');
					else con+='<div class="small_card card_option" data-card_id="'+owned[i].id+'" data-toggle="tooltip_left2" data-original-title="'+this.showCardDesc(owned[i].card_id,this.card_data.cards[owned[i].card_id],owned[i].level)+'"><span>'+owned[i].level+'</span><img src="/gfx/cards/'+owned[i].card_id+'.png" /></div>';
				}
			}
			$('#sc_upgrades').html(con);
			tooltip_bind();
			$('.card_option').off('click').on('click',function(){
				var th=$(this);
				var pos=th.position();
				$('#soulcard_menu').fadeIn().css({'top':pos.top+'px','left':pos.left-30+'px'});
				GAME.selected_card=th.data('card_id');
			});
		break;
		case 75:
			if(res.soultower) this.soultower=res.soultower;
			var bons='<div class=ptt>';
			var len=this.soultower.levels.length;
			for(var i=0;i<len;i++){
				var cls='',cls2='';
				if(this.char_data.soul_floor>=this.soultower.levels[i]) cls='orange';
				else{
					cls='red';
					cls2='grey';
				}
				bons+='&raquo; <b class='+cls+'>'+this.soultower.levels[i]+'+</b><br />';
				if(this.soultower[this.soultower.levels[i]]){
					var stats=this.soultower[this.soultower.levels[i]];
					var len2=stats.length;
					for(var j=0;j<len2;j++){
						bons+='<b class=green>'+stats[j].val+'</b> <span class='+cls2+'>'+this.item_stat(stats[j].stat)+'</span><br />';
					}
				}
			}
			bons+='</div>';
			$('#soul_bonuses').attr('data-original-title',bons);
			var time=this.getTime();
			if(res.cd>time){
				$('#ss_cd_still').show();
				$('#ss_timer').html(this.showTimer(res.cd-time,'data-special="11"'));
			}
			else $('#ss_cd_still').hide();
		break;
	}
}
GAME.kageLog = function(row,village){
	var con='';
	switch(row.action){
		case 2: 
			con='<b class="option" data-option="show_player" data-char_id="'+row.char_id+'">'+row.name+'</b> '+LNG.kagelog2+' <strong>'+LNG['lnum'+row.kage_number]+' '+LNG['empireleader'+village]+'</strong>!'; 
		break;
		case 3: 
			con=LNG.kagelog3a+' <b class="option" data-option="show_player" data-char_id="'+row.char_id+'">'+row.name+'</b> '+LNG.kagelog3b+' <strong>'+LNG['lnum'+row.kage_number]+' '+LNG['empireleader'+village]+'</strong>! <button class="newBtn option" data-option="kage_fights" data-bid="'+row.battle_id+'">'+LNG.lab375+'</a>'; 
		break;
		default: con=LNG['empireleader'+village]+' '+LNG.kagelog1; break;
	}
	return con;
}
GAME.showCardDesc = function(card_id,card_data,level){
	var desc='<div class=cardtt><div class=soulcard><span>'+level+'</span><img src=/gfx/cards/'+card_id+'.png /></div>';
	var bon=card_data.main_stat.value*level;
	desc+='<div class=card_right><h3>'+card_data.name+'</h3><b class=cardclass'+card_data.class+'>'+LNG['card_class'+card_data.class]+'</b><br />'+LNG.lab464+': <span class=stat><b>'+bon+'</b> '+this.item_stat(card_data.main_stat.stat)+'</span><br /><br />'+LNG.lab465+'<br />';
	var len=card_data.base_stats.length;
	for(var i=0;i<len;i++){
		var cls='green',cls2='stat';
		if(level<card_data.base_stats[i].need_lvl){
			cls='red';
			cls2='grey';
		}
		desc+='<span class='+cls+'>'+LNG.lab466+' <b>'+card_data.base_stats[i].need_lvl+'</b> : <span class='+cls2+'><b>'+card_data.base_stats[i].value+'</b> '+this.item_stat(card_data.base_stats[i].stat)+'</span></span><br />';
	}
	var len=card_data.set_stats.length;
	desc+='<br />'+LNG.lab467+':<br />';
	for(var i=0;i<len;i++){
		var cls='red';
		var set=card_data.set_stats[i].set_id;
		var len2=this.card_data.sets[set].cards.length,has_all=true,parts='';
		for(var j=0;j<len2;j++){
			var cls='red';
			if(this.active_cards.indexOf(this.card_data.sets[set].cards[j])!=-1) cls='green';
			else has_all=false;
			parts+='<span class='+cls+'>'+this.card_data.cards[this.card_data.sets[set].cards[j]].name+'</span> ';
		}
		var cls='red',cls2='grey';
		if(has_all){
			cls='green';
			cls2='stat';
		}
		desc+='<div class=cardset><b class='+cls+'>'+this.card_data.sets[set][this.lang]+'</b>: ( '+parts;
		desc+=')<br /><span class='+cls2+'><b>'+card_data.set_stats[i].value+'</b> '+this.item_stat(card_data.set_stats[i].stat)+'</span></div>';
	}
	desc+='</div><div class=clr></div></div>';
	return desc;
}
GAME.soulCost = function(current){
	switch(current){
		case 2: return 100;
		case 3: return 500;
		case 4: return 4000;
		case 5: return 30000;
		case 6: return 200000;
		default: return 99999999;
	}
}
GAME.showManuscript = function(data){
	var con='<div class=tt>';
	if(data.level>=1) con+='<b class=item4>'+this.rzymskie(data.level)+' '+LNG.lab436+' ';
	else con+=LNG.lab437+' ';
	con+=LNG['scroll_type'+data.type]+' '+data.nazwa+'</b><br />';
	if(data.level>=1){
		switch(data.type){
			case 1:
				var val=data.level*10;
				con+=LNG['scroll_effect'+data.type]+' <i>'+data.nazwa+'</i> '+LNG.lab438+' <b>'+val+'</b>%';
			break;
			case 2:
				var val=data.level*1;
				con+=LNG['scroll_effect'+data.type]+' <i>'+data.nazwa+'</i> '+LNG.lab438+' <b>'+val+'</b>';
			break;
			case 3:
				var val=data.level*1;
				con+=LNG['scroll_effect'+data.type]+' <i>'+data.nazwa+'</i> '+LNG.lab438+' <b>'+val+'</b>';
			break;
			case 4:
				var val=data.level*5;
				con+=LNG['scroll_effect'+data.type]+' <i>'+data.nazwa+'</i> '+LNG.lab438+' <b>'+val+'</b>%';
			break;
		}
	}
	con+='</div>';
	return con;
}
GAME.rzymskie = function(liczba){
	switch(liczba){
		case 0: return 0;
		case 1: return 'I';
		case 2: return 'II';
		case 3: return 'III';
		case 4: return 'IV';
		case 5: return 'V';
		case 6: return 'VI';
		case 7: return 'VII';
		case 8: return 'VIII';
		case 9: return 'IX';
		case 10: return 'X';
	}
}
GAME.prepareAbtra = function(){
	var src='',tar='';
	var check=[1,2,3,4,5,6,7,8,9,10,11];
	var len=check.length;
	for(var i=0;i<len;i++){
		var abi=this.ability2b(check[i]);
		if(this.char_data[abi]>0){
			src+='<option value="'+check[i]+'">'+LNG['abi_'+abi]+' ('+this.dots(this.char_data[abi])+')</option>';
			tar+='<option value="'+check[i]+'">80 '+LNG['abi_'+abi]+' ('+this.dots(this.char_data[abi])+')</option>';
		}
	}
	$('#abtra_source').html(src);
	$('#abtra_target').html(tar);
}
GAME.parseExchange = function(data){
	var len=data.length;
	var con='';
	for(var i=0;i<len;i++){
		var gfx='';
		switch(data[i].item_type){
			case 2:
				gfx='/gfx/items/recipe.png';
			break;
			case 1:
				gfx='/gfx/items/cons/'+data[i].item_id+'.png';
			break;
		}
		con+='<div class="exchange_opt option" data-option="do_exchange" data-exchange="'+data[i].exchange_id+'" data-item="'+data[i].id+'" data-toggle="tooltip" data-original-title="'+this.exchDesc(data[i])+'"><img src="'+gfx+'" /></div>';
	}
	$('#exchange_con').html(con);
	$('#exhange_interface').show();
	option_bind();
	tooltip_bind();
}
GAME.exchDesc = function(data){
	var alhas='';
	if(data.item_has) alhas='<b class=green>'+LNG.lab440+'</b>';
	
	var con='<div class=ett><h3>'+data['item_'+this.lang]+'</h3>'+LNG['exch_type'+data.item_type]+'<br />'+alhas+'<br /><span class=red>'+LNG.lab18+'</span>:<br />';
	for(var n=1;n<=2;n++){
		var cls1='red';
		if(data['need'+n+'_has']>=data['need'+n+'_am']) cls1='green';
		switch(data['need'+n+'_type'])
		{
			case 3:
				con+=LNG['exch_type'+data['need'+n+'_type']]+': <b class='+cls1+'>'+data['need'+n+'_'+this.lang]+' x '+data['need'+n+'_am']+' ('+data['need'+n+'_has']+')</b><br />'
			break;
			case 4:
				con+=LNG['exch_type'+data['need'+n+'_type']]+': <img src=/gfx/gold.png /> <b class='+cls1+'>'+this.dots(data['need'+n+'_am'])+'</b> ('+this.dots(data['need'+n+'_has'])+')<br />'
			break;
		}
		// 
	}
	con+='</div>';
	return con;
}
GAME.ability2b = function(id){
		switch(id){
			case 1: return 'nin_fire';
			case 2: return 'nin_water';
			case 3: return 'nin_earth';
			case 4: return 'nin_wind';
			case 5: return 'nin_thunder';
			case 6: return 'gen';
			case 7: return 'kin';
			case 8: return 'tai';
			case 9: return 'ken';
			case 10: return 'shuriken';
			case 11: return 'nin';
			case 12: return 'fuin';
			case 13: return 'sen';
		}
}
GAME.showOnlineStatus = function(online){
	if(online) return '<img src="/gfx/dots/1.png" title="online" />';
	else return '<img src="/gfx/dots/5.png" title="offline" />';
}
GAME.selectOwnTechCat = function(cat){
	var con='';
	$('.otbutton').removeClass('active');
	$('.otbutton[data-cat="'+cat+'"]').addClass('active');
	if(this.learned_cats[cat]){
		var own=this.learned_cats[cat].techs;
		var len=own.length;
		for(var i=0;i<len;i++){
			con+=this.showTech(own[i].tech_id,own[i].cat_id,own[i].cat2_id,own[i].tech_lvl,0,0,0,0,1);
		}
		con+='<div class="clr"></div>';
	}
	$('#owned_techs_list').html(con);
	tech_bind();
	this.show_tech_dmg=true;
	$('.dragable_tech').off('dragstart','dragend').on('dragstart',function(){
		var el=$(this);
		hide_tooltips();
		var tech_id=parseInt(el.data('tech_id'));
		var nores=false;
		switch(GAME.learned_techs[tech_id].use_natural_energy){
			case 1: 
				if(GAME.learned_techs[tech_id].cost>GAME.left_energy) nores=true;
			break;
			default: 
				if(GAME.learned_techs[tech_id].cost>GAME.left_chakra) nores=true;
			break;
		}
		for(var s=1;s<=20;s++){
			if(GAME.set_cooldowns[s].indexOf(tech_id)!=-1) $('#tech_slot_'+s).addClass('oncd');
			else if(nores) $('#tech_slot_'+s).addClass('nores');
		}
		GAME.dragged_tech=tech_id;
	}).on('dragend',function(ev){
		var el=$(this);
		$('.oncd').removeClass('oncd');
		$('.nores').removeClass('nores');
		delete GAME.dragged_tech;
		hide_tooltips();
	});
}
GAME.editPet = function(pet_id){
	pet_id=parseInt(pet_id);
	if(this.pets[pet_id]){
		var pet=this.pets[pet_id];
		this.current_pet=pet_id;
		$('#pet_edit_name').text(pet.nazwa);
		if(pet.exp>=this.nextLevelExp(pet.level,0)&&pet.level<254) $('#pedit_levelup_btns').show();
		else $('#pedit_levelup_btns').hide();
		if(pet.active!=1) $('#edit_pet_release').show();
		else $('#edit_pet_release').hide();
		$('#pet_avatar').attr('src',pet.avatar);
		$('#pet_desc_ap').text(pet.ap);
		$('#pet_desc_a1').text(pet.sila);
		$('#pet_desc_a2').text(pet.szyb);
		$('#pet_desc_a3').text(pet.wytrz);
		$('#pet_desc_a4').text(pet.moc);
		$('#pet_desc_a5').text(pet.swoli);
		$('#pet_desc_a6').text(pet.ener);
		$('#pet_desc_special').text(pet.kg);
		var abis=['tai','ken','shuriken','nin','nin_fire','nin_water','nin_earth','nin_wind','nin_thunder','gen','kin'];
		$('.pet_nin_abi').removeClass('color');
		var un=this.abimix(9,pet.kekkei_touta);
		var len=un.length;
		for(var i=0;i<len;i++){
			$('#pet_appoint_abi option[value="'+this.ability2b(un[i])+'"]').addClass('color');
			
		}
		var len=abis.length;
		for(var i=0;i<len;i++){
			$('#pet_desc_'+abis[i]).text(pet[abis[i]]);
			if(pet[abis[i]]>=101) $('#pet_abi_revert_'+abis[i]).show();
			else $('#pet_abi_revert_'+abis[i]).hide();
		}
		if(pet.kg<1) $('#pet_abi_up').hide(); 
		else $('#pet_abi_up').show(); 
		if(pet.ap<1) $('.pet_stat_upgrade').hide();
		else $('.pet_stat_upgrade').show();
		var pt='';
		var slots=Math.floor(pet.level/15);
		if(slots>10) slots=10;
		if(slots<1) slots=1;
		for(var i=1;i<=slots;i++){
			if(pet['tech'+i]>0) pt+='<div class=pet_tech><b>'+LNG.lab400+' '+pet['tech'+i+'_slot']+'</b><br /><button class="option newBtn" data-option="pet_tech_move" data-dir="0" data-slot="'+i+'">&lt;</button><button class="option newBtn" data-option="pet_tech_move" data-dir="1" data-slot="'+i+'">&gt;</button><br />10 <i class="upgrade_icon atp"></i><div class=\'technika tech_data j'+pet['tech'+i+'_c1']+'_'+pet['tech'+i+'_c2']+'\' data-pet_id="'+(pet_id+1)+'" data-tech_id='+pet['tech'+i]+' data-level='+pet['tech'+i+'_lvl']+' data-toggle="tooltip" data-original-title="?"><img src=/gfx/jutsu/'+pet['tech'+i+'_c1']+'/'+pet['tech'+i+'_c2']+'/'+pet['tech'+i]+'.png /></div><span>'+pet['tech'+i+'_name']+'</span></div>';
			else pt+='<div class=pet_tech></div>';
		}
		pt+='<div class="clr"></div>';
		$('#pet_edit_techs').html(pt);
		tech_bind();
		option_bind();
	}
}
GAME.rebuildSet = function(){
	this.set_cooldowns={};
	var used_chakra=0,used_energy=0;
	for(var s=1;s<=20;s++){
		this.set_cooldowns[s]=[];
	}
	for(var s=1;s<=20;s++){
		if(this.current_set[s]>0){
			var tech_id=this.current_set[s];
			var cd=this.learned_techs[tech_id].cd;
			var cds=s-cd;
			var cde=s+cd;
			if(cde>20) cde=20;
			if(cds<1) cds=1;
			for(var cd=cds;cd<=cde;cd++){
				this.set_cooldowns[cd].push(tech_id);
			}
			switch(this.learned_techs[tech_id].use_natural_energy){
				case 1: used_energy+=this.learned_techs[tech_id].cost; break;
				default: used_chakra+=this.learned_techs[tech_id].cost; break;
			}
		}
	}
	var left1=this.max_chakra-used_chakra;
	var left2=this.max_energy-used_energy;
	this.left_chakra=left1;
	this.left_energy=left2;
	$('#char_set_mana').text(this.dots(left1));
	$('#char_set_energy').text(this.dots(this.max_energy-used_energy));
	var w1=Math.floor(left1/this.max_chakra*100);
	if(w1<0) w1=0;
	if(w1>100) w1=100;
	$('#set_mana_bar').css({'width':w1+'%'});
	var w1=Math.floor(left2/this.max_energy*100);
	if(w1<0) w1=0;
	if(w1>100) w1=100;
	$('#set_energy_bar').css({'width':w1+'%'});
}
GAME.assignSetTech = function(slot,tech_id){
	if(this.learned_techs[tech_id]){
		if(slot==1&&(this.learned_techs[tech_id].type==1||this.learned_techs[tech_id].type==3)) this.komunikat(LNG.error184);
		else{
			this.current_set[slot]=tech_id;
			var html=this.showTech(tech_id,this.learned_techs[tech_id].cat_id,this.learned_techs[tech_id].cat2_id,this.learned_techs[tech_id].tech_lvl);
			$('#tech_slot_'+slot).html(html);
			tech_bind();
			this.show_tech_dmg=true;
			this.rebuildSet();
		}
	}
	else tech_id=0;
	if(tech_id==0){
		this.current_set[slot]=0;
		$('#tech_slot_'+slot).html('');
		this.rebuildSet();
	}
	hide_tooltips();
}
GAME.showTechSet = function(set){
	this.emitOrder({a:203,type:1,set:set});
}
GAME.CHA_wzor = function(c_en,c_wy,c_lvl){
	return Math.round((c_en*15+c_wy*7.5)*(this.lvl_range(c_lvl)/4)+c_lvl*10);
}
GAME.lvl_range = function(lvl){
	if(lvl<15) return 1;
	else return Math.floor(lvl/15);
}
GAME.tour_kategoria = function(id,type){
	var wynik='';
	switch(type){
		case 1:
			switch(id){
				case 1: wynik="15-29"; break;
				case 2: wynik="30-44"; break;
				case 3: wynik="45-59"; break;
				case 4: wynik="60-74"; break;
				case 5: wynik="75-89"; break;
				case 6: wynik="90-104"; break;
				case 7: wynik="105-119"; break;
				case 8: wynik="120-134"; break;
				case 9: wynik="135-149"; break;
				case 10: wynik="150-164"; break;
				case 11: wynik="165-179"; break;
				case 12: wynik="180-194"; break;
				case 13: wynik="195-209"; break;
				case 14: wynik="210-224"; break;
				case 15: wynik="225-239"; break;
				case 16: wynik="240-254"; break;
			}
		break;
		default:
			switch(id){
				case 1: wynik="15-29"; break;
				case 2: wynik="30-44"; break;
				case 3: wynik="45-59"; break;
				case 4: wynik="60-74"; break;
				case 5: wynik="75-89"; break;
				case 6: wynik="90-104"; break;
				case 7: wynik="105-119"; break;
				case 8: wynik="120-134"; break;
				case 9: wynik="135-149"; break;
				case 10: wynik="150-164"; break;
				case 11: wynik="165-179"; break;
				case 12: wynik="180-194"; break;
				case 13: wynik="195-209"; break;
				case 14: wynik="210-224"; break;
				case 15: wynik="225-239"; break;
				case 16: wynik="240-254"; break;
			}
		break;
	}
	return wynik;
}
GAME.isYourTourCat = function(type,cat,reborn,level){
		switch(type){
			case 1:
				switch(cat){
					case 1: if(reborn==0&&level>=15&&level<=29) return true; break;
					case 2: if(reborn==0&&level>=30&&level<=44) return true; break;
					case 3: if(reborn==0&&level>=45&&level<=59) return true; break;
					case 4: if(reborn==0&&level>=60&&level<=74) return true; break;
					case 5: if(reborn==0&&level>=75&&level<=89) return true; break;
					case 6: if(reborn==0&&level>=90&&level<=104) return true; break;
					case 7: if(reborn==0&&level>=105&&level<=119) return true; break;
					case 8: if(reborn==0&&level>=120&&level<=134) return true; break;
					case 9: if(reborn==0&&level>=135&&level<=149) return true; break;
					case 10: if(reborn==0&&level>=150&&level<=164) return true; break;
					case 11: if(reborn==0&&level>=165&&level<=179) return true; break;
					case 12: if(reborn==0&&level>=180&&level<=194) return true; break;
					case 13: if(reborn==0&&level>=195&&level<=209) return true; break;
					case 14: if(reborn==0&&level>=210&&level<=224) return true; break;
					case 15: if(reborn==0&&level>=225&&level<=239) return true; break;
					case 16: if(reborn==0&&level>=240&&level<=254) return true; break;
				}
			break;
			default:
				switch(cat){
					case 1: if(reborn==0&&level>=15&&level<=29) return true; break;
					case 2: if(reborn==0&&level>=30&&level<=44) return true; break;
					case 3: if(reborn==0&&level>=45&&level<=59) return true; break;
					case 4: if(reborn==0&&level>=60&&level<=74) return true; break;
					case 5: if(reborn==0&&level>=75&&level<=89) return true; break;
					case 6: if(reborn==0&&level>=90&&level<=104) return true; break;
					case 7: if(reborn==0&&level>=105&&level<=119) return true; break;
					case 8: if(reborn==0&&level>=120&&level<=134) return true; break;
					case 9: if(reborn==0&&level>=135&&level<=149) return true; break;
					case 10: if(reborn==0&&level>=150&&level<=164) return true; break;
					case 11: if(reborn==0&&level>=165&&level<=179) return true; break;
					case 12: if(reborn==0&&level>=180&&level<=194) return true; break;
					case 13: if(reborn==0&&level>=195&&level<=209) return true; break;
					case 14: if(reborn==0&&level>=210&&level<=224) return true; break;
					case 15: if(reborn==0&&level>=225&&level<=239) return true; break;
					case 16: if(reborn==0&&level>=240) return true; break; //&&level<=254
				}
			break;
		}
	}
GAME.getUsableItemDesc = function(data,use=false){
	if(data.id&&!data.item_id) data.item_id=data.id;
	var res='<div class=\'item_desc panel_border\'>';
	res+='<div class=\'item_name item'+data.class+'\'>'+data[this.lang_data['lokacje'][this.lang]]+'<br /><span class=item'+data.class+'>'+LNG['item_class'+data.class]+'</span></div><div class=\'item_desc_class c'+data.class+' ekw_page_items\'><div class=ekw_slot><img src=/gfx/items/cons/'+data.item_id+'.png /></div>';
	if(data.min_lvl>0){
		var cls='';
		if(data.min_lvl>this.char_data.level) cls='red';
		res+='<br />'+LNG.lab24+' <b class='+cls+'>'+data.min_lvl+'</b>';
	}
	res+='<br />';
	if(LNG['uitem_desc'+data.item_id]) res+='<br /><i>'+LNG['uitem_desc'+data.item_id]+'</i>';
	res+='</div><div class=inner_content>';
	switch(data.effect_type){
		case 1: 
			res+=LNG.item_func8+': <b>'+this.dots(data.effect_value)+'</b>'; 
			if(data.effect_value2>0) res+=' +'+data.effect_value2+'%';
		break;
		case 2: res+=LNG.item_func1+' x'+data.effect_value+'.'; break;
		case 3: res+=LNG.item_func50; break;
		case 4: res+=LNG.item_func51; break;
		case 6: 
			res+=LNG.item_func57+' <b>'+data.effect_value+'</b>'+LNG.item_func58+': <b>'+data.item_name+'</b>';
		break;
		case 7: res+=LNG.item_func52; break;
		case 8: res+=LNG.item_func53; break;
		case 9: res+=LNG.item_func55+' :<br />+<b>'+data.effect_value2+'</b>'+this.item_stat(data.effect_value)+'<br /><br />'+LNG.lab392+': 01:00:00<br />'+LNG.item_func56; break;
		case 10: res+=LNG.item_func54+' <b>'+data.effect_value2+'</b> x '+LNG['item_func54_'+data.effect_value]; break;
		case 11: res+=LNG.item_func59+' <b>'+LNG['mob_rank'+data.effect_value]+'</b> x '+data.effect_value2; break;
		case 12: res+=LNG.item_func60; break;
		case 13: res+=LNG.item_func55+' :<br />+<b>'+data.effect_value2+'</b>'+this.item_stat(data.effect_value)+'<br /><br />'+LNG.lab392+': 12:00:00'; break;
		case 14:
			res+=LNG.item_func61+': <br />';
			if(data.box){
				var len=data.box.length;
				for(var i=0;i<len;i++){
					if(data.box[i].kk) res+='<img src=/gfx/kk.png />'+data.box[i].kk+'<br />';
					if(data.box[i].item) res+='<b class=item'+data.box[i].class+'>'+data.box[i][this.lang]+'</b> x'+data.box[i].amount+'<br />';
				}
			}
		break;	
		case 15: res+=LNG.item_func62; break;
		case 16: res+=LNG.item_func63; break;
		case 17: res+=LNG.item_func64; break;
	}
	res+='</div>';
	
	if(use&&data.effect_type>0) res+='<br /><br />['+LNG.lab396+']';
	res+='</div>';
	return res;
}
GAME.showTech = function(tech_id,c1,c2,level,show_sp_cost=0,disabled=false,can_downgrade=false,can_upgrade=false,drag=false,show_dmg=false){
	this.tech_show_sp_cost=show_sp_cost;
	var dis='',down='',up='',dragg='';
	if(disabled) dis='disabled';
	if(can_downgrade) down='<button class="option tech_downgrade" data-option="tech_downgrade" data-tech_id="'+tech_id+'"></button>';
	if(can_upgrade) up='<button class="option tech_upgrade" data-option="tech_upgrade" data-tech_id="'+tech_id+'"></button>';
	if(drag){
		dragg='draggable="true"';
		dis='dragable_tech';
	}
	if(show_dmg) dragg+=' data-show_dmg="1"';
	var con='<div class="technika j'+c1+'_'+c2+' tech_data '+dis+'" '+dragg+' data-tech_id="'+tech_id+'" data-level="'+level+'" data-toggle="tooltip" data-original-title="?"><img data-tech_id="'+tech_id+'" src="/gfx/jutsu/'+c1+'/'+c2+'/'+tech_id+'.png" />'+down+up+'</div>';
	return con;
}
GAME.parseQEkw = function(stackable){
	var data=stackable;
	$('.ekw_pag').removeClass('active');
	$('#ekw_pag_'+GAME.ekw_page).addClass('active');
	var len=data.length;
	var con='';
	for(var i=0;i<len;i++){
		var item=data[i],stack='';
		item.pic='/gfx/items/quest.png';
		con+='<div class="ekw_slot ekw_list_item option" data-toggle="tooltip" data-original-title="<div class=tt><b class=orange>'+item.name+'</b><br />'+item.opis+'</div>"><img src="'+item.pic+'" />'+stack+'</div>';
	}
	con+='<div class="clearfix"></div>';
	$('#ekw_page_items').html(con);
	tooltip_bind();
}
GAME.parseMaterials = function(stackable){
	var data=stackable;
	$('.ekw_pag').removeClass('active');
	$('#ekw_pag_'+GAME.ekw_page).addClass('active');
	var len=data.length;
	var con='';
	for(var i=0;i<len;i++){
		var item=data[i],stack='';
		item.pic='/gfx/items/mats/'+item.mat_id+'.png';
		if(item.amount>=1000) stack='<div>'+this.abbreviateNumber(item.amount,1)+'</div>';
		else stack='<div>'+item.amount+'</div>';
		con+='<div class="ekw_slot ekw_list_item option" data-toggle="tooltip" data-original-title="<div class=tt>'+item[this.lang_data['lokacje'][this.lang]]+'</div>"><img src="'+item.pic+'" />'+stack+'</div>';
	}
	con+='<div class="clearfix"></div>';
	$('#ekw_page_items').html(con);
	tooltip_bind();
}
GAME.parseStackableItems = function(stackable){
	var data=stackable.sort(function(a,b){return a.effect_type-b.effect_type});
	$('.ekw_pag').removeClass('active');
	$('#ekw_pag_'+GAME.ekw_page).addClass('active');
	var len=data.length;
	var con='';
	for(var i=0;i<len;i++){
		var item=data[i],stack='',drag='';
		item.pic='/gfx/items/cons/'+item.item_id+'.png';
		if(item.stack>=1000) stack='<div>'+this.abbreviateNumber(item.stack,1)+'</div>';
		else stack='<div>'+item.stack+'</div>';
		var opt='';
		if(item.effect_type) opt='data-option="use_usable" data-amount="'+item.stack+'" data-type="'+item.effect_type+'"';
		if(item.item_id>=2&&item.item_id<=6) opt='data-option="don_item" data-class="'+item.class+'" data-gfx="'+item.pic+'" data-max="'+item.stack+'"';
		con+='<div class="ekw_slot ekw_list_item option" '+opt+' data-iid="'+item.id+'" data-toggle="tooltip" data-original-title="'+this.getUsableItemDesc(item,true)+'"><img src="'+item.pic+'" />'+stack+'</div>';
	}
	con+='<div class="clearfix"></div>';
	$('#ekw_page_items').html(con);
	tooltip_bind();
	option_bind();
}
GAME.checkTutorial = function(){
	if(!this.current_tutorial){
		var done=[];
		var len=this.tutorials.length;
		for(var i=0;i<len;i++) done.push(this.tutorials[i].tutorial);
		
		var len=this.tutorial_data.cnt;
		for(var i=1;i<=len;i++){
			if(done.indexOf(i)!=-1) continue;
			var tut=this.tutorial_data['t'+i];
			if(tut.auto_start){
				var rreb=0;
				if(tut.req_reb) rreb=tut.req_reb;
				if(!this.levelReqCheck(tut.req_lvl,rreb)) continue;
				this.startTutorial(i)
				break;
			}
		}
	}
}
GAME.showTutorialStep = function(){
	$('#tutorial_button1').hide();
	$('#tutorial_arrow').hide();
	if(this.current_tutorial){
		var tut=this.tutorial_data['t'+this.current_tutorial.id],step_done=true;
		if(tut&&tut.steps){
			if(tut.steps[this.current_tutorial.step]){
				var step=tut.steps[this.current_tutorial.step];
				if(step.requirement.type==4) $('#tutorial_button1').show();
				$('#tutorial_content').html(step['content_'+this.lang]);
				$('#tutorial_frame').fadeIn();
				if(step.arrow) this.show_arrow_move(step.arrow[0],step.arrow[1]);
				$('#tutorial_frame').show();
			}
			else{
				if(this.current_tutorial.step>=tut.steps.length){
					this.emitOrder({a:52,type:0,tutorial:this.current_tutorial.id});
					this.cancelTutorial();
				}
			}
		}
	}
	
	else{
		$('#tutorial_frame').hide();
	}
}
GAME.tutorialReqDone = function(req,opt=''){
	if(this.current_tutorial){
		var tut=this.tutorial_data['t'+this.current_tutorial.id];
		if(tut&&tut.steps&&tut.steps[this.current_tutorial.step]){
			var step=tut.steps[this.current_tutorial.step];
			if(step.requirement&&step.requirement.type==req){
				var go=true;
				if(step.requirement.opt&&opt!=step.requirement.opt) go=false;
				if(go){
					this.current_tutorial.step++;
					this.showTutorialStep();
				}
			}
		}
	}
}
GAME.show_arrow_move = function(pointer_element,move_type){
	var coords=$(pointer_element).offset();
	if(coords){
		$('#tutorial_arrow').css({top:coords.top-this.tutorial_arrow_width+'px',left:coords.left-this.tutorial_arrow_width+'px'});
		this.arrow_move($('#tutorial_arrow'),move_type,400);
		$('#tutorial_arrow').fadeIn();
	}
}

GAME.arrow_move = function(container,direction,speed){
	container.removeClass().addClass('ani-'+direction);
}
GAME.startTutorial = function(t){
	this.current_tutorial={id:t,step:0};
	this.showTutorialStep();
	$('#tutorial').hide();
}
GAME.cancelTutorial = function(){
	delete this.current_tutorial;
	this.showTutorialStep();
	$('#tutorial').hide();
}
GAME.tutprizelist = function(prize){
	var list='';
	for(var i=0;i<prize.length;i++){
		switch(prize[i].type){
			case 1: 
				list+='<b>'+prize[i].amount+'</b> <img src="/gfx/kk.png" /><br />';
			break;
			case 2:
				list+='<b>'+this.dots(prize[i].amount)+'</b> '+LNG.item_stat6+'<br />';
			break;
			case 3:
				list+='<b>'+prize[i].amount+'</b> '+LNG.quest_prize21+'<br />';
			break;
		}
	}
	return list;
}
GAME.empireSide = function(empire){
	if(empire==1||empire==3) return '<b class="red">'+LNG.lab337+'</b>';
	else return '<b class="green">'+LNG.lab338+'</b>';
}
GAME.leader_num = function(num){
	if(num<=20) return LNG['lnum'+num];
	else return num;
}
GAME.getEmpDetails = function(petd){
	var res='<div class=ptt>';
	var nextp=this.employe_exp(petd.level+1);
	res+='<img src=/gfx/employee/'+petd.type+'.png width=100 align=left /><b>'+petd.name+'</b><br /><b>'+LNG['emptyp'+petd.type]+'</b> - <b class=item'+petd.class+'>'+LNG['item_class'+petd.class]+'</b><br />'+LNG.lab1+': <b>'+this.dots(petd.level)+'</b><br />EXP: <b>'+this.dots(petd.exp)+' / '+this.dots(nextp)+'</b><br /><br /><b class=orange>'+LNG.lab286+'</b><br />';
	res+=LNG.lab313+': <b>'+petd.energy+'</b> / <b>'+petd.maxenergy+'</b><br />';
	if(petd.qualified) res+='<b class=green>'+LNG.lab314+'</b><br />';
	res+='</div>';
	return res;
}
GAME.getPetDetails = function(petd){
	var res='<div class=ptt>';
	var evof=0;
	var class_stats=[19,20,21,22,23,24,15];
	var nextp=this.nextLevelExp(petd.level,0);
	res+='<img class=av src='+petd.avatar+' width=100 align=left /><div class=pull-left><b>'+petd.nazwa+'</b><br /><br /><b>'+LNG['bpact'+petd.type]+'</b> - <b class=item'+petd.class+'>'+LNG['item_class'+petd.class]+'</b><br />'+LNG.lab1+': <b>'+this.rebPref(0)+this.dots(petd.level)+'</b><br />EXP: <b>'+this.dots(petd.exp)+' / '+this.dots(nextp)+'</b></div><div class=pull-right><b class=orange>'+LNG.lab286+'</b><table class=tab1>';
	res+='<tr><td>'+LNG.crank_sila+':</td><td> <b>'+this.dots(petd.sila)+'</b></td></tr>';
	res+='<tr><td>'+LNG.crank_szyb+':</td><td> <b>'+this.dots(petd.szyb)+'</b></td></tr>';
	res+='<tr><td>'+LNG.crank_wytrz+':</td><td> <b>'+this.dots(petd.wytrz)+'</b></td></tr>';
	res+='<tr><td>'+LNG.apow+':</td><td> <b>'+this.dots(petd.moc)+'</b></td></tr>';
	res+='<tr><td>'+LNG.crank_swoli+':</td><td> <b>'+this.dots(petd.swoli)+'</b></td></tr>';
	res+='<tr><td>'+LNG.crank_ener+':</td><td> <b>'+this.dots(petd.ener)+'</b></td></tr>';
	if(petd.ap>0) res+='<tr><td>'+LNG.lab292+': </td><td><b class=green>'+this.dots(petd.ap)+'</b></td></tr>';
	res+='</table></div><div class=clr></div><br />';
	res+='<div class=pull-left><b class=orange>'+LNG.lab296+':</b><table class=tab1>';
	var abis=['tai','ken','shuriken','nin','gen','kin','sen','fuin','nin_fire','nin_water','nin_earth','nin_wind','nin_thunder'];
	var len=abis.length;
	for(var i=0;i<len;i++){
		if(petd[abis[i]]>0) res+='<tr><td><i class=\'ico '+abis[i]+'\'></i> '+LNG['abi_'+abis[i]]+':</td><td> <b>'+this.dots(petd[abis[i]])+'</b></td></tr>';
	}
	if(petd.kg>0) res+='<tr><td>'+LNG.lab292+': </td><td><b class=green>'+this.dots(petd.kg)+'</b></td></tr>';
	res+='</table><br />';
	res+=LNG.lab454+' <b class=item'+petd.class+'>'+LNG['item_class'+petd.class]+'</b>: <br /><table class=tab1>';
	var len=class_stats.length;
	var bon=petd.class*petd.class*2;
	for(var i=0;i<len;i++){
		res+='<tr><td class=green>'+bon+'</td><td>'+this.item_stat(class_stats[i])+'</td></tr>';
	}
	res+='</table></div>';
	res+='<div class=pull-right><b class=orange>'+LNG.lab290+':</b><table>';
	res+='<tr><td> <img src=/gfx/elements/'+petd.element+'.png /> '+LNG['element'+petd.element]+'</td></tr>';
	res+='<tr><td> <img width=40 src=/gfx/jutsu/4_'+petd.spec_nin+'.png /> '+LNG['ninjaspec'+petd.spec_nin]+'</td></tr>';
	res+='<tr><td> <img width=40 src=/gfx/jutsu/6_'+petd.spec_kin+'.png /> '+LNG['ninjaspec'+petd.spec_kin]+'</td></tr>';
	res+='<tr><td> <img width=40 src=/gfx/jutsu/8_'+petd.kekkei_genkai+'.png /> '+LNG['kg'+petd.kekkei_genkai]+'</td></tr>';
	res+='<tr><td> <img width=40 src=/gfx/jutsu/9_'+petd.kekkei_touta+'.png /> '+LNG['kt'+petd.kekkei_touta]+'</td></tr>';
	res+='</table></div><div class=clr></div>';
	res+='<b class=orange>'+LNG.lab289+':</b><div>';
	for(var i=1;i<=10;i++){
		if(petd['tech'+i]>0) res+='<div class=pet_tech><b>'+LNG.lab400+' '+petd['tech'+i+'_slot']+'</b><div class=\'technika j'+petd['tech'+i+'_c1']+'_'+petd['tech'+i+'_c2']+'\'><img src=/gfx/jutsu/'+petd['tech'+i+'_c1']+'/'+petd['tech'+i+'_c2']+'/'+petd['tech'+i]+'.png /></div><span>'+petd['tech'+i+'_name']+'</span></div>';
	}
	res+='</div><div class=clr></div></div>';
	return res;
}

GAME.pet_exp = function(lvl,reborn){
	var mod=lvl/10;
	if(mod>1) return Math.round(lvl*(2+mod)*((reborn+1)*(reborn+1)));
	else return lvl*2;
}

GAME.achi_prize_check = function(cp,level){
	var prize=0;
	if(level>=1) prize=(level-cp)*10;
	return prize;
}
GAME.chakraCrystalInterface = function(item_id,am){
	var con='<div class="to_left"><b>'+LNG.lab397+'</b><br />'+LNG.lab398+'<br /><br /><div class="radio"><input id="ccp1" type="radio" name="ccprize" value="12" checked /><label for="ccp1"></label><span>'+LNG.ccp1+'</span></div><br /><div class="radio"><input id="ccp2" type="radio" name="ccprize" value="1" /><label for="ccp2"></label><span><i class="ico tai"></i>taijutsu</span></div><br />';
	if(this.char_data['ken']>0) con+='<div class="radio"><input id="ccp3" type="radio" name="ccprize" value="2" /><label for="ccp3"></label><span><i class="ico ken"></i>kenjutsu</span></div><br />';
	if(this.char_data['shuriken']>0) con+='<div class="radio"><input id="ccp4" type="radio" name="ccprize" value="3" /><label for="ccp4"></label><span><i class="ico shuriken"></i>shurikenjutsu</span></div><br />';
	if(this.char_data['nin']>0) con+='<div class="radio"><input id="ccp5" type="radio" name="ccprize" value="4" /><label for="ccp5"></label><span><i class="ico nin"></i>ninjutsu</span></div><br />';
	if(this.char_data['gen']>0) con+='<div class="radio"><input id="ccp6" type="radio" name="ccprize" value="5" /><label for="ccp6"></label><span><i class="ico gen"></i>genjutsu</span></div><br />';
	if(this.char_data['kin']>0) con+='<div class="radio"><input id="ccp7" type="radio" name="ccprize" value="11" /><label for="ccp7"></label><span><i class="ico kin"></i>kinjutsu</span></div><br />';
	if(this.char_data['nin_fire']>0) con+='<div class="radio"><input id="ccp8" type="radio" name="ccprize" value="6" /><label for="ccp8"></label><span><i class="ico nin_fire"></i>katon</span></div><br />';
	if(this.char_data['nin_water']>0) con+='<div class="radio"><input id="ccp9" type="radio" name="ccprize" value="7" /><label for="ccp9"></label><span><i class="ico nin_water"></i>suiton</span></div><br />';
	if(this.char_data['nin_earth']>0) con+='<div class="radio"><input id="ccp10" type="radio" name="ccprize" value="8" /><label for="ccp10"></label><span><i class="ico nin_earth"></i>doton</span></div><br />';
	if(this.char_data['nin_wind']>0) con+='<div class="radio"><input id="ccp11" type="radio" name="ccprize" value="9" /><label for="ccp11"></label><span><i class="ico nin_wind"></i>fuuton</span></div><br />';
	if(this.char_data['nin_thunder']>0) con+='<div class="radio"><input id="ccp12" type="radio" name="ccprize" value="10" /><label for="ccp12"></label><span><i class="ico nin_thunder"></i>raiton</span></div><br />';
	con+=''+LNG.lab158+': <div class="game_input small"><input id="usable_am" type="text" value="1" /></div> x 7 = <span id="ck_total">7</span> / <b>'+am+'</b><br />';
	con+='<button class="newBtn option" data-option="use_usable_go" data-iid="'+item_id+'" data-crystal="1" data-amount="'+am+'">'+LNG.lab74+'</button></div>';
	this.komunikat(con);
	option_bind();
	$('#usable_am').on('input',function(){
		var am=$(this).val();
		$('#ck_total').text(am*7);
	});
}
GAME.skill_normal_cost = function(lvl,pv,id){
	lvl++;
	switch(id){
		case 17: base1=1000; break;
		default:
			base1=500;
			base2=10;
		break;
	}
	if(pv==0) return lvl*lvl*base1;
	else return lvl*lvl*base2;
}
GAME.skill_special_cost = function(skill_id,lvl){
	lvl++;
	switch(this.skill_data[skill_id].adc){
		case 'sentinel':
		case 'divine_particle':
			return lvl;
		break;
		case 'divine':
			if(this.skill_data[skill_id].max==1) return 25;
			switch(lvl){
				case 1: return 5;
				case 2: return 7;
				case 3: return 10;
				case 4: return 13;
				case 5: return 15;
				case 6: return 18;
			}
			return 999;
		break;
	}
}
GAME.castle_cost = function(lvl){
	return (lvl*7500)*lvl;
}
GAME.showSkillDesc = function(skill_id,lvl=1,show_dmg=false){
	var st='active',descs='';
	var b=(lvl*this.skill_data[skill_id].b).toFixed(2),desc='';
	if(this.skill_data[skill_id].ps){
		st='passive';
		descs='<b class=orange>'+b+'</b> '+this.item_stat(this.skill_data[skill_id].ps)+'<br />';
		if(this.skill_data[skill_id].ps2) descs='<b class=orange>'+b+'</b> '+this.item_stat(this.skill_data[skill_id].ps2)+'<br />';
	}
	var res='<div class=stt><b class=\'skill_name '+st+'\'>'+LNG['skill_name'+skill_id]+'</b> '+LNG.lab1+' <b class=green>'+lvl+'</b><br /><br /><span class=item_stat>'+descs+'</span>';
	
	res+='</div>';
	return res;
}
GAME.showSkill = function(skill_id,upgade_allowed=true){
	var base_lvl=0,ads='',st='active',max=this.skill_data[skill_id].max,descs='';
	base_lvl=this.char_data['skill_'+skill_id]; 
	var lvl=base_lvl,bon=0;
	if(base_lvl>0&&this.skill_data[skill_id].bon_stat){
		bon=this.getStat(this.skill_data[skill_id].bon_stat);
		if(bon>0){
			lvl+=bon;
			ads='+ <b class="orange">'+bon+'</b>';
		}
	}
	var b=(lvl*this.skill_data[skill_id].b).toFixed(2);
	if(this.skill_data[skill_id].ps){
		st='passive';
		descs='<b class="orange">'+b+'</b> <span class="grey">'+this.item_stat(this.skill_data[skill_id].ps)+'</span><br />';
		if(this.skill_data[skill_id].ps2) descs='<b class="orange">'+b+'</b> '+this.item_stat(this.skill_data[skill_id].ps2)+'<br />';
	}
	//else descs=LNG['skill_desc'+skill_id]+' <b class="orange">'+b+'</b>%<br />';
	
	var res='<div class="skill"><img data-toggle="tooltip" data-original-title="'+this.showSkillDesc(skill_id,lvl)+'" src="/gfx/skills/'+this.skill_data[skill_id].nc+'.png" /><b class="skill_name '+st+'">'+LNG['skill_name'+skill_id]+'</b> '+LNG.lab1+' <b class="green">'+base_lvl+'</b>/<b>'+max+'</b> '+ads+' <span class="pull-right"><b class="green">'+this.skill_data[skill_id].b+'</b>%/'+LNG.lab1+'</span><br />'+descs+'';
	if(base_lvl<max&&upgade_allowed){
		if(this.skill_data[skill_id].req_lvl){
			var cls='';
			if(this.char_data.reborn==0&&this.char_data.level<this.skill_data[skill_id].req_lvl) cls='red';
			res+=LNG.lab24+': <b class="'+cls+'">'+this.dots(this.skill_data[skill_id].req_lvl)+'</b><br />';
		}
		if(this.skill_data[skill_id].adc){
			var cls='';
			var cost=this.skill_special_cost(skill_id,base_lvl)
			if(cost>this.char_data[this.skill_data[skill_id].adc]) cls='red';
			res+=LNG['skill_c_'+this.skill_data[skill_id].adc]+': <b class="'+cls+'">'+cost+'</b>';
		}
		var kp_cost=(base_lvl+1)*2,cost=0;
		cost=this.skill_normal_cost(base_lvl,this.skill_data[skill_id].nc,skill_id);
		var need=['kills','war_points'];
		var cls='',cls2='';
		if(kp_cost>this.premium) cls='red';
		if(cost>this.char_data[need[this.skill_data[skill_id].nc]]) cls2='red';
		var ph='',nh='';
		if(GAME.skill_cost=='premium'){
			nh='initial_hide';
			ph='';
		}
		else{
			ph='initial_hide';
			nh='';
		}
		res+='<div class="skill_cost premium_cost '+ph+'">'+LNG.lab57+': <b class="'+cls+'">'+this.dots(kp_cost)+'</b> <img src="/gfx/kp.png" /><button class="newBtn2 option" data-option="skill_upgrade" data-skill="'+skill_id+'" data-cost="1">'+LNG.lab56+'</button></div><div class="skill_cost normal_cost '+nh+'">'+LNG.lab57+': <b class="'+cls2+'">'+this.dots(cost)+'</b> '+LNG['skill_cost'+this.skill_data[skill_id].nc]+' <button class="newBtn2 option" data-option="skill_upgrade" data-skill="'+skill_id+'" data-cost="2">'+LNG.lab56+'</button></div>';
	}
	res+='</div>';

	return res;
}
GAME.showTechTree = function(techs){
	techs=techs.sort(function(a,b){return a.req_lvl-b.req_lvl});
	var con='';
	for(var sy=1;sy<=12;sy++){
		for(var sx=1;sx<=7;sx++){
			con+='<div id="tree_slot_'+sy+'_'+sx+'" class="tree_slot"></div>';
		}
	}
	con+='<div class="clr"></div>';
	$('#jutsu_learn_window').html(con);
	var len=techs.length;
	var c1=techs[0].cat_id;
	var c2=techs[0].cat2_id;
	$('.tree_subcat').removeClass('active');
	$('.tree_subcat[data-c2="'+c2+'"]').addClass('active');
	var slots=false;
	switch(c1){
		case 1:
		case 2:
		case 3:
			slots=this.tree_sets.basic;
		break;
		case 4:
			if(c2==0) slots=this.tree_sets.basic_nin;
			else if(c2>=1&&c2<=5) slots=this.tree_sets.nin_element;
			else slots=this.tree_sets.nin_spec;
		break;
		case 5:
			slots=this.tree_sets.gen;
		break;
		case 6:
			slots=this.tree_sets.kin;
		break;
		case 8:
			if(c2!=26) slots=this.tree_sets.kg_normal;
			else slots=this.tree_sets.kg_rinne;
		break;
		case 9:
			if(c2>=11&&c2<=15) slots=this.tree_sets.kt_activators;
			else slots=this.tree_sets.kt;
		break;
		case 11:
			slots=this.tree_sets.sen;
		break;
		case 12:
			slots=this.tree_sets.fuin;
		break;
	}
	if(slots){
		for(var i=0;i<len;i++){
			var show_cost=false,is_disabled=false,can_dowgrade=false,can_learn=false;
			if(techs[i].level<techs[i].max_lvl){
				show_cost=true;
				can_learn=true;
			}
			if(!techs[i].tech_req){
				is_disabled=true;
				can_learn=false;
			}
			if(techs[i].level>1) can_dowgrade=true;
			$('#tree_slot_'+slots.techs[i]).html(this.showTech(techs[i].id,c1,c2,techs[i].level,show_cost,is_disabled,can_dowgrade,can_learn));
		}
		var len=slots.arrows.length;
		for(var i=0;i<len;i++){
			$('#tree_slot_'+slots.arrows[i].s).html('<div class="arrow '+slots.arrows[i].d+'"></div>');
		}
	}
	tech_bind();
	this.show_tech_dmg=true;
	option_bind();
}
GAME.selectJutsuCat = function(cat){
	$('.jutsu_main').removeClass('active');
	$('.jutsu_main[data-cat="'+cat+'"]').addClass('active');
	if(this.jutsu_categories[cat]){
		var jc=this.jutsu_categories[cat];
		var header='',c2=-1;
		if(jc.base){
			c2=0;
			header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="0" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab410+'</div>"><img src="/gfx/jutsu/'+cat+'.png" /> </div>';
		}
		if(jc.natures){
			if(this.char_data.cnature1&&this.char_data[this.ability2b(this.char_data.cnature1)]>0){
				c2=this.char_data.cnature1;
				header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="'+this.char_data.cnature1+'" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['ninjaspec'+this.char_data.cnature1]+'</div>"><img src="/gfx/elements/'+this.char_data.cnature1+'.png" /></div>';
			}
			if(this.char_data.cnature2&&this.char_data[this.ability2b(this.char_data.cnature2)]>0){
				c2=this.char_data.cnature2;
				header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="'+this.char_data.cnature2+'" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['ninjaspec'+this.char_data.cnature2]+'</div>"><img src="/gfx/elements/'+this.char_data.cnature2+'.png" /></div>';
			}
			if(this.char_data.cnature3&&this.char_data[this.ability2b(this.char_data.cnature3)]>0){
				c2=this.char_data.cnature3;
				header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="'+this.char_data.cnature3+'" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['ninjaspec'+this.char_data.cnature3]+'</div>"><img src="/gfx/elements/'+this.char_data.cnature3+'.png" /></div>';
			}
		}
		if(this.char_data.special2&&jc.nin_spec&&jc.nin_spec.indexOf(this.char_data.special2)!=-1){
			c2=this.char_data.special2;
			header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="'+this.char_data.special2+'" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['ninjaspec'+this.char_data.special2]+'</div>"><img src="/gfx/jutsu/4_'+this.char_data.special2+'.png" /></div>';
		}
		if(this.char_data.kgenkai&&jc.kg&&jc.kg.indexOf(this.char_data.kgenkai)!=-1){
			c2=this.char_data.kgenkai;
			cat=8;
			header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="'+this.char_data.kgenkai+'" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['kg'+this.char_data.kgenkai]+'</div>"><img src="/gfx/jutsu/8_'+this.char_data.kgenkai+'.png" /></div>';
		}
		if(this.char_data.kakkai_touta&&jc.kt&&jc.kt.indexOf(this.char_data.kakkai_touta)!=-1){
			c2=this.char_data.kakkai_touta;
			cat=9;
			header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="'+this.char_data.kakkai_touta+'" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['kt'+this.char_data.kakkai_touta]+'</div>"><img src="/gfx/jutsu/9_'+this.char_data.kakkai_touta+'.png" /></div>';
		}
		
		if(this.char_data.special3&&jc.kin_spec&&jc.kin_spec.indexOf(this.char_data.special3)!=-1){
			c2=this.char_data.special3;
			header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="'+this.char_data.special3+'" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['ninjaspec'+this.char_data.special3]+'</div>"><img src="/gfx/jutsu/6_'+this.char_data.special3+'.png" /></div>';
		}
		if(this.char_data.bc&&jc.pact){
			c2=this.char_data.bc;
			header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="'+this.char_data.bc+'" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['bpact'+this.char_data.bc]+'</div>"><img src="/gfx/pakty/'+this.char_data.bc+'.png" /></div>';
		}
		if(this.char_data.fuin&&jc.fuin){
			c2=0;
			header+='<div class="option tree_subcat" data-option="show_tech_tree" data-c1="'+cat+'" data-c2="0" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.crank_fuin+'</div>"><img src="/gfx/jutsu/12.png" /></div>';
		}
		$('#jutsu_subcats').html(header);
		if(c2>=0) this.emitOrder({a:18,type:1,c1:cat,c2:c2});
	}
	tooltip_bind();
	option_bind();
}
GAME.prepareTechPage = function(){
	var cats=['tai','ken','shuriken','nin','gen','kin','sen','fuin'];
	var len=cats.length;
	$('.jutsu_main').hide();
	for(var i=0;i<len;i++){
		if(cats[i]=='kin'&&this.char_data.special3==0) continue;
		if(this.char_data[cats[i]]>0) $('#jutsu_cat_'+cats[i]).show();
	}
	this.selectJutsuCat(1);
}
GAME.parseCraft = function(type,res){
	switch(type){
		case 3:
			GAME.showProgress(res);
		break;
		case 2: //rec view
			var data=res.rec;
			$('#no_recipe').hide();
			$('#show_recipe').show();
			var prod='<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+data.produce_item_id+'"><img src="/gfx/items/'+data.pitem.lvl+'/'+data.pitem.class+'/'+data.pitem.id+'.png" /></div>';
			$('#rec_product').html(prod);
			var req='',can_make=99;
			for(var n=1;n<=4;n++){
				if(data['need'+n+'_type']){
					var cls='';
					if(data['need'+n+'_am']>data['need'+n+'_has']){
						can_make=0;
						cls='red';
					}
					else if(can_make>0){
						can_make=Math.floor(data['need'+n+'_has']/data['need'+n+'_am']);
					}
					switch(data['need'+n+'_type']){
						case 1:
							req+='<div class="ekw_slot main_ekw_item" data-toggle="tooltip" data-original-title="?" data-item_id="'+data['need'+n+'_id']+'"><img src="/gfx/items/'+data['need'+n+'_data'].lvl+'/'+data['need'+n+'_data'].class+'/'+data['need'+n+'_data'].id+'.png" /><div class="'+cls+'">'+data['need'+n+'_has']+'/'+data['need'+n+'_am']+'</div></div>';
						break;
						case 2:
							req+='<div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt><b>'+data['need'+n+'_data'][this.lang_data['lokacje'][this.lang]]+'</b></div>"><img src="/gfx/items/mats/'+data['need'+n+'_id']+'.png" /><div class="'+cls+'">'+data['need'+n+'_has']+'/'+data['need'+n+'_am']+'</div></div>';
						break;
						case 3:
							req+='<div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt><b>'+LNG.achievement_level3+'</b></div>"><img src="/gfx/items/gold.png" /><div class="'+cls+'">'+data['need'+n+'_am']+'</div></div>';
						break;
						case 4:
							req+='<div class="ekw_slot" data-toggle="tooltip" data-original-title="'+this.getUsableItemDesc(data['need'+n+'_data'])+'"><img src="/gfx/items/cons/'+data['need'+n+'_id']+'.png" /><div class="'+cls+'">'+data['need'+n+'_has']+'/'+data['need'+n+'_am']+'</div></div>';
						break;
					}
				}
			}
			$('#craft_max').data('max',can_make);
			$('#do_craft').data('rec',data.id)
			$('#rec_req').html(req);
			main_ekw_item_bind();
			tooltip_bind();
			setmaxBind();
		break;
		case 1:
			//unlearned
			if(res.unlearned){
				var data=res.unlearned;
				var len=data.length,con='';
				for(var i=0;i<len;i++){
					con+='<div class="exchange_opt option" data-option="rec_learn" data-rec="'+data[i].id+'" data-toggle="tooltip" data-original-title="<div class=tt><b>'+data[i].data[this.lang_data['lokacje'][this.lang]]+'</b></div>"><img src="/gfx/items/recipe.png" /></div>';
				}
				$('#crafting_recipes').html(con);
			}
			var data=res.learned.sort(function(a,b){return b.data.rec_cat-a.data.rec_cat||b.recipe_id-a.recipe_id});
			//console.log(data);
			var len=data.length,con='',last_cat=0;
			for(var i=0;i<len;i++){
				if(data[i].data.rec_cat!=last_cat){
					last_cat=data[i].data.rec_cat;
					con+='<div class="main option" data-option="show_rec_cat" data-cat="'+data[i].data.rec_cat+'"><span>+</span> '+LNG['rec_cat'+data[i].data.rec_cat]+'</div>';
				}
				con+='<div class="initial_hide rec option reccat'+data[i].data.rec_cat+' recipes" data-option="show_recipe" data-rec="'+data[i].data.id+'">'+data[i].data[this.lang_data['lokacje'][this.lang]]+'</div>';
			}
			$('#crafting_learned').html(con);
			
			tooltip_bind();
			option_bind();
		break;
	}
}
GAME.buff_cost = function(buff,reborn,level){
	var res=[1,1]
	if(level>=5) res[0]=2;
	if(level>=8) res[0]=3;
	if(reborn>2 && buff<=10){
		res[1]=level+5;
		res[0]=0;
	}
	return res;
}
GAME.buff_calculate_points = function(reborn,level){
	if(reborn==2) return Math.floor(level/50)+1;
	else return Math.floor(level/30)+1;
}
GAME.buff_point_calc = function(level){
	switch(level){
		case 6: return level+1; break;
		case 7: return level+2; break;
		case 8: return level+3; break;
		case 9: return level+5; break;
		case 10: return level+7; break;
		default: return level; break;
	}
}
GAME.gatherNewReps = function(){
	var arr = [];
	$('.new_rep_ct1').each(function(index){
		arr.push($(this).data('rid'));
		$(this).fadeOut();
	});
	if(arr.length) GAME.emitOrder({a:11,type:3,read:arr});
}
GAME.raport_action = function(action,h1,h2,v1,v2){
	var temat='';
	switch(action){
		case 1: temat=LNG.rap_action1+' '+v1; break; //(Atak) Pojedynek PvP z
		case 2: temat=LNG.rap_action2+' '+v1; break; //(Obrona) Pojedynek PvP z
		case 3: var val=v2.split('#'); temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action3+' <b class="item'+h2+'">'+val[0]+'</b> x '+val[1]; break; //przekazuje Ci
		case 4: temat=LNG.rap_action2b+' '+v1; break; //Pojedynek fabularny z
		case 5: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action4+' '+this.dots(h2)+' <img src="/gfx/kp.png" align="absmiddle" /> '+LNG.rap_action5; break; //przebija Twoją stawkę na aukcji!
		case 6: 
			var nam='';
			switch(this.lang){
				case 'en':nam=v2; break;
				default: nam=v1; break;
			}
			temat=LNG.rap_action6+' <b class="item'+h1+'">'+nam+'</b> '+LNG.rap_action7+' '+this.dots(h2)+' <img src="/gfx/kp.png" align="absmiddle" />'; 
		break; //został pomyślnie sprzedany na aukcji! Otrzymujesz
		case 7: 
			var nam='';
			switch(this.lang){
				case 'en':nam=v2; break;
				default: nam=v1; break;
			}
			temat=LNG.rap_action8+' <b class="item'+h1+'">'+nam+'</b> x'+h2+'! '+LNG.rap_action9;
		break; //Wygrywasz aukcje o Przedmiot został dodany do Twojego ekwipunku
		case 8: 
			var nam='';
			switch(this.lang){
				case 'en':nam=v2; break;
				default: nam=v1; break;
			}
			temat=LNG.rap_action6+' <b class="item'+h1+'">'+nam+'</b> x'+h2+' '+LNG.rap_action10; 
		break; //nie został sprzedany, więc wraca do Twojego ekwipunku
		case 9: temat=LNG.rap_action21+' <b class="orange option" data-option="show_clan" data-klan_id="'+h1+'">'+v1+'</b> ('+v2+')'; break; //Zostałeś zaproszony do klanu
		case 10: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action22+' <b class="orange option" data-option="show_clan" data-klan_id="'+h2+'">'+v2+'</b>'; break; //wyprosił Cię z klanu
		case 11: temat=LNG.rap_action23+' '+this.dots(h1)+' j+'; break; //Twój klan wygrał wojnę! Otrzymujesz
		case 12: temat=LNG.rap_action24+' '; break; //Gratulacje! Twój stwór wygrał
		case 13: temat=LNG.rap_action24+' <b>'+h1+'</b> '+LNG.rap_action25+': '+this.dots(h2)+' '+LNG.rap_action26; break; //pkt. ewolucji
		case 14: temat=LNG.rap_action27+' <b>'+h1+'</b> '+LNG.rap_action28+' '+this.dots(h2)+' <img src="/gfx/kp.png" align="absmiddle" />'; break; //Gratulacje! Zostałeś wicemistrzem w
		case 15: temat=LNG.rap_action29; break; //Gratulacje! Wygrałeś
		case 16: temat=LNG.rap_action31+' '+this.dots(h1)+' <img src="/gfx/kp.png" align="absmiddle" /> '+LNG.rap_action32; break; //Otrzymano za list gończy
		case 17: temat=LNG.rap_action33; break; //Ktoś właśnie zgarnął nagrodę za list gończy, który wcześniej zaakceptowałeś!
		case 18: temat=LNG.rap_action34; break; //Wyprawa zakończona powodzeniem!
		case 19: temat=LNG.rap_action35; break; //Wyprawa zakończona niepowodzeniem!
		case 20: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action36+''; break; //oświadcza Ci się!
		case 21: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action37; break; //rozwodzi się z Tobą!
		case 22: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action38; break; //wystawia na Ciebie list gończy!
		case 23: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action3+' '+this.dots(h2)+' <img src="/gfx/kp.png" align="absmiddle" />!'; break; //przekazuje Ci
		case 24: temat=LNG.rap_action39+' 10 <img src="/gfx/kp.png" align="absmiddle" /> '+LNG.rap_action40+': '+v1+' !'; break; //za polecenie gracza
		case 25: temat=LNG.rap_action41+' '+this.dots(h1)+' <img src="/gfx/kp.png" align="absmiddle" />!'; break; //Przelew/Przekaz - transakcja zakończona: Otrzymujesz
		case 26: temat=LNG.rap_action42; break; //Otrzymujesz ostrzeżenie od administratora serwera. Łamanie regulaminu może doprowadzić do blokady konta!
		case 27: temat=LNG.rap_action43+' '+this.dots(h1)+' <img src="/gfx/kp.png" align="absmiddle" />!'; break; //Zwycięstwo w turnieju! Otrzymujesz
		case 28: temat=LNG.rap_action44+' '+v1; break; //(Atak) Pojedynek PvP na Arenie z
		case 29: temat=LNG.rap_action45+' '+v1; break; //(Obrona) Pojedynek PvP na Arenie z
		case 30: temat=LNG.rap_action46+': <b class="red">'+v1+'</b>'; break; //Otrzymujesz ostrzeżenie od administratora serwera. Łamanie regulaminu może doprowadzić do blokady! Powód warna:
		case 31: temat=LNG.rap_action47+': <b class="achi_'+h2+'">'+LNG['achievement'+h1]+'</b>!'; break; //Zdobyto osiągnięcie
		case 32: temat=LNG.rap_action39+' '+h1+' '+LNG.rap_action48+' <b>'+v1+'</b>!'; break; //za zaproszenie gracza
		case 33: temat=LNG.rap_action49a+' <a>'+v1+'</a> '+LNG.rap_action49+' <b class="bora">'+LNG['game_buff'+h2]+'</b> ('+v2+')'; break; //błogosławi Cię!
		case 34: temat=LNG.rap_action50; break; //Twoi słudzy znaleźli Pomniejszą Smoczą Kulę!
		case 35: temat=LNG.rap_action51+' 1 <img src="/gfx/kp.png" />'; break; //Ktoś właśnie zaprosił Cię na ucztę! Otrzymujesz
		case 36: temat=LNG.rap_action51+' +<b class="bora">'+h1+'</b> '+LNG.rap_action52+'!'; break; //Ktoś właśnie zaprosił Cię na ucztę! Otrzymujesz siły
		case 37: temat=LNG.rap_action51+' +<b class="bora">'+h1+'</b> '+LNG.rap_action53+'!'; break; //Ktoś właśnie zaprosił Cię na ucztę! Otrzymujesz szybkości
		case 38: temat=LNG.rap_action51+' +<b class="bora">'+h1+'</b> '+LNG.rap_action54+'!'; break; //Ktoś właśnie zaprosił Cię na ucztę! Otrzymujesz wytrzymałości
		case 39: temat=LNG.rap_action51+' +<b class="bora">'+h1+'</b> '+LNG.rap_action55+'!'; break; //Ktoś właśnie zaprosił Cię na ucztę! Otrzymujesz siły woli
		case 40: temat=LNG.rap_action51+' +<b class="bora">'+h1+'</b> '+LNG.rap_action56+'!'; break; //Ktoś właśnie zaprosił Cię na ucztę! Otrzymujesz energii Ki
		case 41: temat=LNG.rap_action51+' +<b class="bora">'+h1+'</b> '+LNG.rap_action57+'!'; break; //Ktoś właśnie zaprosił Cię na ucztę! Otrzymujesz Punktów Akcji
		case 42: temat=LNG.rap_action58+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action59+'!'; break; //Na Twoją planetę spadła potężna asteroida! Zginęło
		case 43: temat=LNG.rap_action60+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action59+'!'; break;
		case 44: temat=LNG.rap_action61+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action59+'!'; break;
		case 45: temat=LNG.rap_action62+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action59+'!'; break; //Na Twojej planecie wybuchła epidemia! Zginęło
		case 46: temat=LNG.rap_action63+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action59+'!'; break; //Spory polityczne wywołały wielką wojnę na Twojej planecie! Zginęło
		case 47: temat=LNG.rap_action64+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action59+'!'; break; //Próby atomowe na Twojej planecie wywołały kwaśne deszcze oraz burze atomowe! Zginęło
		case 48: temat=LNG.rap_action31+' '+LNG.rap_action65; break; //<span class="item6">Czerwone Senzu</span> za bycie top-killerem w wojnie!
		case 49: temat=LNG.rap_action31+' '+LNG.rap_action66; break; //<span class="item2">Żółte Senzu</span> za bycie top-killerem w wojnie!
		case 50: temat=LNG.rap_action31+' '+LNG.rap_action67; break; //<span class="item3">Fioletowe Senzu</span> za drugie miejsce w rankingu zabójstw w wojnie!
		case 51: temat=LNG.rap_action31+' '+LNG.rap_action68; break; //<span class="item4">Zielone Senzu</span> za trzecie miejsce w rankingu zabójstw w wojnie!
		case 52: temat=LNG.rap_action69; break; //Instancja nie została rozpoczęta. Zbyt mało graczy zgłosiło chęć uczestnictwa.
		case 53: temat=LNG.rap_action70; break; //Instancja nie została ukończona.  Nie otrzymujesz żadnej nagrody
		case 54: temat=LNG.rap_action31+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action73+' '+LNG.rap_action71; break; //sztuk materiału jako nagrodę za wykonanie instancji!
		case 55: temat=LNG.rap_action72; break; //Instancja została ukończona, lecz twoja aktywność okazała się zbyt niska. Nie otrzymujesz żadnej nagrody
		case 56: temat=LNG.rap_action31+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action74+' '+LNG.rap_action71; break; //Diabelskich Klejnotów jako nagrodę za wykonanie instancji!
		case 57: temat=LNG.rap_action31+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action75+' '+LNG.rap_action71; break; //Diabelskich Klejnotów jako nagrodę za wykonanie instancji!
		case 58: temat=LNG.rap_action31+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action76+' '+LNG.rap_action71; break; //Diabelskich Klejnotów jako nagrodę za wykonanie instancji!
		case 59: temat=LNG.rap_action77; break; 
		case 60: temat=LNG.rap_action78; break; 
		case 61: temat=LNG.rap_action79; break; 
		case 62: temat=LNG.rap_action31+' <b class="bora">'+this.dots(h1)+'</b> '+LNG.rap_action80+' '+LNG.rap_action71; break; //Diabelskich Klejnotów jako nagrodę za wykonanie instancji!
		case 63: temat=LNG.rap_action81; break; //Skok zakończona powodzeniem!
		case 64: temat=LNG.rap_action82; break; //Skok zakończona niepowodzeniem!
		case 65: temat=LNG.rap_action83+' '+v1; break; //(Atak) Pojedynek PvP na Arenie z
		case 66: temat=LNG.rap_action84+' '+v1; break; //(Obrona) Pojedynek PvP na Arenie z
		case 67: temat=LNG.rap_action85+' '+v1; break; //Podczas instancji znaleziono Skrzynię Skarbów!
		case 68: temat=LNG.rap_action86+' <b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b>!'; break; //Otrzymano zaproszenie do listy przyjaciół od
		case 69: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action87+'!'; break; //odrzcono
		case 70: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action88+'!'; break; //usunieto
		case 71: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action89+'!'; break; //akceptacja
		case 72: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action90+'!'; break; //anulowano
		case 73: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action91+'!'; break; //rozwiazuje klan
		case 74: temat=LNG.rap_action92+' '+v1; break; //(Atak) Bitwa planetarna
		case 75: temat=LNG.rap_action93+' '+v1; break; //(Obrona) Bitwa planetarna
		case 76: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action95+' <b>'+this.dots(h2)+'</b> <img src="/gfx/gold.png" />!'; break; //przesyla pieniadze
		case 77: temat=LNG.rap_action31+' <b>'+h1+'</b><img src="/gfx/kp.png" /> '+LNG.rap_action96+' <b>'+this.dots(h2)+'</b><img src="/gfx/gold.png" />'; break; //ktos kupuje kase
		case 78: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action97+'!'; break; //rozwiazuje klan
		case 79: temat='<b class="green option" data-option="show_player" data-char_id="'+h1+'">'+v1+'</b> '+LNG.rap_action98+' <b class="orange option" data-option="show_org" data-org_id="'+h2+'">'+v2+'</b>'; break; //wyprosił Cię z org
		case 80: temat=LNG.rap_action99+' <b class="orange option" data-option="show_org" data-org_id="'+h1+'">'+v1+'</b>'; break; //Zostałeś zaproszony do org
		case 100: temat=LNG.done98; break;
		case 101: temat=LNG.rap_action94+' '+v1; break; //Bitwa grupowa z
		default: temat=LNG.rap_action0; break;
	}
	return temat;
}
GAME.cached_data = function(){
	var pos=$('#char_buffs').offset();
	pos.left-=75;
	pos.top-=75;
	this.char_buffs_pos=pos;
}
GAME.item_level = function(lvl){
	if(lvl<15) return 5;
	else return Math.floor(lvl/15)*15;
}
GAME.camp_name = function (lvl){
	switch(lvl){
		case 1: 	return LNG.lab23; break;
		case 100:	return 'Mog'; break;
		case 200:	return 'Naya'; break;
		case 300:	return 'Fona'; break;
		case 400:	return 'Xar'; break;
		case 500:	return 'Drag'; break;
		case 600:	return 'Tana'; break;
		case 700:	return 'Oran'; break;
		case 800:	return 'Elba'; break;
		case 900:	return 'Hior'; break;
		case 1000:	return 'Nargol'; break;
		case 1100:	return 'Minas'; break;
		case 1200:	return 'Qual'; break;
		case 1300:	return 'Magnar'; break;
		case 1400:	return 'Buffor'; break;
		case 1500:	return 'Gord'; break;
		case 1600:	return 'Ard'; break;
		case 1700:	return 'Hex'; break;
		case 1800:	return 'Mag'; break;
		case 1900:	return 'Nag'; break;
		case 2000:	return 'Gorr'; break;
	}
}	
GAME.next_tren = function(lvl){
	var exp=0;
	lvl++;
	switch(lvl){
		case 1: exp=1; break;
		case 2: exp=10; break;
		case 3: exp=30; break;
		case 4: exp=80; break;
		case 5: exp=170; break;
		case 6: exp=250; break;
		case 7: exp=500; break;
		case 8: exp=1300; break;
		case 9: exp=3000; break;
		case 10: exp=5000; break;
		case 11: exp=6000; break;
		case 12: exp=7500; break;
		default: exp=999999; break;
	}
	return exp;
}
GAME.trainUpgrade = function(show,time){
	if(this.char_data){
		if(show){
			if(this.char_data.train_ucd<time){
				if(!this.trainupnotisend){
					this.pushNotification('<strong class="select_page" data-page="game_train">'+LNG.lab364+' !</strong>',10000);
					this.push_notification(LNG.lab364);
					this.trainupnotisend=true;
				}
				if(this.is_training){
					JQS.tup.show();
					$('#train_captcha').show();
					this.load_captcha('#train_captcha','train_captcha',1);
				}
				else JQS.tup.hide();
			}
			else JQS.tup.hide();
		}
		else{
			delete this.trainupnotisend;
			JQS.tup.hide();
		}
	}
}
GAME.prepareTrainForm = function(){
	/*
	this.charValuesBind(['train_lvl','train_exp','tpp']);
	$('#game_train_expn').text(this.dots(this.next_tren(this.char_data.train_lvl)));
	var eff=this.char_data.train_lvl*2;
	$('#tren_up_eff').text(eff);
	*/
	var time=this.getTime();
	var b1=LNG.lab14;
	var max=6;
	var lim=1;
	if(this.premiumBonus(1)){
		b1=LNG.lab13;
		max=12;
	}
	$('#game_train_bonus1').text(b1);
	var b2=LNG.lab14;
	if(this.premiumBonus(2)){
		b2=LNG.lab13;
		lim=2;
	}
	$('#game_train_bonus2').text(b2);
	
	var ava=true;
	if(this.timed>=lim) ava=false;
	if(ava){
		var times='';
		var labels=[''];
		switch(this.base_train_speed){
			case 3600:
				for(var t=1;t<=max;t++) labels.push(t+' '+LNG.lab11);
			break;
			case 1800:
				labels=['','30 '+LNG.lab12,'1 '+LNG.lab11,'1,5 '+LNG.lab11,'2 '+LNG.lab11,'2,5 '+LNG.lab11,'3 '+LNG.lab11,'3,5 '+LNG.lab11,'4 '+LNG.lab11,'4,5 '+LNG.lab11,'5 '+LNG.lab11,'5,5 '+LNG.lab11,'6 '+LNG.lab11];
			break;
			default:
				var tmp=parseInt(this.base_train_speed)/60;
				for(var t=1;t<=max;t++){
					var m=t*tmp;
					labels.push(m+' '+LNG.lab12);
				}
			break;
		}
		
		for(var t=1;t<=max;t++){
			var sel='';
			if(t==1){
				sel='selected';
				this.selected_train_duration=t;
			}
			times+='<option value="'+t+'" '+sel+'>'+labels[t]+'</option>';
		}
		$('#train_duration').html(times);
		var stats='';
		var sta=[8,9,10,11,1,2,3,4,5,6,7,13,12];
		var len=sta.length;
		for(var t=0;t<len;t++){
			var s=sta[t];
			if(this.char_data[this.ability2b(s)]<1) continue;
			var sel='';
			if(s==this.def_train_stat){
				sel='selected'; 
				this.selected_train_stat=s;
			}
			stats+='<option value="'+s+'" '+sel+'>'+LNG['abi_'+this.ability2b(s)]+'</option>';
		}
		if(this.train_captcha){
			$('#train_captcha').show();
			this.load_captcha('#train_captcha','train_captcha');
		}
		$('#train_stat').html(stats);
		$('#tren_notava').hide();
		$('#do_tren').show();
	}
	else{
		$('#tren_notava').show();
		$('#do_tren').hide();
		$('#train_captcha').hide();
	}
	this.calculateTrainResult(1);
}
GAME.calculateTrainResult = function(first=0){//
	var res=this.base_train_result;
	var stat=this.selected_train_stat;
	var dur=this.selected_train_duration;
	//
	if(this.ability_train_bonuses[stat]){
		var bon=this.getStat(this.ability_train_bonuses[stat]);
		if(bon) res*=1+bon/100;
	}
	res*=this.train_eff[dur];
	res=Math.round(res);
	if(first) JQS.trr.text(this.dots(res));
	else this.value_change_ani(PJS.trr,this.current_train_result,res,500);
	this.current_train_result=res;
}
GAME.parsePremiumData = function(res){
	this.premiumData=res.path;
	this.premiumDataN=document.createElement('canvas');
	this.premiumDataN.width = 200;
	this.premiumDataN.height = 60;
	this.premiumDataN.prerender = this.premiumDataN.getContext('2d');
	var ctx=this.premiumDataN.prerender;
	ctx.font = "20px 'Play'"
	ctx.strokeStyle = 'red';
	ctx.lineWidth = 2;
	ctx.textAlign = "center";
	ctx.strokeText(LNG.lab461, 100, 30);
	ctx.fillStyle = 'white';
	ctx.fillText(LNG.lab461, 100, 30);
}
GAME.premiumBonus = function(bon){
	var res=false;
	var len=this.char_tables.bonusy.length;
	for(var i=0;i<len;i++){
		if(this.char_tables.bonusy[i].bonus_id!=bon) continue;
		if(this.char_tables.bonusy[i].expires<this.getTime()) break;
		res=true;
	}
	return res;
}
GAME.parseShop = function(type,shop_data){
	this.shop_data=shop_data;
	$('#shop_currency').removeClass().addClass('currency'+shop_data.currency);
	$('#shop_header').text(LNG['currency'+shop_data.currency]);
	var cur=0;
	var cimg='';
	switch(shop_data.currency){
		case 1:
			cur=this.premium;
			cimg='<img src="/gfx/kp.png" />';
		break;
		case 2:
			cur=this.char_data.kk;
			cimg='<img src="/gfx/kk.png" />';
		break;
	}
	this.shop_cur=cur;
	$('#shop_currency_am').text(this.dots(cur));
	$('.shop_currency').removeClass().addClass('shop_currency').addClass('c'+shop_data.currency);

	var len=shop_data.char_upgrades.length,con='';
	for(var i=0;i<len;i++){
		var val=0,cls='',buy='',adv='';
		if(shop_data.char_upgrades[i].available_reborns && shop_data.char_upgrades[i].available_reborns.indexOf(this.char_data.reborn)==-1) continue;
		if(shop_data.char_upgrades[i].reb_values) val=shop_data.char_upgrades[i].reb_values[this.char_data.reborn];
		else val=shop_data.char_upgrades[i].value;
		if(cur<shop_data.char_upgrades[i].cost) cls='red';
		else{ 
			buy='<button class="option newBtn" data-option="shop_buy_upgrade" data-id="'+i+'">'+LNG.lab67+'</button> ';
			if(!shop_data.char_upgrades[i].only_one) buy+='x <button class="newBtn shop_up" data-dir="1" data-id="'+i+'">-</button><div class="game_input vsmall"><input type="text" id="shop_chup_am_'+i+'" class="shop_am" data-id="'+i+'" value="1" /></div><button class="newBtn shop_up" data-dir="2" data-id="'+i+'">+</button>'
		}
		if(shop_data.char_upgrades[i].percent_value) adv='+ <b id="shop_chup_aval_'+i+'" class="orange" data-base="'+shop_data.char_upgrades[i].percent_value+'">'+shop_data.char_upgrades[i].percent_value+'</b>%';
		con+='<tr><td><i class="upgrade_icon '+shop_data.char_upgrades[i].field+'"></i>+ <b id="shop_chup_val_'+i+'" data-base="'+val+'" class="orange">'+val+'</b> '+adv+' '+LNG['shop_chup_'+shop_data.char_upgrades[i].field]+' </td><td><span id="shop_chup_cost_'+i+'" class="'+cls+'">'+this.dots(shop_data.char_upgrades[i].cost)+'</span> '+cimg+'</td><td>'+buy+'</td></tr>';
	}
	$('#shop_char_up').html(con);
	
	$('.shop_am').off('input').on('input',function(){
		var id=$(this).data('id');
		var val=parseInt($(this).val());
		GAME.shop_val_handler(1,id,val);
	});
	$('.shop_up').off('click').on('click',function(){
		var id=$(this).data('id');
		var val=parseInt($('#shop_chup_am_'+id).val());
		switch($(this).data('dir')){
			case 1:
				val-=1;
				if(val<1) val=1;
			break;
			case 2:
				val+=1;
			break;
		}
		$('#shop_chup_am_'+id).val(val);
		GAME.shop_val_handler(1,id,val);
	});
	//items
	var time=this.getTime();
	var con='';
	var len=shop_data.items.length;
	for(var i=0;i<len;i++){
		if(shop_data.items[i].need_reb>this.char_data.reborn) continue;
		if(shop_data.items[i].time_limited&&(time<shop_data.items[i].time_limited.start||shop_data.items[i].time_limited.end<time)) continue;
		if(shop_data.items[i].servers&&shop_data.items[i].servers.indexOf(this.server)==-1) continue;
		con+='<div class="kp_item option" data-option="shop_item_buy" data-id="'+i+'"><b>'+shop_data.items[i].amount+'</b><img data-toggle="tooltip" data-original-title="'+this.getUsableItemDesc(shop_data.items[i].data)+'" src="/gfx/items/cons/'+shop_data.items[i].id+'.png" /><span>'+shop_data.items[i].cost+' '+cimg+'</span></div>';
	}
	$('#shop_items').html(con);
	//bonusy
	//var order=[1,14,16,2,3,4,12,17,5,6,7,8,9,13,10,18,11,15,19];
	var bons={},len=this.char_tables.bonusy.length;
	for(var i=0;i<len;i++) bons[this.char_tables.bonusy[i].bonus_id]=this.char_tables.bonusy[i].expires;
	var con='';
	var time=this.getTime();
	for(var i=1;i<=shop_data.bonuses;i++){
		var b=i;
		var lasts='';
		if(bons[b]>time) lasts='<div data-toggle="tooltip" data-original-title="<div class=tt>'+this.convertTime(bons[b])+'</div>"><b>'+LNG.lab164+'</b><br />'+this.showTimer(bons[b]-time)+'</div>';
		con+='<tr><td data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['premium_bond'+b]+'</div>"><img src="/gfx/bonusy/'+i+'.png" /><span class="orange">'+LNG['premium_bon'+b]+'</span></div></td><td><div class="active_bon">'+lasts+'</div></td><td><span id="shop_bon_cost_'+b+'">5</span> '+cimg+'</td><td>'+LNG.lab159+' <div class="select_input"><select id="shop_bon_'+b+'" data-bon="'+b+'" class="shop_bon_inp"><option value="1">'+LNG.lab160+'</option><option value="2">'+LNG.lab161+'</option><option value="3" selected>'+LNG.lab162+'</option><option value="4">'+LNG.lab163+'</option></select></div><button class="newBtn option" data-option="shop_bon_buy" data-bon="'+b+'">'+LNG.lab67+'</button></td></tr>';
	}
	var reduced_cost=Math.floor(5*shop_data.bonuses*0.75);
	con+='<tr><td colspan="2"><b class="orange">'+LNG.lab173+'</b><br />'+LNG.lab174+'</td><td><span id="shop_bon_cost_999">'+reduced_cost+'</span> '+cimg+'</td><td>'+LNG.lab159+' <div class="select_input"><select id="shop_bon_999" data-bon="999" class="shop_bon_inp"><option value="1">'+LNG.lab160+'</option><option value="2">'+LNG.lab161+'</option><option value="3" selected>'+LNG.lab162+'</option><option value="4">'+LNG.lab163+'</option></select></div><button class="newBtn option" data-option="shop_bon_buy" data-bon="999">'+LNG.lab67+'</button></td></tr>';
	$('#shop_char_bon').html(con);
	$('.shop_bon_inp').off('change').on('change',function(){
		var b=parseInt($(this).data('bon'));
		var val=parseInt($(this).val()),cost=0;
		if(b==999){
			var base_bons=GAME.shop_data.bonuses;
			switch(val){
				case 1: cost=Math.floor(base_bons*1*0.75); break;
				case 2: cost=Math.floor(base_bons*2*0.75); break;
				case 4: cost=Math.floor(base_bons*10*0.75); break;
				default: cost=Math.floor(base_bons*5*0.75); break;
			}
		}
		else{
			switch(val){
				case 1: cost=1; break;
				case 2: cost=2; break;
				case 3: cost=5; break;
				case 4: cost=10; break
			}
		}
		$('#shop_bon_cost_'+b).text(cost);
	});
	main_ekw_item_bind();
	tooltip_bind();
	option_bind();
}
GAME.shop_val_handler = function(type,id,val){
	switch(type){
		case 1:
			var cost=GAME.shop_data.char_upgrades[id].cost*val;
			var cls='';
			if(GAME.shop_cur<cost) cls='red';
			$('#shop_chup_cost_'+id).text(GAME.dots(cost)).removeClass('red').addClass(cls);
			var vc=$('#shop_chup_val_'+id);
			var bv=vc.data('base');
			vc.text(GAME.dots(bv*val));
			var avc=$('#shop_chup_aval_'+id);
			if(avc.length){
				var bv=avc.data('base');
				avc.text(GAME.dots(bv*val));
			}
		break;
	}
}
GAME.value_change_ani = function(container,old_value,new_value,speed,callback=function(){}){
	if(container){
		if(this.animations_off) container.innerText=this.dots(new_value);
		else{
			$({someValue: old_value}).animate({someValue: new_value}, {
				duration: speed,
				easing:'swing', 
				step: function() { 
					container.innerText=GAME.dots(Math.round(this.someValue));
				},
				complete:function(){
					container.innerText=GAME.dots(Math.round(this.someValue));
					callback(container);
				}
			});
		}
	}
}
GAME.miningHandler = function(type,data){
	switch(type){
		case 1:
			var pr=0;
			data.bar=$('#mining_bar_'+data.mine_id);
			data.mbar=$('#mining_mbar_'+data.mine_id);
			this.mining=data;
			data.cd=300;
			var bon=this.getStat(136);
			if(bon>0) data.cd-=Math.floor(data.cd*(bon/100));
			var left=Math.floor(data.expires/1000)-this.getTime();
			$('#mining_btn_'+data.mine_id).prop('disabled', true);
			$('#mining_pr_'+data.mine_id).html(this.showTimer(left));
			data.bar.css({'width':pr+'%'});

			data.mbar.slideDown();
			data.bar.animate({'width':'100%'},data.expires-this.getmTime(),'linear',function(){
				if(GAME.mining){
					GAME.mining.mbar.slideUp();
					$('#mining_res_'+GAME.mining.mine_id).html(LNG.lab134+' '+GAME.showTimer(data.cd,'data-special="8" data-mid="'+GAME.mining.mine_id+'"'));
					if(GAME.map_mines&&GAME.map_mines.coords[GAME.mining.x+'_'+GAME.mining.y]){
						var arr=GAME.map_mines.coords[GAME.mining.x+'_'+GAME.mining.y];
						var len=arr.length;
						for(var i=0;i<len;i++){
							if(arr[i][0]==GAME.mining.mine_id) arr[i][2]=GAME.getTime()+data.cd;
						}
					}
					GAME.emitOrder({a:22,type:8},true);
				}
			});
		break;
	}
}
GAME.mobRank = function(rank){
	switch(rank){
		case 1: return LNG.mob_rank1;
		case 2: return LNG.mob_rank2;
		case 3: return LNG.mob_rank3;
		case 4: return LNG.mob_rank4;
		case 5: return LNG.mob_rank5;
		default: return '';
	}
}
GAME.convertTime = function(time){
	var now=moment(this.getmTime());
	var data;
	var d1=parseInt(now.format('DD'));
	var m1=parseInt(now.format('M'));
	var y1=parseInt(now.format('YYYY'));
	var check=moment(time*1000);
	var d2=parseInt(check.format('DD'));
	var m2=parseInt(check.format('M'));
	var y2=parseInt(check.format('YYYY'));
	var f=false;
	if(d1==d2&&m1==m2&&y1==y2){
		f=true;
		data=LNG.lab6+' '+check.format('HH:mm');
	}
	if(d1+1==d2&&m1==m2&&y1==y2){
		f=true;
		data=LNG.lab7+' '+check.format('HH:mm');
	}
	if(d1+2==d2&&m1==m2&&y1==y2){
		f=true;
		data=LNG.lab8+' '+check.format('HH:mm');
	}
	if(d1-1==d2&&m1==m2&&y1==y2){
		f=true;
		data=LNG.lab9+' '+check.format('HH:mm');
	}
	if(!f) data=check.format('HH:mm DD.MM.YYYY');
	return data;
}
GAME.showChatChannel = function(opening=0){
	var con='';
	var ismod=this.hasModLaw();
	if(this.chat_data[this.chat_channel].messages&&this.chat_data[this.chat_channel].messages.length){
		var chd=this.chat_data[this.chat_channel].messages;
		var len=chd.length;
		for(var i=0;i<len;i++){
			if(!chd[i]) continue;
			var modop='',talker='',opt='';
			if(chd[i].talker) talker=' <b class="red"> [MOD] </b>';
			if(chd[i].swiat==this.server) opt='option';
			if(ismod) modop='<div class="addop"><button class="option chat_icon clear" data-option="delete_entry" data-entry="'+chd[i].id+'" data-channel="'+this.chat_channel+'"></button><button class="option chat_icon mute" data-option="mute_entry_player" data-entry="'+chd[i].id+'"></button></div>';
			con+='<div id="chat_entry_'+chd[i].id+'" class="chat_row"><div class="avatar_side"><img class="avatar" src="'+chd[i].avatar+'" alt="avatar" /><span>'+LNG['server'+chd[i].swiat]+'</span></div><div class="right_side"><div class="entry_header"><div class="autor player_rank'+chd[i].ranga+' '+opt+'" data-option="show_player" data-char_id="'+chd[i].autor_id+'">'+chd[i].autor+'</div>'+talker+'<div class="date">'+this.convertTime(chd[i].time)+'</div><div class="clr"></div></div>'+this.parseEmots(chd[i].mess)+'</div>'+modop+'<div class="clr"></div></div>';
		}
	}
	else con=LNG.lab3;
	JQS.ctm.html(con)
	option_bind();
	if(opening||GAME.chat_scrolled) JQS.ctm.animate({ scrollTop: JQS.ctm[0].scrollHeight}, 300);
}
GAME.parseContent = function(str){
	return str.replaceAll(/\n/g, '<br />').replaceAll(/\\/g,'');
}
GAME.loadMapJson = function(callback){
	if(this.map_json_loaded) return callback(true);
	else{
		$.getJSON('/json/graphic.json', function(json){
			GAME.map_titles=json;
			GAME.map_json_loaded=1;
			callback(true);
		});
	}
}
GAME.parseDaily = function(res){
	var data=res.daily_data;
	var len=data.length;
	var con='';
	for(var i=0;i<len;i++){
		var day=i+1,am='',cls='',name='',ncls='';
		if(data[i].type=='premium_bon'){
			am=data[i].duration/3600+'h';
			name=LNG.lab178+' <b class=orange>'+LNG['premium_bon'+data[i].bon]+'</b>';
		}
		else{
			if(data[i].amount>100) cls=' class="sm"';
			am='x'+data[i].amount;
			if(data[i].type=='char_attr') name='<span class=green>'+data[i].amount+'</span>x <b class=orange>'+LNG['shop_chup_'+data[i].atr]+'</b>';
			else if(data[i].type=='best_abi'){
				name='+<span class=green>'+data[i].amount+'</span> '+LNG.lab429;
				am='';
			}
			else name=LNG.item_desc1;
			if(data[i].type=='item'){
				data[i].gfx='/gfx/items/cons/'+data[i].item_id+'.png';
				name=this.getUsableItemDesc(data[i].data);
			}
		}
		if(i<this.char_data.online_received){
			ncls='taken';
			name+='<br /><span class=red>'+LNG.lab179+'</span>';
		}
		if(i==this.char_data.online_received){
			ncls='current option';
			name+='<br /><span class=green>'+LNG.lab180+'</span>';
		}
		con+='<div class="'+ncls+'" data-option="take_daily" data-toggle="tooltip" data-original-title="<div class=item_desc>'+name+'</div>"><img src="'+data[i].gfx+'" /><b'+cls+'>'+am+'</b><span>'+LNG.lab177+' '+day+'</span></div>';
	}
	$('#daily_con').html(con);
	$('#daily_reward').fadeIn();
	tooltip_bind();
	option_bind();
}
GAME.png_color = function(plvl,mlvl){
	var gif;
	if(mlvl>plvl) gif=4;
	if(mlvl-5>plvl) gif=5;
	if(mlvl==plvl) gif=3;
	if(mlvl<plvl) gif=2;
	if(mlvl+5<plvl) gif=1;
	return gif;
}
GAME.load_res_start = function(){
	this.is_loading=true;
	$('#res_loader').show();
}
GAME.load_res_stop = function(){
	this.is_loading=false;
	$('#res_loader').hide();
}
GAME.prepareImage = function(img){
	img.ready=true;
	if(img.sprite){
		var rcnt=img.data.length;
		var last_x=0;
		for(var j=0;j<rcnt;j++){
			if(!img.data[j].af) img.data[j].af=1;
			var id=j+1;
			var name=img.res_id;
			if(img.data[j].s) name+=img.data[j].s;
			else name+=id;
			this.map_resources[name]={};
			var width=parseInt(img.data[j].w);
			var height=width*parseInt(img.data[j].af);
			this.map_resources[name].add_effect=img.add_effect;
			this.map_resources[name].width=width;
			this.map_resources[name].height=height;
			this.map_resources[name].mx=0;
			this.map_resources[name].my=0;
			this.map_resources[name].bg_field=img.data[j].bg_field;
			if(img.data[j].hasOwnProperty('mx')) this.map_resources[name].mx=parseInt(img.data[j].mx);
			if(img.data[j].hasOwnProperty('my')) this.map_resources[name].my=parseInt(img.data[j].my);
			if(img.data[j].af>1){
				this.map_resources[name].animation=true;
				this.map_resources[name].animation_frames=img.data[j].af;
				this.map_resources[name].animation_speed=img.data[j].as;
				this.map.frame_control[this.map_resources[name].animation_speed+'_'+this.map_resources[name].animation_frames]={animation_current_frames:0,animation_next_time:0};
			}
			else this.map_resources[name].animation=false;
			this.map_resources[name].precanvas = document.createElement('canvas');
			this.map_resources[name].precanvas.width = width;
			this.map_resources[name].precanvas.height = height;
			this.map_resources[name].prerender = this.map_resources[name].precanvas.getContext('2d');
			this.map_resources[name].prerender.drawImage(img,last_x,0,width,height,0,0,width,height);
			delete this.map_resources[name].prerender;
			last_x+=width;
		}
	}
	else{
		img.precanvas = document.createElement('canvas');
		img.precanvas.width = img.width;
		img.precanvas.height = img.height;
		img.prerender = img.precanvas.getContext('2d');
		var last_x=0;
		img.prerender.drawImage(img,last_x,0,img.width,img.height,0,0,img.width,img.height);
		delete img.prerenderr;
	}
}
GAME.loadingProcess = function(){
	this.res_loaded++;
	JQS.ltt.text(this.res_loaded+' / '+this.res_initiated);
	var pr=Math.floor(this.res_loaded/this.res_initiated*100);
	JQS.ltb.css({'width':pr+'%'});
	if(this.res_loaded>=this.res_initiated){
		this.load_res_stop();
		return true;
	}
	return false;
}
GAME.processAwaitingResources = function(callback){
	var cnt=this.awaiting_resources.length;
	this.res_initiated=cnt;
	if(this.res_initiated==0) return callback(true);
	this.load_res_start();
	this.res_loaded=0;
	var parent=this;
	JQS.ltt.text('0 / '+this.res_initiated);
	JQS.ltb.css({'width':'0%'});
	
	for(var i=0;i<cnt;i++){
		switch(this.awaiting_resources[i].type){
			default:
				this.map_resources[this.awaiting_resources[i].res_id]=new Image();
				this.map_resources[this.awaiting_resources[i].res_id].ready=false;
				this.map_resources[this.awaiting_resources[i].res_id].src = this.awaiting_resources[i].src+'?v='+locals.version; 
				this.map_resources[this.awaiting_resources[i].res_id].sprite = this.awaiting_resources[i].sprite; 
				this.map_resources[this.awaiting_resources[i].res_id].res_id = this.awaiting_resources[i].res_id; 
				this.map_resources[this.awaiting_resources[i].res_id].add_effect = this.awaiting_resources[i].adef;
				this.map_resources[this.awaiting_resources[i].res_id].data = this.awaiting_resources[i].data; 
				this.map_resources[this.awaiting_resources[i].res_id].onload = function(){
					parent.prepareImage(this);
					if(parent.loadingProcess()){
						parent.awaiting_resources=[];
						return callback();
					}
				};
			break;
		}
	}
}
GAME.pushNewResourcefromMapTitle = function(res_id,type,json){
	if(!this.loaded_resources[res_id]&&json){
		this.loaded_resources[res_id]=true;
		this.awaiting_resources.push({res_id:res_id,src:this.gfx_path+json.src,type:type,sprite:json.sprite,data:json.data,adef:json.additional_effect});
	}
}
GAME.prepareMap = function(){
	if(!this.maploaded){
		this.load_start();
		this.loadMapJson(function(){
			GAME.emitOrder({a:3,vo:GAME.map_options.vo},1);
		});
	}
}
GAME.map_cam_center_big = function(x,y){
	this.map.cam_x=Math.floor(x-this.map.cX/2+20);
	this.map.cam_y=Math.floor(y-this.map.cY/2+20);
	this.map_cam_calc();
}
GAME.map_cam_center = function(x,y){
	this.map.cam_x=(x-1-Math.floor(this.map.rX/2))*this.map.fX;
	this.map.cam_y=(y-1-Math.floor(this.map.rY/2))*this.map.fY;
	this.map_cam_calc();
}
GAME.map_cam_calc = function(){
	if(this.map.cam_x+this.map.cX>this.map.smax_x) this.map.cam_x=this.map.smax_x-this.map.cX;
	if(this.map.cam_y+this.map.cY>this.map.smax_y) this.map.cam_y=this.map.smax_y-this.map.cY;
	if(this.map.cam_x<0) this.map.cam_x=0;
	if(this.map.cam_y<0) this.map.cam_y=0;
	//if(this.map.smax_x<this.map.cX) this.map.cam_x-=(this.map.cX-this.map.smax_x)/2;
	//if(this.map.smax_y<this.map.cY) this.map.cam_y-=(this.map.cY-this.map.smax_y)/2;
	this.map.scam_x=Math.floor(this.map.cam_x/this.map.fX)+1;
	this.map.scam_y=Math.floor(this.map.cam_y/this.map.fY)+1;
	if(this.map.scam_x<1) this.map.scam_x=1;
	if(this.map.scam_y<1) this.map.scam_y=1;
	if(this.map.scam_x-this.map.rX>this.map.max_x) this.map.scam_x=this.map.max_x-this.map.rX;
	if(this.map.scam_y-this.map.rY>this.map.max_y) this.map.scam_y=this.map.max_y-this.map.rY;
}
GAME.ask_confirm = function(id,order){
	this.confirm_order=order;
	var kom=LNG['confirm'+id]+'<br /><button class="pull-left option btn_small_gold" data-option="confirm_cancel">'+LNG.lab78+'</div> <button class="pull-right option btn_small_gold" data-option="confirm_accept" data-cid="'+id+'">'+LNG.lab172+'</div>';
	GAME.komunikat(kom);
	option_bind();
}
GAME.map_move = function(dir){
	if(this.map_players[this.char_id]&&this.mapcell){
		var ox=nx=this.char_data.x;
		var oy=ny=this.char_data.y;
		switch(dir){
			case 1: oy++; break;
			case 2: oy--; break;
			case 3: ox++; oy++; break;
			case 4: ox--; oy++; break;
			case 5: ox++; oy--; break;
			case 6: ox--; oy--; break;
			case 7: ox++; break;
			case 8: ox--; break;
		}
		this.map_players[this.char_id].dir=dir;
		if(!this.mapcell[ox+'_'+oy]||this.mapcell[ox+'_'+oy].m==0){
			JQS.mko.html('<div class="fight_reward floating">'+LNG.error5+'</div>');
			this.floatingBind();
		}
		else{
			delete this.mining;
			this.emitOrder({a:4,dir:dir,vo:GAME.map_options.vo});
		}
		hide_tooltips();
	}
}
GAME.map_cam_move = function(dir){
	var x=0,y=0;
	if(this.map.animate){
		switch(dir){
			case 1: 
				x=0; 
				y=-40;
			break;
			case 2: 
				x=0; 
				y=40;
			break;
			case 3: 
				x=-40; 
				y=0;
			break;
			case 4: 
				x=40; 
				y=0;
			break;
		}
		this.map.cam_x+=x;
		this.map.cam_y+=y;
		this.map_cam_calc();
	}
}
GAME.questAction = function(){
	clearTimeout(this.quest_action_tim);
	var parent=this;
	if(this.quest_action){
		this.quest_action_count++;
		if(this.quest_action_count>this.quest_action_max){
			this.quest_action_count=this.quest_action_max;
		}
		else this.quest_action_tmp++;
		$('#quest_bar_val_span').text('+ '+this.quest_action_tmp);
		this.quest_action_tim=setTimeout(function(){
			GAME.emitOrder({a:22,type:7,id:parent.quest_action_qid,cnt:parent.quest_action_tmp});
			parent.quest_action_tmp=0;
			$('#quest_bar_val_span').text('');
		}, 300);
	}
}
GAME.preparePlayer = function(player){
	var res=player;
	res.state={order:0};
	if(this.map_titles&&this.map_titles.characters[res.style]){
		this.pushNewResourcefromMapTitle('body_'+res.style,1,this.map_titles.characters[res.style].body);
		/*
		var hjson=this.map_titles.characters[res.style].hairs[res.hair];
		if(!hjson){
			res.hair=0;
			this.map_titles.characters[res.style].hairs[res.hair];
		}
		this.pushNewResourcefromMapTitle('hair_'+res.style+'_'+res.hair,1,hjson);
		if(hjson&&hjson.use_cloth){
			res.old_cloth=res.cloth;
			res.cloth=hjson.use_cloth;
		}
		*/
		this.pushNewResourcefromMapTitle('cloth_'+res.cloth,1,this.map_titles.cloths[res.cloth]);
	}
	else console.log('wrong player data',res);
	res.precanvas = document.createElement('canvas');
	res.precanvas.width = 100;
	res.precanvas.height = 40;
	res.prerender = res.precanvas.getContext('2d');
	var ctx=res.prerender;
	ctx.font = "15px 'Roboto'"
	ctx.strokeStyle = 'rgba(0,0,0,0.6)';
	ctx.lineWidth = 2;
	ctx.textAlign = "center";
	res.vip_x=Math.floor(ctx.measureText(res.name).width/2);
	ctx.strokeText(res.name, 50, 15);
	ctx.fillStyle = this.ranga_color(player.ranga);//'white';
	ctx.fillText(res.name, 50, 15);
	if(player.title&&player.title[this.lang]){
		res.precanvas2 = document.createElement('canvas');
		res.precanvas2.width = 200;
		res.precanvas2.height = 20;
		res.prerender2 = res.precanvas2.getContext('2d');
		var ctx=res.prerender2;
		ctx.font = "11px 'Roboto'"
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1;
		ctx.textAlign = "center";
		ctx.strokeText('<'+player.title[this.lang].toUpperCase()+'>', 100, 15);
		ctx.fillStyle = player.title.color;
		ctx.fillText('<'+player.title[this.lang].toUpperCase()+'>', 100, 15);
	}
	return res;
}
GAME.ranga_color = function(id){
	switch(id){
		case 1: return '#85A3FF';
		case 2: return '#FF4000';
		case 3: return '#6633FF';
		case 4: return '#CC33FF';
		case 5: return '#00FFBF';
		case 6: return '#FFFF00';
		case 7: return '#C29100';
		case 8: return '#3D3D3D';
		case 9: return '#ff3300';
		case 100: return 'red';
		default: return '#1C7000';
	}
}
GAME.prepareMapPlayers = function(players){
	var res={};
	var len=players.length;
	for(var i=0;i<len;i++){
		res[players[i].id]=players[i];
		res[players[i].id]=this.preparePlayer(players[i]);
	}
	return res;
}
GAME.parseInstance = function(){
	if(this.instance_data){
		var len=this.instance_data.players.length;
		$('#instance_head').show();
		$('#instance_timer').html(this.showTimer(this.instance_data.timer-this.getTime()));
		var con='';
		for(var i=0;i<len;i++){
			con+='<div class="iplayer"><b>'+this.instance_data.players[i].name+'</b> [<span id="inst_playerpoints_'+this.instance_data.players[i].char_id+'_'+this.instance_data.players[i].server+'" data-value="'+this.instance_data.players[i].points+'">'+this.dots(this.instance_data.players[i].points)+'</span>]</div>';
		}
		$('#inst_players').html(con);
	}
}
GAME.checkEffects = function(){
	if(this.fog_initial>0){
		for(var f=0;f<this.fog_initial;f++){
			var sx=this.getRandomInt(2,this.map.max_x-1),sy=this.getRandomInt(2,this.map.max_y-1);
			var ex=-1,ey=sy,start=this.getmTime();
			var speed=this.fog_initial_speed+this.getRandomInt(0,1000)*(sx-ex);
			this.map.effect_buffer.push({type:'weather_fog'+this.getRandomInt(1,3),sx:sx*this.map.fX,sy:sy*this.map.fY,ex:ex*this.map.fX,ey:ey*this.map.fY,p:0,start:start,speed:speed});
		}
	}
}
GAME.loadMap = function(loc,map,players,tps,castles=[],private_data={},quests={},mines={},instance_data={},wanteds={},balls={},bosses={}){
	this.current_loc=loc;
	this.mapcell=map;
	this.map_players=this.prepareMapPlayers(players);
	this.map_private=false;
	this.map_castles=false;
	this.map_mines=false;
	this.mobs_prepared=false;
	this.md={};
	this.mf={};
	this.map_quests=quests;
	this.map_wanteds=wanteds;
	this.map_balls=balls;
	this.map_bosses=bosses;
	$('#instance_head').hide();
	if(instance_data&&instance_data.timer){
		this.instance_data=instance_data;
		this.parseInstance();
	}
	if(mines) this.map_mines=mines;
	if(castles.length){
		var len=castles.length;
		this.map_castles={};
		for(var i=0;i<len;i++){
			this.map_castles[castles[i].x+'_'+castles[i].y]=castles[i];
		}
		if(this.map_titles) this.pushNewResourcefromMapTitle('castle_',1,this.map_titles.castles);
	}
	this.pushNewResourcefromMapTitle('weather_',1,this.map_titles.weather);
	var parent=this;
	this.map.effect_buffer=[];
	this.map.max_x=this.current_loc.x_max;
	this.map.max_y=this.current_loc.y_max;
	this.map.smax_x=this.current_loc.x_max*this.map.fX;
	this.map.smax_y=this.current_loc.y_max*this.map.fY;
	this.minimap.smax_x=this.current_loc.x_max*this.minimap.w;
	this.minimap.smax_y=this.current_loc.y_max*this.minimap.h;
	this.map_cam_center(this.char_data.x,this.char_data.y);
	var bons=this.parseLocBons(this.current_loc);
	this.wind_frequency=this.current_loc.weather_wind_freq;
	this.fog_frequency=this.current_loc.weather_fog_freq;
	this.fog_initial=this.current_loc.weather_fog_initial;
	this.fog_speed=this.current_loc.weather_fog_speed;
	this.rain_frequency=this.current_loc.weather_rain_freq;
	this.earthquake_frequency=this.current_loc.weather_eq_freq;
	this.cloud_frequency=this.current_loc.weather_cloud_freq;
	this.cloud_speed=this.current_loc.weather_cloud_speed;
	this.snow_frequency=this.current_loc.weather_snow_freq;
	this.storm_frequency=this.current_loc.weather_sandstorm_freq;
	if(this.current_loc.id==2){
		switch(this.char_data.village_id){
			case 1: //dzwiek
				this.earthquake_frequency=1;
				this.custom_terrain=109;
				this.wind_frequency=10;
			break;
			case 2: //deszcz
				this.custom_terrain=103;
				this.rain_frequency=900;
				this.wind_frequency=10;
			break;
			case 3: //trawa
				this.wind_frequency=20;
				this.storm_frequency=5;
			break;
			case 4: //wodospad
				this.wind_frequency=30;
				this.fog_initial=5;
				this.fog_frequency=10;
				this.fog_speed=1000;
			break;
			case 5: //chmury
				this.wind_frequency=60;
				this.fog_initial=5;
				this.fog_frequency=50;
				this.fog_speed=2000;
				this.custom_terrain=106;
				this.cloud_frequency=50;
				this.cloud_speed=500;
			break;
			case 6: //piasek
				this.custom_terrain=104;
				this.wind_frequency=20;
				this.storm_frequency=10;
			break;
			case 7: //skala
				this.custom_terrain=105;
				this.earthquake_frequency=1;
				this.wind_frequency=10;
			break;
			case 8: //mgla
				this.wind_frequency=60;
				this.fog_initial=50;
				this.fog_frequency=100;
				this.fog_speed=500;
				this.custom_terrain=102;
			break;
			case 10: //snieg
				this.snow_frequency=100;
				this.custom_terrain=108;
			break;
		}
	}
	else this.custom_terrain=0;
	$('#loc_bons').html(bons);
	tooltip_bind();
	$('#map_name').text(this.current_loc[this.lang_data['lokacje'][this.lang]]);
	$('#map_canvas_container').hide();
	if(tps){
		var len=tps.length;
		for(var i=0;i<len;i++){
			this.mapcell[tps[i].x+'_'+tps[i].y].hastp=1;
		}
	}
	this.map.others=[];
	this.map.deft=0;
	if(this.map_titles){
		for(var x=1;x<=this.current_loc.x_max;x++){
			for(var y=1;y<=this.current_loc.y_max;y++){
				if(this.mapcell[x+'_'+y]){
					var cell=this.mapcell[x+'_'+y];
					cell.cc={x:(x-1)*this.map.fX,y:(y-1)*this.map.fY};
					if(cell.t>0){
						if(this.custom_terrain) cell.t=this.custom_terrain;
						this.pushNewResourcefromMapTitle('terrain_'+cell.t,1,this.map_titles.terrains[cell.t]);
						if(this.map.deft==0) this.map.deft=cell.t;
						if(cell.t!=this.map.deft){
							if(this.map.others.indexOf(cell.t)==-1) this.map.others.push(cell.t);
						}
					}
					if(this.map_bosses&&this.map_bosses[x+'_'+y]){
						this.pushNewResourcefromMapTitle('biju_'+this.map_bosses[x+'_'+y]+'_',1,this.map_titles.biju[this.map_bosses[x+'_'+y]]);
					}
					if(cell.b>0) this.pushNewResourcefromMapTitle('biom_'+cell.b+'_',1,this.map_titles.bioms[cell.b]);
				}
			}
		}
	
		this.pushNewResourcefromMapTitle('tps_',1,this.map_titles.tps);
		this.pushNewResourcefromMapTitle('minimap_',1,this.map_titles.minimapa);
	}
	this.processAwaitingResources(function(){
		if(!parent.map.initiated){
			parent.map.canvas = document.getElementById('map_canvas');
			parent.map.ctx = parent.map.canvas.getContext("2d");
			parent.map.ctx.imageSmoothingEnabled = false;
			parent.map.canvas.addEventListener('contextmenu', function(evt) {
				if(evt.which==3){
					evt.preventDefault();
					return false;
				}
			}, false);
			parent.map.initiated=true;
			//minimap
			parent.minimap.canvas = document.getElementById('minimap_canvas');
			parent.minimap.grid_canvas = document.getElementById('minimap_grid_canvas');
			parent.minimap.canvas.width = parent.minimap.cX;
			parent.minimap.canvas.height = parent.minimap.cY;
			parent.minimap.grid_canvas.width = parent.minimap.cX;
			parent.minimap.grid_canvas.height = parent.minimap.cY;
			parent.minimap.ctx = parent.minimap.canvas.getContext("2d");
			parent.minimap.ctx.imageSmoothingEnabled = false;
			parent.minimap.gctx = parent.minimap.grid_canvas.getContext("2d");
			parent.minimap.gctx.imageSmoothingEnabled = false;
			parent.minimap.grid_canvas.addEventListener('contextmenu', function(evt) {
				if(evt.which==3){
					evt.preventDefault();
					return false;
				}
			}, false);
			parent.updateMinimap();
		}
		parent.maploaded=true;
		if(parent.map.smax_x<parent.map.cX) parent.map.canvas.width = parent.map.smax_x;
		else parent.map.canvas.width = parent.map.cX;
		if(parent.map.smax_y<parent.map.cY) parent.map.canvas.height = parent.map.smax_y;
		else parent.map.canvas.height = parent.map.cY;
		$('#map_canvas_container').show();
		parent.map.animate=true;
		parent.checkEffects();
		if(!parent.already_animated){
			parent.animate();
			parent.already_animated=1;
		}
	});
}
GAME.updateMinimap = function() {
	var parent=this;
	if(this.map.animate&&this.minimap.active) this.draw_minimap();
	window.setTimeout( function() { parent.updateMinimap(); }, 500 );
}
GAME.drawImage = function(ctx,resn,x,y,once=0,id=''){
	var result={end:false,frame:0};
	x=parseInt(x);
	y=parseInt(y);
	var sy=0,ox=x,oy=y;
	var res=this.map_resources[resn];
	if(this.map_resources&&res&&res.precanvas){
		if(res.bg_field){
			this.drawImage(ctx,res.bg_field,ox,oy);
		}
		if(res.animation){
			var time=this.getmTime();
			var ti=res.animation_speed+'_'+res.animation_frames;
			var fc=this.map.frame_control[ti];
			if(once){
				if(!this.map.frame_control[id]) this.map.frame_control[id]={animation_current_frames:0,animation_next_time:0};
				fc=this.map.frame_control[id];
			}
			if(fc){
				sy=fc.animation_current_frames*res.width;
				if(fc.animation_next_time<time){
					fc.animation_current_frames++;
					fc.animation_next_time=time+res.animation_speed;
				}
				if(fc.animation_current_frames>=res.animation_frames){
					result.end=true;
					fc.animation_current_frames=0;
				}
				result.frame=fc.animation_current_frames;
			}
		}
		if(res.hasOwnProperty('mx')) x+=res.mx;
		if(res.hasOwnProperty('my')) y+=res.my;
		ctx.drawImage(res.precanvas,0,sy,res.width,res.width,x,y,res.width,res.width);
		if(res.add_effect){
			this.drawImage(ctx,res.add_effect,ox,oy);
		}
	}
	else if(this.debug) console.log('tes',res,resn);
	return result;
}
GAME.showLocDesc = function(loc_data){
	var con='<div class=loc_desc><h2>'+loc_data[this.lang_data['lokacje'][this.lang]]+'</h2><span>'+LNG.lab422+'</span>: <b>'+loc_data.level+'</b><br /><i>'+LNG.lab427+'</i>:<br />';
	if(loc_data.bonus_tren) con+='<b>'+loc_data.bonus_tren+'</b> <span class=green>'+this.item_stat(89)+'</span><br />';
	if(loc_data.bonus_exp) con+='<b>'+loc_data.bonus_exp+'</b> <span class=green>'+this.item_stat(38)+'</span><br />';
	if(!loc_data.tp_available) con+='<b class=red>'+LNG.lab423+'</b><br />';
	if(loc_data.biju_spawn) con+='<b class=orange>'+LNG.lab424+'</b><br />';
	if(loc_data.disallow_pvp) con+='<span>'+LNG.lab425+'</span><br />';
	if(loc_data.move_not_consume_pa) con+='<span>'+LNG.lab426+'</span><br />';
	if(loc_data.mobs){
		con+='<br /><i>'+LNG.lab428+'</i>:<br />';
		var len=loc_data.mobs.length;
		for(var i=0;i<len;i++){
			var rank='';
			if(loc_data.mobs[i].rank>0) rank='('+LNG['mob_rank'+loc_data.mobs[i].rank]+')';
			con+='&raquo; <b>'+loc_data.mobs[i][this.lang_data['nauki'][this.lang]]+'</b> '+rank+' '+LNG.lab1+' '+loc_data.mobs[i].level+' <br />';
		}
	}
	con+='</div>';
	return con;
}
GAME.scrollToLoc = function(loc_id){
	var br=$('#world_map')[0].getBoundingClientRect();
	var pos=$('#wloc_'+loc_id).position();
	var sleft=Math.floor(pos.left-br.width/2);
	var stop=Math.floor(pos.top-br.height/2);
	$('#world_map').scrollLeft(sleft).scrollTop(stop);
}
GAME.recreateWorldMap = function(){
	if(this.worldData){
		var locs='',con='',mobs='';
		var len=this.worldData.length;
		var is_on_open_loc=false;
		for(var i=0;i<len;i++){
			con+='<option value="'+this.worldData[i].id+'_" data-loc="'+this.worldData[i].id+'">'+this.worldData[i][this.lang_data['lokacje'][this.lang]]+'</option>';
			var color='green';
			if(this.worldData[i].level>this.char_data.level) color='red';
			if(this.worldData[i].move_not_consume_pa) color='navy';
			if(this.worldData[i].id==this.char_data.loc){
				color='blue here';
				is_on_open_loc=true;
			}
			if(this.worldData[i].mobs){
				var len2=this.worldData[i].mobs.length;			
				for(var j=0;j<len2;j++){
					var rank='';
					if(this.worldData[i].mobs[j].rank>0) rank=' ('+LNG['mob_rank'+this.worldData[i].mobs[j].rank]+')';
					mobs+='<option value="'+this.worldData[i].id+'_'+j+'" data-loc="'+this.worldData[i].id+'">'+this.worldData[i].mobs[j][this.lang_data['nauki'][this.lang]]+' '+rank+'</option>';
				}
			}
			locs+='<div id="wloc_'+this.worldData[i].id+'" class="loc scenery'+this.worldData[i].scenery+'" data-toggle="tooltip" data-original-title="'+this.showLocDesc(this.worldData[i])+'"><div class="'+color+' option" data-option="quick_travel" data-loc="'+this.worldData[i].id+'"></div></div>';
		}
		$('#world_locs').html(locs);
		tooltip_bind();
		option_bind();
		if(is_on_open_loc){
			this.scrollToLoc(this.char_data.loc);
		}
		else this.scrollToLoc(2);
		if(!this.comboxRdy){
			this.comboxRdy=true;
			$('#search_locs').html('<option value="">...</option><optgroup label="'+LNG.lab434+'">'+con+'</optgroup><optgroup label="'+LNG.lab428+'">'+mobs+'</optgroup>');
			$('.combobox').off().selectize({});
			$('.loc_selector').on('change',function(){
				var th=$(this);
				var loc=th.val().split('_');
				loc=parseInt(loc[0]);
				$('.marked').removeClass('marked');
				if(loc>0){
					GAME.scrollToLoc(loc);	
					$('#wloc_'+loc).addClass('marked');
				}
			});
		}
	}
}
GAME.mapPlayerSSJCancel = function(char_id){
	if(this.map_players[char_id]){
		var parent=this;
		this.pushNewResourcefromMapTitle('hair_'+this.map_players[char_id].style+'_0',1,this.map_titles.characters[this.map_players[char_id].style].hairs[0]);
		if(this.map_players[char_id].old_cloth){
			this.map_players[char_id].cloth=this.map_players[char_id].old_cloth;
			this.pushNewResourcefromMapTitle('cloth_'+this.map_players[char_id].cloth,1,this.map_titles.cloths[this.map_players[char_id].cloth]);
		}
		this.processAwaitingResources(function(){
			parent.map_players[char_id].hair=0;
			parent.map_players[char_id].dir=1;
		});
	}
}
GAME.mapPlayerSSJStart = function(char_id,type){
	if(this.map_players[char_id]){
		var parent=this;
		var hjson=this.map_titles.characters[this.map_players[char_id].style].hairs[type];
		if(!hjson){
			type=0;
			hjson=this.map_titles.characters[this.map_players[char_id].style].hairs[type];
		}
		this.pushNewResourcefromMapTitle('hair_'+this.map_players[char_id].style+'_'+type,1,hjson);
		if(hjson&&hjson.use_cloth){
			this.map_players[char_id].old_cloth=this.map_players[char_id].cloth;
			this.map_players[char_id].cloth=hjson.use_cloth;
			this.pushNewResourcefromMapTitle('cloth_'+this.map_players[char_id].cloth,1,this.map_titles.cloths[this.map_players[char_id].cloth]);
		}
		this.processAwaitingResources(function(){
			parent.map_players[char_id].dir=1;
			parent.map_players[char_id].state.order=4;
			parent.map_players[char_id].state.hair=type;
			parent.map_players[char_id].state.frame=0;
		});
	}
}
GAME.drawMiniMap = function(){
	var msx=this.map.scam_x-3;
	var msy=this.map.scam_y-3;
	var cam_x=msx*this.minimap.w;
	var cam_y=msy*this.minimap.h;
	if(cam_x+this.minimap.cX>this.minimap.smax_x) cam_x=this.minimap.smax_x-this.minimap.cX;
	if(cam_y+this.minimap.cY>this.minimap.smax_y) cam_y=this.minimap.smax_y-this.minimap.cY;
	if(cam_x<0) cam_x=0;
	if(cam_y<0) cam_y=0;
	if(this.minimap.smax_x<this.minimap.cX) cam_x-=Math.floor((this.minimap.cX-this.minimap.smax_x)/16)*8;
	if(this.minimap.smax_y<this.minimap.cY) cam_y-=Math.floor((this.minimap.cY-this.minimap.smax_y)/16)*8;
	for(var y=1;y<=this.map.max_y;y++){
		for(var x=1;x<=this.map.max_x;x++){
			var cx=(x-1)*this.minimap.w-cam_x;
			var cy=(y-1)*this.minimap.h-cam_y;
			if(this.mapcell[x+'_'+y]){
				var cell=this.mapcell[x+'_'+y];
				if(cell.m==0){
					this.minimap.ctx.fillStyle = "rgba(125,101,74, 0.7)";
					this.minimap.ctx.fillRect(cx,cy,this.minimap.w,this.minimap.h); 
				}
				else if(cell.f){
					this.minimap.ctx.fillStyle = "rgba(125,101,74, 0.3)";
					this.minimap.ctx.fillRect(cx,cy,this.minimap.w,this.minimap.h); 
				}
			}
		}
	}
	for(var y=1;y<=this.map.max_y;y++){
		for(var x=1;x<=this.map.max_x;x++){
			var cx=(x-1)*this.minimap.w-cam_x;
			var cy=(y-1)*this.minimap.h-cam_y;
			if(this.mapcell[x+'_'+y]){
				var cell=this.mapcell[x+'_'+y];
				if(cell.hastp){
					this.drawImage(this.minimap.ctx,'minimap_portal',cx,cy);
				}
				if(this.map_castles&&this.map_castles[x+'_'+y]){
					this.minimap.ctx.fillStyle = "rgba(102,102,255, 0.6)";
					this.minimap.ctx.fillRect(cx,cy,this.minimap.w,this.minimap.h); 
				}
				if(this.map_bosses&&this.map_bosses[x+'_'+y]){
					this.drawImage(this.minimap.ctx,'minimap_boss',cx,cy);
				}
				if(this.map_balls&&this.map_balls[x+'_'+y]){
					this.drawImage(this.minimap.ctx,'minimap_ball',cx,cy);
				}
				if(this.map_quests[x+'_'+y]&&this.map_options.vo[1]){
					var len=this.map_quests[x+'_'+y].length,move=0,q=false;
					for(var i=0;i<len;i++){
						var q=this.map_quests[x+'_'+y][i];
						if(q){
							q=true;
							break;
						}
					}
					if(q) this.drawImage(this.minimap.ctx,'minimap_quest',cx,cy);
				}
				if(this.map_wanteds&&this.map_wanteds.x==x&&this.map_wanteds.y==y){
					this.drawImage(this.minimap.ctx,'minimap_wanted',cx,cy);
				}
			}
		}
	}
	for (var char_id in this.map_players){
		char_id=parseInt(char_id);
		if(char_id<1) continue;
		if(this.map_players.hasOwnProperty(char_id)&&char_id!=this.char_id){
			var x=this.map_players[char_id].x;
			var y=this.map_players[char_id].y;
			var cx=(x-1)*this.minimap.w-cam_x;
			var cy=(y-1)*this.minimap.h-cam_y;
			this.drawImage(this.minimap.ctx,'minimap_enemy',cx,cy);
		}
	}
	if(this.map_players[this.char_id]){
		var x=this.char_data.x;
		var y=this.char_data.y;
		var cx=(x-1)*this.minimap.w-cam_x;
		var cy=(y-1)*this.minimap.h-cam_y;
		this.drawImage(this.minimap.ctx,'minimap_player',cx,cy);
	}
}
GAME.drawSmallMap = function(){
	if(!this.maploaded) return;
	var time=this.getmTime(),camx=this.map.cam_x,camy=this.map.cam_y;
	var rx=this.map.scam_x+this.map.rX;
	var ry=this.map.scam_y+this.map.rY;
	if(rx>this.map.max_x) rx=this.map.max_x;
	if(ry>this.map.max_y) ry=this.map.max_y;
	if(rx<this.map.rX) rx=this.map.rX;
	if(ry<this.map.rY) ry=this.map.rY;
	//var others=[];
	//var deft=0;
	if(this.map.earthquake&&this.map.earthquake.end>time){
		camx+=this.map.earthquake.modx;
		camy+=this.map.earthquake.mody;
		if(this.map.earthquake.next_tick>=time){
			this.map.earthquake.next_tick=time+this.earthquake_tick;
			this.map.earthquake.modx=this.getRandomInt(-10,10);
			this.map.earthquake.mody=this.getRandomInt(-10,10);
		}
	}
		
	for(var y=this.map.scam_y;y<=ry;y++){
		for(var x=this.map.scam_x;x<=rx;x++){
			if(this.mapcell[x+'_'+y]){
				var cell=this.mapcell[x+'_'+y];
				if(cell.t>0){
					//if(deft==0) deft=cell.t;
					if(cell.t!=this.map.deft){
						//if(others.indexOf(cell.t)==-1) others.push(cell.t);
						continue;
					}
					//terrain
					var cx=cell.cc.x-camx;
					var cy=cell.cc.y-camy;
					var ta=cell.ta||1;
					this.drawImage(this.map.ctx,'terrain_'+cell.t+'f',cx,cy);
				}
				else if(cell.t==0){
					var cx=cell.cc.x-camx;
					var cy=cell.cc.y-camy;
					this.map.ctx.fillStyle = "rgba(0, 0, 0, 1)";
					this.map.ctx.fillRect(cx,cy,40,40); 
				}
			}
			else{
				var cx=(x-1)*this.map.fX-camx;
				var cy=(y-1)*this.map.fY-camy;
				this.map.ctx.fillStyle = "rgba(0, 0, 0, 1)";
				this.map.ctx.fillRect(cx,cy,40,40); 
			}
		}
	}
	if(this.map.others.length>0){
		for(var y=this.map.scam_y;y<=ry;y++){
			for(var x=this.map.scam_x;x<=rx;x++){
				if(this.mapcell[x+'_'+y]){
					var cell=this.mapcell[x+'_'+y];
					if(cell.t==this.map.deft||cell.t==0){
						continue;
					}
					//terrain
					var cx=cell.cc.x-camx;
					var cy=cell.cc.y-camy;
					var ta=cell.ta||1;
					this.drawImage(this.map.ctx,'terrain_'+cell.t+'f',cx,cy);
				}
			}
		}
	}
	for(var y=this.map.scam_y;y<=ry;y++){
		for(var x=this.map.scam_x;x<=rx;x++){
			if(this.mapcell[x+'_'+y]){
				var cell=this.mapcell[x+'_'+y],cc=true,cx=0,cy=0;
				if(this.map_castles&&this.map_castles[x+'_'+y]){
					cx=cell.cc.x-camx;
					cy=cell.cc.y-camy;
					cc=false;
					this.drawImage(this.map.ctx,'castle_id'+this.map_castles[x+'_'+y].id,cx,cy);
				}
				else if(this.map_private&&this.map_private.type&&this.planet_str[this.map_private.type][x+'_'+y]){
					if(cc){
						cx=cell.cc.x-camx;
						cy=cell.cc.y-camy;
						cc=false;
					}
					var s=this.planet_str[this.map_private.type][x+'_'+y];
					if(this.map_private['sl'+s]>0) this.drawImage(this.map.ctx,'private_s'+s+'_'+this.map_private['sl'+s],cx,cy);
				}
				else if(cell.f>0){
					if(cc){
						cx=cell.cc.x-camx;
						cy=cell.cc.y-camy;
						cc=false;
					}
					this.drawImage(this.map.ctx,'biom_'+cell.b+'_'+cell.f,cx,cy);
				}
				if(this.premiumData&&this.premiumData[x+'_'+y]){
					if(cc){
						cx=cell.cc.x-this.map.cam_x;
						cy=cell.cc.y-this.map.cam_y;
						cc=false;
					}
					if(this.premiumData[x+'_'+y]==1) this.map.ctx.fillStyle="rgba(51, 153, 255,0.75)";
					else this.map.ctx.fillStyle="rgba(255, 51, 0,0.75)";
					this.map.ctx.fillRect(cx,cy,40,40); 
				}
			}
		}
	}
	for(var y=this.map.scam_y;y<=ry;y++){
		for(var x=this.map.scam_x;x<=rx;x++){
			if(this.mapcell[x+'_'+y]){
				var cell=this.mapcell[x+'_'+y],cc=true,cx=0,cy=0;
				if(cell.hastp){
					if(cc){
						cx=cell.cc.x-camx;
						cy=cell.cc.y-camy;
						cc=false;
					}
					this.drawImage(this.map.ctx,'tps_field',cx,cy);
				}
				if(this.map_mines&&this.map_mines.coords[x+'_'+y]&&this.map_mines.coords[x+'_'+y][0][3]){
					if(cc){
						cx=cell.cc.x-camx;
						cy=cell.cc.y-camy;
						cc=false;
					}
					this.drawImage(this.map.ctx,'tps_mine',cx,cy);
				}
				if(this.map_bosses&&this.map_bosses[x+'_'+y]){
					if(cc){
						cx=cell.cc.x-camx;
						cy=cell.cc.y-camy;
						cc=false;
					}
					this.drawImage(this.map.ctx,'biju_'+this.map_bosses[x+'_'+y]+'_f',cx,cy);
				}
				if(this.current_mission && this.current_mission.loc == this.char_data.loc && this.current_mission.x == x && this.current_mission.y == y){
					if(cc){
						cx=cell.cc.x-camx;
						cy=cell.cc.y-camy;
						cc=false;
					}
					this.drawImage(this.map.ctx,'tps_mission',cx,cy);
				}
				if(this.map_quests[x+'_'+y]&&this.map_options.vo[1]){
					if(cc){
						cx=cell.cc.x-camx;
						cy=cell.cc.y-camy;
						cc=false;
					}
					var len=this.map_quests[x+'_'+y].length,move=0;
					for(var i=0;i<len;i++){
						var q=this.map_quests[x+'_'+y][i];
						if(q){
							if(q.move){ 
								var tx=(x-1)*this.map.fX;
								var ty=(y-1)*this.map.fY;
								var nx=(q.move.new_x-1)*this.map.fX;
								var ny=(q.move.new_y-1)*this.map.fY;
								var percent=(time-q.move.start)/q.move.duration;
								
								cx=(tx + (nx - tx)*percent)-camx;
								cy=(ty + (ny - ty)*percent)-camy;
								this.drawImage(this.map.ctx,'tps_quest',cx,cy);
								if(percent>=1){
									var nx=q.move.new_x;
									var ny=q.move.new_y;
									delete q.move;
									if(this.map_quests[nx+'_'+ny]) this.map_quests[nx+'_'+ny].push(q);
									else this.map_quests[nx+'_'+ny]=[q]
									this.map_quests[x+'_'+y][i]=false;
									
								}
							}
							else if(q.end){
								var tmp=this.drawImage(this.map.ctx,'tps_quest_end',cx+move,cy,1,q.qb_id);
								if(tmp.end){
									this.map_quests[x+'_'+y][i]=false;
								}
							}
							else this.drawImage(this.map.ctx,'tps_quest',cx+move,cy);
							move+=10;
						}
					}
				}
			}
		}
	}
	if(this.map_options.ef[0]){
		var len=this.map.impact_buffer.length,tmp=[];
			for(var i=0;i<len;i++){
				var ef=this.map.impact_buffer[i];
				var cell=this.mapcell[ef.x+'_'+ef.y];
				if(cell){
					var cx=cell.cc.x-camx;
					var cy=cell.cc.y-camy;
					var status=this.drawImage(this.map.ctx,ef.type,cx,cy,1,ef.iid);
					if(!status.end){
						tmp.push(ef);
					}
				}
		}
		this.map.impact_buffer=tmp;
	}
	for (var char_id in this.map_players){
		char_id=parseInt(char_id);
		if(char_id<1) continue;
		if(this.map_players.hasOwnProperty(char_id)&&char_id!=this.char_id){
			this.drawMapPlayer(char_id,camx,camy);
		}
	}
	if(this.map_players[this.char_id]) this.drawMapPlayer(this.char_id,camx,camy);
	if(this.premiumData){
		this.map.ctx.drawImage(this.premiumDataN,0,0,200,60,200,20,200,60);
	}
	if(this.map_options.ef[0]){
		var len=this.map.effect_buffer.length,tmp=[];
		for(var i=0;i<len;i++){
			var ef=this.map.effect_buffer[i];
			ef.p=(time-ef.start)/ef.speed;
			if(ef.p<1){
					var cx = parseInt(ef.sx + (ef.ex - ef.sx) * ef.p)-camx;
					var cy = parseInt(ef.sy + (ef.ey - ef.sy) * ef.p)-camy;  
					if(ef.snow_type){
						cx+=ef.move;
						if(ef.snow_timer<time){
							ef.snow_timer=time+this.snow_move_timer;
							switch(ef.dir){
								case 1:
									ef.move+=1;
									if(ef.move>=this.snow_direction_var){
										ef.dir=0;
									}
								break;
								default:
									ef.move-=1;
									if(ef.move<=this.snow_direction_var2){
										ef.dir=1;
									}
								break;
							}
						}
					}
					this.drawImage(this.map.ctx,ef.type,cx,cy);
					
					tmp.push(ef);
			}
			else{
				if(ef.impact) this.map.impact_buffer.push({iid:ef.impact+ef.ex+'|'+ef.ey+ef.start,frame:0,type:ef.impact,x:ef.ix,y:ef.iy,start:time});
			}
		}
		this.map.effect_buffer=tmp;
		var r=this.getRandomInt(1,1000);
		if(this.wind_frequency>0){
			if(r<=this.wind_frequency){
				var sx=this.getRandomInt(2,this.map.max_x-1),sy=this.getRandomInt(2,this.map.max_y-1);
				var ex=sx-this.getRandomInt(2,5),ey=sy,start=time;
				if(ex<1) ex=1;
				var speed=500+this.getRandomInt(0,1000);
				this.map.effect_buffer.push({type:'weather_wind',sx:sx*this.map.fX,sy:sy*this.map.fY,ex:ex*this.map.fX,ey:ey*this.map.fY,p:0,start:start,speed:speed});
			}
		}
		if(this.fog_frequency>0){
			if(r<=this.fog_frequency){
				var sx=this.map.max_x+1,sy=this.getRandomInt(1,this.map.max_y);
				var ex=-1,ey=sy,start=time;
				var speed=this.fog_speed*(sx-ex)+this.getRandomInt(0,1000);
				this.map.effect_buffer.push({type:'weather_fog'+this.getRandomInt(1,6),sx:sx*this.map.fX,sy:sy*this.map.fY,ex:ex*this.map.fX,ey:ey*this.map.fY,p:0,start:start,speed:speed});
			}
		}
		if(this.cloud_frequency>0){
			if(r<=this.cloud_frequency){
				var sx=this.map.max_x+1,sy=this.getRandomInt(1,this.map.max_y);
				var ex=-3,ey=sy,start=time;
				var speed=this.cloud_speed*(sx-ex)+this.getRandomInt(0,1000);
				this.map.effect_buffer.push({type:'weather_cloud'+this.getRandomInt(1,6),sx:sx*this.map.fX,sy:sy*this.map.fY,ex:ex*this.map.fX,ey:ey*this.map.fY,p:0,start:start,speed:speed});
			}
		}
		if(this.rain_frequency>0){
			if(r<=this.rain_frequency){
				var ex=this.getRandomInt(1,this.map.max_x),ey=this.getRandomInt(1,this.map.max_y),start=time;
				var sx=ex+5,sy=ey-this.map.max_y;
				
				var speed=this.rain_speed*(ey-sy);
				this.map.effect_buffer.push({type:'weather_rain_drop',sx:sx*this.map.fX,sy:sy*this.map.fY,ex:ex*this.map.fX,ey:ey*this.map.fY,p:0,start:start,speed:speed,impact:'weather_rain_impact',ix:ex+1,iy:ey+1});
			}
		}
		if(this.snow_frequency>0){
			if(r<=this.snow_frequency){
				var ex=this.getRandomInt(1,this.map.max_x),ey=this.getRandomInt(1,this.map.max_y),start=time;
				var sx=ex+2,sy=ey-this.map.max_y;
				
				var speed=this.snow_speed*(ey-sy)+this.getRandomInt(0,10);
				this.map.effect_buffer.push({type:'weather_snow_drop',sx:sx*this.map.fX,sy:sy*this.map.fY,ex:ex*this.map.fX,ey:ey*this.map.fY,p:0,start:start,speed:speed,impact:'weather_snow_impact',ix:ex+1,iy:ey+1,snow_type:1,move:0,dir:1,snow_timer:0});
			}
		}
		if(this.storm_frequency>0){
			if(r<=this.storm_frequency){
				var sx=this.map.max_x+1,sy=this.getRandomInt(1,this.map.max_y);
				var ex=-1,ey=sy+this.getRandomInt(-5,5),start=time;
				var speed=this.storm_speed*(sx-ex);
				this.map.effect_buffer.push({type:'weather_sandstorm',sx:sx*this.map.fX,sy:sy*this.map.fY,ex:ex*this.map.fX,ey:ey*this.map.fY,p:0,start:start,speed:speed});
			}
		}
		if(this.earthquake_frequency&&r<=this.earthquake_frequency){
			this.map.earthquake={end:time+this.earthquake_duration,next_tick:time+this.earthquake_tick,modx:this.getRandomInt(-10,10),mody:this.getRandomInt(-10,10)};
		}
	}
}
GAME.drawMapPlayer = function(char_id,camx,camy){
	var time=this.getmTime();
	var time2=this.getTime();
	var cell=this.mapcell[this.map_players[char_id].x+'_'+this.map_players[char_id].y];
	if(cell){
			var cx=cell.cc.x-camx;
			var cy=cell.cc.y-camy;
			var draw=true;
			switch(this.map_players[char_id].state.order){
				case 4:
					this.drawImage(this.map.ctx,'body_'+this.map_players[char_id].style+'transform',cx,cy,2,char_id+'tstyle');
					this.drawImage(this.map.ctx,'cloth_'+this.map_players[char_id].cloth+'transform',cx,cy,2,char_id+'tcloth');
					/*
					var tmp=this.drawImage(this.map.ctx,'hair_'+this.map_players[char_id].style+'_0transform_'+this.map_players[char_id].state.hair,cx,cy,2,char_id+'ttrans');
					if(tmp.end){
						this.map_players[char_id].hair=this.map_players[char_id].state.hair;
						this.map_players[char_id].state.order=0;
						draw=false;
					}
					*/
				break;
				case 3:
					if(this.map_players[char_id].state.frame==1||this.map_players[char_id].state.frame==3){
						this.drawImage(this.map.ctx,'body_'+this.map_players[char_id].style+'dir'+this.map_players[char_id].dir,cx,cy);
						this.drawImage(this.map.ctx,'cloth_'+this.map_players[char_id].cloth+'dir'+this.map_players[char_id].dir,cx,cy);
						//this.drawImage(this.map.ctx,'hair_'+this.map_players[char_id].style+'_'+this.map_players[char_id].hair+'dir'+this.map_players[char_id].dir,cx,cy);
					}
					var tmp=this.drawImage(this.map.ctx,'tps_out',cx,cy,2,char_id+'tpout');
					if(tmp.end){
						this.map_players[char_id].state.order=0;
						delete this.map_players[char_id];
						draw=false;
					}
					else this.map_players[char_id].state.frame=tmp.frame;
				break;
				case 2:
					if(this.map_players[char_id].state.frame==1||this.map_players[char_id].state.frame==3){
						this.drawImage(this.map.ctx,'body_'+this.map_players[char_id].style+'dir'+this.map_players[char_id].dir,cx,cy);
						this.drawImage(this.map.ctx,'cloth_'+this.map_players[char_id].cloth+'dir'+this.map_players[char_id].dir,cx,cy);
						//this.drawImage(this.map.ctx,'hair_'+this.map_players[char_id].style+'_'+this.map_players[char_id].hair+'dir'+this.map_players[char_id].dir,cx,cy);
					}
					var tmp=this.drawImage(this.map.ctx,'tps_in',cx,cy,2,char_id+'tpin');
					if(tmp.end) this.map_players[char_id].state.order=0;
					else this.map_players[char_id].state.frame=tmp.frame;
				break;
				case 1:
					var tx=(this.map_players[char_id].x-1)*this.map.fX;
					var ty=(this.map_players[char_id].y-1)*this.map.fY;
					var nx=(this.map_players[char_id].state.nx-1)*this.map.fX;
					var ny=(this.map_players[char_id].state.ny-1)*this.map.fY;
					var percent=(time-this.map_players[char_id].state.start)/this.map_players[char_id].state.duration;
					
					cx=Math.floor(tx + (nx - tx)*percent);
					cy=Math.floor(ty + (ny - ty)*percent);
					if(char_id==this.char_id&&this.hero_cen) this.map_cam_center_big(cx,cy);
					cx-=this.map.cam_x;
					cy-=this.map.cam_y;
					this.drawImage(this.map.ctx,'body_'+this.map_players[char_id].style+'mdir'+this.map_players[char_id].dir,cx,cy);
					this.drawImage(this.map.ctx,'cloth_'+this.map_players[char_id].cloth+'mdir'+this.map_players[char_id].dir,cx,cy);
					//this.drawImage(this.map.ctx,'hair_'+this.map_players[char_id].style+'_'+this.map_players[char_id].hair+'mdir'+this.map_players[char_id].dir,cx,cy);
					if(percent>=1){
						this.map_players[char_id].x=this.map_players[char_id].state.nx;
						this.map_players[char_id].y=this.map_players[char_id].state.ny;
						this.map_players[char_id].state.order=0;
					}
				break;
				default:
					this.drawImage(this.map.ctx,'body_'+this.map_players[char_id].style+'dir'+this.map_players[char_id].dir,cx,cy);
					this.drawImage(this.map.ctx,'cloth_'+this.map_players[char_id].cloth+'dir'+this.map_players[char_id].dir,cx,cy);
					//this.drawImage(this.map.ctx,'hair_'+this.map_players[char_id].style+'_'+this.map_players[char_id].hair+'dir'+this.map_players[char_id].dir,cx,cy);
				break;
			}
			if(draw){
				this.map.ctx.drawImage(this.map_players[char_id].precanvas,0,0,100,20,cx-30,cy-20,100,20);
				if(this.map_players[char_id].vip) this.drawImage(this.map.ctx,'tps_vip'+this.map_players[char_id].vip,cx-this.map_players[char_id].vip_x-13,cy-30);
				if(this.map_players[char_id].precanvas2) this.map.ctx.drawImage(this.map_players[char_id].precanvas2,0,0,200,20,cx-80,cy-35,200,20);
			}
	}
}
GAME.playersSort = function(){
	var tmp=this.map_players;
	var newt={};
	newt[this.char_id]=tmp[this.char_id];
	for (var char_id in tmp){
		char_id=parseInt(char_id);
		if(char_id<1) continue;
		if(tmp.hasOwnProperty(char_id)&&char_id!=this.char_id){
			newt[char_id]=tmp[char_id];
		}
	}
	
	this.map_players=newt;
}
GAME.locPlayerIn = function(char_id,data){
	if(!this.map_players[char_id]){
		this.map_players[char_id]=data;
		this.map_players[char_id].char_id=char_id;
		this.map_players[char_id]=this.preparePlayer(data);
		this.processAwaitingResources(function(){});
	}
	else{
		if(data.x) this.map_players[char_id].x=data.x;
		if(data.y) this.map_players[char_id].y=data.y;
	}
	this.map_players[char_id].state.order=2;
	this.map_players[char_id].state.frame=0;
	
}
GAME.locPlayerOut = function(char_id){
	if(this.map_players[char_id]){
		this.map_players[char_id].state.order=3;
		this.map_players[char_id].state.frame=0;
	}
}
GAME.mapCharMove = function(char_id,x,y,dir){
	if(this.map_players[char_id]){
		if(this.map_players[char_id].state.order==4){
			this.map_players[char_id].hair=this.map_players[char_id].state.hair;
		}
		if(this.map_players[char_id].state.order==1){
			this.map_players[char_id].x=this.map_players[char_id].state.nx;
			this.map_players[char_id].y=this.map_players[char_id].state.ny;
		}
		this.map_players[char_id].state.order=1;
		this.map_players[char_id].state.nx=x;
		this.map_players[char_id].state.ny=y;
		this.map_players[char_id].dir=dir;
		this.map_players[char_id].state.start=this.getmTime();
		this.map_players[char_id].state.duration=this.move_speed;
		this.map_players[char_id].state.p=0;
	}
}
GAME.parseUsedItems = function(items){
	//restore defaults
	for(var s=1;s<=this.item_slots;s++){
		$('#ekw_use_slot'+s).empty().attr('data-original-title','<div class="tt">'+LNG['item_slot'+s]+'</div>').removeClass('player_ekw_item').attr('data-item_id',0).attr('data-load_go',0).attr('data-item_class',0).attr('draggable',false).off('mouseover').off('dragstart').off('dragend');
	}
	if(items&&items.length){
		var len=items.length;
		for(var i=0;i<len;i++){
			var slot=items[i].type;
			var item='<img src="/gfx/items/'+items[i].lvl+'/'+items[i].class+'/'+items[i].item_id+'.png" />';
			$('#ekw_use_slot'+slot).html(item).addClass('player_ekw_item').attr('data-item_id',items[i].id).attr('draggable',true);
		}
	}
	player_ekw_item_bind();
}
GAME.clan_scost = function(i,lvl){
	var cost=9999;
	switch(i){
		case 1: 
		case 7:
		case 8:
		case 36:
			cost=(lvl+1)*(lvl+1)*9; 
			if(lvl>15) cost=16*16*9+lvl*10;
		break;
		case 2: 
			cost=(lvl+1)*(lvl+1)*7; 
			if(lvl>15) cost=16*16*7+lvl*10;
		break;
		case 3: 
		case 5: 
		case 9: 
		case 12: 
		case 13:
		case 14:
		case 15: 
			cost=(lvl+1)*(lvl+1)*8; 
			if(lvl>15) cost=16*16*8+lvl*10;
		break;
		case 4: 
		case 10: 
			cost=(lvl+1)*(lvl+1)*6; 
			if(lvl>15) cost=16*16*6+lvl*10;
		break;
		case 6: 
			cost=(lvl+1)*(lvl+1)*2; 
			if(lvl>15) cost=16*16*2+lvl*10;
		break;
		case 11: 
			cost=(lvl+1)*(lvl+1)*10; 
			if(lvl>15) cost=16*16*10+lvl*10;
		break;
		case 16: 
		case 18:
			cost=(lvl+1)*(lvl+1)*3; 
			if(lvl>15) cost=16*16*3+lvl*10;
		break;
		case 17: 
		case 19:
			cost=(lvl+1)*(lvl+1)*4; 
			if(lvl>15) cost=16*16*4+lvl*10;
		break;
		case 20: 
		case 21: 
		case 22: 
		case 23: 
		case 24: 
		case 25: 
		case 26: 
			cost=(lvl+1)*(lvl+1)*2; 
			if(lvl>15) cost=16*16*2+lvl*10;
		break;
		case 27:
		case 28:
		case 29:
			switch(lvl+1){
				case 1: cost=500; break;
				case 2: cost=1200; break;
				case 3: cost=2400; break;
				case 4: cost=3900; break;
				case 5: cost=5600; break;
				case 6: cost=7200; break;
				case 7: cost=9600; break;
				case 8: cost=12500; break;
				case 9: cost=18500; break;
				case 10: cost=25500; break;
			}
		break;
		case 30:
		case 31:
		case 32:
		case 33:
		case 34:
		case 35:
			switch(lvl+1){
				case 1: cost=1000; break;
				case 2: cost=2000; break;
				case 3: cost=4000; break;
				case 4: cost=8000; break;
				case 5: cost=10000; break;
				case 6: cost=12000; break;
				case 7: cost=14000; break;
				case 8: cost=16000; break;
				case 9: cost=18000; break;
				case 10: cost=20000; break;
			}
		break;
	}
	return cost;
}
GAME.klan_struct_mcs = function(i,lvl){ 
	var cost=9999;
	switch(i){
		case 30:
		case 31:
		case 32:
		case 33:
		case 34:
		case 35:
		case 36:
			switch(lvl+1){
				case 1: cost=100000; break;
				case 2: cost=500000; break;
				case 3: cost=1000000; break;
				case 4: cost=2000000; break;
				case 5: cost=4000000; break;
				case 6: cost=8000000; break;
				case 7: cost=16000000; break;
				case 8: cost=32000000; break;
				case 9: cost=62000000; break;
				case 10: cost=124000000; break;
			}
		break;
	}
	return cost;
}
GAME.clan_planet_cost = function (lvl){
	switch(lvl){
		case 1: return 150;
		case 2: return 250;
		case 3: return 410;
		case 4: return 620;
		case 5: return 850;
		case 6: return 970;
		case 7: return 1050;
		case 8: return 1150;
		case 9: return 1300;
	}
}
GAME.clanPlanetLimit = function(level){
	var res=1+Math.floor(level/20);
	return Math.min(res,6);
}
GAME.editClanPlayer = function(pind){
	if(this.clan_players&&this.clan_players[pind]){
		var player=this.clan_players[pind];
		var laws=player.laws;
		$('#clan_assign').hide();
		$('.clan_law_chck').prop('checked',false).prop('disabled',false);
		if(laws){
			$('#clan_player_rank').val(laws.rank);
			var len=this.clan_law_labels.length;
			for(var i=0;i<len;i++){
				if(laws[this.clan_law_labels[i]]) $('#ced_law_'+this.clan_law_labels[i]).prop('checked',true);
			}
		}
		else{
			$('#clan_player_rank').val('');
		}
		if(this.klan_data.chief_id==player.id){
			$('.clan_law_chck').prop('checked',true).prop('disabled',true);
		}
		else if(this.klan_data.chief_id==this.char_id){
			$('#clan_assign').show().data('char_id',player.id);
		}
		$('#edited_player').text(player.name);
		$('#cpout').data('char_id',player.id);
		$('#cedgo').data('char_id',player.id)
		$('#edit_clan_player').show();
	}
}

GAME.clan_struct_cost = function (currency,id,level){
	var mod=0;
	level++;
	switch(id){
		default: mod=6; break;
		case 2: mod=6; break;
		case 3: mod=5; break;
		case 4: mod=5; break;
		case 5: mod=7; break;
		case 6: mod=7; break;
		case 7: mod=7; break;
		case 8: mod=7; break;
		case 9: mod=7; break;
		case 10: mod=7; break;
		case 11: mod=8; break;
		case 12: mod=9; break;
		case 13: mod=9; break;
		case 99: mod=3; break;
		case 100: mod=1000; break;
		case 201: mod=500; break;
		case 202: mod=500; break;
		case 203: mod=500; break;
		case 204: mod=500; break;
		case 205: mod=500; break;
		case 206: mod=500; break;
	}
	switch(currency){
		case 1: 
			var tmp=0;
			if(level<3) tmp=0;
			else tmp=level*level*mod-40; 
			if(tmp<0) tmp=0;
			return tmp; 
		break;
		case 2: 
			return level*mod*1000; 
		break;
		case 3: 
			return level*level*mod*10; 
		break;
	}
}
GAME.processClanData = function(){
	if(this.klan_data){
		$('#uploading').hide();
		$('#clan_name').html('<img src="'+this.klan_data.emblem+'" /> '+this.klan_data.short);
		$('#clan_logo').attr('src',this.klan_data.logo);
		$('#clan_logo_s').attr('src',this.klan_data.logo);
		$('#clan_emblem_s').attr('src',this.klan_data.emblem);
		$('.clan_kp').text(this.dots(this.klan_data.kp));
		$('.clan_pu').text(this.dots(this.klan_data.pu));
		$('.clan_gold').text(this.dots(this.klan_data.gold));
		$('.clan_prestige').text(this.dots(this.klan_data.prestige));
		$('#clan_level').text(this.klan_data.level);
		$('.clan_lvl').hide();
		if(this.klan_data.level<20){
			var lvl_cost='';
			var cls='';
			var need=this.clan_struct_cost(1,99,this.klan_data.level);
			if(need>this.klan_data.kp) cls='red';
			lvl_cost+='<span class="'+cls+'">'+need+' <img src="/gfx/kp.png" /></span>';
			var cls='';
			var need=this.clan_struct_cost(2,99,this.klan_data.level);
			if(need>this.klan_data.gold) cls='red';
			lvl_cost+=' | <span class="'+cls+'">'+this.dots(need)+' <img src="/gfx/gold.png" /></span>';
			var cls='';
			var need=this.clan_struct_cost(3,99,this.klan_data.level);
			if(need>this.klan_data.prestige) cls='red';
			lvl_cost+=' | <span class="'+cls+'">'+this.dots(need)+' <img src="/gfx/prestige.png" /></span>';
			$('#clan_lvl_cost').html(lvl_cost);
			$('#clan_lvl_upgrade').show();
		}
		else $('#clan_lvl_max').show();
		var lim=17+this.klan_data.level*3;
		$('#clan_mem_max').text(lim);
		$('#klan_change_short').val(this.klan_data.short);
		$('#clan_text').sceditor('instance').val(this.klan_data.text);
		$('#clan_opis').sceditor('instance').val(this.klan_data.opis);
		var html=this.parseBB(this.klan_data.text);
		$('#clan_text_unp').html(html);
		var lim=1;//+this.klan_data.s4+this.klan_data.s4u;
		$('#max_wars').text(lim);
		$('#klan_war_won').text(this.klan_data.war_wins);
		$('#kln_war_lost').text(this.klan_data.war_loses);
		$('#kln_war_frags').text(this.klan_data.war_limit);
		$('#kln_last_score').text(this.klan_data.last_score);
		$('.cp_switch').hide();
		$('#challl_counter').text(this.dots(this.klan_data.g_kills));
	}
}

GAME.processOrgData = function(){
	if(this.org_data){
		$('#org_name').html(''+this.org_data.short);
		$('.org_kp').text(this.dots(this.org_data.kp));
		$('.org_gold').text(this.dots(this.org_data.gold));
		$('#org_level').text(this.org_data.level);
		$('.org_lvl').hide();
		if(this.org_data.level<20){
			var lvl_cost='';
			var cls='';
			var need=this.org_data.level+1;
			if(need>this.org_data.kp) cls='red';
			lvl_cost+='<span class="'+cls+'">'+need+' <img src="/gfx/kp.png" /></span>';
			var cls='';
			var need=this.clan_struct_cost(2,100,this.org_data.level);
			if(need>this.org_data.gold) cls='red';
			lvl_cost+=' | <span class="'+cls+'">'+this.dots(need)+' <img src="/gfx/gold.png" /></span>';
			$('#org_lvl_cost').html(lvl_cost);
			$('#org_lvl_upgrade').show();
		}
		else $('#org_lvl_max').show();
		var lim=5+this.org_data.level*3;
		$('#org_mem_max').text(lim);
		$('#org_text').sceditor('instance').val(this.org_data.text);
		$('#org_opis').sceditor('instance').val(this.org_data.opis);
		var html=this.parseBB(this.org_data.text);
		$('#org_text_unp').html(html);
		$('#org_war_won').text(this.org_data.war_wins);
		$('#org_war_lost').text(this.org_data.war_loses);
		if(this.org_data.hire) $('#org_hire').prop('checked',true);
		else $('#org_hire').prop('checked',false);
		$('#org_hire_cost').val(this.org_data.hire_cost);
		//$('.cp_switch').hide();
	}
}

GAME.parseClanData = function(res,type){
	switch(type){
		case 18:
			var data=res.recall;
			var len=data.length;
			var con='';
			for(var i=0;i<len;i++){
				var item=data[i],stack='';
				con+='<div class="ekw_slot main_ekw_item option" data-option="take_char_item" data-iid="'+data[i].id+'" data-toggle="tooltip" data-original-title="?" data-item_id="'+data[i].item_id+'" data-upgrade="'+data[i].upgrade+'"><img src="/gfx/items/'+data[i].lvl+'/'+data[i].class+'/'+data[i].item_id+'.png" /><div>'+data[i].char_name+'</div></div>';
			}
			con+='<div class="clearfix"></div>';
			$('#recall_items').html(con);
			option_bind();
			main_ekw_item_bind();
			tooltip_bind();
			//console.log(data);
			$('#recall_con').show();
		break;
		case 17:
			var data=res.ekw;
			var len=data.length;
			$('#armory_max').text(res.slots);
			$('#armory_used').text(len);
			var con='';
			for(var i=0;i<len;i++){
				var item=data[i],stack='';
				con+='<div class="ekw_slot main_ekw_item option" data-option="take_armory_item" data-iid="'+data[i].id+'" data-toggle="tooltip" data-original-title="?" data-item_id="'+data[i].item_id+'" data-upgrade="'+data[i].upgrade+'"><img src="/gfx/items/'+data[i].lvl+'/'+data[i].class+'/'+data[i].item_id+'.png" /></div>';
			}
			con+='<div class="clearfix"></div>';
			$('#armory_items').html(con);
			option_bind();
			main_ekw_item_bind();
			tooltip_bind();
		break;
		case 16:
			var data=res.notes;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				con+='<div class="chat_row stick'+data[i].stick+' klan_notes"><span class="grey">['+this.convertTime(data[i].time)+']</span> <b class="orange option" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].name+'</b>: '+this.parseEmots(data[i].text)+' <button class="pull-right option chat_icon clear" data-option="delete_note_entry" data-entry="'+data[i].id+'"></button></div>';
			}
			$('#clan_notes').html(con);
			option_bind();
		break;
		case 15:
			var pages=res.all_pages;
			var page=res.page;
			var pagi=LNG.lab272+' <b>'+page+'</b>/<b>'+pages+'</b> <button class="option newBtn" data-option="load_rent_log" data-page="'+(page-1)+'"><<</button> <button class="option newBtn" data-option="load_rent_log" data-page="'+(page+1)+'">>></button>';
			$('#cln_rent_pagi').html(pagi);
			var data=res.rlogs;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				con+='<tr><td>'+this.convertTime(data[i].time)+': </td><td><b>'+data[i].login+'</b> '+LNG.lab273+' <b class="orange">'+data[i].name+'</b></tr>';
			}
			$('#cln_rent_log').html(con);
			option_bind();
		break;
		case 14:
			var data=res.rented;
			var len=data.length,con='';
			for(var i=0;i<len;i++){
				var opt='',online='<img src="/gfx/dots/5.png" />';
				if(data[i].online) online='<img src="/gfx/dots/1.png" />';
				if(data[i].player_id!=this.char_data.player_id) opt='<button class="btn_small_gold option" data-option="use_rent" data-char_id="'+data[i].id+'">'+LNG.lab271+'</button>';
				opt+=' <button class="btn_small_gold option" data-option="cancel_rent" data-char_id="'+data[i].id+'">'+LNG.lab78+'</button>';
				con+='<tr><td>'+online+' <b class="orange option" data-option="show_player" data-char_id="'+data[i].id+'">'+data[i].name+'</b></td><td>'+this.rebPref(data[i].reborn)+this.dots(data[i].level)+'</td><td>'+LNG['clan_rent'+data[i].klan_rent_type]+'</td><td>'+opt+'</td></tr>';
			}
			$('#clan_rented').html(con);
			option_bind();
		break;
		case 13:
			var max=4;
			var data=res.glories;
			var fields=['','glory','glory2','glory3','glory4'];
			var con='';
			for(var i=1;i<=max;i++){
				var bon='',upgrade='';
				var lvl=this.klan_data[fields[i]];
				var val=lvl*data[i].val;
				if(data[i].stat){
					var pp='['+data[i].val+'/'+LNG.lab1+']';
					bon+='<b>'+LNG.lab247+'</b>: <span class=green>'+val+'</span> '+this.item_stat(data[i].stat)+' '+pp+' ';
				}
				if(data[i].clan_stat){
					var pp='['+data[i].val+'/'+LNG.lab1+']';
					bon+='<b>'+LNG.lab248+'</b>: <span class=green>'+val+'</span> '+LNG['clan_stat'+data[i].clan_stat]+' '+pp+'';
				}
				if(lvl<data[i].max_level){
					upgrade='<b>'+LNG.lab18+'</b>: '+LNG['clan_challenge_req'+i]+' - '+LNG.lab259+' <b class="red">'+this.convertSeconds(data[i].duration)+'</b> <button class="btn_small_gold option" data-option="activate_clan_challenge" data-glory="'+i+'">'+LNG.lab99+'</button> ';
					
				}
				else upgrade='<span class="green">'+LNG.lab244+'</span>';
				con+='<div class="glory"><h3 class="orange">'+LNG['klan_glory'+i]+'</h3>'+LNG.lab1+': <b class="orange">'+lvl+'</b> / '+data[i].max_level+'<br />'+bon+'<br />'+upgrade+'</div>';
			}
			$('#clan_glories').html(con);
			if(this.klan_data.g_active&&data[this.klan_data.g_active]){
				var glory=this.klan_data.g_active;
				var len2=data[glory].req_count.length;
				var progress='';
				for(var j=0;j<len2;j++){
					var lvl=j+1,cls='';
					if(this.klan_data[fields[glory]]>=lvl) cls='obtained';
					else if(this.klan_data.g_kills>data[glory].req_count[j]) cls='achieved';
					progress+='<span class="glory_lvl '+cls+'">'+lvl+'</span><span class="glory_val '+cls+'">'+this.dots(data[glory].req_count[j])+'</span>';
				}
				$('#glory_progress').html(progress);
				$('#challl_req').text(LNG['clan_challenge_req'+glory]);
				$('#challl_expires').html(this.showTimer(this.klan_data.g_expires-this.getTime()));
				$('#current_glory').text(LNG['klan_glory'+glory]);
				
				$('#curreny_glory').show();
				if(res.glory_tab){
					var data=res.glory_tab.sort(function(a,b){return b.value-a.value});
					var con='',len=data.length;
					for(var i=0;i<len;i++){
						con+='<b class="orange option" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].name+'</b> ['+this.dots(data[i].value)+']<br />';
					}
					$('#glory_principants').html(con);
				}
			}
			else $('#curreny_glory').hide();
			option_bind();
		break;
		case 12:
			if(res.planets){
				var data=res.planets;
				var len=data.length,con='';
				for(var i=0;i<len;i++){
					con+='<option value="'+data[i].id+'">'+data[i][this.lang]+'</option>';
				}
				$('#start_teleportation_list').html(con);
			}
			if(res.telep){
				var tp=res.telep;
				$('#kd_telep_target').text(tp[this.lang]);
				$('#kd_telep_pnum').text(tp.pnum);
				$('#kd_telep_pmax').text(this.klan_data.s6+this.klan_data.s6u)
				$('#already_telep').show();
				$('#new_telep').hide();
				var pdc='';
				var len=tp.players.length;
				for(var i=0;i<len;i++){
					pdc+='<b class="orange">'+tp.players[i].name+'</b> ';
				}
				$('#clan_tp_declared').html(pdc);
			}
			else{
				$('#new_telep').show();
				$('#already_telep').hide();
			}
			if(res.planetaries){
				var data=res.planetaries.sort(function(a,b){return b.reborn-a.reborn||b.moc-a.moc});
				var len=data.length,con='';
				for(var i=0;i<len;i++){
					var status='<button class="option btn_small_gold" data-option="clan_tp_assign" data-char_id="'+data[i].id+'">'+LNG.lab194+'</button>';
					if(!data[i].canTP) status='[<span class="red">'+LNG.lab257+'</span>]';
					con+='<tr><td><b class="option orange" data-option="show_player" data-char_id="'+data[i].id+'">'+data[i].name+'</b></td><td>'+this.rebPref(data[i].reborn)+this.dots(data[i].level)+'</td><td>'+this.dots(data[i].moc)+LNG.lab10+'</td><td>'+status+'</td></tr>';
				}
				$('#planetaries').html(con);
			}
			$('#stelep_counter').html(this.showTimer(res.planet_counter-this.getTime()));
			option_bind();
		break;
		case 11:
			var on_planet={};
			if(res.players){
				var players=res.players;
				var len=players.length;
				for(var i=0;i<len;i++){
					var loc=players[i].loc;
					if(!on_planet[loc]) on_planet[loc]=0;
					on_planet[loc]++;
				}
			}
			var data=res.planets;
			var len=data.length,con='',simple='<table class="tablen1">',clanp=0;
			for(var i=0;i<len;i++){
				akcja='',klann='---',czl=0,cls='';
				if(on_planet[data[i].loc_id]) czl=on_planet[data[i].loc_id];
				if(czl>0){
					cls='green';
					akcja='<button class="btn_small_gold option" data-option="invade_planet" data-planet="'+data[i].id+'">'+LNG.lab258+' ['+czl+']</button>';
				}
				if(data[i].klan_id>0){
					if(data[i].klan_id==this.char_data.klan_id) clanp++;
					klann='<span class="orange option" data-option="show_clan" data-klan_id="'+data[i].klan_id+'"><img class="emblem" src="'+data[i].emblem+'" /> '+data[i].klan_short+'</span>';
				}
				con+='<div class="planet_pos pos_'+data[i].id+'"><div class="planet_desc"><div class="planet planet_'+data[i].id+'"></div><div class="planet_val">'+data[i].kp+' <img src="/gfx/kp.png" /></div><div class="planet_rest"><b>'+data[i][this.lang]+'</b><br />'+klann+'<br />'+akcja+'</div></div></div>';
				simple+='<tr><td>&raquo; '+data[i][this.lang]+'</td><td>'+klann+'</td><td>'+data[i].kp+' <img src="/gfx/kp.png" /></td><td>'+akcja+'</td></tr>';
			}
			$('#clan_owned_planets').text(clanp);
			simple+='</table>';
			$('#clan_planets').html(con);
			$('#clan_planets_simple').html(simple);
			option_bind();
		break;
		case 10:
			var data=res.planet_buffs;
			var len=data.length,con='';
			for(var i=1;i<len;i++){
				var koszt=data[i].amount;
				var cls='',link='',cls1='',cls2='';
				if(this.klan_data.prp_buff>=i) cls='activied';
				if(this.klan_data.prp_buff==(i-1)) link='<button class="newBtn option" data-option="activate_prp_buff">'+LNG.lab99+'</button>';
				if(koszt>this.klan_data.planet_dp) cls2='red';
				con+='<tr class="'+cls+'"><td>'+i+'</td><td><span class="green">'+data[i].value+'</span>'+this.item_stat(data[i].attr)+'</td><td align="center" class="'+cls2+'">'+this.dots(koszt)+'</td><td>'+link+'</td></tr>';
			}
			$('#clan_planet_buffs').html(con);
			option_bind();
		break;
		case 8:
			var data=res.war_tab.sort(function(a,b){return b.kills-a.kills||a.deaths-b.deaths});
			var len=data.length,con='';
			var n=1;
			for(var i=0;i<len;i++){
				var cls='enemy';
				if(data[i].klan_id==this.char_data.klan_id) cls='ally';
				con+='<tr class="'+cls+'"><td>'+n+'</td><td><b class="orange option" data-option="show_player" data-char_id="'+data[i].char_id+'">'+data[i].name+'</b></td><td>'+data[i].kills+'</td><td>'+data[i].deaths+'</td><td>'+data[i].streak+'</td></tr>';
				n++;
			}
			$('#war_table').html(con);
			option_bind();
			this.page_switch('game_war_table');
		break;
		case 7:
			var data=res.declare_result;
			var len=data.length;
			var kom='';
			for(var i=0;i<len;i++){
				kom+='<b>'+data[i].short+'</b>: ';
				if(data[i].e) kom+='<span class="red">'+LNG['error'+data[i].e]+'</span>';
				if(data[i].done) kom+='<span>'+LNG['done'+data[i].done]+'</span>';
				kom+='<br />';
			}
			this.komunikat(kom);
		break;
		case 6: //wars
			var time=this.getTime();
			var data=res.wars,con1='<tr><td colspan="4"><b class="orange" align="left">&raquo; '+LNG.lab250+'</b></td></tr>',con2='<tr><td colspan="4"><b class="orange">&raquo; '+LNG.lab251+'</b></td></tr>',any1=false,any2=false;
			var len=data.length,own=0;
			for(var i=0;i<len;i++){
				var tmp='<tr><td>'+LNG.lab252+' <b class="option orange" data-option="show_clan" data-klan_id="'+data[i].klan1+'">'+data[i].short1+'</b> - <b class="option orange" data-option="show_clan" data-klan_id="'+data[i].klan2+'">'+data[i].short2+'</b></td><td>'+this.showTimer(data[i].expires-time)+'</td><td align="center"><b class="option orange" data-option="show_clan" data-klan_id="'+data[i].klan1+'">'+data[i].short1+'</b> <img src="'+data[i].emblem1+'" /> : <img src="'+data[i].emblem2+'" /> <b class="option orange" data-option="show_clan" data-klan_id="'+data[i].klan2+'">'+data[i].short2+'</b><br /> '+data[i].kills1+' : '+data[i].kills2+'</td></tr>';
				if(data[i].klan1==this.char_data.klan_id){
					con1+=tmp;
					own++;
					any1=true;
				}
				else{
					con2+=tmp;
					any2=true;
				}
			}
			if(!any1) con1+='<tr><td colspan="3" align="center">'+LNG.lab3+'</td></tr>';
			if(!any2) con2+='<tr><td colspan="3" align="center">'+LNG.lab3+'</td></tr>';
			$('#clan_wars').html(con1+con2);
			$('#current_wars').text(own);
			option_bind();
		break;
		case 5: //clan profile
			$('#player_desc_con').hide();
			var kd=res.klan_data;
			$('#kd_name').html('<img src="'+kd.emblem+'" />'+kd.short);
			$('#kd_logo').attr('src',kd.logo);
			$('#kd_opis').html(this.parseBB(kd.opis));
			$('#kd_level').text(this.dots(kd.level));
			$('#kd_war_won').text(this.dots(kd.war_wins));
			$('#kd_war_lost').text(this.dots(kd.war_loses));
			var players=res.players;
			$('#kd_current_players').text(players.length);
			var lim=17+kd.level*3;
			$('#kd_max_players').text(lim);
			$('#klan_desc_con').show();
			var con='',len=players.length;
			for(var i=0;i<len;i++){
				var online='<img src="/gfx/dots/5.png" />',ranga='',cls='orange';
				if(players[i].online) online='<img src="/gfx/dots/1.png" />';
				if(players[i].laws&&players[i].laws.rank) ranga='<span>( '+players[i].laws.rank+' )</span>';
				if(players[i].id==kd.chief_id) cls='green';
				con+='<div class="kd_player option" data-option="show_player" data-char_id="'+players[i].id+'">'+online+' <b class="'+cls+'">'+players[i].name+' '+ranga+'</b> '+this.rebPref(players[i].reborn)+this.dots(players[i].level)+'</div>';
			}
			$('#kd_players').html(con);
			var con='',data=res.structure_data;
			var len=this.clan_structs_cats.length;
			for(var c=1;c<len;c++){
				var lenw=this.clan_structs_cats[c].length;
				con+='<div class="clan_struct_header">&nbsp;</div>';
				for(var i=0;i<lenw;i++){
					var s=this.clan_structs_cats[c][i];
					if(kd['s'+s]==0) continue;
					var lvl=kd['s'+s]+'/'+data[s].max;
					if(kd['s'+s+'u']>0) lvl+=' <span class="orange">+ '+kd['s'+s+'u']+'</span>';
					var tooltip='';
					var fl=kd['s'+s]+kd['s'+s+'u'];
					var val=data[s].val*fl;
					if(data[s].stat){
						var pp='['+data[s].val+'/'+LNG.lab1+']',ads='';
						if(data[s].type){
							val=data[s].b1*fl*this.lvl_range(this.char_data.level);
							pp='';
						}
						if(data[s].stat2){
							var val2=data[s].val2*fl,pp2='['+data[s].val2+'/'+LNG.lab1+']';
							ads='<br /><span class=green>'+val2+'</span> '+this.item_stat(data[s].stat2)+' '+pp2+'';
						}
						tooltip+='<div class=tt><b>'+LNG.lab247+'</b>:<br /><span class=green>'+val+'</span> '+this.item_stat(data[s].stat)+' '+pp+' '+ads+'</div>';
					}
					if(data[s].clan_stat){
						var pp='['+data[s].val+'/'+LNG.lab1+']';
						tooltip+='<div class=tt><b>'+LNG.lab248+'</b>:<br /><span class=green>'+val+'</span> '+LNG['clan_stat'+data[s].clan_stat]+' '+pp+'</div>';
					}
					con+='<div class="clan_struct"><div class="stru_name" data-toggle="tooltip" data-original-title="'+tooltip+'"><b>'+LNG['klan_str'+s]+'</b> <div class="pull-right"><span class="grey">'+LNG.lab1+'</span> '+lvl+'</div></div></div>';
				}
			}
			$('#kd_structures').html(con);
			option_bind();
			tooltip_bind();
		break;
		case 4:
			$('#edit_clan_player').hide();
			var con='',data=res.players;
			var len=data.length,p=1;
			this.clan_players=data;
			for(var i=0;i<len;i++){
				var online='<img src="/gfx/dots/5.png" />',rank='',cls='',laws='';
				if(data[i].id==this.klan_data.chief_id) cls='isme';
				if(data[i].online) online='<img src="/gfx/dots/1.png" />';
				if(data[i].laws&&data[i].laws.rank) rank='('+data[i].laws.rank+')';
				var len2=this.clan_law_labels.length;
				for(var j=0;j<len2;j++){
					if((data[i].laws&&data[i].laws[this.clan_law_labels[j]])||data[i].id==this.klan_data.chief_id) laws+='<div class="claw has"></div>';
					else laws+='<div class="claw nop"></div>';
				}
				con+='<tr class="'+cls+'"><td>'+p+'</td><td class="cpl"><b class="orange option" data-option="show_player" data-char_id="'+data[i].id+'">'+online+' '+data[i].name+'</b> '+rank+'</td><td>'+this.rebPref(data[i].reborn)+this.dots(data[i].level)+'</td><td>'+this.dots(data[i].frags)+'</td><td>'+this.dots(data[i].clan_pu)+'</td><td>'+this.dots(data[i].trybut)+'</td><td>'+laws+'</td><td><button class="newBtn option" data-option="edit_clan_player" data-pind="'+i+'">'+LNG.lab249+'</button></td></tr>';
				p++;
			}
			$('#clan_mem_curr').text(len);
			$('#clan_players').html(con);
			option_bind();
		break;
		case 3:
			if(this.klan_data){
				var con='',data=res.castles;
				var len=data.length;
				for(var i=0;i<len;i++){
					var upg='',owner=LNG.village0;
					if(data[i].klan_id>0){
						owner='<b class="orange option" data-option="show_clan" data-klan_id="'+data[i].klan_id+'">'+data[i].klan_name+'</b>';
						if(data[i].klan_id==this.char_data.klan_id){
							if(data[i].level<10){
								var cls='';
								var need=this.castle_cost(data[i].level+1);
								if(need>this.klan_data.pu) cls='red';
								upg='<button class="option btn_small_gold" data-option="clan_castle_up" data-castle="'+data[i].id+'">'+LNG.lab56+'</button> <span class="'+cls+'">'+this.dots(need)+'</span> <img src="/gfx/pu.png" /> '+LNG.krank_pu;
							}
						}
						
					}
					con+='<div class="clan_fort"><span class="green option" data-option="quick_travel" data-loc="'+data[i].loc+'"><i class="upgrade_icon tpp"></i> '+data[i].location[this.lang]+' ['+data[i].x+'|'+data[i].y+']</span><br />'+LNG.lab1+' '+data[i].level+'<br />'+LNG.lab2+': '+owner+'<br />'+upg+'</div>';
				}
				$('#clan_castles').html(con);
				option_bind();
			}
		break;
		case 2:
			if(this.klan_data){
				var con='',data=res.structure_data;
				if(res.buff_data){		
					var time=this.getTime();
					var buff_data=res.buff_data;
					var buffs='';
					for(var b=1;b<=4;b++){
						var cls='',opts='';
						if(this.klan_data['buff'+b]>time){
							opts='<b class="green">'+LNG.lab13+'</b> '+LNG.lab51+' '+this.showTimer(this.klan_data['buff'+b]-time);
						}
						else{
							var cost=buff_data[b].cost_modifier*this.klan_data.players;
							if(cost>this.klan_data.gold) cls='red';
							opts=LNG.lab421+': <b class="'+cls+'">'+this.dots(cost)+'</b> <img src="/gfx/gold.png" /> <button class="newBtn option" data-option="activate_clan_buff" data-buff="'+b+'">'+LNG.lab99+'</button>';
						}
						var val=buff_data[b].val;
						if(buff_data[b].upgrading_clan_str){ 
							var slvl=this.klan_data['s'+buff_data[b].upgrading_clan_str]+this.klan_data['s'+buff_data[b].upgrading_clan_str+'u'];
							val+=data[buff_data[b].upgrading_clan_str].val*slvl;
						}
						buffs+='&raquo; <b>'+LNG['clan_buff'+b]+'</b><br /> <span class="green"><b>'+val+'</b>'+this.item_stat(buff_data[b].stat)+'</span><br />'+opts+'<br />';
					}
					$('#clan_daily_buffs').html(buffs);
				}
				
				var len=this.clan_structs_cats.length;
				for(var c=1;c<len;c++){
					var lenw=this.clan_structs_cats[c].length;
					con+='<div class="clan_struct_header">'+LNG['cscat'+c]+'</div>';
					for(var i=0;i<lenw;i++){
						var s=this.clan_structs_cats[c][i];
						var lvl=this.klan_data['s'+s]+'/'+data[s].max;
						if(this.klan_data['s'+s+'u']>0) lvl+=' <span class="orange">+ '+this.klan_data['s'+s+'u']+'</span>';
						var koszt='<button class="option newBtn" data-option="clan_struct_up" data-struct="'+s+'">'+LNG.lab69+'</button>';
						
								var cls='';
								var need=this.clan_struct_cost(1,s,this.klan_data['s'+s]);
								if(need>this.klan_data.kp) cls='red';
								koszt+='<span class="'+cls+'">'+need+' <img src="/gfx/kp.png" /></span>';
								
								var cls='';
								var need=this.clan_struct_cost(2,s,this.klan_data['s'+s]);
								if(need>this.klan_data.gold) cls='red';
								koszt+=' | <span class="'+cls+'">'+this.dots(need)+' <img src="/gfx/gold.png" /></span>';
								
								var cls='';
								var need=this.clan_struct_cost(3,s,this.klan_data['s'+s]);
								if(need>this.klan_data.prestige) cls='red';
								koszt+=' | <span class="'+cls+'">'+this.dots(need)+' <img src="/gfx/prestige.png" /></span>';
						
						var opts='<div class="stru_cost">'+koszt+'</div>';
						if(this.klan_data['s'+s]>=data[s].max) opts='<div class="stru_maxed">['+LNG.lab244+']</div>';
						if(this.klan_data['s'+s+'u']<this.klan_data['s'+s]){
							var cls='';
							var need=this.clan_str_upg_cost(this.klan_data['s'+s+'u']);
							if(need>this.klan_data.pu) cls='red';
							opts+='<div class="str_up"><button class="option newBtn" data-option="clan_struct_upgrade" data-struct="'+s+'">'+LNG.lab56+'</button> <span class="'+cls+'">'+this.dots(need)+' <img src="/gfx/pu.png" /></span></div>';
						}
						var tooltip='';
						var fl=this.klan_data['s'+s]+this.klan_data['s'+s+'u'];
						var val=data[s].val*fl;
						if(data[s].stat){ 
							var pp='['+data[s].val+'/'+LNG.lab1+']',ads='';
							if(data[s].type){
								val=data[s].b1*fl*this.lvl_range(this.char_data.level);
								pp='';
							}
							if(data[s].stat2){ 
								var val2=data[s].val2*fl,pp2='['+data[s].val2+'/'+LNG.lab1+']';
								ads='<br /><span class=green>'+val2+'</span> '+this.item_stat(data[s].stat2)+' '+pp2+'';
							}
							tooltip+='<div class=tt><b>'+LNG.lab247+'</b>:<br /><span class=green>'+val+'</span> '+this.item_stat(data[s].stat)+' '+pp+' '+ads+'</div>';
						}
						if(data[s].clan_stat){
							var pp='['+data[s].val+'/'+LNG.lab1+']';
							tooltip+='<div class=tt><b>'+LNG.lab248+'</b>:<br /><span class=green>'+val+'</span> '+LNG['clan_stat'+data[s].clan_stat]+' '+pp+'</div>';
						}
						con+='<div class="clan_struct"><div class="stru_name" data-toggle="tooltip" data-original-title="'+tooltip+'"><b>'+LNG['klan_str'+s]+'</b> <div class="pull-right"><span class="grey">'+LNG.lab1+'</span> '+lvl+'</div></div>'+opts+'</div>';
					}
				}
				$('#clan_structs').html(con);
				option_bind();
				tooltip_bind();
			}
		break;
		default:
			$('.clan_page').hide();
			if(res.klan_data){
				this.klan_data=res.klan_data;
				this.processClanData();
				$('#has_clan').show();
				$('.clan_inner_page').hide();
				$('#clan_inner_start').show();
			}
			else{
				$('#no_clan').show();
			}
		break;
	}
}
GAME.parseOrgData = function(res,type){
	switch(type){
		case 5: //clan profile
			$('.profile').hide();
			var kd=res.klan_data;
			$('#od_name').html(kd.short);
			$('#od_opis').html(this.parseBB(kd.opis));
			$('#od_level').text(this.dots(kd.level));
			$('#od_war_won').text(this.dots(kd.war_wins));
			$('#od_war_lost').text(this.dots(kd.war_loses));
			var players=res.players;
			$('#od_current_players').text(players.length);
			var lim=5+kd.level*3;
			$('#od_max_players').text(lim);
			$('#org_desc_con').show();
			var con='',len=players.length;
			for(var i=0;i<len;i++){
				var online='<img src="/gfx/dots/5.png" />',ranga='',cls='orange';
				if(players[i].online) online='<img src="/gfx/dots/1.png" />';
				//if(players[i].laws&&players[i].laws.rank) ranga='<span>( '+players[i].laws.rank+' )</span>';
				if(players[i].id==kd.chief_id) cls='green';
				con+='<div class="kd_player option" data-option="show_player" data-char_id="'+players[i].id+'">'+online+' <b class="'+cls+'">'+players[i].name+' '+ranga+'</b> '+this.rebPref(players[i].reborn)+this.dots(players[i].level)+'</div>';
			}
			$('#od_players').html(con);
			var con='',data=res.structure_data;
			var len=this.org_structs_cats.length;
			for(var c=1;c<len;c++){
				var lenw=this.org_structs_cats[c].length;
				con+='<div class="clan_struct_header">&nbsp;</div>';
				for(var i=0;i<lenw;i++){
					var s=this.org_structs_cats[c][i];
					if(kd['s'+s]==0) continue;
					var lvl=kd['s'+s]+'/'+data[s].max;
					if(kd['s'+s+'u']>0) lvl+=' <span class="orange">+ '+kd['s'+s+'u']+'</span>';
					var tooltip='';
					var fl=kd['s'+s];
					var val=data[s].val*fl;
					if(data[s].stat){
						var pp='['+data[s].val+'/'+LNG.lab1+']',ads='';
						if(data[s].stat2){
							var val2=data[s].val2*fl,pp2='['+data[s].val2+'/'+LNG.lab1+']';
							ads='<br /><span class=green>'+val2+'</span> '+this.item_stat(data[s].stat2)+' '+pp2+'';
						}
						tooltip+='<div class=tt><b>'+LNG.lab247+'</b>:<br /><span class=green>'+val+'</span> '+this.item_stat(data[s].stat)+' '+pp+' '+ads+'</div>';
					}
					con+='<div class="clan_struct"><div class="stru_name" data-toggle="tooltip" data-original-title="'+tooltip+'"><b>'+LNG['org_str'+s]+'</b> <div class="pull-right"><span class="grey">'+LNG.lab1+'</span> '+lvl+'</div></div></div>';
				}
			}
			$('#od_structures').html(con);
			option_bind();
			tooltip_bind();
		break;
		case 4:
			var con='',data=res.players;
			var len=data.length,p=1;
			this.org_players=data;
			for(var i=0;i<len;i++){
				var opts='';
				var online='<img src="/gfx/dots/5.png" />',rank='',cls='',laws='';
				if(data[i].id==this.org_data.chief_id) cls='isme';
				if(data[i].online) online='<img src="/gfx/dots/1.png" />';
				/*
				if(data[i].laws&&data[i].laws.rank) rank='('+data[i].laws.rank+')';
				var len2=this.clan_law_labels.length;
				for(var j=0;j<len2;j++){
					if((data[i].laws&&data[i].laws[this.clan_law_labels[j]])||data[i].id==this.org_data.chief_id) laws+='<div class="claw has"></div>';
					else laws+='<div class="claw nop"></div>';
				}
				*/
				if(this.org_data.chief_id==this.char_id&&data[i].id!=this.org_data.chief_id) opts='<button class="newBtn option" data-option="org_player_out" data-char_id="'+data[i].id+'">'+LNG.lab441+'</button> <button class="newBtn option" data-option="org_player_leader" data-char_id="'+data[i].id+'">'+LNG.lab442+'</button>';
				con+='<tr class="'+cls+'"><td>'+p+'</td><td class="cpl"><b class="orange option" data-option="show_player" data-char_id="'+data[i].id+'">'+online+' '+data[i].name+'</b> '+rank+'</td><td>'+this.rebPref(data[i].reborn)+this.dots(data[i].level)+'</td><td>'+opts+'</td></tr>';
				p++;
			}
			$('#org_mem_curr').text(len);
			$('#org_players').html(con);
			option_bind();
		break;
		case 2:
			if(this.org_data){
				var con='',data=res.structure_data;
				
				var len=this.org_structs_cats.length;
				for(var c=1;c<len;c++){
					var lenw=this.org_structs_cats[c].length;
					con+='<div class="clan_struct_header">'+LNG['oscat'+c]+'</div>';
					for(var i=0;i<lenw;i++){
						var s=this.org_structs_cats[c][i];
						var lvl=this.org_data['s'+s]+'/'+data[s].max;
						if(this.org_data['s'+s+'u']>0) lvl+=' <span class="orange">+ '+this.org_data['s'+s+'u']+'</span>';
						var koszt='<button class="option newBtn" data-option="org_struct_up" data-struct="'+s+'">'+LNG.lab69+'</button>';
						var cls='';
						var need=this.org_data['s'+s]+1;
						if(need>this.org_data.kp) cls='red';
						koszt+='<span class="'+cls+'">'+need+' <img src="/gfx/kp.png" /></span>';
								
						var cls='';
						var need=this.clan_struct_cost(2,200+s,this.org_data['s'+s]);
						if(need>this.org_data.gold) cls='red';
						koszt+=' | <span class="'+cls+'">'+this.dots(need)+' <img src="/gfx/gold.png" /></span>';
							
						var opts='<div class="stru_cost">'+koszt+'</div>';
						if(this.org_data['s'+s]>=data[s].max) opts='<div class="stru_maxed">['+LNG.lab244+']</div>';
						var tooltip='';
						var fl=this.org_data['s'+s];
						var val=data[s].val*fl;
						if(data[s].stat){
							var pp='['+data[s].val+'/'+LNG.lab1+']',ads='';
							if(data[s].stat2){ 
								var val2=data[s].val2*fl,pp2='['+data[s].val2+'/'+LNG.lab1+']';
								ads='<br /><span class=green>'+val2+'</span> '+this.item_stat(data[s].stat2)+' '+pp2+'';
							}
							tooltip+='<div class=tt><b>'+LNG.lab247+'</b>:<br /><span class=green>'+val+'</span> '+this.item_stat(data[s].stat)+' '+pp+' '+ads+'</div>';
						}
						con+='<div class="clan_struct"><div class="stru_name" data-toggle="tooltip" data-original-title="'+tooltip+'"><b>'+LNG['org_str'+s]+'</b> <div class="pull-right"><span class="grey">'+LNG.lab1+'</span> '+lvl+'</div></div>'+opts+'</div>';
					}
				}
				$('#org_structs').html(con);
				option_bind();
				tooltip_bind();
			}
		break;
		default:
			$('.org_page').hide();
			if(res.klan_data){
				this.org_data=res.klan_data;
				this.processOrgData();
				$('#has_org').show();
				$('.org_inner_page').hide();
				$('#org_inner_start').show();
			}
			else{
				$('#no_org').show();
			}
		break;
	}
}
GAME.clan_str_upg_cost = function(lvl){
	lvl++;
	return (lvl*7500)*lvl;
}
GAME.orgLogParse = function(ev,p1,p2,s1,s2){
	var player1=s1;
	var player2=s2;
	var log='';
	switch(ev){
			case 1: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['org_log1']; break;
			case 2: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log2']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 3: log='<a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a> '+LNG['klan_log3']+' <a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a>.'; break;
			case 4: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['org_log4']; break;
			case 5: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['org_log5']; break;
			case 6: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['org_log6']; break;
			case 7: log='<a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a> '+LNG['klan_log7']+' <a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a>.'; break;
			case 8: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log8']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 9: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['org_log9']+' <b>'+p2+'</b> <img src="/gfx/kp.png" align=absmiddle>.'; break;
			case 10: log=LNG['klan_log10']+' <b>'+s1+'</b> '+LNG['klan_log11']+'!'; break;
			case 11: log=LNG['klan_log10']+' <b>'+s1+'</b> '+LNG['klan_log12']+' <a href="game.php?a=klan&c=view_clan&id='+p2+'">'+player2+'</a>!'; break;
			case 12: log=LNG['klan_log10']+' <b>'+s1+'</b> '+LNG['klan_log13']+' <a href="game.php?a=klan&c=view_clan&id='+p2+'">'+player2+'</a>, '+LNG['klan_log14']+'!'; break;
			case 13: log=LNG['klan_log15']+' <b>'+s1+'</b> '+LNG['klan_log16']+' <a href="game.php?a=klan&c=view_clan&id='+p2+'">'+player2+'</a>!'; break;
			case 14: log=LNG['klan_log17']+' '+p2+' <img src="/gfx/kp.png"> '+LNG['klan_log18']+' <b>'+s1+'</b>'; break;
			case 15: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log19']+' <a href="game.php?a=klan&c=view_clan&id='+p2+'">'+player2+'</a>.'; break;
			case 16: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['org_log20']+' <b>'+LNG['org_str'+p2]+'</b>.'; break;
			case 17: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log21']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 18: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log22']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 19: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['org_log23']; break; //inicjuje wyzwanie klanowe!
			case 20: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['org_log24']; break; //kończy wyzwanie! Rezultat: <b class="bora">Sukces</b>!
			case 21: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log25']; break; //kończy wyzwanie! Rezultat: <b class="wora">Porażka</b>!
			case 22: log=LNG['klan_log26']+' <b class="wora">'+s1+'</b> <img src="/gfx/kp.png"> '+LNG['klan_log27']; break; //Klan otrzymuje za rekord wygranych wojen!
			case 23: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log28']; break; //wybudował Siedzibę klanową!
			case 24: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log29']+' '+p2+'!'; break; //ulepsza Siedzibę klanową do poziomu
			case 25: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log29']+' '+p2+'!'; break;
			case 26: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log30']+' <b>'+LNG['org_str'+p2]+'</b>!'; break; //ulepsza strukturę
			case 27: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log31']+' <b>'+p2+'</b> '+LNG['klan_log32']+'!'; break; //przekazuje symbole o wartości PU
			case 28: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log33']; break; //aktywuje buff wojenny!
			case 29: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log34']; break; //kupuje Planetę Klanową!
			case 30: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log35']+' <b>'+p2+'</b>'; break; //kupuje Planetę Klanową!
			case 31: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log36']; break; //wykonuje zadanie na planecie klanowej!
			case 32: log=LNG['klan_log37']+'<b>'+p1+'</b> <img src="/gfx/kp.png" /> '+LNG['klan_log37b']+' +<b>'+this.dots(p2)+'</b>'; break; //boss pokonany
			case 33: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log38']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>'; break; //usuwa status klanowej postaci x!
			case 34: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log39']; break; //aktywuje buff planetarny!
			case 35: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log40']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 36: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log41']; break; //aktywuje buff planetarny!
			case 37: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['org_log42']; break; //edytuje tekst/profil klanu
			case 38: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log43']+' <b class="green">'+p2+'</b> <img src="/gfx/kp.png" />'; break; //pomyślna ekspedycja
			case 39: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log44']; break; //nieudana ekspedycja
			case 40: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log45']; break; //telepotruje
			case 41: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log9']+' <b>'+this.dots(p2)+'</b> <img src="/gfx/gold.png" align=absmiddle>.'; break;
			case 42: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log46']+' <b>'+this.dots(p2)+'</b>.'; break;
			case 43: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log47']+' <b>'+LNG['clan_buff'+p2]+'</b>.'; break;
			case 44: log='<b>'+LNG['village'+p1]+'</b> '+LNG['org_log48']+''; break;
	}
	return log;
}
GAME.clanLogParse = function(ev,p1,p2,s1,s2){
	var player1=s1;
	var player2=s2;
	var log='';
	switch(ev){
			case 1: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log1']; break;
			case 2: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log2']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 3: log='<a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a> '+LNG['klan_log3']+' <a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a>.'; break;
			case 4: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log4']; break;
			case 5: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log5']; break;
			case 6: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log6']; break;
			case 7: log='<a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a> '+LNG['klan_log7']+' <a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a>.'; break;
			case 8: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log8']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 9: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log9']+' <b>'+p2+'</b> <img src="/gfx/kp.png" align=absmiddle>.'; break;
			case 10: log=LNG['klan_log10']+' <b>'+s1+'</b> '+LNG['klan_log11']+'!'; break;
			case 11: log=LNG['klan_log10']+' <b>'+s1+'</b> '+LNG['klan_log12']+' <a href="game.php?a=klan&c=view_clan&id='+p2+'">'+player2+'</a>!'; break;
			case 12: log=LNG['klan_log10']+' <b>'+s1+'</b> '+LNG['klan_log13']+' <a href="game.php?a=klan&c=view_clan&id='+p2+'">'+player2+'</a>, '+LNG['klan_log14']+'!'; break;
			case 13: log=LNG['klan_log15']+' <b>'+s1+'</b> '+LNG['klan_log16']+' <a href="game.php?a=klan&c=view_clan&id='+p2+'">'+player2+'</a>!'; break;
			case 14: log=LNG['klan_log17']+' '+p2+' <img src="/gfx/kp.png"> '+LNG['klan_log18']+' <b>'+s1+'</b>'; break;
			case 15: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log19']+' <a href="game.php?a=klan&c=view_clan&id='+p2+'">'+player2+'</a>.'; break;
			case 16: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log20']+' <b>'+LNG['klan_str'+p2]+'</b>.'; break;
			case 17: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log21']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 18: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log22']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 19: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log23']; break; //inicjuje wyzwanie klanowe!
			case 20: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log24']; break; //kończy wyzwanie! Rezultat: <b class="bora">Sukces</b>!
			case 21: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log25']; break; //kończy wyzwanie! Rezultat: <b class="wora">Porażka</b>!
			case 22: log=LNG['klan_log26']+' <b class="wora">'+s1+'</b> <img src="/gfx/kp.png"> '+LNG['klan_log27']; break; //Klan otrzymuje za rekord wygranych wojen!
			case 23: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log28']; break; //wybudował Siedzibę klanową!
			case 24: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log29']+' '+p2+'!'; break; //ulepsza Siedzibę klanową do poziomu
			case 25: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log29']+' '+p2+'!'; break;
			case 26: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log30']+' <b>'+LNG['klan_str'+p2]+'</b>!'; break; //ulepsza strukturę
			case 27: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log31']+' <b>'+p2+'</b> '+LNG['klan_log32']+'!'; break; //przekazuje symbole o wartości PU
			case 28: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log33']; break; //aktywuje buff wojenny!
			case 29: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log34']; break; //kupuje Planetę Klanową!
			case 30: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log35']+' <b>'+p2+'</b>'; break; //kupuje Planetę Klanową!
			case 31: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log36']; break; //wykonuje zadanie na planecie klanowej!
			case 32: log=LNG['klan_log37']+'<b>'+p1+'</b> <img src="/gfx/kp.png" /> '+LNG['klan_log37b']+' +<b>'+this.dots(p2)+'</b>'; break; //boss pokonany
			case 33: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log38']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>'; break; //usuwa status klanowej postaci x!
			case 34: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log39']; break; //aktywuje buff planetarny!
			case 35: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log40']+' <a class="orange option" data-option="show_player" data-char_id="'+p2+'">'+player2+'</a>.'; break;
			case 36: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log41']; break; //aktywuje buff planetarny!
			case 37: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log42']; break; //edytuje tekst/profil klanu
			case 38: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log43']+' <b class="green">'+p2+'</b> <img src="/gfx/kp.png" />'; break; //pomyślna ekspedycja
			case 39: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log44']; break; //nieudana ekspedycja
			case 40: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log45']; break; //telepotruje
			case 41: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log9']+' <b>'+this.dots(p2)+'</b> <img src="/gfx/gold.png" align=absmiddle>.'; break;
			case 42: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log46']+' <b>'+this.dots(p2)+'</b>.'; break;
			case 43: log='<a class="orange option" data-option="show_player" data-char_id="'+p1+'">'+player1+'</a> '+LNG['klan_log47']+' <b>'+LNG['clan_buff'+p2]+'</b>.'; break;
			case 44: log=LNG['klan_log48']+' <b>'+player1+'</b>.'; break;
			case 45: log='<a class="orange option" data-option="show_clan" data-klan_id="'+p1+'">'+player1+'</a> '+LNG['klan_log49']+' <b>'+player2+'</b>.'; break;
			case 46: log=LNG['klan_log50']+': <b>'+p1+'</b> <img src="/gfx/kp.png" align=absmiddle> + <b>'+p2+'</b> '+LNG.quest_prize23+'.'; break;
	}
	return log;
}
GAME.parseClanLog = function(res){
	var pagi='';
	var pages=res.all_pages;
	var page=res.page;
	var pagi=LNG.lab272+' <b>'+page+'</b>/<b>'+pages+'</b> <button class="option newBtn" data-option="show_clan_log" data-page="'+(page-1)+'"><<</button> <button class="option newBtn" data-option="show_clan_log" data-page="'+(page+1)+'">>></button>';
	$('#clan_log_pagi').html(pagi);
	var data=res.logs;
	var con='',len=data.length;
	for(var i=0;i<len;i++){
		var logg=this.clanLogParse(data[i].action,data[i].player1,data[i].player2,data[i].s1,data[i].s2);
		con+='<div class="clan_log">'+this.convertTime(data[i].time)+': '+logg+'</div>';
	}
	$('#clan_log').html(con);
	option_bind();
}
GAME.parseOrgLog = function(res){
	var pagi='';
	var pages=res.all_pages;
	var page=res.page;
	var pagi=LNG.lab272+' <b>'+page+'</b>/<b>'+pages+'</b> <button class="option newBtn" data-option="show_org_log" data-page="'+(page-1)+'"><<</button> <button class="option newBtn" data-option="show_org_log" data-page="'+(page+1)+'">>></button>';
	$('#org_log_pagi').html(pagi);
	var data=res.logs;
	var con='',len=data.length;
	for(var i=0;i<len;i++){
		var logg=this.orgLogParse(data[i].action,data[i].player1,data[i].player2,data[i].s1,data[i].s2);
		con+='<div class="clan_log">'+this.convertTime(data[i].time)+': '+logg+'</div>';
	}
	$('#org_log').html(con);
	option_bind();
}
GAME.parseClanInvites = function(res,target){
	if(target==1){
		var data=res.invs;
		var con='',len=data.length;
		for(var i=0;i<len;i++){
			con+='<div class="clan_inv"><b class="orange option" data-option="show_player" data-char_id="'+data[i].player_id+'">'+data[i].player_name+'</b> <button class="btn_small_gold option" data-option="cancel_inv" data-inv="'+data[i].id+'">'+LNG.lab78+'</button></div>';
		}
		$('#clan_invites').html(con);
	}
	else{
		var data=res.own_invs;
		var con='',len=data.length;
		for(var i=0;i<len;i++){
			con+='<div class="clan_inv">&raquo; <b class="orange option" data-option="show_clan" data-klan_id="'+data[i].klan_id+'">'+data[i].klan_name+'</b> <button class="btn_small_gold option" data-option="inv_decision" data-dec="1" data-inv="'+data[i].id+'">'+LNG.lab195+'</button> <button class="btn_small_gold option" data-option="inv_decision" data-dec="2"  data-inv="'+data[i].id+'">'+LNG.lab194+'</button></div>';
		}
		$('#no_clan_invs').html(con)
	}
	option_bind();
}
GAME.parseOrgInvites = function(res,target){
	if(target==1){
		var data=res.invs;
		var con='',len=data.length;
		for(var i=0;i<len;i++){
			con+='<div class="clan_inv"><b class="orange option" data-option="show_player" data-char_id="'+data[i].player_id+'">'+data[i].player_name+'</b> <button class="btn_small_gold option" data-option="cancel_oinv" data-inv="'+data[i].id+'">'+LNG.lab78+'</button></div>';
		}
		$('#org_invites').html(con);
	}
	else{
		var data=res.own_invs;
		var con='',len=data.length;
		for(var i=0;i<len;i++){
			con+='<div class="clan_inv">&raquo; <b class="orange option" data-option="show_org" data-org_id="'+data[i].org_id+'">'+data[i].org_name+'</b> <button class="btn_small_gold option" data-option="oinv_decision" data-dec="1" data-inv="'+data[i].id+'">'+LNG.lab195+'</button> <button class="btn_small_gold option" data-option="oinv_decision" data-dec="2" data-inv="'+data[i].id+'">'+LNG.lab194+'</button></div>';
		}
		$('#no_org_invs').html(con)
	}
	option_bind();
}
GAME.parseWars = function(res){
	var time=this.getTime();
	if(res.hasOwnProperty('wars')){
		var data=res.wars;
		this.clan_wars=data;
		var len=data.length;
		this.clan_enemies=[];
		if(len>0){
			var list='';
			for(var i=0;i<len;i++){
				if(this.char_data.klan_id==data[i].klan1) this.clan_enemies.push(data[i].klan2);
				else this.clan_enemies.push(data[i].klan1);
				if(data[i].klan1){
					list+='<div class="option" data-option="show_clan_war_table" data-war_id="'+data[i].id+'">'+LNG.lab253+'<br /><img class="option" data-option="show_clan" data-klan_id="'+data[i].klan1+'" src="'+data[i].emblem1+'" /> <span id="war_'+data[i].id+'_s1" class="green">'+this.dots(data[i].kills1)+'</span> : <span id="war_'+data[i].id+'_s2" class="green">'+this.dots(data[i].kills2)+'</span> <img class="option" data-option="show_clan" data-klan_id="'+data[i].klan2+'" src="'+data[i].emblem2+'" /><br />'+this.showTimer(data[i].expires-time)+'</div>';
				}
			}
			$('#war_list').html(list);
		}
	}
	if(res.hasOwnProperty('ewars')){
		var data=res.ewars;
		this.emp_wars=data;
		var len=data.length;
		this.emp_enemies=[];
		this.org_enemies=[];
		if(len>0){
			var list='';
			for(var i=0;i<len;i++){
				var op=-1,org1='',org2='',opor=-1;
				if(this.char_data.ranga==8){
					if(this.char_data.org==data[i].org_1){
						op=data[i].village_2;
						if(data[i].org_2) opor=data[i].org_2;
					}
					else{
						op=data[i].village_1;
						if(data[i].org_1) opor=data[i].org_1;
					}
				}
				else{
					if(this.char_data.village_id==data[i].village_1){
						op=data[i].village_2;
						if(data[i].org_2) opor=data[i].org_2;
					}
					else{
						op=data[i].village_1;
						if(data[i].org_1) opor=data[i].org_1;
					}
				}
				this.emp_enemies.push(op);
				if(opor>=0) this.org_enemies.push(opor);
				if(data[i].org_1) org1='<b>'+data[i].org_1_name+'</b>';
				if(data[i].org_2) org2='<b>'+data[i].org_2_name+'</b>';
				list+='<div class="option emp" data-option="emp_war_table" data-war="'+data[i].id+'">'+LNG['empirewar'+data[i].war_type]+'<br /><img src="/gfx/villages/head/'+data[i].village_1+'.png" /> <span id="ewar_'+data[i].id+'_s1" class="green">'+this.dots(data[i].score_1)+'</span> : <span id="ewar_'+data[i].id+'_s2" class="green">'+this.dots(data[i].score_2)+'</span> <img src="/gfx/villages/head/'+data[i].village_2+'.png" /><br />'+org1+' '+this.showTimer(data[i].expires-time)+' '+org2+'</div>';
			}
			$('#ewar_list').html(list);
		}
	}
	$('#emp_war_cnt').text(this.emp_wars.length);
	$('#clan_war_cnt').text(this.clan_wars.length);
	var len=this.clan_wars.length+this.emp_wars.length;
	if(len>0){
		$('#war_cnt').text(len);
		option_bind();
		$('#war_container').show();
	}
	else $('#war_container').hide();
}

GAME.abimix = function(cat,cat2){
		switch(cat){
			case 1: return [8]; break;
			case 2: return [9]; break;
			case 3: return [10]; break;
			case 4: 
				switch(cat2){
					case 1: return [11,1]; break;
					case 2: return [11,2]; break;
					case 3: return [11,3]; break;
					case 4: return [11,4]; break;
					case 5: return [11,5]; break;
					default: return [11]; break;
				}
			break;
			case 5: return [6]; break;
			case 6: return [7]; break;
			case 7: return [12]; break;
			case 8:
				switch(cat2){
					case 0: return [3,2];
					case 99: return [3,2];
					case 1: return [4,2];
					case 2: return [3,4];
					case 3: return [3,5];
					case 4: return [3,1];
					case 5: return [5,2];
					case 6: return [4,1];
					case 7: return [1,2];
					case 8: return [5,1];
					case 9: return [5,4];
					case 10: return [8,1];
					case 11: return [8,2];
					case 12: return [8,3];
					case 13: return [8,4];
					case 14: return [8,5];
					case 15: return [9,1];
					case 16: return [9,2];
					case 17: return [9,3];
					case 18: return [9,4];
					case 19: return [9,5];
					case 20: return [10,1];
					case 21: return [10,2];
					case 22: return [10,3];
					case 23: return [10,4];
					case 24: return [10,5];
					case 25: return [6];
					case 26: return [11,6];
				}
			break;
			case 9:
				switch(cat2){
					case 1: return [1,2,3];
					case 2: return [1,2,4];
					case 3: return [1,2,5];
					case 4: return [1,3,4];
					case 5: return [1,3,5];
					case 6: return [1,4,5];
					case 7: return [2,3,4];
					case 8: return [2,3,5];
					case 9: return [2,4,5];
					case 10: return [3,4,5];
					case 11: return [6];
					case 12: return [6];
					case 13: return [6];
					case 14: return [8];
					case 15: return [8];
					case 16: return [9];
					case 17: return [9];
					case 18: return [10];
					case 19: return [10];
				}
			break;
			case 10: return [11];
			case 11: return [13];
			case 12: return [12];
		}
}

GAME.skill_effect_desc = function(id,val,tclass){
	switch(id){
		case 1: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC1']; //szans na ogłuszenie przeciwnika
		case 2: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC2']; //szans na zamrożenie przeciwnika
		case 3: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC3']; //szans na sparaliżowanie przeciwnika
		case 4: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC4']; //szans na zdezorientowanie przeciwnika
		case 5: return LNG['FUN_SKILDESC5']+' <strong>'+val+'</strong>'; //Absorpcja chakry :
		case 6: return LNG['FUN_SKILDESC6']+' +<strong>'+val+'</strong>'; //Zwiększenie obrażeń fizycznych
		case 7: return LNG['FUN_SKILDESC7']+' -<strong>'+val+'</strong>'; //Zmniejszenie pancerza
		case 8: return LNG['FUN_SKILDESC8']+'<strong>'+val+'</strong>'+LNG['FUN_SKILDESC8b']; //Otwarcie x bram chakry
		case 9: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC9']; //szans na wywołanie krwawienia
		case 10: return LNG['FUN_SKILDESC10']+' +<strong>'+val+'</strong>'; //Zwiększenie szybkości i siły woli
		case 11: return LNG['FUN_SKILDESC11']+' -<strong>'+val+'</strong>'; //Zmniejszenie obrażeń fizycznych
		case 12: return LNG['FUN_SKILDESC12']+' -<strong>'+val+'</strong>'; //Zmniejszenie szybkości i siły woli
		case 13: return LNG['FUN_SKILDESC13']+'<strong>'+val+'</strong>'; //Słaby klon-iluzja x
		case 14: return LNG['FUN_SKILDESC14']+' <strong>'+val+'</strong>'; //Rozproszenia iluzji o sile
		case 15: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC15']; //szans na uwięzienie przeciwnika
		case 16: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC16']+' <b>'+LNG['ninja_class'+tclass]+'</b>'; //szans na zablokowanie kolejnego ataku
		case 17: return LNG['FUN_SKILDESC17']+' ('+LNG.lab1+' <strong>'+val+'</strong>)'; //Przywołanie zmarłego bohatera
		case 18: return LNG['FUN_SKILDESC18']+' '+LNG['element'+val]; //Klon żywiołu:
		case 19: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC19']; //szans na podpalenie przeciwnika
		case 20: return LNG['FUN_SKILDESC20']; //Aktywuje ziemną trumnę
		case 21: return LNG['FUN_SKILDESC21']; //Aktywuje lodowe lustra
		case 22: return '<strong>'+val+'</strong> '+LNG['FUN_SKILDESC22']; //poziom genjutsu
		case 23: return LNG['FUN_SKILDESC23']+' ('+LNG.lab1+' <strong>'+val+'</strong>)'; //Przywołanie zwierzęcia
		case 24: return LNG['FUN_SKILDESC24']; //Aktywuje piaskową trumnę
		case 25: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC25']; //szans na usunięcie statusów
		case 26: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC26']; //leczenia
		case 27: return LNG['FUN_SKILDESC27']+' +<strong>'+val+'</strong>'; //Zwiększenie obrażeń mentalnych
		case 28: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC28']; //zwiększenie celności technik mentalnych
		case 29: return LNG['FUN_SKILDESC29']+' x<strong>'+val+'</strong>';  //Utworzenie klonów cienia
		case 30: return LNG['FUN_SKILDESC30']+' +<strong>'+val+'</strong>';  //Zwiększenie pancerza
		case 31: return LNG['FUN_SKILDESC31']+' <strong>'+val+'</strong>% '+LNG['fight_label1']; //Aktywuje tarczę odbijającą % obr
		case 32: return LNG['FUN_SKILDESC32']+' +<strong>'+val+'</strong>%';  //Zużycie chakry
		case 33: return LNG['FUN_SKILDESC33']+' <strong>'+val+'</strong>%';  //Szansa na przejęcie kontroli nad celem:
		case 34: return LNG['FUN_SKILDESC34']; //Aktywuje Paraliż Cieni
		case 35: return LNG['FUN_SKILDESC35']+' ('+LNG.lab1+' <strong>'+val+'</strong>)'; //Przywołanie Nietoperzy
		case 36: return LNG['FUN_SKILDESC36']+' <strong>'+val+'</strong>% HP'; //Wskrzeszenie sojuszniczego gracza z
		case 37: return LNG['FUN_SKILDESC37']+' <strong>'+val+'</strong>% HP';  //Poświęcenie własnych
		case 38: return LNG['FUN_SKILDESC38']+' <strong>'+val+'</strong>% '+LNG['FUN_SKILDESC38b'];  //Wskrzeszenie wrogiego gracza z HP i zmuszenie do walki po własnej stronie
		case 39: return LNG['FUN_SKILDESC39']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC39b'];  //Reinkarnacja z HP, gdy efekt jest aktywny
		case 40: return LNG['FUN_SKILDESC40']+' ('+LNG.lab1+' <strong>'+val+'</strong>)'; //Przywołanie Zombie
		case 41: return LNG['FUN_SKILDESC41']+' ('+LNG.lab1+' <strong>'+val+'</strong>)'; //Przywołanie Tajemnego Strażnika
		case 42: return LNG['FUN_SKILDESC42']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC42b']; //Wysysająca tarcza, która absorbuje  %Chakry każdego kto zaatakuje użytkownika
		case 43: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC43']; //szans na całkowite zablokowanie ataku mentalnego oraz zaabsorbowanie jej chakry
		case 44: return LNG['FUN_SKILDESC44']; //Detonuje wybuchową glinę zgromadzoną na polu walki
		case 45: return LNG['FUN_SKILDESC45']+'<strong>'+val+'</strong>'; //Tworzy wybuchową glinę C1 o sile 
		case 46: return LNG['FUN_SKILDESC46']+'<strong>'+val+'</strong>';
		case 47: return LNG['FUN_SKILDESC47']+'<strong>'+val+'</strong>'; 
		case 48: return LNG['FUN_SKILDESC48']+'<strong>'+val+'</strong>'; 
		case 49: return LNG['FUN_SKILDESC49']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC49b'];  //Podpalająca aura, która ma  szans na podpalenie każdego kto zaatakuje użytkownika
		case 50: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC50']; //szans na ominięcie blokady
		case 51: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC51']; //szans na przerwanie przywołań i blokad
		case 52: return LNG['FUN_SKILDESC52']+'<strong>'+val+'</strong>%'; //Bonus obrażeń techniki Jiton 
		case 53: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC53']; //redukcji obrażeń
		case 54: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC54']; //do szansy na podpalenie
		case 55: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC55']; //do szansy na krwawienie
		case 56: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC56']; //do szansy na paraliż
		case 57: return LNG['FUN_SKILDESC57']; //Aktywacja Sharingana
		case 58: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC58']; //do odporności na genjutsu
		case 59: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC59']; //szans na odbicie technik genjutsu
		case 60: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC60']; //szans na wyrwanie z uwięzienia
		case 61: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC61']; //szans na zignorowanie wszelkich technik wymierzonych przeciw użytkownikowi
		case 62: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC62']; //szans na zignorowanie blokad
		case 63: return LNG['FUN_SKILDESC63a']+'+<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC63']; //Aktywacja aury specjalnej. 
		case 64: return LNG['FUN_SKILDESC63a']+'+<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC64']; //do odporności na statusy puki użytkownik żyje
		case 65: return LNG['FUN_SKILDESC63a']+'+<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC65']; //do obrażeń puki użytkownik żyje
		case 66: return LNG['FUN_SKILDESC63a']+'+<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC66']; //leczenia co każdą turę puki użytkownik żyje
		case 67: return LNG['FUN_SKILDESC67']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC67b']; //Przywołanie potężnego klona. Będzie posiadał statystyk użytkownika
		case 68: return LNG['FUN_SKILDESC68']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC68b']; //Przywołanie specjalnego klona. Będzie absorbował otrzymanych obrażeń. Spowoduje wybuch przy śmierci
		case 69: return LNG['FUN_SKILDESC69']; //Aktywacja aury specjalnej. Przekierowanie wszystkich ataków na użytkownika
		case 70: return LNG['FUN_SKILDESC70']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC70b']; //Aktywacja bariery absorbującej obrażeń i zamieniającej je w chakrę dla użytkownika
		case 71: return LNG['FUN_SKILDESC71']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC71b']; //zamienia obrażeń w własne punkty życia
		case 72: return LNG['FUN_SKILDESC72']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC72b']; //Aktywacja aury wyssania  życia, gdy przeciwnik zaatakuje użytkownika
		case 73: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC73']; //do efektywności technik absorpcji
		case 74: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC74']; //szansa na użycie techniki bez poboru chakry
		case 75: return LNG['FUN_SKILDESC75']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC75b']; //Przekierowuje obrażeń w chakrę zamiast punkty życia
		case 76: return LNG['FUN_SKILDESC76']+'<strong>'+val+'</strong>%';  //Szansa na przejęcie całkowitej kontroli nad celem:
		case 77: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC77']; //szansa nieprawidłowe użycie techniki
		case 78: return LNG['FUN_SKILDESC78']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC39b'];  //Reinkarnacja sojusznika z 
		case 79: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC79']; //do odporności na negatywne statusy
		case 80: return LNG['FUN_SKILDESC80']+' <strong>'+val+'</strong>%'; //Aktywuje Ostatnie Tchnienie
		case 81: return LNG['FUN_SKILDESC81']; //Przywołanie Demonicznych Rąk ciskających klątwy
		case 82: return LNG['FUN_SKILDESC82']; //Zmusza przeciwników do zaatakowania użytkownika
		case 83: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC83']; //kumulacja obrażeń, a następnie dodanie ich do kolejnego ataku
		case 84: return LNG['FUN_SKILDESC84']; //Aktywacja Zbroi Błyskawic
		case 85: return LNG['FUN_SKILDESC85']+' ('+LNG.lab1+' <b>'+val+'</b>)'; //Przywołanie Piekielnych Demonów
		case 86: return LNG['FUN_SKILDESC86']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC86b']; //Absorbuje charky przeciwnika
		case 87: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC87']; //szans na poparzenie przeciwnika
		case 88: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC88']; //szans na zniszczenie wnętrzności przeciwnika
		case 89: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC89']; //szans na napromieniowanie przeciwnika
		case 90: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC90']; //szans na odcięcie kończyny przeciwnika
		case 91: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC91']; //szans na krystalizację przeciwnika
		case 92: return LNG['FUN_SKILDESC92']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC92b']; //Aura Krystalizacji, która ma szans na skrystalizowanie każdego kto zaatakuje użytkownika
		case 93: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC93']; //szans na oślepienie przeciwnika
		case 94: return LNG['FUN_SKILDESC94']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC94b']; //Aura Oślepienia zapewniająca szans na Oślepienie przy każdym ataku na przeciwników
		case 95: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC95']; //szans na zatrucie przeciwnika
		case 96: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC96']; //szans na wstrząs przeciwnika
		case 97: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC97']; //szans na osłabienie przeciwnika
		case 98: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC98']; //szans na immobilizację przeciwnika
		case 99: return LNG['FUN_SKILDESC99']+'<strong>'+val+'</strong>%'; //Zwiększa obrażenia o
		case 100: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC100']; //szans na podpalenie przeciwnika czarnym ogniem
		case 101: return LNG['FUN_SKILDESC101']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC101b']; //Aura Czarnego Ognia, która ma szans na podpalenie czarnym ogniem każdego kto zaatakuje użytkownika
		case 102: return '<b>'+val+'</b> '+LNG['FUN_SKILDESC102']; //poziom wiecznego genjutsu
		case 103: return LNG['FUN_SKILDESC39']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC103']; //sharingan deactivation reinkarnacja HP i Chakry, gdy efekt jest aktywny
		case 104: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC104']; //szans na dematerializację przeciwnika
		case 105: return LNG['FUN_SKILDESC105']+'<strong>'+val+'</strong>%'; //Zwiększa szansę na trafienia krytyczne o
		case 106: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC106']; //szans na aktywację wypalania chakry przeciwnika
		case 107: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC107']; //szans na krwotok u przeciwnika
		case 108: return LNG['FUN_SKILDESC108']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC108b']; //Aura Krwotoku zapewniająca szans na krwotok przy każdym ataku na przeciwników
		case 109: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC109']; //szans na przestraszenie przeciwnika
		case 110: return LNG['FUN_SKILDESC110']; //Rozerwanie rany przeciwnika
		case 111: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC111']; //szans na zaaplikowanie toksyny przeciwnikowi
		case 112: return LNG['FUN_SKILDESC112']; //Przejęcie przywołań
		case 113: return LNG['FUN_SKILDESC113']; //Aktywuje dematerializację
		case 114: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC114']; //do skuteczności genjutsu
		case 115: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC115']; //szans na przeklęcie przeciwnika
		case 116: return LNG['FUN_SKILDESC116']+'<strong>'+val+'</strong>%'; //Regeneracja chakry:
		case 117: return LNG['FUN_SKILDESC117']+'<strong>'+val+'</strong>%'; //Odporność na podpalenie i krwawienie:
		case 118: return LNG['FUN_SKILDESC118']+'<strong>'+val+'</strong>%'; //Zwiększa obrażenia od podpaleń +
		case 119: return LNG['FUN_SKILDESC119']+'<strong>'+val+'</strong>%'; //Odporność na ogłuszenie, paraliż i dezorientację:
		case 120: return LNG['FUN_SKILDESC120']+'<strong>'+val+'</strong>%'; //Redukuję szansę na otrzymanie trafień krytycznych o 
		case 121: return LNG['FUN_SKILDESC121']+'<strong>'+val+'</strong>%'; //Zwiększa obrażenia krytyczne o
		case 122: return LNG['FUN_SKILDESC122']+'<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC122b']; //'Udane krwawienia będą regenerować życie w ilości <strong>'+val+'</strong>% obrażeń od krwawienia';
		case 123: return LNG['FUN_SKILDESC123']+'<strong>'+val+'</strong>%'; //Obniża szansę na trafienie krytyczne przeciwnika o 
		case 124: return LNG['FUN_SKILDESC124']+'<strong>'+val+'</strong>%'; //Obniża obrażenia krytyczne przeciwnika o 
		case 125: return LNG['FUN_SKILDESC125']+'<strong>'+val+'</strong>%'; //Obniża celność technik przeciwnika o 
		case 126: return LNG['FUN_SKILDESC126']+'<strong>'+val+'</strong>%'; //Zwiększa celność technik o 
		case 127: return LNG['FUN_SKILDESC127']+'<strong>'+val+'</strong>%'; //Zwiększa szansę a unik o 
		case 128: return LNG['FUN_SKILDESC128']+'<strong>'+val+'</strong>%'; //Obniża obrażenia celu o 
		case 129: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC129']; //szans na wężową regenerację
		case 130: return LNG['FUN_SKILDESC130']+'<strong>'+val+'</strong>%'; //Obniża efektywność leczenia celu o
		case 131: return LNG['FUN_SKILDESC131']+'<strong>'+val+'</strong>%'; //obniża odporność na negatywne statusy podstawowe o
		case 132: return LNG['FUN_SKILDESC132']+'<strong>'+val+'</strong>%'; //Zwiększa skuteczność ogłuszeń, paraliżu i dezorientacji o 
		case 133: return LNG['FUN_SKILDESC133']+'<strong>'+val+'</strong>%'; //Zwiększa efektywność genjutsu o
		case 134: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC134']; //szans na wydłużenie genjutsu o jedną turę
		case 135: return LNG['FUN_SKILDESC135']+'<strong>'+val+'</strong>%'; //Obniża odporność na genjutsu celu o 
		case 136: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC136']; //szans na to, że genjutsu wpłynie na dodatkowy cel
		case 137: return LNG['FUN_SKILDESC137']+'<strong>'+val+'</strong>%'; //Zwiększa obrażenia technik genjutsu o 
		case 138: return LNG['FUN_SKILDESC138']+'<strong>'+val+'</strong>%'; //Zwiększa efektywność leczenia o
		case 139: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC139']; //szans na odbicie statusu podstawowego oraz połowa tej szansy na odbicie statusu zaawansowanego
		case 140: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC140']; //szans na efekt zamiany obrażeń fizycznych na mentalne i odwrotnie
		case 141: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC141']; //szans na to, że trafienie krytyczne wywoła krwawienia na 5 tur
		case 142: return LNG['FUN_SKILDESC142']; //Aktywacja Krwawego Pola
		case 143: return LNG['FUN_SKILDESC143']; //Aktywuje Mangekyo Sharingan
		case 144: return LNG['FUN_SKILDESC144']; //Aktywuje Byakugan
		case 145: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC145']; //zapieczetowanie chakry
		case 146: return LNG['FUN_SKILDESC146']+' <strong>'+val+'</strong> '; //liczba celow
		case 147: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC147']; //zapieczetowanie efektów technik
		case 148: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC148']; //absolutna obrona
		case 149: return LNG['FUN_SKILDESC149']+' <strong>'+val+'</strong>'; //level reduction
		case 150: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC150']; //dispel summons
		case 151: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC151']; //dark seal
		case 152: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC152']; //dark seal
		case 153: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC153']; //tech seal
		case 154: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC154']; //tech seal
		case 155: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC155']; //tech seal
		case 156: return '<strong>'+val+'</strong>% '+LNG['FUN_SKILDESC156']; //tech seal
		case 157: return '<strong>'+val+'</strong> '+LNG['FUN_SKILDESC157']; //tech seal
	}
}
GAME.parseTooltipTech = function(data,level,rt1,rt2){
	var con='<div class="tech_desc avatar_border">';
	con+='<div class="technika j'+data.cat_id+'_'+data.cat2_id+'"><img src="/gfx/jutsu/'+data.cat_id+'/'+data.cat2_id+'/'+data.id+'.png" /></div><div class="tclass">'+LNG['ninja_class'+data.class]+'</div><div class="right_desc"><h2>'+data.nazwa+'</h2>'+LNG.lab1+' <b>'+level+'</b>/<b>'+data.max_lvl+'</b><br /><i>'+data[this.lang_data['nauki2'][this.lang]]+'</i><br /><span class="tst'+data.source_type+'">'+LNG['tech_power'+data.source_type]+'</span> - <span class="skill_t'+data.type+'">'+LNG['techstype'+data.type]+'</span></div><div class="clr"></div>';
	var lcls='';
	var is_pet=false;
	var char_data=this.char_data;
	if(this.tech_pet&&this.pets[this.tech_pet-1]){
		char_data=this.pets[this.tech_pet-1];
		is_pet=true;
	}
	
	if(data.req_lvl>char_data.level) lcls='red';
	con+='<span class="eq">'+LNG.lab24+'</span>: <b class='+lcls+'>'+data.req_lvl+'</b><br />';
	if(data.req_tech1&&!is_pet){
		var lcls='green';
		if(!rt1) lcls='red';
		con+='<span class="eq">'+LNG.lab411+'</span>: <b class='+lcls+'>'+data.req_tech1_name+'</b><br />';
	}
	if(data.req_tech2&&!is_pet){
		var lcls='green';
		if(!rt1) lcls='red';
		con+='<span class="eq">'+LNG.lab411+'</span>: <b class='+lcls+'>'+data.req_tech2_name+'</b><br />';
	}
	var mix=this.abimix(data.cat_id,data.cat2_id);
	lcls='';
	if(mix[0]){
		var abi=this.ability2b(mix[0]);
		if(data.req_abi>char_data[abi]) lcls='red';
		con+='<span class="eq">'+LNG.lab403+' <strong><i class="ico '+abi+'"></i>'+LNG['abi_'+abi]+'</strong></span>: <b class="'+lcls+'">'+this.dots(data.req_abi)+'</b><br />';
	}
	lcls='';
	if(mix[1]){
		var abi=this.ability2b(mix[1]);
		if(data.req_abi2>char_data[abi]) lcls='red';
		con+='<span class="eq">'+LNG.lab403+' <strong><i class="ico '+abi+'"></i>'+LNG['abi_'+abi]+'</strong></span>: <b class="'+lcls+'">'+this.dots(data.req_abi2)+'</b><br />';
	}
	lcls='';
	if(mix[2]){
		var abi=this.ability2b(mix[2]);
		if(data.req_abi3>char_data[abi]) lcls='red';
		con+='<span class="eq">'+LNG.lab403+' <strong><i class="ico '+abi+'"></i>'+LNG['abi_'+abi]+'</strong></span>: <b class="'+lcls+'">'+this.dots(data.req_abi3)+'</b><br />';
	}
	if(data.req_special) con+='<span class="eq">'+LNG.lab409+'</span>: <b>'+LNG['techadreq'+data.req_special]+' - '+data.req_s_val+'</b><br />'; 
	if(this.tech_show_sp_cost&&level<data.max_lvl) con+='<span class="eq">'+LNG.lab412+'</span>: <b>'+(level+1)+'</b><i class="upgrade_icon sp"></i><br />'; 
	con+='<hr /><span class="eq">'+LNG.lab401+'</span>: <b>'+data.cd+'</b><br /><span class="eq">'+LNG.lab404+'</span>: <b>'+(data.targets+1)+'</b><br />';
	if(data.use_natural_energy) con+='<span class="eq">'+LNG.lab406+'</span>: <b>'+this.dots(data.cost)+'</b><br />';
	else con+='<span class="eq">'+LNG.lab407+'</span>: <b>'+this.dots(data.cost)+'</b><br />';
	
	if(level>=1){
		if(data.power>0){
			var pow=data.power;
			if(level>1) pow=data.power+(data.power*0.1*level)+level;
			con+='<span class="eq">'+LNG.lab405+'</span>: <b>'+pow+'</b><br />';
			if(this.show_tech_dmg){
				var dmg=this.calculateMinDamage(data,pow,char_data);
				con+='<span class="eq">'+LNG.lab415+'</span>: <b class="orange">'+this.dots(dmg)+'</b><br />';
			}
		}
		con+='<br /><div class="effects">';
		for(var e=1;e<=5;e++){
			if(data['e'+e]==0) continue;
			var val=data['e'+e+'_power']*level;
			if(data['e'+e]==22) data['e'+e+'_duration']=val-1;
			con+='<b>'+e+'</b>: '+this.skill_effect_desc(data['e'+e],val,data.class)+' '+LNG.fight_label3+' <b>'+(data['e'+e+'_duration']+1)+'</b> '+LNG.fight_label4+'<br />';
			if(LNG['effect_desc'+data['e'+e]]) con+='<i class="adef">* '+LNG['effect_desc'+data['e'+e]]+'</i><br />';
		}
		con+='</div>';
	}
	
	if(level<data.max_lvl){
		con+='<br /><b class="green">'+LNG.lab408+'</b><br />';
		level++;
		if(data.power>0){
			var pow=data.power;
			if(level>1) pow=data.power+(data.power*0.1*level)+level;
			con+='<span class="eq">'+LNG.lab405+'</span>: <b>'+pow+'</b><br />';
			if(this.show_tech_dmg){
				var dmg=this.calculateMinDamage(data,pow,char_data);
				con+='<span class="eq">'+LNG.lab415+'</span>: <b class="orange">'+this.dots(dmg)+'</b><br />';
			}
		}
		con+='<br /><div class="effects">';
		for(var e=1;e<=5;e++){
			if(data['e'+e]==0) continue;
			var val=data['e'+e+'_power']*level;
			if(data['e'+e]==22) data['e'+e+'_duration']=val-1;
			con+='<b>'+e+'</b>: '+this.skill_effect_desc(data['e'+e],val,data.class)+' '+LNG.fight_label3+' <b>'+(data['e'+e+'_duration']+1)+'</b> '+LNG.fight_label4+'<br />';
			if(LNG['effect_desc'+data['e'+e]]) con+='<i class="adef">* '+LNG['effect_desc'+data['e'+e]]+'</i><br />';
		}
		con+='</div>';
	}
	con+='</div>';
	var sel=$('.tech_data[data-tech_id="'+data.id+'"]');
	sel.attr('data-original-title',con).attr('data-load_go',1);
	if(this.dragged_tech) return;
	if(this.current_tech_tooltip) this.current_tech_tooltip.tooltip('show');
}
GAME.calculateMinDamage = function(data,pow,char_data){
	var dmg=this.damages[data.source_type]*pow;
	var abi=0;
	var mix=this.abimix(data.cat_id,data.cat2_id);
	if(mix[0]) abi+=char_data[this.ability2b(mix[0])];
	if(mix[1]) abi+=char_data[this.ability2b(mix[1])];
	if(mix[2]) abi+=char_data[this.ability2b(mix[2])];
	dmg*=this.dmg_pattern(abi,0);
	var bon=0,bdmg=0;
	if(data.apply_tai_bonus){
		bdmg+=this.getStat(1);
		bon+=this.getStat(39);
	}
	if(data.apply_ken_bonus){
		bdmg+=this.getStat(2);
		bon+=this.getStat(40);
	}
	if(data.apply_shuriken_bonus){
		bdmg+=this.getStat(3);
		bon+=this.getStat(41);
	}
	if(data.apply_nin_bonus){
		bdmg+=this.getStat(4);
		bon+=this.getStat(42);
	}
	if(data.apply_gen_bonus){
		bdmg+=this.getStat(5);
		bon+=this.getStat(43);
	}
	if(data.apply_kin_bonus){
		bdmg+=this.getStat(6);
		bon+=this.getStat(44);
	}
	if(data.apply_kg_bonus){
		bon+=this.getStat(45);
	}
	if(data.apply_kt_bonus){
		bon+=this.getStat(115);
	}
	if(bon!=0) dmg*=1+bon/100;
	if(bdmg!=0) dmg+=bdmg;
	return Math.round(dmg);
}
GAME.itemQuality = function(quality){
	var g=1;
	if(quality>40) g=2;
	if(quality>70) g=3;
	if(quality>90) g=4;
	if(quality>110) g=5;
	return '<span class="q'+g+'">'+LNG['quality'+g]+'</span>';
}
GAME.parseTooltipItem = function(type,id,data){
	var con='',upgr='',rclass='',itemlv='',item_header='',iid=data.id,item_id=data.item_id,quality='';
	if(type==2){
		item_id=data.id;
	}
	if(data.upgrade>0&&data.type!=12) upgr='+ '+data.upgrade;
	var reb=0;
	if(!this.levelReqCheck(data.lvl,reb)) rclass='red';
	if(data.lvl>0) itemlv='<span>'+LNG.lab24+': <b class='+rclass+'>'+this.rebPref(reb)+''+data.lvl+'</b></span>';
	switch(this.lang){
		case 'en': item_header=LNG['item_class'+data.class]+' '+LNG['item_slot'+data.type]; break;
		default: item_header=LNG['item_slot'+data.type]+' '+LNG['item_class'+data.class]; break;
	}
	if(data.quality>0) quality='<span id="quality">'+LNG.lab28+': '+this.itemQuality(data.quality)+' ('+data.quality+'%)</span>';
	con='<div class="item_desc panel_border"><span class="item_name"><b class="item'+data.class+'">'+data[this.lang_data['lokacje'][this.lang]]+' '+upgr+'</b></span><div class="ekw_page_items item_desc_class c'+data.class+'"><div class="ekw_slot"><img src=/gfx/items/'+data.lvl+'/'+data.class+'/'+item_id+'.png /></div><div class=item_add>'+quality+'<span class=item'+data.class+'>'+item_header+'</span></div></div><div class=item_add2>'+itemlv+'</div><div class=inner_content>';
	if(data.ball){
		con+='<div class=ball_desc>';
		var grade='';
		for(var g=1;g<=data.ball.grade;g++) grade+='<img src="/gfx/ekw_pages/star.png" />';
		con+='<table><tr><td width=80>'+LNG.lab1+':</td><td class="val">'+data.ball.level+'</td></tr><tr><td>EXP:</td><td class="val">'+data.ball.exp+'</td></tr><tr><td></td></tr></table>'+grade+'</div>';
	}
	
	if(LNG['item_addd'+item_id]){
		con+='<div class="add_desc">'+LNG['item_addd'+item_id]+'</div>';
	}
	con+='<div class="clearfix"></div>';
	con+='<div class=item_stats>';
	/*
	if(data.type==168) con+=LNG.item_func19+' <span class="green">'+this.convertSeconds(data.upgrade)+'</span>';
	*/
	for(var s=1;s<=9;s++){
		var statn=data['stat'+s];
		if(statn){
			var statval=data['stat'+s+'_val']
			var cls='stat_val';
			if(data['stat'+s+'_scls']) cls='stat_sval';
			con+='<div class="list_sep'+data.class+'"></div> <span class='+cls+'>'+this.dots(statval)+'</span> <span class=stat_desc>'+this.item_stat(statn)+'</span><br />';
		}
	}
	con+='</div>';
	if(data.set_id>0&&data.set){
		con+='<div class=set_span><span>'+LNG.lab27+' '+data.set.name+'</span> ('+data.set.set_items_owned+'/'+data.set.set_items_max+')</div><div class=set_lines><div class=set_item_list>';
		var len=data.set.set_items.length;
		for(var i=0;i<len;i++){
			var si=data.set.set_items[i];
			var cls='set_itm2';
			if(si.owned) cls='set_itm1';
			con+='<span class='+cls+'>'+si.name+'</span><br />';
		}
		con+='</div><div class=set_stat_list>';
		var len=data.set.stats.length;
		for(var i=0;i<len;i++){ 
			var st=data.set.stats[i];
			var cls='set_itm2';
			if(st.a) cls='set_itm1';
			con+='<i></i><span class='+cls+'>'+st.val+' '+this.item_stat(st.stat)+'</span><br />';
		}
		con+='</div><div class="clr"></div></div>';
	}
	if(data.expires>0) con+='<div class="clr"><b class="red">'+LNG.lab213+'</b> '+LNG.lab51+' '+this.showTimer(data.expires-this.getTime());
	if(data.lock_type==1) con+='<div class="clr"><b class="bound">'+LNG.lab26+'</b></div>';
	if(data.lock_type==2) con+='<div class="clr"><b class="bound">'+LNG.lab395+' <b class="red">'+data.klan_name+'</b></b></div>';
	con+='</div></div>';
	switch(type){
		case 1:
			var sel=$('.player_ekw_item[data-item_id="'+data.id+'"]');
			sel.attr('data-original-title',con).attr('data-item_class',data.class);
		break;
		case 2:
			var sel=$('.main_ekw_item[data-item_id="'+data.id+'"]');
			sel.attr('data-original-title',con).attr('data-item_class',data.class);
		break;
	}
	if(this.current_item_tooltip) this.current_item_tooltip.tooltip('show');
}
GAME.item_stat = function(type){
	return LNG['item_stat'+type];
}
GAME.parseTracker = function(track){
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
GAME.parseZast = function(){
	this.locked_pages=[];
	if(this.safe_zone){
		$('#char_premium').hide();
		$('#char_spremium').hide();
		$('#chat_containter').hide();
		this.locked_pages=['game_kk','game_kp','game_substitution','game_sett','game_auctions','game_vip'];
		if(this.safe_zone.lock_trn) this.locked_pages.push('game_train');
		if(this.safe_zone.lock_ekw) this.locked_pages.push('game_ekw');
		if(this.safe_zone.lock_pw) this.locked_pages.push('game_pw');
		if(this.safe_zone.lock_klan) this.locked_pages.push('game_klan');
		if(this.safe_zone.lock_pet){
			this.locked_pages.push('game_pets');
			this.locked_pages.push('game_emp');
		}
		if(this.safe_zone.lock_skills) this.locked_pages.push('game_skills');
		if(this.safe_zone.lock_balls) this.locked_pages.push('game_balls');
		if(this.safe_zone.lock_travel){
			this.locked_pages.push('game_travel');
			this.locked_pages.push('game_teleport');
		}
		if(this.safe_zone.lock_empire) this.locked_pages.push('game_empire');
		if(this.safe_zone.lock_pp) this.locked_pages.push('game_private');
	}
}
GAME.prepareworldMap = function(){
	if(!this.world_data_rdy){
		this.emitOrder({a:206,type:0});
	}
	this.recreateWorldMap();
}
GAME.page_switch = function(page,arg=0){
	if(this.is_loading||(this.char_data&&this.char_data.special&&page!='game_special')&&page!='char_select') return;
	if(this.char_data&&this.char_data.village_id==0&&page=='game_empire') return;
	$('.menu_bar').hide();
	JQS.qcc.hide();
	kom_clear();
	this.menu='';
	if(this.locked_pages.indexOf(page)!=-1){
		this.komunikat(LNG.error65);
	}
	else{
		switch(page){
			case 'game_map':
				this.prepareMap();
			break;
			case 'game_world':
				this.prepareworldMap();
			break;
			case 'game_stats':
				this.parseData(4,this.char_bonuses);
			break;
			case 'game_train':
				this.emitOrder({a:8,type:1});
			break;
			case 'game_party':
				this.emitOrder({a:204,type:0});
			break;
			case 'game_bank':
				this.emitOrder({a:208,type:0,page:1});
			break;
			case 'game_manus':
				this.emitOrder({a:209,type:0,page:1});
			break;
			case 'game_crafting':
				this.emitOrder({a:212,type:0,page:1});
			break;
			case 'game_org':
				this.emitOrder({a:213,type:0});
			break;
			case 'game_camp':
				//this.parseData(10,{});
				this.emitOrder({a:207,type:0});
			break;
			case 'game_raps':
				this.emitOrder({a:11,page:1,cat:0});
			break;
			case 'game_ekw':
				this.emitOrder({a:12,page:1,used:1});
			break;
			case 'game_tech_sets':
				this.emitOrder({a:203,type:0});
			break;
			case 'game_buff_use':
				this.emitOrder({a:14,type:3});
			break;
			case 'game_private':
				this.emitOrder({a:15,type:1});
			break;
			case 'game_techs':
				//this.emitOrder({a:18,type:1});
				this.prepareTechPage();
			break;
			case 'game_cstats':
				this.emitOrder({a:20,type:1});
			break;
			case 'game_qb':
				this.emitOrder({a:22,type:3});
			break;
			case 'game_kp':	
				this.emitOrder({a:25,type:1});
				this.currency=1;
			break;
			case 'game_kk':	
				this.emitOrder({a:25,type:3});
				page='game_kp';
				this.currency=2;
			break;
			case 'currency_log':
				this.emitOrder({a:25,type:6,c:this.currency,page:1});
			break;
			case 'game_substitution':
				this.emitOrder({a:27,type:0});
			break;
			case 'game_wardobe':
				this.emitOrder({a:28,type:0});
			break;
			case 'game_instances':
				this.emitOrder({a:29,type:0});
			break;
			case 'game_skills':
				this.emitOrder({a:30,type:0});
			break;
			case 'skill_sets':
				this.parseSkillSets();
			break;
			case 'sword_upgrade':
				this.emitOrder({a:31,type:0,item_id:arg});
			break;
			case 'game_wanted':
				this.emitOrder({a:32,type:0});
			break;
			case 'game_balls':
				this.emitOrder({a:33,type:0});
			break;
			case 'game_friends':
				this.emitOrder({a:35,type:0});
			break;
			case 'game_achievements':
				this.emitOrder({a:36,type:0});
			break;
			case 'game_pw':
				this.emitOrder({a:37,page:1});
			break;
			case 'game_rank':
				this.emitOrder({a:38,page:1,rank_type:GAME.ranking_type});
			break;
			case 'game_klan':
				this.emitOrder({a:39,type:0});
			break;
			case 'game_lab':
				this.emitOrder({a:41,type:0});
			break;
			case 'game_pets':
				this.emitOrder({a:43,type:0});
			break;
			case 'game_emp':
				this.emitOrder({a:44,type:0});
			break;
			case 'game_arena':
				this.emitOrder({a:46,type:0});
			break;
			case 'game_auctions':
				this.emitOrder({a:47,type:0,page:1});
			break;
			case 'game_wb':
				this.emitOrder({a:48,type:0});
			break;
			case 'game_activities':
				this.emitOrder({a:49,type:0});
			break;
			case 'game_empire':
				this.emitOrder({a:50,type:0,empire:arg});
			break;
			case 'game_events':
				this.emitOrder({a:51,type:0});
			break;
			case 'kp_transfer':
				this.load_captcha('#transfer_captcha','transfer_captcha');
			break;
			case 'game_vip':
				this.emitOrder({a:54,type:0});
			break;
			case 'game_tournaments':
				this.emitOrder({a:57,type:0,type2:GAME.tour_type,page:1});
			break;
			case 'game_cards':
				this.emitOrder({a:58,type:0});
			break;
			case 'game_soultower':
				this.emitOrder({a:59,type:0});
			break;
			case 'game_abtra':
				this.prepareAbtra();
			break;
			case 'game_village_story':
				this.emitOrder({a:50,type:10,village:arg});
			break;
			case 'game_swords':
				this.emitOrder({a:215,type:0});
			break;
		}
		$('.page_switch').hide();
		$('#page_'+page).show();
		this.tutorialReqDone(3,page);
	}
}
GAME.rebornET = function(lvl){
	if(lvl<50) return 2;
	if(lvl<100) return 3;
	if(lvl<150) return 4;
	if(lvl<200) return 5;
	if(lvl<250) return 6;
	if(lvl<300) return 7;
	if(lvl<350) return 8;
	if(lvl<400) return 9;
	if(lvl<450) return 10;
	if(lvl<500) return 11;
	if(lvl<550) return 12;
	if(lvl<600) return 13;
	if(lvl<650) return 15;
	if(lvl<700) return 16;
	if(lvl<800) return 17;
	if(lvl<900) return 30;
	if(lvl<1249) return 50;
	if(lvl<1250) return 71;
}
GAME.nextLevelExp = function(level,reborn){
	var nextl=level+1;
	var next=nextl/10*100*nextl*nextl;
	switch(reborn){
		default:
			if(level>149) next=Math.round(next*100.0);
			else if(level>148) next=Math.round(next*100.0);
			else if(level>147) next=Math.round(next*85.0);
			else if(level>145) next=Math.round(next*80.0);
			else if(level>140) next=Math.round(next*50.0);
			else if(level>135) next=Math.round(next*30.0);
			else if(level>130) next=Math.round(next*20.5);
			else if(level>125) next=Math.round(next*15.0);
			else if(level>120) next=Math.round(next*10.5);
			else if(level>115) next=Math.round(next*6.0);
			else if(level>110) next=Math.round(next*3.0);
			else if(level>100) next=Math.round(next*1.5);
		break;
	}
	return Math.round(next);
}
GAME.timers_tick = function(){
	var time=this.getTime();
	var now=moment(this.getmTime());
	/*
	var minute=parseInt(now.format('m'));
	if(minute<=5) this.trainUpgrade(1,time);
	else this.trainUpgrade(0,time);
	*/
	$(".timer").each(function(i){
		var th=$(this);
		var endt=th.data('end');
		var left=endt-time;
		var end=false;
		var res='';
		if(left>0){
			res=GAME.convertSeconds(left);
			th.text(res);
		}
		else{
			res='--:--:--';
			th.text(res).removeClass('timer');
			end=true;
		}
		var special=parseInt(th.data('special'));
		switch(special){
				case 1:
					var pr=100-Math.floor((GAME.timed_end-time)/GAME.timed_dur*100);
					if(pr>100) pr=100;
					if(GAME.timed_pr!=pr) $('#timed_bar').css({'width':pr+'%'});
					document.title='['+res+'] '+LNG.page_title;
					if(end){
						setTimeout(function () {
						   GAME.emitOrder({a:8,type:4});
						}, 1000); 
						document.title=LNG.page_title;
					}
				break;
				case 2:
					if(end){
						GAME.emitOrder({a:15,type:4});
					}
				break;
				case 3:
					if(end){
						GAME.emitOrder({a:17});
					}
				break;
				case 4:
					var pr=Math.floor((GAME.ssj_end-time)/GAME.ssj_dur*100);
					if(pr>100) pr=100;
					if(GAME.ssj_pr!=pr){
						GAME.ssj_pr=pr;
						$('#main_ssj_bar').css({'width':pr+'%'});
					}
					if(end){
						GAME.emitOrder({a:18,type:6});
					}
				break;
				case 5:
					var pr=Math.floor((GAME.doubler_end-time)/3600*100);
					if(pr>100) pr=100;
					if(GAME.doubler_pr!=pr){
						GAME.doubler_pr=pr;
						$('#main_sub_bar').css({'width':pr+'%'});
					}
					if(end){
						$('#doubler_bar').fadeOut();
					}
				break;
				case 6: 
					if(end){
						$('.quest_btn').prop('disabled', false);
						$('.quest_duel_lock').hide();
					}
				break; 
				case 7:
					if(GAME.mining){
						var pr=100-Math.floor((GAME.mining.expires/1000-time)/GAME.mining.duration*100);
						if(pr>100) pr=100;
						if(GAME.mining.pr!=pr){
							GAME.mining.pr=pr;
							GAME.mining.bar.finish().animate({'width':pr+'%'},1000);
						}
						if(end){
							GAME.mining.bar.finish().css({'width':'100%'});
							GAME.mining.mbar.slideUp();
							$('#mining_res_'+GAME.mining.mine_id).html(LNG.lab134+' '+GAME.showTimer(300,'data-special="8" data-mid="'+GAME.mining.mine_id+'"'));
							if(GAME.map_mines&&GAME.map_mines.coords[GAME.mining.x+'_'+GAME.mining.y]){
								var arr=GAME.map_mines.coords[GAME.mining.x+'_'+GAME.mining.y];
								var len=arr.length;
								for(var i=0;i<len;i++){
									if(arr[i][0]==GAME.mining.mine_id) arr[i][2]=time+300;
								}
							}
							GAME.emitOrder({a:22,type:8},true);
						}
					}
				break;
				case 8:
					if(end){
						var mid=th.data('mid');
						$('#mining_btn_'+mid).prop('disabled', false);
						$('#mining_res_'+mid).empty();
					}
				break;
				case 9:
					if(end){
						$('#lb'+th.data('bid')).remove();
						GAME.buffs_cnt--;
						$('#char_buffs_cnt').text(GAME.buffs_cnt);
					}
				break;
				case 10: //
					if(end){
						var pd=th.data('pd');
						$('.playercd'+pd).hide();
						$('.playericons'+pd).fadeIn().removeClass('initial_hide_forced');
					}
				break;
		}
	});
}
GAME.showTimer = function(duration,atrs='',aclass=''){
	duration=Math.floor(duration);
	var end=this.getTime()+duration;
	return '<span class="timer '+aclass+'" '+atrs+' data-end="'+end+'">'+this.convertSeconds(duration)+'</span>';
}
GAME.convertSeconds = function(totalSec){
	if(!totalSec) totalSec=0;
	var hours = parseInt( totalSec / 3600 );
	var minutes = parseInt( totalSec / 60 ) % 60;
	var seconds = totalSec % 60;
	if(hours<0) hours=0;
	if(minutes<0) minutes=0;
	if(seconds<0) seconds=0;
	return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
}
GAME.timedActionLabel = function(current){
	var label='';
	switch(current.type){
		case 1:
			label=LNG.train_action1+' <b>'+LNG['abi_'+this.ability2b(current.action)]+'</b> + '+this.dots(current.result)+'';
		break;
		case 2:
			label=LNG.train_action2+': <b>'+current.name+'</b>';
		break;
		case 3:
			label=LNG.train_action3+' <b>'+LNG['ninja_class'+current.action]+'</b> ('+current.result+'%)';
		break;
		case 4:
			label=LNG.train_action4+': <b>'+current.name+'</b>';
		break;
		case 40:
			label=LNG.train_action40+' <b>'+LNG['element'+current.action]+'</b> ('+current.result+'%)';
		break;
		case 41:
		case 42:
			label=LNG.train_action40+' <b>'+LNG['element'+current.action]+'</b>';
		break;
	}
	return label;
}
GAME.parseTimed = function(){
	var time=this.getTime();
	this.is_training=false;
	if(this.char_tables&&this.char_tables['timed_actions']){
		var len=this.char_tables['timed_actions'].length;
		if(len>0){
			var actions=this.char_tables['timed_actions'].sort(function(a,b){return a.start-b.start});
			var current=actions[0];
			$('#timed_label').html('<div class="sep"></div>'+LNG.lab17+': '+this.timedActionLabel(current)+'. '+LNG.lab16+' '+this.convertTime(current.end));
			var left=current.end-time;
			if(left<1) this.emitOrder({a:8,type:4});
			var dur=current.end-current.start;
			if(current.type==1) this.is_training=true;
			this.timed=len;
			this.timed_dur=dur;
			this.timed_end=current.end;
			var pr=100-Math.floor(left/dur*100);
			if(pr>100) pr=100;
			this.timed_pr=pr;
			$('#timed_left').html(this.showTimer(left,'data-special="1"'));
			$('#timed_bar').css({'width':pr+'%'});
			if(actions[1]&&actions[1].end>time){
				var plan=LNG.lab15+' :';
				$('#timed_planed_con').html('<div class="sep"></div>'+plan+' '+this.timedActionLabel(actions[1])+'. '+LNG.lab16+' '+this.convertTime(actions[1].end));
				$('#timed_planned').show();
			}
			else $('#timed_planned').hide();
			$('#timed_con').fadeIn();
		}
		else{
			this.timed=0;
			$('#timed_left').text('--');
			$('#timed_con').hide();
		}
	}
	else{
		this.timed=0;
		$('#timed_left').text('--');
		$('#timed_con').hide();
	}
	if(this.base_train_speed) this.prepareTrainForm();
}
GAME.item_upgradeable = function(type){
	var disable=[12];
	if(disable.indexOf(type)==-1) return true;
	return false;
}
GAME.item_joinable = function (type,iclass,item_id=0){
	var ultra=[1238,1375,837,838,848,1538,1397,1396,1291,1357,1228,1655,1643];
	var normal=[3,5,9,11,16,17,18,19,21,22,23,24,62,63,66,73,74,75,78,86,111,121,142,182,183,188,189];
	if(ultra.indexOf(item_id)!=-1) return [true,1482];
	else if(iclass<10&&normal.indexOf(type)!=-1) return [true,74];
	return [false,0];
}
GAME.parsePremiumAmount = function(new_amount){
	var old=this.premium;
	this.premium=new_amount;
	this.value_change_ani(PJS.pra,old,this.premium,500);
	if(this.shop_data&&this.shop_data.currency==1) $('#shop_currency_am').text(this.dots(this.premium));
}
GAME.parseQuickOpts = function(){
	var opts='';
	/*
	if(this.quick_opts.tutorial){
		this.tutorials=this.quick_opts.tutorial;
		opts+='<img id="open_tuts" src="/gfx/layout/helper.png" class="qlink2 option" data-option="open_tuts" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab358+'</div>" />';
		$.getJSON('/json/tutorial.json', function(json){
			GAME.tutorial_data=json.tuts;
			GAME.checkTutorial();
		});
	}
	*/
	if(this.quick_opts.online_reward) opts+='<div class="option qlink dail" data-option="daily_reward" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab176+'</div>"></div>';
	if(this.quick_opts.sub&&this.quick_opts.sub.length) opts+='<div class="option qlink subs" data-option="quick_use_subs" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab189+'</div>"></div>';
	if(this.quick_opts.senzus&&this.quick_opts.senzus.length){
		opts+='<div class="option qlink senz" data-option="quick_use_senzu" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG.lab190+'</div>"></div>';
	}	
	$('#quick_bar').html(opts);
	option_bind();
	tooltip_bind();
	page_bind();
}
GAME.parseServerData = function(){
	$('#server_exp_rate').text(this.server_rates.exp_rate+this.getStat(200));
	$('#server_trn_rate').text(this.server_rates.trn_rate+this.getStat(201));
	var con='';
	if(this.server_rates.drop_rate) con+='<div>'+this.server_rates.drop_rate+this.item_stat(55)+'</div>';
	if(this.server_rates.free_pvp) con+='<div>'+LNG.lab455+'</div>';
	if(this.server_rates.pvp_rate>=1) con+='<div>'+this.server_rates.pvp_rate+this.item_stat(203)+'</div>';
	if(this.server_rates.global_mis_rate) con+='<div>'+this.server_rates.global_mis_rate+this.item_stat(204)+'</div>';
	$('#server_events').html(con);
	var con='<table>';
	var len=this.server_helpers.length;
	for(var i=0;i<len;i++){
		con+='<tr><td width="200"><span class="mod_rank'+this.server_helpers[i].mod+'">'+LNG['mrank'+this.server_helpers[i].mod]+'</span> :</td><td><b class="orange option" data-option="show_player" data-char_id="'+this.server_helpers[i].id+'">'+this.server_helpers[i].name+'</b></td></tr>';
	}
	con+='</table>';
	$('#server_helpers').html(con);
	option_bind();
}


GAME.paBarUpdate = function(ani){
	var w=this.char_data.pr/this.getCharMaxPr();
	w=Math.ceil(w*100);
	if(w>100) w=100;
	if(ani) $('#main_pa_bar').finish().animate({'width':w+'%'});
	else $('#main_pa_bar').css({'width':w+'%'});
}
GAME.isLastLevel = function(level,reborn){
	var res=false;
	/*
	switch(reborn){
		case 0:
		case 1:
			if(level>=1250) res=true;
		break;
		case 2:
		case 3:
		case 4:
			if(level>=100000) res=true;
		break;
	}
	*/
	return res;
}
GAME.god_calc = function (god){
	var mod=1;
		if(god<1000000000) mod=10;
		if(god>1000000000) mod=9;
		if(god>2000000000) mod=8;
		if(god>3000000000) mod=7;
		if(god>4000000000) mod=6;
		if(god>5000000000) mod=5;
		if(god>6000000000) mod=4;
		if(god>7000000000) mod=3;
		if(god>8000000000) mod=2;
		if(god>9000000000) mod=1;
		if(god>10000000000) mod=0.5;
		if(god>11000000000) mod=0.25;
		if(god>12000000000) mod=0.20;
		if(god>13000000000) mod=0.15;
		if(god>13000000000) mod=0.10;
		if(god>15000000000) mod=0.05;
		if(god>16000000000) mod=0.01;
		if(god>17000000000) mod=0.001;
		if(god>18000000000) mod=0.0001;
		if(god>19000000000) mod=0.00001;
		if(god>20000000000) mod=0.000001;
	return mod;
}
GAME.expTooltipUpdate = function(ani){
	var nextl=this.nextLevelExp(this.char_data.level,this.char_data.reborn),w=0;
	this.exp_next=nextl;
	w=this.char_data.exp/nextl;
	w=Math.round(w*100);
	if(w>100) w=100;
	if(this.isLastLevel(this.char_data.level,this.char_data.reborn)){
		w=100;
		nextl='...';
	}
	else nextl=this.dots(nextl);
	$('#needexp').text(nextl);
	$('#needexppr').text(w);
	
	if(ani) $('#main_exp_bar').finish().animate({'width':w+'%'});
	else $('#main_exp_bar').css({'width':w+'%'});
}
GAME.updateExpBar = function(){
	var w=0,next=0;
	if(this.isLastLevel(this.char_data.level,this.char_data.reborn)){
		w=100;
		next='...';
	}
	else{
		w=(this.char_data.exp/this.exp_next);
		w=Math.ceil(w*100);
		if(w>100) w=100;
		next=this.dots(this.exp_next);
	}
	if(this.exp_w!=w){
		this.exp_w=w;
		$('#main_exp_bar').finish().animate({'width':w+'%'});
		$('#needexp').text(next);
		$('#needexppr').text(w);
	}
}
GAME.premiumBonCnt = function(){
	var cnt=0,time=this.getTime();
	for(var b=1;b<=19;b++){
		if(this.premiumBonus(b)) cnt++;
	}
	if(cnt>0) $('#bon_counter').text(cnt).show();
	else $('#bon_counter').hide();
}
GAME.hasClanLaw = function(law){
	var res=false;
	if(this.char_data.klan_id>0){
		if(this.is_clan_chief) return true;
		if(this.clan_laws&&this.clan_laws[law]) return true;
	}
	return res;
}
GAME.useChar = function(res){
	this.locked_pages=[];
	$('#war_container').hide();
	$('#ewar_list').html('');
	$('#war_list').html('');
	$('.char_abi').addClass('disabled');
	this.abiunlock={};
	this.koms=[];
	this.safe_zone=false;
	this.page_switch('game_intro');
	this.char_id=res.char_id;
	this.char_data=res.char_data;
	this.char_tables=res.char_tables;
	this.char_bonuses=res.char_bonuses;
	this.premium=res.main_premium;
	//this.parseSSJ(res.ssj);
	this.server_rates=res.server_rates;
	this.server_helpers=res.server_helpers;
	this.parseServerData();
	this.maploaded=false;
	this.premiumBonCnt();
	this.map.initiated=false;
	this.party=res.party;
	this.clan_laws=res.clan_laws;
	this.is_clan_chief=res.clan_chief;
	PJS.pra.innerText=this.dots(this.premium);
	this.parseTimed();
	$('.char_avatar').attr('src',res.avatar);
	$('.need_reborn').hide();
	$('.restoreonrelog').show();
	$('#ekw_back').removeClass().addClass('ekw_bck').addClass('tlo_ekw'+this.char_data.race);
	if(this.char_data.last_map) $('#lastmap_bar').show();
	else $('#lastmap_bar').hide();
	this.expTooltipUpdate(0);
	this.charValuesBind(['max_market','soul_slots','soul_floor_resets','soul_floor','level_lock','kk','kage_ambition','name','surname','village_id','trybut','ranga','trybut_gold','clan_pu','friend_limit','special','sila','szyb','wytrz','moc','swoli','ener','exp','tpp','reborn','level','pr','pr_max','pr_ph','pr_time','x','y','doubler_rate','doubler_tme','gold','sp','rp','atp','ap','tai','ken','shuriken','nin','gen','kin','sen','fuin','nin_fire','nin_water','nin_thunder','nin_wind','nin_earth','max_ekw','doublerx','bagi','war_points','kills']);
		
	this.paBarUpdate(0);
	$('.char_logged').show();
	for(var i=0;i<=this.chat_channels;i++){
		this.chat_data[i]={
			messages:[],
			last_message:this.getTime(),
			old_loaded:false,
			new_msg_cnt:0
		};
	}
	this.chat_nonread=0;
	this.updateChatRead(-1);
	this.cached_data();
	this.prepareMapOpts();
	$('.kom').remove();
	this.chat_switch=0;
	$('.clan_channel').hide();
	this.prepareChatChannels();
	$('#chat_swi').text(LNG.lab379);
	select_chat_channel(1);
	$('#char_prifile').data('char_id',this.char_id);
	$('#bless_players').val(this.char_data.name);
	$('.mdragon_balls').hide();
	this.mf={};
	this.md={};
	$('.mdbb').removeClass('active');
	//this.cancelTutorial();
	this.parseChatNotifications();
	this.recalculateDamages();
	this.def_train_stat=parseInt(localStorage.getItem(this.char_id+'def_train_stat'))||1;
	if(this.any_captcha) grecaptcha.reset();
}
GAME.parseChatNotifications = function(){
	for(var i=1;i<=this.chat_channels;i++){
		if(this.chat_notifications[i]) $('#chat_noti_'+i).prop('checked',true);
		else $('#chat_noti_'+i).prop('checked',false);
	}
}
GAME.hasModLaw = function(){
	var res=false;
	if(this.safe_zone) return false;
	if(this.char_data.mod_rank) res=true;
	return res;
}
GAME.prepareChatChannels = function(){
	$('.common_channel').show();
	if(this.char_data.instance_id==0){
		$('#chat_channel_8').hide();
		if(!this.party) $('#chat_channel_12').hide();
	}
	if(this.char_data.village_id==0||this.char_data.ranga==8) $('#chat_channel_5').hide();
	if(this.char_data.ranga!=8) $('#chat_channel_13').hide();
	if(this.char_data.klan_id==0){
		$('#chat_klan_switch').hide();
		$('.clan_channel').hide();
	}
	else{
		$('#chat_klan_switch').show();
	}
	
	if(!this.hasModLaw()) $('#chat_channel_7').hide();
}
GAME.updateChatRead = function(channel){
	if(this.chat_nonread==0) $('#chat_msg_cnt').text('').addClass('empty');
	else{
		if(this.chat_nonread>99) $('#chat_msg_cnt').text('99+').removeClass('empty');
		else $('#chat_msg_cnt').text(this.chat_nonread).removeClass('empty');
	}
}
GAME.prepareMapOpts = function(){
	for(var r=0;r<=4;r++){
		if(this.map_options.ma[r]) $('#mapop_rank'+r).prop('checked',true);
		else $('#mapop_rank'+r).prop('checked',false);
	}
	for(var v=0;v<=2;v++){
		if(this.map_options.vo[v]) $('#mapop_view'+v).prop('checked',true);
		else $('#mapop_view'+v).prop('checked',false);
	}
	for(var b=0;b<=1;b++){
		if(this.map_options.bo[b]) $('#mapop_fo'+b).prop('checked',true);
		else $('#mapop_fo'+b).prop('checked',false);
	}
	
	if(this.map_options.ef[0]) $('#mapop_weather').prop('checked',true);
	else $('#mapop_weather').prop('checked',false);

	$('.mapo_rank').off('change').on('change',function(){
		var th=$(this);
		var rank=parseInt(th.data('rank'));
		if(th.prop('checked')) GAME.map_options.ma[rank]=1;
		else GAME.map_options.ma[rank]=0;
		localStorage.setItem('map_opts_ma',JSON.stringify(GAME.map_options.ma));
	});
	$('.mapo_view').off('change').on('change',function(){
		var th=$(this);
		var opt=parseInt(th.data('opt'));
		if(th.prop('checked')) GAME.map_options.vo[opt]=1;
		else GAME.map_options.vo[opt]=0;
		localStorage.setItem('map_opts_vo',JSON.stringify(GAME.map_options.vo));
	});
	$('.mapo_fi').off('change').on('change',function(){
		var th=$(this);
		var opt=parseInt(th.data('opt'));
		if(th.prop('checked')) GAME.map_options.bo[opt]=1;
		else GAME.map_options.bo[opt]=0;
		localStorage.setItem('map_opts_bo',JSON.stringify(GAME.map_options.bo));
	});
	$('.mapo_weather').off('change').on('change',function(){
		var th=$(this);
		var opt=parseInt(th.data('opt'));
		if(th.prop('checked')) GAME.map_options.ef[opt]=1;
		else GAME.map_options.ef[opt]=0;
		localStorage.setItem('map_opts_ef',JSON.stringify(GAME.map_options.ef));
	});
}
GAME.getStat = function(id){
	var res=0;
	if(this.char_bonuses&&this.char_bonuses[id]&&this.char_bonuses[id].value) res=this.char_bonuses[id].value;
	return res;
}
GAME.getCharMaxPr = function(){
	var max=this.char_data['pr_max']+parseInt(this.getStat(122))+parseInt(this.char_data.pr_max*this.getStat(125)/100);
	return max;
}
GAME.getCharPAPh = function(){
	var ph=this.char_data['pr_ph'];
	ph+=Math.floor(ph*this.getStat(124)/100)+parseInt(this.getStat(123));
	return ph;
}
GAME.instanceHandler = function(res){
	if(res.hasOwnProperty('applies')){
		var data=res.applies;
		var len=data.length,con='';
		for(var i=0;i<len;i++){
			con+='<tr><td>'+data[i].data.name+'</td><td>'+LNG['server'+data[i].data.server]+'</td><td><button class="newBtn option" data-option="room_apply" data-room="'+data[i].data.room_id+'" data-apply="'+data[i].id+'" data-state="1">'+LNG.lab194+'</button> <button class="newBtn option" data-option="room_apply" data-room="'+data[i].data.room_id+'" data-apply="'+data[i].id+'" data-state="2">'+LNG.lab195+'</button></td></tr>';
		}
		$('#room_applies_list').html(con);
		option_bind();
	}
	if(res.hasOwnProperty('rooms')){
		$('#room_applies').hide();
		$('#instance_view').show();
		$('#current_inst_name').text(this.raids[res.instance_id][this.lang_data['lokacje'][this.lang]]);
		var con='',len=res.rooms.length,data=res.rooms,any=true;
		console.log(data);
		for(var i=0;i<len;i++){
				any=false;
				var opts='',time=0;
				if(data[i].status<=2){
					if(data[i].owner_id==this.char_id&&data[i].owner_server==this.server){
						if(data[i].status==1) opts+='<button class="newBtn option" data-option="start_instance_room" data-room="'+data[i].id+'">'+LNG.lab197+'</button>';
						opts+='<button class="newBtn option" data-option="delete_instance_room" data-room="'+data[i].id+'">'+LNG.lab192+'</button>';
						$('#room_applies').show();
					}
					else{
						if(res.own_room&&res.own_room==data[i].id) opts='<button class="newBtn option" data-option="leave_instance_room" data-room="'+data[i].id+'">'+LNG.lab196+'</button>';
						else opts='<button class="newBtn option" data-option="join_instance_room" data-room="'+data[i].id+'" data-instance="'+res.instance_id+'">'+LNG.lab193+'</button>';
					}
					time=data[i].register_end-this.getTime();
				}
				if(data[i].status==3){
					opts='<button class="newBtn option" data-option="enter_instance_room" data-room="'+data[i].id+'">'+LNG.lab198+'</button>';
					time=data[i].expires-this.getTime();
				}
				con+='<tr><td>'+data[i].owner_nick+' ['+LNG['server'+data[i].owner_server]+']</td><td>'+this.showTimer(time)+'</td><td>'+data[i].players+'</td><td>'+LNG['instance_status_'+data[i].status]+'</td><td>'+opts+'</td></tr>';
		}
		if(any) con='<tr><td colspan="8">'+LNG.lab3+'</td></tr>';
		$('#inst_rooms_container').html(con);
		this.current_instance=res.instance_id;
		option_bind();
	}
}
GAME.charValuesBind = function(fields,olds=[]){
	var cnt=fields.length;
	for(var f=0;f<cnt;f++){
		var field=fields[f];
		if(this.bindings[field]){
			var bl=this.bindings[field].length;
			if(bl>0){
				for(var i=0;i<bl;i++){
					var vl=this.char_data[field],base=this.char_data[field];
					if(this.bindings[field][i].type==2){
						switch(this.bindings[field][i].option){
							case 1:
								var time=this.getTime();
								if(vl>time){
									$('#doubler_status').html(this.showTimer(vl-time,'data-special="5"'));
									$('#doubler_bar').show();
									this.doubler_end=vl;
									this.doubler_start=vl-3600;
								}
								else $('#doubler_bar').hide();
							break;
							case 2:
								if(vl=='') $('#lastmap_bar').hide();
								else $('#lastmap_bar').show();
							break;
							case 3:
								var time=this.getTime();
								var newpa=vl+3600;
								var pamax=this.getCharMaxPr();
								var paph=this.getCharPAPh();
								var full_pa=Math.ceil((pamax-this.char_data.pr)/paph)*3600;
								full_pa=this.char_data.pr_time-time+full_pa;
								if(full_pa<0) full_pa=0;
								$('#newpa1').text(this.convertTime(newpa));
								$('#newpa2').html(this.showTimer(newpa-time,'data-special="3"'));
								$('#fullpa1').text(this.convertTime(full_pa+time));
								$('#fullpa2').html(this.showTimer(full_pa));
								$('#baseprmax').text(this.dots(this.char_data['pr_max']));
								$('#baseprph').text(this.dots(this.char_data['pr_ph']));
							break;
							case 4:
								$('#char_rebp').html(this.rebPref(vl));
							break;
							case 5:
								if(this.shop_data&&this.shop_data.currency==2) $('#shop_currency_am').text(this.dots(vl));
							break;
							case 6:
								if(vl){
									if($('#has_ap').hasClass('disabled')){
										$('#has_ap').removeClass('disabled');
										$('.stat_upgrade').show();
									}
								}
								else{
									if(!$('#has_ap').hasClass('disabled')){
										$('#has_ap').addClass('disabled');
										$('.stat_upgrade').hide();
									}
								}
							break;
							case 7:
								if(vl) $('#level_lock').text(LNG.lab13);
								else $('#level_lock').text(LNG.lab14);
							break;
							case 8:
								var next=this.next_arena(this.char_data.arena_lvl+1);
								$('#arena_exp').text(vl+'/'+next);
								if(vl>=next) $('#arena_lvlup').show();
								else $('#arena_lvlup').hide();
								var w=vl/next*100;
								if(w<0) w=0;
								if(w>100) w=100;
								$('#arena_exp_bar').css({'width':w+'%'});
							break;
							case 9:
								if(vl) $('#monthly_vip_status').text(LNG.lab362);
								else $('#monthly_vip_status').text(LNG.lab363);
							break;
							case 10:
								if(vl){
									this.page_switch('game_special');
									$('.special_choose').hide();
									$('#special_choose_'+vl).show();
									this.specialParse(vl);
									JQS.qcc.hide();
								}
								else this.page_switch('game_map');
							break;
							case 11:
								$('#char_bagi').val(vl);
							break;
							case 12:
								if(vl==0) $('#village').html('');
								else $('#village').html(this.showVillage(this.char_data.village_id,this.char_data.ranga));
							break;
							case 13:
								$('.vilswitch').hide();
								if(vl==8) $('#page_org').show();
								else $('#page_vill').show();
							break;
							case 14:
								if(vl) $('#kage_ambition').prop('checked',true);
								else $('#kage_ambition').prop('checked',false);
							break;
						}
					}
					else{
						if(this.bindings[field][i].add_pbonus) vl+=Math.floor(base*this.getStat(this.bindings[field][i].add_pbonus)/100);
						if(this.bindings[field][i].add_bonus) vl+=this.getStat(this.bindings[field][i].add_bonus);
						if(this.bindings[field][i].is_abi&&vl>0&&this.abiunlock[this.bindings[field][i].is_abi]!=1){
							$('#abic'+this.bindings[field][i].is_abi).removeClass('disabled');
							this.abiunlock[this.bindings[field][i].is_abi]=1;
						}
						if(olds[f]&&this.bindings[field][i].ani) this.value_change_ani(this.bindings[field][i].c,olds[f],vl,500);
						else{
							if(this.bindings[field][i].dots) vl=this.dots(vl);
							this.bindings[field][i].c.innerText=vl;
						}
					}
				}
			}
		}
	}
}
GAME.showVillage = function(village_id,rank){
	var u='head';
	if(rank==8) u='nuk';
	return '<img src="/gfx/villages/'+u+'/'+village_id+'.png" data-toggle="tooltip" data-original-title="<div class=tt>'+LNG['village'+village_id]+'</div>" />';
}
GAME.specialParse = function(spec){
	switch(spec){
		case 2:
			$('#born_nature').html('<img src="/gfx/elements/'+this.char_data.cnature1+'.png" /> '+LNG['element'+this.char_data.cnature1]);
			var chances=[0,0,0,0,0,0];
			switch(this.char_data.cnature1){
				case 1: chances[1]=100; chances[2]=30; chances[3]=50; chances[4]=30; chances[5]=50; break;
				case 2: chances[1]=30; chances[2]=100; chances[3]=30; chances[4]=50; chances[5]=50; break;
				case 3: chances[1]=50; chances[2]=30; chances[3]=100; chances[4]=30; chances[5]=50; break;
				case 4: chances[1]=50; chances[2]=50; chances[3]=30; chances[4]=100; chances[5]=30; break;
				case 5: chances[1]=50; chances[2]=50; chances[3]=30; chances[4]=30; chances[5]=100; break;
			}
			for(var e=1;e<=5;e++){
				$('#nc_el'+e).text(chances[e]+'%');
			}
		break;
		case 5:
			$('#scnc'+this.char_data.cnature1).addClass('owned').prop('disabled',true);
		break;
		case 7:
			var con='';
			var ava=[];
			var zespo={
				'tai':{1:10,2:11,3:12,4:13,5:14},
				'ken':{1:15,2:16,3:17,4:18,5:19},
				'shuriken':{1:20,2:21,3:22,4:23,5:24}
			}
			if(this.char_data.tai>=1000){
				ava.push(zespo['tai'][this.char_data.cnature1]);
				ava.push(zespo['tai'][this.char_data.cnature2]);
			}
			if(this.char_data.ken>=1000){
				ava.push(zespo['ken'][this.char_data.cnature1]);
				ava.push(zespo['ken'][this.char_data.cnature2]);
			}
			if(this.char_data.shuriken>=1000){
				ava.push(zespo['shuriken'][this.char_data.cnature1]);
				ava.push(zespo['shuriken'][this.char_data.cnature2]);
			}
			if(this.char_data.gen>=1000){
				ava.push(25);
			}
			ava.push(this.mix_kg(this.char_data.cnature1,this.char_data.cnature2));
			var len=ava.length;
			for(var i=0;i<len;i++){
				con+='<button class="option pet_chooser" data-option="choose_kg" data-kg="'+ava[i]+'"><img src="/gfx/jutsu/8_'+ava[i]+'.png" /><br />'+LNG['kg'+ava[i]]+'</button>';
			}
			$('#kg_choose').html(con);
			option_bind();
		break;
		case 8:
			$('#trnc'+this.char_data.cnature1).addClass('owned').prop('disabled',true);
			$('#trnc'+this.char_data.cnature2).addClass('owned').prop('disabled',true);
		break;
		case 9:
			var con='';
			var ava=[this.mix_kt(this.char_data.cnature1,this.char_data.cnature2,this.char_data.cnature3)];
			if(this.char_data.tai>=4000){
				ava.push(14);
				ava.push(15);
			}
			if(this.char_data.ken>=4000){
				ava.push(16);
				ava.push(17);
			}
			if(this.char_data.shuriken>=4000){
				ava.push(18);
				ava.push(19);
			}
			if(this.char_data.gen>=4000){
				ava.push(11);
				ava.push(12);
				ava.push(13);
			}
			var len=ava.length;
			for(var i=0;i<len;i++){
				con+='<button class="option pet_chooser" data-option="choose_kt" data-kt="'+ava[i]+'"><img src="/gfx/jutsu/9_'+ava[i]+'.png" /><br />'+LNG['kt'+ava[i]]+'</button>';
			}
			$('#kt_choose').html(con);
			option_bind();
		break;
	}
}
GAME.mix_kt = function(e1,e2,e3){
	var kg=0;
	var elements=[e1,e2,e3];
	if(elements.indexOf(1)!=-1&&elements.indexOf(2)!=-1&&elements.indexOf(3)!=-1) kg=1;
	if(elements.indexOf(1)!=-1&&elements.indexOf(2)!=-1&&elements.indexOf(4)!=-1) kg=2;
	if(elements.indexOf(1)!=-1&&elements.indexOf(2)!=-1&&elements.indexOf(5)!=-1) kg=3;
	if(elements.indexOf(1)!=-1&&elements.indexOf(3)!=-1&&elements.indexOf(4)!=-1) kg=4;
	if(elements.indexOf(1)!=-1&&elements.indexOf(3)!=-1&&elements.indexOf(5)!=-1) kg=5;
	if(elements.indexOf(1)!=-1&&elements.indexOf(4)!=-1&&elements.indexOf(5)!=-1) kg=6;
	if(elements.indexOf(2)!=-1&&elements.indexOf(3)!=-1&&elements.indexOf(4)!=-1) kg=7;
	if(elements.indexOf(2)!=-1&&elements.indexOf(3)!=-1&&elements.indexOf(5)!=-1) kg=8;
	if(elements.indexOf(2)!=-1&&elements.indexOf(4)!=-1&&elements.indexOf(5)!=-1) kg=9;
	if(elements.indexOf(3)!=-1&&elements.indexOf(4)!=-1&&elements.indexOf(5)!=-1) kg=10;
	return kg;
}
GAME.mix_kg = function(e1,e2){
	var kg=0;
	switch(e1){
		case 1: 
			if(e2==2) kg=7; 
			if(e2==3) kg=4;
			if(e2==4) kg=6;
			if(e2==5) kg=8;
		break;
		case 2: 
			if(e2==1) kg=7; 
			if(e2==3) kg=99;
			if(e2==4) kg=1;
			if(e2==5) kg=5;
		break;
		case 3: 
			if(e2==1) kg=4;
			if(e2==2) kg=99; 
			if(e2==4) kg=2;
			if(e2==5) kg=3;
		break;
		case 4: 
			if(e2==1) kg=6;
			if(e2==2) kg=1; 
			if(e2==3) kg=2;
			if(e2==5) kg=9;
		break;
		case 5: 
			if(e2==1) kg=8;
			if(e2==2) kg=5; 
			if(e2==3) kg=3;
			if(e2==4) kg=9;
		break;
	}
	return kg;
}
GAME.processCharDataUpdate = function(field,value){
	if(this.char_data){
		var old=this.char_data[field];
		this.char_data[field]=value;
		if(field=='level'){
			var lg=this.char_data[field]-old;
			if(lg>0){
				this.expTooltipUpdate(0);
			}
		}
		if(field=='exp') this.updateExpBar();
		if(field=='pr'||field=='pr_max') this.paBarUpdate(1);
		if(field=='bot_lock'&&value==0) delete this.premiumData;
		this.charValuesBind([field],[old]);
		if(field=='instance_id'||field=='klan_id'||field=='org') this.prepareChatChannels();
		this.premiumBonCnt();
		this.recalculateDamages();
	}
}

Math.logBase = function(n, base) {
    return Math.log(n) / Math.log(base);
};

GAME.dmg_pattern = function(zdol,half){
	var mod=0;
	//if(zdol<100000){
		mod=(1+zdol*0.0002);
	//}
	//else mod=Math.logBase(zdol,1.1)-100;
	if(half) mod/=2;
	if(mod<1) mod=1;
	return mod;
}
GAME.recalculateDamages = function(){
	var min_yang=0,max_yang=this.char_data.sila+this.getStat(7);
	var min_yin=0,max_yin=this.char_data.moc+this.getStat(8);
	min_yang=Math.round(max_yang*0.95);
	min_yin=Math.round(max_yin*0.95);
	this.damages=[max_yin,max_yang];
	$('#yang_dmg').text(this.dots(min_yang)+' - '+this.dots(max_yang));
	$('#yin_dmg').text(this.dots(min_yin)+' - '+this.dots(max_yin));
}
GAME.completeProgress = function(){
	var res=this.progress;
	switch(res.a){
		case 45:
			if(res.ball){
				this.parseData(55,res);
			}
		break;
		case 212:
			if(this.crafting){
				if(this.crafting.am>1){
					this.crafting.am--;
					$('#craft_amount').val(this.crafting.am);
					GAME.emitOrder({a:212,type:3,rec:this.crafting.rec});
				}
				else delete this.crafting;
			}
			if(res.rec) this.parseCraft(2,res);
		break;
	}
	delete this.progress;
}
GAME.showProgress = function(res){
	this.progress=res;
	var progress=res.game_progress;
	$('#upgrade_bar').show();
	JQS.upb.css({'width':'0%'});
	$({someValue: 1}).animate({someValue: 100}, {
		duration: progress,
		step: function() {
			var val=Math.round(this.someValue);
			JQS.upb.css({'width':val+'%'});
			JQS.upp.text(val);
		},
		complete:function(){
			var val=Math.round(this.someValue);
			JQS.upb.css({'width':val+'%'});
			JQS.upp.text(val);
			$('#upgrade_bar').hide();
			GAME.completeProgress();
		}
	});
}
GAME.getPvPrange = function(level,reborn){
	var lmin=this.item_level(level);
	if(lmin==5){
		lmin=10;
		lmax=14;
	}
	else lmax=lmin+14;
	return [lmin,lmax];
}	
GAME.socket.on('disconnect', function(res){
	GAME.load_stop();
	if(GAME.pid>0){
		GAME.pid=0;
		GAME.komunikat(LNG.error2+'<br /><button class="option newBtn" data-option="logout">'+LNG.lab135+'</button>');
		$('#game_win').hide();
		option_bind();
	}
});
GAME.socket.on('gr', function(res){
	var e=parseInt(res.e);
	var me=0,done=0;
	if(res.me) me=parseInt(res.me);
	if(res.done) done=parseInt(res.done);
	GAME.load_stop();
	if(done>0){
		GAME.komunikat(LNG['done'+done]);
		if(GAME.push_actions.indexOf(done)!=-1) GAME.push_notification(LNG['done'+done]);
	}
	if(e>0){
		var kom=LNG['error'+e];
		var op=false;
		if(GAME.return_errors.indexOf(e)!=-1){
			op=true;
			kom+='<br /><button class="option newBtn" data-option="logout">'+LNG.lab135+'</button>';
		}
		switch(e){
			case 153:
				kom+='<button class="option newBtn" data-option="reload">'+LNG.lab320+'</button>';
				op=true;
			break;
			case 56:
			case 60:
			case 78:
			case 90:
				kom+=' '+GAME.showTimer(res.cd-GAME.getTime());
			break;
			case 114:
				kom+=': <b>'+res.n+'</b>';
			break;
			case 194:
				var range=GAME.getPvPrange(GAME.char_data.level,GAME.char_data.reborn);
				kom+='<br />('+range[0]+'-'+range[1]+')';
			break;
		}
		GAME.komunikat(kom);
		if(op) option_bind();
		$('#uploading').hide();
	}
	else if(me>0){
		JQS.mko.html('<div class="fight_reward floating">'+LNG['error'+me]+'</div>');
		GAME.floatingBind();
	}
	else if(res.game_progress) GAME.showProgress(res);
	else{
		if(res.reload_map) GAME.maploaded=false;
		if(res.show_map) GAME.page_switch('game_map');
		switch(res.a){
			case 1:
				GAME.parseData(1,res);
			break;
			case 2:
				GAME.useChar(res);
			break;
			case 3:
				if(res.more_players){
					GAME.loadMorePlayers(res.more_players);
				}
				else{
					if(GAME.map_titles){
						GAME.loadMap(res.loc,res.map,res.players,res.tps,res.kcastles,res.private_data,res.quests,res.mines,res.instance_data,res.wanted,res.balls,res.bosses);
					}
					else{
						GAME.loadMapJson(function(){
							GAME.loadMap(res.loc,res.map,res.players,res.tps,res.kcastles,res.private_data,res.quests,res.mines,res.instance_data,res.wanted,res.balls,res.bosses);
						});
					}
					GAME.parseTracker(res.track);
				}
			break;
			case 4:
				GAME.mapCharMove(res.char_id,res.x,res.y,res.dir);
			break;
			case 6:
				//
			break;
			case 7:
				if(res.quick){
					GAME.parseFightResult(res.result,1,res.result.reward);
				}
				else{
					GAME.parseFight(res.result);
					GAME.parseFightResult(res.result);
				}
				if(res.remove_mob) GAME.removeMob(res.remove_mob);
				if(res.apvp_cd){ 
					var pvp_master=false;
					if(GAME.premiumBonus(13)) pvp_master=true;
					var tid=res.apvp_cd.target;
					var qb='<button class="poption map_bicon" data-option="show_player" data-char_id="'+tid+'"><i class="in"></i></button>';
					qb+=GAME.showTimer(res.apvp_cd.cd-GAME.getTime(),'data-special="10" data-pd="'+tid+'"',' playercd'+tid+'');
					qb+='<button class="poption map_bicon initial_hide_forced playericons'+tid+'" data-option="arena_attack" data-char_id="'+tid+'"><i class="pa"></i></button>';
					if(pvp_master) qb+='<button class="poption map_bicon initial_hide_forced playericons'+tid+'" data-option="arena_attack" data-char_id="'+tid+'" data-quick="1"><i class="qa"></i></button>';
					$('#pvp_opts_'+tid).html(qb);
					pvp_option_bind();
				}
				if(res.pvp_cd){ 
					var pvp_master=false;
					if(GAME.premiumBonus(13)) pvp_master=true;
					var tid=res.pvp_cd.target;
					var qb='<button class="poption map_bicon" data-option="show_player" data-char_id="'+tid+'"><i class="in"></i></button>';
					qb+=GAME.showTimer(res.pvp_cd.cd-GAME.getTime(),'data-special="10" data-pd="'+tid+'"',' playercd'+tid+'');
					qb+='<button class="poption map_bicon initial_hide_forced playericons'+tid+'" data-option="pvp_attack" data-char_id="'+tid+'"><i class="pa"></i></button>';
					if(pvp_master) qb+='<button class="poption map_bicon initial_hide_forced playericons'+tid+'" data-option="pvp_attack" data-char_id="'+tid+'" data-quick="1"><i class="qa"></i></button>';
					$('#pvp_opts_'+tid).html(qb);
					pvp_option_bind();
				}
				if(res.gpvp_cd){ 
					var pvp_master=false;
					if(GAME.premiumBonus(13)) pvp_master=true;
					var tid=res.gpvp_cd.target;
					var qb='<button class="poption map_bicon" data-option="show_player" data-char_id="'+tid+'"><i class="in"></i></button>';
					qb+=GAME.showTimer(res.gpvp_cd.cd-GAME.getTime(),'data-special="10" data-pd="'+tid+'"',' playercd'+tid+'');
					qb+='<button class="poption map_bicon initial_hide_forced playericons'+tid+'" data-option="gpvp_attack" data-char_id="'+tid+'"><i class="pa"></i></button>';
					if(pvp_master) qb+='<button class="poption map_bicon initial_hide_forced playericons'+tid+'" data-option="gpvp_attack" data-char_id="'+tid+'" data-quick="1"><i class="qa"></i></button>';
					$('#gpvp_opts_'+tid).html(qb);
					pvp_option_bind();
				}
			break;
			case 8:
				if(res.done){
					GAME.train_captcha=0;
					$('#train_captcha').hide();
				}
				if(res.hasOwnProperty('captcha')) GAME.train_captcha=res.captcha;
				if(res.type==1) GAME.parseData(6,res);
				if(res.timed){
					GAME.char_tables['timed_actions']=res.timed;
					GAME.parseTimed();
				}
				if(res.multi) GAME.parseData(7,res.multi);
				if(res.mission_done){
					GAME.showMissionReward(res);
				}
			break;
			case 9:
				if(res.learned) GAME.learned_know=res.learned;
				if(res.available) GAME.parseData(8,res);
				if(res.old) GAME.parseData(9,res);
				if(res.timed){
					GAME.char_tables['timed_actions']=res.timed;
					GAME.parseTimed();
				}
			break;
			case 10:
				GAME.parseData(11,res);
				if(res.timed){
					GAME.char_tables['timed_actions']=res.timed;
					GAME.parseTimed();
				}
				if(res.owncamps){
					GAME.parseData(12,res);
				}
			break;
			case 11:
				if(res.raps) GAME.parseData(13,res);
				if(res.report){
					GAME.parseFight(JSON.parse(res.report));
				}
			break;
			case 12:
				if(res.used) GAME.parseUsedItems(res.used);
				if(res.stackable) GAME.parseStackableItems(res.stackable);
				if(res.cards){
					var kom='<div>'+LNG.lab52+'<div class="ekw_page_items">';
					var len=res.cards.length;
					for(var i=0;i<len;i++){
						kom+='<div class="small_card"><span>1</span><img src="/gfx/cards/'+res.cards[i]+'.png" /></div>';
					}
					kom+='</div></div>';
					GAME.komunikat(kom);
				}
				if(res.materials) GAME.parseMaterials(res.materials);
				if(res.questekw) GAME.parseQEkw(res.questekw);
				if(res.tip_id) GAME.parseTooltipItem(1,res.tip_id,res.item)
				if(res.iip_id) GAME.parseTooltipItem(2,res.iip_id,res.item)
				if(res.ekw) GAME.parseData(15,res);
				if(res.points) GAME.komunikat(LNG.lab30+' <b>'+GAME.dots(res.points)+'</b> '+LNG.lab31);
				if(res.joined) GAME.komunikat(LNG.lab33+'<br />'+LNG.lab34+': <b class="green">'+GAME.dots(res.succ)+'</b><br /> '+LNG.lab35+': <b class="red">'+GAME.dots(res.failed)+'</b>');
				if(res.upgraded) GAME.komunikat(LNG.lab33+'<br />'+LNG.lab34+': <b class="green">'+GAME.dots(res.succ)+'</b><br /> '+LNG.lab35+': <b class="red">'+GAME.dots(res.failed)+'</b>');
				if(res.jch){
					$('#join_succes_chance').text(res.jch);
					$('#join_ess_left').text(GAME.dots(res.ess));
				}
				if(res.uch){
					$('#upg_succes_chance').text(res.uch);
					$('#upg_sub_left').text(GAME.dots(res.sub));
				}
				if(res.rsubc){
					$('#rer_sub_left').text(GAME.dots(res.rsub));
				}
				if(res.spls) $('#spl_sub_left').text(GAME.dots(res.spls));
				if(res.need_amount) GAME.parseData(16,res);
				if(res.exchange) GAME.parseData(18,res);
				if(res.item_reward) GAME.parseData(17,res.item_reward);
				if(res.travel_list) GAME.parseData(25,res);
				if(res.tp_list) GAME.parseData(26,res);
				if(res.timed){
					GAME.char_tables['timed_actions']=res.timed;
					GAME.parseTimed();
				}
				if(res.set_fav){
					if(res.fav==0) $('.travel_loc_'+res.set_fav).removeClass('fav');
					else $('.travel_loc_'+res.set_fav).addClass('fav');
				}
				if(res.weeding){
					GAME.parseData(65,res);
				}
				if(res.chakra_crystal) GAME.chakraCrystalInterface(res.chakra_crystal);
				if(res.ability_up) GAME.komunikat('<i class="ico '+res.ability_up[0]+'"></i>'+LNG['abi_'+res.ability_up[0]]+' +<b>'+GAME.dots(res.ability_up[1])+'</b>');
				if(res.usable_item_reward){
					var itms='<div class="ekw_page_items">',len=res.usable_item_reward.length;
					for(var i=0;i<len;i++){
						itms+='<div class="ekw_slot option"><img src="/gfx/items/cons/'+res.usable_item_reward[i][0]+'.png" /><div>'+res.usable_item_reward[i][1]+'</div></div>';
					}
					itms+='</div>';
					GAME.komunikat(itms);
				}
			break;
			case 14:
				if(res.buffs) GAME.parseData(20,res);
				if(res.ubuffs) GAME.parseData(21,res);
				if(res.char_list) GAME.parseData(22,res);
				if(res.result) GAME.parseData(23,res);
				if(res.reset_done) GAME.komunikat(LNG.lab102);
			break;
			case 15:
				if(res.private_list) GAME.parseData(27,res);
				if(res.private_data) GAME.parseData(28,res);
			break;
			case 18:
				if(res.tree_techs) GAME.showTechTree(res.tree_techs);
			break;
			case 20:
				if(res.char_stats) GAME.parseData(31,res);
			break;
			case 21:
				if(res.black_gained){
					JQS.mko.html('<div class="fight_reward floating">'+LNG.lab108+'</div>');
					$('.floating').finish().animate({'opacity':0,top:'-=100px'},5000);
				}
			break;
			case 22:
				if(res.q_step) GAME.parseQuest(res);
				if(res.quest_end) GAME.endQuest(res.quest_end);
				if(res.quest_move) GAME.moveQuest(res.quest_move);
				if(res.qb) GAME.parseData(32,res);
				if(res.set_track){
					var html='<button class="option newBtn" data-option="cancel_track" data-qid="'+res.set_track+'">'+LNG.lab78+'</option>';
					$('#quest_track_td'+res.set_track).html(html);
					option_bind();
					GAME.maploaded=false;
				}
				if(res.cancel_track){
					var html='<button class="option newBtn disabled" data-option="activate_track" data-qid="'+res.cancel_track+'">'+LNG.lab99+'</option>';
					$('#quest_track_td'+res.cancel_track).html(html);
					option_bind();
					GAME.maploaded=false;
				}
				if(res.tracked) GAME.parseTracker(res.tracked);
				if(res.ipoints&&res.ipoints.length){
					var len=res.ipoints.length;
					for(var i=0;i<len;i++){
						var pp=$('#inst_playerpoints_'+res.ipoints[i].char_id+'_'+res.ipoints[i].server);
						var jp=document.getElementById('inst_playerpoints_'+res.ipoints[i].char_id+'_'+res.ipoints[i].server)
						pp.addClass('changing');
						GAME.value_change_ani(jp,pp.data('value'),res.ipoints[i].points,300,function(el){
							pp.removeClass('changing')
						});
						pp.data('value',res.ipoints[i].points);
					}
				}
				if(res.track){
					$('.quest_warunek'+res.track).each(function( index ){
						var th=$(this);
						var max=parseInt(th.data('max'));
						var cnt=parseInt(th.data('count'));
						cnt+=res.amount;
						if(cnt>=max){
							cnt=max;
							var par=th.parent();
							par.removeClass('red').addClass('green');
						}
						th.data('count',cnt);
						th.html(GAME.dots(cnt)+'/'+GAME.dots(max));
					});
					if(res.track==GAME.quest_action_qid){
						GAME.quest_action_count=res.new_amount;
						var pr=Math.min(GAME.quest_action_count/GAME.quest_action_max*100,100);
						$('#quest_bar_val').css({'width':pr+'%'});
					}
				}
				if(res.mining){
					GAME.miningHandler(1,res.mining);
				}
			break;
			case 23:
				GAME.parseData(33,res);
			break;
			case 25:
				if(res.server) GAME.server=res.server;
				if(res.bonusy) GAME.char_tables.bonusy=res.bonusy;
				if(res.shop_data) GAME.parseShop(1,res.shop_data);
				if(res.logs) GAME.parseData(34,res);
			break;
			case 26:
				if(res.daily_data) GAME.parseDaily(res);
			break;
			case 27:
				if(res.hasOwnProperty('available')){
					$('.subopt').hide();
					if(res.available) $('#sub_available').show();
					else $('#sub_notavailable').show();
				}
				if(res.login) $('#sub_own_login').text(res.login);
				if(res.log) GAME.parseData(35,res);
				if(res.zast_data){
					GAME.safe_zone=res.zast_data;
					GAME.parseZast();
				}
			break;
			case 28:
				if(res.default_gear) GAME.parseData(36,res);
			break;
			case 29:
				if(res.raids) GAME.parseData(37,res);
			break;
			case 30:
				if(res.show_skills) GAME.parseData(38,res);
			break;
			case 31:
				if(res.sword) GAME.parseData(39,res);
			break;
			case 32:
				if(res.wanted) GAME.parseData(40,res);
			break;
			case 33:
				if(res.dbp) GAME.parseData(41,res);
				if(res.hide_db){
					$('.dbsection').fadeOut();
					GAME.map_balls[res.hide_db]=false;
				}
				if(res.history) GAME.parseData(42,res);
			break;
			case 34:
				if(res.pd) GAME.parseData(43,res);
			break;
			case 35:
				if(res.friend_page) GAME.parseData(44,res);
				if(res.friend_added){
					GAME.komunikat(LNG.done47+'<br />'+LNG.lab236+'<br /><button class="btn_small_gold option" data-option="friend_invite">'+LNG.lab237+'</button>');
					$('#friend_invite').val(res.friend_added);
					option_bind();
				}
			break;
			case 36:
				if(res.achi_page) GAME.parseData(45,res);
			break;
			case 37:
				if(res.pw_list) GAME.parseData(46,res);
				if(res.pw_head) GAME.parseData(48,res);
			break;
			case 38:
				if(res.ranking) GAME.parseData(49,res);
			break;
			case 39:
				if(res.klan_page) GAME.parseClanData(res,1);
				if(res.logs) GAME.parseClanLog(res);
				if(res.invs) GAME.parseClanInvites(res,1);
				if(res.own_invs) GAME.parseClanInvites(res,2);
				if(res.structure_data) GAME.parseClanData(res,2);
				if(res.castles) GAME.parseClanData(res,3);
				if(res.players) GAME.parseClanData(res,4);
				if(res.wars) GAME.parseClanData(res,6);
				if(res.declare_result) GAME.parseClanData(res,7);
				if(res.war_tab) GAME.parseClanData(res,8);
				if(res.glories) GAME.parseClanData(res,13);
				if(res.notes) GAME.parseClanData(res,16);
				if(res.ekw) GAME.parseClanData(res,17);
				if(res.recall) GAME.parseClanData(res,18);
			break;
			case 40:
				if(res.klan_data) GAME.parseClanData(res,5);
			break;
			case 41:
				if(res.upgrades) GAME.parseData(50,res);
			break;
			case 42:
				if(res.shareds) GAME.parseData(51,res);
				if(res.pp) GAME.parseData(52,res);
			break;
			case 43:
				if(res.pets) GAME.parseData(53,res);
				if(res.hasOwnProperty('karmy')){
					$('#ilosc_karm').text(GAME.dots(res.karmy));
				}
				if(res.bonchange) pet_bon_change(res.bonchange);
			break;
			case 44:
				if(res.emps) GAME.parseData(54,res);
				if(res.inst_list){
					var len=res.inst_list.count,con='';
					for(var i=1;i<=len;i++){
						con+='<option value="'+i+'">'+res.inst_list.list[i][GAME.lang_data['lokacje'][GAME.lang]]+'</option>';
					}
					$('#emp_instances').html(con);
				}
				if(res.crystals_gained) GAME.komunikat(LNG.done75+' <b class="orange">'+GAME.dots(res.crystals_gained)+'</b>')
			break;
			case 45:
				if(res.ball){
					GAME.parseData(55,res);
				}
			break;
			case 46:
				if(res.area_oponents){
					GAME.parseData(56,res);
				}
			break;
			case 47:
				if(res.auctions){
					GAME.parseData(57,res);
				}
			break;
			case 48:
				if(res.bosses){
					GAME.parseData(58,res);
				}
			break;
			case 49:
				if(res.activities){
					GAME.parseData(59,res);
				}
				if(res.remove_promo) $('#promo_item').hide();
			break;
			case 50:
				if(res.emp_page){
					GAME.parseData(60,res);
				}
				if(res.war_tab) GAME.parseData(61,res);
				if(res.villstory) GAME.parseData(71,res);
				if(res.kagefights) GAME.parseData(72,res);
				if(res.report){
					GAME.parseFight(JSON.parse(res.report));
				}
			break;
			case 51:
				GAME.parseData(62,res);
			break;
			case 54:
				GAME.parseData(64,res);
			break;
			case 57:
				GAME.parseData(66,res);
			break;
			case 58:
				if(res.owned) GAME.parseData(74,res);
			break;
			case 59:
				if(res.soultower_info) GAME.parseData(75,res);
				if(res.show_fight){
					GAME.parseFight(res.result);
					GAME.parseFightResult(res.result);
				}
			break;
			case 201:
				GAME.parseTooltipTech(res.tech,res.level,res.rt1,res.rt2);
			break;
			case 202:
				if(res.timed){
					GAME.char_tables['timed_actions']=res.timed;
					GAME.parseTimed();
				}
			break;
			case 203:
				GAME.parseData(67,res);
			break;
			case 204:
				if(res.show_party){
					GAME.parseData(68,res);
				}
			break;
			case 206:
				if(res.world_data){
					GAME.worldData=res.world_data;
					GAME.recreateWorldMap();
				}
				if(res.show_map){
					GAME.maploaded=false;
					GAME.page_switch('game_map');
				}
			break;
			case 207:
				GAME.parseData(10,res);
				if(res.timed){
					GAME.char_tables['timed_actions']=res.timed;
					GAME.parseTimed();
				}
			break;
			case 208:
				if(res.banker) GAME.parseData(69,res);
			break;
			case 209:
				if(res.manus) GAME.parseData(70,res);
			break;
			case 210:
				if(res.update_abtra) GAME.prepareAbtra();
			break;
			case 211:
				if(res.exchange) GAME.parseExchange(res.exchange);
			break;
			case 212:
				if(res.show_crafting) GAME.parseCraft(1,res);
				if(res.rec) GAME.parseCraft(2,res);
				if(res.crafted) GAME.parseCraft(3,res);
			break;
			case 213:
				if(res.klan_page) GAME.parseOrgData(res,1);
				if(res.logs) GAME.parseOrgLog(res);
				if(res.invs) GAME.parseOrgInvites(res,1);
				if(res.own_invs) GAME.parseOrgInvites(res,2);
				if(res.structure_data) GAME.parseOrgData(res,2);
				if(res.players) GAME.parseOrgData(res,4);
			break;
			case 214:
				if(res.klan_data) GAME.parseOrgData(res,5);
			break;
			case 215:
				if(res.current) GAME.parseData(73,res);
			break;
			case 216:
				if(res.result){
					GAME.parseFight(res.result);
					GAME.parseFightResult(res.result);
				}
				if(res.show_map){
					GAME.maploaded=false;
					GAME.page_switch('game_map');
				}
			break;
			case 596:
				$('#ewar_'+res.war+'_s1').text(res.s1);
				$('#ewar_'+res.war+'_s2').text(res.s2);
			break;
			case 597:
				var con='<div class="ekw_slot" data-toggle="tooltip" data-original-title="'+GAME.getUsableItemDesc(res.promo.data)+'"><img src="/gfx/items/cons/'+res.promo.item_id+'.png" /><div>'+res.promo.amount+'</div></div>';
				$('#promo_item_con').html(con);
				$('#promo_timer').html(GAME.showTimer(res.promo.expires-GAME.getTime()));
				$('#promo_item').show();
				$('#promo_price').text(res.promo.price);
				tooltip_bind();
				main_ekw_item_bind();
				
			break;
			case 598:
				$('#war_'+res.war+'_s1').text(res.s1);
				$('#war_'+res.war+'_s2').text(res.s2);
			break;
			case 599:
				GAME.parseWars(res);
			break;
			case 600:
				GAME.parseData(2,res);
			break;
			case 601:
				GAME.parseData(3,res);
			break;
			case 602:
				GAME.parseData(5,res);
			break;
			case 603:
				GAME.parseData(19,res);
			break;
			case 604:
				GAME.parsePremiumAmount(res.new_amount);
			break;
			case 605:
				GAME.parseData(24,res);
			break;
			case 606:
				$('.char_avatar').attr('src',res.avatar);
				$('#uploading').hide();
			break;
			case 607:
				GAME.quick_opts=res.quick_opts;
				GAME.parseQuickOpts();
			break;
			case 608:
				if(res.delete_entry){
					var channel=res.delete_channel;
					$('#chat_entry_'+res.delete_entry).slideUp();
					var tmp=[];
					var len=GAME.chat_data[channel].messages.length;
					for(var i=0;i<len;i++){
						if(GAME.chat_data[channel].messages[i].id==res.delete_entry) continue;
						tmp.push(GAME.chat_data[channel].messages[i]);
					}
					GAME.chat_data[channel].messages=tmp;
				}
				if(res.muted_by) GAME.komunikat(LNG.lab208+' <b>'+res.dur+'</b> h - <b class="red">'+res.muted_by+'</b>');
			break;
			case 609:
				$('#pet_avatar').attr('src',res.avatar);
				$('#uploading').hide();
			break;
			case 777:
				GAME.instanceHandler(res);
			break;
			case 888:
				GAME.parsePremiumData(res);
			break;
			case 989:
				GAME.org_data=res.kd;
				GAME.processOrgData();
			break;
			case 990:
				GAME.klan_data=res.kd;
				GAME.processClanData();
			break;
			case 991:
				if(res.text_id==GAME.current_pw_text){
					var ans=res.answer;
					var cls='other';
					if(ans.autor==GAME.char_id) cls='me';
					var con='<div class="message '+cls+'"><div class="message_header"><b class="orange option pull-left" data-option="show_player" data-char_id="'+ans.autor+'">'+ans.autor_name+'</b> <span class="pull-right">'+GAME.convertTime(ans.time)+'</span></div><div class="clr">'+GAME.parseContent(ans.tresc)+'</div></div>';
					$('#answer_list').prepend(con);
				}
			break;
			case 992:
				GAME.pushNotification('<b>'+res.nick+'</b> '+LNG.lab240+' <span class="achi_'+res.al+'">'+LNG['game_achievement'+res.ai]+'</span> !');
			break;
			case 993:
				GAME.pushNotification('<b>'+res.nick+'</b> '+LNG['noti'+res.n]);
			break;
			case 994:
				GAME.char_bonuses=res.bonuses;
				GAME.charValuesBind(['pr_max','pr_ph','pr_time']);
				GAME.parseServerData();
			break; 
			case 995:
				if(res.t==2) GAME.parseData(14,res);
				if(res.t==1) GAME.parseData(47,res);
			break;
			case 996:
				GAME.locPlayerOut(res.char_id);
			break;
			case 997:
				GAME.locPlayerIn(res.char_id,res.data);
			break;
			case 998:
				if(res.fl){
					var len=res.fl.length;
					for(var i=0;i<len;i++){
						GAME.processCharDataUpdate(res.fl[i].f,res.fl[i].v);
					}
				}
				else GAME.processCharDataUpdate(res.f,res.v);
			break;
			case 999:
				GAME.pid=res.pid;
				GAME.login=res.login;
				GAME.server=res.server;
				GAME.servers=res.servers;
				GAME.main_page=res.main_page;
				GAME.initiate();
			break;
		}
	}
});
////////////////
$(window).on('beforeunload', function(){
	GAME.pid=0;
	GAME.socket.close();
});
var ts = timesync.create({
    server: '/timesync2'
});
ts.send = function (to, data) {
    $.ajax({
        url: to,
        type: 'POST',
        data: JSON.stringify(data),
        contentType : 'application/json',
        dataType: 'json' 
    })
    .done(function (data) {
        ts.receive(to, data);
    })
    .fail(function (err) {
        console.log('Error', err);
    });
};
function page_bind(){
	$('.select_page').on('click',function(){
		var page=$(this).data('page');
		var arg=$(this).data('arg');
		GAME.page_switch(page,arg);
		$('#player_desc_con').hide();
	});
}
page_bind();
$('#chat_form').on('submit',function(e){
	var mes=JQS.chm.val();
	JQS.chm.val('');
	GAME.emitOrder({a:601,channel:GAME.chat_channel,mes:mes});
	e.preventDefault();
	return false;
});
$('#klan_form').on('submit',function(e){
	var con=$('#klan_message');
	var mes=con.val();
	con.val('');
	var stick=$('#ced_stick').prop('checked');
	$('#ced_stick').prop('checked',false);
	GAME.emitOrder({a:39,type:52,mes:mes,stick:stick});
	e.preventDefault();
	return false;
});
$('#do_tren').on('submit',function(e){
	var stat=$('#train_stat').val();
	localStorage.setItem(GAME.char_id+'def_train_stat',stat);
	GAME.def_train_stat=stat;
	var data={a:8,type:2,stat:stat,duration:$('#train_duration').val()};
	if(GAME.captcha['train_captcha']) data.captchaResponse=grecaptcha.getResponse(GAME.response['train_captcha']);
	GAME.emitOrder(data);
	e.preventDefault();
	return false;
});
function select_chat_channel(channel){
	$('.chat_channel').removeClass('active');
	$('.chat_channel[data-channel="'+channel+'"]').addClass('active');
	GAME.chat_channel=channel;
	if(GAME.chat_data[GAME.chat_channel].old_loaded){
		$('#old_chat_opt').hide();
	}
	else $('#old_chat_opt').show();
	GAME.showChatChannel(1);
	GAME.chat_data[channel].new_msg_cnt=0;
	$('#chat_channel_'+channel+'_cnt').text('').addClass('empty');
}
function keybinds(){
	$(document).bind('keydown', 'w up', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.map_move(2); //0,-40
		}
		return false;
	});
	$(document).bind('keydown', 's down', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.map_move(1); //0,40
		}
		return false;
	});
	$(document).bind('keydown', 'a left', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.map_move(8); //-40,0
		}
		return false;
	});
	$(document).bind('keydown', 'd right', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.map_move(7); //40,0
		}
		return false;
	});
	$(document).bind('keydown', 'q', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.map_move(6);
		}
		return false;
	});
	$(document).bind('keydown', 'e', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.map_move(5);
		}
		return false;
	});
	$(document).bind('keydown', 'z', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.map_move(4);
		}
		return false;
	});
	$(document).bind('keydown', 'c', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.map_move(3);
		}
		return false;
	});
	$(document).bind('keydown', 'f', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.emitOrder({a:7,mob_num:GAME.field_mob_id,rank:0,quick:1});
		}
		return false;
	});
	$(document).bind('keydown', 'r', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.emitOrder({a:13,mob_num:GAME.field_mob_id,fo:GAME.map_options.ma});
		}
		return false;
	});
	$(document).bind('keydown', 'h', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.questAction();
		}
		return false;
	});
	$(document).bind('keydown', 'm', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.minimapToggle();
		}
		return false;
	});
	$(document).bind('keydown', 'x', function(){
		if(JQS.chm.is(":focus") == false){
			if(GAME.spacebind){
				$(GAME.spacebind).trigger('click');
			}
		}
		return false;
	});
	$(document).bind('keydown', 'ctrl', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.ctrl_pressed=true;
		}
		return false;
	});
	$(document).bind('keyup', 'ctrl', function(){
		if(JQS.chm.is(":focus") == false){
			GAME.ctrl_pressed=false;
		}
		return false;
	});
	$(document).bind('keyup', 'esc', function(){
		kom_clear();
		return false;
	});
}
$('#train_stat').on('change',function(){
	GAME.selected_train_stat=parseInt($(this).val());
	GAME.calculateTrainResult();
});
$('#train_duration').on('change',function(){
	GAME.selected_train_duration=parseInt($(this).val());
	GAME.calculateTrainResult();
});
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
function option_bind(){
	$('.option').off('click').on('click',function(){
		var th=$(this);
		if(th.is(':disabled')) return false;
		th.tooltip('hide');
		var option=th.data('option');
		switch(option){
			case 'reload':
				GAME.redirect('/',0);
			break;
			case 'logout':
				GAME.emitOrder({a:1,type:1});
				GAME.redirect(locals.main_url,0);
			break;
			case 'relog':
				GAME.emitOrder({a:5});
			break;
			case 'select_char':
				var char_id=parseInt(th.data('char_id'));
				GAME.emitOrder({a:2,char_id:char_id});
			break;
			case 'select_zast':
				var char_id=parseInt(th.data('char_id'));
				GAME.emitOrder({a:2,char_id:char_id,type:1});
			break;
			case 'chat_switch':
				if(GAME.chat_visible){
					GAME.chat_visible=0;
					$('#chat_inner_container').hide();
					$('#chat_containter').css({width:'100px',height:'40px'});
					$('#belkaChatu').css({width:'90px'});
					$('.chat_head').hide();
				}
				else{
					$('#chat_containter').css({width:'620px',height:GAME.chat_height+'px'});
					$('#belkaChatu').css({width:'610px'});
					$('.chat_head').show();
					GAME.chat_visible=1;
					$('#chat_inner_container').show();
					select_chat_channel(GAME.chat_channel);
					GAME.chat_nonread=0;
					GAME.updateChatRead(-1);
				}
			break;
			case 'change_chat_size':
				switch(GAME.chat_height){
					case 426:
						GAME.chat_height=526;
					break;
					case 526:
						GAME.chat_height=326;
					break;
					default: //316
						GAME.chat_height=426;
					break;
				}
				$('#chat_containter').css({height:GAME.chat_height+'px','bottom':0});
				$('#chat_messages').css({height:(GAME.chat_height-126)+'px'})
			break;
			case 'clear_chat_history':
				GAME.chat_data[GAME.chat_channel].messages=[];
				$('#chat_messages').empty();
			break;
			case 'load_chat_history':
				if(!GAME.chat_data[GAME.chat_channel].old_loaded){
					GAME.chat_data[GAME.chat_channel].old_loaded=1;
					GAME.emitOrder({a:600,channel:GAME.chat_channel,lm:GAME.chat_data[GAME.chat_channel].last_message});
				}
				$('#old_chat_opt').hide();
			break;
			case 'delete_entry':
				GAME.emitOrder({a:608,entry:th.data('entry'),ch:th.data('channel')});
			break;
			case 'mute_entry_player':
				kom_clear()
				var kom='<div><h3>'+LNG.lab206+' <div class="game_input small"><input id="mute_dur" type="text" value="1" /></div> h</h3>'+LNG.lab391+': <div class="game_input"><input id="mute_reason" type="text" value="" /></div><br /><br /><button class="option btn_small_gold" data-option="mute_entry_player_go" data-entry="'+th.data('entry')+'">'+LNG.lab207+'</button></div>';
				GAME.komunikat(kom);
				option_bind();
			break;
			case 'mute_entry_player_go':
				GAME.emitOrder({a:609,entry:th.data('entry'),dur:$('#mute_dur').val(),reason:$('#mute_reason').val()});
				kom_clear();
			break;
			case 'common_attack':
				var mob_num=parseInt(th.data('mob_id'));
				var rank=parseInt(th.data('mob-rank'));
				GAME.emitOrder({a:7,mob_num:mob_num,rank:rank});
				GAME.tutorialReqDone(6);
			break;
			case 'qroup_attack':
				var mob_num=parseInt(th.data('mob_id'));
				var rank=parseInt(th.data('mob-rank'));
				GAME.emitOrder({a:205,mob_num:mob_num,rank:rank});
			break;
			case 'quick_attack':
				var mob_num=parseInt(th.data('mob_id'));
				var rank=parseInt(th.data('mob-rank'));
				GAME.emitOrder({a:7,mob_num:mob_num,rank:rank,quick:1});
			break;
			case 'wanted_attack':
				GAME.emitOrder({a:32,type:1,wanted_id:th.data('mob_id')});
			break;
			case 'multi_attack':
				var mob_num=parseInt(th.data('mob_id'));
				GAME.emitOrder({a:13,mob_num:mob_num,fo:GAME.map_options.ma});
			break;
			case 'close_fight':
				clearInterval(GAME.fight_timer);
				$('#fight_view').fadeOut();
			break;
			case 'use_loc_tp':
				var tpid=parseInt(th.data('tpid'));
				GAME.emitOrder({a:6,tpid:tpid});
			break;
			case 'timed_cancel':
				GAME.ask_confirm(15,{a:8,type:3,order:th.data('order')});
			break;
			case 'atr_reset':
				GAME.ask_confirm(1,{a:18,type:4});
			break;
			case 'tech_reset':
				GAME.ask_confirm(2,{a:18,type:5});
			break;
			case 'nin_reset':
				GAME.ask_confirm(3,{a:18,type:6});
			break;
			case 'kin_reset':
				GAME.ask_confirm(4,{a:18,type:7});
			break;
			case 'sen_reset':
				GAME.ask_confirm(5,{a:18,type:8});
			break;
			/*
			case 'train_upgrade':
				GAME.emitOrder({a:8,type:5,doublec:$("#train_upgrade_double").is(':checked'),multi:$("#train_upgrade_multi").is(':checked'),captchaResponse:grecaptcha.getResponse(GAME.response['train_captcha'])});
				$("#train_upgrade_double").prop('checked',false);
				$("#train_upgrade_multi").prop('checked',false);
			break;
			*/
			case 'show_know':
				GAME.emitOrder({a:9,type:1,page:th.data('page')});
			break;
			case 'show_know2':
				GAME.emitOrder({a:9,type:2,page:th.data('page')});
			break;
			case 'know_learn':
				GAME.emitOrder({a:9,type:3,nid:th.data('know')});
			break;
			case 'start_camp':
				var data={a:10,type:2,ct:th.data('ct')}
				if(GAME.captcha['camp_captcha']) data.captchaResponse=grecaptcha.getResponse(GAME.response['camp_captcha']);
				GAME.emitOrder(data);
			break;
			case 'show_reps':
				GAME.emitOrder({a:11,page:th.data('page'),cat:th.data('cat')});
			break;
			case 'raps_delete':
				var arr = $.map($('.rep_check:checked'), function(e,i) {
					return +e.value;
				});
				GAME.emitOrder({a:11,type:2,delete:arr,page:GAME.rap_page,cat:GAME.rap_cat});
			break;
			case 'raps_delete_all':
				GAME.emitOrder({a:11,type:5,cat:GAME.rap_cat});
			break;
			case 'raps_resend':
				var arr = $.map($('.rep_check:checked'), function(e,i) {
					return +e.value;
				});
				GAME.emitOrder({a:11,type:6,list:arr,page:GAME.rap_page,cat:GAME.rap_cat,nick:$('#rep_send_to').val()});
			break;
			case 'open_rap':
				var rid=th.data('rid');
				GAME.emitOrder({a:11,type:4,rid:rid});
				$('#new_rap_id'+rid).fadeOut();
			break;
			case 'show_ekw_page':
				var page=parseInt(th.data('page'));
				GAME.ekw_page=page;
				GAME.emitOrder({a:12,page:GAME.ekw_page});
			break;
			case 'show_ekw_stackable':
				var page=parseInt(th.data('page'));
				GAME.ekw_page=page;
				GAME.emitOrder({a:12,type:7});
			break;
			case 'show_ekw_materials':
				var page=parseInt(th.data('page'));
				GAME.ekw_page=page;
				GAME.emitOrder({a:12,type:12});
			break;
			case 'show_ekw_quests':
				var page=parseInt(th.data('page'));
				GAME.ekw_page=page;
				GAME.emitOrder({a:12,type:13});
			break;
			case 'field_option_switch':
				$('#field_options').toggle();
			break;
			case 'destroy_item':
				GAME.emitOrder({a:12,type:6,iid:GAME.dragged_item.id,page:GAME.ekw_page});
				kom_clear()
			break;
			case 'upg2_item':
				GAME.emitOrder({a:12,type:10,iid:GAME.dragged_item.id,page:GAME.ekw_page});
				kom_clear()
			break;
			case 'rer2_item':
				GAME.emitOrder({a:12,type:24,iid:GAME.dragged_item.id,page:GAME.ekw_page});
				kom_clear()
			break;
			case 'trade_item':
				GAME.emitOrder({a:12,type:20,iid:GAME.dragged_item.id,page:GAME.ekw_page,nick:$('#trade_nick').val()});
				kom_clear()
			break;
			case 'donate_item':
				GAME.emitOrder({a:12,type:21,iid:th.data('iid'),am:parseInt($('#don_am').val())});
				kom_clear()
			break;
			case 'sac_item':
				GAME.emitOrder({a:12,type:22,iid:GAME.dragged_item.id,page:GAME.ekw_page});
				kom_clear()
			break;
			case 'sacrifice_item':
				var kom='<div>'+LNG.lab457+'<br /><img src="'+GAME.dragged_item.img+'" />'+LNG.lab458+'<br /><button class="option newBtn" data-option="sac_item">'+LNG.lab234+'</button></div>';
				GAME.komunikat(kom);
				option_bind();
			break;
			case 'des_item':
				destroy_item();
			break;
			case 'upg_item':
				upgrade_item();
			break;
			case 'rer_item':
				reroll_item();
			break;
			case 'tra_item':
				var kom='<div>'+LNG.lab234+'<br /><img src="'+GAME.dragged_item.img+'" />'+LNG.lab235+'<div class="game_input small"><input id="trade_nick" type="text" value="" /></div><br /><button class="option newBtn" data-option="trade_item">'+LNG.lab234+'</button></div>';
				GAME.komunikat(kom);
				option_bind();
			break;
			case 'clan_item':
				var kom='<div>'+LNG.lab450+'<br /><img src="'+GAME.dragged_item.img+'" /><br /><button class="option newBtn" data-option="clan_item_go">'+LNG.lab451+'</button><br /><i>'+LNG.lab452+'</i></div>';
				GAME.komunikat(kom);
				setmaxBind()
				option_bind();
			break;
			case 'clan_item_go':
				GAME.emitOrder({a:39,type:55,iid:GAME.dragged_item.id});
				kom_clear()
			break;
			case 'armory_item':
				GAME.emitOrder({a:39,type:58,iid:GAME.dragged_item.id});
			break;
			case 'unbind_item':
				GAME.emitOrder({a:39,type:59,iid:GAME.dragged_item.id});
			break;
			case 'clan_items_call':
				GAME.emitOrder({a:39,type:60});
			break;
			case 'auc_item':
				var kom='<div>'+LNG.lab321+'<br /><img src="'+GAME.dragged_item.img+'" /><br />'+LNG.lab322+': <div class="game_input vsmall"><input id="auc_start_bid" type="text" value="1" /></div><img src="/gfx/kp.png" /><br />'+LNG.lab323+': <div class="game_input vsmall"><input id="auc_buy_now" type="text" value="0" /></div><img src="/gfx/kp.png" /><br /><button class="option newBtn" data-option="auc_item_go">'+LNG.lab328+'</button><br /><i>'+LNG.lab324+'</i></div>';
				GAME.komunikat(kom);
				setmaxBind()
				option_bind();
			break;
			case 'auc_item_go':
				GAME.emitOrder({a:47,type:1,iid:GAME.dragged_item.id,start:$('#auc_start_bid').val(),buynow:$('#auc_buy_now').val()});
				kom_clear()
			break;
			case 'use_item':
				GAME.emitOrder({a:12,type:14,iid:GAME.dragged_item.id,page:GAME.ekw_page});
			break;
			case 'use_item_m':
				GAME.emitOrder({a:12,type:14,iid:GAME.dragged_item.id,page:GAME.ekw_page,am:parseInt($('#item_am').val())});
				kom_clear()
			break;
			case 'use_item_sel':
				th.tooltip('hide');
				var sel=parseInt(th.data('sel'));
				GAME.emitOrder({a:12,type:14,iid:GAME.dragged_item.id,page:GAME.ekw_page,sel:sel,am:$('#exchange_item_'+sel).val()});
				kom_clear()
			break;	
			case 'don_item':
				var kom='<div>'+LNG.lab243+'<br /><img src="'+th.data('gfx')+'" /><div class="game_input small"><input id="don_am" type="text" value="1" /></div><button class="set_max newBtn" data-target="#don_am" data-max="'+th.data('max')+'">MAX</button><br /><button class="option newBtn" data-option="donate_item" data-iid="'+th.data('iid')+'">'+LNG.lab234+'</button></div>';
				GAME.komunikat(kom);
				setmaxBind()
				option_bind();
			break;
			case 'show_tech_tree':
				GAME.emitOrder({a:18,type:1,c1:$(this).data('c1'),c2:$(this).data('c2')});
			break;
			case 'buff_upgrade':
				GAME.emitOrder({a:14,type:2,buff:th.data('buff')});
			break;
			case 'doubler_cancel':
				GAME.emitOrder({a:12,type:15});
			break;
			case 'lastmap_back':
				GAME.emitOrder({a:16});
			break;
			case 'upgrade_mystic':
				GAME.page_switch('game_mystic_up');
				var th=th;
				$('#mystic_stat_1').text(th.data('m1'));
				$('#mystic_stat_2').text(th.data('m2'));
				$('#mystic_stat_3').text(th.data('m3'));
				$('#mystic_stat_4').text(th.data('m4'));
				$('#mystic_stat_5').text(th.data('m5'));
			break;
			case 'tech_downgrade':
				GAME.emitOrder({a:18,type:2,tech_id:th.data('tech_id')});
			break;
			case 'tech_upgrade':
				GAME.emitOrder({a:18,type:3,tech_id:th.data('tech_id')});
			break;
			case 'show_quest':
				GAME.emitOrder({a:22,type:1,id:th.data('qb')});
			break;
			case 'finish_quest':
				GAME.tutorialReqDone(8);
				var go=true;
				if(th.data('confirm')){
					go=false;
				}
				if(go){
					GAME.emitOrder({a:22,type:2,button:th.data('button'),id:th.data('qb_id')});
				}
				else{
					GAME.ask_confirm(14,{a:22,type:2,button:th.data('button'),id:th.data('qb_id')});
				}
			break;
			case 'quest_duel':
				GAME.emitOrder({a:22,type:6,id:th.data('qid')});
			break;
			case 'quest_riddle':
				GAME.emitOrder({a:22,type:7,id:th.data('qid'),ans:$('#quest_riddle').val()});
			break;
			case 'start_mine':
				GAME.emitOrder({a:22,type:8,mid:th.data('mid')});
			break;
			case 'quest_try_again':
				GAME.emitOrder({a:22,type:9,id:th.data('qb_id')});
			break;
			case 'quest_action':
				GAME.questAction();
			break;
			case 'activate_track':
				GAME.emitOrder({a:22,type:4,id:th.data('qid')});
			break;
			case 'cancel_track':
				GAME.emitOrder({a:22,type:5,id:th.data('qid')});
			break;
			case 'mob_desc':
				GAME.emitOrder({a:23,id:th.data('mob'),rank:th.data('rank')});
				GAME.tutorialReqDone(7);
			break;
			case 'close_parent':
				th.parent().hide();
			break;
			case 'new_character':
				$('#newCharPopUp').fadeIn();
			break;
			case 'new_char_cancel':
				$('#newCharPopUp').fadeOut();
			break;
			case 'create_character':
				var sex=$('input[name=sex]:checked').val();
				var fab=$('input[name=race]:checked').val();
				GAME.emitOrder({a:1,type:2,sex:sex,fab:fab,name:$('#imie_postaci').val()});
			break;
			case 'open_menu':
				$('.menu_bar').hide();
				var em=th.data('menu');
				if(GAME.menu!=em){
					GAME.menu=em;
					$('#'+GAME.menu+'_menu').slideDown();
				}
				else{
					GAME.menu='';
				}
			break;
			case 'avatar_go':
				var file = $('#avatar_file').prop('files')[0];
				var stream = ss.createStream();
				if(file.type=='image/png'){
					GAME.is_loading=true;
					$('#uploading').show();
					$('#up_progress').text('0%');
					ss(GAME.socket).emit('player_avatar', stream, {size: file.size,name:file.name,type:file.type});
					var blobStream=ss.createBlobReadStream(file);
					var size = 0;
					blobStream.on('data', function(chunk) {
						size += chunk.length;
						var prog=Math.floor(size / file.size * 100);
						$('#up_progress').text(prog+'%');
					});
					blobStream.pipe(stream);
				}
				else GAME.komunikat(LNG.error53+file.type);
			break;
			case 'pet_avatar_go':
				if(GAME.pets[GAME.current_pet]){
					var file = $('#pet_avatar_file').prop('files')[0];
					var stream = ss.createStream();
					if(file.type=='image/png'){
						GAME.is_loading=true;
						$('#uploading').show();
						$('#up_progress').text('0%');
						ss(GAME.socket).emit('pet_avatar', stream, {size: file.size,name:file.name,type:file.type,pet:GAME.pets[GAME.current_pet].id});
						var blobStream=ss.createBlobReadStream(file);
						var size = 0;
						blobStream.on('data', function(chunk) {
							size += chunk.length;
							var prog=Math.floor(size / file.size * 100);
							$('#up_progress').text(prog+'%');
						});
						blobStream.pipe(stream);
					}
					else GAME.komunikat(LNG.error53+file.type);
				}
			break;
			case 'buffs_toggle':
				$('#char_buffs').toggle();
			break;
			case 'wea_item':
				GAME.emitOrder({a:12,type:5,iid:GAME.dragged_item.id,page:GAME.ekw_page});
			break;
			case 'close_ekw_menu':
				$('#ekw_item_menu').hide();
			break;
			case 'pvp_attack':
				GAME.emitOrder({a:24,char_id:th.data('char_id'),quick:th.data('quick')});
			break;
			case 'gpvp_attack':
				GAME.emitOrder({a:24,type:1,char_id:th.data('char_id'),quick:th.data('quick')});
			break;
			case 'shop_buy_upgrade':
				var id=th.data('id');
				GAME.emitOrder({a:25,type:2,id:id,c:GAME.shop_data.currency,am:parseInt($('#shop_chup_am_'+id).val())});
			break;
			case 'shop_item_buy':
				var id=parseInt(th.data('id'));
				GAME.shop_item_sel=id;
				var cim='';
				if(GAME.shop_data.currency==1) cim='<img src="/gfx/kp.png" />';
				else cim='<img src="/gfx/kk.png" />';
				var dis='';
				if(GAME.shop_data.items[id].only_one) dis='disabled';
				var kom='<div>'+LNG.lab157+'<br /><img src="/gfx/items/cons/'+GAME.shop_data.items[id].id+'.png" /><br /><br />'+LNG.lab158+': <div class="game_input small"><input id="shop_buyi_am" type="text" value="1" '+dis+' /></div> x '+GAME.shop_data.items[id].amount+' = <b id="shop_buyi_allam">'+GAME.shop_data.items[id].amount+'</b><br />'+LNG.lab57+': <span id="shop_buyi_cost">'+GAME.shop_data.items[id].cost+'</span>'+cim+'<br /><button class="option btn_small_gold" data-option="shop_buy_item_go">'+LNG.lab67+'</button></div>';
				GAME.komunikat(kom);
				option_bind();
				$('#shop_buyi_am').off().on('input',function(){
					var id=GAME.shop_item_sel;
					var val=parseInt($(this).val());
					var cost=val*GAME.shop_data.items[id].cost;
					$('#shop_buyi_cost').text(cost);
					var allam=val*GAME.shop_data.items[id].amount;
					$('#shop_buyi_allam').text(allam);
				});
			break;
			case 'shop_buy_item_go':
				GAME.emitOrder({a:25,type:4,id:GAME.shop_item_sel,c:GAME.shop_data.currency,am:parseInt($('#shop_buyi_am').val())});
				kom_clear()
			break;
			case 'shop_bon_buy':
				var b=parseInt(th.data('bon'));
				var dur=parseInt($('#shop_bon_'+b).val());
				
				GAME.emitOrder({a:25,type:5,id:b,c:GAME.shop_data.currency,am:dur});
			break;
			case 'confirm_cancel':
				kom_clear()
				delete GAME.confirm_order;
			break;
			case 'confirm_accept':
				kom_clear()
				GAME.emitOrder(GAME.confirm_order);
				delete GAME.confirm_order;
				switch(parseInt(th.data('cid'))){
					case 11:
						$('#transfer_nick_name').val('');
						$('#transfer_amount').val('1')
						GAME.load_captcha('#transfer_captcha','transfer_captcha');
					break;
				}
			break;
			case 'daily_reward':
				GAME.emitOrder({a:26,type:0});
			break;
			case 'use_usable':
				if(th.data('type') == 3)
					GAME.chakraCrystalInterface(th.data('iid'),th.data('amount'));
				else{
					var kom='<div>'+LNG.confirm20+'<br />'+LNG.lab158+': <div class="game_input small"><input id="usable_am" type="text" value="1" /></div> / '+th.data('amount')+' <br /><button class="option btn_small_gold" data-iid="'+th.data('iid')+'" data-option="use_usable_go">'+LNG.lab98+'</button></div>';
					GAME.komunikat(kom);
				
					option_bind();
				}
				
				//GAME.ask_confirm(20,{a:12,type:8,iid:$(this).data('iid'),sel:sel});
				//GAME.emitOrder({a:12,type:8,iid:$(this).data('iid'),sel:sel});
			break;
			case 'use_usable_go':
				var sel=0;
				if(parseInt($(this).data('crystal'))){
					sel=parseInt($('input[name=ccprize]:checked').val());
				}
				GAME.emitOrder({a:12,type:8,iid:$(this).data('iid'),amount:$('#usable_am').val(),sel:sel});
				kom_clear()
			break;
			case 'select_jutsu_cat':
				GAME.selectJutsuCat(parseInt($(this).data('cat')));
			break;
			case 'daily_close':
				$('#daily_reward').fadeOut();
			break;
			case 'take_daily':
				GAME.emitOrder({a:26,type:1});
			break;
			case 'minimap_toggle':
				GAME.minimapToggle();
			break;
			case 'quick_use_item':
				hide_tooltips();
				kom_clear()
				GAME.ask_confirm(20,{a:12,type:8,iid:$(this).data('item_id'),sel:0});
				//GAME.emitOrder({a:12,type:19,iid:th.data('item_id')});
				
			break;
			case 'quick_use_senzu':
				kom_clear()
				var senzus=GAME.quick_opts.senzus;
				var len=senzus.length;
				var kom='<div class="quest_desc">';
				for(var i=0;i<len;i++){
					kom+='<div class="option ekw_page_items" data-option="quick_use_item" data-item_id="'+senzus[i].id+'"><div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt>'+senzus[i][GAME.lang]+'</div>" data-item_id="'+senzus[i].id+'"><img src="/gfx/items/cons/'+senzus[i].item_id+'.png" /><div>'+senzus[i].stack+'</div></div></div>';
				}
				kom+='<div class="clr"></div></div>';
				GAME.komunikat(kom);
				option_bind();
				//player_ekw_item_bind();
				tooltip_bind();
			break;
			case 'quick_use_subs':
				kom_clear()
				var senzus=GAME.quick_opts.sub;
				var len=senzus.length;
				var kom='<div class="quest_desc">';
				for(var i=0;i<len;i++){
					kom+='<div class="option ekw_page_items" data-option="quick_use_item" data-item_id="'+senzus[i].id+'"><div class="ekw_slot" data-toggle="tooltip" data-original-title="<div class=tt>'+senzus[i][GAME.lang]+'</div>" data-item_id="'+senzus[i].id+'"><img src="/gfx/items/cons/'+senzus[i].item_id+'.png" /><div>'+senzus[i].stack+'</div></div></div>';
				}
				kom+='<div class="clr"></div></div>';
				GAME.komunikat(kom);
				option_bind();
				//player_ekw_item_bind();
				tooltip_bind();
			break;
			case 'compress_items':
				kom_clear();
				var senzus=GAME.compress_items;
				var len=senzus.length;
				var kom='<div class="quest_desc">';
				kom+='<div class="option fast_ekw" data-option="quest_use_item" data-qb_id="'+th.data('qb_id')+'"><div class="ekw_slot player_ekw_item"><img src="/gfx/items/cons/34.png" /><div>'+senzus+'</div></div></div>';
				
				kom+='</div>';
				GAME.komunikat(kom);
				option_bind();
				player_ekw_item_bind();
				tooltip_bind();
			break;
			case 'quest_use_item':
				kom_clear();
				GAME.emitOrder({a:22,type:10,qb_id:th.data('qb_id')});
			break;
			case 'close_quest':
				$('#quest_con').fadeOut();
			break;
			case 'show_logs':
				GAME.emitOrder({a:25,type:6,c:GAME.currency,page:th.data('page')});
			break;
			case 'set_substitution':
				var opts=[0];
				for(var i=1;i<=14;i++){
					if($('#subs_mode_'+i).prop('checked')) opts[i]=1;
					else opts[i]=0;
				}
				GAME.emitOrder({a:27,type:1,login:$('#subs_login').val(),duration:$('#subs_duration').val(),opts:opts});
			break;
			case 'map_move':
				GAME.map_move(th.data('dir'));
				GAME.tutorialReqDone(5);
			break;
			case 'map_multi':
				GAME.emitOrder({a:13,mob_num:GAME.field_mob_id,fo:GAME.map_options.ma});
			break;
			case 'qmattack':
				GAME.emitOrder({a:7,mob_num:0,rank:th.data('rank'),quick:1});
			break;
			case 'qmattacko':
				GAME.emitOrder({a:7,order:th.data('order'),quick:1,fo:GAME.map_options.ma});
			break;
			case 'obtain_free_cloth':
				GAME.emitOrder({a:28,type:1,cloth:th.data('cloth')});
			break;
			case 'obtain_rank_cloth':
				GAME.emitOrder({a:28,type:3,cloth:th.data('cloth')});
			break;
			case 'use_cloth':
				GAME.emitOrder({a:28,type:2,cloth:th.data('cloth')});
			break;
			case 'show_instance':
				GAME.emitOrder({a:29,type:1,instance:th.data('instance')});
			break;
			case 'instance_create_room':
				GAME.emitOrder({a:29,type:2,instance:GAME.current_instance});
			break;
			case 'delete_instance_room':
				GAME.emitOrder({a:29,type:3,room:th.data('room')});
			break;
			case 'join_instance_room':
				GAME.emitOrder({a:29,type:4,room:th.data('room'),instance:th.data('instance')});
			break;
			case 'room_apply':
				GAME.emitOrder({a:29,type:5,room:th.data('room'),apply:th.data('apply'),state:th.data('state')});
			break;
			case 'leave_instance_room':
				GAME.emitOrder({a:29,type:6,room:th.data('room')});
			break;
			case 'start_instance_room':
				GAME.emitOrder({a:29,type:7,room:th.data('room')});
			break;
			case 'enter_instance_room':
				GAME.emitOrder({a:29,type:8,room:th.data('room')});
			break;
			case 'skill_page_switch':
				var page=parseInt(th.data('page'));
				$('.skill_page').hide();
				$('.skb').removeClass('active');
				$('.skb[data-page="'+page+'"]').addClass('active');
				$('#skill_page_'+page).show();
			break;
			case 'skill_cost_switch':
				GAME.skill_cost=th.data('cost');
				$('.skill_cost').hide();
				$('.'+GAME.skill_cost+'_cost').show();
			break;
			case 'divine_tree_choose':
				GAME.emitOrder({a:30,type:1,tree:th.data('tree')});
			break;
			case 'skill_upgrade':
				GAME.emitOrder({a:30,type:2,skill:th.data('skill'),cost:th.data('cost')});
			break;
			case 'select_skill_set':
				GAME.emitOrder({a:30,type:3,set:th.data('set')});
			break;
			case 'pact_reset':
				GAME.ask_confirm(2,{a:30,type:5});
			break;
			case 'sentinel_reset':
				GAME.ask_confirm(3,{a:30,type:6});
			break;
			case 'god_reset':
				GAME.ask_confirm(4,{a:30,type:7});
			break;
			case 'upgrade_sword':
				GAME.emitOrder({a:31,type:2,item_id:GAME.sword_data.id});
			break;
			case 'wanted_prize':
				GAME.emitOrder({a:32,type:2,wanted:th.data('wanted')});
			break;
			case 'psk_wish':
				GAME.emitOrder({a:33,type:1,am:$('#psk_wish_am').val(),wish:$('input[name="psk_wish"]:checked').val()});
			break;
			case 'bsk_wish':
				GAME.emitOrder({a:33,type:2,am:$('#bsk_wish_am').val(),wish:$('input[name="bsk_wish"]:checked').val()});
			break;
			case 'pick_db':
				GAME.emitOrder({a:33,type:3,id:th.data('id')});
			break;
			case 'mdb_wish':
				GAME.emitOrder({a:33,type:4,wish:$('input[name="mdb_wish"]:checked').val()});
			break;
			case 'load_db_history':
				GAME.emitOrder({a:33,type:5,btype:th.data('type')});
			break;
			case 'ball_fight':
				GAME.emitOrder({a:33,type:6,char_id:th.data('char_id'),ball:th.data('ball_id')});
			break;
			case 'show_player':
				GAME.emitOrder({a:34,type:0,char_id:th.data('char_id')});
			break;
			case 'bless_player':
				GAME.page_switch('game_buff_use');
				$('#bless_players').val(th.data('char_name'));
				$('#player_desc_con').hide();
			break;
			case 'invite_friend':
				GAME.page_switch('game_friends');
				$('#friend_invite').val(th.data('char_name'));
				$('#player_desc_con').hide();
			break;
			case 'friend_invite':
				GAME.emitOrder({a:35,type:1,nick:$('#friend_invite').val()});
			break;
			case 'process_friend_req':
				GAME.emitOrder({a:35,type:2,dec:th.data('decision'),rid:th.data('rid')});
			break;
			case 'delete_friend':
				GAME.emitOrder({a:35,type:3,target:th.data('char_id')});
			break;
			case 'delete_friend_from':
				GAME.emitOrder({a:35,type:4,rid:th.data('rid')});
			break;
			case 'receive_achi_prize':
				GAME.emitOrder({a:36,type:1,achi:th.data('achi')});
			break;
			case 'new_pw':
				$('#new_pw_btn').hide();
				$('#new_pw_container').show();
				$('#pw_view').hide();
				$('#pw_topic').val('');
				$('#pw_content').val('');
			break;
			case 'cancel_pw':
				$('#new_pw_btn').show();
				$('#new_pw_container').hide();
				$('#pw_view').hide();
			break;
			case 'send_pw':
				GAME.emitOrder({a:37,type:1,page:1,nick:$('#pw_nick').val(),topic:$('#pw_topic').val(),content:$('#pw_content').val()});
				$('#new_pw_container').hide();
				$('#new_pw_btn').show();
				$('#pw_view').hide();
			break;
			case 'village_chooser':
				GAME.emitOrder({a:202,type:1});
			break;
			case 'nature_choose':
				GAME.emitOrder({a:202,type:2,ele:th.data('element')});
			break;
			case 'open_pw':
				GAME.emitOrder({a:37,type:2,ans_page:th.data('page'),pid:th.data('pid')});
			break;
			case 'pw_answer':
				GAME.emitOrder({a:37,type:3,pid:GAME.current_pw,ans:$('#answer_area').val()});
				$('#answer_area').val('');
			break;
			case 'show_pws':
				GAME.emitOrder({a:37,page:th.data('page')});
			break;
			case 'pws_delete':
				var arr = $.map($('.pw_check:checked'), function(e,i) {
					return +e.value;
				});
				GAME.emitOrder({a:37,type:4,delete:arr,page:1});
			break;
			case 'send_pw_to':
				GAME.page_switch('game_pw');
				$('#pw_nick').val(th.data('char_name'));
				$('#player_desc_con').hide();
				$('#new_pw_btn').hide();
				$('#new_pw_container').show();
				$('#pw_view').hide();
			break;
			case 'rank_page':
				GAME.emitOrder({a:38,page:th.data('page'),rank_type:GAME.ranking_type,field:GAME.rank_field,searchv:GAME.rank_findby,value:GAME.rank_findbyv});
			break;
			case 'rank_pos_search':
				var page=Math.ceil(parseInt($('#rank_search_pos').val())/20);
				GAME.emitOrder({a:38,page:page,rank_type:GAME.ranking_type,field:GAME.rank_field});
			break;
			case 'rank_name_search':
				GAME.emitOrder({a:38,page:1,rank_type:GAME.ranking_type,field:GAME.rank_field,search:$('#rank_search_name').val()});
			break;
			case 'delete_buff':
				GAME.emitOrder({a:14,type:7,buff:th.data('buff')});
			break;
			case 'create_org':
				GAME.emitOrder({a:213,type:1,short:$('#new_org_short').val()});
			break;
			case 'create_klan':
				GAME.emitOrder({a:39,type:1,short:$('#new_clan_short').val()});
			break;
			case 'clan_page_switch':
				var page=th.data('page');
				$('.clan_inner_page').hide();
				$('#clan_inner_'+page).show();
				switch(page){
					case 'invites':
						GAME.emitOrder({a:39,type:3});
					break;
					case 'structures':
						GAME.emitOrder({a:39,type:9});
					break;
					case 'castles':
						GAME.emitOrder({a:39,type:12});
					break;
					case 'players':
						GAME.emitOrder({a:39,type:15});
					break;
					case 'wars':
						GAME.emitOrder({a:39,type:23});
					break;
					case 'clan_planet':
						GAME.emitOrder({a:39,type:28});
					break;
					case 'planets':
						GAME.emitOrder({a:39,type:33});
					break;
					case 'stelep':
						GAME.emitOrder({a:39,type:35});
					break;
					case 'glory':
						GAME.emitOrder({a:39,type:41});
					break;
					case 'krent':
						GAME.emitOrder({a:39,type:47});
					break;
					case 'notes':
						GAME.emitOrder({a:39,type:51});
					break;
					case 'armory':
						GAME.emitOrder({a:39,type:56});
					break;
				}
			break;
			case 'org_page_switch':
				var page=th.data('page');
				$('.org_inner_page').hide();
				$('#org_inner_'+page).show();
				switch(page){
					case 'invites':
						GAME.emitOrder({a:213,type:3});
					break;
					case 'structures':
						GAME.emitOrder({a:213,type:9});
					break;
					case 'players':
						GAME.emitOrder({a:213,type:15});
					break;
				}
			break;
			case 'clan_invite':
				GAME.emitOrder({a:39,type:2,nick:$('#clan_inv_nick').val()});
			break;
			case 'org_invite':
				GAME.emitOrder({a:213,type:2,nick:$('#org_inv_nick').val()});
			break;
			case 'cancel_inv':
				GAME.emitOrder({a:39,type:4,inv:th.data('inv')});
			break;
			case 'cancel_oinv':
				GAME.emitOrder({a:213,type:4,inv:th.data('inv')});
			break;
			case 'inv_decision':
				GAME.emitOrder({a:39,type:5,inv:th.data('inv'),dec:th.data('dec')});
			break;
			case 'oinv_decision':
				GAME.emitOrder({a:213,type:5,inv:th.data('inv'),dec:th.data('dec')});
			break;
			case 'clan_donate_kp':
				GAME.emitOrder({a:39,type:7,am:$('#klan_donate_kp').val()});
			break;
			case 'org_donate_kp':
				GAME.emitOrder({a:213,type:7,am:$('#org_donate_kp').val()});
			break;
			case 'clan_donate_gold':
				GAME.emitOrder({a:39,type:32,am:$('#klan_donate_gold').val()});
			break;
			case 'org_donate_gold':
				GAME.emitOrder({a:213,type:32,am:$('#org_donate_gold').val()});
			break;
			case 'upgrade_org_lvl':
				GAME.emitOrder({a:213,type:33});
			break;
			case 'upgrade_clan_lvl':
				GAME.emitOrder({a:39,type:33});
			break;
			case 'show_clan_log':
				GAME.emitOrder({a:39,type:8,page:th.data('page')});
			break;
			case 'show_org_log':
				GAME.emitOrder({a:213,type:8,page:th.data('page')});
			break;
			case 'clan_struct_up':
				GAME.ask_confirm(19,{a:39,type:10,struct:th.data('struct')});
			break;
			case 'org_struct_up':
				GAME.ask_confirm(19,{a:213,type:10,struct:th.data('struct')});
			break;
			case 'activate_clan_buff':
				GAME.emitOrder({a:39,type:34,buff:th.data('buff')});
			break;
			case 'clan_struct_upgrade':
				GAME.emitOrder({a:39,type:11,struct:th.data('struct')});
			break;
			case 'create_castle':
				GAME.emitOrder({a:39,type:13});
			break;
			case 'clan_castle_up':
				GAME.emitOrder({a:39,type:14,castle:th.data('castle')});
			break;
			case 'edit_clan_player':
				GAME.editClanPlayer(parseInt(th.data('pind')));
			break;
			case 'clan_player_edit_go':
				var laws={};
				var len=GAME.clan_law_labels.length;
				for(var i=0;i<len;i++){
					laws[GAME.clan_law_labels[i]]=$('#ced_law_'+GAME.clan_law_labels[i]).prop('checked');
				}
				GAME.emitOrder({a:39,type:16,char_id:th.data('char_id'),rank:$('#clan_player_rank').val(),laws:laws});
			break;
			case 'org_player_leader':
				GAME.ask_confirm(18,{a:213,type:11,char_id:th.data('char_id')});
			break;
			case 'close_sc_menu':
				$('#soulcard_menu').hide();
			break;
			case 'set_hire_status':
				GAME.emitOrder({a:213,type:12});
			break;
			case 'org_hire_cost':
				GAME.emitOrder({a:213,type:13,cost:$('#org_hire_cost').val()});
			break;
			case 'org_player_out':
				GAME.emitOrder({a:213,type:17,char_id:th.data('char_id')});
			break;
			case 'clan_player_out':
				GAME.emitOrder({a:39,type:17,char_id:th.data('char_id')});
			break;
			case 'clan_change_name':
				GAME.emitOrder({a:39,type:18,short:$('#klan_change_short').val(),long:$('#klan_change_long').val()});
			break;
			case 'take_armory_item':
				GAME.emitOrder({a:39,type:57,iid:th.data('iid')});
			break;
			case 'take_char_item':
				GAME.emitOrder({a:39,type:61,iid:th.data('iid')});
			break;
			case 'clan_player_assign':
				GAME.ask_confirm(5,{a:39,type:19,char_id:th.data('char_id')});
			break;
			case 'clan_disband':
				GAME.ask_confirm(6,{a:39,type:20});
			break;
			case 'org_disband':
				GAME.ask_confirm(17,{a:213,type:20});
			break;
			case 'clan_send_pw':
				GAME.emitOrder({a:39,type:21,targets:$('#clan_pw_target').val(),topic:$('#clan_pw_topic').val(),content:$('#clan_pw_content').val()});
			break;
			case 'org_send_pw':
				GAME.emitOrder({a:213,type:21,topic:$('#org_pw_topic').val(),content:$('#org_pw_content').val()});
			break;
			case 'clan_leave':
				GAME.ask_confirm(7,{a:39,type:6});
			break;
			case 'org_leave':
				GAME.ask_confirm(16,{a:213,type:6});
			break;
			case 'logo_go':
				var file = $('#logo_file').prop('files')[0];
				var stream = ss.createStream();
				if(file.type=='image/png'){
					GAME.is_loading=true;
					$('#uploading').show();
					$('#up_progress').text('0%');
					ss(GAME.socket).emit('clan_logo', stream, {size: file.size,name:file.name,type:file.type});
					var blobStream=ss.createBlobReadStream(file);
					var size = 0;
					blobStream.on('data', function(chunk) {
						size += chunk.length;
						var prog=Math.floor(size / file.size * 100);
						$('#up_progress').text(prog+'%');
					});
					blobStream.pipe(stream);
				}
				else GAME.komunikat(LNG.error53+file.type);
			break;
			case 'emblem_go':
				var file = $('#emblem_file').prop('files')[0];
				var stream = ss.createStream();
				if(file.type=='image/png'){
					GAME.is_loading=true;
					$('#uploading').show();
					$('#up_progress').text('0%');
					ss(GAME.socket).emit('clan_emblem', stream, {size: file.size,name:file.name,type:file.type});
					var blobStream=ss.createBlobReadStream(file);
					var size = 0;
					blobStream.on('data', function(chunk) {
						size += chunk.length;
						var prog=Math.floor(size / file.size * 100);
						$('#up_progress').text(prog+'%');
					});
					blobStream.pipe(stream);
				}
				else GAME.komunikat(LNG.error53+file.type);
			break;
			case 'org_text_edit':
				var type=parseInt(th.data('type')),val='';
				if(type==1) val=$('#org_text').sceditor('instance').val();
				else val=$('#org_opis').sceditor('instance').val();
				GAME.emitOrder({a:213,type:22,type2:type,text:val});
			break;
			case 'clan_text_edit':
				var type=parseInt(th.data('type')),val='';
				if(type==1) val=$('#clan_text').sceditor('instance').val();
				else val=$('#clan_opis').sceditor('instance').val();
				GAME.emitOrder({a:39,type:22,type2:type,text:val});
			break;
			case 'show_clan':
				var klan_id=parseInt(th.data('klan_id'));
				GAME.emitOrder({a:40,klan_id:klan_id});
			break;
			case 'show_org':
				var org_id=parseInt(th.data('org_id'));
				GAME.emitOrder({a:214,org_id:org_id});
			break;
			case 'clan_war':
				GAME.emitOrder({a:39,type:24,shorts:$('#war_field').val()});
				$('#war_field').val('');
			break;
			case 'show_clan_war_table':
				GAME.emitOrder({a:39,type:25,war:th.data('war_id')});
			break;
			case 'activate_war_buff':
				GAME.emitOrder({a:39,type:26});
			break;
			case 'war_switch':
				$('#all_war_con').toggle();
			break;
			case 'e_war_switch':
				$('#ewar_list').toggle();
			break;
			case 'c_war_switch':
				$('#war_list').toggle();
			break;
			case 'clan_challenge_end':
				GAME.emitOrder({a:39,type:42});
			break;
			case 'activate_clan_challenge':
				GAME.emitOrder({a:39,type:43,glory:th.data('glory')});
			break;
			case 'rank_choose':
				var page=parseInt(th.data('page'));
				GAME.ranking_type=page;
				$('.ranking_choose').removeClass('active');
				th.addClass('active');
				$('.ranking_page').hide();
				$('#rank_'+page).show();
				GAME.emitOrder({a:38,page:1,rank_type:GAME.ranking_type});
			break;
			case 'lab_upgrade':
				GAME.emitOrder({a:41,type:1,upg:th.data('upg')});
			break;
			case 'sett_page':
				$('.sett_pageb').removeClass('active');
				th.addClass('active');
				$('.sett_page').hide();
				var page=th.data('page');
				$('#sett_page_'+page).show();
				switch(page){
					case 'shared':
						GAME.emitOrder({a:42,type:1});
					break;
					case 'char':
						GAME.emitOrder({a:42,type:9});
					break;
				}
			break;
			case 'init_shared':
				GAME.emitOrder({a:42,type:2,login:$('#shared_login').val()});
			break;
			case 'accept_shared':
				GAME.emitOrder({a:42,type:3});
			break;
			case 'cancel_shared':
				GAME.emitOrder({a:42,type:4,shared:th.data('shared')});
			break;
			case 'sett_change_name':
				GAME.emitOrder({a:42,type:5,nick:$('#new_name').val()});
			break;
			case 'sett_change_level_lock':
				GAME.emitOrder({a:42,type:6});
			break;
			case 'char_reset':
				GAME.ask_confirm(8,{a:42,type:7});
			break;
			case 'delete_character':
				GAME.emitOrder({a:42,type:8,pass:$('#cg_password_delete').val()});
			break;
			case 'char_text_edit':
				GAME.emitOrder({a:42,type:10,text:1,content:$('#profile_text').sceditor('instance').val()});
			break;
			case 'char_notes_edit':
				GAME.emitOrder({a:42,type:10,text:2,content:$('#notes_text').sceditor('instance').val()});
			break;
			case 'select_title':
				GAME.emitOrder({a:42,type:11,title:th.data('title')});
			break;
			case 'pet_active':
				GAME.emitOrder({a:43,type:1,pet:th.data('pet')});
			break;
			case 'pet_lvlup': 
				GAME.emitOrder({a:43,type:2,pet:GAME.pets[GAME.current_pet].id,method:th.data('type')});
			break;
			case 'pet_release':
				GAME.ask_confirm(9,{a:43,type:4,pet:GAME.pets[GAME.current_pet].id});
			break;
			case 'pet_add_stat':
				var am=1;
				if(GAME.ctrl_pressed) am=5;
				GAME.emitOrder({a:43,type:6,stat:th.data('stat'),am:am,pet:GAME.pets[GAME.current_pet].id});
			break;
			case 'pet_appabi':
				GAME.emitOrder({a:43,type:8,pet:GAME.pets[GAME.current_pet].id,abi:$('#pet_appoint_abi').val(),am:$('#pet_abi_am').val()});
			break;
			case 'pet_abi_rev':
				var am=1;
				if(GAME.ctrl_pressed) am=5;
				GAME.emitOrder({a:43,type:9,pet:GAME.pets[GAME.current_pet].id,abi:th.data('abi'),am:am});
			break;
			case 'pet_techroll':
				GAME.emitOrder({a:43,type:10,pet:GAME.pets[GAME.current_pet].id});
			break;
			case 'pet_tech_move':
				GAME.emitOrder({a:43,type:11,pet:GAME.pets[GAME.current_pet].id,dir:th.data('dir'),slot:th.data('slot')});
			break;
			case 'pet_atrreset': 
				GAME.emitOrder({a:43,type:7,pet:GAME.pets[GAME.current_pet].id});
			break;
			case 'pet_namech':
				
				var pet=GAME.pets[GAME.current_pet];
				if(pet){
					var kom='<div class="quest_desc">'+LNG.lab295+': <div class="game_input"><input type="text" id="pet_nname" value="'+pet.nazwa+'" /></div><button class="option newBtn" data-option="pet_namech_go" data-pet="'+pet.id+'">'+LNG.lab72+'</button></div>';
					GAME.komunikat(kom);
					option_bind();
				}
			break;
			case 'pet_opts':
				$('#pet_edit').show();
				GAME.editPet(th.data('pet'));
			break;
			case 'pet_edit_close':
				$('#pet_edit').hide();
			break;
			case 'pet_namech_go':
				GAME.emitOrder({a:43,type:5,pet:th.data('pet'),name:$('#pet_nname').val()});
				kom_clear();
			break;
			case 'roll_pet':
				GAME.emitOrder({a:43,type:3});
			break;
			case 'pet_bonch':
				var pet=GAME.pets[parseInt(th.data('pet_local'))];
				pet_bon_change(pet);
			break;
			case 'pet_bonch_go':
				GAME.emitOrder({a:43,type:7,pet:th.data('pet')});
				kom_clear();
			break;
			case 'pet_reborn1':
				var kom='<div class="quest_desc al"><b>'+LNG.lab300+'</b><br />'+LNG.lab301+'<br />'+LNG.lab302+':<br /><span class="orange">'+LNG.lab303+'</span><br /><span class="orange">'+LNG.lab304+'</span><br /><span class="orange">'+LNG.lab305+'</span><br /><span class="orange">'+LNG.lab306+'</span><br /><br /><span class="red">'+LNG.lab307+'</span><br /><button class="option newBtn" data-option="pet_reborn_go" data-pet="'+th.data('pet')+'">REBORN</button></div>';
				GAME.komunikat(kom);
				option_bind();
			break;
			case 'pet_reborn2':
				var kom='<div class="quest_desc al"><b>'+LNG.lab300+'</b><br />'+LNG.lab308+'<br />'+LNG.lab302+':<br /><span class="orange">'+LNG.lab303+'</span><br /><span class="orange">'+LNG.lab304+'</span><br /><span class="orange">'+LNG.lab309+'</span><br /><span class="orange">'+LNG.lab310+'</span><br /><br /><span class="red">'+LNG.lab307+'</span><br /><button class="option newBtn" data-option="pet_reborn_go" data-pet="'+th.data('pet')+'">REBORN</button></div>';
				GAME.komunikat(kom);
				option_bind();
			break;
			case 'pet_reborn_go':
				GAME.emitOrder({a:43,type:8,pet:th.data('pet')});
			break;
			case 'load_more_players':
				GAME.emitOrder({a:3,type:1,start:th.data('start_from'),vo:GAME.map_options.vo});
				$('.more_players').remove();
			break;
			case 'emp_active':
				GAME.emitOrder({a:44,type:1,emp:th.data('emp')});
			break;
			case 'emp_lvlup':
				GAME.emitOrder({a:44,type:2,emp:th.data('emp')});
			break;
			case 'emp_release':
				GAME.ask_confirm(10,{a:44,type:3,emp:th.data('emp')});
			break;
			case 'emp_namech':
				var pet=GAME.emps[parseInt(th.data('emp_local'))];
				if(pet){
					var kom='<div class="quest_desc">'+LNG.lab295+': <div class="game_input"><input type="text" id="emp_nname" value="'+pet.name+'" /></div><button class="option newBtn" data-option="emp_namech_go" data-emp="'+th.data('emp')+'">'+LNG.lab72+'</button></div>';
					GAME.komunikat(kom);
					option_bind();
				}
			break;
			case 'emp_namech_go':
				GAME.emitOrder({a:44,type:4,emp:th.data('emp'),name:$('#emp_nname').val()});
				kom_clear();
			break;
			case 'emp_innene':
				GAME.emitOrder({a:44,type:5,emp:th.data('emp')});
			break;
			case 'emp_advace':
				GAME.emitOrder({a:44,type:6,emp:th.data('emp')});
			break;
			case 'emp_job':
				var pet=GAME.emps[parseInt(th.data('emp_local'))];
				if(pet){
					var chance=pet.level*6+pet.class*2+pet.qualified*10;
					var kom='<div class="quest_desc">&raquo; '+LNG.lab317+' <b>'+pet.name+'</b>:<br /><div class="select_input"><select id="emp_instances"></select></div><br />'+LNG.lab36+': <b>'+chance+'</b>%<br /><button class="option newBtn" data-option="emp_job_go" data-emp="'+th.data('emp')+'">'+LNG.lab312+'</button></div>';
					GAME.komunikat(kom);
					option_bind();
					GAME.emitOrder({a:44,type:7});
				}
			break;
			case 'emp_job_go':
				GAME.emitOrder({a:44,type:8,emp:th.data('emp'),inst:$('#emp_instances').val()});
				kom_clear();
			break;
			case 'emp_restore':
				GAME.emitOrder({a:44,type:9,emp:th.data('emp')});
			break;
			case 'ball_upgrade':
				GAME.emitOrder({a:45,type:0,bid:th.data('bid')});
			break;
			case 'ss_page':
				var page=th.data('page');
				$('.ss_page').hide();
				$('#ss_page_'+page).show();
			break;
			case 'ss_reset':
				GAME.emitOrder({a:45,type:1,bid:GAME.ball_id});
			break;
			case 'ss_lvlup':
				GAME.emitOrder({a:45,type:2,bid:GAME.ball_id});
			break;
			case 'ss_upgrade':
				GAME.emitOrder({a:45,type:3,bid:GAME.ball_id});
			break;
			case 'ss_upgrade_refuse':
				GAME.emitOrder({a:45,type:4,bid:GAME.ball_id});
			break;
			case 'ss_upgrade_accept':
				GAME.emitOrder({a:45,type:5,bid:GAME.ball_id});
			break;
			case 'arena_attack':
				GAME.emitOrder({a:46,type:1,index:th.data('index'),quick:th.data('quick')});
			break;
			case 'arena_lvlup':
				GAME.emitOrder({a:46,type:2});
			break;
			case 'show_auctions':
				GAME.emitOrder({a:47,type:0,page:th.data('page'),atype:$('#acution_type').val(),aclass:$('#auction_class').val(),alvl:$('#auction_lvl').val()});
			break;
			case 'withdraw_auction':
				GAME.emitOrder({a:47,type:2,page:th.data('page'),aid:th.data('aid'),atype:$('#acution_type').val(),aclass:$('#auction_class').val(),alvl:$('#auction_lvl').val()});
			break;
			case 'buynow_auction':
				GAME.emitOrder({a:47,type:3,page:th.data('page'),aid:th.data('aid'),atype:$('#acution_type').val(),aclass:$('#auction_class').val(),alvl:$('#auction_lvl').val()});
			break;
			case 'bid_auction':
				GAME.emitOrder({a:47,type:4,page:th.data('page'),aid:th.data('aid'),bid:$('#a_bid_'+th.data('aid')).val(),atype:$('#acution_type').val(),aclass:$('#auction_class').val(),alvl:$('#auction_lvl').val()});
			break;
			case 'boss_attack':
				GAME.emitOrder({a:48,type:1,boss_id:th.data('boss_id')});
			break;
			case 'receive_activity_reward':
				GAME.emitOrder({a:49,type:1,ind:th.data('ind')});
			break;
			case 'promo_decision':
				GAME.emitOrder({a:49,type:2,dec:th.data('dec')});
			break;
			case 'promo_accept':
				GAME.ask_confirm(13,{a:49,type:2,dec:2});
			break;
			case 'empire_test':
				GAME.emitOrder({a:50,type:1});
			break;
			case 'empire_test_answer':
				GAME.emitOrder({a:50,type:2,answers:[0,$('#quiz_ans_1a').prop('checked'),$('#quiz_ans_2a').prop('checked'),$('#quiz_ans_3a').prop('checked'),$('#quiz_ans_4a').prop('checked')]});
			break;
			case 'quiz_end':
				GAME.emitOrder({a:50,type:3,empire:$('#quiz_result_3 input[name="empire"]:checked').val()});
			break;
			case 'emp_struct':
				GAME.emitOrder({a:50,type:4,sid:th.data('sid')});
			break;
			case 'empire_teleport':
				GAME.emitOrder({a:50,type:5,e:$('#emp_teleport').val()});
			break;
			case 'activate_emp_buff':
				GAME.emitOrder({a:50,type:6,buff:th.data('buff')});
			break;
			case 'empire_war_go':
				GAME.emitOrder({a:50,type:7,target:$('#emp_war_declare').val()});
			break;
			case 'emp_war_table':
				GAME.emitOrder({a:50,type:8,war:th.data('war')});
			break;
			case 'emp_war_hire':
				var war=parseInt(th.data('war'));
				GAME.emitOrder({a:50,type:13,war:war,org:$('#war_'+war+'_org').val()});
			break;
			case 'special_loc_move':
				GAME.emitOrder({a:51,type:1});
			break;
			case 'buy_from_trader':
				GAME.emitOrder({a:51,type:2,item:th.data('item')});
			break;
			case 'open_tuts':
				GAME.parseData(63,{});
				GAME.tutorialReqDone(2);
			break;
			case 'show_tut_data':
				$('#tut_desc_'+th.data('t')).toggle();
			break;
			case 'start_tutorial':
				var t=parseInt(th.data('t'));
				GAME.startTutorial(t);
			break;
			case 'cancel_tutorial':
				GAME.cancelTutorial(t);
			break;
			case 'tut_step':
				GAME.tutorialReqDone(4);
			break;
			case 'send_kp':
				GAME.ask_confirm(11,{a:53,type:0,captchaResponse:grecaptcha.getResponse(GAME.response['transfer_captcha']),nick:$('#transfer_nick_name').val(),amount:$('#transfer_amount').val()});
			break;
			case 'obtain_vip':
				GAME.emitOrder({a:54,type:1,vip:th.data('vip'),level:th.data('level')});
			break;
			case 'vip_status':
				GAME.emitOrder({a:54,type:2});
			break;
			case 'delete_note_entry':
				GAME.emitOrder({a:39,type:53,entry:$(this).data('entry')});
			break;
			case 'weed_proposal':
				GAME.emitOrder({a:55,type:1,nick:$('#weed_proposal').val()});
			break;
			case 'proposal_answer':
				GAME.emitOrder({a:55,type:2,pip:$(this).data('pip'),ans:$(this).data('ans')});
			break;
			case 'divorce':
				GAME.ask_confirm(12,{a:55,type:3});
			break;
			case 'newborn':
				GAME.emitOrder({a:55,type:4});
			break;	
			case 'newborn_answer':
				GAME.emitOrder({a:55,type:5,ans:$(this).data('ans')});
			break;
			case 'promo_code':
				kom_clear();
				var kom='<div class="quest_desc">&raquo; '+LNG.lab372+':<br /><div class="game_input"><input id="promo_code" type="text" /></div><br /><br /><div id="promo_captcha" class="captcha_container"></div><br /><button class="option newBtn" data-option="promo_code_go">OK</button></div>';
				GAME.komunikat(kom);
				option_bind();
				GAME.load_captcha('#promo_captcha','promo_captcha',0,1);
			break;
			case 'promo_code_go':
				GAME.emitOrder({a:56,type:0,code:$('#promo_code').val(),captchaResponse:grecaptcha.getResponse(GAME.response['promo_captcha'])});
				kom_clear();
			break;
			case 'tournament_sign':
				GAME.emitOrder({a:57,type:1,tid:$(this).data('tid')});
			break;
			case 'tournament_details':
				GAME.emitOrder({a:57,type:2,tid:$(this).data('tid')});
			break;
			case 'sign_all_pets':
				GAME.emitOrder({a:57,type:4,tid:$(this).data('tid')});
			break;
			case 'cancel_tour_details':
				$('#tour_details').hide();
				$('#tour_list_tab').show();
			break;
			case 'show_tour_fight':
				GAME.emitOrder({a:57,type:3,fid:$(this).data('id')});
			break;
			case 'tour_switch_players':
				GAME.tour_type=0;
				$('.ttype').removeClass('active');
				$('#to_players').addClass('active');
				GAME.emitOrder({a:57,type:0,type2:GAME.tour_type,page:1});
			break;
			case 'tour_switch_pets':
				GAME.tour_type=1;
				$('.ttype').removeClass('active');
				$('#to_pets').addClass('active');
				GAME.emitOrder({a:57,type:0,type2:GAME.tour_type,page:1});
			break;
			case 'show_tour_page':
				GAME.emitOrder({a:57,type:0,type2:GAME.tour_type,page:$(this).data('page')});
			break;
			case 'chat_clan_switch':
				switch(GAME.chat_switch){
					case 1:
						GAME.chat_switch=0;
						$('.clan_channel').hide();
						GAME.prepareChatChannels();
						$('#chat_swi').text(LNG.lab379);
						select_chat_channel(1);
					break;
					default:
						GAME.chat_switch=1;
						$('.common_channel').hide();
						$('.clan_channel').show();
						if(GAME.hasClanLaw('struct_build')||GAME.hasClanLaw('player_manage')){}
						else $('#chat_channel_11').hide();
						$('#chat_swi').text(LNG.lab378);
						select_chat_channel(6);
					break;
				}
				$('#chat_channel_scnt').text('').addClass('empty');
				GAME.chat_scnt=0;
			break;
			case 'chat_noti_change':
				var ch=parseInt(th.data('channel')),v=0;
				if(th.prop('checked')) v=1;
				
				GAME.chat_notifications[ch]=v;
				localStorage.setItem('chat_notifications',JSON.stringify(GAME.chat_notifications));
			break;
			case 'add_stat':
				var am=1;
				if(GAME.ctrl_pressed) am=5;
				GAME.emitOrder({a:200,type:0,stat:$(this).data('stat'),am:am});
			break;
			case 'switch_own_cat':
				GAME.selectOwnTechCat(th.data('cat'));
			break;
			case 'change_skill_set':
				GAME.showTechSet(parseInt(th.data('set')));
			break;
			case 'confirm_set':
				GAME.emitOrder({a:203,type:2,techs:GAME.current_set});
			break;
			case 'clear_set':
				GAME.emitOrder({a:203,type:3});
			break;
			case 'export_set':
				var data=JSON.stringify(GAME.current_set);
				GAME.komunikat('<textarea id="exported_set" class="textarea">'+data+'</textarea><br /><button class="newBtn option" data-option="copy_exported">'+LNG.lab413+'</button>');
				option_bind();
			break;
			case 'copy_exported':
				$('#exported_set').select();
				document.execCommand("copy");
			break;
			case 'import_set':
				GAME.komunikat('<b>'+LNG.lab414+'</b><br /><textarea id="import_set" class="textarea"></textarea><br /><button class="newBtn option" data-option="do_import">OK</button>');
				option_bind();
			break;
			case 'do_import':
				var set=JSON.parse($('#import_set').val());
				if(set){
					for(var s=1;s<=20;s++){
						if(set[s]) GAME.assignSetTech(s,set[s]);
					}
				}
				else GAME.komunikat(LNG.error185);
			break;
			case 'choose_pet':
				GAME.emitOrder({a:202,type:3,pet:th.data('pet')});
			break;
			case 'choose_nin_spec':
				GAME.emitOrder({a:202,type:4,spec:th.data('spec')});
			break;
			case 'page_switch':
				GAME.page_switch(th.data('page'));
			break;
			case 'second_nature_choose':
				GAME.emitOrder({a:202,type:5,ele:th.data('element')});
			break;
			case 'third_nature_choose':
				GAME.emitOrder({a:202,type:8,ele:th.data('element')});
			break;
			case 'choose_kin_spec':
				GAME.emitOrder({a:202,type:6,spec:th.data('spec')});
			break;
			case 'create_party':
				GAME.emitOrder({a:204,type:1});
			break;
			case 'disband_party':
				GAME.emitOrder({a:204,type:2});
			break;
			case 'party_invite':
				GAME.emitOrder({a:204,type:3,nick:$('#party_name').val()});
			break;
			case 'party_decision':
				GAME.emitOrder({a:204,type:4,dec:th.data('dec'),inv:th.data('inv')});
			break;
			case 'leave_party':
				GAME.emitOrder({a:204,type:5});
			break;
			case 'kick_party':
				GAME.emitOrder({a:204,type:6,num:th.data('num')});
			break;
			case 'choose_kg':
				GAME.emitOrder({a:202,type:7,kg:th.data('kg')});
			break;
			case 'choose_kt':
				GAME.emitOrder({a:202,type:9,kt:th.data('kt')});
			break;
			case 'quick_destroy':
				var cls=$('#quick_destroy_class').val();
				var items=[];
				$('#ekw_page_items .nonstackable[data-class="'+cls+'"]').each(function( index ) {
					items.push(parseInt($(this).data('item_id')));
				});
				if(items.length){
					GAME.emitOrder({a:12,type:11,items:items,page:GAME.ekw_page});
				}
			break;
			case 'quick_travel':
				GAME.emitOrder({a:206,type:1,loc:th.data('loc')});
			break;
			case 'init_mission':
				GAME.emitOrder({a:207,type:1,rank:th.data('rank')});
			break;
			case 'abbadon_mission':
				GAME.emitOrder({a:207,type:2});
			break;
			case 'do_mission':
				GAME.emitOrder({a:207,type:3});
			break;
			case 'send_gold':
				GAME.emitOrder({a:208,type:1,amount:$('#gold_transfer_value').val(),name:$('#gold_transfer_name').val()});
			break;
			case 'sell_gold':
				GAME.emitOrder({a:208,type:2,price:$('#gold_sell_price').val(),amount:$('#gold_sell_amount').val()});
			break;
			case 'withdraw_gold':
				GAME.emitOrder({a:208,type:3,offer:th.data('offer'),page:GAME.banker_page});
			break;
			case 'show_bank':
				GAME.emitOrder({a:208,type:0,page:th.data('page')});
			break;
			case 'buy_gold':
				GAME.emitOrder({a:208,type:4,offer:th.data('offer'),page:GAME.banker_page,amount:$('#gold_buy_'+th.data('offer')).val()});
			break;
			case 'select_all_scrolls':
				var state=$(this).prop('checked');
				$('.delete_manuscript[data-level="0"]').prop('checked',state);
			break;
			case 'destroy_scrolls':
				var searchIDs = $(".delete_manuscript:checkbox:checked").map(function(){
				  return $(this).val();
				}).get();
				GAME.emitOrder({a:209,type:1,deletes:searchIDs});
			break;
			case 'upgrade_scroll':
				GAME.emitOrder({a:209,type:2,scroll:th.data('scroll')});
			break;
			case 'unuse_scroll':
				GAME.emitOrder({a:209,type:3,scroll:th.data('scroll')});
			break;
			case 'use_scroll':
				GAME.emitOrder({a:209,type:4,scroll:th.data('scroll')});
			break;
			case 'buy_manu':
				GAME.komunikat('<div class="quest_desc">&raquo; '+LNG.lab158+':<br /><div class="game_input"><input id="manu_amount" data-grade="'+th.data('grade')+'" data-cost="'+th.data('cost')+'" type="text" value="1" /></div><br />'+LNG.lab57+': <b id="manu_cost">'+GAME.dots(th.data('cost'))+'</b><img src="/gfx/gold.png" /><br /><button class="option newBtn" data-option="manu_buy_go">OK</button></div>');
				
				option_bind();
				$('#manu_amount').on('input',function(){
					var cost=parseInt($(this).val())*parseInt($(this).data('cost'));
					$('#manu_cost').text(GAME.dots(cost));
				});
			break;
			case 'manu_buy_go':
				GAME.emitOrder({a:209,type:5,grade:$('#manu_amount').data('grade'),am:$('#manu_amount').val()});
			break;
			case 'do_abtra':
				GAME.emitOrder({a:210,type:1,am:$('#abtr_amount').val(),src:$('#abtra_source').val(),tar:$('#abtra_target').val()});
			break;
			case 'open_exchange':
				GAME.emitOrder({a:211,type:1,npc:th.data('npc')});
			break;
			case 'do_exchange':
				GAME.emitOrder({a:211,type:2,exchange:th.data('exchange'),item:th.data('item')});
			break;
			case 'rec_learn':
				GAME.emitOrder({a:212,type:1,rec:th.data('rec')});
			break;
			case 'show_rec_cat':
				$('.reccat'+th.data('cat')).toggle();
			break;
			case 'show_recipe':
				$('.recipes').removeClass('active');
				GAME.emitOrder({a:212,type:2,rec:th.data('rec')});
				th.addClass('active');
			break;
			case 'do_craft':
				var am=$('#craft_amount').val();
				
				if(am>1){
					GAME.crafting={am:am,rec:th.data('rec')};
				}
				GAME.emitOrder({a:212,type:3,rec:th.data('rec')});
			break;
			case 'cancel_craft':
				delete GAME.crafting;
			break;
			case 'kage_ambition':
				GAME.emitOrder({a:50,type:9});
			break;
			case 'kage_fights':
				GAME.emitOrder({a:50,type:11,bid:th.data('bid')});
			break;
			case 'show_kage_fight':
				GAME.emitOrder({a:50,type:12,rid:th.data('rid')});
			break;
			case 'relic_attack':
				GAME.emitOrder({a:216,type:1});
			break;
			case 'use_card':
				GAME.emitOrder({a:58,type:1,card:GAME.selected_card});
			break;
			case 'clear_sslot':
				GAME.emitOrder({a:58,type:2,slot:th.data('slot')});
			break;
			case 'boost_card':
				GAME.emitOrder({a:58,type:3,card:GAME.selected_card});
			break;
			case 'des_card':
				GAME.ask_confirm(21,{a:58,type:4,card:GAME.selected_card});
				$('#soulcard_menu').hide();
			break;
			case 'mass_des_card':
				GAME.ask_confirm(16,{a:58,type:6});
				$('#soulcard_menu').hide();
			break;
			case 'soul_slots_upgrade':
				GAME.emitOrder({a:58,type:5});
			break;
			case 'soulfight':
				GAME.emitOrder({a:59,type:1});
			break;
			case 'soul_short':
				GAME.emitOrder({a:59,type:2});
			break;
			case 'soul_reset':
				GAME.ask_confirm(22,{a:59,type:3});
			break;
		}
	});
}
function pet_bon_change(pet){
	if(pet){
		var bons='';
		var fields=['bonus','bonus2','bonus3'];
		var len=fields.length;
		for(var i=0;i<len;i++){
			var field=fields[i];
			if(pet[field]>0) bons+='<b class="green">'+(pet[field+'_val']*pet.evo_lvl)+'</b>'+GAME.item_stat(pet[field])+'<br />';
		}
		var kom='<div class="quest_desc">&raquo; '+LNG.lab297+' <b>'+pet.name+'</b><br />'+LNG.lab298+'<br /><div class="ekw_slot"><img src="/gfx/items/0/60/1266.png" /><div id="ilosc_karm">??</div></div><br />'+LNG.lab299+':<br />'+bons+'<br /><button class="option newBtn" data-option="pet_bonch_go" data-pet="'+pet.id+'">'+LNG.lab72+'</button></div>';
		GAME.komunikat(kom);
		option_bind();
		GAME.emitOrder({a:43,type:6});
	}
}
function pr_amount(am){
	var points=250*am;
	$('#ppr_rec').text(GAME.dots(points));
}
function main_ekw_item_bind(){
	$('.main_ekw_item').off("mouseover").on('mouseover',function(){
		var el=$(this);
		if(parseInt(el.attr('data-load_go'))==1) return;
		var iid=el.data('item_id');
		var upg=parseInt(el.data('upgrade'));
		var qua=parseInt(el.data('quality'));
		var upgr=0;
		if(upg>0) upgr=upg;
		el.attr('data-load_go',1);
		GAME.emitOrder({a:12,type:3,iid:iid,upgrade:upg,quality:qua},1);
		GAME.current_item_tooltip=el;
	});
}
function hide_tooltips(){
	$('.tooltip').remove();
}
function tech_bind(){
	$('.tech_data').off('mouseover').on('mouseover',function(){
		if(GAME.dragged_tech) return;
		var el=$(this);
		if(parseInt(el.attr('data-load_go'))==1) return;
		var tmp=parseInt(el.attr('data-pet_id'));
		if(tmp) GAME.tech_pet=tmp;
		else delete GAME.tech_pet;
		el.attr('data-original-title','<div class="tt"><div class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></div></div>').attr('data-load_go',1);
		GAME.emitOrder({a:201,type:1,tid:parseInt(el.attr('data-tech_id')),level:parseInt(el.attr('data-level'))},1);
		GAME.current_tech_tooltip=el;
	});
	tooltip_bind();
}
function player_ekw_item_bind(){
	$('.player_ekw_item').off('mouseover').off('dragstart').off('dragend').on('mouseover',function(){
		var el=$(this);
		if(parseInt(el.attr('data-load_go'))==1) return;
		el.attr('data-original-title','<div class="tt"><div class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></div></div>');
		var iid=parseInt(el.attr('data-item_id'));
		el.attr('data-load_go',1);
		GAME.emitOrder({a:12,type:2,iid:iid},1);
		GAME.current_item_tooltip=el;
	}).on('dragstart',function(){
		var el=$(this);
		hide_tooltips();
		var us=0,slot=0,iid=parseInt(el.attr('data-item_id')),bid=parseInt(el.data('base_item_id')),type=parseInt(el.data('type')),stack=parseInt(el.data('stack')),iclass=parseInt(el.data('class')),upgrade=parseInt(el.data('upgrade'));
		if(el.data('usable')){
			us=1;
			slot=parseInt(el.data('slot'));
			$('#ekw_page_items').addClass('active');
		}
		else{
			slot=parseInt(el.data('slot'));
			$('#ekw_use_slot'+slot).addClass('active');
			if(slot>0) $('#delete_item').addClass('active');
		}
		GAME.dragged_item={id:iid,sel:el,usable:us,slot:slot,stack:stack,img:el.data('img'),bid:bid,type:type,iclass:iclass,upgrade:upgrade};
	}).on('dragend',function(){
		var el=$(this);
		if(el.data('usable')){
			$('#ekw_page_items').removeClass('active');
		}
		else{
			$('#ekw_use_slot'+GAME.dragged_item.slot).removeClass('active');
			$('.drag_action').removeClass('active');
		}
		hide_tooltips();
	});
}
function kom_clear(){
	$('.kom').remove();
	GAME.koms=[];
}
function kom_close_bind(){
	$('.close_koment').off().click(function(){
		var ind=parseInt($(this).data('ind'));
		GAME.koms[ind]=false;
		$(this).parent().remove();
	});
}
function tooltip_bind(){
	$('.tooltip').remove();
	$('[data-toggle="tooltip"]').tooltip(GAME.tooltip_options).off('hide.bs.tooltip').on('hide.bs.tooltip', function(){
        GAME.current_item_tooltip=false;
    });	
	$('[data-toggle="tooltip_left"]').tooltip({
		html:true,
		placement: 'top',
		container: 'body',
		trigger : 'hover'
	});
	$('[data-toggle="tooltip_left2"]').tooltip({
		html:true,
		placement: 'auto',
		container: 'body',
		trigger : 'hover'
	});
}
$('#ekw_page_items').on('drop',function(ev){
	ev.preventDefault();
	if(GAME.dragged_item&&GAME.dragged_item.usable){
		var slot=parseInt(GAME.dragged_item.slot);
		$('#ekw_page_items').removeClass('active');
		GAME.emitOrder({a:12,type:4,slot:slot,page:GAME.ekw_page});
	}
}).on('dragover',function(ev){
	if(GAME.dragged_item&&GAME.dragged_item.usable) ev.preventDefault();
});

$('.usable_slot').on('drop',function(ev){
	ev.preventDefault();
	if(GAME.dragged_item&&GAME.dragged_item.usable==0&&GAME.dragged_item.slot==$(this).data('slot')){
		var iid=parseInt(GAME.dragged_item.sel.data('item_id'));
		$(this).removeClass('active');
		GAME.emitOrder({a:12,type:5,iid:iid,page:GAME.ekw_page});
	}
}).on('dragover',function(ev){
	if(GAME.dragged_item&&GAME.dragged_item.usable==0&&GAME.dragged_item.slot==$(this).data('slot')) ev.preventDefault();
});

function destroy_item(){
	var kom='<div>'+LNG.lab29+'<br /><img src="'+GAME.dragged_item.img+'" /><br />'+LNG.lab38+':<br /><b id="shard_gain">'+GAME.dragged_item.lvl+'</b> x'+LNG.lab39+'<br /><button class="option newBtn" data-option="destroy_item">'+LNG.lab29+'</button></div>';
	GAME.komunikat(kom);
	option_bind();
}

function upgrade_item(){
	var iid=parseInt(GAME.dragged_item.sel.data('item_id'));
	var max=GAME.dragged_item.stack;
	var kom='<div>'+LNG.lab40+'<br /><img src="'+GAME.dragged_item.img+'" /><br /><br />'+LNG.lab36+': <b id="upg_succes_chance">??</b>%<br />'+LNG.lab41+': <b id="upg_sub_left"></b><br /><button class="option btn_small_gold" data-option="upg2_item">OK</button></div>';
	GAME.komunikat(kom);
	option_bind();
	GAME.emitOrder({a:12,type:9,iid:iid});
}
function reroll_item(){
	var iid=parseInt(GAME.dragged_item.sel.data('item_id'));
	var kom='<div>'+LNG.lab462+'<br /><img src="'+GAME.dragged_item.img+'" /><br />'+LNG.lab41+': <b id="rer_sub_left"></b><br /><button class="option btn_small_gold" data-option="rer2_item">OK</button></div>';
	GAME.komunikat(kom);
	option_bind();
	GAME.emitOrder({a:12,type:23});
}
function ekw_list_bind(){
	$('.ekw_list_item').off('contextmenu').off('click').on('contextmenu',function(e){
		return false;
	}).on('click',function(){
		var th=$(this);
		th.tooltip('hide');
		$('.ekw_menu_btn').hide();
		var slot=parseInt(th.data('slot')),iid=parseInt(th.attr('data-item_id')),bid=parseInt(th.data('base_item_id')),stack=parseInt(th.data('stack')),iclass=parseInt(th.data('class')),upgrade=parseInt(th.data('upgrade')),bound=parseInt(th.data('bound')),lvl=parseInt(th.data('lvl'));
		var any=false;
		if(th.data('usable')==1){
			$('#ekw_menu_use').show();
			any=true;
		}
		if(slot!=12&&(iclass<=4||iclass==6)&&slot!=11&&bound<2) $('#ekw_menu_des').show();
		$('#ekw_menu_wea').show();
		any=true;
		if(slot!=12&&slot!=11&&bound!=2&&iclass!=5) $('#ekw_menu_tra').show();
		if(bound==0) $('#ekw_menu_auc').show();
		if(slot>=1&&slot<=10) $('#ekw_menu_rer').show();
		if(GAME.item_upgradeable(slot)&&bound<2){
			any=true;
			$('#ekw_menu_upg').show();
		}
		if(slot==12) $('#ekw_menu_bup').show().data('bid',iid);
		if(bound==0&&GAME.char_data.klan_id) $('#ekw_menu_cma').show().data('bid',iid);
		if(bound==2){
			$('#ekw_menu_car').show().data('bid',iid);
			$('#ekw_menu_cun').show().data('bid',iid);
		}
		if(iclass>=70&&iclass<=482) $('#ekw_menu_sac').show().data('bid',iid);
		GAME.dragged_item={id:iid,sel:th,usable:0,slot:slot,stack:stack,img:th.data('img'),bid:bid,iclass:iclass,upgrade:upgrade,lvl:lvl};
		if(any){
			var pos=th.position();
			$('#ekw_item_menu').fadeIn().css({'top':pos.top+'px','left':pos.left-30+'px'});
		}
	});
}
$('.field_selector').on('change',function(){
	GAME.emitOrder({a:38,page:1,rank_type:GAME.ranking_type,field:$(this).val()});
});
$('.rank_selector').on('change',function(){
	GAME.emitOrder({a:38,page:1,rank_type:GAME.ranking_type,field:$('#rank_field').val(),searchv:$(this).data('search'),value:$(this).val()});
});
$('#fight_speed').on('change',function(){
	GAME.fight_speed=parseInt($(this).val());
	localStorage.setItem('fight_speed',GAME.fight_speed);
});
$('#animations_off').on('change',function(){
	GAME.animations_off=parseInt($(this).val());
	localStorage.setItem('animations_off',GAME.animations_off);
});
$('.auction_changer').on('change',function(){
	GAME.emitOrder({a:47,type:0,page:$(this).data('page'),atype:$('#acution_type').val(),aclass:$('#auction_class').val(),alvl:$('#auction_lvl').val()});
});
$('#tp_reb_choose').on('change', function() {
	var type=parseInt($(this).find(":selected").val());
	$('.loc2_option').show();
	if(type>=0){
		$('.loc2_option').each(function(){
			if(parseInt($(this).data('reborn'))!=type) $(this).hide();
		});
	}
});
$('#travel_reb_choose').on('change', function() {
	var type=parseInt($(this).find(":selected").val());
	$('.loc_option').show();
	if(type>=0){
		$('.loc_option').each(function(){
			if(parseInt($(this).data('reborn'))!=type) $(this).hide();
		});
	}
});
$('#tp_name_search').on('keyup', function() {
	$('.loc2_option').hide();
	var s=$(this).val();
	$('.loc2_option').each(function(){
		if($(this).data('nazwa').toLowerCase().indexOf(escapeHtml(s.toLowerCase())) != -1) $(this).show();
	});
});
$('#travel_name_search').on('keyup', function() {
	$('.loc_option').hide();
	var s=$(this).val();
	$('.loc_option').each(function(){
		if($(this).data('nazwa').toLowerCase().indexOf(escapeHtml(s.toLowerCase())) != -1) $(this).show();
	});
});
$('#ekw_item_menu').on('mouseleave',function(){
	$(this).hide();
});
JQS.ctm.on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
		GAME.chat_scrolled=true;
    }
	else GAME.chat_scrolled=false;
})
$('#chat_drag').mousedown(function() {
    $('#chat_containter').draggable();
});

$('#chat_drag').mouseup(function() {
    $('#chat_containter').draggable('destroy');
});
$('#drag_pilot').mousedown(function() {
    $('#map_pilot').draggable();
});
$('#promo_dragger').mousedown(function() {
    $('#promo_item').draggable();
});

$('#drag_pilot').mouseup(function() {
    $('#map_pilot').draggable('destroy');
});
$('#war_switch').mousedown(function() {
    $('#war_container').draggable();
});
$('#war_switch').mouseup(function() {
    $('#war_container').draggable('destroy');
});
$('#promo_dragger').mouseup(function() {
    $('#promo_item').draggable('destroy');
});

$('#gostek2').mousedown(function() {
    $('#tutorial_frame').draggable();
	GAME.tutorialReqDone(1);
});
$('#gostek2').mouseup(function() {
    $('#tutorial_frame').draggable('destroy');
});
$('.banker_gold_changer').on('input',function(){
	var price=parseInt($('#gold_sell_price').val());
	var am=parseInt($('#gold_sell_amount').val());
	var need=price*am;
	var cn=$('#banker_need_gold');
	cn.text(GAME.dots(need)).removeClass('red');
	if(need>GAME.char_data.gold) cn.addClass('red');
});
function setmaxBind(){
	$('.set_max').off().on('click',function(){
		var el=$(this);
		var max=parseInt(el.data('max'));
		var target=el.data('target');
		$(target).val(max);
		if(target=='#des_am') des_shards(max);
		if(target=='#ppr_kp') pr_amount(max);
	});
}
setmaxBind();
$('.chat_channel').on('click',function(){
	var channel=parseInt($(this).data('channel'));
	select_chat_channel(channel);
});
$('#reps_checkAll').click(function () {    
    $('.rep_check').prop('checked', this.checked);    
 });
 $('#pw_checkAll').click(function () {    
    $('.pw_check').prop('checked', this.checked);    
 });
$('#available_servers').on('change',function(){
	window.location.href = GAME.main_page+'/login/'+$(this).val(); 
});
$('.skeditor').sceditor({
	plugins: "bbcode",
	style: "/lib/skeditor/jquery.sceditor.default.min.css",
	toolbar:'bold,italic,underline,strike|left,center,right|font,size,color,quote|bulletlist,orderedlist,table|source',
	emoticonsEnabled :false
});
$('.tech_sets').on('dragover',function(ev){
	var th=$(this);
	var slot=parseInt(th.data('slot'));
	var allow=false;
	if(GAME.dragged_tech){
		allow=true;
		if(GAME.set_cooldowns[slot].indexOf(GAME.dragged_tech)!=-1) allow=false;
		/*
		var nores=false;
		switch(GAME.learned_techs[GAME.dragged_tech].use_natural_energy){
			case 1: 
				if(GAME.learned_techs[GAME.dragged_tech].cost>GAME.left_energy) nores=true;
			break;
			default: 
				if(GAME.learned_techs[GAME.dragged_tech].cost>GAME.left_chakra) nores=true;
			break;
		}
		if(nores) allow=false;
		*/
	}
	if(allow) ev.preventDefault();
}).on('drop',function(ev){
	ev.preventDefault();
	var th=$(this);
	var slot=parseInt(th.data('slot'));
	GAME.assignSetTech(slot,GAME.dragged_tech);
}).on('click',function(){
	var th=$(this);
	var slot=parseInt(th.data('slot'));
	GAME.assignSetTech(slot,0);
});
$('#char_bagi').on('input',function(){
	var th=$(this);
	GAME.emitOrder({a:200,type:1,bagi:th.val()});
});
$(window).on('load', function(){
	GAME.serv_time=ts.now();
	GAME.parseServerTime();
	GAME.lang=locals.lang;
	$('#fight_speed option[value='+GAME.fight_speed+']').prop('selected',true);
	$('#animations_off option[value='+GAME.animations_off+']').prop('selected',true);
	setInterval(function(){ 
		GAME.processServerTime();
		GAME.timers_tick();
	}, 1000);
	tooltip_bind();
	keybinds();
	switch(notify.permissionLevel()){
		case 'default':
			notify.requestPermission(function(){
				GAME.push_enabled=true;
			});
		break;
		default:
			GAME.push_enabled=true;
		break;
	}
});