import { initCountriesPage } from './pages/countriesPage.js';
import { initCountryPage } from './pages/countryPage.js';
import { initHomePage } from './pages/homePage.js';

function main() {
  const getURLCountry = new URLSearchParams(window.location.search).get(
    'country'
  );

  if (getURLCountry) {
    if (getURLCountry.toLowerCase() == 'all') {
      initCountriesPage();
    } else {
      initCountryPage(getURLCountry);
    }
  } else {
    initHomePage();
  }

  const menuToggle = document.querySelector('#toggle-menu');
  menuToggle.addEventListener('click', toggleMenu);
}

function toggleMenu() {
  const menu = document.querySelector('#nav-links');
  console.log('clicked');

  if (menu.classList == '') {
    menu.classList.add('visible');
  } else {
    menu.classList.remove('visible');
  }
}

window.addEventListener('load', main);
window.addEventListener('popstate', main); // Listen to browser's back & forward history buttons
const L_NO_TOUCH = true;
