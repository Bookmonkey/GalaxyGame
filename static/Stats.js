const Global = {
  build_time: 0.00,
  speed: 3,

  tick: 1000,

  // @property how long the queue is refreshed
  interval: 300000,
};

const PlanetTypes = [
  {
    type: "earthlike",
    slots: [200, 260],
    temperatures: [16, 27],
    artifacts: [1,2]
  },
  {
    type: "aqua",
    slots: [140, 190],
    temperatures: [8, 18],
    artifacts: null
  },
  {
    type: "giant", 
    slots: [230, 290],
    temperatures: [19, 34],
    artifacts: [0,2]
  },
  {
    type: "dwarf", 
    slots: [110, 170],
    temperatures: [16, 27],
    artifacts: [2,4]
  },
]

const Resources = {
  minerals: {
    base_resource: 45,
    resource_mod: 1.05,
    calculate:  function (currentLevel) {
      // =GlobalSpeed * BaseRres * LVL * POWER(BaseMod, LVL) + LVL * POWER(ResearchMod, RMLVL)* SpecialEventBonus
      return Global.speed * this.base_resource * currentLevel * Math.pow(this.resource_mod, currentLevel);
    }
  },
  chemicals: {
    base_resource: 30,
    resource_mod: 1.03,
    calculate:  function (currentLevel) {
      // =GlobalSpeed * BaseRres * LVL * POWER(BaseMod, LVL) + LVL * POWER(ResearchMod, RMLVL)* SpecialEventBonus
      return Global.speed * this.base_resource * currentLevel * Math.pow(this.resource_mod, currentLevel);
    }
  },
  gases: {
    base_resource: 25,
    resource_mod: 1,
    calculate:  function (currentLevel) {
      // =GlobalSpeed * BaseRres * LVL * POWER(BaseMod, LVL) + LVL * POWER(ResearchMod, RMLVL)* SpecialEventBonus
      return Global.speed * this.base_resource * currentLevel * Math.pow(this.resource_mod, currentLevel);
    }
  }
};

const Buildings = [{
    type: 'resource',
    key: 'mine',
    name: "Mineral Mine",
    base_build_time: 60000,
    build_time_mod: 1.2,
    imgPath: "../assets/images/buildings/mine.png"
  },
  {
    type: 'resource',
    key: 'chemical',
    name: "Chemical Synthesizer",
    base_resource: 30,
    resource_mod: 1.03,
    base_build_time: 100000,
    build_time_mod: 1.4,
    imgPath: "../assets/images/buildings/chemical.png"
  },

  {
    type: 'resource',
    key: 'gas',
    name: "Gas Extractor",
    base_resource: 25,
    resource_mod: 1,
    base_build_time: 100000,
    build_time_mod: 1.8,
    imgPath: "../assets/images/buildings/gas.png"
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
    base_build_time: 40000
  },

  {
    type: 'storage',
    key: 'chemical_storage',
    name: "Chemical Storage",
    capacity: 20000,
    base_build_time: 40000
  },
  {
    type: 'storage',
    key: 'gas_storage',
    name: "Gas Exchange",
    capacity: 20000,
    base_build_time: 40000
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
    name: "Research Lab"
  },
  {
    type: 'service',
    key: 'port',
    name: "Space Port"
  },
  {
    type: 'service',
    key: 'robotic',
    name: "Robotic Industries"
  },

  {
    type: 'service',
    key: 'nanotech',
    name: "Nanotech Industries"
  },

  {
    type: 'wonder',
    key: 'bar',
    name: "Leisure Centre"
  },
  {
    type: 'wonder',
    key: 'academy',
    name: "Space Academy"
  },
  {
    type: 'wonder',
    key: 'institute',
    name: "Scietific Institute"
  },
];

const Ships = [{
    type: 'b',
    key: "light_cargo",
    name: "Light Cargo Ship",
    description: "Getting your materials from A to B. Probably best to avoid combat."
  },
  {
    type: "b",
    key: 'light_fighter',
    name: "Light fighter",
    description: "Front line ship. "
  },
  {
    type: "b",
    key: "crusier",
    name: "Light Crusier",
    description: "Cruise through the battle, taking out ships with lasers"
  },
  {
    type: "b",
    key: "drone",
    name: "Spy drone",
    description: "A drone that can scan and retreive information about a planet"
  },
  {
    type: 'a',
    key: "heavy_cargo",
    name: "Heavy Cargo Ship",
    description: "For those long haul flights, with large quantities of materials. This new cargo ship was designed to be combat ready."
  },
  {
    type: 'a',
    key: "battle_crusier",
    name: "Battle Crusier",
    description: "With faster speeds, bigger and brighter lasers, the engineers even changed the colours of the laser beams. Nobody knows why."
  },
  {
    type: 'a',
    key: "destroyer",
    name: "Battle Destroyer",
    description: "Moderately fast, good for dealing with ships, has plasma and ion blasting cannons"
  },

  {
    type: 'a',
    key: "bomber",
    name: "Bomber",
    description: "Bombers are slow and focused on dealing lots of damange to planet side defenses"
  },

  {
    type: "s",
    key: "decoy",
    name: "Decoy ship",
    description: "Used as fodder, controlled by smart AI, whilst they are expensive they prove to be useful when engaging in large scale combat."
  },
  {
    type: 's',
    key: "mining",
    name: "Asteroid miner",
    description: "Mining in space! Who would have thought! Choose one material to mine and get a 1% increase for a week. Any combat on the planet will result in this ships destruction."
  },
  {
    type: "s",
    key: "salvager",
    name: "Salvager",
    description: "Salvage any materials from previous battles. Or explore the galaxy with it, you might discover new things"
  },
  {
    type: "s",
    key: "bfs",
    name: "BFS",
    description: "This ship is big... some say it can be mistaken for a moon. Slow, but does kill fleets."
  },
  {
    type: "s",
    key: "colony",
    name: "Colony ship",
    description: "Used to establish an outpost or a full colony on a planet. Send up to 20,000 materials along with it."
  }


];
const ResearchTree = [
  {
    type: 'eco',
    key: 'core_mining',
    name: "Planet core mining",
    can_level: true,
    description: "Grants additional minerals (x.xx%)"
  },
  {
    type: 'eco',
    key: 'gas_extraction',
    name: "Gas Extraction",
    can_level: true,
    description: "Grants additional gas (x.xx%)"
  },
  {
    type: 'eco',
    key: 'chemical_synth',
    name: "Chemical Synth",
    can_level: true,
    description: "Grants additional chemicals (x.xx%)"
  },
  {
    type: 'eco',
    key: 'storage',
    name: "Storage expansion",
    can_level: true,
    description: "Using the latest compression developed by piper labs you can now store more materials"
  },
  {
    type: 'eco',
    key: 'dis',
    name: "D.I.S",
    can_level: true,
    description: "Dimensions in Space. We now have the ability to transport resources instantly between our planets. Warning, works most of the time...",
    requires: ["warp_engine"],
  },
  {
    type: "other",
    key: "ice_planets",
    name: "Colonize ice planets"
  },
  {
    type: "other",
    key: "gas_planets",
    name: "Colonize gas planets"
  },
  {
    type: 'militaristic',
    key: 'combusion_engine',
    name: "Combusion Engine",
    description: "Wait? Dont we already know this?"
  },
  {
    type: 'militaristic',
    key: 'ftl',
    name: "FTL Engine",
    description: "Bend the light around us!",
    requires: ["combusion_engine"]
  },
  {
    type: 'militaristic',
    key: 'warp_engine',
    name: "Warp Engine",
    description: "A to B. Instatly.",
    requires: ["er_bridge"],
  },
  {    
    type: 'militaristic',
    key: "er_bridge",
    name: "Einstein-Rosen Bridge",
    description: "Bruh, you cant just do that."
  },
  {
    type: "militaristic",
    key: "basic_shield",
    name: "Basic shields",
  },  
  {
    type: "militaristic",
    key: "advanced_shield",
    name: "Advanced shields",
    requires: ["basic_shields"]
  },
  {
    type: "militaristic",
    key: "defence_grid",
    name: "Planetary defence grid",
    requires: ["basic_shields"]
  },  
  {
    type: "militaristic",
    key: "interplanetary_network",
    name: "Interplanetary defence network",
    requires: ["defence_grid", "advanced_shields"]
  },
  {
    type: 'militaristic',
    key: 'red_laser',
    name: "Red Lasers"
  },
  {
    type: 'militaristic',
    key: 'yellow_laser',
    name: "Yellow Lasers",
    requires: ["red_laser"]
  },
  {
    type: 'militaristic',
    key: 'green_laser',
    name: "Green Lasers",
    requires: ["yellow_laser"]
  },
  {
    type: 'militaristic',
    key: 'blue_laser',
    name: "Blue Lasers",    
    requires: ["green_laser"]
  }
];
const Defence = [];


module.exports = {
  Global,
  PlanetTypes,
  Resources,
  Buildings,
  Ships,
  ResearchTree,
  Defence,
}