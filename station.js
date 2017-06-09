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
			</div>
		`);

		// див станции
		this.stationElement = createDiv('station', this.template());

		//переход на страницу покупки кораблей
		this.stationElement.querySelector('.shipsMarket').onclick = function() {
			pushUrl('/market', 'Магазин');
		}.bind(this);

		this.stationElement.querySelector('.sellMarket').onclick = function() {
			wallet.addMoney(miningPage.getOreStorage());
			miningPage.removeOreFromStorage();
			this.inventory.removeOreFromInventory();
		}.bind(this);
		
		this.stationElement.querySelector('.starMap').onclick = function() {
			this.map.show();
		}.bind(this);

		//инвентарь
		this.inventory = new Inventory(this.stationElement.querySelector('.hungarContainer'));
		
		this.stationElement.querySelector('.inventory').onclick = function() {
			this.inventory.inventoryAppear();
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
