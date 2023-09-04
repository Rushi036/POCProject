const mongoose = require("mongoose");

const usersMasterSchema = mongoose.Schema({
  userName: {
    type: String
  },
  userEmail: {
    type: String,
    unique: true,
    index: true
  },
  phoneNumber: {
    type: Number
  },
  userRole: {
    type: String
  },
  userPassword: {
    type: String,
    select: false
  },
  businessEntity: {
    type: String
  },
  createdBy: {
    creatingUserName: String,
    creatingUserRole: String,
    creatingUserBusinessEntity: String
  },
  createdOn: Date,
  updatedBy: {
    type: [String],
    default: []
  },
  updatedOn: {
    type: [Date],
    default: []
  },
  userStatus: String
});

module.exports = mongoose.model("usersmaster", usersMasterSchema);
