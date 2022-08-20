import { Weather } from './utils/weather.services.js';
import { RenderUI } from './utils/renderUi.services.js';

const weather = new Weather();
const renderUi = new RenderUI();
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', async () => {
  const container = document.querySelector('.card-container');
  const inputKeyword = document.querySelector('.input-keyword').value;
  const { key, location } = await weather.getLocation(inputKeyword);
  const { weatherText, temp, icon, dataDay } = await weather.getWeatherCondition(key);
  container.innerHTML = renderUi.dataWeather(location, weatherText, icon, temp, dataDay);
});

const loader = () => {
  document.querySelector('.loader-container').classList.add('fade-out');
};

const fadeOut = () => {
  setInterval(loader, 2500);
};

window.onload = fadeOut;
