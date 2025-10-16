const { error } = require('console')
const db = require('../config/db')
const path = require('path')

const obtenerTodas = async (req, res) => {
  try {
    const sql = "SELECT * FROM personas"
    const [rows] = await db.query(sql)
    res.json(rows)
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Error en la conexión' })
  }
}

// Crear persona
const crear = async (req, res) => {
  try {
    // 1. Recibir los datos del formulario
    const { apellidos, nombres, dni, telefono } = req.body

    // 2. (Desactivado) Recibir la fotografía real
    // const fotografia = req.file ? `/uploads/${req.file.filename}` : null;

    const fotografia = 'nueva foto.jpg' // temporal, como dijiste

    // 3. Validaciones básicas
    if (!apellidos || !nombres || !dni || !telefono) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    }

    // 4. Guardar nuevo registro
    const [result] = await db.query(
      "INSERT INTO personas (apellidos, nombres, dni, telefono, fotografia) VALUES (?,?,?,?,?)",
      [apellidos, nombres, dni, telefono, fotografia]
    )

    res.status(201).json({
      id: result.insertId,
      message: 'Registro correcto'
    })
  } catch (e) {
    //console.error(e)
    if (e.code === "ER_DUP_ENTRY"){
      return res.status(400).json({error: 'DNI está duplicado'})
    }
    res.status(500).json({error: 'Error en el proceso registro'})
  }
}

// Actualizar persona (opcional)
const actualizar = async (req, res) => {

}


const eliminar = async (req, res) => {

}

module.exports = {
  obtenerTodas,
  crear,
  actualizar,
  eliminar
}
