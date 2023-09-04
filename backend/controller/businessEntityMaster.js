const BE = require("../model/businessEntityMaster.js");
const response = require("../response/response.js");

// Route to add new business entity
exports.addBusinessEntity = async (req, res) => {
  const { companyName, companyAddress, city, state, pincode, country, contactPersonName, contactPersonPhoneNumber, contactPersonEmailAddress } = req.body;
  if (!companyName || !companyAddress || !city || !state || !pincode || !country || !contactPersonName || !contactPersonPhoneNumber || !contactPersonEmailAddress) {
    res.status(401).json(response.createError("Input fields cannot be empty!"));
  } else {
    const verifyBe = await BE.findOne({ companyName: companyName })
    if (verifyBe === null) {
      const BeRec = new BE({
        companyName: companyName,
        companyAddress: companyAddress,
        city: city,
        state: state,
        pincode: pincode,
        country: country,
        contactPersonName: contactPersonName,
        contactPersonPhoneNumber: contactPersonPhoneNumber,
        contactPersonEmailAddress: contactPersonEmailAddress
      })
      await BeRec.save()
      res.status(201).json(response.createSuccess(BeRec))
    } else {
      res.status(409).json(response.createError("This Business Entity already exists!"));
    }
  }
}

// Route to get details for all the business entities
exports.getAllBe = async (req, res) => {
  try {
    const beRec = await BE.find()
    res.status(200).json(response.createSuccess(beRec));
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Route to get the details for the single business entity by its name
exports.individualBe = async (req, res) => {
  try {
    const { businessEntityName } = req.params;
    const beRec = await BE.findOne({ companyName: businessEntityName })
    res.status(200).json(response.createSuccess(beRec));
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Route to get the details for the single business entity by its id
exports.individualBeById = async (req, res) => {
  try {
    const id = req.params.id
    const beRec = await BE.findById(id)
    res.status(200).json(response.createSuccess(beRec));
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Route to update the business entity details (only by the super admin)
exports.updateBe = async (req, res) => {
  try {
    const id = await req.params.id;
    const { companyName, companyAddress, city, state, pincode, country, contactPersonName, contactPersonPhoneNumber, contactPersonEmailAddress } = req.body;
    const beRec = await BE.findByIdAndUpdate(id, {
      companyName: companyName,
      companyAddress: companyAddress,
      city: city,
      state: state,
      pincode: pincode,
      country: country,
      contactPersonName: contactPersonName,
      contactPersonPhoneNumber: contactPersonPhoneNumber,
      contactPersonEmailAddress: contactPersonEmailAddress
    })
    res.status(200).json(response.createSuccess(beRec));
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
}