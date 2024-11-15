document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

document.querySelectorAll('.expand-button').forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true' || false;
        button.setAttribute('aria-expanded', !expanded);
        const content = document.getElementById(button.getAttribute('aria-controls'));
        content.classList.toggle('open');
    });
});

const images = [
    {
        src: 'https://via.placeholder.com/600x400',
        alt: 'Imagem de exemplo 1',
        description: 'Esta é uma descrição detalhada da imagem 1'
    },
    {
        src: 'https://via.placeholder.com/600x400',
        alt: 'Imagem de exemplo 2',
        description: 'Esta é uma descrição detalhada da imagem 2'
    },
    {
        src: 'https://via.placeholder.com/600x400',
        alt: 'Imagem de exemplo 3',
        description: 'Esta é uma descrição detalhada da imagem 3'
    }
];

const gallery = document.getElementById('imageGallery');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalDescription = document.getElementById('modalDescription');
let currentScale = 1;

function createImageCard(image) {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `
        <div class="image-container">
            <img src="${image.src}" alt="${image.alt}">
        </div>
        <div class="image-description">${image.description}</div>
    `;
    card.onclick = () => openModal(image);
    return card;
}

function openModal(image) {
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalDescription.textContent = image.description;
    modal.style.display = 'block';
    currentScale = 1;
    updateImageScale();
}

function closeModal() {
    modal.style.display = 'none';
}

function zoomImage(delta) {
    currentScale = Math.max(1, Math.min(currentScale + delta, 3));
    updateImageScale();
}

function updateImageScale() {
    modalImage.style.transform = `translate(-50%, -50%) scale(${currentScale})`;
}

images.forEach(image => {
    gallery.appendChild(createImageCard(image));
});

window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Adicionar suporte para fechar o modal com a tecla Esc
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});