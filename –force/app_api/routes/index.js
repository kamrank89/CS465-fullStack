const express = require("express");
const router = express.Router();
const ctrlApi = require("../controllers/trips");

/* Routing to all trips */
router.route("/trips").get(ctrlApi.tripslist);

/* Routing to a single trip */
router.route("/trips/:tripCode").get(ctrlApi.tripsFindByCode);

module.exports = router;
