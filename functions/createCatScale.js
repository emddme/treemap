const createCatScale = (rootObj) => {
  const domain = [0, rootObj.children.length];
  const scale = d3
    .scaleSequential()
    .domain(domain)
    .interpolator(d3.interpolateRainbow);
  return scale;
};

export default createCatScale;
