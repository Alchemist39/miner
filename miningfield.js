'use strict';

class Miningfield {
	constructor() {
		this.map = null;
		this.miningFieldElement = createAndAppend(document.body, 'div', 'miningField', '');
		this.fieldNumber = 1;
		
		//левая контрольная панель с меню
		this.controllPanelElement = createAndAppend(this.miningFieldElement, 'div', 'controllPanel', '');
		this.courierElement = createAndAppend(this.controllPanelElement, 'div', 'courier', 'Разгрузка');
		this.courierElement.onclick = function() {
			this.cargo.removeOre();
		}.bind(this);
		this.overheatElement = createAndAppend(this.controllPanelElement, 'div', 'overheat', 'Перегрев');
		this.weaponElement = createAndAppend(this.controllPanelElement, 'div', 'weapon', 'Оружие');
		this.miningLaserElement = createAndAppend(this.controllPanelElement, 'div', 'miningLaser','Буры');
		this.starMapElement = createAndAppend(this.controllPanelElement, 'div', 'starMap', 'Карта');
		this.starMapElement.onclick = function() {
			this.map.showMap();
		}.bind(this);
		//див поля боя
		this.battleFieldElement = createAndAppend(this.miningFieldElement, 'div', 'battleField', '');
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
	onKill() {
		this.cargo.addOre(this.asteroid.getReward());
	}
	displayFieldNumber() {
		this.locationNameElement.innerHTML = 'Пояс астероидов №' + this.fieldNumber;
	}
	nextField() {
		this.fieldNumber += 1;
		this.reconstructMainFieldElement();
	}
	backField() {
		var previousFieldNumber = this.fieldNumber - 1;
		if(previousFieldNumber >= 1) {
			this.fieldNumber -= 1;
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
		this.battleFieldElement.removeChild(this.mainFieldElement);
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
			this.asteroid = new Asteroid(5 * this.fieldNumber, this.mainFieldElement, this);
		}

		this.cargo = new Cargoholder(2000, 0, this.battleFieldElement, this);

		this.displayFieldNumber();
	}
}

