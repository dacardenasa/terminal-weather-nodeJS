const { apiToPlaces } = require("../adapters/apiToPlaces");
const { apiToWeather } = require("../adapters/apiToWeather");
const { readFile } = require("../helpers/file");

class Search {
  history = [];

  constructor() {
    const placesHistory = readFile();
    if (placesHistory) {
      placesHistory.history?.forEach((place) => {
        this.addHistory(place);
      });
    }
  }

  async byPlace(place = "", httpHandler) {
    try {
      const { data } = await httpHandler("/search/geocode/v6/forward", {
        params: { q: place }
      });
      const placesFormated = apiToPlaces(data.features);
      return placesFormated;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async weatherByCoordinates(coordinates = { lat: 0, long: 0 }, httpHandler) {
    try {
      const {
        data: { data }
      } = await httpHandler("/weather/realtime", {
        params: { location: `${coordinates.lat}, ${coordinates.long}` }
      });
      const weatherFormated = apiToWeather(data);
      return weatherFormated;
    } catch (error) {
      return {};
    }
  }

  addHistory(place = "") {
    if (this.history.includes(place)) return;
    this.history = this.history.splice(0, 5);
    this.history.unshift(place);
  }
}

module.exports = Search;
