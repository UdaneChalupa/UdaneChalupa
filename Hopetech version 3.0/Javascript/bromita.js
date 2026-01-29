// bromita.js - Versión SEGURA 5.0 (no rompe enlaces reales)

document.addEventListener('DOMContentLoaded', () => {
    const imagenes = [
        'imagenes/blanco.png',
        'imagenes/negro.png'
    ];

    const paginaDestino = 'broma.html'; // cámbialo cuando quieras

    let yaAparecio = false;

    function mostrarBromitaPro() {
        if (yaAparecio) return;
        yaAparecio = true;

        const src = imagenes[Math.floor(Math.random() * imagenes.length)];
        const tamano = (30 + Math.random() * 40) + 'px';
        const opacidad = 0.6 + Math.random() * 0.35;
        const rotacionInicial = (Math.random() * 40 - 20) + 'deg';
        const tiempoVisible = 1000 + Math.random() * 2000;
        const retrasoAparicion = 200 + Math.random() * 800;
        const distanciaFlotacion = (10 + Math.random() * 30) + 'px';
        const duracionFlotacion = (5 + Math.random() * 8) + 's';
        const blurSombra = 8 + Math.random() * 12;
        const glowColor = Math.random() > 0.5 ? '#ff6bcb' : '#a78bfa';

        const img = document.createElement('img');
        img.src = src;
        img.alt = "¡Pillame rápido!";
        img.style.cssText = `
            position: absolute;
            pointer-events: auto;
            cursor: pointer;
            z-index: ${9999 + Math.floor(Math.random() * 3000)};
            opacity: 0;
            width: ${tamano};
            height: auto;
            border-radius: ${Math.random() > 0.5 ? '50%' : '35%'};
            box-shadow: 0 8px ${blurSombra}px rgba(0,0,0,0.6), 0 0 15px ${glowColor}90;
            transition: all 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
            transform: scale(0.6) rotate(${rotacionInicial});
            user-select: none;
            filter: drop-shadow(0 0 10px ${glowColor});
        `;

        // Posición random
        const pageWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
        const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        const maxX = pageWidth - parseInt(tamano);
        const maxY = pageHeight - parseInt(tamano);

        img.style.left = Math.random() * (maxX > 0 ? maxX : pageWidth) + 'px';
        img.style.top = Math.random() * (maxY > 0 ? maxY : pageHeight) + 'px';

        img.style.animation = `flotarBromitaPro ${duracionFlotacion} infinite ease-in-out`;

        // Solo el conejo redirige, y evitamos propagación
        img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            window.location.href = paginaDestino;
        }, { capture: true });

        document.body.appendChild(img);

        setTimeout(() => {
            img.style.opacity = opacidad;
            img.style.transform = `scale(1.05) rotate(${rotacionInicial})`;
            img.style.boxShadow = `0 12px ${blurSombra * 1.4}px rgba(0,0,0,0.7), 0 0 30px ${glowColor}cc`;
        }, retrasoAparicion);

        setTimeout(() => {
            img.style.opacity = '0';
            img.style.transform = `scale(0.5) rotate(${rotacionInicial})`;
            setTimeout(() => img.remove(), 900);
        }, tiempoVisible);
    }

    setTimeout(mostrarBromitaPro, 800 + Math.random() * 4200);
});