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
		this.walletElement = createAndAppend(this.controllPanelElement, 'div', 'wallet','Кошелек');
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
		this.inventory = new Inventory(this.hungarContainerElement, this);
		
		this.inventoryElement.onclick = function() {
			this.inventory.inventoryAppear();
		}.bind(this);
	}
}
