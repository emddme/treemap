const addTooltipTreemap = () => {
  d3.selectAll(".tile")
    .on("mouseenter", (e) => {
      const w = 200;
      let h;
      let offset;
      let x;
      let y;
      if (
        e.target.attributes["data-name"].value ===
        e.target.attributes["data-category"].value
      ) {
        h = 35;
        offset = 25;
        x = e.target.__data__.x1 - offset;
        y = (e.target.__data__.y0 + e.target.__data__.y1) / 2 - h / 2;
        if (x > 700) {
          x = e.target.__data__.x0 - w + offset;
        }
      } else {
        h = 60;
        offset = 10;
        x = e.target.__data__.x1 - offset;
        y = e.target.__data__.y1 - offset;
        if (x > 700) {
          x = e.target.__data__.x0 + offset - w;
        }
        if (y > 400) {
          y = e.target.__data__.y0 + offset - h;
        }
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
        .style("rx", "2px")
        .attr("width", w)
        .attr("height", h);

      if (
        e.target.attributes["data-name"].value ===
        e.target.attributes["data-category"].value
      ) {
        tooltip
          .append("foreignObject")
          .attr("width", w)
          .attr("height", h)
          .append("xhtml:div")
          .text(() => {
            const dataset = e.target.__data__.parent.dataset;
            let formattedValue;
            if (dataset === "kickstarter" || dataset === "movies") {
              formattedValue = new Intl.NumberFormat("us-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(e.target.attributes["data-value"].value);
            } else {
              formattedValue = `${e.target.attributes["data-value"].value}M copies sold`;
            }
            return `category: ${e.target.__data__.data[0]}\n${formattedValue}`;
          })
          .classed("rect-text", true);
      } else {
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
      }
    })
    .on("mouseout", () => d3.select("#tooltip").remove());
};
export default addTooltipTreemap;
