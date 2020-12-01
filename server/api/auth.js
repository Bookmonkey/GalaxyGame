const {  Router } = require("express");


const bcrypt = require("bcrypt");
const SALTROUNDS = 10;

const LocalStrategy = require("passport-local").Strategy;

const PlayerData = require("../data/Player");
const Auth = require("../controllers/Auth");
const Planets = require("../controllers/Planets");

let AuthRouter = function (passport) {
  const router = Router();

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    Auth.getUserById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        done(e, false);
      });
  });

  passport.use("local", new LocalStrategy(function (username, password, done) {
    Auth.getUserByUsername(username)
      .then(function (user) {
        if (!user) {
          done(null, false, "Unknown user");
        } else if (!bcrypt.compareSync(password, user.password)) {
          done(null, false, "Wrong password");
        } else {
          done(null, user);
        }
      })
      .catch(function (e) {
        done(null, false, e.name + " " + e.message);
      });
  }));


  router.post("/login", (req, res, next) => {
    passport.authenticate("local", function (err, userInfo, info) {
      if (err) {
        return next(err);
      }

      if (!userInfo) {
        return res.status(400).send({
          error: "Incorrect username/password combination"
        });
      }

      req.login(userInfo, function (err) {
        if (err) {
          return next(err);
        }

        res.status(200).send({
          username: req.user.username,
          playerId: req.user.id
        });
      });
    })(req, res, next);
  });


  router.get("/isloggedin", (req, res) => {
    if (req.isAuthenticated()) {
      let userInfo = {
        playerId: req.user.id,
        username: req.user.username
      }
      res.status(200).send(userInfo);
    } else {
      res.status(400).send(false);
    }

  });

  router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/');
    });
  });

  router.post("/create", async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirm_password;

    if (password === confirmPassword) {
      try {
        let hashedPassword = await bcrypt.hash(password, SALTROUNDS);

        let playerId = await PlayerData.create(email, username, hashedPassword);
        
        let createdPlanet = await Planets.create("Homeworld", playerId);

        // create planet and other tables

      } catch (error) {
        console.error(error);
      }
    } else {
      res.status(400).send("not ok");
    }
  });

  router.post("/rename", (req, res) => {
    // Auth.renameAccount();
  });

  return router;
}

module.exports = AuthRouter;