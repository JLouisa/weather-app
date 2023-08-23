// Africa: Cairo (Egypt)
// Asia: Tokyo (Japan)
// Europe: Paris (France)
// North America: Washington, D.C. (United States)
// South America: Buenos Aires (Argentina)
// Australia/Oceania: Wellington (New Zealand)

//! Variables
let searchInputValue;

//! DOM Caches
let currentWeatherConditionImgEl = document.querySelector("#weatherIcon2");
const form = document.querySelector("form");
const searchBarEl = document.getElementById("searchBar");
const searchBtnEl = document.getElementById("searchBtn");
const celciusNumEl = document.getElementById("celciusNum");
const cityEl = document.getElementById("city");
const countryEl = document.getElementById("country");
const regionEl = document.getElementById("region");
const fahrenheitNumEl = document.getElementById("fahrenheitNum");
const weatherConditionEl = document.getElementById("weatherCondition");
const windDirectionEl = document.getElementById("windDirection");
const indexUVEl = document.getElementById("indexUV");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");

//! Loading local storages
const loadLocalStorage = (() => {
  const savedCity = JSON.parse(localStorage.getItem("city"));
  return savedCity;
})();

//! Saving to Local Storage
function saveLocalStorage(data) {
  localStorage.setItem("city", JSON.stringify(data));
}

//! Render
async function showWeatherInfo(icon, tempC, city, country, region, tempF, condition, windDir, uv, windMph, humidity) {
  currentWeatherConditionImgEl.src = await icon;
  celciusNumEl.textContent = await tempC;
  cityEl.textContent = await city;
  countryEl.textContent = await country;
  regionEl.textContent = await region;
  fahrenheitNumEl.textContent = await tempF;
  weatherConditionEl.textContent = await condition;
  windDirectionEl.textContent = await windDir;
  indexUVEl.textContent = await uv;
  windEl.textContent = await windMph;
  humidityEl.textContent = await humidity;
  saveLocalStorage(await city);
}

async function getInfo(city) {
  const api = "06b2be10d92d45e6ba891712232208";
  const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`;
  const response = await fetch(url, {
    mode: "cors",
  });
  let result = await response.json();
  showWeatherInfo(
    result.current.condition.icon,
    result.current.temp_c,
    result.location.name,
    result.location.country,
    result.location.region,
    result.current.temp_f,
    result.current.condition.text,
    result.current.wind_dir,
    result.current.uv,
    result.current.wind_mph,
    result.current.humidity,
    result
  );
  currentWeatherConditionImgEl.src = `https:${result.current.condition.icon}`;
  return result;
}

(function newOrSaved() {
  if (loadLocalStorage !== null) {
    getInfo(loadLocalStorage);
  } else {
    getInfo("Amsterdam");
  }
})();

//! The Listeners
searchBarEl.addEventListener("input", () => {
  searchInputValue = searchBarEl.value;
});
searchBtnEl.addEventListener("click", () => {
  event.preventDefault();
  getInfo(searchInputValue);
  form.reset();
  searchInputValue = "";
});

//   console.log(`Icon: https:${result.current.condition.icon}`);
//   console.log(`Temperature in Celsius ${result.current.temp_c}°C`);
//   console.log(`City: ${result.location.name}`);
//   console.log(`Country ${result.location.country}`);
//   console.log(`Region: ${result.location.region}`);
//   console.log(`Temperature in fahrenheit  ${result.current.temp_f}°F`);
//   console.log(`The weather is ${result.current.condition.text}`);
//   console.log(`Wind direction: ${result.current.wind_dir}`);
//   console.log(`The UV is ${result.current.uv}`);
//   //   console.log(`Wind Speed: ${result.current.wind_kph}km/p`);
//   console.log(`Wind Speed: ${result.current.wind_mph}mph`);
//   console.log(`Humidity: ${result.current.humidity}g.m-3`);
