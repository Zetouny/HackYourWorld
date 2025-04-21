export function setUrl(country = 'All') {
  const url = new URL(window.location);
  url.searchParams.set('country', country);
  window.history.pushState({}, '', url);
}

export async function getUserLocation() {
  try {
    const response = await fetch('https://api.country.is/');

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  } catch (error) {
    displayError(
      `<strong>An error occurred while allocating the user's country:</strong>${error}`
    );
  }
}

export async function getCountry(request, country) {
  try {
    const url = 'https://restcountries.com/v3.1';

    let response;
    if (!country) {
      response = await fetch(`${url}/all?fields=${request}`);
    } else {
      response = await fetch(`${url}/alpha/${country}?fields=${request}`);
    }

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  } catch (error) {
    displayError(
      `<strong>An error occurred while fetching all countries:</strong>${error}`
    );
  }
}

export function loadingStart() {
  const appStatus = document.querySelector('#app-status');
  appStatus.innerHTML = '<div>Loading...</div><div class="loader"></div>';
  appStatus.classList = 'loading';
}

export function loadingEnd() {
  const appStatus = document.querySelector('#app-status');
  appStatus.innerHTML = '';
  appStatus.classList = '';
}

export function displayError(error) {
  const appStatus = document.querySelector('#app-status');
  appStatus.innerHTML = `${error}`;
  appStatus.innerHTML += String.raw`
    <div class='buttons-container'>
      <button id="go-back">Go Back</button>
      <button id="try-again">Refresh</button>
    </div>`;
  appStatus.classList = 'error';

  document.querySelector('#go-back').addEventListener('click', () => {
    history.back();
  });
  document.querySelector('#try-again').addEventListener('click', () => {
    location.reload();
  });
}
