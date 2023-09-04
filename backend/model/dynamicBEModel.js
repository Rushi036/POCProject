const mongoose = require("mongoose");

const collectionName = "TATA_Business_Entity";

const dynamicSchema = mongoose.Schema({
    businessEntityName: String,
    businessEntityServices: String
});

module.exports = mongoose.model(`${collectionName}`, dynamicSchema);
