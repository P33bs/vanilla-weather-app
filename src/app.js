function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = ``;
  let forecastDays = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  forecastDays.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col">
    <div class="WeatherForecastPreview">
      <div class="forecast-time">${day}</div>
        <img src="http://openweathermap.org/img/wn/10d@2x.png" id="icon"/>
          <div class="forecast-temperature">
            <span class="forecast-temperature-max">2°</span>
             <span class="forecast-temperature-min">-3°</span>
            </div>
          </div>
        </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

function displayTemp(response) {
  celsiusTemp = response.data.main.temp;

  let weatherIcon = response.data.weather[0].icon;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].main);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(celsiusTemp);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function search(city) {
  let apiKey = "5b927689c93c4cd55544a76cdf201c07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector(".search-input");
  search(cityInputElement.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitValue = (celsiusTemp * 9) / 5 + 32;
  document.querySelector(".temperature").innerHTML =
    Math.round(fahrenheitValue);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsius(event) {
  event.preventDefault();
  document.querySelector(".temperature").innerHTML = Math.round(celsiusTemp);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

search("Vancouver");
displayForecast();
