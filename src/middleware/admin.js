const jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication1 = (req, res, next) => {
    const token = req.cookies.jwt;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            req.user = null;
        }else{
            req.user = decoded;
        }
        
        next();
    });

};

const authentication2 = (req, res, next) => {
    const token = req.cookies.jwt;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }else{
            req.user = decoded;
        }
        
        next();
    });

};

module.exports = {authentication1, authentication2};