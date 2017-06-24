'use strict';

class Item {
	static createByName({name, amount}) {
		// паттерн фабрика. создает экземпляры других классов
		switch(name) {
			case 'ore': 
				return new Ore(amount);
			case 'gas': 
				return new Gas(amount);
			case 'metall': 
				return new Metall(amount);
			case 'diamonds': 
				return new Diamonds(amount);
		}
	}

	constructor({name, amount, ruName}) {
		this.name = name;
		this.amount = amount;
		this.ruName = ruName;

		this.template = Handlebars.compile(`
			<div class="{{name}}" draggable="true" title="{{ruName}} {{amount}}"></div>
		`);
	}

	html() {
		return this.template({
			name: this.name,
			ruName: this.ruName,
			amount: this.amount
		});
	}
}

class Ore extends Item {
	constructor(amount) {
		super({
			name: 'ore',
			amount,
			ruName: 'Руда'
		});
	}
}
class Gas extends Item {
	constructor(amount) {
		super({
			name: 'gas',
			amount,
			ruName: 'Газ'
		});
	}
}
class Metall extends Item {
	constructor(amount) {
		super({
			name: 'metall',
			amount,
			ruName: 'Металл'
		});
	}
}
class Diamonds extends Item {
	constructor(amount) {
		super({
			name: 'diamonds',
			amount,
			ruName: 'Кристаллы'
		});
	}
}