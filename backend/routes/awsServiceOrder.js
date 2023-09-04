const express = require("express");
const router = express.Router();
const authorization = require("../middleware/tokenMiddleware.js");
const { getAwsOrders, addAwsOrders, getSingleAwsOrder } = require('../controller/awsServiceOrder.js')

// Route to get all new business entity orders for aws cloud
router.get('/getawsorders', getAwsOrders);

// Route to add new business entity orders for aws cloud
router.post('/addawsorders', addAwsOrders);

// Route to get the data of the individual order
router.get('/getsingleawsorder/:id', getSingleAwsOrder)

module.exports = router;