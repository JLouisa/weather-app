async function getInfo(city) {
  const api = "06b2be10d92d45e6ba891712232208";
  const url = `http://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`;
  const response = await fetch(url, {
    mode: "cors",
  });
  let result = await response.json();
  console.log(`Country: ${result.location.name}`);
  console.log(`Region: ${result.location.region}`);
  console.log(`Time-zone ${result.location.tz_id}mph`);
  console.log(`Temperature in Celsius ${result.current.temp_c}°C`);
  console.log(`Temperature in fahrenheit  ${result.current.temp_f}°F`);
  console.log(`The weather is ${result.current.condition.text}`);
  console.log(`The UV is ${result.current.uv}`);
  console.log(`Humidity: ${result.current.humidity}g.m-3`);
  console.log(`Wind direction: ${result.current.wind_dir}`);
  console.log(`Icon: https:${result.current.condition.icon}`);
  currentWeatherConditionImgEl.src = `https:${result.current.condition.icon}`;
  return result;
}

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
// const clearBtnEl = document.getElementById("clearBtn");

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

// clearBtnEl.addEventListener("click", () => {
//   event.preventDefault();
//   form.reset();
//   searchInputValue = "";
// });

getInfo(searchInputValue);
