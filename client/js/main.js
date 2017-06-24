'use strict';

console.log('main');
var game = {

};
var shipmarket, miningPage, map;
// создали объект в котором создали экземпляры кораблей
var ships = {
	wasp: new Wasp(),
	truck: new Truck()
};

var player = new Player('Alchemist');
// экипируем в игрока корабль wasp

var main = function() {
	game.station = new Station();
	shipmarket = new ShipMarket();
	miningPage = new MiningfieldPage();

	// див карты
	map = new Map(game.station);

	game.station.map = map;
	game.station.shipmarket = shipmarket;
	miningPage.map = map;

	shipmarket.station = game.station;
}

httpGet('/load')
	.then(function(data) {
		if(!data) {
			data = {
				ship: {
					type: 'wasp',
					cargo: 0
				},
				storage: {}
			}
		}
		player.equipShip(ships[data.ship.type]);
		player.ship.cargo.currentCargo = data.ship.cargo;

		main();

		let inventory = game.station.inventory;
		for(let itemName in data.storage) {
			inventory.addToInventory(Item.createByName({
				name: itemName,
				amount: data.storage[itemName]
			}));
		}

		window.dispatchEvent(new Event('popstate'))
	})



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
