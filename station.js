'use strict'

class Station {
	constructor() {
		this.map = null;
		this.shipmarket = null;
		// див станции
		this.stationElement = createAndAppend(document.body, 'div', 'station', '');
		//див левой контрольной панели
		this.controllPanelElement = createAndAppend(this.stationElement, 'div', 'controllPanel', '');
		// элементы меню
		this.shipMarketElement = createAndAppend(this.controllPanelElement, 'div', 'shipsMarket', 'Корабли');
		//переход на страницу покупки кораблей
		this.shipMarketElement.onclick = function() {
			this.shipmarket.showMarket();
		}.bind(this);

		this.weaponMarketElement = createAndAppend(this.controllPanelElement, 'div', 'weaponsMarket','Модули');
		this.repairMarketElement = createAndAppend(this.controllPanelElement, 'div', 'repairMarket','Ремонт');
		this.sellMarketElement = createAndAppend(this.controllPanelElement, 'div', 'sellMarket','Продажа');
		this.inventoryElement = createAndAppend(this.controllPanelElement, 'div', 'inventory','Инвентарь');
		this.starMapElement = createAndAppend(this.controllPanelElement, 'div', 'starMap','Карта');

		//ошибка: выдавало style of undefiend
		//решение: .bind(this)
		this.starMapElement.onclick = function() {
			this.map.showMap();
		}.bind(this);
		//див ангара
		this.hungarContainerElement = createAndAppend(this.stationElement, 'div', 'hungarContainer','');
		this.stationNameElement = createAndAppend(this.hungarContainerElement, 'div', 'stationName','Станция: Земляне люминатые');
		//корабль игрока
		this.playersShipElement = createAndAppend(this.hungarContainerElement, 'div', 'playersShip','');
		this.weaponPlace1Element = createAndAppend(this.playersShipElement, 'div', 'weaponPlace1','');
		this.weaponPlace2Element = createAndAppend(this.playersShipElement, 'div', 'weaponPlace2','');

		//инвентарь
		this.inventoryContainerElement = createAndAppend(this.hungarContainerElement, 'div', 'inventoryContainer','');

		for(var i = 0; i < 48; i++){
			this.inventorySlotElement = createAndAppend(
				this.inventoryContainerElement, 
				'div', 
				'inventorySlot',
				''
			);
		}
		// ошибка: выдавало inventoryAppear is not a function
		// решение: .bind(this)
		this.inventoryElement.onclick = function() {
			this.inventoryAppear();
		}.bind(this);
	}
	inventoryAppear() {
		if (this.inventoryContainerElement.style.left == '-100%') {
			this.inventoryContainerElement.style.left = '0%';
		} else {
			this.inventoryContainerElement.style.left = '-100%';
		}
	}
}
