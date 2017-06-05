'use strict'

var createAndAppend = function (parentElement, tag, className, text) {
	var element = document.createElement(tag);
	element.className = className;
	element.innerHTML = text;
	parentElement.appendChild(element);
	return element;
};
//TODO сделать хелпер чисто создания дива
var createDiv = function(className, text = "") {
	var element = document.createElement('div');
	element.className = className;
	element.innerHTML = text;
	return element;
};

var getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};


let pushUrl = function(href, title = '', state = null) {
	history.pushState(state, title, href);
	window.dispatchEvent(new Event('popstate'));
};

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


var stationExist = document.getElementsByClassName('station')[0];
var marketExist = document.getElementsByClassName('shipmarket')[0];
var miningFieldPageExist = document.getElementsByClassName('miningField')[0];
var mapExist = document.getElementsByClassName('map')[0];