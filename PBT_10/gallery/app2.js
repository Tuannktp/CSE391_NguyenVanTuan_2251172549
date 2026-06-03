const gallery = document.getElementById('gallery');
const loading = document.getElementById('loading');
const loadTrigger = document.getElementById('load-trigger');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.getElementById('closeLightbox');

let page = 1;
const limit = 20;
// Switch to Lorem Picsum for real photos (set to false to use JSONPlaceholder)
const USE_PICSUM = true;
let isLoading = false;
let hasMore = true;

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
    }
    imageObserver.unobserve(img);
  });
}, {
  rootMargin: '150px',
  threshold: 0.1,
});

const infiniteObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !isLoading && hasMore) {
    loadMorePhotos();
  }
});

infiniteObserver.observe(loadTrigger);

async function fetchPhotos() {
  if (USE_PICSUM) {
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Không thể tải ảnh từ Picsum');
    }
    const data = await response.json();
    // Normalize to same shape as JSONPlaceholder for easier rendering
    return data.map((p) => ({
      id: p.id,
      title: p.author,
      thumbnailUrl: `https://picsum.photos/id/${p.id}/400/300`,
      url: p.download_url,
    }));
  } else {
    const url = `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Không thể tải ảnh từ JSONPlaceholder');
    }
    return response.json();
  }
}

function createPhotoCard(photo) {
  const card = document.createElement('article');
  card.className = 'card';

  const img = document.createElement('img');
  img.dataset.src = photo.thumbnailUrl;
  img.alt = photo.title;
  img.loading = 'lazy';
  img.addEventListener('click', () => openLightbox(photo));

  const caption = document.createElement('div');
  caption.className = 'caption';
  caption.textContent = photo.title;

  card.append(img, caption);

  if ('IntersectionObserver' in window) {
    const { top } = img.getBoundingClientRect();
    if (top < window.innerHeight + 150) {
      img.src = photo.thumbnailUrl;
    } else {
      imageObserver.observe(img);
    }
  } else {
    img.src = photo.thumbnailUrl;
  }

  return card;
}

function toggleLoading(on) {
  isLoading = on;
  loading.style.display = on ? 'block' : 'none';
}

async function loadMorePhotos() {
  toggleLoading(true);
  try {
    const photos = await fetchPhotos();
    if (!photos.length) {
      hasMore = false;
      infiniteObserver.disconnect();
      loading.textContent = 'Không còn ảnh để tải.';
      return;
    }

    photos.forEach((photo) => {
      const card = createPhotoCard(photo);
      gallery.appendChild(card);
    });
    page += 1;
  } catch (error) {
    console.error(error);
    loading.textContent = 'Tải ảnh thất bại. Vui lòng thử lại.';
  } finally {
    if (hasMore) toggleLoading(false);
  }
}

function openLightbox(photo) {
  lightboxImage.src = photo.url;
  lightboxTitle.textContent = photo.title;
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
}

closeLightbox.addEventListener('click', closeModal);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target === document.getElementById('lightboxBackdrop')) {
    closeModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

loadMorePhotos();
