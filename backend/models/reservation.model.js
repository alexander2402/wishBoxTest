const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservationSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    phonenumber: { type: Number, required: true },
    email: { type: String, required: true },
    members: { type: Number, required: true },
    price: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
