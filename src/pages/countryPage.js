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

  // General Information:
  // Country Flag - Country Name
  // Capital
  // Languages
  // Dial Code
  // Time Zone

  // Land:
  // Continents
  // Lat, Long
  // Map ???
  // Surface Area (https://data.worldbank.org/indicator/AG.SRF.TOTL.K2)

  // Population:
  // Population, total (https://data.worldbank.org/indicator/SP.POP.TOTL) || Population, male (% of total population) (https://data.worldbank.org/indicator/SP.POP.TOTL.MA.ZS) || Population, female (% of total population) (https://data.worldbank.org/indicator/SP.POP.TOTL.FE.ZS)
  // Population ages 0-14 (% of total population) (https://data.worldbank.org/indicator/SP.POP.0014.TO.ZS) || Population ages 15-64 (% of total population) (https://data.worldbank.org/indicator/SP.POP.1564.TO.ZS) || Population ages 65 and above (% of total population) (https://data.worldbank.org/indicator/SP.POP.65UP.TO.ZS)
  // Population density (https://data.worldbank.org/indicator/EN.POP.DNST)
  // Life expectancy at birth (https://data.worldbank.org/indicator/SP.DYN.LE00.IN)

  // Financial:
  // Currency Name & Symbol
  // Official exchange rate (LCU per US$, period average) (https://data.worldbank.org/indicator/PA.NUS.FCRF)
  // Total reserves (includes gold, current US$) (https://data.worldbank.org/indicator/FI.RES.TOTL.CD)
};
