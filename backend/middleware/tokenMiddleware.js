const response = require("../response/response.js");
const SECRET_KEY = process.env.KEY;
const jwt = require('jsonwebtoken');
const Users = require("../model/usersMaster.js");

// Middleware to validate the token
const authorization = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json(response.createError("User not authenticated!"));
        } else {
            jwt.verify(token, SECRET_KEY, async (err, data) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                } else {
                    req.currentUserId = data._id;
                    const findUser = await Users.findById(req.currentUserId);
                    if (findUser) {
                        next();
                    } else {
                        res.status(403).json("Token is not valid");
                    }
                }
            })
        }
    } catch {
        res.status(403).json(response.createError("No content found!"));
    }
};

module.exports = authorization;