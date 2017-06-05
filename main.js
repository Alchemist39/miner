'use strict';
var game = {

};


game.station = new Station();
var shipmarket = new ShipMarket();
var miningPage = new MiningfieldPage();
// див карты
var map = new Map(game.station);
var playerShip = new PlayerShip();

game.station.map = map;
game.station.shipmarket = shipmarket;
miningPage.map = map;

shipmarket.station = game.station;

let miningField = new Miningfield(miningPage.miningFieldElement);
miningPage.miningFields[miningField.id] = miningField;

var clear = function() {
	document.querySelector('.container').innerHTML = '';
};

crossroads.addRoute('/station', function(){
	clear();
	game.station.showStation();
});

crossroads.addRoute('/market', function(){
	clear();
	shipmarket.showMarket();
});

crossroads.addRoute('/field/{page}', function(page){
	clear();
	miningPage.showMiningFieldPage(page);
});

window.addEventListener('popstate', function() {
	crossroads.parse(window.location.pathname);
});

document.body.addEventListener('click', function(e){
	if(e.target.nodeName == 'A'){
		e.preventDefault();

		pushUrl(e.target.pathname);
	}
})
//предотвращать действие по ссылке
//

window.dispatchEvent(new Event('popstate'));