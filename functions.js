var 
	gamer_cnt = 2, // количество игроков
	last_bone = -1,
	first_gamer = 0, // кто первый ходит
	fn = 0,
	sn = 0,
	rand_num = 0, // временное хранилище для раздачи
	cnt_bone = 28,

	table = {}, // массив стола
	left_bone = -1,
	right_bone = -1,

	baza = [],
	bazar = cnt_bone - (gamer_cnt * 7),
	bazar_bones = {},
	access_bones = {},
	go_game = true;

/*======================================= */
	gamers_bones = [];
	base_bone_cnt = 28;

	var dashboard = $('#dashboard');


// инициализация базы
function init () {
	// создаем кости
	for (i = 0; i < cnt_bone; fn++) {
		for (sn = fn; sn <= 6 ; sn++, i++) { 
			baza.push({
				"l" : fn,
				"r" : sn
			});
		}
	}
}

// <div id="gamer-bons-block-1" class="gamer-block">
function razdacha () {
		// раздача костяшек игрокам
		var search_cht = base_bone_cnt-1;
		for (gamer = 1; gamer <= gamer_cnt; gamer++) {
			
			
			dashboard.append("<div class='gamer-bons-block-" + gamer + " gamer-bones'><ul></ul></div>");
			var i = 0,
			ul_list = $(".gamer-bons-block-" + gamer + ' ul');
			
			gamers_bones[gamer] = [];

				while ( i < 7 ) {

					rand_num = Math.floor(Math.random() * (search_cht + 1));
					gamers_bones[gamer].push( baza[rand_num] );
					
					// отрисовываем элемент
					ul_list.append("<li><div class='l'>" + baza[rand_num].l + " </div><div class='r'>" + baza[rand_num].r + " </div></li>");

					// удалили из базы
					baza.splice(rand_num, 1);
					i++;
					search_cht--;


					//break;
					// baza[rand_num];

		// 			if ( baza[rand_num][2] == 0 ){
		// 				baza[rand_num][2] = gamer; // ???
		// 				str = str + " || "  + baza[rand_num].l + ", "+ baza[rand_num].r;
		// 				i++;

		// 				/*=============================*/
		// 				// проверка на наименьшую розданную кость

		// 				// проверка на меньший дубль дубль
		// 				if ( ((baza[rand_num].l == baza[rand_num].r) && (baza[last_bone].l != baza[last_bone].r))|| (last_bone == -1) ) {
		// 						last_bone = rand_num;
		// 						first_gamer = baza[rand_num][2];
								
		// //						}
		// 				} else if ( (baza[rand_num].l == baza[rand_num].r) && (baza[last_bone].l == baza[last_bone].r) && (baza[rand_num].l < baza[last_bone].l) ) {
		// 						last_bone = rand_num;
		// 						first_gamer = baza[rand_num][2];

		// 				// сумму (наименьшая цифра)
		// 				} else if ( (baza[rand_num].l < baza[last_bone].l) && (baza[last_bone].l != baza[last_bone].r) ) {
		// 						last_bone = rand_num;
		// 						first_gamer = baza[rand_num][2];

		// 				} else {

		// 					sum_rand_num = baza[rand_num].l + baza[rand_num].r; // 2
		// 					sum_last = baza[last_bone].l + baza[last_bone].r; // 0


		// 					if ( (sum_rand_num < sum_last) && (baza[last_bone].l != baza[last_bone].r) ) {

		// 						last_bone = rand_num;
		// 						first_gamer = baza[rand_num][2];
		// 					 }

		// 				}			
		// 			}
					
				// }
				//console.log (str);
			}
		}
}

// отрисовка костей игроков
// function render_gamers_bons {
// 	for (gamer = 1; gamer <= gamer_cnt; gamer++) {
// 		var curr_gamer = $('#gamer-bons-block' + gamer);
		

// 		curr_gamer.append('<>')
// 	}
// }

/*
baza = {
	gamer1 : {
		l: 
		r: 
	},
	
	gamer2 : {

	},

	table : {

	},

	bazar : {

	},
	first_gamer : 
}
*/
