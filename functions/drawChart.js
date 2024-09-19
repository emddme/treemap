const drawChart = (createScales, rootObj) => {
  //variables
  const viewBox = "0 0 960 470";

  //createScales
  const catScale = createScales(rootObj)[0];
  const valueScale = createScales(rootObj)[1];

  // draw chart
  const groups = d3
    .select("#chart-container")
    .append("div")
    .attr("id", "treemap-container")
    .append("svg")
    .attr("id", "chart")
    .attr("viewBox", viewBox)
    .selectAll("g")
    .data(rootObj)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`)
    .attr("class", (d) => {
      if (d.depth === 0) {
        return "trunk";
      } else if (d.depth === 1) {
        return `branch ${d.data[0]}`;
      } else if (d.depth === 2) {
        return `leaf`;
      } else {
      }
    });

  groups
    .append("rect")
    .classed("tile", true)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("data-name", (d) => {
      if (d.depth === 0) {
        return d.dataset;
      } else {
        return d.data[0];
      }
    })
    .attr("data-category", (d) => {
      if (d.depth === 1) {
        return d.data[0];
      } else if (d.depth === 2) {
        return d.parent.data[0];
      } else {
        return d.dataset;
      }
    })
    .attr("data-value", (d) => d.value)
    .style("fill", (d, i) => {
      if (d.depth === 1) {
        return catScale(i);
      } else if (d.depth === 2) {
        return valueScale(d.value);
      }
    })
    .style("opacity", (d) => {
      if (d.depth === 2) {
        return "0.8";
      }
    });

  groups
    .append("foreignObject")
    .classed("tile-text", true)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .append("xhtml:div")
    .text((d) => {
      if (d.depth === 2) {
        return `${d.data[0]}`;
      }
    })
    .classed("rect-text", true);
};
export default drawChart;
