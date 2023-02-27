const { Register } = require('../model/register.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.createUsuario = async (req, res) => {
    try {
        const usuario = new Register(req.body);
        await usuario.save();
        res.json({ msg: 'Se ha registrado correctamente ', usuario });
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Register.findOne({ email });
        if (usuario === null) {
            return res.status(403).json({ msg: "Correo invalido" });
        }
        const esValidaLaPass = await bcrypt.compare(password, usuario.password);
        if (esValidaLaPass) {
            const secret = "contraseniaSecreta";
            const newJWT = jwt.sign({
                _id: usuario._id,
                nombre: `${usuario.firstName} ${usuario.lastName}`,
                email: usuario.email

            }, secret)
            res.cookie("usertoken", newJWT, {
                    httpOnly: true
                })

            res.json({ msg: 'logueado correctamente' });
        }
        else
            return res.status(403).json({ msg: "Tu clave no es la correcta" });

        //res.cookie("usertoken", "mydata", { httpOnly: true })
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}


module.exports.logout = (req, res) => {
    try {
        res.clearCookie("usertoken")
        res.json({ msg: "Saliste correctamente" });
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

module.exports.getAllUsuarios = async(req, res) => {
    try {
        console.log(req.usuario);
        console.log(req.cookie);
        const usuario = await Register.find({});
        res.json(usuario);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}