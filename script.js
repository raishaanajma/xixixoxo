function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}

// Slider Functionality
let currentIndex = 0;
const slider = document.querySelector('.slider');
const totalSlides = document.querySelectorAll('.product-card').length;
let visibleSlides = 3; // Default 3 untuk desktop

// Deteksi mobile dan set visibleSlides
if (window.innerWidth <= 768) {
    visibleSlides = 1; // Hanya 1 card terlihat di mobile
}

const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

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
    const translateX = -currentIndex * (window.innerWidth <= 768 ? 280 : 300); // 280px untuk mobile, 300px untuk desktop
    slider.style.transform = `translateX(${translateX}px)`;
    updateButtons();
}

function updateButtons() {
    // Sembunyikan tombol prev jika di awal
    if (currentIndex === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    // Sembunyikan tombol next jika di akhir
    if (currentIndex >= totalSlides - visibleSlides) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }
}

// Search Functionality
function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    const noResults = document.getElementById('no-results');
    let found = false;

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        if (name.includes(query)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (found) {
        noResults.style.display = 'none';
    } else {
        noResults.style.display = 'block';
    }

    // Reset slider setelah search
    currentIndex = 0;
    updateSlider();
}

// Swipe Functionality for Mobile
let startX = 0;
let endX = 0;

const sliderContainer = document.querySelector('.slider-container');

sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    // e.preventDefault(); // Dihapus agar user bisa scroll
});

sliderContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const diffX = startX - endX;
    const threshold = 30; // Threshold lebih kecil untuk sensitivitas

    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            // Swipe kiri: next
            slideNext();
        } else {
            // Swipe kanan: prev
            slidePrev();
        }
    }
}

// Inisialisasi tombol saat load
updateButtons();