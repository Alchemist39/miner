'use strict';

class Miningfield {
	constructor(station) {
		this.station = station;
		this.miningFieldElement = createAndAppend(document.body, 'div', 'miningField', '');
		// див карты (см коментарии к карте в station.js)
		var map = new Map(station, this.miningFieldElement);
		//левая контрольная панель с меню
		this.controllPanelElement = createAndAppend(this.miningFieldElement, 'div', 'controllPanel', '');
		this.courierElement = createAndAppend(this.controllPanelElement, 'div', 'courier', 'Разгрузка');
		this.overheatElement = createAndAppend(this.controllPanelElement, 'div', 'overheat', 'Перегрев');
		this.weaponElement = createAndAppend(this.controllPanelElement, 'div', 'weapon', 'Оружие');
		this.miningLaserElement = createAndAppend(this.controllPanelElement, 'div', 'miningLaser','Буры');
		this.starMapElement = createAndAppend(this.controllPanelElement, 'div', 'starMap', 'Карта');
		this.starMapElement.onclick = function() {
			this.mapElement.style.visibility = 'visible';
		}.bind(map);
		//див поля боя
		this.battleFieldElement = createAndAppend(this.miningFieldElement, 'div', 'battleField', '');
		this.locationNameElement = createAndAppend(this.battleFieldElement,	'div',	'locationName',	'Пояс астероидов №342');
		this.localStatusElement = createAndAppend(this.battleFieldElement,	'div',	'localStatus',	'Безопасный сектор');
		this.mainFieldElement = createAndAppend(this.battleFieldElement, 'div', 'mainField', '');
		//корабль игрока на поле
		this.playersShipElement = createAndAppend(this.mainFieldElement, 'div', 'playersShip', '');
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
		//маленькие астероиды
		this.smallAsteroid1Element = createAndAppend(this.mainFieldElement, 'div', 'smallAsteroid1', '');
		//и их ХП
		this.hpBorderElement = createAndAppend(this.smallAsteroid1Element, 'div', 'hpBorder', '');
		this.hpBarElement = createAndAppend(this.hpBorderElement, 'div', 'hpBar', '');
		this.HPElement = createAndAppend(this.hpBorderElement, 'div', 'HP', '30');

		this.smallAsteroid2Element = createAndAppend(this.mainFieldElement, 'div', 'smallAsteroid2', '');

		this.hpBorderElement = createAndAppend(this.smallAsteroid2Element, 'div', 'hpBorder', '');
		this.hpBarElement = createAndAppend(this.hpBorderElement, 'div', 'hpBar', '');
		this.HPElement = createAndAppend(this.hpBorderElement, 'div', 'HP', '30');

		this.smallAsteroid3Element = createAndAppend(this.mainFieldElement, 'div', 'smallAsteroid3', '');

		this.hpBorderElement = createAndAppend(this.smallAsteroid3Element, 'div', 'hpBorder', '');
		this.hpBarElement = createAndAppend(this.hpBorderElement, 'div', 'hpBar', '');
		this.HPElement = createAndAppend(this.hpBorderElement, 'div', 'HP', '30');
		//средние астероиды
		this.mediumAsteroid1Element = createAndAppend(this.mainFieldElement, 'div', 'mediumAsteroid1', '');
		//и их ХП
		this.hpBorderElement = createAndAppend(this.mediumAsteroid1Element, 'div', 'hpBorder', '');
		this.hpBarElement = createAndAppend(this.hpBorderElement, 'div', 'hpBar', '');
		this.HPElement = createAndAppend(this.hpBorderElement, 'div', 'HP', '30');

		this.mediumAsteroid2Element = createAndAppend(this.mainFieldElement, 'div', 'mediumAsteroid2', '');

		this.hpBorderElement = createAndAppend(this.mediumAsteroid2Element, 'div', 'hpBorder', '');
		this.hpBarElement = createAndAppend(this.hpBorderElement, 'div', 'hpBar', '');
		this.HPElement = createAndAppend(this.hpBorderElement, 'div', 'HP', '30');
		//большой астероид
		this.bigAsteroid1Element = createAndAppend(this.mainFieldElement, 'div', 'bigAsteroid1', '');
		//и его ХП
		this.hpBorderElement = createAndAppend(this.bigAsteroid1Element, 'div', 'hpBorder', '');
		this.hpBarElement = createAndAppend(this.hpBorderElement, 'div', 'hpBar', '');
		this.HPElement = createAndAppend(this.hpBorderElement, 'div', 'HP', '30');
		//див трюма корабля
		this.holdElement = createAndAppend(this.battleFieldElement, 'div', 'hold', '');
		this.holdTextElement = createAndAppend(this.holdElement, 'div', 'holdText', 'Загруженность трюма');
		this.holdBorderElement = createAndAppend(this.holdElement, 'div', 'holdBorder', '');
		this.holdBarElement = createAndAppend(this.holdBorderElement, 'div', 'holdBar', '');
		this.holdStatusElement = createAndAppend(this.holdBorderElement, 'div', 'holdStatus', '18000 / 40000');
	}
}

