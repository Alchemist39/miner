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
				<div class="HP">${this.currentVolume} / ${this.initialVolume}</div>
			</div>
			`
		);
		this.volumeBarElement = this.asteroidElement.querySelector('.hpBar');
		this.volumeElement = this.asteroidElement.querySelector('.HP');
		this.hpElement = this.asteroidElement.querySelector('.hpBorder');

		this.hpElement.style.visibility = 'hidden';

		this.asteroidElement.addEventListener('click', function() {
			this.mineAsteroid(player.ship.laserPower);
		}.bind(this));

		this.asteroidElement.addEventListener('mousedown', function() {
			player.ship.setTarget(this);
		}.bind(this));
		// прослушиваем отпускание на документе, т.к. если зажатую мышь увести с астероида
		// и отпустить, то добыча не остановится. Если не отлавливать dragend, то при перетягивании
		// астероида, не отлавливается событие mouseup 
		document.addEventListener('mouseup', function() {
			player.ship.clearTarget();
		});
		document.addEventListener('dragend', function() {
			player.ship.clearTarget();
		});

		this.coordinates = {
			x: "",
			y: ""
		};
		this.setCoordinates();
	}
	mineAsteroid(power) {
		var newVolume = this.currentVolume - power
		this.setHpVisible();
		if(this.currentVolume > 1 && newVolume > 0) {
			this.currentVolume -= power;
			miningPage.cargo.addOre(power);
			// TODO ретурн power||currentVolume
			this.changeVolumeBar();
		} else {
			miningPage.cargo.addOre(this.currentVolume);
			this.kill();
			this.currentVolume = 0;
			this.changeVolumeBar();
		}
	}
	getReward() {
		return this.initialVolume;
	}

	setHpVisible() {
		this.hpElement.style.visibility = 'visible';
	}

	changeVolumeBar() {
		var barSize = Math.round((this.currentVolume / this.initialVolume) * 100);
		this.volumeBarElement.style.width = barSize + '%';
		this.volumeElement.innerHTML = Math.round(this.currentVolume) + "/" + this.initialVolume;
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
