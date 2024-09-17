const drawHeader = (chartName, totals, createFront, frontArgs) => {
  console.log(chartName);

  const descriptions = [
    `Top-100 highest yield Kickstarter online fundraiser campaigns`,
    `Top-100 highest grossing US film productions`,
    `Top 100 videogame sales (absolute)`,
  ];

  //format total and specify description
  let description;
  let total;
  if (chartName === "Kickstarter fundraisers") {
    total = new Intl.NumberFormat("us-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(totals[0]);
    description = descriptions[0] + `, total ${total}`;
  } else if (chartName === "Highest grossing films") {
    total = new Intl.NumberFormat("us-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(totals[1]);
    description = descriptions[1] + `, total ${total}`;
  } else if (chartName === "Videogame sales") {
    total = `${totals[2]} million copies`;
    description = descriptions[2] + `, total ${total}`;
  }

  //insert title
  d3.select("#app").append("div").attr("id", "navbar");
  d3.select("#navbar").append("h1").attr("id", "title").text(chartName);

  //insert links, add click events
  d3.select("#navbar")
    .append("h1")
    .classed("link", true)
    .attr("id", "back")
    .text("more")
    .style("color", "black")
    .on("mouseover", (e) =>
      d3
        .select(`#${e.target.id}`)
        .style("color", "white")
        .style("cursor", "grab")
    )
    .on("mouseout", (e) =>
      d3
        .select(`#${e.target.id}`)
        .style("color", "black")
        .style("cursor", "default")
    )
    .on("click", () => createFront(...frontArgs));

  //insert description
  d3.select("#app").append("h2").attr("id", "description").text(description);
};

export default drawHeader;
