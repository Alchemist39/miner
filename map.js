'use strict';
class Map{
	constructor(station, parentElement) {
		this.station = station;
		this.mapElement = createAndAppend(
			parentElement,
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
			this.station.stationElement.style.display = 'flex';
			parentElement.style.display = 'none';
			this.mapElement.style.visibility = 'hidden';
		}.bind(this);
		this.field_342Element.onclick = function() {
			this.mapElement.style.visibility = 'hidden';
		}.bind(this);
		this.mapCloseElement.onclick = function() {
			this.mapElement.style.visibility = 'hidden';
		}.bind(this);
	}
}


