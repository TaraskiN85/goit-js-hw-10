import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_BKttN3tIf9UHADmNzJ9kruccj2AlKOtRaSSXh0D93uTuzTPjkMU0n39y4nYVhmuI';
const catSelect = document.querySelector('.breed-select');
const loadingMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

let options, catData, selectedCatInfo;
// console.log(catSelect.nextElementSibling.textContent);

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
      // console.log(catSelect);
      loadingMessage.classList.add('is-hidden');
      catSelect.classList.remove('is-hidden');
      new SlimSelect({
        select: '#breed-select',
      });
    })
    .catch(() => {
      console.log('first');
      errorMessage.classList.remove('is-hidden');
      loadingMessage.classList.add('is-hidden');
    });
};

const catMarkup = cat => {
  const { name, description, alt_names } = cat.breeds[0];
  return `<h1 class='cat-title' >${name}</h1>
          <div class='description-container'>
            <img class='cat-image' src=${cat.url} alt="${alt_names}" />
            <p class='cat-description' >${description}</p>
          </div>`;
};

const fetchCatByBreed = breedId => {
  const breedUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  loadingMessage.classList.remove('is-hidden');

  axios
    .get(breedUrl)
    .then(response => {
      loadingMessage.classList.add('is-hidden');
      catSelect.classList.remove('is-hidden');
      const selectedCatInfo = response.data[0];
      console.log(selectedCatInfo);
      catInfo.innerHTML = catMarkup(selectedCatInfo);
    })
    .catch(() => {
      loadingMessage.classList.add('is-hidden');
      errorMessage.classList.remove('is-hidden');
    });
};

const onCatSelect = event => {
  catInfo.innerHTML = '';
  const selectedCat = catData.find(cat => cat.name === event.target.value);
  if (selectedCat) {
    fetchCatByBreed(selectedCat.id);
    errorMessage.classList.add('is-hidden');
  } else {
    errorMessage.classList.remove('is-hidden');
  }
};

fetchBreeds();
catSelect.addEventListener('change', onCatSelect);
