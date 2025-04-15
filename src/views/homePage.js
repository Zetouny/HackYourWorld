export const createHomePage = () => {
  const main = document.createElement('div');
  main.id = 'home-page';

  main.innerHTML = String.raw`
    <h1 class="page-title">HackYourWorld</h1>
    
    <div id="globe-container">
      <canvas id="globe" width="1000" height="1000"></canvas>
    </div>
  `;
  return main;
};
