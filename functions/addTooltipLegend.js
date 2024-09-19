const addTooltipLegend = () => {
  d3.select("#legend")
    .selectAll(".legend-field")
    .on("mouseenter", (e) => {
      const category = e.target.parentElement.attributes.category.value;
      const value = e.target.parentElement.attributes.value.value;
      const w = 20;
      const h = 6;
      const transX = 0;
      const transY =
        e.target.parentElement.attributes.itemsLength.value * 4 + 4;
      const translation = `translate(${transX},${transY})`;

      const tooltip = d3
        .select("#legend")
        .append("g")
        .attr("id", "legendTooltip")
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
    .on("mouseout", () => d3.select("#legendTooltip").remove());
};
export default addTooltipLegend;
