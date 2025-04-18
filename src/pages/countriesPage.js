import { createCountriesPage } from '../components/countriesPage.js';
import { createWorldMapGlobe } from './globe.js';
import { initCountryPage } from './countryPage.js';
import { setUrl, getCountry } from './commonFunctions.js';

let GLOBE_CONTROLLER;
export const initCountriesPage = async () => {
  const root = document.querySelector('main');
  root.innerHTML = '';

  const countriesPage = createCountriesPage();
  root.appendChild(countriesPage);

  GLOBE_CONTROLLER = createWorldMapGlobe();

  let countriesData;
  try {
    countriesData = await getCountry('name,flags,latlng,cca2');
    countriesData.sort((a, b) => a.name.common.localeCompare(b.name.common));
    createCountriesList(countriesData);
  } catch (error) {
    console.log(error.message);
  }

  const searchBox = document.querySelector('#search-box');
  let searchTimeOut;
  searchBox.addEventListener('input', () => {
    const searchValue = searchBox.value;
    clearTimeout(searchTimeOut);
    searchTimeOut = setTimeout(() => {
      createCountriesList(countriesData, searchValue);
    }, 500);
  });
};

async function createCountriesList(countriesData, searchKeyword = '') {
  const ul = document.querySelector('#countries-list');
  ul.innerHTML = '';

  countriesData.forEach((data) => {
    const countryName = data.name.common;
    const countryFlag = data.flags.svg;
    const countryLatLng = data.latlng;
    const countryCCA2 = data.cca2;

    const search = countryName
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());

    if (search || searchKeyword === '') {
      const li = document.createElement('li');
      li.innerHTML = `<span>${countryName}</span>`;

      li.dataset.cca2 = countryCCA2;
      li.dataset.lat = countryLatLng[0];
      li.dataset.long = countryLatLng[1];

      const flagContainer = document.createElement('div');
      flagContainer.classList.add('country-flag');
      const flag = document.createElement('img');

      countryName === 'Syria'
        ? (flag.src =
            'https://upload.wikimedia.org/wikipedia/commons//5/54/Flag_of_Syria_%282025-%29.svg')
        : (flag.src = countryFlag);

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

    country.addEventListener('click', () => {
      setUrl(country.dataset.cca2);
      initCountryPage();
    });
  });
}
