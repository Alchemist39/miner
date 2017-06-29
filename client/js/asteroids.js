'use strict';

class MinedOre {
	constructor(x, y, numbers) {
		this.targetX = x + 1;
		this.targetY = y - 25;
		this.parentElement = document.body.querySelector('.mainField');
		this.element = createDiv('oreDiv');	
		//метод рандомного распределения в заданных пределах 
		this.x = Math.random() * ((this.targetX + 5) - (this.targetX - 5)) + (this.targetX - 5);
		this.element.style.left = this.x + '%';
		this.element.style.top = this.targetY + '%';
		this.element.innerHTML = Math.round(numbers);
		this.parentElement.appendChild(this.element);
		this.runDuration();
	}
	runDuration() {
		setTimeout(function() {
			this.parentElement.removeChild(this.element);
		}.bind(this), 1000);
	}
}

let asteroidID = 0;
console.log('asteroids');
class Asteroid {
	constructor(size, parentElement, field) {
		this.id = asteroidID++;
		this.initialVolume = size;
		this.currentVolume = this.initialVolume;
		this.parentElement = parentElement;
		this.field = field;

		this.asteroidElement = createDiv(
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

		this.asteroidElement.addEventListener('click', () => this.mineAsteroid(player.ship.multiplier + player.ship.laserPower));

		this.asteroidElement.addEventListener('mousedown', () => player.ship.setTarget(this));
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
		player.ship.drawCanvas(this.coordinates.x, this.coordinates.y);
		if(this.currentVolume > 1 && newVolume > 0) {
			new MinedOre(this.coordinates.x, this.coordinates.y, power);
			this.currentVolume -= power;
			player.ship.cargo.addOre(power);
			// TODO ретурн power||currentVolume
			this.changeVolumeBar();
		} else {
			player.ship.cargo.addOre(this.currentVolume);
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

	showAsteroid(parentElement) {
		parentElement.appendChild(this.asteroidElement);
	}
	removeAsteroid(parentElement) {
		parentElement.removeChild(this.asteroidElement);
	}

}
