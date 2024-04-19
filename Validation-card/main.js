document.addEventListener('DOMContentLoaded', function () {
    const cardNumberInput = document.getElementById('card-number');
    const cardLogo = document.getElementById('card-logo');
    const expiryDateInput = document.getElementById('expiry-date');
    const cvcInput = document.getElementById('cvc');
    const emailInput = document.getElementById('email');
    const payButton = document.getElementById('pay-button');
  
    // Функция для форматирования номера карты с пробелами
    function formatCardNumber(value) {
      return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    }
  
    // Функция для форматирования даты окончания с автоматической вставкой разделителя
    function formatExpiryDate(value) {
      return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
    }
  
    // Функция для валидации номера карты
    function validateCardNumber(value) {
      const cardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13})$/;
      const strippedValue = value.replace(/\s/g, ''); // Удаляем пробелы из номера карты перед проверкой
      return cardRegex.test(strippedValue);
    }
  
    // Функция для валидации даты окончания
    function validateExpiryDate(value) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
  
      const [month, year] = value.split('/').map(num => parseInt(num, 10));
  
      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false;
      }
  
      return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value);
    }
  
    // Функция для валидации CVC
    function validateCVC(value) {
      return /^\d{3}$/.test(value);
    }
  
    // Функция для валидации email
    function validateEmail(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
  
    // Функция для обновления состояния кнопки
    function updateButtonState() {
      const isValidCardNumber = validateCardNumber(cardNumberInput.value);
      const isValidExpiryDate = validateExpiryDate(expiryDateInput.value);
      const isValidCVC = validateCVC(cvcInput.value);
      const isValidEmail = validateEmail(emailInput.value);
  
      if (isValidCardNumber && isValidExpiryDate && isValidCVC && isValidEmail) {
        payButton.disabled = false;
      } else {
        payButton.disabled = true;
      }
    }
  
    // Функция для отображения логотипа платежной системы
    function updateCardLogo(value) {
      let cardType = '';
      if (/^4/.test(value)) {
        cardType = 'visa';
      } else if (/^5[1-5]/.test(value)) {
        cardType = 'mastercard';
      } else if (/^2/.test(value)) {
        cardType = 'mir';
      }
  
      cardLogo.src = `images/${cardType}.png`; 
    }
  
    // Форматирование ввода номера карты
    cardNumberInput.addEventListener('input', function (event) {
      const { value } = event.target;
      event.target.value = formatCardNumber(value);
      updateCardLogo(value); // Обновляем логотип при каждом изменении номера карты
      updateButtonState(); // Обновляем состояние кнопки после форматирования номера карты
    });
  
    // Форматирование ввода даты окончания
    expiryDateInput.addEventListener('input', function (event) {
      const { value } = event.target;
      event.target.value = formatExpiryDate(value);
      updateButtonState(); // Обновляем состояние кнопки после форматирования даты окончания
    });
  
    // Валидация номера карты при потере фокуса
    cardNumberInput.addEventListener('blur', function () {
      const { value } = this;
      const isValid = validateCardNumber(value);
      const errorSpan = document.getElementById('card-error');
      if (!isValid) {
        errorSpan.textContent = 'Номер карты недействителен';
      } else {
        errorSpan.textContent = '';
      }
    });
  
    // Валидация даты окончания при потере фокуса
    expiryDateInput.addEventListener('blur', function () {
      const { value } = this;
      const isValid = validateExpiryDate(value);
      const errorSpan = document.getElementById('expiry-error');
      if (!isValid) {
        errorSpan.textContent = 'Дата окончания недействительна';
      } else {
        errorSpan.textContent = '';
      }
    });
  
    // Валидация CVC при потере фокуса
    cvcInput.addEventListener('blur', function () {
      const { value } = this;
      const isValid = validateCVC(value);
      const errorSpan = document.getElementById('cvc-error');
      if (!isValid) {
        errorSpan.textContent = 'CVC/CVV недействителен';
      } else {
        errorSpan.textContent = '';
      }
    });
  
    // Валидация email при потере фокуса
    emailInput.addEventListener('blur', function () {
      const { value } = this;
      const isValid = validateEmail(value);
      const errorSpan = document.getElementById('email-error');
      if (!isValid) {
        errorSpan.textContent = 'Email недействителен';
      } else {
        errorSpan.textContent = '';
      }
    });
  
    // Обновление состояния кнопки при изменении ввода
    cardNumberInput.addEventListener('input', updateButtonState);
    expiryDateInput.addEventListener('input', updateButtonState);
    cvcInput.addEventListener('input', function (event) {
      event.target.value = event.target.value.replace(/\D/g, '').slice(0, 3); // Ограничиваем ввод только цифрами и максимум тремя символами
      updateButtonState(); // Обновляем состояние кнопки после ввода в поле CVC
    });
    emailInput.addEventListener('input', updateButtonState);
  });
  