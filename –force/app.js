require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const hbs = require("hbs");
var cors = require("cors");
require("./app_api/models/db");

const indexRouter = require("./app_server/routes/index");
const usersRouter = require("./app_server/routes/users");
const travelRouter = require("./app_server/routes/travel");
const apiRouter = require("./app_api/routes/index");
const { hasSubscribers } = require("diagnostics_channel");
const passport = require("passport");
require("./app_api/config/passport");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
// Registering partials
hbs.registerPartials(path.join(__dirname, "app_server", "views/partials"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

/* Allow CORS */
app.use(cors());
// app.use("/api", (req, res, next) => {
//   res.header("Acccess-Control-Allow-Origin", "http://localhost:4200");
//   res.header(
//     "Acccess-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );

//   next();
// });

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/travel", travelRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
