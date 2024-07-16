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

//create treemap
const root = createTreemap(kickstartFlat, sumOfFunds, size, padding);

//create svg
createSVG(viewBox, root, stroke);

// verification, logging
const verify = (input) => {
  let sum = 0;
  input.forEach((k) => {
    for (let i = 0; i < k.children.length; i++) {
      sum = sum + parseInt(k.children[i].value);
    }
  });
  return sum;
};
console.log(kickstart.children);
console.log(kickstartFlat);
console.log("d3 computed total funds", sumOfFunds(kickstartFlat));
console.log("verified total funds", verify(kickstart.children));
console.log(root);
