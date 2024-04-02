document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('myForm');
    const resultDiv = document.getElementById('result');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Предотвращаем отправку формы по умолчанию
  
      // Получаем значения из полей формы
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const patronymic = document.getElementById('patronymic').value.trim();
  
      // Создаем новый абзац с введенными данными
      const paragraph = document.createElement('p');
      paragraph.textContent = `${lastName} ${firstName} ${patronymic}`;
  
      // Добавляем новый абзац в div с результатами
      resultDiv.appendChild(paragraph);
  
      // Очищаем поля формы
      form.reset();
    });
  
    // Добавляем обработчик события blur для каждого поля формы
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('blur', function () {
        // Применяем регулярное выражение для удаления недопустимых символов
        const filteredValue = this.value.replace(/[^а-яА-Я\s-]/g, '')
          // Заменяем несколько подряд идущих пробелов или дефисов на один
          .replace(/[\s-]+/g, ' ')
          // Удаляем пробелы и дефисы в начале и конце строки
          .trim()
          // Приводим первую букву к верхнему регистру, а остальные к нижнему
          .replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
  
        // Устанавливаем отфильтрованное значение обратно в поле
        this.value = filteredValue;
      });
    });
  });
  