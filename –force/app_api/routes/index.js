const express = require("express");
const router = express.Router();
const ctrlApi = require("../controllers/trips");
const tripsController = require("../controllers/trips");

/* Routing to all trips */
router
  .route("/trips")
  .get(ctrlApi.tripslist)
  .post(tripsController.tripsAddTrip);

/* Routing to a single trip */
router
  .route("/trips/:tripCode")
  .get(ctrlApi.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip);

module.exports = router;
