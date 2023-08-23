// Africa: Cairo (Egypt)
// Asia: Tokyo (Japan)
// Europe: Paris (France)
// North America: Washington, D.C. (United States)
// South America: Buenos Aires (Argentina)
// Australia/Oceania: Wellington (New Zealand)

//! Variables
let searchInputValue = "Amsterdam";

//! DOM Caches
let currentWeatherConditionImgEl = document.querySelector("img");
const form = document.querySelector("form");
const searchBarEl = document.getElementById("searchBar");
const searchBtnEl = document.getElementById("searchBtn");
// const weatherIcon = document.querySelector(".weatherIcon");
// const temp = document.querySelector(".temp");
// const midright = document.querySelector(".midright");
// const midleft = document.querySelector(".midleft");
// const top1 = document.querySelector(".top");
// const middle = document.querySelector(".middle");
// const bot = document.querySelector(".bot");
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
}

//! The Listeners
searchBarEl.addEventListener("input", () => {
  searchInputValue = searchBarEl.value;
});
searchBtnEl.addEventListener("click", () => {
  event.preventDefault();
  getInfo(searchInputValue);
  console.log(searchInputValue);
  form.reset();
  searchInputValue = "";
});

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

getInfo(searchInputValue);

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
