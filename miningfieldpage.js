'use strict';
var config = {
	// время ожидания курьера
	courierDelay: 3,
	// кулдаун курьера
	courierCooldown: 4,
	// длительность перегрева
	overheatDuration: 60
};
class MiningfieldPage {
	constructor() {
		this.map = null;
		this.page = null;
		this.playerShip = null;
		this.courierCargo = 0;
		this.oreStorage = this.getOreStorage() || 0;
		//все созданные поля хранятся в массиве
		this.miningFields = {};

		this.playerShip = new PlayerShip ();
		this.cargo = new Cargoholder(2000, 0);
		this.courierStatus = true;
		this.flyAvailable = true;
		this.overheatAvailable = true;

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
		this.courierElement = this.miningFieldElement.querySelector('.courier');
		this.overheatElement = this.miningFieldElement.querySelector('.overheat');

		// кнопка разгрузки
		// если курьер доступен
		// устанавливаем его недоступным, создаем экземпляр таймера
		// длительность 10 сек

		// в функции onTick обращаемся к методу форматирования выходных данных
		// устанавливаем отображение надписи полета и таймер отсчета
		// меняем размер шрифта на меньший

		// функция onEnd: добавляем руду в хранилище
		// запусаем новый таймер с большей длительностью, то же форматирование данных
		// меняем надпись
		// onEnd меняем надпись, увеличиваем шрифт, меняем статус курьера на true

		// везде указываем текущий контекст для функций через .bind(this)
		this.courierElement.onclick = function() {
			if (this.courierStatus){
				this.courierStatus = false;
				new Timer({
					duration: config.courierDelay,
					onTick: function(timer) {
						let time = timer.getFormatedLeftTime(); 
						this.courierElement.innerHTML = `
							Курьер летит <br>
							${time.minutes}:${time.seconds}
						`;
						this.courierElement.style.fontSize = '1vmax';
					}.bind(this),
					onEnd: function(){
						// перенесли руду из карго в курьера
						this.cargo.removeOre();
						new Timer({
							duration: config.courierCooldown,
							onTick: function(timer) {
								let time = timer.getFormatedLeftTime(); 
								this.courierElement.innerHTML = `
									Курьер недоступен <br>
									${time.minutes}:${time.seconds}
								`;
							}.bind(this),
							onEnd: function() {
								this.courierElement.innerHTML = 'Разгрузка';
								this.courierElement.style.fontSize = '2vmax';
								this.courierStatus = true;
								this.addOreToStorage(this.courierCargo);
								game.station.inventory.addOreToinventory();
							}.bind(this)
						});
					}.bind(this)
				});
			}
		}.bind(this);

		this.overheatElement.onclick = function() {
			if(this.overheatAvailable) {
				this.overheatAvailable = false;
				this.overheatElement.style.color = 'red';
				this.overheatElement.style.fontSize = '1vmax';
				this.playerShip.laserPower *= 10;
				new Timer({
					duration: config.overheatDuration,
					onTick: function(timer) {
						let time = timer.getFormatedLeftTime();
						this.overheatElement.innerHTML = `
							Перегрев<br>
							${time.minutes}:${time.seconds}
						`;
					}.bind(this),
					onEnd: function() {
						this.overheatAvailable = true;
						this.overheatElement.innerHTML = `Перегрев`;
						this.overheatElement.style.color = 'white';
						this.playerShip.laserPower /= 10;
						this.overheatElement.style.fontSize = '2vmax';
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

	addOreToCourierCargo(amount) {
		this.courierCargo += amount;
	}
	removeOreFromCourierCargo() {
		this.courierCargo = 0;
	}

	addOreToStorage(value) {
		this.oreStorage += value;
		this.setOreStorage(this.oreStorage);
		console.log(this.oreStorage);
		this.removeOreFromCourierCargo();
	}
	removeOreFromStorage() {
		localStorage.setItem('oreAtStorage', 0);
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