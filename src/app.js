import { initCountriesPage } from './pages/countriesPage.js';
import { initHomePage } from './pages/homePage.js';

function main() {
  const getURLCountry = new URLSearchParams(window.location.search).get(
    'country'
  );

  if (getURLCountry) {
    if (getURLCountry == 'All') {
      initCountriesPage();
    } else {
    }
  } else {
    initHomePage();
  }
}

window.addEventListener('load', main);
window.addEventListener('popstate', main); // Listen to browser's back & forward history buttons
