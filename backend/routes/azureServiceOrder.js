const express = require("express");
const router = express.Router();
const authorization = require("../middleware/tokenMiddleware.js");
const { getAzureOrders, addAzureOrders, getSingleAzureOrder } = require("../controller/azureServiceOrder.js");

// Route to get all new business entity orders for aws cloud
router.get('/getazureorders', getAzureOrders);

// Route to add new business entity orders for aws cloud
router.post('/addazureorders', addAzureOrders);

// Route to get the data of the individual order
router.get('/getsingleazureorder/:id', getSingleAzureOrder)

module.exports = router;