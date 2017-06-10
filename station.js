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
				<div class="sellMarket">Продажа</div>
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

		this.stationElement.querySelector('.controllPanel').onclick = function(event) {
			let target = event.target;
			// клик по кораблям
			if(target.className == 'shipsMarket') {
				pushUrl('/market', 'Магазин');
			// клик по модулям
			} else if(target.className == 'weaponsMarket') {this.hideStation();
				this.show();
				this.inventory.inventoryContainerElement.style.left = '0%';
				this.stationElement.querySelector('.upgrades').style.visibility = 'visible';
			// клик по продаже
			} else if(target.className == 'sellMarket') {
				wallet.addMoney(miningPage.getOreStorage());
				miningPage.removeOreFromStorage();
				this.inventory.removeOreFromInventory();
				this.inventory.inventoryContainerElement.style.left = '0%';
			//клик по карте
			} else if(target.className == 'starMap') {
				this.map.show();
			// клик по инвенатрю
			} else if(target.className == 'inventory') {
				this.inventory.inventoryAppear();
			}
		}.bind(this);

		//инвентарь
		this.inventory = new Inventory(this.stationElement.querySelector('.hungarContainer'));
		// апгрейды
		this.upgradesSlots = new Inventory(this.stationElement.querySelector('.upgrades'), 20);
		this.upgradesSlots.setUpgrades();
		

		this.stationElement.querySelector('.upgrades').onclick = function(event) {
			let target = event.target;

			if(target.className == 'inventorySlot cruiser') {
				if(miningPage.playerShip.laserPower != 20 && miningPage.overheatAvailable == true) {
					miningPage.playerShip.laserPower = 20;
					console.log('Лазеры усилены до 20');
				}
			} else if(target.className == 'inventorySlot carrier') {
				if(miningPage.playerShip.targetQuantity != 30) {
					miningPage.playerShip.targetQuantity = 30;
					console.log('Количество увеличено до 30');
				}
			} else if(target.className == 'inventorySlot truck') {
				if(miningPage.playerShip.scanRate != 100) {
					miningPage.playerShip.scanRate = 100;
					console.log('Скорость сканеров увеличена до 100');
				}
			}
		}.bind(this);

		this.show();
	}
	show() {
		document.querySelector('.container').appendChild(this.stationElement);
	}
	hideStation() {
		document.querySelector('.container').removeChild(this.stationElement);
	}
}
