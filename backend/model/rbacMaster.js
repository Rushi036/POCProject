const mongoose = require("mongoose");

const rbacMasterSchema = mongoose.Schema({
  roleName: {
    type: String,
    // required: true,
  },
  permissions: [{
    moduleName: String,
    // serviceGroup: [{
    //   serviceGroupName: String,
    //   services: [{
    //     serviceName: String,
    //     servicePermissions: [String],
    //     _id: false
    //   }],
    //   _id: false
    // }],
    modulePermissions: [String],
    _id: false,
  }],
  createdBy: {
    type: String,
  },
  createdOn: Date,
  associatedBusinessEntity: {
    type: String,
    required: true
  },
  updatedBy: [String],
  updatedOn: [Date],
});

module.exports = mongoose.model("rbacmaster", rbacMasterSchema);
