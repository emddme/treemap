const addTooltip = () => {
  d3.selectAll(".tile")
    .on("mouseover", (e) => {
      const w = 31;
      const h = 15;
      let x = (e.target.__data__.x0 + e.target.__data__.x1) / 2;
      let y = (e.target.__data__.y0 + e.target.__data__.y1) / 2;
      if (x > 70) {
        x = x - w;
      }
      if (y > 80) {
        y = y - h;
      }
      const tooltip = d3
        .select("#chart")
        .append("g")
        .attr("id", "tooltip")
        .attr("transform", `translate(${x}, ${y})`)
        .attr("width", w)
        .attr("height", h)
        .attr("data-value", e.target.__data__.value);

      tooltip
        .append("rect")
        .attr("id", "tooltip-rect")
        .style("rx", "2%")
        .attr("width", w)
        .attr("height", h);
      tooltip
        .append("foreignObject")
        .attr("x", 1)
        .attr("y", 1)
        .attr("width", w)
        .attr("height", h)
        .append("xhtml:div")
        .text(e.target.__data__.data[0])
        .classed("rect-text", true);
      tooltip
        .append("foreignObject")
        .attr("x", 1)
        .attr("y", 8)
        .attr("width", w)
        .attr("height", h)
        .append("xhtml:div")
        .text(
          new Intl.NumberFormat("us-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(e.target.__data__.data[1])
        )
        .classed("rect-text", true);
    })
    .on("mouseout", () => d3.select("#tooltip").remove());
};
export default addTooltip;
