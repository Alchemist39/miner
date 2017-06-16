'use strict';

class MiningfieldPage {
	constructor() {
		// сохраняем в self текущий контекст (экземпляр класса MiningPage)
		let self = this;
		// конфиг для изменения констант
		this.config = {
			// время ожидания курьера
			courierDelay: 3,
			// кулдаун курьера
			courierCooldown: 3,
			// длительность перегрева
			overheatDuration: 5,
			// кулдаун перегрева
			overheatCooldown: 5
		};
		this.map = null;
		this.page = null;
		this.playerShip = null;
		this.courierCargo = 0;
		this.courierStatus = true;
		this.flyAvailable = true;
		this.overheatAvailable = true;
		this.oreStorage = game.station.inventory.getFromStorage('ore') || 0;
		//все созданные поля хранятся в массиве
		this.miningFields = {};

		this.playerShip = new PlayerShip ();
		this.cargo = new Cargoholder(this.playerShip.cargoCapacity);

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
		this.starMapElement = this.miningFieldElement.querySelector('.starMap');

		// используем стрелочную функцию для исключения .bind(this)
		this.starMapElement.addEventListener( 'click', () => this.map.show() );
		
		// кнопка разгрузки
		this.courierElement.addEventListener('click', function() {
			// если курьер недоступен функция дальше не выполняется
			if (!self.courierStatus){
				return;
			}

			self.courierStatus = false;

			let waitForCourier = new Timer({
				duration: self.config.courierDelay
			});

			self.courierElement.style.fontSize = '1vmax';
			
			waitForCourier.onTick(function(timer) {
				let time = timer.getFormatedLeftTime(); 
				self.courierElement.innerHTML = `
					Курьер летит <br>
					${time.minutes}:${time.seconds}
				`;
			});

			waitForCourier.promise.then(function() {
				// перенесли руду из карго в курьера
				self.cargo.removeOre();
			}).then(function() {
				let courierCooldown = new Timer({
					duration: self.config.courierCooldown
				});
				// добавляем функцию в массив functionArray хелпера
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
				self.addOreToInventory();
				self.removeOreFromCourierCargo();
			})
		});
		// кнопка перегрева
		this.overheatElement.addEventListener('click', function() {
		// если перегрев недоступен (уже активен), то функция не выполняется
			if(!self.overheatAvailable) {
				return;
			}

			self.overheatAvailable = false;
			self.overheatElement.style.color = 'red';
			self.overheatElement.style.fontSize = '1vmax';
			self.playerShip.laserPower *= 10;
		// создаем экземпляр класса таймер, устанавливаем ему длительность через конфиг
			let overheatCountdown = new Timer({
				duration: self.config.overheatDuration
			});
		// вызываем функцию (свойство класса) onTick, передаем в нее функцию с аргументом timer
		// через свойство класса форматируем время; меняем текст на странице
			overheatCountdown.onTick(function(timer) {
				let time = timer.getFormatedLeftTime();
				self.overheatElement.innerHTML = `
					Перегрев<br>
					${time.minutes}:${time.seconds}
				`;
			});
		// вызываем свойство promise экземпляра класса Timer, по завершении отсчета активности перегрева
		// Начинаем новый отсчет отката перегрева с отображением отсчета на странице
		// устанавливаем цвет текста на белый, уменьшаем мощьность лазерова в 10 раз (к изначальному)
			overheatCountdown.promise.then(function() {
				let overheatCooldown = new Timer({
					duration: self.config.overheatCooldown
				})
				overheatCooldown.onTick(function(timer) {
					let time = timer.getFormatedLeftTime();
					self.overheatElement.innerHTML = `
						Перегрев недоступен<br>
						${time.minutes}:${time.seconds}
					`;
				})
				self.overheatElement.style.color = 'white';
				self.playerShip.laserPower /= 10;

				return overheatCooldown.promise;
		// Затем устанавливаем доступность перегрева, меняем текст, увеличиваем шрифт.
			}).then(function() {
				self.overheatAvailable = true;
				self.overheatElement.innerHTML = `Перегрев`;
				self.overheatElement.style.fontSize = '2vmax';
			});
		});

	}
	addOreToInventory() {
		game.station.inventory.moveToStorage('ore', this.courierCargo);
		game.station.inventory.addToInventory('ore');
	}
	// руда в карго курьера
	addOreToCourierCargo(amount) {
		this.courierCargo += amount;
	}
	removeOreFromCourierCargo() {
		this.courierCargo = 0;
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