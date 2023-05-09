module.exports = (sequelize, Sequelize) => {
    var Restaurantes= sequelize.define("restaurantes", {
        id: {
            type:Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        }
    });
    return Restaurantes;
};

