'use strict';
class Map{
	constructor(station) {
		this.station = station;
		this.mapElement = createAndAppend(
			document.body,
			'div', 
			'map', 
			`
				<div class="stationButton"></div>
				<div class="field_342"></div>
				<div class="closeMap">Закрыть</div>
			`
		);
		this.stationButtonElement = this.mapElement.querySelector('.stationButton');
		this.field_342Element = this.mapElement.querySelector('.field_342');
		this.mapCloseElement = this.mapElement.querySelector('.closeMap');

		this.stationButtonElement.onclick = function() {
			if(this.station.stationElement.style.display == 'flex') {
				this.hideMap();
			} else {
				this.stationShow();
			}
		}.bind(this);
		this.field_342Element.onclick = function() {
			if(this.station.stationElement.style.display == 'flex') {
				this.fieldShow();
			} else {
				this.hideMap()
			}
		}.bind(this);
		this.mapCloseElement.onclick = function() {
			this.hideMap();
		}.bind(this);
	}

	stationShow() {
		pushUrl('/station', 'Станция');
	};
	fieldShow() {
		pushUrl('/field/1', 'Поле');
	};
	showMap() {
		this.mapElement.style.visibility = 'visible';
	};
	hideMap() {
		this.mapElement.style.visibility = 'hidden';
	};
}


