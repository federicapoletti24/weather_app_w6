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
    console.log(response.data);
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

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    
}

let apiKey = "dc8f5bf2676eeecb4b285e5dcb7dcb71";
let city = "Johannesburg";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);