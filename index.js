import getData from "./functions/getData.js";
import sumOfFunds from "./functions/sumOfFunds.js";
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

const kickstartFlat = kickstart.children.map((k) => k.children).flat();

console.log(kickstart.children);
console.log(kickstartFlat);

const group = d3.rollup(
  kickstartFlat,
  sumOfFunds,
  (d) => d.category,
  (d) => d.name
);
console.log(
  group.get("Sound")
  // .get("Revols - Premium Quick Custom-Fit Wireless Earphones")
);

// sum verification
const verify = (input) => {
  let sum = 0;
  input.forEach((k) => {
    for (let i = 0; i < k.children.length; i++) {
      sum = sum + parseInt(k.children[i].value);
    }
  });
  return sum;
};

console.log("d3 computed total funds", sumOfFunds(kickstartFlat));
console.log("verified total funds", verify(kickstart.children));
