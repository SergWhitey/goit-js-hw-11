import axios from 'axios';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '45735019-5668e0368fbdb80eca42c52b3';
const API_URL = 'https://pixabay.com/api/';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loading = document.getElementById('loading');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
        iziToast.error({
            title: 'Error',
            message: 'Search field cannot be empty!',
        });
        return;
    }

    loading.style.display = 'block';
    gallery.innerHTML = '';

    try {
        const response = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            }
        });

        const { hits } = response.data;

        if (hits.length === 0) {
            iziToast.warning({
                title: 'No results',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
        } else {
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
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Something went wrong. Please try again later.',
        });
    } finally {
        loading.style.display = 'none';
    }
});