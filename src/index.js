// js for Date
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
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
  return `${day},${hour}:${minute}`;
}
//forecas tday display function
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//forecast display function
function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="row"> `;
  forecastData.forEach(function (forecastday, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
              <img
          src="http://openweathermap.org/img/wn/${
            forecastday.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
              <div class="forecast-date">
              ${formatDay(forecastday.dt)}
              </div>
              <div class="weather-forecast-temperatures" >
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastday.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastday.temp.min
                  )}°</span>
                </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//weekly forecast function
function weeklyForecast(coordinates) {
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
/// temprature Function
function showTemprature(response) {
  let h1 = document.querySelector("h1");
  city = response.data.name;
  let degree = document.querySelector("#degree");
  let feel = document.querySelector("#feel");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#dateElement");
  let skyElement = document.querySelector("#sky-icon");

  celiTemp = response.data.main.temp;
  h1.innerHTML = city;
  degree.innerHTML = Math.round(celiTemp);
  feel.innerHTML = response.data.weather[0].main;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  skyElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  skyElement.setAttribute("alt", response.data.weather[0].description);
  weeklyForecast(response.data.coord);
}
let apiKey = "b35c686ba9565ba0ab254c2230937552";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&lang=en&appid=${apiKey}`;
axios.get(apiUrl).then(showTemprature);

// location display api call
function showCity(event) {
  event.preventDefault();
  let display = document.querySelector("h1");
  let cityInput = document.querySelector("#inpt-srch");
  display.innerHTML = `${cityInput.value}`;
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&lang=en&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemprature);
}

// current location api call
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let lat = latitude.toFixed(2);
  let lon = longitude.toFixed(2);
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemprature);
}

function userPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let current = document.querySelector("button");
current.addEventListener("click", userPosition);

let place = document.querySelector("#srch-frm");
place.addEventListener("submit", showCity);

function toFarenheit(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  celi.classList.remove("active");
  far.classList.add("active");
  let fahrenheiTemperature = (celiTemp * 9) / 5 + 32;
  degree.innerHTML = Math.round(fahrenheiTemperature);
}

function toCelsius(event) {
  event.preventDefault();
  celi.classList.add("active");
  far.classList.remove("active");
  let celiDeg = document.querySelector("#degree");
  degree.innerHTML = Math.round(celiTemp);
}

let celiTemp = null;

let farenheit = document.querySelector("#far");
farenheit.addEventListener("click", toFarenheit);

let celsius = document.querySelector("#celi");
celsius.addEventListener("click", toCelsius);
