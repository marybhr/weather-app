// function toFarenheit(event) {
//   event.preventDefault();
//   let farenDeg = document.querySelector("h2");
//   farenDeg.innerHTML = `39°F`;
// }
// let faren = document.querySelector("#far");
// faren.addEventListener("click", toFarenheit);

// function toCeli(event) {
//   event.preventDefault();
//   let celiDeg = document.querySelector("h2");
//   celiDeg.innerHTML = `4°C`;
// }
// let celic = document.querySelector("#celi");
// celic.addEventListener("click", toCeli);

// temprature Function
function showTemprature(response) {
  let celiTemp = response.data.main.temp;
  let celiTemprature = Math.round(celiTemp);
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  h1.innerHTML = city;
  let h2 = document.querySelector("#degree");
  h2.innerHTML = `${celiTemprature}°C`;
  let feel = document.querySelector("#feel");
  feel.innerHTML = response.data.weather[0].main;
  let dateElement = document.querySelector("#dateElement");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
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
let place = document.querySelector("#srch-frm");
place.addEventListener("submit", showCity);

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
