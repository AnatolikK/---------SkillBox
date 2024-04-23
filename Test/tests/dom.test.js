const { createPaymentForm } = require('../src/main'); // Подставьте путь к вашей функции создания DOM-дерева

describe('DOM creation', () => {
  test('Should create four input fields', () => {
    const form = createPaymentForm();
    expect(form.querySelectorAll('input')).toHaveLength(4);
  });
});
