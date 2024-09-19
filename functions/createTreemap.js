const createTreemap = (flatSet, reducer) => {
  //dimension/styling variables
  const size = [960, 570];
  const padding = 0;

  //treemap
  const group = d3.rollup(
    flatSet,
    reducer,
    (d) => d.category,
    (d) => d.name
  );
  const root = d3.hierarchy(group);
  root.sum((d) => d[1]);
  const treemap = d3.treemap();
  treemap.size(size).padding(padding);
  treemap(root);
  return root;
};
export default createTreemap;
