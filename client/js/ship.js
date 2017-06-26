'use strict';

console.log('ships');
class Ship{
	constructor() {
		this.config = {
			reductionTimer: 3,
			// длительность перегрева
			overheatDuration: 5,
			// кулдаун перегрева
			overheatCooldown: 5
		};
		//корабль игрока на поле
		this.laserPower = null;
		// скорость сканирования 10 астероидов в минуту
		this.scanRate = null;
		// количество одновременно удерживаемых астероидов
		this.targetQuantity = null;

		this.maxCharge = null;

		this.multiplier = null;
		this.mineInterval = null;
		this.target = null;

		this.isOverheatAvailable = true;
		
		this.template = Handlebars.compile(`
			<div class="shipBorder">
				<div class="playersShip {{type}}">
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
			</div>	
		`);

		this.shipInHungarTemplate = Handlebars.compile(`
			<div class="playersShip {{type}}">
				<div class="weaponPlace1"></div>				
				<div class="weaponPlace2"></div>
			</div>
		`);
		this.hitTunnelDamage();
	}
	turnOffLasers() {
		if(this.multiplier == 0) {
			return;
		}
		this.multiplier = 0;
	}
	// нанесение урона при удерживании кнопки мыши
	hitTunnelDamage() {
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
	getShipInFieldHTML() {
		return this.template({
			type: this.type
		});
	}
	getShipInHungarHTML() {
		return this.shipInHungarTemplate({
			type: this.type
		});
	}

	show(parentElement) {
		parentElement.appendChild(this.shipBorderElement);
	}


	renderChargeBar() {
		var barSize = Math.round((this.multiplier / this.maxCharge) * 100);
		if(document.body.querySelector('.chargeBar') && document.body.querySelector('.charge') ) {
			document.body.querySelector('.chargeBar').style.width = barSize + '%';
			document.body.querySelector('.charge').innerHTML = Math.round(this.multiplier) + "/" + this.maxCharge;
		}
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

/*
	runOverheatSequence() {
		if(!this.isOverheatAvailable) {
			return;
		}

		this.startOverheat();
		this.runOverheatCountdown()
			.then( () => this.runOverheatCooldown() ) 
			.then( () => this.endOfOverheat() );
	}
	startOverheat() {
		this.overheatAvailable = false;
		this.laserPower *= 10;
	}

	// перегрев активен
	runOverheatCountdown() {
		let overheatCountdown = new Timer({
			duration: this.config.overheatDuration
		});
		// вызываем функцию (свойство класса) onTick, передаем в нее функцию с аргументом timer
		// через свойство класса форматируем время; меняем текст на странице
		overheatCountdown.onTick(function(timer) {
			let time = timer.getFormatedLeftTime();
			this.overheatElement.innerHTML = `
				Перегрев<br>
				${time.minutes}:${time.seconds}
			`;
		}.bind(this));

		return overheatCountdown.promise;
	}

	// перегрев откатывается
	runOverheatCooldown() {
		// вызываем свойство promise экземпляра класса Timer, по завершении отсчета активности перегрева
		// Начинаем новый отсчет отката перегрева с отображением отсчета на странице
		// устанавливаем цвет текста на белый, уменьшаем мощность лазерова в 10 раз (к изначальному)
		let overheatCooldown = new Timer({
			duration: this.config.overheatCooldown
		})
		overheatCooldown.onTick(function(timer) {
			let time = timer.getFormatedLeftTime();
			this.overheatElement.innerHTML = `
				Перегрев недоступен<br>
				${time.minutes}:${time.seconds}
			`;
		}.bind(this));
		this.overheatElement.style.color = 'white';
		this.laserPower /= 10;

		return overheatCooldown.promise;
	}

	setOverheatAvailable() {
		this.overheatAvailable = true;
	}
*/

}
