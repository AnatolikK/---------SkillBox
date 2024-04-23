describe('Игра в пары', () => {
    beforeEach(() => {
      cy.visit('index.html'); // Замените на соответствующий URL вашего проекта
    });
  
    it('Начальное состояние: поле четыре на четыре клетки, цифры невидимы', () => {
      cy.get('.game-container')
        .children()
        .should('have.length', 16)
        .each($card => {
          cy.wrap($card).should('not.be.visible');
        });
    });
  
    it('Нажатие на одну карточку: она остается открытой', () => {
      cy.get('.game-container')
        .find('.card')
        .first()
        .click()
        .should('have.class', 'open');
    });
  
    it('Проверка на наличие пары карточек', () => {
      cy.get('.game-container')
        .find('.card')
        .then($cards => {
          const firstCard = $cards.get(0).textContent.trim();
          const secondCard = $cards.get(1).textContent.trim();
          if (firstCard !== secondCard) {
            cy.wrap($cards.get(0)).click();
            cy.wrap($cards.get(1)).click();
            cy.get('.game-container').find('.open').should('have.length', 0);
          } else {
            cy.log('Первая и вторая карточки совпали');
          }
        });
    });
  
    it('Проверка на открытие пары карточек', () => {
      cy.get('.game-container')
        .find('.card')
        .then($cards => {
          const firstCard = $cards.get(0).textContent.trim();
          const secondCard = $cards.get(4).textContent.trim();
          if (firstCard === secondCard) {
            cy.wrap($cards.get(0)).click();
            cy.wrap($cards.get(4)).click();
            cy.get('.game-container').find('.open').should('have.length', 2);
          } else {
            cy.log('Первая и вторая карточки не совпали');
          }
        });
    });
  });
  