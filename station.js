'use strict'

class Station {
	constructor() {
		this.shipmarket = new ShipMarket(this);
		this.miningfield = new Miningfield(this);
		// див карты
		this.mapElement = createAndAppend(document.body, 'div', 'map', '');
		this.stationButtonElement = createAndAppend(this.mapElement, 'div', 'stationButton', '');
		this.field_342Element = createAndAppend(this.mapElement, 'div', 'field_342', '');
		this.mapCloseElement = createAndAppend(this.mapElement, 'div', 'closeMap', 'Закрыть');
		//действия с кнопками карты: скрываем один див, показываем другой
		this.field_342Element.onclick = function() {
			this.stationElement.style.display = 'none';
			this.miningfield.miningFieldElement.style.display = 'flex';
			this.mapElement.style.visibility = 'hidden';
		}.bind(this);
		//действие при нажатии на текущее местоположение
		this.stationButtonElement.onclick = function() {
			this.mapElement.style.visibility = 'hidden';
		}.bind(this);
		
		// див станции
		this.stationElement = createAndAppend(document.body, 'div', 'station', '');
		//див левой контрольной панели
		this.controllPanelElement = createAndAppend(this.stationElement, 'div', 'controllPanel', '');
		// элементы меню
		this.shipMarketElement = createAndAppend(this.controllPanelElement, 'div', 'shipsMarket', 'Корабли');
		//переход на страницу покупки кораблей
		this.shipMarketElement.onclick = function() {
			this.stationElement.style.display = 'none';
			this.shipmarket.shipmarketElement.style.display = 'flex';
		}.bind(this);

		this.weaponMarketElement = createAndAppend(this.controllPanelElement, 'div', 'weaponsMarket','Модули');
		this.repairMarketElement = createAndAppend(this.controllPanelElement, 'div', 'repairMarket','Ремонт');
		this.sellMarketElement = createAndAppend(this.controllPanelElement, 'div', 'sellMarket','Продажа');
		this.inventoryElement = createAndAppend(this.controllPanelElement, 'div', 'inventory','Инвентарь');
		this.starMapElement = createAndAppend(this.controllPanelElement, 'div', 'starMap','Карта');

		//ошибка: выдавало style of undefiend
		//решение: .bind(this)
		this.starMapElement.onclick = function() {
			this.mapElement.style.visibility = 'visible';
		}.bind(this);

		this.mapCloseElement.onclick = function() {
			this.mapElement.style.visibility = 'hidden';
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

	// изменение стиля инвентаря видимый-невидимый
	/*inventoryAppear() {
		if (this.inventoryContainerElement.style.opacity == 0) {
			this.inventoryContainerElement.style.opacity = 1;
		} else {
			this.inventoryContainerElement.style.opacity = 0;
		}
	}*/
	inventoryAppear() {
		if (this.inventoryContainerElement.style.left == '-100%') {
			this.inventoryContainerElement.style.left = '0%';
		} else {
			this.inventoryContainerElement.style.left = '-100%';
		}
	}
}


window.onload = function() {
	var station = new Station();
}