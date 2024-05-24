const axios = require("axios");

const mapBoxAPI = axios.create({
  baseURL: process.env.MAPBOX_URL,
  params: {
    language: "en",
    access_token: process.env.MAPBOX_TOKEN
  }
});

module.exports = mapBoxAPI;
