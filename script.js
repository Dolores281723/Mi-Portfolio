'use strict';

// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // ======== NAVEGACIÓN CON SCROLL SUAVE ========
    const navLinksContainer = document.querySelector('.nav-links');
    if (navLinksContainer) {
        navLinksContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const id = e.target.getAttribute('href');
                const targetElement = document.querySelector(id);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    // ======== ANIMACIÓN DE BARRAS DE PROGRESO CON ONCLICK ========
    const skillContainers = document.querySelectorAll('.skill');

    skillContainers.forEach(skill => {
        skill.addEventListener('click', () => {
            const progressBar = skill.querySelector('.progress');
            const progressText = progressBar.querySelector('.progress-text'); // Buscamos el texto DENTRO de la barra
            const targetWidth = progressBar.getAttribute('data-progress');

            // Si la barra ya está animada (tiene un ancho > 0), no hacer nada.
            if (progressBar.style.width !== '0px' && progressBar.style.width !== '') {
                return;
            }

            // 1. Animar el ancho de la barra
            progressBar.style.width = targetWidth + '%';

            // 2. Animar el texto del porcentaje si existe
            if (progressText) {
                let current = 0;
                progressText.style.opacity = 1; // Hacemos visible el texto

                const interval = setInterval(() => {
                    if (current >= parseInt(targetWidth)) {
                        clearInterval(interval);
                    } else {
                        current++;
                        progressText.textContent = current + '%';
                    }
                }, 10); // Velocidad del contador
            }
        }, { once: true }); // { once: true } hace que el evento solo se dispare una vez por barra.
    });

    // ======== REVELAR SECCIONES AL HACER SCROLL ========
    const allSections = document.querySelectorAll('.section');

    const revealSection = function (entries, observer) {
        const [entry] = entries;

        if (!entry.isIntersecting) return;

        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    allSections.forEach(function (section) {
        sectionObserver.observe(section);
        section.classList.add('section--hidden');
    });

    // Seleccionar los elementos del DOM que necesitamos
    const hamburger = document.querySelector('.hamburger');
    const navBar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link'); // Selecciona todos los enlaces

    // Función para abrir/cerrar el menú
    const toggleMenu = () => {
        // Alterna la clase 'active' en el botón y la barra de navegación
        hamburger.classList.toggle('active');
        navBar.classList.toggle('active');

        document.body.style.overflow = navBar.classList.contains('active') ? 'hidden' : '';
    };

    // 1. Añadir un evento de clic al botón de la hamburguesa
    hamburger.addEventListener('click', toggleMenu);

    // 2. Añadir un evento de clic a CADA enlace del menú
    // Esto hace que el menú se cierre automáticamente al hacer clic en una sección
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navBar.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Cambia el año automáticamente en el footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});