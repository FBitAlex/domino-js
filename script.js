$(document).ready( function() {

	// инициализация базы
	init();

	// раздача костей
	razdacha();
	
	console.dir(baza);
	console.dir(gamers_bones);
	
	// поиск первого хода
	find_first(gamers_bones);

});


