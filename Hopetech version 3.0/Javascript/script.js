/**
 * script.js - HopeTECH
 * Proyecto del CIFP Txurdinaga LHII
 * Funcionalidades: AOS, Modo oscuro, Menú móvil, Toast, Formulario, Pink Force
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ====================== ANIMACIONES AOS ====================== */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true
    });
  }

  /* ====================== MODO OSCURO/CLARO ====================== */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  if (themeToggle) {
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
    });
  }

  /* ====================== MENÚ HAMBURGUESA ====================== */
  const botonMenu = document.querySelector('.boton-menu');
  const menu = document.querySelector('.menu');

  if (botonMenu && menu) {
    botonMenu.addEventListener('click', function() {
      menu.classList.toggle('activo');
      botonMenu.classList.toggle('activo');
      
      const icono = botonMenu.querySelector('i');
      if (icono) {
        icono.classList.toggle('fa-bars');
        icono.classList.toggle('fa-times');
      }

      botonMenu.setAttribute('aria-expanded', menu.classList.contains('activo'));
    });

    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !botonMenu.contains(e.target)) {
        menu.classList.remove('activo');
        botonMenu.classList.remove('activo');
        botonMenu.setAttribute('aria-expanded', 'false');
        
        const icono = botonMenu.querySelector('i');
        if (icono) {
          icono.classList.add('fa-bars');
          icono.classList.remove('fa-times');
        }
      }
    });

    // Cerrar al clic en enlace (solo móvil)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          menu.classList.remove('activo');
          botonMenu.classList.remove('activo');
          botonMenu.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ====================== SUBMENÚ “PRECIOS” EN MÓVIL ====================== */
  const enlacesDesplegables = document.querySelectorAll('.menu-item-desplegable > a');

  enlacesDesplegables.forEach(enlace => {
    enlace.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const li = enlace.parentElement;
        const subMenu = li.querySelector('.submenu-precios');
        if (subMenu) {
          li.classList.toggle('activo');
          subMenu.style.maxHeight = li.classList.contains('activo')
            ? subMenu.scrollHeight + 'px'
            : '0px';
        }
      }
    });
  });

  // Reset al redimensionar a desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      enlacesDesplegables.forEach(enlace => {
        const li = enlace.parentElement;
        li.classList.remove('activo');
        const subMenu = li.querySelector('.submenu-precios');
        if (subMenu) subMenu.style.maxHeight = null;
      });
      if (menu) menu.classList.remove('activo');
      if (botonMenu) botonMenu.classList.remove('activo');
    }
  });

  /* ====================== TOAST DE BIENVENIDA ====================== */
  function mostrarToast() {
    if (document.querySelector('.welcome-toast')) return;

    let mensaje = '¡Bienvenido a HopeTECH! 🚀';
    const pathname = location.pathname.toLowerCase();

    if (pathname.includes('sobre-nosotros')) {
      mensaje = '¡Conoce al equipo detrás de HopeTECH! 👥';
    } else if (pathname.includes('servicios')) {
      mensaje = '¡Descubre todo lo que podemos hacer por ti! 🛠️';
    } else if (pathname.includes('precios')) {
      mensaje = '¡Precios transparentes y a medida! 💰';
    } else if (pathname.includes('proyectos')) {
      mensaje = '¡Mira nuestros proyectos más brutales! 🔥';
    } else if (pathname.includes('contacto')) {
      mensaje = '¡Estamos listos para hablar de tu proyecto! 📩';
    } else if (pathname.includes('pink force') || pathname.includes('pink-force')) {
      mensaje = '¡Bienvenido al proyecto Pink Force! 🤖💗';
    } else if (pathname === '/' || pathname.includes('index')) {
      mensaje = '¡Bienvenido a HopeTECH! 🚀';
    }

    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.textContent = mensaje;
    toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #492b7b, #f876cd);
      color: white;
      padding: 16px 32px;
      border-radius: 50px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      font-size: 1.1rem;
      font-weight: 600;
      z-index: 9999;
      opacity: 0;
      transition: all 0.5s ease;
      pointer-events: none;
      max-width: 90vw;
      text-align: center;
    `;

    document.body.appendChild(toast);

    setTimeout(() => toast.style.opacity = '1', 400);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 600);
    }, 4000);
  }

  mostrarToast();  // ← lo llamamos aquí, después de arreglar el menú

  /* ====================== FORMULARIO DE CONTACTO ====================== */
  const contactForm = document.getElementById('contact-form');
  const resultDiv = document.getElementById('result');

  if (contactForm && resultDiv) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      resultDiv.innerHTML = '';
      contactForm.querySelectorAll('input, textarea').forEach(el => el.style.borderColor = '');
      contactForm.querySelectorAll('.error-msg').forEach(el => el.remove());

      let hasError = false;

      const nameInput = contactForm.name;
      const emailInput = contactForm.email;
      const messageInput = contactForm.message;

      if (!nameInput?.value?.trim()) {
        showError(nameInput, 'El nombre es obligatorio');
        hasError = true;
      }
      if (!emailInput?.value?.trim()) {
        showError(emailInput, 'El email es obligatorio');
        hasError = true;
      } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        showError(emailInput, 'Email no válido');
        hasError = true;
      }
      if (!messageInput?.value?.trim()) {
        showError(messageInput, 'Escribe tu mensaje');
        hasError = true;
      }

      if (hasError) return;

      resultDiv.textContent = 'Enviando...';
      resultDiv.style.color = '#9575cd';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          resultDiv.textContent = '¡Mensaje enviado correctamente! Te respondemos en menos de 24-48h 😊';
          resultDiv.style.color = '#10b981';
          contactForm.reset();
        } else {
          resultDiv.textContent = 'Error: ' + (data.message || 'Inténtalo más tarde');
          resultDiv.style.color = '#ff6f61';
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        resultDiv.textContent = 'Error de conexión. Revisa tu internet.';
        resultDiv.style.color = '#ff6f61';
      }
    });

    function showError(input, message) {
      if (!input) return;
      const errorElement = document.createElement('div');
      errorElement.textContent = message;
      errorElement.className = 'error-msg';
      errorElement.style.color = '#ff6f61';
      errorElement.style.fontSize = '0.9rem';
      errorElement.style.marginTop = '5px';

      input.style.borderColor = '#ff6f61';
      input.parentNode.appendChild(errorElement);
    }
  }

  /* ====================== PROYECTO PINK FORCE ====================== */
  if (location.pathname.toLowerCase().includes('pink force.html') || location.pathname.toLowerCase().includes('pink-force.html')) {
    const pupil = document.querySelector('.pupil');
    const robotEye = document.querySelector('.robot-eye');
    const robotWrapper = document.querySelector('.robot-wrapper');

    if (pupil && robotEye) {
      document.addEventListener('mousemove', (e) => {
        const eyeRect = robotEye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;

        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.hypot(deltaX, deltaY), 35);

        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;

        pupil.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
      });
    }

    if (robotWrapper) {
      const beep1 = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
      const beep2 = new Audio('https://www.soundjay.com/buttons/sounds/button-10.mp3');
      const beeps = [beep1, beep2];

      const playRandomBeep = () => {
        const randomBeep = beeps[Math.floor(Math.random() * beeps.length)];
        randomBeep.currentTime = 0;
        randomBeep.play().catch(() => {});
      };

      robotWrapper.addEventListener('mouseenter', playRandomBeep);
      robotWrapper.addEventListener('click', playRandomBeep);
    }
  }
});