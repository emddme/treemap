import getData from "./functions/getData.js";
import sumOfFunds from "./functions/sumOfFunds.js";
import flattenData from "./functions/flattenData.js";
import createScales from "./functions/createScales.js";
import createFront from "./functions/createFront.js";
import createTreemap from "./functions/createTreemap.js";
import drawChart from "./functions/drawChart.js";
import drawLegend from "./functions/drawLegend.js";
import drawNavbar from "./functions/drawNavbar.js";
import { padding, size, URLs } from "./variables.js";
import addTooltip from "./functions/addTooltip.js";

//get STATIC data
const kickstart = await getData(URLs.static_kickstart);
const movies = await getData(URLs.static_movies);
const games = await getData(URLs.static_games);

//flatten data objects
const kickstartFlat = flattenData(kickstart);
const moviesFlat = flattenData(movies);
const gamesFlat = flattenData(games);

//create treemaps, add dataset identifier
const rootKickstart = createTreemap(kickstartFlat, sumOfFunds, size, padding);
rootKickstart.dataset = "kickstarter";
const rootMovies = createTreemap(moviesFlat, sumOfFunds, size, padding);
rootMovies.dataset = "movies";
const rootGames = createTreemap(gamesFlat, sumOfFunds, size, padding);
rootGames.dataset = "games";

//create frontpage
createFront(
  rootKickstart,
  rootMovies,
  rootGames,
  createScales,
  createFront,
  drawNavbar,
  drawChart,
  drawLegend,
  addTooltip
);

document.getElementsByClassName("links")[0].click();
