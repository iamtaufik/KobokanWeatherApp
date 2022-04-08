// const apiKey = 'jCLPUDFqHDZV7369qCF3gfHGutmpcVKG';
// const apiKey = 'bRx62nQIMH72uPYxEQRTtU2d6C4Vgq1l';
const apiKey = 'FA2WGKg0MlXXCP1SC4ugWCEVKSQi2sfW';
const searchButton = document.querySelector('.search-button');
const container = document.querySelector('.card-container');
const popularCity = ['Bandung', 'Yogyakarta', 'Jakarta'];

searchButton.addEventListener('click', async function () {
  const inputKeyword = document.querySelector('.input-keyword');
  const { key, location } = await getLocationKey(inputKeyword.value, apiKey);
  const { weatherText, temp, icon } = await getWeatherCondition(key, apiKey);
  container.innerHTML = dataWeather(location, weatherText, icon, temp);
});

async function getLocationKey(input, apiKey) {
  const response = await fetch('https://dataservice.accuweather.com/locations/v1/cities/search?q=' + input + '&apikey=' + apiKey);
  const response_1 = await response.json();
  const key = response_1[0].Key;
  const location = response_1[0].EnglishName;
  return { key, location };
}

async function getWeatherCondition(key, apiKey) {
  const response = await fetch('https://dataservice.accuweather.com/currentconditions/v1/' + key + '?apikey=' + apiKey + '&language=id-id');
  const response_1 = await response.json();
  const weatherText = response_1[0].WeatherText;
  const temp = response_1[0].Temperature.Metric.Value;
  const icon = response_1[0].WeatherIcon;
  return { weatherText, temp, icon };
}

function dataWeather(nmeDaerah, konCuaca, icon, tempCuaca) {
  return `<div class="card">
            <div class="back-color"></div>
              <div class="icons">
                <img src="img/icons/${icon}.svg" alt=" " />
              </div>
              <div class="info">
                <h2>${nmeDaerah}</h2>
                <h4>${konCuaca}</h4>
                <h1>${tempCuaca} °C</h1>
              </div>
          </div>`;
}
function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut() {
  setInterval(loader, 3000);
}

window.onload = fadeOut;
