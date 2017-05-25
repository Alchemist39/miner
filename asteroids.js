'use strict';

class Asteroid {
	constructor(size, parentElement, field) {
		this.initialVolume = size;
		this.currentVolume = this.initialVolume;
		this.parentElement = parentElement;
		this.field = field;
		this.asteroidElement = createAndAppend(
			parentElement,
			'div',
			'smallAsteroid1',
			`
			<div class="hpBorder">
				<div class="hpBar"></div>
				<div class="HP">${this.currentVolume}</div>
			</div>
			`
		);
		this.volumeBarElement = this.asteroidElement.querySelector('.hpBar');
		this.volumeElement = this.asteroidElement.querySelector('.HP');

		this.asteroidElement.onclick = function() {
			this.mineAsteroid(1);
		}.bind(this);
		this.coordinates = {
			x: "",
			y: ""
		};
		this.setCoordinates();
	}
	mineAsteroid(power) {
		if(this.currentVolume > 1) {
			this.currentVolume -= power;
			this.changeVolumeBar();
		} else {
			this.parentElement.removeChild(this.asteroidElement);
		}
	}

	changeVolumeBar() {
		var barSize = Math.round((this.currentVolume / this.initialVolume) * 100);
		this.volumeBarElement.style.width = barSize + '%';
		this.volumeElement.innerHTML = this.currentVolume;
	}

	setCoordinates() {
		this.getRandomCoordinatesX();
		this.getRandomCoordinatesY();
		this.asteroidElement.style.left = this.coordinates.x + '%';
		this.asteroidElement.style.top = this.coordinates.y + '%';
	}

	getRandomCoordinatesX() {
		var x;
		var randomX = getRandomInt(2, 81);
		this.coordinates.x = randomX;
	}
	getRandomCoordinatesY() {
		var y;
		var randomY = getRandomInt(0, 86);

		if( (randomY > 32 && randomY < 80) && (this.coordinates.x > 41 && this.coordinates.x < 55) ) {
			y = getRandomInt(80, 86);
			this.coordinates.y = y;
		} else {
			this.coordinates.y = randomY;
		}
	}

}
