'use strict';

class MiningfieldPage {
	constructor() {
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
		this.courierCargo = 0;
		this.courierStatus = true;
		this.flyAvailable = true;
		this.overheatAvailable = true;
		this.oreStorage = game.station.inventory.getFromStorage('ore') || 0;
		//все созданные поля хранятся в массиве
		this.miningFields = {};

		this.cargo = new Cargoholder(player.ship.cargoCapacity);

		this.template = Handlebars.compile(`
			<div class="controllPanel">
				<div class="courier">Разгрузка</div>
				<div class="overheat">Перегрев</div> 
				<div class="weapon">Оружие</div>
				<div class="miningLaser">Буры</div>
				<div class="starMap">Карта</div>
			</div>
		`);

		this.renderMiningPage();
	}
	renderMiningPage() {
		clear();
		this.miningFieldElement = createDiv('miningField', this.template());
		this.courierElement = this.miningFieldElement.querySelector('.courier');
		this.overheatElement = this.miningFieldElement.querySelector('.overheat');
		this.starMapElement = this.miningFieldElement.querySelector('.starMap');
		this.shipElement = this.miningFieldElement.querySelector('.shipBorder');

		// используем стрелочную функцию для исключения .bind(this)
		this.starMapElement.addEventListener( 'click', () => this.map.show() );
		
		// кнопка разгрузки
		this.courierElement.addEventListener('click', () => this.runTransportationSequence() );

		// кнопка перегрева
		this.overheatElement.addEventListener('click', () => this.runOverheatSequence() );
	}
	// запуск очереди функций по разгрузке
	runTransportationSequence() {
		if (!this.courierStatus){
			return;
		}
		this.courierStatus = false;

		this.runTransportationCountdown()
			.then( () => this.cargo.removeOre() )
			.then( () => this.runTransportationCooldown() )
			.then( () => this.endOfTransportation() )
	}
	// курьер летит на поле
	runTransportationCountdown() {
		let waitForCourier = new Timer({
			duration: this.config.courierDelay
		});

		this.courierElement.style.fontSize = '1vmax';
		
		waitForCourier.onTick(function(timer) {
			let time = timer.getFormatedLeftTime(); 
			this.courierElement.innerHTML = `
				Курьер летит <br>
				${time.minutes}:${time.seconds}
			`;
		}.bind(this));

		return waitForCourier.promise;
	}
	// крьер возвращается на станцию
	runTransportationCooldown() {
		let courierCooldown = new Timer({
			duration: this.config.courierCooldown
		});
		// добавляем функцию в массив functionArray хелпера
		courierCooldown.onTick(function(timer) {
			let time = timer.getFormatedLeftTime(); 
			this.courierElement.innerHTML = `
				Курьер недоступен <br>
				${time.minutes}:${time.seconds}
			`;
		}.bind(this));

		return courierCooldown.promise;
	}
	// конец перевозки руды
	endOfTransportation() {
		this.courierElement.innerHTML = 'Разгрузка';
		this.courierElement.style.fontSize = '2vmax';
		this.courierStatus = true;
		this.addOreToInventory();
		this.removeOreFromCourierCargo();
	}


	// последовательность пергрева
	runOverheatSequence() {
		if(!this.overheatAvailable) {
			return;
		}
		this.startOverheat();
		this.runOverheatCountdown()
			.then( () => this.runOverheatCooldown() ) 
			.then( () => this.endOfOverheat() );
	}
	// запуск перегрева
	startOverheat() {
		this.overheatAvailable = false;
		this.overheatElement.style.color = 'red';
		this.overheatElement.style.fontSize = '1vmax';
		player.ship.laserPower *= 10;
	}
	// перегрев активен
	runOverheatCountdown() {
		let overheatCountdown = new Timer({
			duration: this.config.overheatDuration
		});
		// вызываем функцию (свойство класса) onTick, передаем в нее функцию с аргументом timer
		// через свойство класса форматируем время; меняем текст на странице
		overheatCountdown.onTick(function(timer) {
			let time = timer.getFormatedLeftTime();
			this.overheatElement.innerHTML = `
				Перегрев<br>
				${time.minutes}:${time.seconds}
			`;
		}.bind(this));

		return overheatCountdown.promise;
	}
	// перегрев откатывается
	runOverheatCooldown() {
		// вызываем свойство promise экземпляра класса Timer, по завершении отсчета активности перегрева
		// Начинаем новый отсчет отката перегрева с отображением отсчета на странице
		// устанавливаем цвет текста на белый, уменьшаем мощность лазерова в 10 раз (к изначальному)
		let overheatCooldown = new Timer({
			duration: this.config.overheatCooldown
		})
		overheatCooldown.onTick(function(timer) {
			let time = timer.getFormatedLeftTime();
			this.overheatElement.innerHTML = `
				Перегрев недоступен<br>
				${time.minutes}:${time.seconds}
			`;
		}.bind(this));
		this.overheatElement.style.color = 'white';
		player.ship.laserPower /= 10;

		return overheatCooldown.promise;
	}
	// откат перегрева закончился
	endOfOverheat() {
		this.overheatAvailable = true;
		this.overheatElement.innerHTML = `Перегрев`;
		this.overheatElement.style.fontSize = '2vmax';
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

		this.cargo.show(this.miningFields[this.page].battleFieldElement);

		document.querySelector('.container').appendChild(this.miningFieldElement);
	}
}