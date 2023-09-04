const express = require("express");
const router = express.Router();
const authorization = require("../middleware/tokenMiddleware.js");
const { getAllServices, getActiveServices, addService, getSingleService, updateService } = require('../controller/serviceMaster.js');;

// Route to get all the services
router.get("/getallservices", authorization, getAllServices);

// Router to get the all active services
router.get("/getactiveservices", authorization, getActiveServices);

// Router to add a new service
router.post("/addservice", authorization, addService);

// Router to get all the services
router.get("/getsingleservice/:id", authorization, getSingleService);

// Route for updating a single service
router.put("/updateservice/:id", authorization, updateService);

module.exports = router;