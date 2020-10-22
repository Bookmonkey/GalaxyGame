const db = require("../db");

const Auth = {
    createAccount: (email, name, password) => {        
        return new Promise(async (resolve, reject) => {
            const { rows } = await db.query(`insert into player(email, username, password) VALUES($1, $2, $3) returning id;`, [email, name, password]);

            if(rows === undefined) {
                reject(null);
            };
            
            let id = rows[0].id;
            resolve(id);
        });
    },
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
