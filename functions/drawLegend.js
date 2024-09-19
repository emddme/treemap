const drawLegend = (createScales, rootObj) => {
  const scale = createScales(rootObj)[0];
  const categories = rootObj.children.map((item) => item.data[0]);
  const values = rootObj.children.map((item) => item.value);
  const viewBox = "0 0 20 100";

  //group offset
  const g_x = 1;
  const g_y = 1;
  const g_dy = 3;

  //field dimensions
  const f_w = 15;
  const f_h = 1.5;

  //cube dimensions
  const c_edge = 1;

  //text offset
  const t_x = 2;
  const t_y = 1;

  //create svg
  d3.select("#chart-container")
    .append("div")
    .attr("id", "legend-container")
    .append("svg")
    .attr("viewBox", viewBox)
    .attr("id", "legend");

  //create groups
  for (let i = 0; i < categories.length; i++) {
    d3.select(`#legend`)
      .append("g")
      .classed("legend-group", true)
      .attr("id", `legend-group${i}`)
      .attr("transform", `translate(${g_x},${g_y + g_dy * i})`)
      .attr("category", categories[i])
      .attr("value", values[i])
      .attr("itemsLength", categories.length);
  }

  //draw cubes
  for (let i = 0; i < categories.length; i++) {
    d3.select(`#legend-group${i}`)
      .append("rect")
      .classed("legend-cube legend-item", true)
      .attr("width", c_edge)
      .attr("height", c_edge)
      .style("fill", `${scale(i)}`);
  }

  //insert texts
  for (let i = 0; i < categories.length; i++) {
    d3.select(`#legend-group${i}`)
      .append("text")
      .classed("legend-text", true)
      .attr("x", t_x)
      .attr("y", t_y)
      .text(categories[i]);
  }
  //create event trigger-fields
  for (let i = 0; i < categories.length; i++) {
    d3.select(`#legend-group${i}`)
      .append("rect")
      .classed("legend-field", true)
      .attr("width", f_w)
      .attr("height", f_h)
      .style("opacity", 0);
  }
};
export default drawLegend;
