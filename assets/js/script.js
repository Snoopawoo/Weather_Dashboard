var currentWrapper = $('#today');
var forecastWrapper = $('#forecast');
var searchInput = $('.weather-search');
var city;
var apiKey = '3899e7379039119a99a2e3d150c2d807';
var iconUrl = 'https://openweathermap.org/img/w/';
//get user input
function getInput() {
  city = searchInput.val();
  dataRequest();
};

function dataRequest() {
$.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
.then(function(currentData) {
  console.log(currentData);
  // console.log(`
  // Temp: ${Math.round(currentData.main.temp)}°C
  // Wind: ${currentData.wind.speed}mph
  // Humidity: ${currentData.main.humidity}%
  // Icon URL: ${iconUrl + currentData.weather[0].icon + '.png'}
  // `);
  
  $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${apiKey}&units=metric`)
  .then(function(forecastData) {
    console.log(forecastData);
    var day;
    for (day = 0; day < 40; day++) {
    forecastWrapper.append(`
    <h3>${city} <img src="${iconUrl + forecastData.list[day].weather[0].icon + '.png'}" alt="Weather Icon"> </h3>
    <p>Time: ${forecastData.list[day].dt_txt}</p>
    <p>Temp: ${forecastData.list[day].main.temp}°C</p>
    <p>Wind: ${forecastData.list[day].wind.speed}mph</p>
    <p>Humidity: ${forecastData.list[day].main.humidity}%</p>
    `);
    };

  })
  var date = moment.unix(1672686101).format("MM/DD/YYYY");
  currentWrapper.html(`
  <h2>${city} (${date}) <img src="${iconUrl + currentData.weather[0].icon + '.png'}" alt="Weather Icon"> </h2>
  <p>Temp: ${currentData.main.temp}°C</p>
  <p>Wind: ${currentData.wind.speed}mph</p>
  <p>Humidity: ${currentData.main.humidity}%</p>
  `);
  //Icon URL: ${iconUrl + currentData.weather[0].icon + '.png'}
  
// forecastWrapper.html(`
//   Temp: ${Math.round(currentData.main.temp)}°C
//   Wind: ${currentData.wind.speed}mph
//   Humidity: ${currentData.main.humidity}%
//   Icon URL: ${iconUrl + currentData.weather[0].icon + '.png'}
// `);
})

};

$( "#search-button" ).click(getInput);

