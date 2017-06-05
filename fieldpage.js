'use strict';

class MiningfieldPage {
	constructor() {
		this.map = null;
		this.miningFieldElement = createAndAppend(document.querySelector('.container'), 'div', 'miningField', '');
		this.oreStorage = this.getOreStorage() || 0;
		
		//левая контрольная панель с меню
		this.controllPanelElement = createAndAppend(this.miningFieldElement, 'div', 'controllPanel', '');
		this.courierElement = createAndAppend(this.controllPanelElement, 'div', 'courier', 'Разгрузка');
		
		this.courierElement.onclick = function() {
			this.addOreToStorage(this.cargo.currentCargo);
			this.cargo.removeOre();
		}.bind(this);

		this.overheatElement = createAndAppend(this.controllPanelElement, 'div', 'overheat', 'Перегрев');
		this.weaponElement = createAndAppend(this.controllPanelElement, 'div', 'weapon', 'Оружие');
		this.miningLaserElement = createAndAppend(this.controllPanelElement, 'div', 'miningLaser','Буры');
		this.starMapElement = createAndAppend(this.controllPanelElement, 'div', 'starMap', 'Карта');
		this.starMapElement.onclick = function() {
			this.map.showMap();
		}.bind(this);
	}
}