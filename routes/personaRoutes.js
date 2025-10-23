const express = require('express')
const router = express.Router()
const personaController = require('../controllers/personaController')
const { upload } = require('../middleware')

// Obtener todas las personas
router.get('/', personaController.obtenerTodas)

// Crear una persona con foto (usa multer)
router.post('/', upload.single('fotografia'), personaController.crear)

module.exports = router