'use strict';

class Inventory {
	constructor(parentElement, field) {
		this.parentElement = parentElement;
		this.field = field;
		this.inventoryContainerElement = createAndAppend(
			this.parentElement,
			'div', 
			'inventoryContainer',
			''
		);

		for(var i = 0; i < 48; i++){
			this.inventorySlotElement = createAndAppend(
				this.inventoryContainerElement, 
				'div', 
				'inventorySlot',
				''
			);
			//this.inventorySlotElement.className += " id" + i;
		}
		this.slot = document.getElementsByClassName('inventorySlot')[0];
	}

	inventoryAppear() {
		if (this.inventoryContainerElement.style.left == '-100%') {
			this.inventoryContainerElement.style.left = '0%';
		} else {
			this.inventoryContainerElement.style.left = '-100%';
		}
	}
	addToInventory(name) {
		this.clearInventorySlot();
		this.slot.className += name;
	}
	clearInventorySlot() {
		this.slot.className = 'inventorySlot';
	}
}