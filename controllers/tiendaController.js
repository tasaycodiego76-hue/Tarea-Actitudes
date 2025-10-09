// Acceso a la BD mysql/promise
const db = require('../config/db')

// Crear tienda
exports.crearTienda = async (req, res) => {
  const { tienda } = req.body

  if (!tienda) {
    return res.status(400).json({ mensaje: 'Falta completar el nombre de la tienda' })
  }

  const sql = "INSERT INTO tiendas (tienda) VALUES (?)"

  try {
    const [result] = await db.query(sql, [tienda])
    res.status(201).json({
      id: result.insertId,
      mensaje: 'Tienda registrada correctamente'
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Listar tiendas
exports.obtenerTiendas = async (req, res) => {
  const sql = "SELECT * FROM tiendas ORDER BY id DESC"

  try {
    const [tiendas] = await db.query(sql)
    res.status(200).json(tiendas)
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Buscar tienda por ID
exports.obtenerTiendaPorId = async (req, res) => {
  const { id } = req.params
  const sql = "SELECT id, tienda FROM tiendas WHERE id = ?"

  try {
    const [tiendas] = await db.query(sql, [id])

    if (tiendas.length === 0) {
      return res.status(404).json({ mensaje: 'No encontramos la tienda' })
    }

    res.status(200).json(tiendas[0])
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Actualizar tienda
exports.actualizarTienda = async (req, res) => {
  const { id } = req.params
  const { tienda } = req.body

  if (!tienda) {
    return res.status(400).json({ mensaje: 'Debe ingresar el nombre de la tienda' })
  }

  const sql = "UPDATE tiendas SET tienda = ? WHERE id = ?"

  try {
    const [result] = await db.query(sql, [tienda, id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'No encontramos la tienda con ese ID' })
    }

    res.status(200).json({ mensaje: 'Tienda actualizada correctamente' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Eliminar tienda
exports.eliminarTienda = async (req, res) => {
  const { id } = req.params
  const sql = "DELETE FROM tiendas WHERE id = ?"

  try {
    const [result] = await db.query(sql, [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Tienda no encontrada para eliminar' })
    }

    res.status(200).json({ mensaje: 'Tienda eliminada correctamente' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}
