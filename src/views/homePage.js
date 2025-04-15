export const createHomePage = () => {
  const main = document.createElement('div');
  main.id = 'home-page';

  main.innerHTML = String.raw`
    <h1 class="page-title">HackYourWorld</h1>
    
    <p>Your one-stop destination for exploring countries around the globe! Instantly access key details about any country, all powered by daily updated data. Start discovering the world today!</p>
    <p><strong>Your mission:</strong> Hack the secrets of the world! Choose your weapon wisely</p>

    <div class="button-container">
      <a href="#" role="button">Hack My Location!</a>
      <a href="#" role="button">Browse Countries</a>
    </div>

    <div id="globe-container">
      <canvas id="globe" width="1000" height="1000"></canvas>
    </div>
  `;
  return main;
};
