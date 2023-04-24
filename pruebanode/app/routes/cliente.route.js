module.exports = app =>{
    const cliente = require('../controllers/clientedao.controller');
    const router = require('express').Router();
    router.post("/",cliente.create);
    router.get("/", cliente.findAll);
    router.get("/:id", cliente.findOne);
    router.post('/', cliente.create);
    router.get("/cedula/:ci",cliente.findByUniqueCI);
  
    
    app.use('/api/cliente', router);
}

