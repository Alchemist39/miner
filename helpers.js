'use strict'
//создание и прикрепление дива (и не только дива)
var createAndAppend = function (parentElement, tag, className, text) {
	var element = document.createElement(tag);
	element.className = className;
	element.innerHTML = text;
	parentElement.appendChild(element);
	return element;
};
// хелпер чисто создания дива
var createDiv = function(className, text = "") {
	var element = document.createElement('div');
	element.className = className;
	element.innerHTML = text;
	return element;
};
//рандом число от и до
var getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

//изменение УРЛа
let pushUrl = function(href, title = '', state = null) {
	history.pushState(state, title, href);
	window.dispatchEvent(new Event('popstate'));
};
//хелпер калькуляции для темплейтов
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
	lvalue = parseFloat(lvalue);
	rvalue = parseFloat(rvalue);
		
	return {
		"+": lvalue + rvalue,
		"-": lvalue - rvalue,
		"*": lvalue * rvalue,
		"/": lvalue / rvalue,
		"%": lvalue % rvalue
	}[operator];
});

//хелпер создания таймера обратного отсчета
//аргументы: длительность отсчета, частота отсчета, действие на тик, действие по окончании,
// быстрый старт
// в аргументах длительность задаем в секундах, поэтому домножаем ее на тысячу милисекунд
// устанавливаем интервал с аргументом - функция и заданной частотой (frequency)
// при быстром старте от длительности отнимаем величину задержки от частоты 
class Timer {
	constructor({duration = 10, frequency = 1000, onTick, onEnd, instantStart = true}) {
		this.onTick = onTick;
		this.onEnd = onEnd;
		this.duration = duration * 1000;
		this.startTime = Date.now();
		this.interval = setInterval(this.action.bind(this), frequency);

		if(instantStart) {
			this.duration -= frequency;
			this.action();
		}
	}
	//в переменную сохраняем текущее время
	//проверяем что текущее время меньше, чем врея начала + длительность
	//выполняем функцию onTick если она существует
	//иначе (по истечение интервала) очищаем интервал и вызываем функцию onEnd, если она есть
	action() {
		this.currentTime = Date.now();
		if( this.currentTime < (this.startTime + this.duration) ) {
			if(this.onTick) {
				this.onTick(this);
			}
			//this.onTick && this.onTick(this);
		} else {
			clearInterval(this.interval);
			if(this.onEnd) {
				this.onEnd();
			}
		}
	}

	//сохраняем хелпер отображения минут и секунд в формате 00:00
	getFormatedLeftTime() {
		let milisecondsLeft = (this.startTime + this.duration) - this.currentTime;
		let secondsLeft = Math.round(milisecondsLeft / 1000);

		let minutes = Math.floor(secondsLeft / 60);
		let seconds = Math.round(secondsLeft % 60);
		return {
			minutes: minutes < 10 ? '0' + minutes : minutes,
			seconds: seconds < 10 ? '0' + seconds : seconds
		};
	}
}


//почитать про promises