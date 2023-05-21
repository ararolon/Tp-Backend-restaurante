const db = require("../models");
const Cliente = db.Cliente;

exports.findAll = (req, res) => {
  Cliente.findAll()

    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocurrio un error al obtener los clientes.",
      });
    });
};

//funcion para recuperar una cedula

findByCedula = async (cedula) => {
  cliente = await Cliente.findOne({
    where: { cedula: cedula },
  });

  if (cliente) {
    console.log("1");
    return "EL cliente con cedula: " + cedula + " ya existe";
  } else {
    console.log("0");
    return "";
  }
};
exports.findOne = (req, res) => {
  const pk = req.params.id;
  Cliente.findByPk(pk)
    .then((data) => {
      if (data == null) {
        res.status(404).send({
          message: "El Cliente con id=" + pk + " no existe",
        });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(400).send({
        message: "Error al obtener cliente id=" + pk + " no existe",
      });
    });
};

//get por cedula

exports.findByUniqueCI = async (req, res) => {
  try {
    var cliente = await Cliente.findOne({
      where: { cedula: req.params.ci }, //ci trae del path
    });
    if (cliente) res.status(200).send(cliente);
    else
      res.status(404).send({
        message: "No existe el cliente con cedula : " + req.params.ci,
      });

    console.log(cliente);
  } catch (error) {
    res.status(500).send({
      message: "Error en el servidor",
    });
  }
};

exports.create = (req, res) => {
  //verifica que no exista ya un cliente con la misma cedula

  //al verificar recibe un mensaje de la funcion , si recibe el mensaje ya existe el cliente
  findByCedula(req.body.cedula).then((message) => {
    if (!message) {
      //no hay mensaje, se crea el cliente
      const cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
      };

      Cliente.create(cliente)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send("Ocurrio un error en el servicio");
        });
    } else {
      res.status(404).send({ message });
    }
  });
};
