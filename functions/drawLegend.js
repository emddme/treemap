const drawLegend = (createScales, rootObj) => {
  const scale = createScales(rootObj)[0];
  const categories = rootObj.children.map((item) => item.data[0]);
  const values = rootObj.children.map((item) => item.value);
  const viewBox = "0 0 10 100";

  //cube dimensions
  const c_edge = 0.5;
  const c_x = 0.5;
  const c_y = 1;
  const c_dy = 1.5;

  //text dimensions
  const t_x = 0.75;
  const t_y = 1.5;
  const t_dy = 1.5;

  //create svg
  d3.select("#chart-container")
    .append("div")
    .attr("id", "legend-container")
    .append("svg")
    .attr("viewBox", viewBox)
    .attr("id", "legend");

  //draw cubes
  for (let i = 0; i < categories.length; i++) {
    d3.select("#legend")
      .append("rect")
      .attr("id", "legend-item")
      .attr("x", `${c_x}`)
      .attr("y", `${c_y + c_dy * i}`)
      .attr("height", c_edge)
      .attr("width", c_edge)

      .style("fill", `${scale(i)}`);
  }

  //insert texts
  for (let i = 0; i < categories.length; i++) {
    d3.select("#legend")
      .append("text")
      .classed("legend-text", true)
      .attr("x", c_x + t_x)
      .attr("y", `${t_y + t_dy * i}`)
      .attr("value", values[i])
      .text(categories[i]);
  }
};
export default drawLegend;
