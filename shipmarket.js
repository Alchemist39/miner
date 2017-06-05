'use strict'

class ShipMarket {
	constructor(station) {
		this.station = station;
		this.shipmarketElement = createDiv('shipmarket');

		this.marketContainerElement = createAndAppend(
			this.shipmarketElement, 
			'div', 
			'marketContainer',
			''
		);
		this.backElement = createAndAppend(
			this.marketContainerElement, 
			'div', 
			'back',
			'Назад'
		);

		this.backElement.onclick = function() {
			pushUrl('/station', 'Станция');
		}.bind(this);

		this.waspElement = createAndAppend(this.marketContainerElement, 'div', 'wasp', '');
		this.frigateElement = createAndAppend(this.marketContainerElement, 'div', 'frigate', '');
		this.mirageElement = createAndAppend(this.marketContainerElement, 'div', 'mirage', '');
		this.transportElement = createAndAppend(this.marketContainerElement, 'div', 'transport', '');
		this.cruiserElement = createAndAppend(this.marketContainerElement, 'div', 'cruiser', '');
		this.battleshipElement = createAndAppend(this.marketContainerElement, 'div', 'battleship', '');
		this.carrierElement = createAndAppend(this.marketContainerElement, 'div', 'carrier', '');
		this.dreadnoughtElement = createAndAppend(this.marketContainerElement, 'div', 'dreadnought', '');
		this.reaperElement = createAndAppend(this.marketContainerElement, 'div', 'reaper', '');
		this.flagmanElement = createAndAppend(this.marketContainerElement, 'div', 'flagman', '');

		this.hungarContainerElement = createAndAppend(
			this.shipmarketElement, 
			'div', 
			'hungarContainer',
			''
		);
		this.stationNameElement = createAndAppend(
			this.hungarContainerElement, 
			'div', 
			'stationName',
			'Станция: Земляне люминатые'
		);

		this.newShipElement = createAndAppend(this.hungarContainerElement, 'div', 'newShip', '');
		this.weaponPlace1Element = createAndAppend(this.newShipElement, 'div', 'weaponPlace1', '');
		this.weaponPlace2Element = createAndAppend(this.newShipElement, 'div', 'weaponPlace2', '');
		this.weaponPlace3Element = createAndAppend(this.newShipElement, 'div', 'weaponPlace3', '');
		this.weaponPlace4Element = createAndAppend(this.newShipElement, 'div', 'weaponPlace4', '');
		this.weaponPlace5Element = createAndAppend(this.newShipElement, 'div', 'weaponPlace5', '');
		this.weaponPlace6Element = createAndAppend(this.newShipElement, 'div', 'weaponPlace6', '');

		this.shipDescriptionElement = createAndAppend(this.shipmarketElement, 'div', 'shipDescription', '');
		this.weaponDescriptionElement = createAndAppend(
			this.shipDescriptionElement, 
			'div', 
			'weaponDescription', 
			'<p class="descriptionName">Орудийные системы</p>'
		);
		this.containerDescriptionElement = createAndAppend(
			this.weaponDescriptionElement, 
			'div', 
			'containerDescription', 
			`<p>Оружейных точек: 6</p>
			<p>	3 малые точки</p>
			<p>	2 средние точки</p>
			<p>	1 больная точка</p>`
		);
		this.armorDescriptionElement = createAndAppend(
			this.shipDescriptionElement, 
			'div', 
			'armorDescription', 
			'<p class="descriptionName">Системы защиты</p>'
		);
		this.containerDescriptionElement = createAndAppend(
			this.armorDescriptionElement, 
			'div', 
			'containerDescription', 
			`<p>Броня корпуса: 20 000</p>
			<p>Броневое поглощение: 50%</p>
			<p>Мощность щитов: 30 000</p>`
		);
		this.driveDescriptionElement = createAndAppend(
			this.shipDescriptionElement, 
			'div', 
			'driveDescription', 
			'<p class="descriptionName">Силовая установка</p>'
		);
		this.containerDescriptionElement = createAndAppend(
			this.driveDescriptionElement, 
			'div', 
			'containerDescription', 
			`<p>Узлов для модулей усиления: 3</p>
			<p>Базовая мощность двигателей: 20000</p>`
		);

	}
	showMarket() {
		document.body.appendChild(this.shipmarketElement);	
	}
	hideMarket() {
		document.body.removeChild(this.shipmarketElement);
	}
}

