'use strict';
class Warpjump {
	constructor(delay) {
		if(delay != undefined) {
			this.delay = delay;
		} else {
			this.delay = 2;
		}
		this.render();
	}
	render() {
		clear();
		this.element = createAndAppend(
			document.body.querySelector('.container'),
			'div',
			'warp',
			""
		);

		let warpDuration = new Timer({
			duration: this.delay
		});
		// вызываем функцию (свойство класса) onTick, передаем в нее функцию с аргументом timer
		// через свойство класса форматируем время; меняем текст на странице
		warpDuration.onTick(function(timer) {
			let time = timer.getFormatedLeftTime();
			this.element.innerHTML = `
				Перелет<br>
				${time.minutes}:${time.seconds}
			`;
		}.bind(this));
	}
	runJump() {
		let warpDuration = new Timer({
			duration: this.delay
		});
		// вызываем функцию (свойство класса) onTick, передаем в нее функцию с аргументом timer
		// через свойство класса форматируем время; меняем текст на странице
		warpDuration.onTick(function(timer) {
			let time = timer.getFormatedLeftTime();
			this.element.innerHTML = `
				Перелет<br>
				${time.minutes}:${time.seconds}
			`;
		}.bind(this));
	}
}
console.log('field');
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
			<div class="mainField" onselectstart="return false">
				{{{ship}}}
			</div>
			{{{cargo}}}
		`);

		//обходим массив астероидов
		for (var i = 0; i < 9; i++) {
			//записываем каждый новый астероид в массив
			//у каждого нового астероида новый ID
			this.asteroids.push(new Asteroid(this.randomValue(), this.mainFieldElement, this));
		}
		// 60 / 10 сек. раз в 6 сек
		this.scaningSpeed = (60 / player.ship.scanRate) * 1000;
		setInterval( () => this.respawnAsteroids(), this.scaningSpeed)

		this.renderMiningField();
	}
	renderCanvas(parent) {
		this.canv = createAndAppend(
			parent,
			'div',
			'laserLine',
			`
			<canvas id="laserLine" width="${parent.clientWidth}" height="${parent.clientHeight}"></canvas>
		`);
	}
	renderMiningField() {
		clear();
		this.battleFieldElement = createDiv('battleField', this.template({
			page: this.page,
			//создаем свойства-ограничители для отображения/скрытия ссылок в темплейте
			canGoBack: this.page >= 2,
			canGoForward: this.page < 10,
			ship: player.ship.getShipInFieldHTML(),
			cargo: player.ship.cargo.html()
		}));
		this.mainFieldElement = this.battleFieldElement.querySelector('.mainField');
		setTimeout( () => this.renderCanvas(this.mainFieldElement));
		this.showAsteroids();
		this.displayPage();
	}

	showAsteroids() {
		for(let asteroid of this.asteroids) {
			asteroid.showAsteroid(this.mainFieldElement);
		}
	}
	respawnAsteroids() {
		//если астероидов меньше targetQuantity, спауним новый астероид раз в this.scaningSpeed сек.
		//и записываем его в массив
		if(this.asteroids.length < player.ship.targetQuantity){
			this.asteroids.push(new Asteroid(this.randomValue(), this.mainFieldElement, this));

		}
		this.showAsteroids();

	}
	randomValue() {
		return 5 * getRandomInt(1, 20) * this.page;
	}
	// астероид == this в классе астероидов
	onKill(asteroid) {
		// обходим массив астероидов по номерам
		for(let i in this.asteroids) {
			// если ID астероида номер i в массиве совпадает с ID астерода, который мы добываем
			// то из массива выпиливается кусок астероидов номер i длиной в 1, т.е. текущий астероид
			if(this.asteroids[i].id == asteroid.id) {
				this.asteroids[i].removeAsteroid(this.mainFieldElement);
				this.asteroids.splice(i, 1);
				break;
			}
		}
	}
	displayPage() {
		this.battleFieldElement.querySelector('.locationName').innerHTML = 'Пояс астероидов №' + this.page;
	}
}

