const createSVG = (viewBox, rootObj, stroke) => {
  d3.select("#app")
    .append("svg")
    .attr("id", "chart")
    .attr("viewBox", viewBox)
    .selectAll("rect")
    .data(rootObj)
    .enter()
    .append("rect")
    .classed("limit", true)
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("stroke", stroke);
};
export default createSVG;
