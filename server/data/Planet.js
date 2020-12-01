const db = require("../db");

const Planet = {
  create: async (planetData) => {
    let client = await db.createClient();    
    try {
      await client.query("BEGIN");

      const { rows } = await client.query(`
        insert into planet (planet_name, planet_type, building_slot_total, is_npc, player_id)
        VALUES ($1, $2, $3, $4, $5) returning id;
      `, [
        data.name,
        data.type,
        data.slot_total,
        data.npc,
        playerId
      ]);

      if(rows === undefined) {
        throw new Error("failure in creating planet"); 
      }

      let planetId = rows[0].id;
      await client.query('insert into planet_resources (planet_id, player_id) values ($1, $2);', [planetId, playerId]);
      await client.query('insert into planet_buildings (planet_id, player_id) values ($1, $2);', [planetId, playerId]);
      await client.query('insert into planet_defences (planet_id, player_id) values ($1, $2);', [planetId, playerId]);
      await client.query('insert into planet_fleet (planet_id, player_id) values ($1, $2);', [planetId, playerId]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(error);
    }
    finally{
      client.release();
    }
  },

  destroy: (planetId, planetName) => {
    // 
  },

  rename: (planetId, newPlanetName) => {
    
  },


  getInformationForPlanet: async (planetId) => {
    // properly define the select fields, to avoid duplications
    const { rows } = await db.query(`
      select * from planet p
        left join planet_resources r on r.planet_id = p.id
        left join planet_buildings b on b.planet_id = p.id
        left join planet_defences d on d.planet_id = p.id
        left join planet_fleet f on f.planet_id = p.id
      where p.id = $1;
    `, [planetId]);

    if(rows === undefined) {
      return false
    }

    return rows[0];
  },

  getAllPlanetsForPlayerId: async(playerId) => {
    const { rows } = await db.query(`
      select * from planet p
        left join planet_resources r on r.planet_id = p.id
        left join planet_buildings b on b.planet_id = p.id
        left join planet_defences d on d.planet_id = p.id
        left join planet_fleet f on f.planet_id = p.id
      where p.player_id = $1;
    `, [playerId]);

    if(rows === undefined) {
      return false
    }

    return rows;
  },

  upgradeBuilding: async (key, planetId, playerId) => {
      const { rows, command } = await db.query(`
      update planet_buildings set ${key} = ${key} + 1 where planet_id = $1 and player_id = $2;
      `, [planetId, playerId]);      
    
  },

  getBuildingLevels: async (planetId, playerId) => {
    const { rows } = await db.query(`select * from planet_buildings where planet_id = $1 and player_id = $2;`, [planetId, playerId]);
    return rows[0];
  },

  buildFleet: (planetId) => {},
  buildDefence: (planetId) => {},


  getAllQueues: () => { 

  },
  
  getQueue: (type) => { },
  addToQueue: () => { },
  removeFromQueue: () => { },


  getResources: async(planetId, playerId) => {
    const { rows } = await db.query(`select minerals, chemicals, gases, energy, last_updated_timestamp from planet_resources where planet_id = $1 and player_id = $2;`, [planetId, playerId]);
    return rows[0];
  },

  updateResources: async (resources, planetId, playerId) => {
    const { rows } = await db.query(`
    update planet_resources 
      set minerals = $1,
      chemicals = $2,
      gases = $3,
      energy = $4,
      last_updated_timestamp = now()
      where planet_id = $5 and player_id = $6; 
    `,
    [
      resources.minerals,
      resources.chemicals,
      resources.gases,
      resources.energy,
      planetId,
      playerId
    ]);
  },
}

module.exports = Planet;