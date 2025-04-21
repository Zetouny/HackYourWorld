export const createHomePage = () => {
  const main = document.createElement('div');
  main.id = 'home-page';
  main.classList = 'page-content';

  main.innerHTML = String.raw`
    <div class="content-container">
      <h1 class="page-title">Welcome to HackYourWorld</h1>
      
      <p>Your one-stop destination for exploring countries around the globe! Instantly access key details about any country, all powered by up-to-date data. Start discovering the world today!</p>
      
      <div class="buttons-container">
        <button id="get-started">Get started!</button>
      </div>
    </div>

    <div id="globe-container">
      <canvas id="globe" width="500" height="500"></canvas>
    </div>
  `;
  return main;
};
