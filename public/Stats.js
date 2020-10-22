const Global = {
  build_time: 0.00
};

const Buildings = [{
    type: 'resource',
    key: 'mine',
    name: "Mineral Mine",
    resource_mod: 0.005,
    base_build_time: 60000,
    build_time_mod: 1.1,
  },
  {
    type: 'resource',
    key: 'chemical',
    name: "Chemical Synthesizer",
    resource_mod: 0.002,
    base_build_time: 100000,
    build_time_mod: 1.4
  },

  {
    type: 'resource',
    key: 'gas',
    name: "Gas Extractor",
    resource_mod: 0.002,
    base_build_time: 100000,
    build_time_mod: 1.4
  },
  {
    type: 'resource',
    planet_type: ['default', 'earthlike'],
    key: 'energy',
    name: "Power Plant #1",
    resource_mod: 0.2,
    base_build_time: 100000,
    build_time_mod: 1.4
  },

  {
    type: 'storage',
    key: 'mine_storage',
    name: "Mineral Storage",
    capacity: 20000,
    base_build_time: 40000,
  },

  {
    type: 'storage',
    key: 'chemical_storage',
    name: "Chemical Storage",
    capacity: 20000,
    base_build_time: 40000,
  },
  {
    type: 'storage',
    key: 'gas_storage',
    name: "Gas Exchange",
    capacity: 20000,
    base_build_time: 40000,
  },
  {
    type: 'storage',
    key: 'power_storage',
    name: "Battery Farm",
    capacity: 20000
  },
  {
    type: 'service',
    key: 'research',
    name: "Research Lab",
  },
  {
    type: 'service',
    key: 'port',
    name: "Space Port",
  },
  {
    type: 'service',
    key: 'robotic',
    name: "Robotic Industries",
  },
  
  {
    type: 'service',
    key: 'nanotech',
    name: "Nanotech Industries",
  },
  
  {
    type: 'wonder',
    key: 'bar',
    name: "Entertainment Complex",
  },  
  {
    type: 'wonder',
    key: 'academy',
    name: "The Space Academy",
  },
  {
    type: 'wonder',
    key: 'academy',
    name: "The Scietific Institute",
  },
];

const Fleet = [];
const ResearchTree = [
  {
    type: 'general',
    key: 'tech1',
    name: "Tech #1"
  },
  {
    type: 'general',
    key: 'tech2',
    name: "Tech #2"
  }
];
const Defence = [];


module.exports = {
  Global,
  Buildings,
  Fleet,
  ResearchTree,
  Defence,
}
