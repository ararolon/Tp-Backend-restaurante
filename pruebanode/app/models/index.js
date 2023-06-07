const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

host: dbConfig.HOST,

dialect: dbConfig.dialect,

operatorsAliases: false,

pool: {

max: dbConfig.pool.max,

min: dbConfig.pool.min,

acquire: dbConfig.pool.acquire,

idle: dbConfig.pool.idle

}

});

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.Ventas = require("./venta.models.js")(sequelize, Sequelize);
db.Mesa = require("./mesa.models.js")(sequelize,Sequelize);
db.Restaurantes = require ("./restaurante.models.js")(sequelize,Sequelize);
db.Restaurantes.hasMany(db.Mesa, {as: 'mesa', foreignKey: 'id_restaurante'});
db.Cliente = require ("./cliente.models.js")(sequelize,Sequelize);
db.Reserva = require("./reserva.models.js")(sequelize, Sequelize);
db.Categoria = require("./categoria.models.js")(sequelize, Sequelize);
db.Producto= require("./producto.models.js")(sequelize, Sequelize);
db.Consumo=require("./consumo.models.js")(sequelize, Sequelize);
db.DetalleConsumo=require("./detalleConsumo.models.js")(sequelize, Sequelize);

//relacion entre Categoria y producto
db.Categoria.hasMany(db.Producto,{ as:"producto", foreignKey:"id_categoria"});

//relacion de consumo con mesa y cliente
db.Cliente.hasMany(db.Consumo,{as:"consumo",foreignKey:"id_cliente"})
db.Mesa.hasMany(db.Consumo,{as:"consumo",foreignKey:"id_mesa"})

//relacion detalleConsumo con consumo y producto
db.Consumo.hasMany(db.DetalleConsumo,{as:"detalle_consumo",foreignKey:"id_consumo"})
db.Producto.hasMany(db.DetalleConsumo,{as:"detalle_producto",foreignKey:"id_producto"})

module.exports = db;
