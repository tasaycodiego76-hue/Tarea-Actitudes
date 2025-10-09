const express = require('express')
const router = express.Router()
const tiendasController = require('../controllers/tiendaController')

// Rutas CRUD
router.get('/', tiendasController.obtenerTiendas)
router.get('/:id', tiendasController.obtenerTiendaPorId)
router.post('/', tiendasController.crearTienda)
router.put('/:id', tiendasController.actualizarTienda)
router.delete('/:id', tiendasController.eliminarTienda)

module.exports = router
