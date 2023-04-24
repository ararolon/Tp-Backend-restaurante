module.exports = app =>{
    const restaurante = require('../controllers/restaurantedao.controller');
    const router = require('express').Router();
    router.get("/", restaurante.findAll);
    router.get("/:id", restaurante.findOne);
    router.get("/", restaurante.findAll);
    router.post('/', restaurante.create);
    router.put('/', restaurante.update);
    router.delete('/:id', restaurante.delete);

    
    app.use('/api/restaurante', router);
}

