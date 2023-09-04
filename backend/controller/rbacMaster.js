const Rbac = require("../model/rbacMaster");
const response = require("../response/response.js");

// Add new role with their permissions
exports.addRole = async (req, res) => {
  try {
    const { roleName, createdBy, permissions, associatedBusinessEntity } = req.body;

    if (!roleName || !createdBy || !associatedBusinessEntity) {
      res.status(401).send(response.createError("Input fields cannot be empty!"));
    } else {
      const roleRec = await Rbac.findOne({ associatedBusinessEntity: associatedBusinessEntity, roleName: roleName });
      if (roleRec == null) {
        const RbacRec = new Rbac({
          roleName: roleName,
          permissions: permissions,
          createdBy: createdBy,
          createdOn: Date.now(),
          associatedBusinessEntity: associatedBusinessEntity
        });
        await RbacRec.save()
        res.status(201).json(response.createSuccess(RbacRec))
      } else {
        res.status(409).json(response.createError("Role already exists for this entity!"));
      }
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// find all the roles and their permissions
exports.getAllRolesAndPermissions = async (req, res) => {
  try {
    const rbacRec = await Rbac.find();
    if (rbacRec !== null) {
      res.status(200).json(response.createSuccess(rbacRec));
    } else {
      res.status(404).json(response.createError("No Content found"));
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// get all the roles (only roles) on the basis of business entity name
exports.getBeRoles = async (req, res) => {
  try {
    const { businessEntityName } = req.params;
    // console.log(businessEntityName);
    const roles = await Rbac.aggregate([
      {
        $match: { associatedBusinessEntity: businessEntityName }
      },
      {
        $unset: ['__v', '_id', 'associatedBusinessEntity', 'permissions', 'updatedBy', 'createdBy', 'createdOn', 'updatedOn']
      }
    ])
    res.status(200).json(response.createSuccess(roles));
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// find all the roles and their permissions as well on the basis of associated Business Entity Names
exports.beRolesAndPermissions = async (req, res) => {
  try {
    const { businessEntityName } = req.params;
    const rbacRec = await Rbac.find({ associatedBusinessEntity: businessEntityName });
    if (rbacRec !== null) {
      res.status(200).json(response.createSuccess(rbacRec));
    } else {
      res.status(404).json(response.createError("No Roles found for this Entity!"));
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// get individual role and it's permissions for the particular Business Entity using the role _id in params
exports.getSingleRole = async (req, res) => {
  try {
    const roleId = await req.params.id;
    // console.log(roleId);
    const roleRec = await Rbac.findById(roleId);
    if (roleRec !== null) {
      res.status(200).json(response.createSuccess(roleRec));
    } else {
      res.status(404).json(response.createError("No data found!"));
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};

// Update the single role
exports.updateRole = async (req, res) => {
  try {
    const id = await req.params.id;
    // console.log(id);
    // console.log(req.body);
    const { roleName, permissions, createdBy, associatedBusinessEntity } = req.body;
    const roleRec = await Rbac.findById(id);
    // console.log(roleRec, createdBy);
    if (createdBy === roleRec.createdBy) {
      // console.log("working fine till here!");
      await Rbac.findByIdAndUpdate(id, {
        roleName: roleName,
        permissions: permissions,
        associatedBusinessEntity: associatedBusinessEntity,
        "$push": { updatedOn: Date.now() }
        // updatedBy: updatedBy.push(userName),
        // updatedOn: updatedOn.push(Date.now())
      },
        { new: true, upsert: true })
      res.status(200).json(response.createSuccess("Role updates successfully!"))
    } else {
      res.status(401).json(response.createError("You don't have access to update this role!"))
    }
  } catch (error) {
    res.status(400).json(response.createError("Something went wrong!"));
  }
};