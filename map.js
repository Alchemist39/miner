'use strict';
class Map{
	constructor(station) {
		this.station = station;

		this.template = Handlebars.compile(`
			<div class="stationButton"></div>
			<div class="field_342"></div>
			<div class="closeMap">Закрыть</div>
		`);

		this.mapElement = createDiv('map', this.template());
		/*
		
		this.template = Handlebars.compile(`
			{{#if isStation}}
				<div class="stationButton" title="Вы находитесь здесь"></div>
				<div class="field_342" title="До места назначения 100 единиц"></div>
			{{else}}
				<div class="stationButton" title="До места назначения 100 единиц"></div>
				<div class="field_342" title="Вы находитесь здесь"></div>
			{{/if}}
			<div class="closeMap">Закрыть</div>
		`);

		this.mapElement = createDiv('map', this.template({
			isStation: stationRoute.match(window.location.pathname)
		}));

		*/
		this.stationButtonElement = this.mapElement.querySelector('.stationButton');
		this.field_342Element = this.mapElement.querySelector('.field_342');
		this.mapCloseElement = this.mapElement.querySelector('.closeMap');

		this.stationButtonElement.onclick = function() {
			this.stationShow();
		}.bind(this);

		this.field_342Element.onclick = function() {
			this.fieldShow();
		}.bind(this);

		this.mapCloseElement.onclick = function() {
			this.hide();
		}.bind(this);
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


