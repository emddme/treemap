const addTooltipTreemap = () => {
  d3.selectAll(".tile")
    .on("mouseenter", (e) => {
      const w = 31;
      const h = 16;
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
        .attr("width", w)
        .attr("height", h)
        .append("xhtml:div")
        .text(() => {
          const dataset = e.target.__data__.parent.parent.dataset;
          let formattedValue;
          if (dataset === "kickstarter" || dataset === "movies") {
            formattedValue = new Intl.NumberFormat("us-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(e.target.__data__.data[1]);
          } else {
            formattedValue = `${e.target.__data__.data[1]}M copies sold`;
          }
          return `${e.target.__data__.data[0]}\ncategory: ${e.target.__data__.parent.data[0]}\n${formattedValue}`;
        })
        .classed("rect-text", true);
    })
    .on("mouseout", () => d3.select("#tooltip").remove());
};
export default addTooltipTreemap;
