'use strict';
let cargoID = 0;
class Cargoholder {
	constructor(shipCargoHolder, currentCargo = 0) {
		this.shipCargoHolder = shipCargoHolder;
		this.currentCargo = this.getOre() || currentCargo;

		this.id = cargoID++;
		this.holdElement = createDiv(
			'hold', 
			`
			<div class="holdText">Загруженность трюма</div>
			<div class="holdBorder">
				<div class="holdBar"></div>
				<div class="holdStatus"> ${this.getOre()} / ${this.shipCargoHolder}</div>
			</div>
			`
		);
		this.currentCargoBarElement = this.holdElement.querySelector('.holdBar');
		this.currentCargoElement = this.holdElement.querySelector('.holdStatus');
		this.displayCargoVolume();
	}

	// добавляем руду в трюм
	// создаем переменную отражающую новое значение содержимого трюма
	// если в трюме есть место И новое значение содержимого трюма не превышает размер трюма
	// добавляем к содержимому трюма количество руды
	// если новое значение превышает вместимость трюма, то трюм заполняется на 100% без излишка
	addOre(value) {
		var newCargoValue = this.getOre() + value;
		if(this.getOre() < this.shipCargoHolder && newCargoValue <= this.shipCargoHolder) {
			this.currentCargo += value;
			this.displayCargoVolume();
			this.setOre(this.currentCargo);
		} else if(this.currentCargo < this.shipCargoHolder && newCargoValue > this.shipCargoHolder) {
			this.currentCargo = this.shipCargoHolder;
			this.displayCargoVolume();
			this.setOre(this.currentCargo);
		}
	}
	setOre(amount) {
		localStorage.setItem('ore', amount);
	}
	getOre() {
		return parseInt(localStorage.getItem('ore')) || 0;
	}
	removeOre() {
		this.currentCargo = 0;
		this.displayCargoVolume();
		this.setOre(this.currentCargo);
	}

	changeCargoBar() {
		var barSize = Math.round((this.currentCargo / this.shipCargoHolder) * 100);
		this.currentCargoBarElement.style.width = barSize + '%';
	}

	displayCargoVolume() {
		this.changeCargoBar();
		this.currentCargoElement.innerHTML = this.currentCargo + " / " + this.shipCargoHolder;
	}
	show(parentElement) {
		parentElement.appendChild(this.holdElement);
	}
	remove(parentElement) {
		parentElement.removeChild(this.holdElement);
	}
}