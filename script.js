// Load Produk dari JSON
let products = [];
let totalSlides = 0;
let visibleSlides = 3; // Default 3 untuk desktop

// Deteksi mobile dan set visibleSlides
if (window.innerWidth <= 768) {
    visibleSlides = 1; // Hanya 1 card terlihat di mobile, tapi scroll smooth
}

const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

// Load data dari JSON
async function loadProducts() {
    try {
        console.log('Loading products.json...');
        const response = await fetch('./products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Products loaded:', data);
        products = data.products;
        totalSlides = products.length;
        generateProductCards(products);
        if (window.innerWidth > 768) {
            updateButtons(); // Button hanya untuk desktop
        }
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
    if (window.innerWidth > 768) {
        currentIndex = 0;
        updateSlider(); // Slider logic hanya untuk desktop
    }
}

// Toggle Menu (Tetap)
function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}

// Slider Functionality (Hanya untuk desktop)
let currentIndex = 0;

function slideNext() {
    if (window.innerWidth > 768 && currentIndex < totalSlides - visibleSlides) {
        currentIndex++;
        updateSlider();
    }
}

function slidePrev() {
    if (window.innerWidth > 768 && currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

function updateSlider() {
    if (window.innerWidth > 768) {
        const translateX = -currentIndex * 300; // 300px untuk desktop
        const slider = document.querySelector('.slider');
        slider.style.transform = `translateX(${translateX}px)`;
        updateButtons();
    }
}

function updateButtons() {
    if (window.innerWidth > 768) {
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

// Swipe Functionality dihapus karena scroll native sudah smooth

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // Load produk dari JSON saat load
});