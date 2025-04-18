export function setUrl(country = 'All') {
  const url = new URL(window.location);
  url.searchParams.set('country', country);
  window.history.pushState({}, '', url);
}

export async function getUserLocation() {
  const response = await fetch('https://api.country.is/');

  if (!response.ok) {
    throw new Error(response);
  }

  return response.json();
}

export async function getCountry(request, country) {
  let response, param;
  const fetchConfig = country
    ? {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ iso2: country }),
        redirect: 'follow',
      }
    : null;

  if (request === 'flag') {
    param = 'flag/images';
  } else if (request === 'positions') {
    param = 'positions';
  }

  response = await fetch(
    `https://countriesnow.space/api/v0.1/countries/${param}`,
    fetchConfig
  );

  if (!response.ok) {
    throw new Error(response);
  }

  return response.json();
}

export function displayError(error) {}
