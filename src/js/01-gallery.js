import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryElement = document.querySelector('.gallery');

function createGalleryCard({ preview, original, description }) {
  return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
}

function createListMarkup(items) {
  return (galleryElement.innerHTML = items
    .map(item => createGalleryCard(item))
    .join(''));
}

function onImgClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  createLigthBoxView(event.target.dataset.source);
}

function createLigthBoxView(imageUrl) {
  const onKeyDown = event => {
    if (event.code === 'Escape') {
      instance.close();
    }
    console.log(event.key);
  };

  const instance = basicLightbox.create(
    `
    <img src="${imageUrl}" width="800" height="600">
`,
    {
      onShow: instance => {
        window.addEventListener('keydown', onKeyDown);
        document.body.classList.add('no-scroll');
      },
      onClose: instance => {
        window.removeEventListener('keydown', onKeyDown);
        document.body.classList.remove('no-scroll');
      },
    }
  );
  instance.show();
}

createListMarkup(galleryItems);
galleryElement.addEventListener('click', onImgClick);

// console.log(galleryItems);
