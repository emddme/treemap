const drawChart = (createScales, rootObj) => {
  //variables
  const viewBox = "0 0 100 100";

  //createScales
  const catScale = createScales(rootObj)[0];
  const valueScale = createScales(rootObj)[1];

  // draw chart
  d3.select("#chart-container")
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
        return `tile`;
      } else {
      }
    })
    .attr("data-name", (d) => {
      if (d.depth === 2) {
        return `${d.data[0]}`;
      } else {
      }
    })
    .attr("data-category", (d) => {
      if (d.depth === 1) {
        return d.data[0];
      } else if (d.depth === 2) {
        return d.parent.data[0];
      }
    })
    .attr("data-value", (d) => d.value)
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    // .style("stroke", stroke)
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
};
export default drawChart;
