'use strict';
console.log('inventory');
var inventoryId = 1;

class Inventory {
	constructor(parentElement, slotCount = 48) {
		this.parentElement = parentElement;
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
			{{#each containers as |container slot|}}
				<div class="inventorySlot">
					{{#if container}}
						{{{container.html}}}
					{{/if}}
				</div>
			{{/each}}
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
		this.reloadInventory();	
		
		
	}
	// удаляем из ячейки предмет с именем item
	removeFromInventory(itemName) {
		if(this.itemToContainers[itemName] === undefined) {
			return;
		}
		this.containers[this.itemToContainers[itemName]] = null;
		delete this.itemToContainers[itemName];

		this.reloadInventory();
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
		let self = this;

		this.inventoryContainerElement = createDiv(
			'inventoryContainer',
			// в темплейт передаем объект со свойством контейнерс, который равен нашему массиву
			this.template({containers: this.containers})
		);
		this.inventoryContainerElement.setAttribute('id', this.id);
		this.inventorySlots = this.inventoryContainerElement.querySelectorAll('.inventorySlot');
		this.filledInventorySlots = this.inventoryContainerElement.querySelectorAll('.inventorySlot div');

		// создаем переменную, в которую в дальнейшем передаем отправную точку (див) для драга
		var dragged;
		// slots = массив дивов в инвентаре
		// обходим массив, при драгстарте создаем объект с трансферной информацией
		var innerSlots = this.inventoryContainerElement.querySelectorAll('.inventorySlot div');
		for(let slot of innerSlots) {
			slot.addEventListener('dragstart', function(e) {
				// сохраняем исходную точку (див) в ранее созданную вне функций переменную
				// если не сохранить ее тут, то при вызове дропа e.target будет равен цели дропа
				dragged = e.currentTarget;
				// сохраняем Id текущего инвентаря в дататрансфер
				e.dataTransfer.setData("inventoryId", this.inventoryContainerElement.id);
			}.bind(this));
		}
		// создаем массив, который хранит все родительские дивы слотов
		// обходим массив, предотвращаем действия по умолчанию

		// при дропе отлавливаем событие

		// если конечная ячейка содержит какой-то предмет
		var slots = this.inventoryContainerElement.querySelectorAll('.inventorySlot');
		for(let slot of slots) {
			slot.addEventListener('dragover', function(e) {
				e.preventDefault();
			});

			slot.addEventListener('drop', function(e) {
				// получаем Id инвентаря из которого перемещаем предмет
				// сравниваем Id исходного инвентаря и Id конечного инвентаря
				// если они не совпадают, то перенос не происходит
				var inventoryID = e.dataTransfer.getData("inventoryId");
				if(inventoryID != self.inventoryContainerElement.id) {
					return;
				}
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
		this.appendInventory(this.parentElement);
	}

	inventoryAppear() {
		if (this.inventoryHidden) {
			this.inventoryContainerElement.style.left = '0%';
			this.inventoryHidden = false;
		} else {
			this.inventoryContainerElement.style.left = '-100%';
			this.inventoryHidden = true;
		}
	}
	reloadInventory() {
		this.removeInventory();
		this.createInventory();
		if (!this.inventoryHidden) {
			this.inventoryContainerElement.style.left = '0%';
		} else {
			this.inventoryContainerElement.style.left = '-100%';
		}
	}

	removeInventory() {
		this.parentElement.removeChild(this.inventoryContainerElement);
	}
	appendInventory(element) {
		if(element) {
			element.appendChild(this.inventoryContainerElement);
		}
	}

}