const express = require('express')
const cors = require('cors') //Permisos sobre el contenido a desplegar
const path = require('path') //Express servir el frontend

const fs = require('fs').promises //Actualizado gestion de Archivos

//* ENRUTADORES *
const productoRoutes = require('./routes/productoRoutes')
const tiendaRoutes = require('./routes/tiendaRoutes')
const clienteRoutes = require('./routes/clienteRoutes')

const personaRoutes = require('./routes/personaRoutes')

const app = express()
const PORT = process.env.PORT || 3000 //Puerto de la App

//* CONFIGURACION *
//Actualización - Permisos cors
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}))

//Actualizacion  - Carpeta de uploads (make directory)
const uploadDir = './public/uploads'
fs.mkdir(uploadDir, {recursive: true})

// * MIDDLEWARE *
//Comunicación se realizará JSON
app.use(express.json())
//Servir los documentos HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')))
//Gestion de Archivos
app.use(express.urlencoded({extended: true}))


// **ROUTEOS > FRONTEND**
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'productos.html'))
})

app.get('/tiendas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tiendas.html'))
})

app.get('/clientes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'clientes.html'))
})

//Rutas para el modulo de personas
app.get('/personas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'personas/listar.html'))
})
app.get('/personas/crear', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'personas/crear.html'))
})
app.get('/personas/editar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'personas/editar.html'))
})


// Comunicación se realizará JSON
app.use(express.json())

// Rutas API
app.use('/api/productos', productoRoutes)
app.use('/api/tiendas', tiendaRoutes)
app.use('/api/cliente', clienteRoutes)  
app.use('/api/personas', personaRoutes)
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado http://localhost:${PORT}`)
})