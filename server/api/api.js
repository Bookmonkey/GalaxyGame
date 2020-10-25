const { Router } = require("express");
const Planets = require("../controllers/Planets");

const { Global, Buildings } = require("../../public/Stats");


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
    // await Planets.addToQueue(type, key, planetId, playerId);


    await Planets.upgradeBuilding(type, key, planetId, playerId);
    
    let resources = await Planets.getResources(planetId, playerId);
    let latestResources = calculateResourcesFromLastTimestamp(resources);    
    await Planets.updateResources(latestResources, planetId, playerId);
    // console.log(type, key, planetId, playerId);


    
    
  });  



  return router;
}

function getCurrentTimeForLevel(item, levels) {
  let specialBaseTime = parseInt(Global.build_time);
  let baseTime = parseInt(item.base_build_time);
  let mod = parseFloat(item.build_time_mod);
  let level = parseInt(levels[item.key]);
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
      mine: planetInfo.mine_level,
      chemical: planetInfo.chemical_level,
      gas: planetInfo.gas_level,
    },
    buildingTimes: {},
    military: {},
  };

  // loops through Stats building object
  // calculates resources and time based on levels
  // then appends to the info object above
  Buildings.map((building) => {
    let key = building.key;
    let timeForLevel = getCurrentTimeForLevel(building, info.levels);
    info.buildingTimes[key] = timeForLevel;

    return building;
  });


  info.resources = calculateResourcesFromLastTimestamp(planetInfo);

  return info;
}

function calculateResourcesFromLastTimestamp(info) {
  let resources = {
    minerals: parseInt(info.minerals), 
    chemicals: parseInt(info.chemicals),
    gases: parseInt(info.gases),
    energy: parseInt(info.energy)
  };

  
  let timeNow = new Date();
  let lastTime = new Date(info.last_updated_timestamp);
  let totalTimeSince = Math.round(Math.abs((timeNow.getTime() - lastTime.getTime()) / 1000));
  let resMods = {}
  Buildings.filter(ele => {
    if(ele.key === 'mine' || ele.key === 'chemical' || ele.key === 'gas') {
      resMods[ele.key] = parseFloat(ele.resource_mod)
    };
  });
  
  
  resources.minerals += Math.floor(resources.minerals * resMods.mine * totalTimeSince);
  resources.chemicals +=  Math.floor(resources.chemicals * resMods.chemical * totalTimeSince);
  resources.gases += Math.floor(resources.gases * resMods.gas * totalTimeSince);
  
  return resources;
}

module.exports = API;
