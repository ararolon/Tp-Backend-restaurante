const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {

origin: "http://localhost:5173" 
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json

app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

// simple route

app.get("/", (req, res) => {

res.json({ message: "Bienvenido Node backend 2023" });

});

const PORT = process.env.PORT || 9090;


// set port, listen for requests
require("./app/routes/venta.route")(app);
require("./app/routes/restaurante.route")(app);
require("./app/routes/cliente.route")(app);
require("./app/routes/mesa.route")(app);
require("./app/routes/reserva.route")(app);
require('./app/routes/categoria.routes')(app);
require('./app/routes/producto.routes')(app);
require('./app/routes/consumo.routes')(app);

app.listen(PORT, () => {



console.log('Servidor corriendo en puerto 9090.');

});