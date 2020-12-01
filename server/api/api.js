const { Router } = require("express");
const PlanetController = require("../controllers/Planets");



let API = function() {
  const router = Router();

  router.get("/planet/:planetId", async (req, res) => {
    let planetId = req.params.planetId;
    let planetInfo = await PlanetController.getInformationForPlanet(planetId);    
    res.status(200).send(planetInfo);
  })

  router.get("/overview/:playerId", async (req, res) => {
    let playerId = req.params.playerId;
    let planets = await PlanetController.getAllPlanetsForPlayerId(playerId);
    res.status(200).send(planets);
  });

  router.get("/planet/create/:playerId", async (req, res) => {
    let playerId = req.params.playerId;
    let planet = await PlanetController.create(playerId);
    res.status(200).send(planet);
  });


  router.post("/planet/upgrade", async (req, res) => {
    let type = req.body.type;
    let key = req.body.key;
    let playerId = req.body.playerId;
    let planetId = req.body.planetId;

    // check for people who are trying to break things

    let result = await PlanetController.addBuildingToQueue(type, key, playerId, planetId);

    if(!result.added) {
      throw Error(result.error);
    }
  });

  router.post("/planet/fleet/newbatch", async(req, res) => {
    // start creating new fleet batches.
    // fleets arent built automatically. They get built in a batch. 
  });

  router.post("/planet/fleet/action", async(req, res) => {
    // fleet actions are processed here
  });

  return router;
}


module.exports = API;
