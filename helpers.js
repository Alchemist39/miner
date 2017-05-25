'use strict'

var createAndAppend = function (parentElement, tag, className, text) {
	var element = document.createElement(tag);
	element.className = className;
	element.innerHTML = text;
	parentElement.appendChild(element);
	return element;
};


var getRandomInt = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

