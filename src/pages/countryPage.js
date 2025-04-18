import { createCountryPage } from '../components/countryPage.js';
import { getCountry } from './commonFunctions.js';

export const initCountryPage = async () => {
  const root = document.querySelector('main');
  root.innerHTML = '';

  const countryPage = createCountryPage();
  root.appendChild(countryPage);

  const getURLCountry = new URLSearchParams(window.location.search).get(
    'country'
  );

  // Country Flag - Country Name
  //
};
