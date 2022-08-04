const mongoose = require("mongoose");
const Model = mongoose.model("trips");

/* Get list of all trips */

const tripslist = async (req, res) => {
  Model.find({}).exec((err, trips) => {
    if (!trips) {
      return res.status(404).json({ message: "trips not found" });
    } else if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(trips);
    }
  });
};

/* Get single trips */

const tripsFindByCode = async (req, res) => {
  Model.find({ code: req.params.tripCode }).exec((err, trip) => {
    if (!trip) {
      return res.status(404).json({ message: "trips not found" });
    } else if (err) {
      return res.status(404).json(err);
    } else {
      return res.status(200).json(trip);
    }
  });
};

/* Posting a New Trip */
const tripsAddTrip = async (req, res) => {
  Model.create(
    {
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description,
    },
    (err, trip) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(201).json(trip);
      }
    }
  );
};
module.exports = {
  tripslist,
  tripsFindByCode,
  tripsAddTrip,
};
