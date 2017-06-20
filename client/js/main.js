'use strict';
var game = {

};
// создали объект в котором создали экземпляры кораблей
var ships = {
	wasp: new Wasp(),
	truck: new Truck()
};

var player = new Player('Alchemist');
// экипируем в игрока корабль wasp
player.equipShip( ships[ localStorage.getItem('activeShip') ] || ships['wasp']);
game.station = new Station();
var shipmarket = new ShipMarket();
var miningPage = new MiningfieldPage();

// див карты
var map = new Map(game.station);

game.station.map = map;
game.station.shipmarket = shipmarket;
miningPage.map = map;

shipmarket.station = game.station;
var stationRoute = crossroads.addRoute('/', function(){
	clear();
	game.station.show();
});
//переход на станцию при смене УРЛа
var stationRoute = crossroads.addRoute('/station', function(){
	clear();
	game.station.show();
	player.ship.turnOffLasers();
});

var marketRoute = crossroads.addRoute('/market', function(){
	clear();
	shipmarket.show();
});

//передаем в фнкцию номер страницы из УРЛ
 var fieldRoute = crossroads.addRoute('/field/{page}', function(page){
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