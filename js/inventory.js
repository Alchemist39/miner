'use strict';
var inventoryId = 1;

class Inventory {
	constructor(parentElement, slots = 48) {
		this.parentElement = parentElement;
		//все контейнеры храним в массиве
		this.containers = [];
		this.itemToContainers = {};
		this.nextEmptyContainer = 0;

		//this.containers[this.itemToContainers['metall']]

		this.slots = slots;
		this.id = inventoryId++;
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
	

	createInventory() {
		let self = this;

		this.inventoryContainerElement = createAndAppend(
			this.parentElement,
			'div', 
			'inventoryContainer',
			//разобраться с синтаксисом
			// в темплейт передаем объект со свойством контейнерс, который равен нашему массиву
			this.template({containers: this.containers})
		);
		this.inventoryContainerElement.setAttribute('id', this.id);

		// создаем переменную, в которую в дальнейшем передаем отправную точку (див) для драга
		var dragged;
		// slots = массив дивов в инвентаре
		// обходим массив, при драгстарте создаем объект с трансферной информацией
		var innerSlots = this.inventoryContainerElement.querySelectorAll('.inventorySlot div');
		for(let i = 0; i < innerSlots.length; i++) {
			innerSlots[i].addEventListener('dragstart', function(e) {
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
		for(let i = 0; i < slots.length; i++) {
			slots[i].addEventListener('dragover', function(e) {
				e.preventDefault();
			});

			slots[i].addEventListener('drop', function(e) {
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
	}

	removeInventory() {
		this.parentElement.removeChild(this.inventoryContainerElement);
	}
	appendInventory() {
		this.parentElement.appendChild(this.inventoryContainerElement);
	}

	moveToStorage(item, count) {
		localStorage.setItem(item + 'AtStorage', count);
	}
	getFromStorage(item) {
		return parseInt( localStorage.getItem(item + 'AtStorage') ) || 0;
	}


	runRefining() {
		if( this.getFromStorage('ore') <= 0 ) {
			return;
		}
		// [10, 25, 35, 30];
		let totalVolumeOre = this.getFromStorage('ore');
		this.diamonds = totalVolumeOre * 0.1;
		this.moveToStorage('diamonds', this.diamonds);
		this.metall = totalVolumeOre * 0.35;
		this.moveToStorage('metall', this.metall);
		this.gas = totalVolumeOre * 0.25;
		this.moveToStorage('gas', this.gas);
		this.moveToStorage('ore', 0);
		this.addRefinedMaterialsToInventory();
	}

	loadInventory() {
		if( parseInt(localStorage.getItem('oreAtStorage')) > 0) {
			this.containers[0] = {
				class: 'ore',
				title: "Руда" + " " + this.getFromStorage('ore')
			};
			
			this.removeInventory();
			this.createInventory();
		}
	}

	inventoryAppear() {
		if (this.inventoryContainerElement.style.left == '-100%') {
			this.inventoryContainerElement.style.left = '0%';
		} else {
			this.inventoryContainerElement.style.left = '-100%';
		}
	}
	reloadInventory() {
		this.removeInventory();
		this.createInventory();
	}

	addOreToinventory() {
		if(!this.containers[0].class || this.containers[0].class == 'ore') {
			this.containers[0] = {
				class: 'ore',
				title: "Руда" + " " + this.getFromStorage('ore')
			};

			this.reloadInventory();
		}
	}
	removeOreFromInventory() {
		if(this.containers[0].class == 'ore') {
			this.containers[0] = {
				class: '',
				title: ''
			}
			
			this.reloadInventory();
		}
	}
	addMetallToinventory() {
		if(!this.containers[1].class || this.containers[1].class == 'metall') {
			this.containers[1] = {
				class: 'metall',
				title: "Металл" + " " + this.getFromStorage('metall')
			};

			this.reloadInventory();
		}
	}
	removeMetallFromInventory() {
		if(this.containers[1].class == 'metall') {
			this.containers[1] = {
				class: '',
				title: ''
			}

			this.reloadInventory();
		}
	}
	addGasToinventory() {
		if(!this.containers[2].class || this.containers[2].class == 'gas') {
			this.containers[2] = {
				class: 'gas',
				title: "Газ" + " " + this.getFromStorage('gas')
			};

			this.reloadInventory();
		}
	}
	removeGasFromInventory() {
		if(this.containers[2].class == 'gas') {
			this.containers[2] = {
				class: '',
				title: ''
			}

			this.reloadInventory();
		}
	}
	addDiamondsToinventory() {
		if(!this.containers[3].class || this.containers[3].class == 'diamonds') {
			this.containers[3] = {
				class: 'diamonds',
				title: "Бриллианты" + " " + this.getFromStorage('diamonds')
			};

			this.reloadInventory();
		}
	}
	removeDiamondsFromInventory() {
		if(this.containers[3].class == 'diamonds') {
			this.containers[3] = {
				class: '',
				title: ''
			}

			this.reloadInventory();
		}
	}
	addRefinedMaterialsToInventory() {
		this.removeOreFromInventory();
		this.addGasToinventory();
		this.addDiamondsToinventory();
		this.addMetallToinventory();
		this.reloadInventory();
		this.inventoryContainerElement.style.left = '0%';
	}
}