import { fetchImages } from './js/pixabay-api.js';
import { displayError, displayWarning, renderGallery } from './js/render-functions.js';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const gallery = document.getElementById('gallery');
const loading = document.getElementById('loading');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
        displayError('Search field cannot be empty!');
        return;
    }

    loading.style.display = 'block';
    gallery.innerHTML = '';

    try {
        const hits = await fetchImages(query);

        if (hits.length === 0) {
            displayWarning('Sorry, there are no images matching your search query. Please try again!');
        } else {
            renderGallery(hits, gallery);
        }
    } catch (error) {
        displayError('Something went wrong. Please try again later.');
    } finally {
        loading.style.display = 'none';
    }
});