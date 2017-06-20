'use strict';

class Wasp extends Ship{
	constructor() {
		super();

		this.type = 'wasp';
		this.shipImageField = "url('/images/i/wasp.png')";
		this.shipImageHungar = "url('/images/wasp.png')";
		this.shipSize = {
			width: 524 + 'px',
			height: 330 + 'px'
		};
		this.cargoCapacity = 2000;
		this.laserPower = 2;
		this.scanRate = 15;
		this.cargo = new Cargoholder(this.cargoCapacity);

		this.maxCharge = 200;
		this.multiplier = 0;
		this.targetQuantity = 15;
	}
}

class Truck extends Ship{
	constructor() {
		super();

		this.type = 'truck';
		this.shipImageField = "url('/images/i/truck.png')";
		this.shipImageHungar = "url('/images/truck.png')";
		this.shipSize = {
			width: 585 + 'px',
			height: 385 + 'px'
		};
		this.cargoCapacity = 10000;
		this.laserPower = 20;
		this.scanRate = 15;
		this.cargo = new Cargoholder(this.cargoCapacity);

		this.maxCharge = 500;
		this.multiplier = 0;
		this.targetQuantity = 15;
	}
}