"use strict";

const products = [
  { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/400x300?text=iPhone+16", rating: 4.5, inStock: true },
  { id: 2, name: "Galaxy S25", price: 21990000, category: "phone", image: "https://placehold.co/400x300?text=Galaxy+S25", rating: 4.2, inStock: true },
  { id: 3, name: "Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/400x300?text=Pixel+9", rating: 4.1, inStock: false },
  { id: 4, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/400x300?text=MacBook+Pro", rating: 4.8, inStock: true },
  { id: 5, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/400x300?text=Dell+XPS+15", rating: 4.7, inStock: true },
  { id: 6, name: "Surface Laptop", price: 32990000, category: "laptop", image: "https://placehold.co/400x300?text=Surface+Laptop", rating: 4.4, inStock: false },
  { id: 7, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://placehold.co/400x300?text=AirPods+Pro", rating: 4.3, inStock: true },
  { id: 8, name: "Apple Watch", price: 9990000, category: "accessory", image: "https://placehold.co/400x300?text=Apple+Watch", rating: 4.6, inStock: true },
  { id: 9, name: "Wireless Charger", price: 1290000, category: "accessory", image: "https://placehold.co/400x300?text=Charger", rating: 4.0, inStock: true },
  { id: 10, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/400x300?text=iPad+Air", rating: 4.6, inStock: true },
  { id: 11, name: "Galaxy Tab", price: 14990000, category: "tablet", image: "https://placehold.co/400x300?text=Galaxy+Tab", rating: 4.2, inStock: false },
  { id: 12, name: "Kindle Paperwhite", price: 4990000, category: "tablet", image: "https://placehold.co/400x300?text=Kindle", rating: 4.4, inStock: true }
];

const state = {
  filteredProducts: [...products],
  category: 'all',
  search: '',
  sort: 'default',
  cartCount: 0
};

const app = document.querySelector('#app');

const createElement = (tag, props = {}, children = []) => {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') el.className = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key === 'textContent') el.textContent = value;
    else if (key === 'htmlFor') el.htmlFor = value;
    else if (key === 'src') el.src = value;
    else if (key === 'type') el.type = value;
    else if (key === 'value') el.value = value;
    else el.setAttribute(key, value);
  });
  children.forEach(child => el.append(child));
  return el;
};

function formatPrice(value) {
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
}

function createHeader() {
  const titleGroup = createElement('div', { className: 'title-group' }, [
    createElement('h1', { textContent: 'Product Catalog' }),
    createElement('p', { textContent: 'Browse and shop products rendered by JavaScript.' })
  ]);

  const cartIcon = createElement('div', { id: 'cartIcon' }, [
    createElement('span', { textContent: '🛒' }),
    createElement('span', { className: 'badge', textContent: '0', id: 'cartBadge' })
  ]);

  const darkToggle = createElement('button', { className: 'button', id: 'darkToggle', textContent: 'Dark Mode' });

  const controls = createElement('div', { className: 'controls' }, [cartIcon, darkToggle]);

  return createElement('div', { className: 'surface header' }, [titleGroup, controls]);
}

function createSearchBar() {
  const searchInput = createElement('input', { id: 'searchInput', type: 'search', placeholder: 'Search products...' });
  const sortSelect = createElement('select', { className: 'sort-select', id: 'sortSelect' }, [
    createElement('option', { value: 'default', textContent: 'Sort by' }),
    createElement('option', { value: 'price-asc', textContent: 'Price ↑' }),
    createElement('option', { value: 'price-desc', textContent: 'Price ↓' }),
    createElement('option', { value: 'name-asc', textContent: 'Name A-Z' }),
    createElement('option', { value: 'rating-desc', textContent: 'Rating' })
  ]);

  return createElement('div', { className: 'surface search-row' }, [searchInput, sortSelect]);
}

function createFilterButtons() {
  const categories = ['all', 'phone', 'laptop', 'accessory', 'tablet'];
  const buttons = categories.map(category => {
    const label = category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1);
    const btn = createElement('button', { className: 'filter-button', textContent: label, dataset: { category } });
    if (category === 'all') btn.classList.add('active');
    return btn;
  });
  return createElement('div', { className: 'surface header' }, buttons);
}

function createProductCard(product) {
  const card = createElement('div', { className: 'card', dataset: { id: product.id } });
  const image = createElement('img', { src: product.image, alt: product.name });
  const content = createElement('div', { className: 'card-content' }, [
    createElement('h3', { className: 'card-title', textContent: product.name }),
    createElement('div', { className: 'card-row' }, [
      createElement('span', { className: 'price', textContent: formatPrice(product.price) }),
      createElement('span', { className: product.inStock ? 'badge-stock' : 'badge-stock out', textContent: product.inStock ? 'In stock' : 'Out of stock' })
    ]),
    createElement('div', { className: 'card-row' }, [
      createElement('span', { textContent: `⭐ ${product.rating}` }),
      createElement('button', { className: 'add-cart', textContent: 'Thêm giỏ', type: 'button', dataset: { action: 'add' } })
    ])
  ]);

  card.append(image, content);
  return card;
}

function createProductsGrid() {
  return createElement('div', { className: 'products-grid', id: 'productsGrid' });
}

function createModal(product) {
  const image = createElement('img', { src: product.image, alt: product.name });
  const title = createElement('h2', { textContent: product.name });
  const description = createElement('p', { textContent: 'Full product details are dynamically generated from JavaScript.' });
  const details = createElement('div', { className: 'detail-row' }, [
    createElement('span', { textContent: formatPrice(product.price) }),
    createElement('span', { textContent: `Rating: ${product.rating}` })
  ]);
  const category = createElement('p', { textContent: `Category: ${product.category}` });
  const stock = createElement('p', { textContent: product.inStock ? 'Available' : 'Currently unavailable' });
  const closeBtn = createElement('button', { className: 'button', textContent: 'Close' });
  const modal = createElement('div', { className: 'modal' }, [image, createElement('div', { className: 'modal-body' }, [title, description, details, category, stock]), createElement('div', { className: 'modal-actions' }, [closeBtn])]);

  const backdrop = createElement('div', { className: 'modal-backdrop' }, [modal]);
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) removeModal();
  });
  closeBtn.addEventListener('click', removeModal);
  return backdrop;
}

function removeModal() {
  const existing = document.querySelector('.modal-backdrop');
  if (existing) existing.remove();
}

function renderProducts() {
  const grid = document.querySelector('#productsGrid');
  grid.innerHTML = '';
  state.filteredProducts.forEach(product => {
    grid.appendChild(createProductCard(product));
  });
}

function filterProducts() {
  const search = state.search.toLowerCase();
  state.filteredProducts = products.filter(product => {
    const matchCategory = state.category === 'all' || product.category === state.category;
    const matchSearch = product.name.toLowerCase().includes(search);
    return matchCategory && matchSearch;
  });
  sortProducts();
}

function sortProducts() {
  const sorted = [...state.filteredProducts];
  if (state.sort === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (state.sort === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (state.sort === 'name-asc') {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sort === 'rating-desc') {
    sorted.sort((a, b) => b.rating - a.rating);
  }
  state.filteredProducts = sorted;
  renderProducts();
}

function updateCartBadge() {
  const badge = document.querySelector('#cartBadge');
  badge.textContent = state.cartCount;
}

function setupEvents() {
  const searchInput = document.querySelector('#searchInput');
  const sortSelect = document.querySelector('#sortSelect');
  const filterButtons = document.querySelectorAll('.filter-button');
  const darkToggle = document.querySelector('#darkToggle');
  const productsGrid = document.querySelector('#productsGrid');

  searchInput.addEventListener('input', event => {
    state.search = event.target.value;
    filterProducts();
  });

  sortSelect.addEventListener('change', event => {
    state.sort = event.target.value;
    sortProducts();
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      state.category = button.dataset.category;
      filterProducts();
    });
  });

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });

  productsGrid.addEventListener('click', event => {
    const card = event.target.closest('.card');
    if (!card) return;
    const productId = Number(card.dataset.id);
    const product = products.find(item => item.id === productId);
    if (!product) return;

    if (event.target.dataset.action === 'add') {
      state.cartCount += 1;
      updateCartBadge();
      return;
    }

    document.body.appendChild(createModal(product));
  });
}

function renderApp() {
  app.appendChild(createHeader());
  app.appendChild(createFilterButtons());
  app.appendChild(createSearchBar());
  app.appendChild(createProductsGrid());
  filterProducts();
  setupEvents();
}

renderApp();
