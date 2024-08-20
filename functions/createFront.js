const createFront = (...args) => {
  const welcome = "Welcome!";
  const intro = "Available Treemaps:";
  const mapIdsAndNames = [
    ["kickstart", "Top kickstart fundraisers"],
    ["films", "Top-grossing films"],
    ["games", "Top videogame sales"],
  ];
  d3.select("#app").append("h1").text(welcome);
  d3.select("#app").append("h2").text(intro);
  d3.select("#app").append("div").attr("id", "navbar");
  for (let i = 0; i < 3; i++) {
    d3.select("#navbar")
      .append("h3")
      .classed("link", "true")
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
        d3.select("#chart").remove();
        args[5](args[4], args[3], args[i]);
      });
  }
};

export default createFront;
