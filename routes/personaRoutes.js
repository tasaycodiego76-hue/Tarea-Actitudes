// routes/personaRoutes.js
const express = require('express')
const router = express.Router()
const personaController = require('../controllers/personaController')
const {upload} = require('../middleware')

// Rutas
router.get('/', personaController.obtenerTodas)
//router.get('/', upload.single('fotografia'), personaController.crear)
router.post('/', personaController.crear)

module.exports = router
