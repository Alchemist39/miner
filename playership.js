'use strict';

var player = new Player('Alchemist');
class PlayerShip{
	constructor() {
		this.config = {
			reductionTimer: 3
		};
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
		this.mineInterval = null;
		this.target = null;
		
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

		// используем хелпер дебаунс, чтобы отложить выполнение действия 
		// и обновить таймер, если функция повторно вызывается
		this.multiplierReduction = debounce(function() {
			this.target = null;
			this.reductionTick = setInterval(function() {
				if(this.getMultiplier() > 1) {
					this.multiplier *= 0.8;
					this.renderChargeBar();
					console.log(this.getMultiplier());
				} else {
					this.setMultiplier(0);
					clearInterval(this.reductionTick);
					console.log(this.getMultiplier());
				}
			}.bind(this), 1000);
		}, 1000 * this.config.reductionTimer);
	}

	show(parentElement) {
		parentElement.appendChild(this.shipBorderElement);
	}
	remove(parentElement) {
		parentElement.removeChild(this.shipBorderElement);
	}

	renderChargeBar() {
		var barSize = Math.round((this.multiplier / this.maxCharge) * 100);
		this.chargeBarElement.style.width = barSize + '%';
		this.chargeElement.innerHTML = Math.round(this.multiplier) + "/" + this.maxCharge;
	}

	setMultiplier(value) {
		this.multiplier += value;
		if (value == 0) {
			this.multiplier = 0;
		}
		this.renderChargeBar();
	}
	getMultiplier() {
		if(this.multiplier < this.maxCharge) {
			return this.multiplier;
		} else {
			return this.maxCharge;
		}
	}
	// функция непрерывной добычи руды при зажатии кнопки мыши
	// если есть цель запускается таймер
	// внутри таймера запускается отсчет обнуления мультиплаера (выполнение которого откладывается
	// при повторном вызове функции)
	// если у астероиа остается ХП после получения урона, то наносим урон и получаем руду в размере
	// нанесенного урона
	// в ином случае наносим уров в размере оставшихся хп, получаем руду и запускаем таймер
	// для обнуления мультиплаера
	startMiningLaser() {
		if(this.target) {
			this.mineInterval = setInterval(function(){
				clearInterval(this.reductionTick);
				this.multiplierReduction();
				if(this.target.currentVolume > 1 && this.target.currentVolume > ((this.laserPower + this.multiplier) / 4)) {
					this.target.mineAsteroid((this.laserPower + this.getMultiplier()) / 4);
					if( this.getMultiplier() < this.maxCharge) {
						this.setMultiplier(this.laserPower / 16);
						console.log(this.getMultiplier());
					}
				} else {
					this.target.mineAsteroid(this.target.currentVolume);
					this.stopMining();
				}
				this.renderChargeBar();
			}.bind(this), 250);
		}
	}

	setTarget(target) {
		this.target = target;
		this.startMiningLaser();
	}
	clearTarget() {
		this.target = null;
		this.stopMining();
	}

	stopMining() {
		clearInterval(this.mineInterval);
	}

}
