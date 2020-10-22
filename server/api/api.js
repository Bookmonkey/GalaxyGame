const { Router } = require("express");
const Planets = require("../controllers/Planets");

const { Buildings } = require("../../public/Stats");


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
    // console.log(type, key, planetId, playerId);


    
    
  });  



  return router;
}


function formatPlanetInfo(planetInfo){
  return {
    info: {
      id: planetInfo.planet_id,
      name: planetInfo.planet_name,
      type: planetInfo.planet_type,
      slots: planetInfo.building_slots_total
    },
    resources: {
      minerals: planetInfo.minerals,
      chemicals: planetInfo.chemicals,
      gases: planetInfo.gases,
      energy: planetInfo.energy,
    },
    levels: {
      mine: planetInfo.mine_level,
      chemical: planetInfo.chemical_level,
      gas: planetInfo.gas_level,
    },
    military: {},
  }
}

module.exports = API;
