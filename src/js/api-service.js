const BASE_URL = 'https://pixabay.com';
const API_KEY = '24164302-3681b8365083488cf2ea75540';

export default class ImgApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}/api/??image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
