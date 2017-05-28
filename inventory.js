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

		this.inventorySlot = function() {
			
		}

	}

	inventoryAppear() {
		if (this.inventoryContainerElement.style.left == '-100%') {
			this.inventoryContainerElement.style.left = '0%';
			console.log(this.isEmptySlot());
		} else {
			this.inventoryContainerElement.style.left = '-100%';
		}
	}
	addToInventory() {
		this.inventorySlotElement.className += 'ore';
	}
	isEmptySlot() {
		if(this.inventorySlotElement.className == 'inventorySlot') {
			return true;
		} else {
			return false;
		}
	}
}