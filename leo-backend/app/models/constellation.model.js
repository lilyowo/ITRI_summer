let constellationData = [];
let abc_def = [];
const addConstellation = (constellation) => {
  constellationData.push(constellation);
};

const getConstellations = () => {
  return constellationData;
};

module.exports = {
  addConstellation,
  getConstellations,
};
