'use strict';

class PlayerShip{
	constructor() {
		//корабль игрока на поле
		this.laserPower = 1;
		// мощь движка единиц в секунду
		this.enginePower = 20;
		// скорость сканирования 10 астероидов в минуту
		this.scanRate = 20;
		// количество одновременно удерживаемых астероидов
		this.targetQuantity = 15;
		
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
			</div>
		`);
		
		this.shipBorderElement = createDiv('shipBorder', this.template());
	}
	show(parentElement) {
		parentElement.appendChild(this.shipBorderElement);
	}
	remove(parentElement) {
		parentElement.removeChild(this.shipBorderElement);
	}
}