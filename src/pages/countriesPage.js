import { createCountriesPage } from '../components/countriesPage.js';
import { createWorldMapGlobe } from './globe.js';
import { getCountry } from './commonFunctions.js';

let GLOBE_CONTROLLER;
export const initCountriesPage = async () => {
  const root = document.querySelector('main');
  root.innerHTML = '';

  const countriesPage = createCountriesPage();
  root.appendChild(countriesPage);

  GLOBE_CONTROLLER = createWorldMapGlobe();

  let countriesData;
  let countriesPosition;
  try {
    countriesData = await getCountry('flag');
    countriesPosition = await getCountry('positions');
    createCountriesList(countriesData, countriesPosition);
  } catch (error) {
    console.log(error.message);
  }

  const searchBox = document.querySelector('#search-box');
  let searchTimeOut;
  searchBox.addEventListener('input', () => {
    const searchValue = searchBox.value;
    clearTimeout(searchTimeOut);
    searchTimeOut = setTimeout(() => {
      createCountriesList(countriesData, countriesPosition, searchValue);
    }, 500);
  });
};

async function createCountriesList(data, positions, searchKeyword = '') {
  const ul = document.querySelector('#countries-list');
  ul.innerHTML = '';

  const countriesData = data.data;
  const countriesPosition = positions.data;

  countriesData.forEach((data) => {
    const countryName = data.name;
    const countryFlag = data.flag;
    let countryIso2 = data.iso2;
    const search = countryName
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    if (search || searchKeyword === '') {
      const li = document.createElement('li');
      li.innerHTML = `<span>${countryName}</span>`;
      li.dataset.iso2 = countryIso2;

      const position = countriesPosition.filter((country) => {
        if (countryIso2 === 'GR') countryIso2 = 'EL'; // This line to fix a bug in the API for Greece ISO2 Code
        if (country.iso2 === countryIso2) return country;
      });

      li.dataset.lat = position[0].lat;
      li.dataset.long = position[0].long;

      const flagContainer = document.createElement('div');
      flagContainer.classList.add('country-flag');
      const flag = document.createElement('img');
      flag.src = countryFlag;

      flagContainer.appendChild(flag);
      li.prepend(flagContainer);
      ul.appendChild(li);
    }
  });

  const selectCountries = document.querySelectorAll('#countries-list li');
  selectCountries.forEach((country) => {
    country.addEventListener('mouseover', () => {
      GLOBE_CONTROLLER.updateFocus(country.dataset.lat, country.dataset.long);
      GLOBE_CONTROLLER.updateMarker(country.dataset.lat, country.dataset.long);
    });

    country.addEventListener('mouseout', () => {
      GLOBE_CONTROLLER.updateFocus();
      GLOBE_CONTROLLER.updateMarker();
    });
  });
}
