export const createHomePage = () => {
  const main = document.createElement('div');
  main.id = 'home-page';

  main.innerHTML = String.raw`
    <div class="content-container">
      <h1 class="page-title">HackYourWorld</h1>
      
      <p>Your one-stop destination for exploring countries around the globe! Instantly access key details about any country, all powered by up-to-date data. Start discovering the world today!</p>
      <p><strong>Hacking into your location...</strong> <br> <em>(Deploying satellites, cracking firewalls... just kidding!)</em></p>

      <p><strong>Gotcha! You’re in [Country Name]!</strong> <br> But don’t worry, we’re friendly hackers. Click below to uncover everything about your country, or explore the secrets of the world!"</p>

      <div class="button-container">
        <a id="hack-my-location" href="#" role="button">Hack My Location!</a>
        <a id="hack-the-world"href="#" role="button">Hack The World!</a>
      </div>
    </div>

    <div id="globe-container">
      <canvas id="globe" width="1000" height="1000"></canvas>
    </div>
  `;
  return main;
};
