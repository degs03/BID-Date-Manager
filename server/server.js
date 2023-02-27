const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/mongoose.config');


app.use(cookieParser());
app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials:true, origin:'http://localhost:5173', exposedHeaders: ['set-cookies']})); //Permite realizar solicitudes cruzadas
const AllMyUserRoutes = require('./routes/date.routes');
AllMyUserRoutes(app);
const AllMyUserRoute = require('./routes/register.routes');
AllMyUserRoute(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));