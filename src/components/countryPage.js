export const createCountryPage = () => {
  const main = document.createElement('div');
  main.id = 'country-page';
  main.classList = 'page-content';

  main.innerHTML = String.raw`
    <div class="content-container">
      <h1 class="page-title"></h1>
      <p class="page-intro"></p>
      <div class="country-info"></div>
    </div>
  `;
  return main;
};

// <div id="globe-container"></div>
