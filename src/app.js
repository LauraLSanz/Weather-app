let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let today = document.querySelector("h5");
today.innerHTML = `${day}`;
let time = document.querySelector("h6");
time.innerHTML = `${hours}:${minutes}`;

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature}°`;
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${description}`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let windspeed = Math.round(response.data.wind.speed);
  let windSpeedElement = document.querySelector("#windspeed");
  windSpeedElement.innerHTML = `${windspeed}km/h`;
  document.querySelector("#city").innerHTML = response.data.name;

  function convertFarenheit(event) {
    event.preventDefault();
    let h4 = document.querySelector("h4");
    h4.innerHTML = `${operationF}°`;
  }

  function convertCelsius(event) {
    event.preventDefault();
    let h4 = document.querySelector("h4");
    h4.innerHTML = `${temperature}°`;
  }
  let operationF = Math.round(temperature * 1.8 + 32);
  let fLink = document.querySelector("#farenheit-link");
  fLink.addEventListener("click", convertFarenheit);
  let cLink = document.querySelector("#celsius-link");
  cLink.addEventListener("click", convertCelsius);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
  } else {
    city = null;
    alert("Please enter a city");
  }
  let units = "metric";
  let apiKey = "57603d1178c0f1e748b2d7cdf9d11821";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm = addEventListener("submit", search);

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "57603d1178c0f1e748b2d7cdf9d11821";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getretrievePosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentlocation = document.querySelector("#currentlocation");
currentlocation.addEventListener("click", getretrievePosition);
