'use strict';

console.log('map');
class Map{
	constructor(station) {
		this.station = station;

		this.template = Handlebars.compile(`
			<div class="stationButton"></div>
			<div class="field_342"></div>
			<div class="closeMap">Закрыть</div>
		`);

		this.mapElement = createDiv('map', this.template());
	
		this.stationButtonElement = this.mapElement.querySelector('.stationButton');
		this.field_342Element = this.mapElement.querySelector('.field_342');
		this.mapCloseElement = this.mapElement.querySelector('.closeMap');

		this.stationButtonElement.addEventListener( 'click', () => this.stationShow() );
		this.field_342Element.addEventListener( 'click', () => this.fieldShow() );
		this.mapCloseElement.addEventListener( 'click', () => this.hide() );
	}

	//меняем УРЛ страницы
	stationShow() {
		pushUrl('/station', 'Станция');
	};
	fieldShow() {
		pushUrl('/field/1', 'Поле');
	};
	//присоединяем карту к страницу
	show() {
		document.querySelector('.container').appendChild(this.mapElement);
	};
	//отсоединяем карту от страницы
	hide() {
		document.querySelector('.container').removeChild(this.mapElement);
	};
}


