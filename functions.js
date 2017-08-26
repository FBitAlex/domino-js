var 
	gamer_cnt = 2, // количество игроков
	last_bone = -1,
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
	go_game = true,

/*======================================= */
	gamers_bones = [],
	base_bone_cnt = 28,
	first_bone = -1,
	first_gamer = 0, // кто первый ходит
	dashboard = $('#dashboard');

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

// раздача костяшек игрокам
function razdacha () {

	var search_cht = base_bone_cnt-1,
		buffer_bone;
	
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
		}
	}
}

// поиск первого хода
function find_first () {
	for (gamer_num = 1; gamer_num < gamers_bones.length; gamer_num++) {
		for (bone = 0; bone < gamers_bones[gamer_num].length; bone++) {
			l_num = gamers_bones[gamer_num][bone].l;
			r_num = gamers_bones[gamer_num][bone].r;

			if ( (first_bone == -1) || (l_num == r_num) && ( first_bone.l != first_bone.r ) ) {
				first_bone = gamers_bones[gamer_num][bone];
				first_gamer = gamer_num;

			} else if ( (l_num == r_num) && ( first_bone.l == first_bone.r ) &&  ( l_num < first_bone.l ) ) {
				first_bone = gamers_bones[gamer_num][bone];
				first_gamer = gamer_num;
			
			} else if ( ( l_num < first_bone.l ) && ( first_bone.l != first_bone.r ) ) {
				first_bone = gamers_bones[gamer_num][bone];
				first_gamer = gamer_num;
			
			} else if ( ( r_num < first_bone.r ) && ( first_bone.l != first_bone.r ) ) {
				first_bone = gamers_bones[gamer_num][bone];
				first_gamer = gamer_num;	
			}
			
		}
	}
	console.log("first_gamer > " + first_gamer);
	console.log(first_bone);
}


		// проверка на меньший дубль дубль
// 		if ( ((baza[rand_num].l == baza[rand_num].r) && (baza[last_bone].l != baza[last_bone].r))|| (last_bone == -1) ) {
// 				last_bone = rand_num;
// 				first_gamer = baza[rand_num][2];
				
// //						}
// 		} else if ( (baza[rand_num].l == baza[rand_num].r) && (baza[last_bone].l == baza[last_bone].r) && (baza[rand_num].l < baza[last_bone].l) ) {
// 				last_bone = rand_num;
// 				first_gamer = baza[rand_num][2];

// 		// сумму (наименьшая цифра)
// 		} else if ( (baza[rand_num].l < baza[last_bone].l) && (baza[last_bone].l != baza[last_bone].r) ) {
// 				last_bone = rand_num;
// 				first_gamer = baza[rand_num][2];

// 		} else {

// 			sum_rand_num = baza[rand_num].l + baza[rand_num].r; // 2
// 			sum_last = baza[last_bone].l + baza[last_bone].r; // 0


// 			if ( (sum_rand_num < sum_last) && (baza[last_bone].l != baza[last_bone].r) ) {

// 				last_bone = rand_num;
// 				first_gamer = baza[rand_num][2];
// 			 }

// 		}	


// отрисовка стола 
 // function render_table {
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
