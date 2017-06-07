'use strict';

class MiningfieldPage {
	constructor() {
		this.map = null;
		this.page = null;
		this.playerShip = null;
		this.oreStorage = this.getOreStorage() || 0;
		//все созданные поля хранятся в массиве
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
			this.addOreToStorage(this.cargo.currentCargo);
		}.bind(this);

		this.miningFieldElement.querySelector('.starMap').onclick = function() {
			this.map.showMap();
		}.bind(this);

		this.playerShip = new PlayerShip ();
		this.cargo = new Cargoholder(2000, 0);


		//this.miningFields[this.page].cargo.show(this.miningFields[this.page].battleFieldElement);

		//this.playerShip.show(this.miningFields[this.page].mainFieldElement);
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
		this.cargo.removeOre();
		console.log(this.oreStorage);
	}
	removeOreFromStorage() {
		this.setOreStorage(0);
	}
	showMiningFieldPage(pageNumber) {
		this.page = pageNumber;
		//если поле не создано, создаем поле
		if(!this.miningFields[pageNumber]) {
			this.miningFields[pageNumber] = new Miningfield(pageNumber);
		}
		//передаем в переменную полей боя все элементы с классом battlefield
		//если их 1 и более, отсоединяем их от страницы
		let battlefields = this.miningFieldElement.querySelectorAll('.battleField');
		for(let i = 0; i < battlefields.length; i++) {
			this.miningFieldElement.removeChild(battlefields[i]);
		}
		//присоединяем к странице поле с нужным номером из уже созданных или нового 
		this.miningFieldElement.appendChild(this.miningFields[pageNumber].battleFieldElement);

		this.playerShip.show(this.miningFields[this.page].mainFieldElement);
		this.cargo.show(this.miningFields[this.page].battleFieldElement);

		document.querySelector('.container').appendChild(this.miningFieldElement);
	}
	hideMiningFieldPage() {
		document.querySelector('.container').removeChild(this.miningFieldElement);	
	}
}