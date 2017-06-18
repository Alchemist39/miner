'use strict';

class Miningfield {
	constructor(page) {
		//конструктор принимает аргумент страницы из функции, из УРЛ
		this.page = page;
		//массив для храненя астероидов
		this.asteroids = [];

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
			<div class="mainField">{{{ship}}}</div>
		`);

		this.renderMiningField();
		
	}
	renderShip() {
		clear();
		this.battleFieldElement = createDiv('battleField', this.template({
			page: this.page,
			//создаем свойства-ограничители для отображения/скрытия ссылок в темплейте
			canGoBack: this.page >= 2,
			canGoForward: this.page < 10,
			ship: player.ship.getShipInFieldHTML()
		}));
	}
	renderMiningField() {
		clear();
		this.battleFieldElement = createDiv('battleField', this.template({
			page: this.page,
			//создаем свойства-ограничители для отображения/скрытия ссылок в темплейте
			canGoBack: this.page >= 2,
			canGoForward: this.page < 10,
			ship: player.ship.getShipInFieldHTML()
		}));
		this.mainFieldElement = this.battleFieldElement.querySelector('.mainField');
		//обходим массив астероидов
		for (var i = 1; i < 10; i++) {
			//записываем каждый новый астероид в массив
			//у каждого нового астероида новый ID
			this.asteroids.push(new Asteroid(this.randomValue(), this.mainFieldElement, this));
		}
		// 60 / 10 сек. раз в 6 сек
		this.scaningSpeed = (60 / player.ship.scanRate) * 1000;
		setInterval( () => this.respawnAsteroids(), this.scaningSpeed)

		this.displayPage();
	}
	respawnAsteroids() {
		//если астероидов меньше targetQuantity, спауним новый астероид раз в this.scaningSpeed сек.
		//и записываем его в массив
		if(this.asteroids.length < player.ship.targetQuantity){
			this.asteroids.push(new Asteroid(this.randomValue(), this.mainFieldElement, this));
		}
	}
	randomValue() {
		return 5 * getRandomInt(1, 20) * this.page;
	}
	// астероид == this в классе астероидов
	onKill(asteroid) {
		// обходим массив астероидов циклом
		for(let i = 0; i < this.asteroids.length; i++){
			// если ID астероида номер i в массиве совпадает с ID астерода, который мы добываем
			// то из массива выпиливается кусок астероидов номер i длиной в 1, т.е. текущий астероид
			if(this.asteroids[i].id == asteroid.id) {
				this.asteroids.splice(i, 1);
				break;
			}
		}
	}
	displayPage() {
		this.battleFieldElement.querySelector('.locationName').innerHTML = 'Пояс астероидов №' + this.page;
	}
}

