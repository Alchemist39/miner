'use strict';

class MiningfieldPage {
	constructor() {
		let self = this;
		this.config = {
			// время ожидания курьера
			courierDelay: 3,
			// кулдаун курьера
			courierCooldown: 3,
			// длительность перегрева
			overheatDuration: 60
		};
		this.map = null;
		this.page = null;
		this.playerShip = null;
		this.courierCargo = 0;
		this.oreStorage = this.getOreStorage() || 0;
		//все созданные поля хранятся в массиве
		this.miningFields = {};

		this.playerShip = new PlayerShip ();
		this.cargo = new Cargoholder(this.playerShip.cargoCapacity);
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
		// длительностью courierDelay

		// в функции onTick обращаемся к методу форматирования выходных данных
		// устанавливаем отображение надписи полета и таймер отсчета
		// меняем размер шрифта на меньший

		// функция onEnd: добавляем руду в карго курьера
		// запусаем новый таймер с большей длительностью, то же форматирование данных
		// меняем надпись
		// onEnd меняем надпись, увеличиваем шрифт, меняем статус курьера на true
		// перегружаем руду из курьера в хранилище, отображаем руду в инвентаре

		// везде указываем текущий контекст для функций через .bind(this)

		// TODO переписать с онклик на ивент лисенеры
		this.courierElement.onclick = function() {
			if (self.courierStatus){
				self.courierStatus = false;

				let waitForCourier = new Timer({
					duration: self.config.courierDelay
				});

				waitForCourier.onTick(function(timer) {
					let time = timer.getFormatedLeftTime(); 
					self.courierElement.innerHTML = `
						Курьер летит <br>
						${time.minutes}:${time.seconds}
					`;
					self.courierElement.style.fontSize = '1vmax';
				});


				waitForCourier.promise.then(function() {
					// перенесли руду из карго в курьера
					self.cargo.removeOre();
				}).then(function() {
					let courierCooldown = new Timer({
						duration: self.config.courierCooldown
					});
					// добавляем функцию в массив functionArray
					courierCooldown.onTick(function(timer) {
						let time = timer.getFormatedLeftTime(); 
						self.courierElement.innerHTML = `
							Курьер недоступен <br>
							${time.minutes}:${time.seconds}
						`;
					})

					return courierCooldown.promise;
				}).then(function() {
					self.courierElement.innerHTML = 'Разгрузка';
					self.courierElement.style.fontSize = '2vmax';
					self.courierStatus = true;
					self.addOreToStorage(self.courierCargo);
					game.station.inventory.addOreToinventory();
				})
			}
		};

		this.overheatElement.onclick = function() {
			if(!self.overheatAvailable) {
				return;
			}

			self.overheatAvailable = false;
			self.overheatElement.style.color = 'red';
			self.overheatElement.style.fontSize = '1vmax';
			self.playerShip.laserPower *= 10;

			let overheatCountdown = new Timer({
				duration: self.config.overheatDuration
			});

			overheatCountdown.onTick(function(timer) {
				let time = timer.getFormatedLeftTime();
				self.overheatElement.innerHTML = `
					Перегрев<br>
					${time.minutes}:${time.seconds}
				`;
			});

			overheatCountdown.promise.then(function() {
				self.overheatAvailable = true;
				self.overheatElement.innerHTML = `Перегрев`;
				self.overheatElement.style.color = 'white';
				self.playerShip.laserPower /= 10;
				self.overheatElement.style.fontSize = '2vmax';
			});
		};
			

		this.miningFieldElement.querySelector('.starMap').onclick = function() {
			this.map.show();
		}.bind(this);
	}
	// руда в хранилище
	setOreStorage(amount) {
		localStorage.setItem('oreAtStorage', amount);
	}
	getOreStorage() {
		return parseInt( localStorage.getItem('oreAtStorage') ) || 0;
	}
	// руда в карго курьера
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
	// создание/отображение поля
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