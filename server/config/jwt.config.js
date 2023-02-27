const jwt = require("jsonwebtoken");
const secret = "contraseniaSecreta";
module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false }); //verifica si el usuario tiene permisos
        } else {
            req.usuario = payload;
            next(); //se ejecuta lo que viene despues
        }
    });
}

