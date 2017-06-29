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
		this.decreaseMultiplier();
	}
	turnOffLasers() {
		if(this.multiplier == 0) {
			return;
		}
		this.multiplier = 0;
	}
	// обнуление мультиплкатора при простое
	decreaseMultiplier() {
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
	// отрисовка лазера
	drawCanvas(x, y) {
		let canvas = document.getElementById('laserLine');
		let width = canvas.clientWidth;
		let height = canvas.clientHeight;
		let laserWidth = 2;
		// стартовые координаты (корабль)
		let shipX = (50 * width) / 100;
		let shipY = (60 * height) / 100;
		// корректировка координат цели
		let targetX = ((x * width) / 100) + 25;
		let targetY = ((y * height) / 100) + 25;

		let randomX = Math.random() * ((targetX + 25) - (targetX - 25)) + (targetX - 25)
		let randomY = Math.random() * ((targetY + 10) - (targetY - 10)) + (targetY - 10)

		let ctx = canvas.getContext('2d');
		ctx.strokeStyle = "red";
		ctx.lineWidth = laserWidth;
		//сама отрисовка
		ctx.beginPath(); 
		ctx.moveTo(shipX, shipY);
		ctx.lineTo(randomX, randomY);
		ctx.stroke();
		// удаление линии лазера
		setTimeout( () => ctx.clearRect(0, 0, width, height) , 50);
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
		if(this.target && this.target.currentVolume != null) {
			this.mineInterval = setInterval(function(){
				clearInterval(this.reductionTick);
				this.multiplierReduction();
				if(this.target.currentVolume > ((this.laserPower + this.multiplier) / 4)) {
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
