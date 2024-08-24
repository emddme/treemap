import getData from "./functions/getData.js";
import sumOfFunds from "./functions/sumOfFunds.js";
import flattenData from "./functions/flattenData.js";
import createScales from "./functions/createScales.js";
import createFront from "./functions/createFront.js";
import createTreemap from "./functions/createTreemap.js";
import createChart from "./functions/createChart.js";
import { padding, size, stroke, URLs, viewBox } from "./variables.js";

//get STATIC data
const kickstart = await getData(URLs.static_kickstart);
const movies = await getData(URLs.static_movies);
const games = await getData(URLs.static_games);

//flatten data objects
const kickstartFlat = flattenData(kickstart);
const moviesFlat = flattenData(movies);
const gamesFlat = flattenData(games);

//create treemaps
const rootKickstart = createTreemap(kickstartFlat, sumOfFunds, size, padding);
const rootMovies = createTreemap(moviesFlat, sumOfFunds, size, padding);
const rootGames = createTreemap(gamesFlat, sumOfFunds, size, padding);

//create frontpage
createFront(
  rootKickstart,
  rootMovies,
  rootGames,
  stroke,
  viewBox,
  createScales,
  createFront,
  createChart
);
