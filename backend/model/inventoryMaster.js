const mongoose = require("mongoose");

const inventoryMasterSchema = mongoose.Schema({});

module.exports = mongoose.model("inventorymaster", inventoryMasterSchema);
