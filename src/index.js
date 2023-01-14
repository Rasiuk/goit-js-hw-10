import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;
let countryName = '';
let countries = [];

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
// fetchCountries('ukraine').then(country => createMarcupInfo(country));
function createMarcupInfo(country) {
  const marcup = country
    .map(
      ({ name: official, flags: { svg }, capital, population, languages }) =>
        `
   <div style="display: flex; align-items: center" >
  <img style="display: inline-block; margin-right: 10px" src="${svg}" alt="${official}", width="30", height="20"  
  />
  <h2>${official}</h2>
</div>
<p>Capital: ${capital}</p>
<p>Population:${population}</p>
<p>languages:${languages[0].name} </p>


    `
    )
    .join('');
  refs.countryInfo.style.display = 'inline-block';
  refs.countryList.innerHTML = marcup;
}
function createMarcupList(country) {
  const marcup = country
    .map(
      ({ name, flags: { svg } }) =>
        `
    <div style="display: flex; align-items: center">
  <img style="display: inline-block; margin-right: 10px" src=${svg} alt=${name} width="30", height="20"/>
   <h3 class="country-title">${name}</h3>
</div>
    `
    )
    .join('');
  refs.countryList.innerHTML = marcup;
}

function onInput(evt) {
  countryName = evt.target.value.trim();
  console.log(countryName);
  if (countryName === '') {
    clearPage();
    return;
  }

  fetchCountries(countryName)
    .then(response => {
      if (response.length >= 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (response.length > 2 < 10) {
        createMarcupList(response);
      }
      if (response.length === 1) {
        createMarcupInfo(response);
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function clearPage() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
// function error() {
//   Notify.failure('Oops, there is no country with that name');
// }
// function toManyCountries() {
//   Notify.info('Too many matches found. Please enter a more specific name.');
// }
