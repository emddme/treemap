import getData from "./functions/getData.js";
import {
  kickstartURL,
  kickstartURL_static,
  moviesURL,
  moviesURL_static,
  gamesURL,
  gamesURL_static,
} from "./variables.js";

//get static json
const kickstart = await getData(kickstartURL_static);
const movies = await getData(moviesURL_static);
const games = await getData(gamesURL_static);

//get external json
// const kickstart = await getData(kickstartURL);
// const movies = await getData(moviesURL);
// const games = await getData(gamesURL);

console.log(kickstart, movies, games);
