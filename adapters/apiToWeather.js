function apiToWeather(placeWeather = {}) {
  if (!Object.keys(placeWeather).length) return {};
  return {
    humidity: placeWeather.values.humidity,
    temperature: placeWeather.values.temperature,
    windSpeed: placeWeather.values.windSpeed
  };
}

module.exports = {
  apiToWeather
};
