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

document.querySelector("#currentday").innerHTML = `${day}`;

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = `${hour}:${minutes}`;

document.querySelector("#time").innerHTML = `${time}`;

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].main;
}

let apiKey = "5b927689c93c4cd55544a76cdf201c07";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Calgary&units=metric&appid=${apiKey}`;

axios.get(`${apiUrl}`).then(showWeather);
