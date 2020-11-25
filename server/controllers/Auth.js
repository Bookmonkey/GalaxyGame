const db = require("../db");

const Auth = {
    renameAccount: () => {},
    deleteAccount: () => {},
    recoverAccount:() => {},

    getUserById: async (id) => {
        const { rows } = await db.query(`select * from player where id = $1;`, [id]);
        return rows[0];
    },
    getUserByUsername: async (username) => {
        return new Promise(async (resolve, reject) => {
            const { rows } = await db.query(`select * from player where username = $1`, [username]);

            if(rows === undefined) {
                reject(null);
            }

            resolve(rows[0]);
        });
    }
}

module.exports = Auth;
