const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;


// verifying token 

verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send({
            message : "No Token Provided"
        });
    }

    jwt.verify(token, config.secret, (err,decoded) => {
        if (err) {
            return res.status(401).send({
                message : "Unauthorized !"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = {
    verifyToken : verifyToken
}