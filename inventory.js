'use strict';

class Inventory {
	constructor(parentElement, field) {
		this.parentElement = parentElement;
		this.field = field;
		//все контейнеры храним в массиве
		this.containers = [];
		//темплейт создания слотов
		
			//разобраться с синтаксисом
		this.template = Handlebars.compile(`
			{{#each containers as |container slot|}}
				<div class="inventorySlot {{container}}"></div>
			{{/each}}
		`);

		//создаем циклом слоты
		//в 50% случаев добавляем класс 'ore'
		for(var i = 0; i < 48; i++){
			if(Math.random() > 0.5) {
				this.containers.push('ore');
			} else {
				this.containers.push('');
			}
		}

		this.inventoryContainerElement = createAndAppend(
			this.parentElement,
			'div', 
			'inventoryContainer',
			//разобраться с синтаксисом
			this.template({containers: this.containers})
		);
	}

	inventoryAppear() {
		if (this.inventoryContainerElement.style.left == '-100%') {
			this.inventoryContainerElement.style.left = '0%';
		} else {
			this.inventoryContainerElement.style.left = '-100%';
		}
	}
}