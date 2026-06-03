"use strict";

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherResult = document.querySelector("#weather-result");
const errorMsg = document.querySelector("#error-msg");
const historyList = document.querySelector("#history-list");

const STORAGE_KEY = "weatherHistory";
const HISTORY_LIMIT = 5;

function getWeatherEmoji(description) {
  const desc = description.toLowerCase();
  if (desc.includes("rain")) return "🌧️";
  if (desc.includes("cloud")) return "☁️";
  if (desc.includes("clear") || desc.includes("sunny")) return "☀️";
  if (desc.includes("snow")) return "❄️";
  if (desc.includes("storm")) return "⛈️";
  if (desc.includes("fog")) return "🌫️";
  if (desc.includes("wind")) return "💨";
  return "🌤️";
}

async function getWeatherByCity(city) {
  try {
    showLoading();
    clearError();

    // Step 1: Get coordinates from city name
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!geoRes.ok) throw new Error("Failed to fetch coordinates");

    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${city}" not found`);
    }

    const location = geoData.results[0];
    const { latitude, longitude, name, country } = location;

    // Step 2: Get weather data
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
    );

    if (!weatherRes.ok) throw new Error("Failed to fetch weather");

    const weatherData = await weatherRes.json();
    const current = weatherData.current;

    // Map WMO weather codes to description
    const weatherDesc = getWeatherDescription(current.weather_code);

    const result = {
      city: name,
      country: country,
      temp: Math.round(current.temperature_2m),
      humidity: current.relative_humidity_2m,
      description: weatherDesc,
      windSpeed: Math.round(current.wind_speed_10m),
      emoji: getWeatherEmoji(weatherDesc)
    };

    displayWeather(result);
    addToHistory(city);

  } catch (error) {
    showError(error.message);
  }
}

function getWeatherDescription(code) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm"
  };
  return weatherCodes[code] || "Unknown";
}

function displayWeather(data) {
  weatherResult.innerHTML = `
    <div class="weather-header">
      <div class="weather-icon">${data.emoji}</div>
      <div class="weather-main">
        <h2>${data.temp}°C</h2>
        <p>${data.city}, ${data.country}</p>
        <p style="color: #999;">${data.description}</p>
      </div>
    </div>
    <div class="weather-details">
      <div class="detail-item">
        <div class="detail-label">Humidity</div>
        <div class="detail-value">${data.humidity}%</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">Wind</div>
        <div class="detail-value">${data.windSpeed} km/h</div>
      </div>
    </div>
  `;
  weatherResult.classList.remove("hidden");
}

function showLoading() {
  weatherResult.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Fetching weather...</p>
    </div>
  `;
  weatherResult.classList.remove("hidden");
  errorMsg.classList.add("hidden");
}

function showError(message) {
  errorMsg.textContent = `❌ ${message}`;
  errorMsg.classList.remove("hidden");
  weatherResult.classList.add("hidden");
}

function clearError() {
  errorMsg.classList.add("hidden");
}

function addToHistory(city) {
  let history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  // Remove duplicate if exists
  history = history.filter(c => c.toLowerCase() !== city.toLowerCase());

  // Add to front
  history.unshift(city);

  // Limit to 5
  history = history.slice(0, HISTORY_LIMIT);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  historyList.innerHTML = "";

  if (history.length === 0) {
    historyList.innerHTML = '<p style="color: #999;">No search history yet</p>';
    return;
  }

  history.forEach(city => {
    const btn = document.createElement("button");
    btn.className = "history-btn";
    btn.textContent = city;
    btn.type = "button";
    btn.addEventListener("click", () => {
      cityInput.value = city;
      getWeatherByCity(city);
    });
    historyList.appendChild(btn);
  });
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherByCity(city);
  }
});

cityInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      getWeatherByCity(city);
    }
  }
});

// Initialize
renderHistory();
