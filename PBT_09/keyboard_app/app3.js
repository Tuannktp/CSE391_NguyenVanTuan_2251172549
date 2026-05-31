"use strict";

const images = [
  { id: 1, title: 'iPhone 16', src: 'https://placehold.co/800x500?text=iPhone+16' },
  { id: 2, title: 'Galaxy S25', src: 'https://placehold.co/800x500?text=Galaxy+S25' },
  { id: 3, title: 'Pixel 9', src: 'https://placehold.co/800x500?text=Pixel+9' },
  { id: 4, title: 'MacBook Pro', src: 'https://placehold.co/800x500?text=MacBook+Pro' },
  { id: 5, title: 'Dell XPS 15', src: 'https://placehold.co/800x500?text=Dell+XPS+15' },
  { id: 6, title: 'AirPods Pro', src: 'https://placehold.co/800x500?text=AirPods+Pro' },
  { id: 7, title: 'Apple Watch', src: 'https://placehold.co/800x500?text=Apple+Watch' },
  { id: 8, title: 'iPad Air', src: 'https://placehold.co/800x500?text=iPad+Air' },
  { id: 9, title: 'Kindle', src: 'https://placehold.co/800x500?text=Kindle' }
];

const state = {
  currentIndex: 0,
  slideshow: false,
  paletteOpen: false,
  commands: [
    { id: 'next', label: 'Next image', action: () => showNextImage() },
    { id: 'prev', label: 'Previous image', action: () => showPreviousImage() },
    { id: 'play', label: 'Play slideshow', action: () => startSlideshow() },
    { id: 'pause', label: 'Pause slideshow', action: () => stopSlideshow() },
    { id: 'open', label: 'Open modal', action: () => openModal() },
    { id: 'close', label: 'Close modal', action: () => closeModal() }
  ]
};

const currentImage = document.getElementById('currentImage');
const imageCaption = document.getElementById('imageCaption');
const thumbList = document.getElementById('thumbList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playBtn = document.getElementById('playBtn');
const paletteOverlay = document.getElementById('paletteOverlay');
const paletteInput = document.getElementById('paletteInput');
const commandList = document.getElementById('commandList');
const closePaletteBtn = document.getElementById('closePalette');
const viewer = document.querySelector('.viewer');

let slideshowInterval = null;

function renderThumbnails() {
  thumbList.innerHTML = '';
  images.forEach((image, index) => {
    const button = document.createElement('button');
    button.className = 'thumb-item';
    button.type = 'button';
    button.dataset.index = index;
    button.setAttribute('aria-label', `Show image ${index + 1}: ${image.title}`);
    button.innerHTML = `<img src="${image.src}" alt="${image.title}" /><span>${image.title}</span>`;
    if (index === state.currentIndex) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      state.currentIndex = index;
      updateImage();
    });
    thumbList.appendChild(button);
  });
}

function updateImage() {
  const image = images[state.currentIndex];
  currentImage.src = image.src;
  currentImage.alt = image.title;
  imageCaption.textContent = `Image ${state.currentIndex + 1}: ${image.title}`;
  renderThumbnails();
}

function showNextImage() {
  state.currentIndex = (state.currentIndex + 1) % images.length;
  updateImage();
}

function showPreviousImage() {
  state.currentIndex = (state.currentIndex - 1 + images.length) % images.length;
  updateImage();
}

function startSlideshow() {
  if (state.slideshow) return;
  state.slideshow = true;
  playBtn.textContent = 'Pause';
  slideshowInterval = setInterval(showNextImage, 2000);
}

function stopSlideshow() {
  state.slideshow = false;
  playBtn.textContent = 'Play';
  clearInterval(slideshowInterval);
}

function toggleSlideshow() {
  if (state.slideshow) stopSlideshow();
  else startSlideshow();
}

function openModal() {
  if (document.querySelector('.modal-backdrop')) return;
  const image = images[state.currentIndex];
  const backdrop = document.createElement('div');
  backdrop.className = 'overlay modal-backdrop';
  backdrop.setAttribute('role', 'dialog');
  backdrop.setAttribute('aria-modal', 'true');
  backdrop.innerHTML = `
    <div class="palette-card" tabindex="-1">
      <button class="icon-button" id="closeModal" aria-label="Close modal">✕</button>
      <img src="${image.src}" alt="${image.title}" />
      <div style="padding:16px;">
        <h2>${image.title}</h2>
        <p>Image ${state.currentIndex + 1} of ${images.length}</p>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);
  const closeModalBtn = document.getElementById('closeModal');
  closeModalBtn.focus();
  closeModalBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) closeModal();
  });
}

function closeModal() {
  const modal = document.querySelector('.modal-backdrop');
  if (modal) modal.remove();
}

function buildCommandList(filteredCommands) {
  commandList.innerHTML = '';
  filteredCommands.forEach((command, index) => {
    const item = document.createElement('li');
    item.className = 'command-item';
    item.tabIndex = 0;
    item.textContent = command.label;
    item.dataset.commandId = command.id;
    item.addEventListener('click', () => {
      command.action();
      closePalette();
    });
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        command.action();
        closePalette();
      }
    });
    if (index === 0) item.classList.add('active');
    commandList.appendChild(item);
  });
}

function openPalette() {
  paletteOverlay.classList.remove('hidden');
  state.paletteOpen = true;
  paletteInput.value = '';
  paletteInput.focus();
  buildCommandList(state.commands);
}

function closePalette() {
  paletteOverlay.classList.add('hidden');
  state.paletteOpen = false;
  viewer.focus();
}

function filterCommands(query) {
  const filtered = state.commands.filter(command => command.label.toLowerCase().includes(query.toLowerCase()));
  buildCommandList(filtered.length ? filtered : state.commands);
}

prevBtn.addEventListener('click', showPreviousImage);
nextBtn.addEventListener('click', showNextImage);
playBtn.addEventListener('click', toggleSlideshow);
closePaletteBtn.addEventListener('click', closePalette);

paletteInput.addEventListener('input', event => {
  filterCommands(event.target.value);
});

paletteInput.addEventListener('keydown', event => {
  const items = Array.from(document.querySelectorAll('.command-item'));
  const activeIndex = items.findIndex(item => item === document.activeElement);
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    const nextIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
    items[nextIndex]?.focus();
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    const prevIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
    items[prevIndex]?.focus();
  }
  if (event.key === 'Enter') {
    const firstItem = items[0];
    firstItem?.click();
  }
});

document.addEventListener('keydown', event => {
  if (event.ctrlKey && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openPalette();
    return;
  }

  if (state.paletteOpen && event.key === 'Escape') {
    closePalette();
    return;
  }

  if (event.key === 'Escape') {
    closeModal();
    return;
  }

  if (state.paletteOpen) return;

  if (event.key === 'ArrowRight') {
    showNextImage();
  }
  if (event.key === 'ArrowLeft') {
    showPreviousImage();
  }
  if (event.key === ' ') {
    event.preventDefault();
    toggleSlideshow();
  }
  if (/^[1-9]$/.test(event.key)) {
    const index = Number(event.key) - 1;
    if (index < images.length) {
      state.currentIndex = index;
      updateImage();
    }
  }
});

viewer.addEventListener('keydown', event => {
  if (event.key === 'Enter') openModal();
});

renderThumbnails();
updateImage();
