const createScales = (rootObj) => {
  const catDomain = [0, rootObj.children.length];
  const catScale = d3
    .scaleSequential()
    .domain(catDomain)
    .interpolator(d3.interpolateRainbow);

  const valueList = rootObj.children
    .map((k) => k.children.map((k) => k.value))
    .flat();
  const valueDomain = d3.extent(valueList);
  const valueScale = d3
    .scaleSequential()
    .domain(valueDomain)
    .interpolator(d3.interpolateRgb("lightgrey", "grey"));

  return [catScale, valueScale];
};

export default createScales;
