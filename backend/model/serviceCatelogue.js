const mongoose = require("mongoose");

const serviceMasterSchema = mongoose.Schema({
  serviceGroupName: {
    type: String,
    required: true,
  },
  serviceName: {
    type: String,
    required: true,
  },
  productDescription: {
    description: String,
    keyPoints: [String],
  },
  serviceScope: [],
  prerequisite_Dependency: [],
  featureList: [
    {
      featureName: String,
      deliverables: [],
      _id: false
    },
  ],
  serviceExclusions: [],
  serviceDelivery: {
    serviceInitiation: {
      type: String,
    },
    serviceSupport: {
      type: String
    },
  },
  serviceLevelSpecifications: [
    {
      serviceParameter: {
        type: String
      },
      serviceLevelDescription: [String],
      _id: false
    },
  ],
  baseCost: {
    type: Number,
    required: true,
  },
  billingType: {
    type: String,
    required: true,
  },
  serviceStatus: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("servicemaster", serviceMasterSchema);
