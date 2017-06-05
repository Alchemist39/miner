'use strict';
var game = {

};

window.onload = function() {

	game.station = new Station();
	var shipmarket = new ShipMarket();
	var miningPage = new MiningfieldPage();
	// див карты
	var map = new Map(game.station);
	var playerShip = new PlayerShip();

	game.station.map = map;
	game.station.shipmarket = shipmarket;
	miningPage.map = map;

	shipmarket.station = game.station;

	let miningField = new Miningfield(miningPage.miningFieldElement);
	miningPage.miningFields[miningField.id] = miningField;

	window.addEventListener('popstate', function() {
		//console.log(window.location);
		// переход со страницы поля
		var clear = function() {
			document.body.innerHTML = '';
		};
		if(window.location.pathname == '/station') {
			clear();
			game.station.showStation();
			//переход со страницы маркета
		} else if(window.location.pathname.substr(0, 7) == '/field/') {
			//не более 15 строк

			clear();
			miningPage.showMiningFieldPage();
			//переход со станции в маркет
		} else if(window.location.pathname == '/market') {
			clear();
			shipmarket.showMarket();
		}

	});

	window.dispatchEvent(new Event('popstate'));
}