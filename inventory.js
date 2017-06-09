'use strict';

class Inventory {
	constructor(parentElement) {
		this.parentElement = parentElement;
		//все контейнеры храним в массиве
		this.containers = [];
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
		for(var i = 0; i < 48; i++){
			this.containers.push({});
		}
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
	remomveInventory() {
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
			this.remomveInventory();
			this.createInventory();
		}
	}
	removeOreFromInventory() {
		if(this.containers[0].class == 'ore') {
			this.containers[0] = {
				class: '',
				title: ''
			}
			this.remomveInventory();
			this.createInventory();
		}
	}
}