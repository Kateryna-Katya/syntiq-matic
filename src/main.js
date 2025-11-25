document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Скрипт для мобильного меню (Header)
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const headerNav = document.querySelector('.header__nav');
  const navLinks = document.querySelectorAll('.nav__link');

  const toggleMenu = () => {
      headerNav.classList.toggle('is-open');
      // Обновление иконки
      const iconElement = menuToggle.querySelector('svg');
      if (headerNav.classList.contains('is-open')) {
          iconElement.setAttribute('data-lucide', 'x');
      } else {
          iconElement.setAttribute('data-lucide', 'menu');
      }
      // Переинициализация иконок после смены data-lucide
      lucide.createIcons();
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Закрытие меню при клике на ссылку (только для мобильной версии)
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          if (window.innerWidth < 768) {
              // Добавляем небольшую задержку для плавности скролла
              setTimeout(() => {
                  if (headerNav.classList.contains('is-open')) {
                      toggleMenu();
                  }
              }, 200);
          }
      });
  });


  // ==========================================================================
  // 2. Скрипт для Cookie Pop-up (Этап 5)
  // ==========================================================================
  const cookiePopup = document.getElementById('cookiePopup');
  const acceptCookiesButton = document.getElementById('acceptCookies');
  const cookieAccepted = localStorage.getItem('syntiq_cookies_accepted');

  // Функция показа/скрытия
  const showCookiePopup = () => {
      if (!cookieAccepted) {
          cookiePopup.classList.remove('is-hidden');
      }
  }

  const hideCookiePopup = () => {
      cookiePopup.classList.add('is-hidden');
      localStorage.setItem('syntiq_cookies_accepted', 'true');
  }

  // Показываем, если не было принято
  showCookiePopup();

  // Обработчик кнопки "Принять"
  acceptCookiesButton.addEventListener('click', hideCookiePopup);
});

// ==========================================================================
    // 3. JS Анимация Hero-секции (Поток Стратегических Данных)
    // ==========================================================================
    const canvas = document.getElementById('flowCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        // Точка данных
        class DataPoint {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.radius = Math.random() * 1.5 + 1; // 1 до 2.5
                this.speedX = (Math.random() - 0.5) * 0.8;
                this.speedY = (Math.random() - 0.5) * 0.8;
                this.color = Math.random() < 0.5 ? 'rgba(0, 163, 255, 0.9)' : 'rgba(40, 167, 69, 0.7)'; // Синий или Зеленый
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Отскок от краев
                if (this.x < 0 || this.x > width) this.speedX = -this.speedX;
                if (this.y < 0 || this.y > height) this.speedY = -this.speedY;

                this.draw();
            }
        }

        let dataPoints = [];
        const numPoints = 60;

        // Определяем размеры
        const setCanvasSize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        const initFlow = () => {
            setCanvasSize();
            dataPoints = [];
            for (let i = 0; i < numPoints; i++) {
                // Инициализация точек случайным образом по всему канвасу
                const x = Math.random() * width;
                const y = Math.random() * height;
                dataPoints.push(new DataPoint(x, y));
            }
        };

        // Соединение точек линиями
        const connectPoints = () => {
            const maxDistance = 100; // Максимальная дистанция для соединения
            for (let i = 0; i < dataPoints.length; i++) {
                for (let j = i; j < dataPoints.length; j++) {
                    const dx = dataPoints[i].x - dataPoints[j].x;
                    const dy = dataPoints[i].y - dataPoints[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        // Цвет линии зависит от расстояния
                        ctx.strokeStyle = `rgba(0, 163, 255, ${1 - distance / maxDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(dataPoints[i].x, dataPoints[i].y);
                        ctx.lineTo(dataPoints[j].x, dataPoints[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Главный цикл анимации
        const animateFlow = () => {
            requestAnimationFrame(animateFlow);
            // Плавное затухание, чтобы избежать мерцания
            ctx.fillStyle = 'rgba(29, 35, 42, 0.4)'; // Фон с небольшой прозрачностью
            ctx.fillRect(0, 0, width, height);

            connectPoints();

            dataPoints.forEach(point => {
                point.update();
            });
        };

        window.addEventListener('resize', initFlow);

        initFlow();
        animateFlow();
    }
    // ==========================================================================
    // Конец JS Анимации
// ==========================================================================
    // ==========================================================================
    // 4. Инициализация Swiper (Отзывы) - ОБНОВЛЕНО: Автовоспроизведение, ЦЕНТРИРОВАНИЕ
    // ==========================================================================
    
    if (typeof Swiper !== 'undefined' && document.querySelector('.reviews__slider')) {
        new Swiper('.reviews__slider', {
            // Опции для слайдера
            slidesPerView: 1, 
            spaceBetween: 30,
            loop: true,
            
            // НОВОЕ: Центрирование активного слайда
            centeredSlides: true, 
            
            // Активируем автовоспроизведение
            autoplay: {
                delay: 4500, // Смена слайда каждые 4.5 секунды
                disableOnInteraction: false, 
            },

            // Пагинация (точки)
            pagination: {
                el: '.reviews__pagination',
                clickable: true,
            },
            
            // Адаптивные брейкпоинты
            breakpoints: {
                768: {
                    slidesPerView: 2, 
                    spaceBetween: 30,
                    // При нескольких слайдах центрирование часто выглядит плохо,
                    // поэтому отключаем его на десктопе, либо делаем центрирование 
                    // группы слайдов, что сложнее.
                    // Оставляем centeredSlides: false по умолчанию для > 1 слайда
                },
                1200: {
                    slidesPerView: 3, 
                    spaceBetween: 40,
                }
            }
        });
}
    // ==========================================================================
    // 5. JS Логика Формы Контактов и CAPTCHA (Этап 4)
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const captchaDisplay = document.getElementById('captchaDisplay');
    const captchaInput = document.getElementById('captchaInput');
    const captchaMessage = document.getElementById('captchaMessage');
    const submissionMessage = document.getElementById('submissionMessage');
    const policyAccept = document.getElementById('policyAccept');
    
    let correctAnswer = 0;

    /**
     * Генерирует простой математический пример (CAPTCHA).
     */
    function generateCaptcha() {
        // Усложняем примеры (+ или -)
        const operator = Math.random() < 0.5 ? '+' : '-';
        let num1 = Math.floor(Math.random() * 15) + 5;
        let num2 = Math.floor(Math.random() * 10) + 1;
        
        // Гарантируем положительный результат для минуса
        if (operator === '-' && num1 < num2) {
            [num1, num2] = [num2, num1];
        }

        correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;
        captchaDisplay.textContent = `${num1} ${operator} ${num2} = ?`;
        captchaMessage.textContent = ''; 
        captchaInput.value = ''; 
    }

    /**
     * Валидирует ответ CAPTCHA.
     * @returns {boolean} True, если ответ верный.
     */
    function validateCaptcha() {
        if (!captchaInput.value.trim()) {
            captchaMessage.textContent = 'Пожалуйста, решите пример.';
            captchaMessage.style.color = '#FF4545'; 
            return false;
        }

        const userAnswer = parseInt(captchaInput.value.trim());
        if (userAnswer === correctAnswer) {
            captchaMessage.textContent = 'Капча успешно пройдена!';
            captchaMessage.style.color = '#28A745'; 
            return true;
        } else {
            captchaMessage.textContent = 'Неверный ответ. Попробуйте еще раз.';
            captchaMessage.style.color = '#FF4545'; 
            generateCaptcha(); 
            return false;
        }
    }

    // Инициализация CAPTCHA при загрузке страницы
    generateCaptcha();

    // Обработчик отправки формы
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        submissionMessage.style.display = 'none'; 

        const isCaptchaValid = validateCaptcha();
        const isPolicyAccepted = policyAccept.checked;

        if (isCaptchaValid && isPolicyAccepted) {
            
            // Имитация успешной отправки данных
            console.log('Form Submitted and Validated:', {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                policy: isPolicyAccepted
            });

            // Показываем сообщение об успехе ТОЛЬКО после успешной валидации
            submissionMessage.style.display = 'block';
            
            // Сброс формы и генерация новой капчи
            contactForm.reset();
            generateCaptcha();
            
            // Автоматически скрываем сообщение через 5 секунд
            setTimeout(() => {
                submissionMessage.style.display = 'none';
            }, 5000);

        } else if (!isPolicyAccepted) {
            // Если капча пройдена, но чекбокс нет
            alert('Пожалуйста, примите условия использования и политику конфиденциальности.');
            policyAccept.focus();
        } 
    });

    // ==========================================================================
    // Конец JS Логики Формы Контактов
    // ==========================================================================