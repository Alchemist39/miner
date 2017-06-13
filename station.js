'use strict'

class Station {
	constructor() {
		this.map = null;
		this.shipmarket = null;

		this.template = Handlebars.compile(`
			<div class="controllPanel">
				<div class="shipsMarket">Корабли</div>	
				<div class="weaponsMarket">Модули</div> 
				<div class="repairMarket">Ремонт</div>
				<div class="sellMarket" draggable="true">Продажа</div>
				<div class="wallet">Кошелек</div>
				<div class="inventory">Инвентарь</div>
				<div class="starMap">Карта</div>			
			</div>
			<div class="hungarContainer">
				<div class="stationName">Станция: Земляне люминатые</div>
				<div class="playersShip">
					<div class="weaponPlace1"></div>				
					<div class="weaponPlace2"></div>
				</div>
				<div class="upgrades"></div>
			</div>
		`);

		// див станции
		this.stationElement = createDiv('station', this.template());
		this.sellElement = this.stationElement.querySelector('.sellMarket');


		//инвентарь
		this.inventory = new Inventory(this.stationElement.querySelector('.hungarContainer'));

		this.upgradesSlots = new Inventory(this.stationElement.querySelector('.upgrades'), 20);
		this.upgradesSlots.setUpgrades();

		//переход на страницу покупки кораблей
		this.stationElement.querySelector('.shipsMarket').addEventListener('click', function() {
			pushUrl('/market', 'Магазин');
		}.bind(this));

		this.stationElement.querySelector('.weaponsMarket').addEventListener('click', function() {
			this.hideStation();
			this.show();
			this.inventory.inventoryContainerElement.style.left = '0%';
			this.stationElement.querySelector('.upgrades').style.visibility = 'visible';
		}.bind(this));

		this.sellElement.addEventListener('click', function() {
			wallet.addMoney(miningPage.getOreStorage());
			miningPage.removeOreFromStorage();
			this.inventory.removeOreFromInventory();
			this.inventory.inventoryContainerElement.style.left = '0%';
		}.bind(this));

		this.stationElement.querySelector('.starMap').addEventListener('click', function() {
			this.map.show();
		}.bind(this));

		this.stationElement.querySelector('.inventory').addEventListener('click', function() {
			this.inventory.inventoryAppear();
		}.bind(this));

		this.stationElement.querySelector('.cruiser').addEventListener('click', function() {
			if(miningPage.playerShip.laserPower != 2 && miningPage.overheatAvailable == true) {
				miningPage.playerShip.laserPower = 2;
				console.log('Лазеры усилены до 2');
				localStorage.setItem('lasers', 2);
			}
		}.bind(this));

		this.stationElement.querySelector('.carrier').addEventListener('click', function() {
			if(miningPage.playerShip.targetQuantity != 15) {
				miningPage.playerShip.targetQuantity = 15;
				console.log('Количество увеличено до 15');
				localStorage.setItem('targetQuantity', 15);
			}
		}.bind(this));

		this.stationElement.querySelector('.truck').addEventListener('click', function() {
			if(miningPage.playerShip.scanRate != 15) {
				miningPage.playerShip.scanRate = 15;
				console.log('Скорость сканеров увеличена до 15');
				localStorage.setItem('scanRate', 15);
			}
		}.bind(this));

		this.show();
	}
	show() {
		document.querySelector('.container').appendChild(this.stationElement);
	}
	hideStation() {
		document.querySelector('.container').removeChild(this.stationElement);
	}
}
