const { Global, Resources, Buildings } = require("../../static/Stats");
// const PlanetData = require("../data/Planet");
const { PlanetData, QueueData } = require("../data");
const Queue = require("../controllers/QueueController");

const PlanetController = {

  create: function (playerId) {
    // generate planet information
    let planetData = {
      name: "Homeworld",
      type: "default",
      slot_total: 400,
      npc: false,
      playerId: playerId
    };

    PlanetData.create(planetData);
  },

  getInformationForPlanet: async function(planetId) {
    let planetInfo = await PlanetData.getInformationForPlanet(planetId);

    let buildingsInQueue = await QueueData.getItemsByPlanetId(planetId);

    planetInfo = this.formatPlanetInfo(planetInfo);
    planetInfo.buildingQueue = buildingsInQueue;

    console.log(planetInfo);

    return planetInfo;
  },

  getAllPlanetsForPlayerId: async function(playerId) {
    let planets = await PlanetData.getAllPlanetsForPlayerId(playerId);
    planets.map(ele => {
      return this.formatPlanetInfo(ele);
    });

    return planets;
  },

  addBuildingToQueue: async function (type, key, playerId, planetId) {
    let result = {
      added: false,
      error: "",
    };

    try {
      let planetBuildingLevels = await PlanetData.getBuildingLevels(planetId, playerId);
      let buildingLevel = planetBuildingLevels[key];

      let buildingInfo = Buildings.filter(ele => ele.key === key)[0];

      let buildTime = this.getCurrentTimeForLevel(buildingInfo, buildingLevel);
      let timestamp = new Date().getTime() + buildTime;
      timestamp = new Date(timestamp);

      let addToUpcomingItems = false;

      if(buildTime < Global.interval) {
        addToUpcomingItems = true;  
      }

      let payload = {
        type,
        key,
        timestamp,
        playerId,
        planetId,
        addToUpcomingItems
      };

      Queue.add('building', payload);

      result.added = true;

    } catch (error) {
      console.error(error);
    }

    return result;

   },

  formatPlanetInfo: function (planetInfo){
    let info = {
      info: {
        id: planetInfo.planet_id,
        name: planetInfo.planet_name,
        type: planetInfo.planet_type,
        slots: planetInfo.building_slots_total
      },
      resources: { },
      levels: {
        mine: planetInfo.mine,
        chemical: planetInfo.chemical,
        gas: planetInfo.gas,
      },
      buildingTimes: {},
      military: {},
    };
  
    // loops through Stats building object
    // calculates resources and time based on levels
    // then appends to the info object above
    Buildings.map((building) => {
      let key = building.key;
      let level = info.levels[building.key];
      let timeForLevel = this.getCurrentTimeForLevel(building, level);
      info.buildingTimes[key] = timeForLevel;
  
      return building;
    });


    let minerals = parseInt(planetInfo.minerals);
    let chemicals = parseInt(planetInfo.chemicals);
    let gases = parseInt(planetInfo.gases);
    let energy = parseInt(planetInfo.energy);
    let lastTimestamp = planetInfo.last_updated_timestamp;
  
    info.resources = this.calculateResourcesFromLastTimestamp(minerals, chemicals, gases, energy, lastTimestamp, info.levels);
  
    return info;
  },

  updateResources: async function(planetId, playerId) {
    let resources = await PlanetData.getResources(planetId, playerId);
    let buildingLevels = await PlanetData.getBuildingLevels(planetId, playerId);
    let levels = {
      mine: buildingLevels.mine,
      chemical: buildingLevels.chemical,
      gas: buildingLevels.gas
    };
  
    
    let minerals = parseInt(resources.minerals);
    let chemicals = parseInt(resources.chemicals);
    let gases = parseInt(resources.gases);
    let energy = parseInt(resources.energy);
  
      
    let lastTimestamp = resources.last_updated_timestamp;
  
    let latestResources = this.calculateResourcesFromLastTimestamp(minerals, chemicals, gases, energy, lastTimestamp, levels);
    await PlanetData.updateResources(latestResources, planetId, playerId);
  },

  getCurrentTimeForLevel: function(item, level) {
    let specialBaseTime = parseInt(Global.build_time);
    let baseTime = parseInt(item.base_build_time);
    let mod = parseFloat(item.build_time_mod);
  
    let time = baseTime;
  
    if(level > 0) {
      time *= (mod * level); 
    }
  
    return time;
  },
  
  calculateResourcesFromLastTimestamp: function(minerals, chemicals, gases, energy, lastTimestamp, levels) {
    let resources = {
      minerals: minerals, 
      chemicals: chemicals,
      gases: gases,
      energy: energy,
    };
  
    
    let timeNow = new Date();
    let lastTime = new Date(lastTimestamp);
    
    // number of seconds since
    let totalTimeSince = Math.round(Math.abs((timeNow.getTime() - lastTime.getTime()) / 1000));
  
  
    // calculate the amount generated for each second.
    let latestResources = {
      minerals: Resources.minerals.calculate(levels['mine']) / 3600,
      chemicals: Resources.chemicals.calculate(levels['chemical']) / 3600,
      gases: Resources.gases.calculate(levels['gas']) / 3600,
    };  
    
    resources.minerals += Math.floor(latestResources.minerals * totalTimeSince);
    resources.chemicals +=  Math.floor(latestResources.chemicals * totalTimeSince);
    resources.gases += Math.floor(latestResources.gas * totalTimeSince);
    
    return resources;
  }
  

};

module.exports = PlanetController;