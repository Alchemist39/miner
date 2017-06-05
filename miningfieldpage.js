'use strict';

class MiningfieldPage {
	constructor() {
		this.map = null;
		this.miningFieldElement = createDiv('miningField');
		this.oreStorage = this.getOreStorage() || 0;
		this.miningFields = {};
		
		//левая контрольная панель с меню
		this.controllPanelElement = createAndAppend(this.miningFieldElement, 'div', 'controllPanel', '');
		this.courierElement = createAndAppend(this.controllPanelElement, 'div', 'courier', 'Разгрузка');
		
		this.courierElement.onclick = function() {
			this.addOreToStorage(miningField.cargo.currentCargo);
			miningField.cargo.removeOre();
		}.bind(this);

		this.overheatElement = createAndAppend(this.controllPanelElement, 'div', 'overheat', 'Перегрев');
		this.weaponElement = createAndAppend(this.controllPanelElement, 'div', 'weapon', 'Оружие');
		this.miningLaserElement = createAndAppend(this.controllPanelElement, 'div', 'miningLaser','Буры');
		this.starMapElement = createAndAppend(this.controllPanelElement, 'div', 'starMap', 'Карта');
		this.starMapElement.onclick = function() {
			this.map.showMap();
		}.bind(this);
	}

	setOreStorage(amount) {
		localStorage.setItem('oreAtStorage', amount);
	}
	getOreStorage() {
		return parseInt(localStorage.getItem('oreAtStorage'));
	}
	addOreToStorage(value) {
		this.oreStorage += value;
		this.setOreStorage(this.oreStorage);
		console.log(this.oreStorage);
	}
	removeOreFromStorage() {
		this.setOreStorage(0);
	}
	showMiningFieldPage() {
		document.body.appendChild(this.miningFieldElement);
		/*
		
		if(!this.miningFields[pageNumber]) {
			let miningField = new Miningfield(this.miningFieldElement);
			this.miningFields[miningField.id] = miningField;
		}
		// удаляем все элементы с классом miningfield из баттлфилда 
		// и аппендим this.miningFields[pageNumber]
		
		document.body.appendChild(this.miningFieldElement);
		*/
	}
	hideMiningFieldPage() {
		document.body.removeChild(this.miningFieldElement);	
	}
}