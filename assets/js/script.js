//declaring variables to be used
var currentWrapper = $('#today');
var forcastTitle = $('.forecast-title');
var forecastWrapper = $('#forecast');
var historyWrapper = $('#history');
var searchInput = $('.weather-search');
var city;
var apiKey = '3899e7379039119a99a2e3d150c2d807';
var iconUrl = 'https://openweathermap.org/img/w/';
var searchHistory = [];

//gets saved data from local storage
searchHistory = JSON.parse(localStorage.getItem('history'));

//makes sure that we don't get an error when we first run the site and get a null from loading local storage
if(searchHistory == null){
  searchHistory = [];
};

//adds a button for each search history
function appendHistory() {
  historyWrapper.html('');
  for (var history of searchHistory) {
  historyWrapper.append(`
  <button class="btn history-button" data-history = '${history}'> ${history} </button>
  `)};
};

appendHistory();

//get user input
function getInput() {
  city = searchInput.val();
  dataRequest();
};

//prints data based on user input
function dataRequest() {
$.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
.then(function(currentData) {
  console.log(currentData);
  
  $.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=${apiKey}&units=metric`)
  .then(function(forecastData) {
    console.log(forecastData);
    var day;
    forecastWrapper.html('');
    savetoHistory();
    forcastTitle.removeClass( "hide" )
    var currentTime;
    for (day = 0; day < 40; day++) {
    currentTime = moment.unix(forecastData.list[day].dt).format("MMM.DD. hh:mm A");
    forecastWrapper.append(`
    <div class="card forecast-body" style="width: 18rem;">
        <div class="card-body">
          <p class = 'time'>${currentTime} <img src="${iconUrl + forecastData.list[day].weather[0].icon + '.png'}" alt="Weather Icon"> </p>
          <p>Temp: ${forecastData.list[day].main.temp}°C</p>
          <p>Wind: ${forecastData.list[day].wind.speed}mph</p>
          <p>Humidity: ${forecastData.list[day].main.humidity}%</p>
        </div>
      </div>
    `);
    };  
  })
  var date = moment.unix(currentData.dt).format("MM/DD/YYYY");
  currentWrapper.removeClass( "hide" );
  currentWrapper.html(`
  <h2>${city} (${date}) <img src="${iconUrl + currentData.weather[0].icon + '.png'}" alt="Weather Icon"> </h2>
  <p>Temp: ${currentData.main.temp}°C</p>
  <p>Wind: ${currentData.wind.speed}mph</p>
  <p>Humidity: ${currentData.main.humidity}%</p>
  `);
})
};

//adds searches to history
function savetoHistory() {
    if (searchHistory.includes(city)) {
      return;
    }
    else {
    searchHistory.push(city);
    localStorage.setItem('history', JSON.stringify(searchHistory));
    };
    appendHistory();
};

//adds event listener to search button
$( "#search-button" ).click(getInput);

//addds event listener for button press on history buttons
var historyBtn = document.querySelectorAll('.history-button');

for (i of historyBtn) {
  i.addEventListener('click', function() {
    city = (this.dataset.history);
    dataRequest();
  });
}