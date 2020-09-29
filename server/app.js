const express = require("express");
const app = express();
const port = 3000;


const bodyParser = require('body-parser');
const cors = require("cors");

app.use(cors())
app.use(bodyParser.json())

const passport = require("passport");

const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;


const API = require("./api/api");
const Auth = require("./api/auth");

// Implement Passport-local
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

app.use("/api", API());
app.use("/auth", Auth());


app.listen(port, () => console.log(`Galaxy Game server starting on port ${port}!`));