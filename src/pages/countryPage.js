import { createCountryPage } from '../components/countryPage.js';
import {
  countryNames,
  countryGeography,
  countryPopulation,
  countryFinancial,
} from './countryInformation.js';
import {
  getCountry,
  startLoading,
  endLoading,
  displayError,
} from './commonFunctions.js';

export const initCountryPage = async () => {
  startLoading();
  const root = document.querySelector('main');
  root.innerHTML = '';

  const countryPage = createCountryPage();
  root.appendChild(countryPage);

  const getURLCountry = new URLSearchParams(window.location.search).get(
    'country'
  );

  const countryData = await getCountry('', getURLCountry);

  const countryName = countryData[0].name.common;
  let countryFlag = countryData[0].flags.svg;

  if (countryName === 'Syria') {
    countryFlag =
      'https://upload.wikimedia.org/wikipedia/commons//5/54/Flag_of_Syria_%282025-%29.svg';
  }

  const mapContainer = document.createElement('div');
  mapContainer.id = 'country-map';
  root.prepend(mapContainer);

  const countryMap = L.map('country-map').setView(countryData[0].latlng, 5);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(countryMap);

  fetchCountryGeoJSON(countryName, countryData[0].cca2, countryMap);

  const pageTitle = document.querySelector('.page-title');
  const pageIntro = document.querySelector('.page-intro');
  const countryInfo = document.querySelector('.country-info');

  pageTitle.innerHTML = `<div class="country-flag"><img src="${countryFlag}" alt="${countryName} flag"></div>Welcome to ${countryName}`;
  pageIntro.innerHTML = `Discover general information about ${countryName}, including its geography, population, and key financial data. This page provides a concise summary to help you quickly learn about the country's key attributes and characteristics.`;

  const namesInfo = document.createElement('fieldset');
  namesInfo.innerHTML = await countryNames(countryData[0]);
  countryInfo.appendChild(namesInfo);

  const geographyInfo = document.createElement('fieldset');
  geographyInfo.innerHTML = await countryGeography(countryData[0]);
  countryInfo.appendChild(geographyInfo);

  const populationInfo = document.createElement('fieldset');
  populationInfo.innerHTML = await countryPopulation(countryData[0]);
  countryInfo.appendChild(populationInfo);

  const financialInfo = document.createElement('fieldset');
  financialInfo.innerHTML = await countryFinancial(countryData[0]);
  countryInfo.appendChild(financialInfo);

  endLoading();
};

async function fetchCountryGeoJSON(country, cca2, countryMap) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?country=${country}&countrycodes=${cca2}&format=geojson&polygon_geojson=1`
    );

    if (!response.ok) {
      throw new Error(response.status);
    }

    const data = await response.json();
    const geoJsonLayer = L.geoJson(data, {
      style: {
        fillColor: 'transparent',
        color: '#1e90ff',
        weight: 2,
        fillOpacity: 1,
      },
    }).addTo(countryMap);

    countryMap.fitBounds(geoJsonLayer.getBounds());
  } catch (error) {
    displayError(
      `<strong>An error occurred while fetching the map:</strong>${error}`
    );
  }
}
