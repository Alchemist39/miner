'use strict';

console.log('cargo');
let cargoID = 0;
class Cargoholder {
	constructor(shipCargoHolder) {
		this.shipCargoHolder = shipCargoHolder;
		this.currentCargo = null;

		this.id = cargoID++;
		this.renderCargo();
		this.saveOreInterval = null;
	}
	renderCargo() {
		this.holdElement = createDiv(
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
		this.displayCargoVolume();
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
		this.currentCargoBarElement.style.width = barSize + '%';
	}

	displayCargoVolume() {
		this.changeCargoBar();
		this.currentCargoElement.innerHTML = Math.round(this.currentCargo) + " / " + this.shipCargoHolder;
	}
	// для того чтобы карго обновлялось при смене корабля сразу
	// необходимо удалить содержимое элемента карго
	// отрендерить его заново и присоединить к родительскому элементу
	show(parentElement) {
		this.holdElement.innerHTML = '';
		this.renderCargo();
		parentElement.appendChild(this.holdElement);
	}
	remove(parentElement) {
		parentElement.removeChild(this.holdElement);
	}
}