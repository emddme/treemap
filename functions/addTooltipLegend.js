const addTooltipLegend = () => {
  d3.select("#legend")
    .selectAll(".legend-group")
    .on("mouseenter", (e) => {
      const category = e.target.attributes.category.value;
      const value = e.target.attributes.value.value;
      const w = 20;
      const h = 3;
      const translation = `translate(${0},${40})`;

      const tooltip = d3
        .select("#legend")
        .append("g")
        .attr("id", "tooltip")
        .attr("transform", translation)
        .attr("width", w)
        .attr("height", h);

      tooltip
        .append("foreignObject")
        .attr("width", w)
        .attr("height", h)
        .append("xhtml:div")
        .text(() => {
          let formattedValue;
          if (value.length > 3) {
            formattedValue = new Intl.NumberFormat("us-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(value);
          } else {
            formattedValue = `${value}M copies sold`;
          }
          return `${category}, ${formattedValue}`;
        })
        .classed("ttb-text", true);
    })
    .on("mouseout", () => d3.select("#tooltip").remove());
};
export default addTooltipLegend;
