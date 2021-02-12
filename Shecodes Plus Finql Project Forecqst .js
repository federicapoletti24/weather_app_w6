function showDate(timestamp) {
let date = new Date(timestamp);
let dateElement = date.getDate(timestamp);
let hours = date.getHours(timestamp);
if (hours <10) {
    hours = `0${hours}`;
}
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[date.getMonth(timestamp)];
let minutes = date.getMinutes(timestamp);
if (minutes <10) {
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay(timestamp)];

return `${day} ${dateElement} ${month} ${hours}:${minutes}`;

}

function displayTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let tempValue = document.querySelector("#temperature");
    tempValue.innerHTML = temperature;
    let cityElement = document.querySelector("#city");
    let cityValue = response.data.name;
    cityElement.innerHTML = cityValue;
    let descriptionElement = document.querySelector("#description");
    let descriptionValue = response.data.weather[0].description;
    descriptionElement.innerHTML = descriptionValue;
    let humidityElement = document.querySelector("#humidity");
    let humidityValue = response.data.main.humidity;
    humidityElement.innerHTML = humidityValue;
    let windElement = document.querySelector("#wind");
    let windValue = response.data.wind.speed;
    windElement.innerHTML = Math.round(windValue);
    let date = document.querySelector("#date");
    date.innerHTML = showDate(response.data.dt * 1000);

    celsiusTemperature = Math.round(response.data.main.temp);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
}

function displayForecast(response) {
    console.log(response.data);

}


function search(city) {

let apiKey = "dc8f5bf2676eeecb4b285e5dcb7dcb71";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);

}


function getSubmit(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city-input");
    search(cityElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getSubmit);

function showFahrenheit(event) {
    event.preventDefault();
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitElement = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitElement);
}

function showCelsius(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);


function showPosition(position) {
    console.log(position);
}


function fetchCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

let currentBtn= document.querySelector("#btn-current");
currentBtn.addEventListener("click", fetchCurrentPosition);

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "dc8f5bf2676eeecb4b285e5dcb7dcb71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#btn-current");
currentLocation.addEventListener("submit", getCurrentLocation);
