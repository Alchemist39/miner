'use strict';

let asteroidID = 0;

class Asteroid {
	constructor(size, parentElement, field) {
		this.id = asteroidID++;
		this.initialVolume = size;
		this.currentVolume = this.initialVolume;
		this.parentElement = parentElement;
		this.field = field;

		this.mineInterval = null;
		this.removeInterval = null;
		this.mineAction = null;

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

		this.asteroidElement.addEventListener('click', function() {
			this.mineAsteroid(miningPage.playerShip.laserPower);
		}.bind(this));

		// добыча астероида призажатии кнопки мыши на нем
		// если занести всю формулу в переменную, то увеличение мультипликатора не происходит
		this.asteroidElement.addEventListener('mousedown', function() {
			// установка цели для оружия корабля miningPage.playerShip.setTarget(this)
			// mouseUp clearTarget
			this.mineInterval = setInterval(function(){
				let playerShip = miningPage.playerShip;
				if(this.currentVolume > 1 && this.currentVolume > ((playerShip.laserPower + playerShip.multiplier) / 4)) {
					this.mineAsteroid((playerShip.laserPower + playerShip.getMultiplier()) / 4);
					if( playerShip.getMultiplier() < playerShip.maxCharge) {
						playerShip.setMultiplier(playerShip.laserPower / 16);
					}
					console.log(playerShip.getMultiplier());
				} else {
					this.mineAsteroid(this.currentVolume);
					clearInterval(this.mineInterval);
					playerShip.setMultiplier(0);
				}
				playerShip.changeChargeBar();
			}.bind(this), 250);
		}.bind(this));
		// прослушиваем отпускание на документе, т.к. если зажатую мышь увести с астероида
		// и отпустить, то добыча не остановится. Если не отлавливать dragend, то при перетягивании
		// астероида, не отлавливается событие mouseup 
		document.addEventListener('mouseup', function() {this.clearMultiplier()}.bind(this));
		document.addEventListener('dragend', function() {this.clearMultiplier()}.bind(this));

		this.coordinates = {
			x: "",
			y: ""
		};
		this.setCoordinates();
	}
	clearMultiplier() {
		clearInterval(this.mineInterval);
		miningPage.playerShip.setMultiplier(0);
		miningPage.playerShip.changeChargeBar()
	}
	mineAsteroid(power) {
		var newVolume = this.currentVolume - power
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
/*
	autoMining() {
		for(var i = 0; i < miningPage.asteroids.length; i++) {
			setInterval(function() {
				if (miningPage.asteroids[i]) {
					miningPage.asteroids[i].mineAsteroid(miningPage.playerShip.laserPower);				
				}
			}.bind(this), 1000);
		}
	}
*/
	getReward() {
		return this.initialVolume;
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
