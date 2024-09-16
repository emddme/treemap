const createFront = (...props) => {
  //variables
  const welcome = "Welcome!";
  const intro = "top-100 Treemaps:";
  const mapIdsAndNames = [
    ["kickstart", "Kickstarter fundraisers"],
    ["films", "Highest grossing films"],
    ["games", "Videogame sales"],
  ];
  //add descriptions and prop-drill to navbar
  const descriptions = [];

  //clean page
  d3.select("#app").selectAll("*").remove();

  //add headers and navbar
  d3.select("#app").append("h1").classed("title", true).text(welcome);
  d3.select("#app").append("h2").classed("subtitle", true).text(intro);
  d3.select("#app").append("div").attr("id", "navbar");

  //populate navbar, define event listeners
  for (let i = 0; i < 3; i++) {
    d3.select("#navbar")
      .append("h3")
      .classed("links", "true")
      .attr("id", mapIdsAndNames[i][0])
      .text(mapIdsAndNames[i][1])
      .on("mouseover", (e) =>
        d3
          .select(`#${e.target.id}`)
          .style("color", "white")
          .style("cursor", "grab")
      )
      .on("mouseout", (e) =>
        d3
          .select(`#${e.target.id}`)
          .style("color", "black")
          .style("cursor", "default")
      )
      .on("click", (e) => {
        d3.select("#app").selectAll("*").remove();
        const clicked = e.target.outerText;
        const frontArgs = [...props];
        //drawNavbar
        props[5](clicked, props[4], frontArgs);
        //create chart-container
        d3.select("#app").append("div").attr("id", "chart-container");
        //drawLegend
        props[7](props[3], props[i]);
        //drawChart
        props[6](props[3], props[i]);
        //addTooltip
        props[8]();
      });
  }
};

export default createFront;
