var 
	gamer_cnt = 2, // количество игроков
	last_bone = -1,
	fn = 0,
	sn = 0,
	rand_num = 0, // временное хранилище для раздачи
	cnt_bone = 28,

	left_bone = -1,
	right_bone = -1,

	baza = [], // 28 сгенеренных элементов в начале игры перед раздачей
	// bazar = cnt_bone - (gamer_cnt * 7),
	// bazar_bones = {},
	access_bones = [],
	go_game = true,

/*======================================= */
	gamers_bones = [],
	base_bone_cnt = 28,
	first_bone = -1,
	current_gamer = 0, // кто первый ходит
	dashboard = $('#dashboard'),
	table = []; // массив стола

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
function create_bazar_and_table () {
	$('#dashboard .gamer-bons-block-1')
		.after("<div id='bazar'><div class='bazar_bone'></div></div>")
		.after("<div id='table'><ul></ul></div>");
		
	// берем с базара кость
	$(".bazar_bone").click(function () {
		//	console.log('CLICK');
	});

}

// раздача костяшек игрокам
function razdacha () {

	var search_cnt = base_bone_cnt-1,
		buffer_bone;
	
	for (gamer = 1; gamer <= gamer_cnt; gamer++) {
		
		console.log ("num > " + gamer);

		dashboard.append("<div class='gamer-bons-block-" + gamer + " gamer-bones'><ul></ul></div>");
		var i = 0,
		ul_list = $(".gamer-bons-block-" + gamer + ' ul');
		
		gamers_bones[gamer] = [];

		while ( i < 7 ) {

			rand_num = Math.floor(Math.random() * (search_cnt + 1));
			gamers_bones[gamer].push( baza[rand_num] );
			
			// отрисовываем элемент
			ul_list.append("<li><div class='l'>" + baza[rand_num].l + " </div><div class='r'>" + baza[rand_num].r + " </div></li>");

			// удалили из базы
			baza.splice(rand_num, 1);
			i++;
			search_cnt--;
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
				bone_num = bone;
				current_gamer = gamer_num;

			} else if ( (l_num == r_num) && ( first_bone.l == first_bone.r ) &&  ( l_num < first_bone.l ) ) {
				first_bone = gamers_bones[gamer_num][bone];
				bone_num = bone;
				current_gamer = gamer_num;
			
			} else if ( ( l_num < first_bone.l ) && ( first_bone.l != first_bone.r ) ) {
				first_bone = gamers_bones[gamer_num][bone];
				bone_num = bone;
				current_gamer = gamer_num;
			
			} else if ( ( r_num < first_bone.r ) && ( first_bone.l != first_bone.r ) ) {
				first_bone = gamers_bones[gamer_num][bone];
				bone_num = bone;
				current_gamer = gamer_num;	
			}
			
		}
	}

	// gamers_bones[current_gamer][first_bone]["is_play"] = true;
	console.log("bone_num >" + bone_num);
	console.log("current_gamer > " + current_gamer);
	console.log(first_bone);

	console.dir(gamers_bones);
	put_bone_to_table( current_gamer, bone_num );
}


function put_bone_to_table ( current_gamer, bone_num ) {
	
	// добавление кости в массив стола
	table.push(gamers_bones[current_gamer][bone_num]);

	// перерисовка стола (добавить условие на проверку того в какой край ложить кость)
	$('#table ul').append("<li><div class='l'>" + gamers_bones[current_gamer][bone_num].l + " </div><div class='r'>" + gamers_bones[current_gamer][bone_num].r + " </div></li>");

	// удаление кости с массива игрока
	gamers_bones[current_gamer].splice(bone_num, 1);
	console.dir(table);

	// перерисовка руки игрока
	var bn = bone_num + 1;
	$('.gamer-bons-block-' + current_gamer + ' li:nth-child('+ bn +')').remove();

}


// отрисовка стола 
 // function render_table {
// 	for (gamer = 1; gamer <= gamer_cnt; gamer++) {
// 		var curr_gamer = $('#gamer-bons-block' + gamer);
		

// 		curr_gamer.append('<>')
// 	}
// }