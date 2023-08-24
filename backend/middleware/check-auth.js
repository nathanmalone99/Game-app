const jwt = require("jsonwebtoken");
const userSchema = require("../models/users")

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new Error('No Authorization header present');
        }

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            throw new Error('No token found');
        }
        
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
        
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };

        userSchema.findById(req.userData.userId).then(user => {
            if (!user) {
                throw new Error('User not found');
            }
            req.userRole = user.role;
            next();
        }).catch(error => {
            res.status(401).json({ message: "Auth Failed" });
        });
    
    } catch (error) {
        console.error("Error in Auth Middleware:", error);
        res.status(401).json({ message: error.message || "Auth Failed" });
    } 
};

module.exports.checkAdmin = (req, res, next) => {
    if (req.userRole && req.userRole === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access Denied: Admins only" });
    }
    console.log('User role:', req.userRole);
}