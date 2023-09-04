const express = require("express");
const router = express.Router();
const authorization = require("../middleware/tokenMiddleware.js");
const { getAllRolesAndPermissions, addRole, getSingleRole, updateRole, getBeRoles, beRolesAndPermissions } = require('../controller/rbacMaster');


// Add new role with their permissions
router.post("/addrole", authorization, addRole);

// find all the roles and their permissions (All rbac record present in the db)
router.get("/getallrolesandpermissions", authorization, getAllRolesAndPermissions);

// find all the roles (only roles) of a perticular BE on the basis of Business Entity Names
router.get("/beroles/:businessEntityName", authorization, getBeRoles);

// find all the roles and permissions of a particular business entity on the basis of business entity name
router.get("/beroleandpermissions/:businessEntityName", authorization, beRolesAndPermissions)

// get individual role and permissions on the basis of id for the particular Business Entity
router.get("/getsingleroleandpermissions/:id", authorization, getSingleRole);

// Update the single role on the basis of its id
router.put("/updaterole/:id", authorization, updateRole);



module.exports = router;
