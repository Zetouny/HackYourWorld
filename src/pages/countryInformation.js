import { displayError } from './commonFunctions.js';

export async function countryNames(countryData) {
  const officialName = countryData?.name?.official ?? '-';
  const officialNameNative =
    countryData?.name?.nativeName[Object.keys(countryData?.name?.nativeName)[0]]
      ?.official ?? '-';
  const commonName = countryData?.name?.common ?? '-';
  const commonNameNative =
    countryData?.name?.nativeName[Object.keys(countryData.name.nativeName)[0]]
      ?.common ?? '-';
  const alternativeSpellings = countryData?.altSpellings.join(', ') ?? '-';
  const otherLanguages = countryData.translations
    ? await getCountryNameInLanguages(countryData.translations)
    : 'None';

  return String.raw`
  <legend>🏳️ Country Names</legend>
  <div class="info-grid">
    <h4>Official Name</h4> <span>${officialName}</span>
    <h4>Official Name <em>(Native)</em></h4> <span>${officialNameNative}</span>
    <h4>Common Name</h4> <span>${commonName}</span>
    <h4>Common Name <em>(Native)</em></h4> <span>${commonNameNative}</span>
    <h4>Alternative Spellings</h4> <span>${alternativeSpellings}</span>
    <details>
      <summary>Common name in other languages</h4></summary>
      <div class='info-grid'>${otherLanguages}</div>
    </details>
  </div>
  `;
}

export async function countryGeography(countryData) {
  const capital = countryData.capital ?? '-';
  const continents = countryData?.continents.join(', ') ?? '-';
  const surfaceArea = countryData?.area.toLocaleString() ?? '-';
  const timeZone = countryData?.timezones ?? '-';
  const coordinates = countryData?.latlng.join(', ') ?? '-';
  const borders = countryData.borders
    ? await getCountryBorders(countryData.borders)
    : 'None';

  return String.raw`
  <legend>🌍 Geography</legend>
  <div class="info-grid">
    <h4>Capital</h4> <span>${capital}</span>
    <h4>Continents</h4> <span>${continents}</span>
    <h4>Surface Area</h4> <span>${surfaceArea} km²</span>
    <h4>Time Zone</h4> <span>${timeZone}</span>
    <h4>Coordinates</h4> <span><a href="https://www.google.com/maps/place/${countryData?.name?.common}" target="_new">[${coordinates}]</a></span>
    <h4>Borders</h4> <span>${borders}</span>
  </div>
  `;
}

export async function countryPopulation(countryData) {
  const countryCCA3 = countryData.cca3;

  const getTotalPopulation = await getRecentPopulationInfo(
    countryCCA3,
    'SP.POP.TOTL'
  );

  const getMalePercentage = await getRecentPopulationInfo(
    countryCCA3,
    'SP.POP.TOTL.MA.ZS'
  );
  const getFemalePercentage = await getRecentPopulationInfo(
    countryCCA3,
    'SP.POP.TOTL.FE.ZS'
  );
  const getAge014Percentage = await getRecentPopulationInfo(
    countryCCA3,
    'SP.POP.0014.TO.ZS'
  );
  const getAge1564Percentage = await getRecentPopulationInfo(
    countryCCA3,
    'SP.POP.1564.TO.ZS'
  );
  const getAge65Percentage = await getRecentPopulationInfo(
    countryCCA3,
    'SP.POP.65UP.TO.ZS'
  );
  const getPopulationDensity = await getRecentPopulationInfo(
    countryCCA3,
    'EN.POP.DNST'
  );
  const getLifeExpectancy = await getRecentPopulationInfo(
    countryCCA3,
    'SP.DYN.LE00.IN'
  );

  const totalPopulationDate = getTotalPopulation[1]?.[0]?.date ?? '-';

  const totalPopulation =
    getTotalPopulation[1]?.[0]?.value.toLocaleString() ?? 'Unknown';

  const malePercentage =
    getMalePercentage[1]?.[0]?.value.toLocaleString() ?? 'Unknown';

  const femalePercentage =
    getFemalePercentage[1]?.[0]?.value.toLocaleString() ?? 'Unknown';

  const age014Percentage =
    getAge014Percentage[1]?.[0]?.value.toLocaleString() ?? 'Unknown';

  const age1564Percentage =
    getAge1564Percentage[1]?.[0]?.value.toLocaleString() ?? 'Unknown';

  const age65Percentage =
    getAge65Percentage[1]?.[0]?.value.toLocaleString() ?? 'Unknown';

  const populationDensity =
    getPopulationDensity[1]?.[0]?.value.toLocaleString() ?? 'Unknown';

  const lifeExpectancy =
    getLifeExpectancy[1]?.[0]?.value.toLocaleString() ?? 'Unknown';

  return String.raw`
    <legend>👨‍👩‍👧‍👦 Population</legend>
    <div class="info-grid">
      <h4>Total Population <em>(${totalPopulationDate})</em></h4> <span>${totalPopulation}</span>
      <h4>Male <em>(% of total population)</em></h4> <span>${malePercentage}%</span>
      <h4>Female <em>(% of total population)</em></h4> <span>${femalePercentage}%</span>
      <h4>Population ages 0-14 <em>(% of total population)</em></h4> <span>${age014Percentage}%</span>
      <h4>Population ages 15-64 <em>(% of total population)</em></h4> <span>${age1564Percentage}%</span>
      <h4>Population ages 65 and above <em>(% of total population)</em></h4> <span>${age65Percentage}%</span>
      <h4>Population density <em>(people per sq. km of land area)</em></h4> <span>${populationDensity}</span>
      <h4>Life expectancy at birth</h4> <span>${lifeExpectancy} Years</span>
    </div>
    `;
}

export async function countryFinancial(countryData) {
  const countryCCA3 = countryData?.cca3 ?? '-';
  const currency =
    countryData?.currencies[Object.keys(countryData.currencies) ?? '-'];

  const getExchangeRate = await getRecentPopulationInfo(
    countryCCA3,
    'PA.NUS.FCRF'
  );

  const exchangeRateDate = getExchangeRate[1]?.[0]?.date ?? '-';
  const exchangeRate = getExchangeRate[1]?.[0]?.value ?? 'Unknown';

  const getTotalReserves = await getRecentPopulationInfo(
    countryCCA3,
    'FI.RES.TOTL.CD'
  );

  const totalReservesDate = getTotalReserves[1]?.[0]?.date ?? '-';
  const totalReserves =
    getTotalReserves[1]?.[0]?.value.toLocaleString() ?? 'Unknown';

  return String.raw`
    <legend>💵 Financial</legend>
    <div class="info-grid">
      <h4>Currency Name & Symbol</h4> <span>${currency.name} (${currency.symbol})</span>
      <h4>Official exchange rate <em>(${exchangeRateDate})</em><br><em>(LCU per US$, period average)</em></h4> <span>${exchangeRate}</span>
      <h4>Total reserves <em>(${totalReservesDate}) (includes gold, current US$)</em></h4> <span>${totalReserves}</span>
    </div>
    `;
}

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
  let countryBorders = [];
  for (const cca3 of country) {
    const html = `<a href='?country=${cca3}'>${await cca3ToName(cca3)}</a>`;
    countryBorders.push(html);
  }

  return countryBorders.join(', ');
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
