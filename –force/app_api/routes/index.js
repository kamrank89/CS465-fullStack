const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProprety: "payload",
  algorithms: ["HS256"],
});

/* Login router */
router.route("/login").post(authController.login);

/* Routing to all trips */
router.route("/register").post(authController.register);
router
  .route("/trips")
  .get(tripsController.tripslist)
  .post(auth, tripsController.tripsAddTrip);

/* Routing to a single trip */
router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;
