import getData from "./functions/getData.js";
import sumOfFunds from "./functions/sumOfFunds.js";
import flattenData from "./functions/flattenData.js";
import createScales from "./functions/createScales.js";
import createFront from "./functions/createFront.js";
import createTreemap from "./functions/createTreemap.js";
import drawChart from "./functions/drawChart.js";
import drawLegend from "./functions/drawLegend.js";
import drawHeader from "./functions/drawHeader.js";
import addTooltipTreemap from "./functions/addTooltipTreemap.js";
import addTooltipLegend from "./functions/addTooltipLegend.js";

//data locations
const URLs = {
  kickstart:
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
  movies:
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
  games:
    "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",
  static_kickstart: "./static-data/kickstarter-static.json",
  static_movies: "./static-data/movie-static.json",
  static_games: "./static-data/videogame-static.json",
};

//get STATIC data
const kickstart = await getData(URLs.static_kickstart);
const movies = await getData(URLs.static_movies);
const games = await getData(URLs.static_games);

console.log(JSON.stringify(kickstart));

//flatten data objects
const kickstartFlat = flattenData(kickstart);
const moviesFlat = flattenData(movies);
const gamesFlat = flattenData(games);

//create treemaps, add identifier
const rootKickstart = createTreemap(kickstartFlat, sumOfFunds);
rootKickstart.dataset = "kickstarter";
const rootMovies = createTreemap(moviesFlat, sumOfFunds);
rootMovies.dataset = "movies";
const rootGames = createTreemap(gamesFlat, sumOfFunds);
rootGames.dataset = "games";

//TVLs
const totals = [rootKickstart.value, rootMovies.value, rootGames.value];

//create frontpage
createFront(
  rootKickstart,
  rootMovies,
  rootGames,
  createScales,
  createFront,
  drawHeader,
  drawChart,
  drawLegend,
  addTooltipTreemap,
  addTooltipLegend,
  totals
);

document.getElementsByClassName("links")[0].click();
