'use strict';

class Miningfield {
	constructor(page) {
		this.page = page;
		this.asteroids = [];
		//див поля боя
		this.template = Handlebars.compile(`
			<div class="locationName"></div>
			<div class="arrowblock">
				{{#if canGoBack}}
					<div class="arrowBack">
						<a href="{{math page '-' 1}}">назад</a>
					</div>
				{{/if}}
				{{#if canGoForward}}
					<div class="arrowNext">
						<a href="{{math page '+' 1}}">вперед</a>
					</div>
				{{/if}}
			</div> 
			<div class="localStatus">Безопасный сектор</div>
			<div class="mainField"></div>
		`);

		this.battleFieldElement = createDiv('battleField', this.template({
			page: this.page,
			canGoBack: this.page >= 2,
			canGoForward: this.page < 10
		}));

		this.mainFieldElement = this.battleFieldElement.querySelector('.mainField');

		for (var i = 1; i < 15; i++) {
			//обект с определенным ID = экземпляру класса
			this.asteroids.push(new Asteroid(5 * this.page, this.mainFieldElement, this));
/*
			this.asteroids.superAsteroid
			this.asteroids['superAsteroid']

			this.asteroids = {
				0: new Asteroid(5 * this.id, this.mainFieldElement, this),
				1: new Asteroid(5 * this.id, this.mainFieldElement, this),
				2: new Asteroid(5 * this.id, this.mainFieldElement, this),
				... 
			}*/
		}

		setInterval(function(){
			if(this.asteroids.length < 15){
				this.asteroids.push(new Asteroid(5 * this.page, this.mainFieldElement, this));
			}
		}.bind(this), 10000)

		this.createMainFieldElement();
	}
	//TODO создать метод создания астероида при удалении одного из астероидов
	// астероид == this в классе астероидов
	onKill(asteroid) {
		// удаляем весь астероид по id
		this.cargo.addOre(asteroid.getReward());
		for(let i = 0; i < this.asteroids.length; i++){
			if(this.asteroids[i].id == asteroid.id) {
				this.asteroids.splice(i, 1);
				break;
			}
		}
	}
	displayid() {
		this.battleFieldElement.querySelector('.locationName').innerHTML = 'Пояс астероидов №' + this.page;
	}
	createMainFieldElement() {
		//корабль игрока на поле
		this.shipBorderElement = createAndAppend(this.mainFieldElement, 'div', 'shipBorder', '');

		this.playersShipElement = createAndAppend(this.shipBorderElement, 'div', 'playersShip', '');
		//щит корабля
		this.shieldBorderElement = createAndAppend(this.playersShipElement, 'div', 'shieldBorder', '');
		this.shieldBarElement = createAndAppend(this.shieldBorderElement, 'div', 'shieldBar', '');
		this.shieldElement = createAndAppend(this.shieldBorderElement, 'div', 'shield', '30');
		//броня корабля
		this.armorBorderElement = createAndAppend(this.playersShipElement, 'div', 'armorBorder', '');
		this.armorBarElement = createAndAppend(this.armorBorderElement, 'div', 'armorBar', '');
		this.armorElement = createAndAppend(this.armorBorderElement, 'div', 'armor', '30');
		//хп корабля
		this.hpBorderElement = createAndAppend(this.playersShipElement, 'div', 'hpBorder', '');
		this.hpBarElement = createAndAppend(this.hpBorderElement, 'div', 'hpBar', '');
		this.HPElement = createAndAppend(this.hpBorderElement, 'div', 'HP', '30');


		this.cargo = new Cargoholder(2000, 0, this.battleFieldElement, this);

		this.displayid();
	}
}

