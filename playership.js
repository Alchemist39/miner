'use strict';

var player = new Player('Alchemist');
class PlayerShip{
	constructor() {
		//корабль игрока на поле
		this.laserPower = player.upgrades.lasers;
		// мощь движка единиц в секунду
		this.enginePower = 20;
		// скорость сканирования 10 астероидов в минуту
		this.scanRate = player.upgrades.scanRate;
		// количество одновременно удерживаемых астероидов
		this.targetQuantity = player.upgrades.targetQuantity;

		this.cargoCapacity = 2000;

		this.maxCharge = 200;

		this.multiplier = 0;
		
		this.template = Handlebars.compile(`
			<div class="playersShip">
				<div class="shieldBorder">
					<div class="shieldBar"></div>
					<div class="shield">30</div>
				</div>
				<div class="armorBorder">
					<div class="armorBar"></div>
					<div class="armor">30</div>
				</div>
				<div class="hpBorder">
					<div class="hpBar"></div>
					<div class="HP">30</div>
				</div>
				<div class="chargeBorder">
					<div class="chargeBar"></div>
					<div class="charge">0</div>
				</div>
			</div>
		`);
		
		this.shipBorderElement = createDiv('shipBorder', this.template());
		this.chargeBarElement = this.shipBorderElement.querySelector('.chargeBar');
		this.chargeElement = this.shipBorderElement.querySelector('.charge');
	}
	show(parentElement) {
		parentElement.appendChild(this.shipBorderElement);
	}
	remove(parentElement) {
		parentElement.removeChild(this.shipBorderElement);
	}
	changeChargeBar() {
		var barSize = Math.round((this.multiplier / this.maxCharge) * 100);
		this.chargeBarElement.style.width = barSize + '%';
		this.chargeElement.innerHTML = Math.round(this.multiplier) + "/" + this.maxCharge;
	}
	setMultiplier(value) {
		this.multiplier += value;
		if (value == 0) {
			this.multiplier = 0;
		}
	}
	getMultiplier() {
		if(this.multiplier < this.maxCharge) {
			return this.multiplier;
		} else {
			return this.maxCharge;
		}
	}
	miningLaser() {

		this.mineInterval = setInterval(function(){
			if(this.currentVolume > 1 && this.currentVolume > ((this.laserPower + this.multiplier) / 4)) {
				this.mineAsteroid((this.laserPower + this.getMultiplier()) / 4);
				if( this.getMultiplier() < this.maxCharge) {
					this.setMultiplier(this.laserPower / 16);
				}
				console.log(this.getMultiplier());
			} else {
				this.mineAsteroid(this.currentVolume);
				clearInterval(this.mineInterval);
				this.setMultiplier(0);
			}
			this.changeChargeBar();
		}.bind(this), 250);
	}
}