const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8090"
};
app.use(cors(corsOptions));
// analizar solicitudes de tipo de contenido - application/json
app.use(bodyParser.json());
// analizar solicitudes de tipo de contenido - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// Base de datos
const db = require("./app/models");
db.sequelize.sync();
// force: es igual a true elimina la tabla si actualmente existe
// db.sequelize.sync({
//     force: true
// }).then(() => {
//     console.log('Eliminando y resincronizando la base de datos.');
// });

// Ruta Simple
app.get("/", (req, res) => {
    res.json({
        message: "Binvenidos a la API REST del Bootcamp!"
    });
});

// routes
require('./app/routes/user.routes')(app);
require('./app/routes/bootcamp.routes')(app);

// Establecer el puerto
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: ${PORT}.");
});