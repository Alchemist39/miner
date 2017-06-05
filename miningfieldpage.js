'use strict';

class MiningfieldPage {
	constructor() {
		this.map = null;
		this.oreStorage = this.getOreStorage() || 0;
		this.miningFields = {};

		this.template = Handlebars.compile(`
			<div class="controllPanel">
				<div class="courier">Разгрузка</div>
				<div class="overheat">Перегрев</div> 
				<div class="weapon">Оружие</div>
				<div class="miningLaser">Буры</div>
				<div class="starMap">Карта</div>
			</div>
		`);
		this.miningFieldElement = createDiv('miningField', this.template());
		
		this.miningFieldElement.querySelector('.courier').onclick = function() {
			this.addOreToStorage(miningField.cargo.currentCargo);
			miningField.cargo.removeOre();
		}.bind(this);

		this.miningFieldElement.querySelector('.starMap').onclick = function() {
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
	showMiningFieldPage(pageNumber) {
		
		if(!this.miningFields[pageNumber]) {
			this.miningFields[pageNumber] = new Miningfield(pageNumber);
		}

		let battlefields = this.miningFieldElement.querySelectorAll('.battleField');
		for(let i = 0; i < battlefields.length; i++) {
			this.miningFieldElement.removeChild(battlefields[i]);
		}

		this.miningFieldElement.appendChild(this.miningFields[pageNumber].battleFieldElement);
		// удаляем все элементы с классом miningfield из баттлфилда 
		// и аппендим this.miningFields[pageNumber]
		
		document.querySelector('.container').appendChild(this.miningFieldElement);
		
	}
	hideMiningFieldPage() {
		document.querySelector('.container').removeChild(this.miningFieldElement);	
	}
}