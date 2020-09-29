const { Router } = require("express");


let API = function() {
  const router = Router();


  // resources
  // players
  router.get("/overview/:playerID", (req, res) => {
    // get planets + buildings
    // const planets = Planets.getByPlayerId()

    // get all queues [building, fleet and research]


    /**
     * return {
     *  planets
     *  resources,
     *  queues: 
     * }
     */
    
    
  });
  router.post("/colonize/:playerId", (res, req) => {
    // let taken = Galaxy.isTaken(hexPos);
  });

  router.post("/queue/buildings/add",(req, res) => {});
  router.post("/queue/fleet/add", (req, res) => {});
  router.post("/queue/research/add",(req, res) => {});


  return router;
}

module.exports = API;
