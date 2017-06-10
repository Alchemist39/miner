'use strict';

class Player {
	constructor(playerName) {
		this.name = playerName;
		this.ship = 'wasp';
		this.upgrades = {
			lasers: parseInt(localStorage.getItem('lasers')) || 1,
			scanRate: parseInt(localStorage.getItem('scanRate')) || 5,
			targetQuantity: parseInt(localStorage.getItem('targetQuantity')) || 10,
		}
	}
}
