function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}

// Slider Functionality
let currentIndex = 0;
const slider = document.querySelector('.slider');
const totalSlides = document.querySelectorAll('.product-card').length;
const visibleSlides = 3; // Tampilkan 3 produk sekaligus (produk 1-2-3)

function slideNext() {
    if (currentIndex < totalSlides - visibleSlides) {
        currentIndex++;
        updateSlider();
    }
}

function slidePrev() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

function updateSlider() {
    const translateX = -currentIndex * 300; // 300px per kartu (sesuaikan dengan min-width)
    slider.style.transform = `translateX(${translateX}px)`;
}