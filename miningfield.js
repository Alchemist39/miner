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
			<div class="mainField"></div>
		`);

		this.battleFieldElement = createDiv('battleField', this.template({
			page: this.page,
			//создаем свойства-ограничители для отображения/скрытия ссылок в темплейте
			canGoBack: this.page >= 2,
			canGoForward: this.page < 10
		}));
		this.mainFieldElement = this.battleFieldElement.querySelector('.mainField');
		//обходим массив астероидов
		for (var i = 1; i < 10; i++) {
			//записываем каждый новый астероид в массив
			//у каждого нового астероида новый ID
			this.asteroids.push(new Asteroid(this.randomValue(), this.mainFieldElement, this));
		}
		// 10 / 60 сек. раз в 6 сек
		this.scaningSpeed = (60 / miningPage.playerShip.scanRate) * 1000;
		setInterval(function(){
		//если астероидов меньше targetQuantity, спауним новый астероид раз в this.scaningSpeed сек.
		//и записываем его в массив
			if(this.asteroids.length < miningPage.playerShip.targetQuantity){
				this.asteroids.push(new Asteroid(this.randomValue(), this.mainFieldElement, this));
			}
		}.bind(this), this.scaningSpeed)

		this.displayPage();
	}

	randomValue() {
		return 5 * getRandomInt(1, 20) * this.page;
	}
	//TODO создать метод создания астероида при удалении одного из астероидов
	// астероид == this в классе астероидов
	onKill(asteroid) {
		// добавляем руду в карго по объему астероида
		// обходим массив астероидов циклом
		for(let i = 0; i < this.asteroids.length; i++){
			//если ID астероида номер i в массиве совпадает с ID астерода, который мы добываем
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

