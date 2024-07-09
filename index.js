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

//create nested map object 'groups'
const groups = d3.rollup(
  kickstartFlat,
  sumOfFunds,
  (d) => d.category,
  (d) => d.name
);

//feed groups to hierarchy-method to create D3's hierarchy-structure 'root'
const root = d3.hierarchy(groups);

//hierarchy's sum method propagates
root.sum((d) => d[1]);

console.log(root);

// total funds verification
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
