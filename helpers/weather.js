const axios = require("axios");

const weatherAPI = axios.create({
  baseURL: process.env.TOMORROW_URL,
  params: {
    apikey: process.env.TOMORROW_TOKEN
  }
});

module.exports = weatherAPI;
