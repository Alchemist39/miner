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
	constructor({duration = 10, frequency = 1000, instantStart = true}) {
		this.instantStart = instantStart;
		this.duration = duration * 1000;
		this.functionArray = [];
		this.startTime = Date.now();
		this.interval = setInterval(this.action.bind(this), frequency);

		// стрелочная функция сразу передает контекст, избавляя от использования self = this
		// и дальнейшего использования self вместо this внутри функции
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});

		if(instantStart) {
			this.duration -= frequency;
			this.action();
		}
	}
	// в переменную сохраняем текущее время
	// проверяем что текущее время меньше, чем время начала + длительность
	// обходим массив с функциями, выполняем каждую функцию в текущем контексте
	// иначе (по истечение интервала) очищаем интервал и вызываем промис онрезолв
	action() {
		this.currentTime = Date.now();
		if( this.currentTime < (this.startTime + this.duration) ) {
			for(let i = 0; i < this.functionArray.length; i++) {
				this.functionArray[i](this);
			}
		} else {
			clearInterval(this.interval);
			this.resolve();
		}
	}
	// добавляем новую функцию в массив, при инстант старте еще и сразу вызываем это функцию
	onTick(func) {
		this.functionArray.push(func);
		if(this.instantStart) {
			func(this);
		}
	}

	//сохраняем хелпер отображения минут и секунд в формате 00:00
	getFormatedLeftTime() {
		let milisecondsLeft = (this.startTime + this.duration) - this.currentTime;
		let secondsLeft = Math.round(milisecondsLeft / 1000);
	// к минутам применяется округление до Floor т.к. при round минуты не перещелкиваются как надо 
	// к секундам округление идет до ближайшего целого, иначе секунды могут пропускаться
	// т.к. не всегда тик происходит на круглом значении милисекунд (998, 1000, 1002)
		let minutes = Math.floor(secondsLeft / 60);
		let seconds = Math.round(secondsLeft % 60);
		return {
			minutes: minutes < 10 ? '0' + minutes : minutes,
			seconds: seconds < 10 ? '0' + seconds : seconds
		};
	}
}
// функция для отсрочки выполнения кода и обновления таймера если функция вызвана повторно до выполнения
function debounce(func, delay) {
	let timeout;
		return function(...args) {
			clearTimeout(timeout);
			timeout = setTimeout(function() {
			timeout = null;
			func.apply(this, args);
		}.bind(this), delay);
	}
}

//почитать про promises