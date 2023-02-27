const { authenticate } = require('../config/jwt.config');
const RegisterController = require('../controller/register.controller');
module.exports = (app) =>{
    app.post('/api/register', RegisterController.createUsuario);
    app.get('/api/register/salir', RegisterController.logout);
    app.post('/api/register/login', RegisterController.login);
    app.get('/api/register', authenticate, RegisterController.getAllUsuarios);
}