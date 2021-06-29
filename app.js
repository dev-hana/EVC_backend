var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var evRouter = require("./routes/evInfo");
var chargeRouter = require("./routes/charge");
var reviewRouter = require("./routes/review");
var bookmarkRouter = require("./routes/bookmark");
const exp = require("constants");
var app = express();
var history = require('connect-history-api-fallback');

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((history()));
app.use(express.static(path.join(__dirname, "public")));


// ../frontend/vue.config.js -> path를 /api~로 지정
app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/ev", evRouter);
app.use("/api/charge", chargeRouter);
app.use("/api/review", reviewRouter);
app.use("/api/bookmark", bookmarkRouter);


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
