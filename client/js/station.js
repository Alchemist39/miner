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
				<div class="refineButton" title="Переработать всю руду в минералы">Очистка</div>
				<div class="wallet">Кошелек</div>
				<div class="inventory">Инвентарь</div>
				<div class="starMap">Карта</div>			
			</div>
			<div class="hungarContainer">
				<div class="stationName">Станция: Земляне люминатые</div>
				{{{ship}}}
				<div class="upgrades"></div>
			</div>
		`);
		this.renderStation();
		// див станции
	
	} 
	renderStation() {
		clear();
		this.stationElement = createDiv('station', this.template({
			ship: player.ship.getShipInHungarHTML()
		}));	
		this.sellElement = this.stationElement.querySelector('.sellMarket');
		this.marketElement = this.stationElement.querySelector('.shipsMarket');
		this.moduleMarket = this.stationElement.querySelector('.weaponsMarket');
		this.starMapElement = this.stationElement.querySelector('.starMap');
		this.inventoryElement = this.stationElement.querySelector('.inventory');
		this.refineElement = this.stationElement.querySelector('.refineButton');

		// переход на страницу покупки кораблей
		this.marketElement.addEventListener( 'click', () => pushUrl('/market', 'Магазин') );
		// показать модули
		this.moduleMarket.addEventListener( 'click', () => this.showModules() );
		// кнопка продажи
		this.sellElement.addEventListener( 'click', () => this.sell() );
		// кнопка карты
		this.starMapElement.addEventListener( 'click', () => this.map.show() );
		// открыть инвентарь
		this.inventoryElement.addEventListener( 'click', () => this.inventory.inventoryAppear() );
		// очистка
		this.refineElement.addEventListener( 'click', () => this.inventory.runRefining() );

		// инвентарь
		this.inventory = new Inventory(this.stationElement.querySelector('.hungarContainer'));
		this.inventory.initialize();

		this.upgradeLasersElement = this.stationElement.querySelector('.cruiser');
		this.upgradeTargetQuantityElement = this.stationElement.querySelector('.carrier');
		this.upgradeScaningSpeedElement = this.stationElement.querySelector('.truck');
		this.show();
	}
/*
	upgradeScaningSpeed1() {
		if(player.ship.scanRate == 15) {
			return;
		}
		player.ship.scanRate = 15;
		console.log('Скорость сканеров увеличена до 15');
		localStorage.setItem('scanRate', 15);
	}
	upgradeTargetQuantity1() {
		if(player.ship.targetQuantity == 15) {
			return;
		}
		player.ship.targetQuantity = 15;
		console.log('Количество целей увеличено до 15');
		localStorage.setItem('targetQuantity', 15);
	}
	upgradeLasers1() {
		if(player.ship.laserPower == 2 && miningPage.overheatAvailable == false) {
			return;
		}
		player.ship.laserPower = 2;
		console.log('Лазеры усилены до 2');
		localStorage.setItem('lasers', 2);
	}*/
	sell() {
		wallet.addMoney(this.inventory.getFromStorage('ore'));
		this.inventory.clearStorage('ore');
		this.inventory.removeFromInventory('ore');
		this.inventory.inventoryContainerElement.style.left = '0%';
	}
	showModules() {
		this.hideStation();
		this.show();
		this.inventory.inventoryContainerElement.style.left = '0%';
		this.stationElement.querySelector('.upgrades').style.visibility = 'visible';
	}
	show() {
		document.querySelector('.container').appendChild(this.stationElement);
	}
	hideStation() {
		document.querySelector('.container').removeChild(this.stationElement);
	}
}
