'use strict';

let asteroidID = 0;

class Asteroid {
	constructor(size, parentElement, field) {
		this.id = asteroidID++;
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
			this.kill();
		}
	}

	getReward() {
		return this.initialVolume;
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
	kill() {
		this.parentElement.removeChild(this.asteroidElement);
		this.field.onKill(this);
	}

	getRandomCoordinatesX() {
		this.coordinates.x = getRandomInt(2, 81);
	}
	
	getRandomCoordinatesY() {
		var y = getRandomInt(0, 86);

		if(y > 32 && y < 80 && this.coordinates.x > 41 && this.coordinates.x < 55) {
			y = getRandomInt(80, 86);
			this.coordinates.y = y;
		} else {
			this.coordinates.y = y;
		}
	}

}
