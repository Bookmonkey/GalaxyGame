const PlayerData = {
  create: (email, username, password) => {
    return new Promise(async (resolve, reject) => {
      const { rows } = await db.query(`insert into player(email, username, password) VALUES($1, $2, $3) returning id;`, [email, username, password]);

      if(rows === undefined) {
          reject(null);
      };
      
      let id = rows[0].id;
      resolve(id);
  });
  },
};

module.exports = PlayerData;