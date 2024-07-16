const flattenData = (set) => {
  return set.children.map((k) => k.children).flat();
};
export default flattenData;
