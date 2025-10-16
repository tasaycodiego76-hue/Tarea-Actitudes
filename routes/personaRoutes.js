const express = require('express')
const router = express.Router()
const personaController = require('../controllers/personaController')
const {upload} = require('../middleware')


//LEER
router.get('/', personaController.obtenerTodas)

//CREAR => BINARIO
//fotografia = name (frontend)
router.post('/',upload.single('fotografia'), personaController.crear)

module.exports = router