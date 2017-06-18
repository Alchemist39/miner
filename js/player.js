'use strict';

class Player {
	constructor(playerName, ship) {
		this.name = playerName;

		this.ship = null;

	}
	equipShip(ship) {
		this.ship = ship;
	}
}
