import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const displayError = (message) => {
    iziToast.error({
        title: 'Error',
        message,
    });
};

export const displayWarning = (message) => {
    iziToast.warning({
        title: 'No results',
        message,
    });
};

export const renderGallery = (hits, gallery) => {
    hits.forEach(hit => {
        const card = document.createElement('a');
        card.classList.add('card');
        card.href = hit.largeImageURL;
        card.dataset.caption = `
            <p>Likes: ${hit.likes}</p>
            <p>Views: ${hit.views}</p>
            <p>Comments: ${hit.comments}</p>
            <p>Downloads: ${hit.downloads}</p>
        `;
        card.innerHTML = `
            <img src="${hit.webformatURL}" alt="${hit.tags}">
            <div class="card-info">${hit.tags}</div>
        `;
        gallery.appendChild(card);
    });

    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'data-caption',
        captionDelay: 250
    });

    lightbox.refresh();
};
