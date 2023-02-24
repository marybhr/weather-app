let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// let city = prompt("Enter a city");
// city = city.toLocaleLowerCase().trim();
// if (weather[city] !== undefined) {
//   let temprature = weather[city].temp;
//   temprature = Math.round(temprature);
//   let humidity = weather[city].humidity;
//   humidity = Math.round(humidity);
//   alert(
//     `It is currently ${temprature} °C in ${city} with a humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for ${city}, try going to https://www.google.com/search?q=weather+${city}`
//   );
// }
let now = new Date();
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
let hour = now.getHours();
let minute = now.getMinutes();
document.getElementById("p1").innerHTML = `${day},${hour}:${minute}`;

// function showCity(event) {
//   event.preventDefault();
//   let display = document.querySelector("h1");
//   let cityInput = document.querySelector("#inpt-srch");
//   display.innerHTML = `${cityInput.value}`;
// }
// let place = document.querySelector("#srch-frm");
// place.addEventListener("submit", showCity);

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
function showTemprature(response) {
  let celiTemp = response.data.main.temp;
  let celiTemprature = Math.round(celiTemp);
  let h1 = document.querySelector("h1");
  let city = response.data.name;
  h1.innerHTML = city;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${celiTemprature}°C`;
  let feel = document.querySelector("#feel");
  feel.innerHTML = response.data.weather[0].main;
}

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
