'use strict';

// ======== NAVEGACIÓN CON SCROLL SUAVE ========
// Usamos delegación de eventos para mayor eficiencia
document.querySelector('.nav-links').addEventListener('click', function (e) {
    e.preventDefault();

    // Comprobamos si el clic fue en un enlace
    if (e.target.classList.contains('nav-link')) {
        const id = e.target.getAttribute('href'); // Obtiene '#about', '#projects', etc.
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

// ======== REVELAR SECCIONES AL HACER SCROLL ========
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target); // Dejamos de observar la sección una vez que es visible
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null, // El viewport
    threshold: 0.15, // La sección se revela cuando el 15% es visible
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden'); // Ocultamos todas las secciones al principio
});

/* == LÓGICA PARA LA PESTAÑA DE REDES SOCIALES == */
/* ============================================= */
document.addEventListener('DOMContentLoaded', function() {
    
    const socialTab = document.getElementById('social-tab');
    const socialTabHandle = document.getElementById('social-tab-handle');

    if (socialTabHandle) {
        socialTabHandle.addEventListener('click', function() {
            // Añade o quita la clase 'is-open' del contenedor principal
            socialTab.classList.toggle('is-open');
        });
    }

});
    // Cambia el año automáticamente
    document.getElementById('year').textContent = new Date().getFullYear();

    // Espera a que todo el HTML esté cargado antes de ejecutar el script
    document.addEventListener('DOMContentLoaded', () => {

    // Seleccionar los elementos del DOM que necesitamos
    const hamburger = document.querySelector('.hamburger');
    const navBar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link'); // Selecciona todos los enlaces

    // Función para abrir/cerrar el menú
    const toggleMenu = () => {
        // Alterna la clase 'active' en el botón y la barra de navegación
        hamburger.classList.toggle('active');
        navBar.classList.toggle('active');

        // Opcional: Bloquear/desbloquear el scroll del body cuando el menú está abierto
        if (navBar.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; // Bloquea el scroll
        } else {
            document.body.style.overflow = ''; // Lo restaura
        }
    };

    // 1. Añadir un evento de clic al botón de la hamburguesa
    hamburger.addEventListener('click', toggleMenu);

    // 2. Añadir un evento de clic a CADA enlace del menú
    // Esto hace que el menú se cierre automáticamente al hacer clic en una sección
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo cierra el menú si está abierto
            if (navBar.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

});