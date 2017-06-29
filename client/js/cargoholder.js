'use strict';

console.log('cargo');
let cargoID = 0;
class Cargoholder {
	constructor(shipCargoHolder) {
		this.shipCargoHolder = shipCargoHolder;
		this.currentCargo = 0;

		this.id = cargoID++;
		//this.renderCargo();
		this.saveOreInterval = null;

		this.template = Handlebars.compile(`
			<div class="hold">
				<div class="holdText">Загруженность трюма</div>
				<div class="holdBorder">
					<div class="holdBar"></div>
					<div class="holdStatus"> {{current}} / {{capacity}}</div>
				</div>
			</div>
		`);
	}
	html() {
		return this.template({
			current: Math.round(this.currentCargo) || 0,
			capacity: this.shipCargoHolder
		});
	}
	// добавляем руду в трюм
	// создаем переменную отражающую новое значение содержимого трюма
	// если в трюме есть место И новое значение содержимого трюма не превышает размер трюма
	// добавляем к содержимому трюма количество руды
	// если новое значение превышает вместимость трюма, то трюм заполняется на 100% без излишка
	addOre(value) {
		var newCargoValue = this.currentCargo + value;
		if(this.currentCargo < this.shipCargoHolder && newCargoValue <= this.shipCargoHolder) {
			this.currentCargo += value;
			this.displayCargoVolume();
		} else if(this.currentCargo < this.shipCargoHolder && newCargoValue > this.shipCargoHolder) {
			this.currentCargo = this.shipCargoHolder;
			this.displayCargoVolume();
		}
	}
	removeOre() {
		miningPage.addOreToCourierCargo(this.currentCargo);
		this.currentCargo = 0;
		this.displayCargoVolume();
	}

	changeCargoBar() {
		var barSize = (this.currentCargo / this.shipCargoHolder) * 100;
		document.body.querySelector('.holdBar').style.width = barSize + '%';
	}

	displayCargoVolume() {
		this.changeCargoBar();
		document.body.querySelector('.holdStatus').innerHTML = Math.round(this.currentCargo) + " / " + this.shipCargoHolder;
	}
}