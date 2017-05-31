'use strict';

var fieldID = 1;

class Miningfield {
	constructor(parentElement) {
		this.id = fieldID++;
		this.asteroids = {};
		this.parentElement = parentElement;
		//див поля боя
		this.battleFieldElement = createAndAppend(this.parentElement, 'div', 'battleField', '');
		this.locationNameElement = createAndAppend(this.battleFieldElement, 'div', 'locationName', '');

		this.arrowBlockElement = createAndAppend(this.battleFieldElement, 'div', 'arrowblock', '');
		this.arrowBackElement = createAndAppend(this.arrowBlockElement, 'div', 'arrow', '<==');
		this.arrowNextElement = createAndAppend(this.arrowBlockElement, 'div', 'arrow', '==>');

		this.arrowNextElement.onclick = function() {
			this.nextField();
		}.bind(this);

		this.arrowBackElement.onclick = function() {
			this.backField();
		}.bind(this);

		this.localStatusElement = createAndAppend(this.battleFieldElement,	'div',	'localStatus',	'Безопасный сектор');
		this.createMainFieldElement();
	}
	//TODO создать метод создания астероида при удалении одного из астероидов

	onKill(asteroid) {
		// удаляем весь астероид по id
		this.cargo.addOre(asteroid.getReward());
		delete this.asteroids[asteroid.id];
	}
	displayid() {
		this.locationNameElement.innerHTML = 'Пояс астероидов №' + this.id;
	}
	nextField() {
		this.reconstructMainFieldElement();
		var address = '/field' + '/' + (this.id + 1);
		pushUrl(address);
	}
	backField() {
		var previousid = this.id - 1;
		if(previousid >= 1) {
			var address = '/field' + '/' + this.id;
			history.pushState(null, "поле", address);
			this.reconstructMainFieldElement();
		} else {
			return;
		}
	}
	reconstructMainFieldElement() {
		this.deconstructMainFieldElement();
		this.cargo.deconstructCargo();
		this.createMainFieldElement();
	}
	deconstructMainFieldElement() {
		this.parentElement.removeChild(this.battleFieldElement);
	}
	createMainFieldElement() {
		this.mainFieldElement = createAndAppend(this.battleFieldElement, 'div', 'mainField', '');
		//корабль игрока на поле
		this.shipBorderElement = createAndAppend(this.mainFieldElement, 'div', 'shipBorder', '');

		this.playersShipElement = createAndAppend(this.shipBorderElement, 'div', 'playersShip', '');
		//щит корабля
		this.shieldBorderElement = createAndAppend(this.playersShipElement, 'div', 'shieldBorder', '');
		this.shieldBarElement = createAndAppend(this.shieldBorderElement, 'div', 'shieldBar', '');
		this.shieldElement = createAndAppend(this.shieldBorderElement, 'div', 'shield', '30');
		//броня корабля
		this.armorBorderElement = createAndAppend(this.playersShipElement, 'div', 'armorBorder', '');
		this.armorBarElement = createAndAppend(this.armorBorderElement, 'div', 'armorBar', '');
		this.armorElement = createAndAppend(this.armorBorderElement, 'div', 'armor', '30');
		//хп корабля
		this.hpBorderElement = createAndAppend(this.playersShipElement, 'div', 'hpBorder', '');
		this.hpBarElement = createAndAppend(this.hpBorderElement, 'div', 'hpBar', '');
		this.HPElement = createAndAppend(this.hpBorderElement, 'div', 'HP', '30');

		for (var i = 1; i < 15; i++) {
			let asteroid = new Asteroid(5 * this.id, this.mainFieldElement, this);

			//обект с определенным ID = экземпляру класса
			this.asteroids[asteroid.id] = asteroid;
/*
			this.asteroids.superAsteroid
			this.asteroids['superAsteroid']

			this.asteroids = {
				0: new Asteroid(5 * this.id, this.mainFieldElement, this),
				1: new Asteroid(5 * this.id, this.mainFieldElement, this),
				2: new Asteroid(5 * this.id, this.mainFieldElement, this),
				... 
			}*/
		}

		this.cargo = new Cargoholder(2000, 0, this.battleFieldElement, this);

		this.displayid();
	}
}

