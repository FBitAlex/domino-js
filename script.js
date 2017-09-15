$(document).ready( function() {

	// инициализация базы
	init();

	// раздача костей
	razdacha();
	
	// console.dir(baza);
	// console.dir(gamers_bones);
	
	create_bazar_and_table();

	// поиск первого хода
	find_first(gamers_bones);

	find_access_bones();
	
	//go_game();

	
	// $(".gamer-bones ul li").click( function () {
	// 	console.log("CLICK");
	// });

	// $(".gamer-bones ul li").unbind("click");


});


