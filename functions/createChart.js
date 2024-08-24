const createChart = (
  createFront,
  frontArgs,
  createScales,
  chartName,
  viewBox,
  stroke,
  rootObj
) => {
  //createScales
  const catScale = createScales(rootObj)[0];
  const valueScale = createScales(rootObj)[1];

  //insert navbar
  d3.select("#app").append("div").attr("id", "navbar");
  d3.select("#navbar")
    .append("h3")
    .classed("link", true)
    .text(chartName)
    .style("color", "darkblue");
  d3.select("#navbar")
    .append("h3")
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

  // draw chart
  d3.select("#app")
    .append("svg")
    .attr("id", "chart")
    .attr("viewBox", viewBox)
    .selectAll("rect")
    .data(rootObj)
    .enter()
    .append("rect")
    .attr("class", (d) => {
      if (d.depth === 0) {
        return "trunk";
      } else if (d.depth === 1) {
        return `branch ${d.data[0]}`;
      } else if (d.depth === 2) {
        return `leaf`;
      } else {
      }
    })
    .attr("id", (d) => {
      if (d.depth === 2) {
        return `${d.data[0]}`;
      } else {
      }
    })
    .attr("value", (d) => d.value)
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("stroke", stroke)
    .style("fill", (d, i) => {
      if (d.depth === 1) {
        const fill = catScale(i);
        return fill;
      } else if (d.depth === 2) {
        const fill = valueScale(d.value);
        return fill;
      }
    });
};
export default createChart;
