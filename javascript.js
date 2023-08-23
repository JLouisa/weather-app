(function WeatherAppFuncs() {
  //! Variables
  let searchInputValue;
  let tempMetric = "";
  let tempImperial = "";
  let windMetric = "";
  let windImperial = "";

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
  const checkboxSwitchBtn = document.getElementById("checkbox");
  const fahrenUnitEl = document.getElementById("fahrenUnit");
  const windUnitEl = document.getElementById("windUnit");
  const fTextEl = document.getElementById("fText");

  //! Loading local storages
  const loadLocalStorage = (() => {
    const savedCity = JSON.parse(localStorage.getItem("city"));
    return savedCity;
  })();
  const loadLocalStorageUnits = (() => {
    const savedUnits = JSON.parse(localStorage.getItem("imperial"));
    checkboxSwitchBtn.checked = savedUnits;
  })();

  //! Saving to Local Storage
  function saveLocalStorage(data) {
    localStorage.setItem("city", JSON.stringify(data));
  }
  function saveLocalStorageUnit() {
    localStorage.setItem("imperial", JSON.stringify(checkboxSwitchBtn.checked));
  }

  //! Render
  async function showWeatherInfo(
    icon,
    tempC,
    city,
    country,
    region,
    tempF,
    condition,
    windDir,
    uv,
    windKph,
    windMph,
    humidity
  ) {
    currentWeatherConditionImgEl.src = await icon;
    cityEl.textContent = await city;
    countryEl.textContent = await country;
    regionEl.textContent = await region;
    weatherConditionEl.textContent = await condition;
    windDirectionEl.textContent = await windDir;
    indexUVEl.textContent = await uv;
    humidityEl.textContent = await humidity;
    tempMetric = await tempC;
    tempImperial = await tempF;
    windMetric = await windKph;
    windImperial = await windMph;
    switchUnitController(await tempC, await tempF, await windKph, await windMph);
    saveLocalStorage(await city);
  }

  async function getInfo(city) {
    const api = "06b2be10d92d45e6ba891712232208";
    const url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`;
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
      result.current.wind_kph,
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

  function switchToImperial(temp1, temp2, wind1, tU, wU, text) {
    celciusNumEl.textContent = parseFloat(temp1).toFixed(0);
    fahrenheitNumEl.textContent = parseFloat(temp2).toFixed(0);
    windEl.textContent = wind1;
    fahrenUnitEl.textContent = tU;
    windUnitEl.textContent = wU;
    fTextEl.textContent = text;
  }

  function switchUnitController(tempM, tempI, windM, windI) {
    if (checkboxSwitchBtn.checked) {
      switchToImperial(tempI, tempM, windI, "°C", "mph", "Temperature Celsius:");
    } else {
      switchToImperial(tempM, tempI, windM, "°F", "kmh", "Temperature Fahrenheit:");
    }
  }

  //! The Listeners
  searchBarEl.addEventListener("input", () => {
    searchInputValue = searchBarEl.value;
  });
  searchBtnEl.addEventListener("click", () => {
    if (searchInputValue === "" || searchInputValue === undefined) {
      console.log("Empty search");
      searchBarEl.setCustomValidity("Please fill in a valid city name");
    } else {
      getInfo(searchInputValue);
      form.reset();
      searchInputValue = "";
      searchBarEl.setCustomValidity("");
      event.preventDefault();
    }
  });
  checkboxSwitchBtn.addEventListener("change", () => {
    switchUnitController(tempMetric, tempImperial, windMetric, windImperial);
    saveLocalStorageUnit();
  });
})();
