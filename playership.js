'use strict';

class PlayerShip{
	constructor() {
		//корабль игрока на поле
		this.shipBorderElement = createDiv('shipBorder');

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

	}
	show(parentElement) {
		parentElement.appendChild(this.shipBorderElement);
	}
	remove(parentElement) {
		parentElement.removeChild(this.shipBorderElement);
	}
}