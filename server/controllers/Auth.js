const db = require("../db");

const Auth = {
    createAccount: (name, password) => {
        console.log(name, password);
        // const { rows } = db.query(`insert into player (name, password) VALUES($1, $2)`, [name, password]);
    },
    login: () => {},
    renameAccount: () => {},
    deleteAccount: () => {},
    recoverAccount:() => {},
}

module.exports = Auth;
