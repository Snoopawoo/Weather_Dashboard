var apiKey = '3899e7379039119a99a2e3d150c2d807';
var city = 'London';
var iconUrl = 'https://openweathermap.org/img/w/';

$.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  .then(function(currentData) {
  console.log(`
    Temp: ${Math.round(currentData.main.temp)}°C
    Wind: ${currentData.wind.speed}mph
    Humidity: ${currentData.main.humidity}%
    Icon URL: ${iconUrl + currentData.weather[0].icon + '.png'}
  `);
  
  $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${apiKey}`)
    .then(function(forecastData) {
    console.log(forecastData);
  })
})