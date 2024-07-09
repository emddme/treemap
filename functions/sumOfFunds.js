const sumOfFunds = (group) => {
  return d3.sum(group, (d) => parseInt(d.value));
};

export default sumOfFunds;
