/* Requiring fs */
const fs = require("fs");

const trips = JSON.parse(fs.readFileSync("app_server/data/trips.json", "utf8"));

/* Get Travel View */
const travel = (req, res) => {
  res.render("travel", { title: "Travlr Getaways", trips });
};
module.exports = {
  travel,
};
