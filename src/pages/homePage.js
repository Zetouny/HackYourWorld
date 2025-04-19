import { createHomePage } from '../components/homePage.js';
import { initCountriesPage } from './countriesPage.js';
import { createWorldMapGlobe } from './globe.js';
import { initCountryPage } from './countryPage.js';
import { setUrl, getUserLocation, getCountry } from './commonFunctions.js';

let GLOBE_CONTROLLER, GLOBE_INTERVAL;
export const initHomePage = () => {
  const root = document.querySelector('main');
  root.innerHTML = '';

  const homePage = createHomePage();
  root.appendChild(homePage);

  GLOBE_CONTROLLER = createWorldMapGlobe();

  const getStartedBtn = document.querySelector('#get-started');
  getStartedBtn.addEventListener('click', getStarted);
};

async function getStarted() {
  try {
    const ipToLocation = await getUserLocation();
    const getUserCountry = await getCountry(
      'name,latlng',
      ipToLocation.country
    );

    randomLocations();

    const buttonsContainer = document.querySelector('.buttons-container');
    buttonsContainer.querySelector('#get-started').classList.add('animate-out');

    const hacking = document.createElement('p');

    await animateText(
      hacking,
      '<h2 class="colored">Hacking into your location...</h2>',
      'in-out',
      1500
    );
    buttonsContainer.before(hacking);
    await animateText(
      hacking,
      '<h2 class="colored">Deploying satellites...</h2>',
      'in-out',
      3000
    );

    await animateText(
      hacking,
      '<h2 class="colored">Cracking firewalls...</h2>',
      'in-out',
      3000
    );

    await animateText(
      hacking,
      '<h2 class="colored">Just kidding!</h2>',
      'in-out',
      3000
    );

    await animateText(
      hacking,
      `<h2 class="colored">Gotcha! You’re in ${getUserCountry.name.common}!</h2>
    But don’t worry, we’re friendly hackers. Click below to uncover everything about your country, or explore the secrets of the world!`,
      'in',
      3000
    );

    buttonsContainer.innerHTML = '';
    await animateText(
      buttonsContainer,
      '<button id="hack-my-location">Hack My Location!</button><button id="hack-the-world">Hack The World!</button>',
      'in',
      0
    );

    randomLocations(getUserCountry.latlng);

    const hackMyLocation = document.querySelector('#hack-my-location');
    hackMyLocation.addEventListener('click', async () => {
      setUrl(ipToLocation.country);
      initCountryPage();
    });

    const hackTheWorld = document.querySelector('#hack-the-world');
    hackTheWorld.addEventListener('click', () => {
      setUrl();
      initCountriesPage();
    });
  } catch (error) {
    console.log('Error:', error.message);
  }
}

function animateText(element, text, animationType, duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      element.classList.remove('animate-in-out');
      element.innerHTML = text;
      void element.offsetWidth;
      element.classList.add(`animate-${animationType}`);
      resolve();
    }, duration);
  });
}

function randomLocations(latlng) {
  if (latlng) {
    clearInterval(GLOBE_INTERVAL);
    GLOBE_CONTROLLER.updateFocus(latlng[0], latlng[1]);
    GLOBE_CONTROLLER.updateMarker(latlng[0], latlng[1]);
  } else {
    GLOBE_INTERVAL = setInterval(() => {
      const randomLat = Math.random() * 180 - 90;
      const randomLong = Math.random() * 360 - 180;
      GLOBE_CONTROLLER.updateFocus(randomLat, randomLong);
      GLOBE_CONTROLLER.updateMarker(randomLat, randomLong);
    }, 750);
  }
}
