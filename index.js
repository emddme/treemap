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

//flatten kickstart object
const kickstartFlat = kickstart.children.map((k) => k.children).flat();

//create nested map object 'groups'
const groups = d3.rollup(
  kickstartFlat,
  sumOfFunds,
  (d) => d.category,
  (d) => d.name
);

//feed groups to hierarchy-method to create D3's hierarchy-structure 'root'
const root = d3.hierarchy(groups);

//hierarchy's sum method propagates associated value up the tree
root.sum((d) => d[1]);

//create treemap
const treemap = d3.treemap();

//set treemap layout
treemap.size([100, 100]).padding(1);

//call treemap with hierarchy object 'root'
treemap(root);

//create svg
d3.select("#app")
  .append("svg")
  .attr("id", "chart")
  .attr("viewBox", "0 0 100 100")
  .selectAll("rect")
  .data(root.leaves())
  .enter()
  .append("rect")
  .attr("x", (d) => d.x0)
  .attr("y", (d) => d.y0)
  .attr("width", (d) => d.x1 - d.x0)
  .attr("height", (d) => d.y1 - d.y0)
  .style("fill", "none")
  .style("stroke", "black")
  .style("stroke-width", 0.1);

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

//logs
console.log(kickstart.children);
console.log(kickstartFlat);
console.log("d3 computed total funds", sumOfFunds(kickstartFlat));
console.log("verified total funds", verify(kickstart.children));
console.log(root);
