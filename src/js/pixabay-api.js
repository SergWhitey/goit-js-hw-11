import axios from 'axios';

const API_KEY = '45735019-5668e0368fbdb80eca42c52b3';
const API_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query) => {
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
        return response.data.hits;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
};
