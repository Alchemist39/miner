'use strict'

var createAndAppend = function (parentElement, tag, className, text) {
	var element = document.createElement(tag);
	element.className = className;
	element.innerHTML = text;
	parentElement.appendChild(element);
	return element;
}



