const { validateCardNumber, validateCVC } = require('../src/main'); // Подставьте путь к вашим функциям валидации

describe('Card number validation', () => {
  test('Should pass valid card number', () => {
    expect(validateCardNumber('4111111111111111')).toBeTruthy();
  });

  test('Should fail with non-numeric characters', () => {
    expect(validateCardNumber('4111-1111-1111-1111')).toBeFalsy();
  });

  // Другие тесты для валидации номера карты
});

describe('CVC validation', () => {
  test('Should pass with three digits', () => {
    expect(validateCVC('123')).toBeTruthy();
  });

  // Другие тесты для валидации CVC
});
