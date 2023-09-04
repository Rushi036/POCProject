const response = require("../response/response.js");
const serviceCatelogue = require("../model/serviceCatelogue.js");

// Route to get all the services
exports.getAllServices = async (req, res) => {
  try {
    const serviceData = await serviceCatelogue.find();
    res.status(200).json(response.createSuccess(serviceData));
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Router to get the all active services
exports.getActiveServices = async (req, res) => {
  try {
    const serviceData = await serviceCatelogue.find({ serviceStatus: "active" });
    res.status(200).json(response.createSuccess(serviceData));
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Router to add a new service
exports.addService = async (req, res) => {
  try {
    const { serviceGroupName, serviceName, productDescription, serviceScope, prerequisite_Dependency, featureList, serviceExclusions, serviceDelivery, serviceLevelSpecifications, baseCost, billingType, serviceStatus } = req.body;
    if (!serviceGroupName || !serviceName || !productDescription || !serviceScope || !prerequisite_Dependency || !featureList || !serviceExclusions || !serviceDelivery || !serviceLevelSpecifications || !baseCost || !billingType || !serviceStatus) {
      res.status(401).json(response.createError("Input fields cannot be empty!"));
    } else {
      const serviceData = await serviceCatelogue.findOne({ serviceName: serviceName });
      if (serviceData === null) {
        const serviceRec = new serviceCatelogue({
          serviceGroupName: serviceGroupName,
          serviceName: serviceName,
          productDescription: productDescription,
          serviceScope: serviceScope,
          prerequisite_Dependency: prerequisite_Dependency,
          featureList: featureList,
          serviceExclusions: serviceExclusions,
          serviceDelivery: serviceDelivery,
          serviceLevelSpecifications: serviceLevelSpecifications,
          baseCost: baseCost,
          billingType: billingType,
          serviceStatus: "active"
        });
        await serviceRec.save();
        res.status(200).json(response.createSuccess(serviceRec));
      } else {
        res.status(409).json(response.createError("This service already exists!"));
      };
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  };
};

// Router to get all the services
exports.getSingleService = async (req, res) => {
  console.log(req.params)
  try {
    const id = req.params.id;
    const serviceData = await serviceCatelogue.findById(id);
    res.status(200).json(response.createSuccess(serviceData))
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  };
};

// Route for updating a single service
exports.updateService = async (req, res) => {
  try {
    const serviceId = await req.params.id;
    // console.log(serviceId);
    const { serviceGroupName, serviceName, productDescription, serviceScope, prerequisite_Dependency, featureList, serviceExclusions, serviceDelivery, serviceLevelSpecifications, baseCost, billingType, serviceStatus } = req.body;
    await serviceCatelogue.findByIdAndUpdate(serviceId, {
      serviceGroupName: serviceGroupName,
      serviceName: serviceName,
      productDescription: productDescription,
      serviceScope: serviceScope,
      prerequisite_Dependency: prerequisite_Dependency,
      featureList: featureList,
      serviceExclusions: serviceExclusions,
      serviceDelivery: serviceDelivery,
      serviceLevelSpecifications: serviceLevelSpecifications,
      baseCost: baseCost,
      billingType: billingType,
      serviceStatus: serviceStatus
    })
    res.status(200).json(response.createSuccess("Service Updated Successfully!"))
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  };
};