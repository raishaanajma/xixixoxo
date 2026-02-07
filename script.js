function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}

// Slider Functionality
let currentIndex = 0;
const slider = document.querySelector('.slider');
const totalSlides = document.querySelectorAll('.product-card').length;
const visibleSlides = 3; // Tampilkan 3 produk sekaligus (produk 1-2-3)
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
    const translateX = -currentIndex * 300; // 300px per kartu (sesuaikan dengan min-width)
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

// Inisialisasi tombol saat load
updateButtons();