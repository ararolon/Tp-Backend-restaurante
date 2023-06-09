const db = require("../models")
const Mesa = db.Mesa

exports.create = async (req,res) => {

    if(!req.body.nombre){
        res.status(400).send({
            message: "Debe enviarse el nombre de la mesa"
        });
    }

    else if(!req.body.id_restaurante){
        res.status(400).send({
            message: "Debe enviarse el id del restaurante"
        });
    }
    else{
        const mesa = req.body
        try{
              const data = await Mesa.create(mesa)
              res.send(data);
        }
        catch(error){
            res.status(500).send({
                message: error.message || "Ha ocurrido un error al crear la mesa"
            })
        }
    } 
}
    exports.findAll=(req,res) => {
        Mesa.findAll()
            .then(data =>{
                res.status(200).send(data);
            })
            .catch(err =>{
                res.status(500).send({
                    message:"Error en el servidor"
                });
            });
    };
    
    exports.findAllByRestaurant=(req,res) => {
        Mesa.findAll(
            {
                where: {
                    id_restaurante: req.params.idRes
                },
                order:[["planta","DESC"],["posicion_y","ASC"],["posicion_x","ASC"]]
            }
        )
            .then(data =>{
                res.status(200).send(data);
            })
            .catch(err =>{
                res.status(500).send({
                    message:"Error en el servidor"
                });
            });
    };
    
    exports.findOne = async(req, res) =>{
        const {id} = req.params;
        try {
            const data = await Mesa.findByPk(id);
            if(data){
                res.send(data);
            }else{
                res.status(404).send({
                    message: "No se encontro la mesa con id:" + id
                });
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Error al obtener mesa con id=" + id
            });
        }
    }
    
    exports.update = async(req, res) => {
        //Validar el request
        if(!req.body.nombre || !req.body.id){
            res.status(400).send({
                message: "Debe enviar el nombre y id de la mesa"
            })
        }
        const {id, nombre, posicion_x, posicion_y, planta, id_restaurante, capacidad} = req.body;
        try {
            const mesa = await Mesa.findByPk(id);
            if(!mesa){
                res.status(404).send({
                    message: "No se encontro la mesa con id:  " + id
                });
                
            }
            else{
                mesa.nombre = nombre;
                mesa.posicion_x = posicion_x;
                mesa.posicion_y = posicion_y;
                mesa.planta = planta;
                mesa.id_restaurante = id_restaurante;
                mesa.capacidad = capacidad;
                const data = await mesa.save();
                res.send(data);
            }
        } catch (error) {
            res.status(500).send({
                message: error.message || "Ha ocurrido un error al actualizar una mesa."
            });
        }
    }
    exports.delete = async(req, res) =>{
        const {id} = req.params;
        try {
            const mesa  = await Mesa.findByPk(id);
            if(mesa){
              const data = await mesa.destroy();
              res.status(200).send({
                message: "Se elimino la mesa con id:"+id
              });
            }
            else{
                res.status(404).send({
                   message: "No existe la mesa con id :"+id
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "Error al eliminar mesa con id=" + id
            });
        }
    }





