'use strict'
var button = document.getElementsByClassName('starMap')[0];
var map = document.getElementsByClassName('map')[0];
var close = document.getElementsByClassName('closeMap')[0];


button.onclick = function() {
	map.style.visibility = 'visible';
}


close.onclick = function() {
	map.style.visibility = 'hidden';
}