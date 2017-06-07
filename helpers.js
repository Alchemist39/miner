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
