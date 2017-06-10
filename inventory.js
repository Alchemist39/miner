'use strict';

class Inventory {
	constructor(parentElement, slots = 48) {
		this.parentElement = parentElement;
		//все контейнеры храним в массиве
		this.containers = [];
		this.slots = slots;
		//темплейт создания слотов
		
			//разобраться с синтаксисом
		// массив контейнеров, каждый контейнер
		// в класс передаем свойство объекта из массива
		this.template = Handlebars.compile(`
			{{#each containers as |container slot|}}
				<div class="inventorySlot {{container.class}}" title="{{container.title}}"></div>
			{{/each}}
		`);

		//создаем циклом слоты
		for(var i = 0; i < this.slots; i++){
			this.containers.push({});
		}
		this.createInventory();
	}
	setUpgrades() {
		this.containers[0] = {class: 'cruiser', title: 'Усиление лазеров'};
		this.containers[1] = {class: 'carrier', title: 'Расширение сканера'};
		this.containers[2] = {class: 'truck', title: 'Ускорение сканера'};
		this.removeInventory();
		this.createInventory();
	}
	createInventory() {
		this.inventoryContainerElement = createAndAppend(
			this.parentElement,
			'div', 
			'inventoryContainer',
			//разобраться с синтаксисом
			// в темплейт передаем объект со свойством контейнерс, который равен нашему массиву
			this.template({containers: this.containers})
		);
	}
	removeInventory() {
		this.parentElement.removeChild(this.inventoryContainerElement);
	}

	appendInventory() {
		this.parentElement.appendChild(this.inventoryContainerElement);
	}

	inventoryAppear() {
		if (this.inventoryContainerElement.style.left == '-100%') {
			this.inventoryContainerElement.style.left = '0%';
		} else {
			this.inventoryContainerElement.style.left = '-100%';
		}
	}
	addOreToinventory() {
		if(!this.containers[0].class) {
			this.containers[0] = {
				class: 'ore',
				title: "Руда" + " " + miningPage.getOreStorage()
			};

			this.removeInventory();
			this.createInventory();
		} else if(this.containers[0].class = 'ore') {
			this.containers[0] = {
				class: 'ore',
				title: "Руда" + " " + miningPage.getOreStorage()
			};

			this.removeInventory();
			this.createInventory();
		}
	}
	removeOreFromInventory() {
		if(this.containers[0].class == 'ore') {
			this.containers[0] = {
				class: '',
				title: ''
			}
			this.removeInventory();
			this.createInventory();
		}
	}
}