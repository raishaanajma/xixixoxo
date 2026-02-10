// Load Produk dari GitHub JSON
let products = [];
let totalSlides = 0;
let visibleSlides = 3; // Default 3 untuk desktop

// Deteksi mobile dan set visibleSlides
if (window.innerWidth <= 768) {
    visibleSlides = 1; // Hanya 1 card terlihat di mobile
}

const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

// Load data dari JSON dari GitHub
async function loadProducts() {
    try {
        console.log('Loading products.json from GitHub...');
        const response = await fetch('https://raw.githubusercontent.com/raishaanajma/xixixoxostore/main/products.json?token=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');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Products loaded:', data);
        products = data.products;
        totalSlides = products.length;
        generateProductCards(products);
        updateButtons();
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback: Gunakan array kosong atau hardcode jika perlu
        products = [];
        totalSlides = 0;
        generateProductCards(products);
        alert('Gagal memuat produk. Cek console untuk detail.');
    }
}

// Generate Produk Card
function generateProductCards(productsToShow) {
    const slider = document.getElementById('product-slider');
    slider.innerHTML = ''; // Clear existing cards

    console.log('Generating cards for:', productsToShow.length, 'products');

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        let plansHTML = '';
        product.plans.forEach(plan => {
            plansHTML += `<h4>${plan.type}</h4>`;
            plan.prices.forEach(price => {
                plansHTML += `<span class="price">${price}</span>`;
            });
        });

        // Tanpa img, langsung h3 dan plans
        card.innerHTML = `
            <h3>${product.name}</h3>
            ${plansHTML}
        `;

        slider.appendChild(card);
    });

    // Update totalSlides setelah generate
    totalSlides = productsToShow.length;
    currentIndex = 0;
    updateSlider();
}

// Toggle Menu (Tetap)
function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}

// Slider Functionality
let currentIndex = 0;

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
    const slider = document.querySelector('.slider');
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

// Search Functionality (Update untuk filter array)
function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    generateProductCards(filteredProducts);

    const noResults = document.getElementById('no-results');
    if (filteredProducts.length > 0) {
        noResults.style.display = 'none';
    } else {
        noResults.style.display = 'block';
    }
}

// Swipe Functionality for Mobile
let startX = 0;
let endX = 0;

const sliderContainer = document.querySelector('.slider-container');

sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

sliderContainer.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const diffX = startX - endX;
    const threshold = 30;

    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            slideNext();
        } else {
            slidePrev();
        }
    }
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // Load produk dari GitHub saat load
});
