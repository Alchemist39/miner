'use strict'

console.log('station');
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
		
		this.inventory = new Inventory(this.stationElement.querySelector('.hungarContainer'));
	} 
	renderStation() {
		//clear();
		if(document.body.querySelector('.station')) {
			this.hideStation();
		}
		this.stationElement = createDiv('station', this.template({
			ship: player.ship.getShipInHungarHTML()
		}));	
		if(this.inventory) {
			this.inventory.appendInventory(this.stationElement.querySelector('.hungarContainer'));
		}


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


		this.show();
	}
	sell() {
		//wallet.addMoney(this.inventory.getFromStorage('ore'));
		this.ajaxRemove(0);
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
