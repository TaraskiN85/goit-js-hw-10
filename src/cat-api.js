import axios from 'axios';

export const fetchCatByBreed = breedId => {
  const breedUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(breedUrl).then(response => response.data);
};

export const fetchBreeds = () => {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data);
};
