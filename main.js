'use strict'
var button = document.getElementsByClassName('starMap')[0];
var map = document.getElementsByClassName('map')[0];
var close = document.getElementsByClassName('closeMap')[0];
var inventoryButton = document.getElementsByClassName('inventory')[0];
var inventory = document.getElementsByClassName('inventoryContainer')[0];


button.onclick = function() {
	map.style.visibility = 'visible';
}

close.onclick = function() {
	map.style.visibility = 'hidden';
}

inventoryButton.onclick = function() {
	if (inventory.style.display == 'flex') {
		inventory.style.display = 'none';
	} else {
		inventory.style.display = 'flex';
	}
}
/*
inventoryButton.onclick = function() {

}*/