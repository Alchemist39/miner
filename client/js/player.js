'use strict';

console.log('player');
class Player {
	constructor(playerName, ship) {
		this.name = playerName;

		this.ship = null;
		this.saveInterval = null;
		setInterval( () => this.saveAll(), 60000);
	}
	equipShip(ship) {
		this.ship = ship;
	}
	saveAll() {
		let storage = {};
		let inventory = game.station.inventory;
		// key это название предмета в объекте списке айтемов
		// itemToContainers[key] - это номер айтема в массиве объектов айтемов
		for(let key in inventory.itemToContainers) {
			let index = inventory.itemToContainers[key];
			// создаем объект со свойством key(ore) равным текущему количеству
			storage[key] = inventory.containers[index].amount;
		}
		let save = {
			storage,
			ship: {
				type: this.ship.type,
				cargo: this.ship.cargo.currentCargo
			}
		}

		httpPOST('/save', save)
			.then( () => console.log('Сохранено') );
	}
}
