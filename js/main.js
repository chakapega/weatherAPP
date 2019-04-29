const URL = 'http://api.apixu.com/v1/current.json?key=c9bf02c8667a4e998ad205818192304&q=';
const choiceCityForm = document.querySelector('.choice-city-form');
const buttonShowWeather = document.querySelector('.choice-city-form__button');
let city;
let allDataWeather;

const getWeather = () => {

  const req = new XMLHttpRequest();

  req.open('GET', `${URL}` + city);
  req.onreadystatechange = () => {
    if(req.readyState === 4 && req.status === 200) {
      allDataWeather = JSON.parse(req.response);

      deletionResultsContainer();
      showResults();
    };
  };

  req.send();

};

const showResults = () => {

  const main = document.querySelector('main');

  createElemForResults();

  main.appendChild(createElemForResults());

};

const createElemForResults = () => {

  const resultsContainer = document.createElement('div');
  const location = document.createElement('span');
  const condition = document.createElement('div');
  const conditionImg = document.createElement('img');
  const conditionText = document.createElement('span');
  const wind = document.createElement('span');
  const precipitation = document.createElement('span');
  const pressure = document.createElement('span');
  const temperature = document.createElement('span');

  resultsContainer.classList.add('results__container');

  location.classList.add('location');
  location.textContent = allDataWeather.location.country + ' / ' + allDataWeather.location.name;

  condition.classList.add('condition');
  
  conditionImg.classList.add('condition__img');
  conditionImg.src = 'http:' + allDataWeather.current.condition.icon;

  conditionText.classList.add('condition__text');
  conditionText.textContent = allDataWeather.current.condition.text;

  wind.classList.add('wind');
  wind.textContent = 'Wind: ' + allDataWeather.current.wind_kph + ' km/h';

  precipitation.classList.add('precipitation');
  precipitation.textContent = 'Precipitation: ' + allDataWeather.current.precip_mm + ' mm';

  pressure.classList.add('pressure');
  pressure.textContent = 'Pressure: ' + allDataWeather.current.pressure_mb + ' mb';

  temperature.classList.add('temperature');
  temperature.textContent = 'Temperature: ' + allDataWeather.current.temp_c + ' °c';

  resultsContainer.appendChild(location);
  condition.appendChild(conditionImg);
  condition.appendChild(conditionText);
  resultsContainer.appendChild(condition);
  resultsContainer.appendChild(wind);
  resultsContainer.appendChild(precipitation);
  resultsContainer.appendChild(pressure);
  resultsContainer.appendChild(temperature);

  return resultsContainer;

};

const deletionResultsContainer = () => {

  try {
    document.querySelector('.results__container').remove();
  } catch {

  };

};

choiceCityForm.addEventListener('submit', e => {
  
  e.preventDefault();

  city = e.target['choice-city-form__input'].value;
  
  getWeather();

  
});




