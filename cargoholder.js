'use strict';
class Cargoholder {
	constructor(shipCargoHolder, currentCargo = 0, parentElement, field) {
		this.shipCargoHolder = shipCargoHolder;
		this.currentCargo = currentCargo;
		this.parentElement = parentElement;
		this.field = field;
		this.holdElement = createAndAppend(
			parentElement, 
			'div', 
			'hold', 
			`
			<div class="holdText">Загруженность трюма</div>
			<div class="holdBorder">
				<div class="holdBar"></div>
				<div class="holdStatus"> ${this.currentCargo} / ${this.shipCargoHolder}</div>
			</div>
			`
		);
		this.currentCargoBarElement = this.holdElement.querySelector('.holdBar');
		this.currentCargoElement = this.holdElement.querySelector('.holdStatus');
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
		this.currentCargo = 0;
		this.displayCargoVolume();
	}

	changeCargoBar() {
		var barSize = Math.round((this.currentCargo / this.shipCargoHolder) * 100);
		this.currentCargoBarElement.style.width = barSize + '%';
	}

	displayCargoVolume() {
		this.changeCargoBar();
		this.currentCargoElement.innerHTML = this.currentCargo + " / " + this.shipCargoHolder;
	}
	deconstructCargo() {
		this.parentElement.removeChild(this.holdElement);
	}
}