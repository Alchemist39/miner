'use strict';
var game = {

};

window.onload = function() {

	game.station = new Station();
	var shipmarket = new ShipMarket();
	var miningfield = new Miningfield();
	// див карты
	var map = new Map(game.station, miningfield);

	game.station.map = map;
	game.station.shipmarket = shipmarket;
	miningfield.map = map;

	shipmarket.station = game.station;

	window.addEventListener('popstate', function() {
		//console.log(window.location);
		if(window.location.pathname == '/station') {
			console.log('станция');
			map.hideMap();
			game.station.stationElement.style.display = 'flex';
			miningfield.miningFieldElement.style.display = 'none';
		} else if(window.location.pathname == '/field/1') {
			console.log('поле');
			map.hideMap();
			game.station.stationElement.style.display = 'none';
			miningfield.miningFieldElement.style.display = 'flex';
		} else if(window.location.pathname == '/field/' + miningfield.feildNumber) {

		}
	});

	window.dispatchEvent(new Event('popstate'));
}