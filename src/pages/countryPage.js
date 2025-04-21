import { createCountryPage } from '../components/countryPage.js';
import { getCountry, loadingStart, loadingEnd } from './commonFunctions.js';

export const initCountryPage = async () => {
  loadingStart();
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

  namesInfo.innerHTML = String.raw`
    <legend>🏳️ Country Names</legend>
    <div class="info-grid">
      <h4>Official Name</h4> <span>${countryData[0].name.official}</span>
      <h4>Official Name <em>(Native)</em></h4> <span>${countryData[0].name.nativeName[Object.keys(countryData[0].name.nativeName)[0]].official}</span>
      <h4>Common Name</h4> <span>${countryData[0].name.common}</span>
      <h4>Common Name <em>(Native)</em></h4> <span>${countryData[0].name.nativeName[Object.keys(countryData[0].name.nativeName)[0]].common}</span>
      <h4>Alternative Spellings</h4> <span>${countryData[0].altSpellings.join(', ')}</span>
      <details>
        <summary>Common name in other languages</h4></summary>
        <div class='info-grid'>${await getCountryNameInLanguages(countryData[0].translations)}</div>
      </details>
    </div>
    `;
  countryInfo.appendChild(namesInfo);

  const geographyInfo = document.createElement('fieldset');
  geographyInfo.innerHTML = String.raw`
    <legend>🌍 Geography</legend>
    <div class="info-grid">
      <h4>Capital</h4> <span>${countryData[0].capital}</span>
      <h4>Continents</h4> <span>${countryData[0].continents}</span>
      <h4>Surface Area</h4> <span>${countryData[0].area.toLocaleString()} km²</span>
      <h4>Time Zone</h4> <span>${countryData[0].timezones}</span>
      <h4>Coordinates</h4> <span>[${countryData[0].latlng.join(', ')}]</span>
      <h4>Borders</h4> <span>${await getCountryBorders(countryData[0].borders)}</span>
    </div>
    `;
  countryInfo.appendChild(geographyInfo);

  const populationInfo = document.createElement('fieldset');
  const totalPopulation = await getRecentPopulationInfo(
    countryData[0].cca3,
    'SP.POP.TOTL'
  );
  const malePercentage = await getRecentPopulationInfo(
    countryData[0].cca3,
    'SP.POP.TOTL.MA.ZS'
  );
  const femalePercentage = await getRecentPopulationInfo(
    countryData[0].cca3,
    'SP.POP.TOTL.FE.ZS'
  );
  const age014Percentage = await getRecentPopulationInfo(
    countryData[0].cca3,
    'SP.POP.0014.TO.ZS'
  );
  const age1564Percentage = await getRecentPopulationInfo(
    countryData[0].cca3,
    'SP.POP.1564.TO.ZS'
  );
  const age65Percentage = await getRecentPopulationInfo(
    countryData[0].cca3,
    'SP.POP.65UP.TO.ZS'
  );
  const populationDensity = await getRecentPopulationInfo(
    countryData[0].cca3,
    'EN.POP.DNST'
  );
  const lifeExpectancy = await getRecentPopulationInfo(
    countryData[0].cca3,
    'SP.DYN.LE00.IN'
  );

  populationInfo.innerHTML = String.raw`
    <legend>👨‍👩‍👧‍👦 Population</legend>
    <div class="info-grid">
      <h4>Total Population <em>(${totalPopulation[1][0].date})</em></h4> <span>${totalPopulation[1][0].value.toLocaleString()}</span>
      <h4>Male <em>(% of total population)</em></h4> <span>${malePercentage[1][0].value.toLocaleString()}%</span>
      <h4>Female <em>(% of total population)</em></h4> <span>${femalePercentage[1][0].value.toLocaleString()}%</span>
      <h4>Population ages 0-14 <em>(% of total population)</em></h4> <span>${age014Percentage[1][0].value.toLocaleString()}%</span>
      <h4>Population ages 15-64 <em>(% of total population)</em></h4> <span>${age1564Percentage[1][0].value.toLocaleString()}%</span>
      <h4>Population ages 65 and above <em>(% of total population)</em></h4> <span>${age65Percentage[1][0].value.toLocaleString()}%</span>
      <h4>Population density <em>(people per sq. km of land area)</em></h4> <span>${populationDensity[1][0].value.toLocaleString()}</span>
      <h4>Life expectancy at birth</h4> <span>${lifeExpectancy[1][0].value.toLocaleString()} Years</span>
    </div>
    `;
  countryInfo.appendChild(populationInfo);

  const financialInfo = document.createElement('fieldset');
  const currency =
    countryData[0].currencies[Object.keys(countryData[0].currencies)];

  const exchangeRate = await getRecentPopulationInfo(
    countryData[0].cca3,
    'PA.NUS.FCRF'
  );

  const totalReserves = await getRecentPopulationInfo(
    countryData[0].cca3,
    'FI.RES.TOTL.CD'
  );

  financialInfo.innerHTML = String.raw`
    <legend>💵 Financial</legend>
    <div class="info-grid">
      <h4>Currency Name & Symbol</h4> <span>${currency.name} (${currency.symbol})</span>
      <h4>Official exchange rate <em>(${exchangeRate[1][0].date})</em><br><em>(LCU per US$, period average)</em></h4> <span>${exchangeRate[1][0].value}</span>
      <h4>Total reserves <em>(${totalReserves[1][0].date}) (includes gold, current US$)</em></h4> <span>${totalReserves[1][0].value.toLocaleString()}</span>
    </div>
    `;
  countryInfo.appendChild(financialInfo);

  loadingEnd();
  // General Information:
  // Languages
  // Dial Code
};

async function getCountryNameInLanguages(data) {
  const languages = await getAllLanguages();

  let output = '';
  for (const lang in data) {
    if (languages[lang]) {
      output += `<h4>${languages[lang]}</h4><span>${data[lang].common}</span>`;
    }
  }

  return output;
}

async function getAllLanguages() {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/all?fields=languages`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }

    const responseJson = await response.json();

    const languages = responseJson.reduce((acc, lang) => {
      Object.assign(acc, lang.languages);
      return acc;
    }, {});

    return languages;
  } catch (error) {
    displayError(
      `<strong>An error occurred while getting world languages:</strong>${error}`
    );
  }
}

async function getCountryBorders(country) {
  let output = [];
  for (const cca3 of country) {
    output.push(await cca3ToName(cca3));
  }

  return output.join(', ');
}

async function cca3ToName(cca3) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${cca3}?fields=name`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }

    const responseJson = await response.json();
    return responseJson.name.common;
  } catch (error) {
    displayError(
      `<strong>An error occurred while getting the country's name:</strong>${error}`
    );
  }
}

async function getRecentPopulationInfo(country, param) {
  try {
    const response = await fetch(
      `https://api.worldbank.org/v2/country/${country}/indicator/${param}?format=json&mrnev=1`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }

    return await response.json();
  } catch (error) {
    displayError(
      `<strong>An error occurred while getting the country's population:</strong>${error}`
    );
  }
}

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
