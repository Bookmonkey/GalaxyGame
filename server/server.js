const express = require("express");
const app = express();
const config = require("../config");
const port = config.port;

const cors = require("cors");
const path = require("path");

const passport = require("passport");
const session = require("express-session");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");


const API = require("./api/api");
const Auth = require("./api/auth");

const QueueController = require("./controllers/QueueController");
const Queue = QueueController();


// TOOD: install morgan or logging


app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/");
app.set("view engine", "ejs"); // set up templates

app.use(cors())

app.use('/', express.static(path.join(__dirname, '..', 'dist')))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(session({ 
  secret: "rubikTechFunko147",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", API());
app.use("/auth", Auth(passport));



app.get("/", function (req, res) {
  res.render("../dist/index.html");
});


app.listen(port, () => {
  console.log(`> Galaxy Game server starting on http://localhost:${port}/`);
  console.log(`> Using DB: ${config.database.database} on ${config.database.host}`);
});

Queue.start();