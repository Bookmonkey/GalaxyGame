const { Router } = require("express");
const Planets = require("../controllers/Planets");

const Queue = require("../controllers/QueueController");

const { Global, Resources, Buildings } = require("../../static/Stats");


let API = function() {
  const router = Router();

  router.get("/planet/:planetId", async (req, res) => {
    let planetId = req.params.planetId;
    
    let planetInfo = await Planets.getInformationForPlanet(planetId);    
    if(!planetInfo) {
      res.status(400).send("Planet not found");
    }

    planetInfo = formatPlanetInfo(planetInfo);

    res.status(200).send(planetInfo);
  })

  router.get("/overview/:playerId", async (req, res) => {
    let playerId = req.params.playerId;

    let planets = await Planets.getAllPlanetsForPlayerId(playerId);
    
    // return formatted planet to work with
    planets.map(ele => {
      return formatPlanetInfo(ele);
    });

    res.status(200).send(planets);
  });

  router.get("/planet/create/:playerId", async (req, res) => {
    let playerId = req.params.playerId;
    let planet = await Planets.create(playerId);
    res.status(200).send(planet);
  });


  router.post("/planet/upgrade", async (req, res) => {
    let type = req.body.type;
    let key = req.body.key;
    let playerId = req.body.playerId;
    let planetId = req.body.planetId;

    // need to implement queue
    
    try {
      let planetBuildingLevels = await Planets.getBuildingLevels(planetId, playerId);
      let buildingLevel = planetBuildingLevels[key];

      let buildingInfo = Buildings.filter(ele => ele.key === key)[0];

      let buildTime = getCurrentTimeForLevel(buildingInfo, buildingLevel);
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
    } catch (error) {
      console.error(error);
    }


    // await Planets.upgradeBuilding(type, key, planetId, playerId);
    
    // updateResources(planetId, playerId);    
  });  



  return router;
}

function getCurrentTimeForLevel(item, level) {
  let specialBaseTime = parseInt(Global.build_time);
  let baseTime = parseInt(item.base_build_time);
  let mod = parseFloat(item.build_time_mod);

  let time = baseTime;

  if(level > 0) {
    time *= (mod * level); 
  }

  return time;
}


function formatPlanetInfo(planetInfo){
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
    let timeForLevel = getCurrentTimeForLevel(building, level);
    info.buildingTimes[key] = timeForLevel;

    return building;
  });

  let minerals = parseInt(planetInfo.minerals);
  let chemicals = parseInt(planetInfo.chemicals);
  let gases = parseInt(planetInfo.gases);
  let energy = parseInt(planetInfo.energy);
  let lastTimestamp = planetInfo.last_updated_timestamp;

  info.resources = calculateResourcesFromLastTimestamp(minerals, chemicals, gases, energy, lastTimestamp, info.levels);

  return info;
}


async function updateResources(planetId, playerId) {
  let resources = await Planets.getResources(planetId, playerId);
  let buildingLevels = await Planets.getBuildingLevels(planetId, playerId);
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

  let latestResources = calculateResourcesFromLastTimestamp(minerals, chemicals, gases, energy, lastTimestamp, levels);
  await Planets.updateResources(latestResources, planetId, playerId);
}

function calculateResourcesFromLastTimestamp(minerals, chemicals, gases, energy, lastTimestamp, levels) {
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

module.exports = API;
