require("dotenv").config();

const { saveFile } = require("./helpers/file");
const {
  mainMenu,
  pause,
  readInput,
  listPlaces
} = require("./helpers/inquirer");
const mapBoxAPI = require("./helpers/mapBox");
const weatherAPI = require("./helpers/weather");
const Search = require("./models/search");

async function main() {
  let opt = 0;
  const search = new Search();
  do {
    opt = await mainMenu();
    switch (opt) {
      case 1:
        const place = await readInput("City: ");
        const places = await search.byPlace(place, mapBoxAPI);
        const id = await listPlaces(places);
        if (!id) {
          console.log("Place not found".red);
          break;
        };
        const { name, lat, long } = places.find((place) => place.id === id);
        const { temperature, humidity, windSpeed } =
          await search.weatherByCoordinates({ lat, long }, weatherAPI);
        search.addHistory(name);
        // Show place info
        console.clear();
        console.log("\nInformation about city\n".green);
        console.log(`City: `.green + name);
        console.log(`Lat: `.green, lat);
        console.log(`Long: `.green, long);
        console.log(`Temperature: `.green + `${temperature ?? 0}°C`);
        console.log(`Humidity: `.green + `${humidity ?? 0}%`);
        console.log(`WindSpeed: `.green + `${windSpeed ?? 0}Km/h`);
        break;
      case 2:
        console.log("\nWeather Places History\n".green);
        search.history.forEach((place, index) =>
          console.log(`${index + 1}.`.green + ` ${place}`)
        );
        break;
      default:
        continue;
    }
    saveFile(search.history);
    if (opt) await pause();
  } while (opt);
}

main();
