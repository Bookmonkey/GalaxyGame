const Buildings = [{
    type: 'resource',
    key: 'mine',
    name: "Mineral Mine",
    base_mod: 0.5,
  },
  {
    type: 'resource',
    key: 'chemical',
    name: "Chemical Synthesizer",
    base_mod: 0.2,
  },

  {
    type: 'resource',
    key: 'gas',
    name: "Gas Extractor",
    base_mod: 0.3,
  },
  {
    type: 'resource',
    planet_type: ['default', 'earthlike'],
    key: 'energy',
    name: "Power Plant #1",
    base_mod: 0.2,
  },

  {
    type: 'storage',
    key: 'mine_storage',
    name: "Mineral Storage",
    capacity: 20000
  },

  {
    type: 'storage',
    key: 'chemical_storage',
    name: "Chemical Storage",
    capacity: 20000
  },
  {
    type: 'storage',
    key: 'gas_storage',
    name: "Gas Exchange",
    capacity: 20000
  },
  {
    type: 'storage',
    key: 'power_storage',
    name: "Battery Farm",
    capacity: 20000
  },
  // based on planet type you are given a different power building
  // {
  //   type: 'resource',
  //   planet_type: ['ice'],
  //   key: 'energy',
  //   name: "Wind farms",
  //   base_mod: 0.2,
  // },

  {
    type: 'research',
    key: 'research',
    name: "Research Lab",
  },

  {
    type: 'research',
    key: 'research',
    name: "Research Lab"
  }
];

const Fleet = [];
const ResearchTree = [];
const Defence = [];


module.exports = {
  Buildings,
  Fleet,
  ResearchTree,
  Defence,
}
