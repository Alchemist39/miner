'use strict'
		// создаем класс кошелька
		// создаем конструктор в классе с аргументом экземпляра класса game
		// создаем ссылку this.game на экземпляр класса Game
class Wallet {
	constructor(station) {
		this.station = station;

		// с помощью хелпера создаем элемент кошелька
		this.walletElement = createDiv(
			'wallet',
			this.getMoney() + ' Золото'
		);
	}

	// возвращает число денег из хранилища или ноль, если игра запущена впервые
	getMoney() {
		return parseInt(localStorage.getItem('money')) || 0;
	};

	// сохраняет в хранилище переданное значение и выводит их на экран
	setMoney(amount) {
		localStorage.setItem('money', amount);
	};

	// метод добавления денег в кошелек
	// добавляет деньги в хранилище
	// одна формула, разбитая на два куска для простоты восприятия
	addMoney(value) {
		var newValue = this.getMoney() + value;
		this.setMoney(newValue);
	};

	// метод расхода денег из кошелька
	// тратит деньги из хранилища
	// если денег не хватает, выводит ошибку
	// если денег хватает, уменьшает количество денег в хранилище и сохраняет новое значение
	spendMoney(value) {
		if(this.getMoney() < value) {
			throw new Error("Недостаточно золота!");
		} else {
			var newValue = this.getMoney() - value;
			this.setMoney(newValue);
		}
	};
	show(parentElement) {
		parentElement.appendChild(this.walletElement);
	}
	// выводим количество денег на экран
	displayMoney() {
		this.walletElement.innerHTML = this.getMoney() + ' Золото';
	}
}