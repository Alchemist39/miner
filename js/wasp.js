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
		this.cargo = 2000;
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
		this.cargo = 10000;

	}
}