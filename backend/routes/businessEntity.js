const express = require("express");
const router = express.Router();
const authorization = require("../middleware/tokenMiddleware.js");
const { getAllBe, individualBe, updateBe, addBusinessEntity, individualBeById } = require('../controller/businessEntityMaster.js')

// Route to add new business entity
router.post("/addbusinessentity", authorization, addBusinessEntity)

// Route to get all  the details of all the business entities
router.get("/getallbe", authorization, getAllBe);

// Route to get the details for the single business entity by it's name
router.get("/individualbe/:businessEntityName", authorization, individualBe);

// Route to get the details for the single business entity by it's id
router.get("/individualbebyid/:id", authorization, individualBeById);

// Route to update the business entity details (only by the super admin)
router.put("/updatebe/:id", authorization, updateBe)

module.exports = router;
