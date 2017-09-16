var 
	gamer_cnt = 2, // количество игроков
	last_bone = -1,
	fn = 0,
	sn = 0,
	rand_num = 0, // временное хранилище для раздачи
	cnt_bone = 28,


	baza = [], // 28 сгенеренных элементов в начале игры перед раздачей
	// bazar = cnt_bone - (gamer_cnt * 7),
	// bazar_bones = {},
	
	go_game = true,

/*======================================= */
	gamers_bones = [],
	base_bone_cnt = 28,
	first_bone = -1,
	current_gamer = 0, // кто первый ходит
	dashboard = $('#dashboard'),
	// table = [], // массив стола
	is_have = false,
	access_bones = [],

	left_bone = -1;
	right_bone = -1;

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
		.after("<div id='bazar'><div id='bazar_bone'></div></div>")
		.after("<div id='table'><ul></ul></div>");
	
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
	console.log("baza >>>");
	console.dir(baza);
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
	//console.log("current_gamer > " + current_gamer);
	console.log(first_bone);

	console.dir(gamers_bones);

	// запоминаем крайние числа
	left_bone 	= gamers_bones[current_gamer][bone_num].l;
	right_bone 	= gamers_bones[current_gamer][bone_num].r;

	put_bone_to_table( current_gamer, bone_num );
}


function put_bone_to_table ( current_gamer, bone_num ) {
	
	var bone_num_l, bone_num_r;

	console.log("bone_num > " + bone_num);
	
	// запоминаем крайние числа
	if ( left_bone == gamers_bones[current_gamer][bone_num].l ) {
		left_bone = gamers_bones[current_gamer][bone_num].r;
		
		bone_num_r = gamers_bones[current_gamer][bone_num].l;
		bone_num_l = gamers_bones[current_gamer][bone_num].r;

		// перерисовка стола (добавить условие на проверку того в какой край ложить кость)
		$('#table ul').prepend("<li><div class='l'>" + bone_num_l + " </div><div class='r'>" + bone_num_r + " </div></li>");

	} else if ( left_bone == gamers_bones[current_gamer][bone_num].r ) {
		left_bone = gamers_bones[current_gamer][bone_num].l;

		bone_num_l = gamers_bones[current_gamer][bone_num].l;
		bone_num_r = gamers_bones[current_gamer][bone_num].r;

		// перерисовка стола (добавить условие на проверку того в какой край ложить кость)
		$('#table ul').prepend("<li><div class='l'>" + bone_num_l + " </div><div class='r'>" + bone_num_r + " </div></li>");

	} else if ( right_bone == gamers_bones[current_gamer][bone_num].l ) {
		right_bone = gamers_bones[current_gamer][bone_num].r;

		bone_num_l = gamers_bones[current_gamer][bone_num].l;
		bone_num_r = gamers_bones[current_gamer][bone_num].r;

		// перерисовка стола (добавить условие на проверку того в какой край ложить кость)
		$('#table ul').append("<li><div class='l'>" + bone_num_l + " </div><div class='r'>" + bone_num_r + " </div></li>");

	} else if ( right_bone == gamers_bones[current_gamer][bone_num].r ) {
		right_bone = gamers_bones[current_gamer][bone_num].l;

		bone_num_l = gamers_bones[current_gamer][bone_num].r;
		bone_num_r = gamers_bones[current_gamer][bone_num].l;

		$('#table ul').append("<li><div class='l'>" + bone_num_l + " </div><div class='r'>" + bone_num_r + " </div></li>");
	}

	// удаление кости с массива игрока
	gamers_bones[current_gamer].splice(bone_num, 1);

	// перерисовка руки игрока
	var bn = bone_num + 1;
	$('.gamer-bons-block-' + current_gamer + ' li:nth-child('+ bn +')').remove();

	// закончена ли игра (остаток фишек на руках у походившего)
	if ( gamers_bones[current_gamer].length ) {
		// ход следующего игрока
		set_next_gamer();
	} else {
		// конец игры
		finish_game();
	}
}

function finish_game () {
	alert("Выиграл игрок " + current_gamer );
}


function set_next_gamer () {
	// отвязать события у походившего игрока
	$(".gamer-bons-block-" + current_gamer + " ul li").unbind("click").removeClass("access-bone");

	current_gamer = (current_gamer % gamer_cnt)+1;
	console.log( 'current_gamer => ' + current_gamer );

	find_access_bones();
}

function set_event_to_bone ( current_gamer, bone_num ) {
	$(".gamer-bons-block-" + current_gamer + " ul li:nth-child(" + bone_num + ")" ).click( function () {
		put_bone_to_table( current_gamer, bone_num-1 );
	}).addClass("access-bone");
}


// 	gamers_bones[current_gamer][i].l == left_bone ||
// 		gamers_bones[current_gamer][i].r == left_bone ||
// 		gamers_bones[current_gamer][i].l == right_bone ||
// 		gamers_bones[current_gamer][i].r == right_bone
// }

function find_access_bones () {
	is_have = false;
	console.log("current_gamer ======>" +  current_gamer);

		for (i = 0; i < gamers_bones[current_gamer].length; i++) {
			if (
				gamers_bones[current_gamer][i].l == left_bone ||
				gamers_bones[current_gamer][i].r == left_bone ||
				gamers_bones[current_gamer][i].l == right_bone ||
				gamers_bones[current_gamer][i].r == right_bone
				) {	
					// привязать события к доступным для хода костям текущего игрока
					set_event_to_bone ( current_gamer, i+1 );
					is_have = true;
					
					if ( baza.length ) {					
						$("#bazar_bone").unbind("click").html('').removeClass("go-on-bazar");
					} else {
						$("#bazar_bone").hide();
					}

			}
		}

		if ( !is_have ) {
			$("#bazar_bone").unbind("click");

			if ( baza.length ) {
				// на базар ( массив baza )
				$("#bazar_bone").html('CLICK').addClass("go-on-bazar");
				set_event_to_bazar();
			} else {
				$("#bazar_bone").hide();
				set_next_gamer();
			}
		} // end if
		
}


function set_event_to_bazar () {
	// даем возможность брать с базара кость
	$("#bazar_bone").click(function () {

		rand_num = Math.floor(Math.random() * baza.length );
		
		console.log( "nums => " + rand_num  + " <> " + baza.length);
		console.dir(gamers_bones[current_gamer]);

		gamers_bones[current_gamer].push( baza[rand_num] );
		
		ul_list = $(".gamer-bons-block-" + current_gamer + ' ul');
		
		// отрисовываем элемент
		ul_list.append("<li><div class='l'>" + baza[rand_num].l + " </div><div class='r'>" + baza[rand_num].r + " </div></li>");

		// удалили из базы
		baza.splice(rand_num, 1);

		console.log("take from bazar");

		find_access_bones();

	});
}


// // отрисовка стола 
//  function render_table () {
// 	for (gamer = 1; gamer <= gamer_cnt; gamer++) {
// 		var curr_gamer = $('#gamer-bons-block' + gamer);

// 		curr_gamer.append('<>')
// 	}
// }
