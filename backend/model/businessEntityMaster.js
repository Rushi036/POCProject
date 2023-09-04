const mongoose = require("mongoose");

const businessEntityMasterSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true,
  },
  contactPersonName: {
    type: String,
    required: true,
  },
  contactPersonPhoneNumber: {
    type: Number,
    required: true,
  },
  contactPersonEmailAddress: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "businessentitymaster",
  businessEntityMasterSchema
);
