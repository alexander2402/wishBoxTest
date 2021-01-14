const router = require("express").Router();
let Reservation = require("../models/reservation.model");

router.route("/").get((req, res) => {
  Reservation.find()
    .then((reservations) => res.json(reservations))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const phonenumber = req.body.phonenumber;
  const email = req.body.email;
  const members = req.body.members;
  const price = req.body.price;
  const country = req.body.country;
  const city = req.body.city;

  const newReservation = new Reservation({
    firstname,
    lastname,
    startdate,
    enddate,
    phonenumber,
    email,
    members,
    price,
    country,
    city,
  });

  newReservation
    .save()
    .then(() => res.json("Reservation added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Reservation.findById(req.params.id)
    .then((reservation) => res.json(reservation))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Reservation.findByIdAndDelete(req.params.id)
    .then(() => res.json("Reservation deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Reservation.findById(req.params.id)
    .then((reservation) => {
      reservation.firstname = req.body.firstname;
      reservation.lastname = req.body.lastname;
      reservation.startdate = req.body.startdate;
      reservation.enddate = req.body.enddate;
      reservation.phonenumber = req.body.phonenumber;
      reservation.email = req.body.email;
      reservation.members = req.body.members;
      reservation.price = req.body.price;
      reservation.country = req.body.country;
      reservation.city = req.body.city;

      reservation
        .save()
        .then(() => res.json("Reservation updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
