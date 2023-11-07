import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCatByBreed, fetchBreeds } from './cat-api';
import showError from './helper';

axios.defaults.headers.common['x-api-key'] =
  'live_BKttN3tIf9UHADmNzJ9kruccj2AlKOtRaSSXh0D93uTuzTPjkMU0n39y4nYVhmuI';
const catSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

let catData;

const catMarkup = cat => {
  const { name, description, alt_names } = cat.breeds[0];
  return `<h1 class='cat-title' >${name}</h1>
          <div class='description-container'>
            <p class='cat-description' >${description}</p>
            <img class='cat-image' src=${cat.url} alt="${alt_names}" />
          </div>`;
};

fetchBreeds()
  .then(data => {
    catData = data;
    catSelect.innerHTML = data
      .map(({ id, name }) => {
        return `<option value=${name} id=${id}>${name}</option>`;
      })
      .join('');
    loader.classList.remove('loading');
    catSelect.classList.remove('is-hidden');
    new SlimSelect({
      select: '#breed-select',
    });
  })
  .catch(() => {
    loader.classList.remove('loading');
    showError(`Oops! Something went wrong! Try reloading the page!`);
  });

const onCatSelect = event => {
  catInfo.innerHTML = '';
  const selectedCat = catData.find(cat => cat.name === event.target.value);
  if (selectedCat) {
    loader.classList.add('loading');
    fetchCatByBreed(selectedCat.id)
      .then(data => {
        loader.classList.remove('loading');
        catInfo.innerHTML = catMarkup(data[0]);
      })
      .catch(() => {
        loader.classList.remove('loading');
        showError(`Oops! Something went wrong! Try reloading the page!`);
      });
  } else {
    showError(`Oops! Something went wrong! Try another breed!`);
  }
};

catSelect.addEventListener('change', onCatSelect);
