
// Express app for Lunchly
const express = require("express");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();

// Parse body for url-encoded (non-JSON) data
app.use(bodyParser.urlencoded({ extended: false }));

nunjucks.configure("templates", {
  autoescape: true,
  express: app
});

app.use(routes);


// 404 HANDLER
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass error to next piece of middleware
  return next(err);
});


// GENERAL ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.render("error.html", { err });
});


module.exports = app;
