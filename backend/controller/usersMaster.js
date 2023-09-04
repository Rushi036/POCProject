const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../model/usersMaster.js");
const Rbac = require("../model/rbacMaster");
const response = require("../response/response.js");
const SECRET_KEY = process.env.KEY;

// Register route by admin for new user
exports.register = async (req, res) => {
  try {
    const { userName, userEmail, phoneNumber, userRole, userPassword, businessEntity, createdBy, userStatus } = req.body;

    if (!userName || !userEmail || !phoneNumber || !userRole || !userPassword || !businessEntity || !createdBy || !userStatus) {
      res.status(401).json(response.createError("Input fields cannot be empty!"));
    } else {
      const verifyUser = await Users.findOne({ userEmail: userEmail });
      if (verifyUser === null) {
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const userRec = new Users({
          userName: userName,
          userEmail: userEmail,
          phoneNumber: phoneNumber,
          userRole: userRole,
          userPassword: hashedPassword,
          businessEntity: businessEntity,
          createdBy: createdBy,
          cretedOn: Date.now(),
          userStatus: userStatus
        });
        await userRec.save();
        res.status(201).json(response.createSuccess(userRec));
      } else {
        res.status(409).json(response.createError("User already exists!"));
      }
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

//  Login Route for a user
exports.login = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
      res.status(401).json(response.createError("Input fields cannot be empty!"));
    } else {
      const verifyUser = await Users.findOne({ userEmail: userEmail }).select('+userPassword');

      if (verifyUser !== null) {
        // check Password
        const comparedPass = await bcrypt.compare(userPassword, verifyUser.userPassword)
        if (comparedPass) {
          if (verifyUser.userStatus == "active") {
            const verifiedUser = await Users.findOne({ userEmail: userEmail });

            const token = jwt.sign({ _id: verifiedUser._id }, SECRET_KEY);

            const permissions = await Rbac.findOne({ roleName: verifiedUser.userRole, associatedBusinessEntity: verifiedUser.businessEntity })
console.log("------------------",permissions)
            res.status(200).json(response.createSuccess({ verifiedUser, permissions, token }))
          } else {
            res.status(401).json(response.createError("User not active!"))
          }
        } else {
          res.status(400).json(response.createError("Wrong username or password!"));
        }
      } else {
        res.status(404).json(response.createError("User not found!"));
      }
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Update route for user - only the user who created this user can edit details of this user on the basis of id
exports.userUpdate = async (req, res) => {
  try {
    const userId = await req.params.id;
    const { userName, phoneNumber, userPassword, userStatus, userRole, userEmail, loggedInUser } = req.body;
    if (userPassword) {
      const changedPass = await bcrypt.hash(userPassword, 10);
      const userData = await Users.findByIdAndUpdate(userId, {
        userName: userName,
        phoneNumber: phoneNumber,
        userPassword: changedPass,
        userStatus: userStatus,
        userRole: userRole,
        userEmail: userEmail,
        $push: {
          updatedBy: loggedInUser,
          updatedOn: Date.now()
        }
      }, { new: true });
      res.status(200).json(response.createSuccess(userData))
    } else {
      const userData = await Users.findByIdAndUpdate(userId, {
        userName: userName,
        phoneNumber: phoneNumber,
        userStatus: userStatus,
        userRole: userRole,
        userEmail: userEmail,
        $push: {
          updatedBy: loggedInUser,
          updatedOn: Date.now()
        }
      }, { new: true });
      res.status(200).json(response.createSuccess(userData))
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Find all users and their permissions
exports.findAllUsers = async (req, res) => {
  try {
    const usersRec = await Users.aggregate([
      {
        $lookup:
        {
          from: "rbacmasters",
          localField: "userRole",
          foreignField: "roleName",
          as: "permissionDetails"
        }
      },
      {
        $unset: ["userPassword", "permissionDetails._id"]
      }
    ]);
    res.status(200).json(response.createSuccess(usersRec))
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Find single user on the basis of his id
exports.findSingleUser = async (req, res) => {
  try {
    const id = req.params.id
    const userData = await Users.findById(id)
    res.status(200).json(response.createSuccess(userData))
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Find single user for updating his details
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = await req.params.id;
    const { userName, phoneNumber, userPassword, loggedInUser } = req.body;
    if (userPassword) {
      const changedPass = await bcrypt.hash(userPassword, 10);
      const userData = await Users.findByIdAndUpdate(userId, {
        userName: userName,
        phoneNumber: phoneNumber,
        userPassword: changedPass,
        $push: {
          updatedBy: loggedInUser,
          updatedOn: Date.now()
        }
      }, { new: true });
      res.status(200).json(response.createSuccess(userData))
    } else {
      const userData = await Users.findByIdAndUpdate(userId, {
        userName: userName,
        phoneNumber: phoneNumber,
        $push: {
          updatedBy: loggedInUser,
          updatedOn: Date.now()
        }
      }, { new: true });
      res.status(200).json(response.createSuccess(userData))
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
}

// Find all the users of a single Business Entity
exports.findBeUsers = async (req, res) => {
  try {
    const businessEntityName = req.params.businessEntityName;
    // console.log(businessEntityName);
    const users = await Users.aggregate([
      {
        $match: { businessEntity: businessEntityName }
      },
      {
        $unset: ['__v', 'updatedBy', 'createdBy', 'createdOn', 'updatedOn', 'userPassword']
      }
    ])
    res.status(200).json(response.createSuccess(users));
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
}

// Logout route for the user
exports.logout = async (req, res) => {
  res.status(200).json(response.createSuccess("Logged out successfully!"));
};