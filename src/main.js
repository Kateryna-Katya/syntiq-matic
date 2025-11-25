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