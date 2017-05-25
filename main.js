'use strict'

class Game {
	constructor() {
		
	}
}

window.onload = function() {
	var station = new Station();
	var shipmarket = new ShipMarket();
	var miningfield = new Miningfield();
	// див карты
	var map = new Map(station, miningfield);

	station.map = map;
	station.shipmarket = shipmarket;
	miningfield.map = map;


	shipmarket.station = station;
}