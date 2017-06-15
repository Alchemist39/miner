'use strict';

class Inventory {
	constructor(parentElement, slots = 48) {
		this.parentElement = parentElement;
		//все контейнеры храним в массиве
		this.containers = [];
		this.slots = slots;
		//темплейт создания слотов
		
		// массив контейнеров, каждый контейнер
		// в класс передаем свойство объекта из массива
		this.template = Handlebars.compile(`
			{{#each containers as |container slot|}}
				<div class="inventorySlot">
					{{#if container.class}}
						<div class="{{container.class}}" draggable="true" title="{{container.title}}"></div>
					{{/if}}
				</div>
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
	loadInventory() {
		if( parseInt(localStorage.getItem('oreAtStorage')) > 0) {
			this.containers[0] = {
				class: 'ore',
				title: "Руда" + " " + parseInt(localStorage.getItem('oreAtStorage'))
			};
			
			this.removeInventory();
			this.createInventory();
		}
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

		// создаем переменную, в которую в дальнейшем передаем отправную точку (див) для драга
		var dragged;
		// slots = массив дивов в инвентаре
		// обходим массив, при драгстарте создаем объект с трансферной информацией
		var innerSlots = this.inventoryContainerElement.querySelectorAll('.inventorySlot div');
		for(let i = 0; i < innerSlots.length; i++) {
			innerSlots[i].addEventListener('dragstart', function(e) {
				// сохраняем исходную точку (див) в ранее созданную вне функций переменную
				// если не сохранить ее тут, то при вызове дропа e.target будет равен цели дропа
				dragged = e.target;
			}.bind(this));
		}
		// создаем массив, который хранит все родительские дивы слотов
		// обходим массив, предотвращаем действия по умолчанию

		// при дропе отлавливаем событие

		// если конечная ячейка содержит какой-то предмет
		var slots = this.inventoryContainerElement.querySelectorAll('.inventorySlot');
		for(let i = 0; i < slots.length; i++) {
			slots[i].addEventListener('dragover', function(e) {
				e.preventDefault();
			});

			slots[i].addEventListener('drop', function(e) {
				e.preventDefault();
				// родитель элемента в исходной точке
				var draggedParent = dragged.parentNode;
				// див, уже находящийся в точке назначения
				var destinationContent = e.currentTarget.firstElementChild;
				// если конечная ячейка пустая, 
				// то отцепляем див от исходной ячейки 
				// и цепляем к конечной ячейке
				if(e.currentTarget.childElementCount == 0) {
					draggedParent.removeChild(dragged);
					e.target.appendChild(dragged);
				} else if(e.currentTarget.childElementCount == 1) {
					// в точке назначения заменяем новым (dragged) дивом старый (dest.Cont) див.
					e.currentTarget.replaceChild(dragged, destinationContent);
					// в исходной точке, а точнее к родителю элемента в исходной точке 
					// аппендим старый див (который был в точке назначения до замены)
					draggedParent.appendChild(destinationContent);
				}
			});
		}
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
		if(!this.containers[0].class || this.containers[0].class == 'ore') {
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