const drawNavbar = (chartName, createFront, frontArgs) => {
  d3.select("#app").append("div").attr("id", "navbar");
  d3.select("#navbar")
    .append("h1")
    .classed("title", true)
    .text(chartName)
    .style("color", "darkblue");
  d3.select("#navbar")
    .append("h1")
    .classed("link", true)
    .attr("id", "back")
    .text("BACK")
    .style("color", "black")
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
    .on("click", () => createFront(...frontArgs));
};

export default drawNavbar;
