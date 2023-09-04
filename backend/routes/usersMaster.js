const express = require("express");
const router = express.Router();
const { register, login, userUpdate, findAllUsers, logout, findSingleUser, findBeUsers, userProfile, updateUserProfile } = require('../controller/usersMaster.js');
const authorization = require("../middleware/tokenMiddleware.js");


// Register route by admin for new user
router.post("/register", register);

//  Login Route for a user
router.post("/login", login);

// Update route for user - only he can update his details
router.put("/userupdate/:id", authorization, userUpdate);

// Find all users
router.get("/findallusers", authorization, findAllUsers);

// Find all the users of a single Business Entity
router.get("/findbeusers/:businessEntityName", authorization, findBeUsers)

// Find single user on the basis of his id
router.get("/getsingleuser/:id", authorization, findSingleUser)

// User profile route
router.get("/updateuserprofile", authorization, updateUserProfile);

// Logout route for the user
router.get("/logout", authorization, logout);

module.exports = router;
