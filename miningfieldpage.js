'use strict';

class MiningfieldPage {
	constructor() {
		this.map = null;
		this.page = null;
		this.playerShip = null;
		this.oreStorage = this.getOreStorage() || 0;
		//все созданные поля хранятся в массиве
		this.miningFields = {};
		this.courier = 'Разгрузка';

		this.playerShip = new PlayerShip ();
		this.cargo = new Cargoholder(2000, 0);
		this.courierStatus = true;

		this.template = Handlebars.compile(`
			<div class="controllPanel">
				<div class="courier">${this.courier}</div>
				<div class="overheat">Перегрев</div> 
				<div class="weapon">Оружие</div>
				<div class="miningLaser">Буры</div>
				<div class="starMap">Карта</div>
			</div>
		`);
		this.miningFieldElement = createDiv('miningField', this.template());

		this.miningFieldElement.querySelector('.courier').onclick = function() {
			if (this.courierStatus){
				this.courierStatus = false;
				new Timer({
					onTick: function(timer){
						let time = timer.getFormatedLeftTime(); 

						this.miningFieldElement.querySelector('.courier').innerHTML = `
							Курьер летит <br>
							${time.minutes}:${time.seconds}
						`;
					}.bind(this),
					onEnd: function(){
						this.addOreToStorage(this.cargo.currentCargo);
						this.miningFieldElement.querySelector('.courier').innerHTML = 'Разгрузка';
						new Timer({
							duration: 8000,
							onTick: function(timer){
								let time = timer.getFormatedLeftTime(); 

								this.miningFieldElement.querySelector('.courier').innerHTML = `
									Курьер недоступен <br>
									${time.minutes}:${time.seconds}
								`;
							}.bind(this),
							onEnd: function() {
								this.miningFieldElement.querySelector('.courier').innerHTML = `
									Разгрузка
								`;
								this.courierStatus = true;
							}.bind(this)

						});
					}.bind(this)
				});
			}
		}.bind(this);


		this.miningFieldElement.querySelector('.starMap').onclick = function() {
			this.map.show();
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
		this.cargo.removeOre();
		console.log(this.oreStorage);
	}
	removeOreFromStorage() {
		this.setOreStorage(0);
	}
	
	show(pageNumber) {
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
}