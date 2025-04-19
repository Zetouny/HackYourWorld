export const createCountriesPage = () => {
  const main = document.createElement('div');
  main.id = 'countries-page';
  main.classList = 'page-content';

  main.innerHTML = String.raw`
    <div class="content-container">
      <h1 class="page-title">HackYourWorld</h1>
      
      <p>Explore and choose your country from the list provided below. To make finding your country faster and easier, you can use the search box to type the name of your country and quickly locate it.</p>
      
      <input id="search-box" type="text" placeholder="Search for a country" autocomplete="off">
      <ul id="countries-list"></ul>
    </div>

    <div id="globe-container">
      <canvas id="globe" width="500" height="500"></canvas>
    </div>
  `;
  return main;
};
