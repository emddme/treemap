import getData from "./functions/getData.js";
import sumOfFunds from "./functions/sumOfFunds.js";
import flattenData from "./functions/flattenData.js";
import createTreemap from "./functions/createTreemap.js";
import createSVG from "./functions/createSVG.js";
import { URLs, size, stroke, viewBox, padding } from "./variables.js";

//get STATIC data
const kickstart = await getData(URLs.static_kickstart);
const movies = await getData(URLs.static_movies);
const games = await getData(URLs.static_games);

//flatten kickstart object
const kickstartFlat = flattenData(kickstart);
const moviesFlat = flattenData(movies);
const gamesFlat = flattenData(games);

//create scales

//create treemap
const rootKickstart = createTreemap(kickstartFlat, sumOfFunds, size, padding);
const rootMovies = createTreemap(moviesFlat, sumOfFunds, size, padding);
const rootGames = createTreemap(gamesFlat, sumOfFunds, size, padding);

//create svg
// const chartKickstart = createSVG(viewBox, rootKickstart, stroke);
const chartMovies = createSVG(viewBox, rootMovies, stroke);
// const chartGames = createSVG(viewBox, rootGames, stroke);

//logging etc.
console.log(kickstart.children);
