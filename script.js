JavaScript

// =========================================================================
// CONFIGURACIÓN ESTÁTICA Y DATOS
// =========================================================================

// ... (El resto de constantes y datos permanece igual, solo añadimos la imagen de alarmas para que esté disponible)

// --- ENLACES DE FOTOS LOCALES ---
const LOGO_URL = "logo.png"; 
const PHOTO_SERVICIO_URL = "jesus_salva.jpg";
const PHOTO_CONFERENCIA_URL = "evento_conferencia.jpg";
const PHOTO_RETIRO_URL = "evento_retiro.jpg";
const PHOTO_ALARMAS_URL = "alarmas.jpg"; // <== Nueva URL añadida

// ... (resto de setupExternalLinks)

// --- FOTOS DE LIDERAZGO (Carrusel) ---
const LEADERS_PHOTOS = [
    "image.png", // Usado para 'Camaras'
    PHOTO_ALARMAS_URL, // Usado para 'Alarmas'
    "fortaleza.jpeg" // Usado para el 3er ejemplo
]; 

// ACTUALIZACIÓN: Se reemplazan los datos estáticos de "Liderazgo" con los nuevos datos de "Productos/Servicios"
const LEADERS_DATA = [
    { name: "Seguridad electrónica", role: "Cámaras", text: "Cámaras análogas, cámaras IP, cámaras Wi-Fi, cámaras enlazadas al router.", photoUrl: LEADERS_PHOTOS[0] },
    { name: "Seguridad electrónica", role: "Alarmas", text: "Alarmas Wi-Fi, alarmas alambradas, alarmas con cámaras de seguridad.", photoUrl: LEADERS_PHOTOS[1] },
    { name: "Ingeniería Electrónica", role: "Consultoría", text: "Asesoría y diseño de sistemas de seguridad a medida para empresas y hogares.", photoUrl: LEADERS_PHOTOS[2] } // Ejemplo ajustado
];

// ... (resto de constantes de Miembros y Eventos)


// =========================================================================
// 2. LÓGICA DEL CARRUSEL DE LIDERAZGO
// =========================================================================
let currentSlide = 0;
const SLIDE_INTERVAL = 5000;
let autoSlideTimer;

/**
 * Renderiza todos los slides del carrusel inyectando el HTML en el contenedor.
 * Esta función debe llamarse una sola vez al cargar la página.
 */
function renderCarouselSlides() {
    const slider = document.getElementById('carousel-slider');
    if (!slider) return;

    slider.innerHTML = LEADERS_DATA.map((leader, index) => `
        <div class="carousel-slide flex-shrink-0 w-full p-8 md:flex md:items-center">
            <img src="${leader.photoUrl}" alt="${leader.name}" 
                 class="main-photo-style mx-auto md:ml-0 md:mr-8 mb-4 md:mb-0">
            <div class="text-left">
                <h3 class="text-3xl font-bold accent-blue mb-2">${leader.name}</h3>
                <p class="text-xl font-semibold text-gray-800 mb-4">${leader.role}</p>
                <p class="text-gray-600 italic">"${leader.text}"</p>
            </div>
        </div>
    `).join('');
}


function updateCarousel() {
    const slider = document.getElementById('carousel-slider');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!slider || slider.children.length === 0) return;
    
    // Se asegura de que la variable LEADERS_DATA.length se use para el módulo
    currentSlide = currentSlide % LEADERS_DATA.length; 
    
    // Se calcula el ancho del slide a partir del primer hijo (si existe)
    const slideWidth = slider.querySelector('.carousel-slide')?.clientWidth || 0; 
    
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    generateDots(dotsContainer);
}
// ... (generateDots, nextSlide, prevSlide, startAutoSlide, stopAutoSlide, setupCarouselEventListeners permanecen IGUALES)

// ... (Resto de funciones: setupModalLogic, loadMembers, loadEvents, etc. permanecen IGUALES)

// =========================================================================
// 8. INICIALIZACIÓN AL CARGAR LA PÁGINA
// =========================================================================

window.onload = function() {
    // 1. Cargar las secciones dinámicas
    loadMembers();
    loadEvents();
    
    // 2. Inicializar el iFrame del video principal 
    window.loadVideoFromList(MAIN_VIDEO_ID, MAIN_VIDEO_TITLE);
   
    // 3. Inicializar el carrusel
    // NUEVO: Renderiza los slides primero
    renderCarouselSlides(); 
    setupCarouselEventListeners();
    updateCarousel();
    startAutoSlide();
    
    // 4. Configurar la lógica del modal de ventas
    setupModalLogic();
    
    // 5. Configurar los enlaces sociales y de peticiones
    setupExternalLinks(); 
    
    // 6. Inicializar el observador para el menú activo
    setupIntersectionObserver();
    
    // 7. Configurar el cambio de video al hacer clic en la lista
    setupVideoListEventListeners();

    // 8. Configurar listeners de botones dinámicos (Miembros)
    setupDynamicSectionEventListeners();

    // 9. Permite cerrar modal con la tecla ESC y enviar con ENTER
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('password-modal');
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
            } else if (e.key === 'Enter') {
                document.getElementById('access-button').click();
            }
        }
    });
};