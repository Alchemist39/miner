'use strict';
var game = {

};

game.station = new Station();
var shipmarket = new ShipMarket();
var miningPage = new MiningfieldPage();
// див карты
var map = new Map(game.station);
//var playerShip = new PlayerShip();

game.station.map = map;
game.station.shipmarket = shipmarket;
miningPage.map = map;
//miningPage.playerShip = playerShip;

shipmarket.station = game.station;

// функция полной очистки страницы (удаляет все из дива контейнер)
var clear = function() {
	document.querySelector('.container').innerHTML = '';
};
//переход на станцию при смене УРЛа
crossroads.addRoute('/station', function(){
	clear();
	game.station.show();
});

crossroads.addRoute('/market', function(){
	clear();
	shipmarket.show();
});

//передаем в фнкцию номер страницы из УРЛ
crossroads.addRoute('/field/{page}', function(page){
	clear();
	//в функцию отрисовки поля передаем номер страницы из функции
	miningPage.show(page);
});
//улушаем изменение УРЛа
window.addEventListener('popstate', function() {
	crossroads.parse(window.location.pathname);
});
//перехватываем отрабатывание ссылки
//отменяем дефолтное действие ссылки
//передаем путь ссылки в URL для отрабатывания маршрутизатора
document.body.addEventListener('click', function(e){
	if(e.target.nodeName == 'A'){
		e.preventDefault();

		pushUrl(e.target.pathname);
	}
})
//создаем ивент, чтобы обновляя страницу мы оказывались там, куда ведет УРЛ
window.dispatchEvent(new Event('popstate'));