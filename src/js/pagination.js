import ImgApiServise from './api-service';
import imagesMarkup from '../templates/images_markup.hbs';
import LoadMoreBTN from './load-more-btn';
import openModal from './lightBox';
import '@pnotify/core/dist/BrightTheme.css';
import { alert } from '@pnotify/core';
import getRefs from './getRefs';
const refs = getRefs();
const imgApiServise = new ImgApiServise();
const loadMoreBtn = new LoadMoreBTN({ selector: '[data-action="load-more"]', hidden: true });

refs.searchForm.addEventListener('input', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
refs.cardContainer.addEventListener('click', openModal);

function onSearch(event) {
  event.preventDefault();
  imgApiServise.query = event.currentTarget.elements.query.value;
  if (imgApiServise.query.length >= 2) {
    loadMoreBtn.show();
    imgApiServise.resetPage();
    clearArticlesContainer();
    fetchArticles();
  } else {
    clearArticlesContainer();
    loadMoreBtn.hide();
  }
}

function fetchArticles() {
  loadMoreBtn.disable();
  imgApiServise
    .fetchArticles()
    .then(hits => {
      appendArticlesleMarkup(hits);
      loadMoreBtn.enable();
    })
    .catch(onFetchError);
}

function appendArticlesleMarkup(hits) {
  refs.cardContainer.insertAdjacentHTML('beforeend', imagesMarkup(hits));
}

function clearArticlesContainer() {
  refs.cardContainer.innerHTML = '';
}

function onFetchError(error) {
  alert({
    title: false,
    text: 'Oops, we have a problem',
    shadow: true,
    sticker: false,
    delay: 3000,
  });
}
