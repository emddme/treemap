const createSVG = (viewBox, rootObj, stroke) => {
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
    .style("stroke", stroke);
};
export default createSVG;
