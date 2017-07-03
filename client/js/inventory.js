'use strict';
console.log('inventory');
var inventoryId = 1;

class Inventory {
	constructor(slotCount = 48) {
		this.slotCount = slotCount;
		this.id = inventoryId++;
		this.inventoryHidden = true;
		this.nextEmptyContainer = 0;
		//все контейнеры храним в массиве
		this.containers = [];
		//создаем циклом слоты, в массив контейнеров помещаем пустые объекты
		for( ; this.containers.length < this.slotCount; ){
			this.containers.push(null);
		}
		this.itemToContainers = {};
		//темплейт создания слотов
		// массив контейнеров, каждый контейнер
		// в класс передаем свойство объекта из массива
		this.template = Handlebars.compile(`
			<div class="inventoryContainer" id="inventoryContainer-${this.id}">
				{{#each containers as |container slot|}}
					<div class="inventorySlot">
						{{#if container}}
							{{{container.html}}}
						{{/if}}
					</div>
				{{/each}}
			</div>
		`);
		this.createInventory();
	}
	addToInventory(item) {
		let key = this.itemToContainers[item.name];
		if(key !== undefined) {
			this.containers[key].amount += item.amount;
		} else {
			key = this.findEmptySlot();
			this.itemToContainers[item.name] = key;
			this.containers[key] = item;
		}

		if(this.containers[key].amount <= 0) {
			this.removeFromInventory(name);
		}
		this.reload();
	}
	html() {
		return this.template({
			containers: this.containers
		});
	}
	// удаляем из ячейки предмет с именем item
	removeFromInventory(itemName) {
		if(this.itemToContainers[itemName] === undefined) {
			return;
		}
		this.containers[this.itemToContainers[itemName]] = null;
		delete this.itemToContainers[itemName];

		this.reload();
	}
	// функция возвращает номер ячейки
	findEmptySlot() {
		for(let i in this.containers) {
			if(!this.containers[i]) {
				return i;
			}
		}
		return false;
	}

	runRefining() {
		let ore = this.containers[this.itemToContainers['ore']];
		if(!ore || ore.amount <= 0) {
			return;
		}
		// [10, 25, 35, 30];
		this.addToInventory(new Diamonds(ore.amount * 0.1));
		this.addToInventory(new Metall(ore.amount * 0.35));
		this.addToInventory(new Gas(ore.amount * 0.25));
		this.removeFromInventory('ore');
	}

	createInventory() {
		// создаем переменную, в которую в дальнейшем передаем отправную точку (див) для драга
		var dragged;

		document.body.addEventListener('dragstart', function(e) {
			if(e.target.parentNode.parentNode.getAttribute('id') != ('inventoryContainer-' + this.id) ||
				e.target.parentNode.parentNode.getAttribute('id') == null) {
				dragged = null;
				return;
			} else {
				dragged = e.target;
			}
		}.bind(this));
		
		document.body.addEventListener('dragover', function(e) {
			e.preventDefault();
		}.bind(this));

		document.body.addEventListener('drop', function(e) {
			e.preventDefault();
			if(e.target.parentNode.getAttribute('id') != ('inventoryContainer-' + this.id) ) {
				return;
			}
			var draggedParent = dragged.parentNode;
			var destinationContent = e.target.childNodes[0];
			
			if(e.target.childElementCount == 0) {
				draggedParent.removeChild(dragged);
				e.target.appendChild(dragged);
				dragged = null;
			} else {
				e.target.replaceChild(dragged, destinationContent);
				draggedParent.appendChild(destinationContent);
				dragged = null;
			}
		}.bind(this));
	}

	inventoryAppear() {
		if (this.inventoryHidden) {
			document.body.querySelector('.inventoryContainer').style.left = '0%';
			this.inventoryHidden = false;
		} else {
			document.body.querySelector('.inventoryContainer').style.left = '-100%';
			this.inventoryHidden = true;
		}
	}
	reload() {
		game.station.renderStation();
		if (!this.inventoryHidden) {
			document.body.querySelector('.inventoryContainer').style.left = '0%';
		} else {
			document.body.querySelector('.inventoryContainer').style.left = '-100%';
		}
	}
}