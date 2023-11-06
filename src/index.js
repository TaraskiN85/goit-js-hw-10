import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.headers.common['x-api-key'] =
  'live_BKttN3tIf9UHADmNzJ9kruccj2AlKOtRaSSXh0D93uTuzTPjkMU0n39y4nYVhmuI';
const catSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

let options, catData;

const fetchBreeds = () => {
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      catData = response.data;
      options = response.data
        .map(({ id, name }) => {
          return `<option value=${name} id=${id}>${name}</option>`;
        })
        .join('');
      catSelect.innerHTML = options;
      loader.classList.remove('loading');
      catSelect.classList.remove('is-hidden');
      new SlimSelect({
        select: '#breed-select',
      });
    })
    .catch(() => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`, {
        timeout: 1500,
        position: 'center-top',
        distance: '100px',
      });
      loader.classList.remove('loading');
    });
};

const catMarkup = cat => {
  const { name, description, alt_names } = cat.breeds[0];
  return `<h1 class='cat-title' >${name}</h1>
          <div class='description-container'>
            <p class='cat-description' >${description}</p>
            <img class='cat-image' src=${cat.url} alt="${alt_names}" />
          </div>`;
};

const fetchCatByBreed = breedId => {
  const breedUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  loader.classList.add('loading');

  axios
    .get(breedUrl)
    .then(response => {
      loader.classList.remove('loading');
      catSelect.classList.remove('is-hidden');
      catInfo.innerHTML = catMarkup(response.data[0]);
    })
    .catch(() => {
      loader.classList.remove('loading');
    });
};

const onCatSelect = event => {
  catInfo.innerHTML = '';
  const selectedCat = catData.find(cat => cat.name === event.target.value);
  if (selectedCat) {
    fetchCatByBreed(selectedCat.id);
  } else {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`, {
      timeout: 1500,
      position: 'center-top',
      distance: '100px',
    });
  }
};

fetchBreeds();
catSelect.addEventListener('change', onCatSelect);
