// routes/personaRoutes.js
const express = require('express')
const router = express.Router()
const personaController = require('../controllers/personaController')
const {upload} = require('../middleware')

// Rutas
router.get('/', personaController.obtenerTodas)
router.post('/', personaController.crear)

module.exports = router
