document.addEventListener('DOMContentLoaded', function () {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
  
    // Функция для показа/скрытия кнопки Наверх
    function toggleScrollTopBtn() {
      if (document.documentElement.scrollTop > 100) {
        scrollTopBtn.classList.remove('d-none');
      } else {
        scrollTopBtn.classList.add('d-none');
      }
    }
  
    // Обработчик события scroll с пассивным поведением
    window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });
  
    // Обработчик клика по кнопке Наверх
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  