const choiceCityForm = document.querySelector('.choice-city-form');
const choiceCityFormInput = document.querySelector('#choice-city-form__input');
const main = document.querySelector('main');
const clearButton = document.querySelector('.clear-button');

const getWeather = city => {

  return new Promise((resolve, reject) => {

    const URL = 'http://api.apixu.com/v1/current.json?key=502e6d2bb7fc49b7b55164834192904&q=';
    const req = new XMLHttpRequest();

    req.open('GET', `${URL}` + city);
    req.onload = () => {
  
      let allDataWeather = JSON.parse(req.response);
      
      if(req.status === 200) {
        resolve(allDataWeather);
      } else if(req.status === 400) {
        reject(allDataWeather);
      } else{
        alert('Error!')
      };
      
    };

    req.send();

  });

};

const showResults = element => {

  main.appendChild(element);

};

const createElemForResults = allDataWeather => {

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

  if(document.querySelector('.results__container')) {
    document.querySelector('.results__container').remove();
  };
    
};

const getCityNames = () => {
  
  return new Promise(resolve => {

    const urlCity = 'http://api.apixu.com/v1/search.json?key=502e6d2bb7fc49b7b55164834192904&q=';
    const req = new XMLHttpRequest();

    req.open('GET', `${urlCity}` + choiceCityFormInput.value);
    req.onload = () => {

      let citiesList = JSON.parse(req.response);
      resolve(citiesList);
      
    };
  
    req.send();

  });

};

const createProposedListOfCities = arr => {

  const proposedListOfCities = document.createElement('div');

  proposedListOfCities.classList.add('proposed-list-of-cities__container');
  proposedListOfCities.addEventListener('click', e => {

    choiceCityFormInput.value = e.target.textContent;

  });

  for(let i = 0; i < arr.length; i++) {
    const citySpan = document.createElement('span');
    citySpan.classList.add('city-span' + i, 'padding');
    citySpan.textContent = arr[i].name;
    proposedListOfCities.appendChild(citySpan);
  };

  return proposedListOfCities;

};

const deletionProposedListOfCities = () => {

  const deleteCount = document.querySelectorAll('.proposed-list-of-cities__container').length;

  for(let i = 0; i < deleteCount; i++) {
    document.querySelector('.proposed-list-of-cities__container').remove();
  };
    
};

const showProposedListOfCities = element => {

  main.appendChild(element);

};

choiceCityForm.addEventListener('submit', e => {
  
  e.preventDefault();

  const city = e.target['choice-city-form__input'].value;
  
  getWeather(city)
    .then(
      allDataWeather => {
        deletionResultsContainer();
        showResults(createElemForResults(allDataWeather));   
      },
      allDataWeather => {
        alert(allDataWeather.error.message);
      });

});

choiceCityFormInput.addEventListener('keyup' , () => {

  deletionProposedListOfCities();

  if(choiceCityFormInput.value.length > 2) {
    getCityNames()
      .then(
        citiesList => {

          if(citiesList.length > 0) {
            showProposedListOfCities(createProposedListOfCities(citiesList));
          };

        });

  };
  
});

choiceCityFormInput.addEventListener('blur' , () => {
  
  setTimeout(deletionProposedListOfCities, 200);
  
});

clearButton.addEventListener('click', () => {

  deletionProposedListOfCities();
  deletionResultsContainer();
  choiceCityFormInput.value = "";

});




