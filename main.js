'use strict';
var game = {

};

window.onload = function() {

	game.station = new Station();
	var shipmarket = new ShipMarket();
	var miningPage = new MiningfieldPage();
	// див карты
	var map = new Map(game.station);

	game.station.map = map;
	game.station.shipmarket = shipmarket;
	miningPage.map = map;

	shipmarket.station = game.station;

	window.addEventListener('popstate', function() {
		//console.log(window.location);
		if(window.location.pathname == '/station') {
			console.log('станция');
			map.hideMap();
			game.station.stationElement.style.display = 'flex';
			miningPage.miningFieldElement.style.display = 'none';
		} else if(window.location.pathname.substr(0, 7) == '/field/') {
			console.log('поле');
			map.hideMap();

			let miningField = new Miningfield(miningPage.miningFieldElement);
			miningPage.miningFields[miningField.id] = miningField;

			game.station.stationElement.style.display = 'none';
			miningPage.miningFieldElement.style.display = 'flex';
		} 
	});

	window.dispatchEvent(new Event('popstate'));
}