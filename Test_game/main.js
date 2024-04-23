class Card {
    constructor(container, cardNumber, flip) {
       this.container = container;
       this._cardNumber = cardNumber;
       this._open = false;
       this._success = false;
       this.flipCallback = flip;
       this.element = this.createElement();
    }
 
    createElement() {
       const card = document.createElement('div');
       card.textContent = this.cardNumber;
       card.classList.add('card');
       card.addEventListener('click', () => {
          this.flip();
       });
       this.container.appendChild(card);
       return card;
    }
 
    set cardNumber(value) {
       this._cardNumber = value;
       if (this.element) {
          this.element.textContent = value;
       }
    }
 
    get cardNumber() {
       return this._cardNumber;
    }
 
    set open(value) {
       this._open = value;
    }
 
    get open() {
       return this._open;
    }
 
    set success(value) {
       this._success = value;
       if (value) {
          this.element.classList.add('success');
       } else {
          this.element.classList.remove('success');
       }
    }
 
    get success() {
       return this._success;
    }
 
    flip() {
       if (!this.open && !this.success && typeof this.flipCallback === 'function') {
          this.flipCallback(this);
       }
    }
 }
 
 class AmazingCard extends Card {
    createElement() {
       const card = document.createElement('div');
       card.classList.add('card');
       card.textContent = this.getCardSymbol(this.cardNumber);
       card.addEventListener('click', () => {
          this.flip();
       });
       this.container.appendChild(card);
       return card;
    }
 
    getCardSymbol(cardNumber) {
       const cardsSymbolsArray = ['🍎', '🍌', '🍒', '🍓', '🍊', '🍇']; // Пример символов для карт
       return cardsSymbolsArray[cardNumber] || '?'; // Если номер карты выходит за пределы массива, возвращаем '?'
    }
 }
 
 class Game {
    constructor(container, cardCount) {
       this.container = container;
       this.cardCount = cardCount;
       this.cards = [];
       this.createCards();
       this.shuffleCards();
       this.renderCards();
    }
 
    createCards() {
        const uniqueNumbers = [];
        while (uniqueNumbers.length < this.cardCount / 2) {
           const randomNumber = Math.floor(Math.random() * 6); // 6 - количество уникальных символов (фруктов)
           if (!uniqueNumbers.includes(randomNumber)) {
              uniqueNumbers.push(randomNumber);
           }
        }
     
        const shuffledNumbers = [...uniqueNumbers, ...uniqueNumbers].sort(() => Math.random() - 0.5);
     
        for (const number of shuffledNumbers) {
           this.cards.push(new AmazingCard(this.container, number)); // Передаем контейнер при создании карточки
        }
     }
     
     
     
     
     
 
    shuffleCards() {
       for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
       }
    }
 
    renderCards() {
        this.cards.forEach(card => {
           this.container.appendChild(card.element);
        });
     }
     
 
    checkForSuccess() {
       const openCards = this.cards.filter(card => card.open && !card.success);
       if (openCards.length === 2) {
          const [card1, card2] = openCards;
          if (card1.cardNumber === card2.cardNumber) {
             card1.success = true;
             card2.success = true;
          } else {
             setTimeout(() => {
                card1.open = false;
                card2.open = false;
             }, 1000); // Задержка перед закрытием непарных карт
          }
       }
    }
 
    checkForWin() {
       return this.cards.every(card => card.success);
    }
 
    startGame() {
       this.container.addEventListener('click', () => {
          this.checkForSuccess();
          if (this.checkForWin()) {
             alert('Поздравляем! Вы выиграли!');
          }
       });
    }
 }
 
 const gameContainer = document.getElementById('game');
 const game = new Game(gameContainer, 12); // Количество карт (должно быть чётным числом)
 game.startGame();
 