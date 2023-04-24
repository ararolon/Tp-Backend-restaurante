const { Restaurantes } = require('../models');
const db = require('../models');
const restaurantes= db.Restaurantes;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {

// Validate request

if (!req.body.nombre) {
    res.status(400).send({

       message: "Se debe enviar el nombre del restaurante"
     });

    return;
}

// crea un restaurante

const restaurante = {

    nombre: req.body.nombre,

    direccion: req.body.direccion,

};

// Guardamos en la bd

restaurantes.create(restaurante).then(data => {

    res.status(200).send(data);

})

.catch(err => {

    res.status(500).send({

    message: "Ha ocurrido un error al crear un restaurante."

    });

});

};

//obtiene por id del restaurante

exports.findOne = (req, res) => {

    const id = req.params.id;
    
    restaurantes.findByPk(id)
    
    try{
        if(data){
        
        res.status(200).send(data);
        
        }
        else{
            res.status(404).send({
                message: "No se encontro el restaurante con id: "+id
            });
        }
    }
    
    catch(error){
        res.status(500).send({
            message: "Error en el servidor"
        });
    }
    
};

//obtiene todos los restaurantes

exports.findAll = (req, res) => {

    const nombre = req.query.nombre;
    
    var condition = nombre ? { cliente: { [Op.iLike]: `%${nombre}%` } } : null;
    
    restaurantes.findAll({ where: condition })
    
    .then(data => {
    
    res.send(data);
    
    })
    
    .catch(err => {
    
    res.status(500).send({
    
    message:
    
    err.message || "Ocurrio un error al obtener los restaurantes."
    
    });
    
    });
    
};

//actualizar

exports.update = async(req, res) => {
    //Validar el request
    if(!req.body.id){
        res.status(400).send({
            message: "Se debe enviar el id del restaurante para actualizar"
        })
    }
    const {id, nombre, direccion} = req.body;
    try {
        const restaurante = await restaurantes.findByPk(id);
        if(!restaurante){
            res.status(404).send({
                message: "No se encontro el restaurante con id: " + id
            });
        }else{
            restaurante.nombre = nombre;
            restaurante.direccion = direccion;
            const data = await restaurante.save(); //guarda los cambios 
            res.send(data);
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ha ocurrido un error al actualizar un restaurante con id: "+id
        });
    }
}

//eliminar

exports.delete = async(req, res) =>{
    const {id} = req.params;
    try {
        const restaurante  = await restaurantes.findByPk(id);
        if(!restaurante){
            res.status(404).send({
                message: "No se encontro el restaurant con id: " + id
            });
        }else{ //si encuentra el restaurante , borra de la base de datos
            const data = await restaurante.destroy();
            res.status(200).send({
                message:"Restaurante eliminado satisfactoriamente"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar restaurant con id:" + id
        });
    }
}