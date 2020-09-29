const { Router } = require("express");
const Auth = require("../controllers/Auth");
const bcrypt = require("bcrypt");
const SALTROUNDS = 10;

const db = require("../db");
const passport = require("passport");

let AuthRouter = function() {
  const router = Router();

  router.post("/create", async (req, res) => {
    console.log("create user");

    let name = "account";
    let password = "grass87b";

    try {
      let hashedPassword = await bcrypt.hash(password, SALTROUNDS);      
      let accountCreated = await Auth.createAccount(name, hashedPassword);

    } catch (error) {
      console.error(error);      
    }

  
    // Auth.createAccount();
  });
  
  router.post("/login", (req, res) => {
    // Auth.login()
  });

  router.post("/rename", (req, res) => {
    // Auth.renameAccount();
  });

  return router;
}

module.exports = AuthRouter;

