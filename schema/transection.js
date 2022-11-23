const mongoose = require("mongoose");
const tourSchema = mongoose.Schema({
  tourId: {
    type: String,
    required: true,
  },
  bookingId: {
    type: String,
    required: true,
  },
  tourName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  CardHolderName: {
    type: String,
    required: true,
  },
  ccv: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: "card",
  },
  currency: {
    type: String,
    default: "TK",
  },
  amount: {
    type: Number,
    required: true,
  },
  processingFee: {
    type: Number,
  },
  paymentDate: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "pending",
  },
});

module.exports = tourSchema;
