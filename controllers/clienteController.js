// Acceso a la BD mysql/promise
const db = require('../config/db')

// Métodos exportados
// req   require (solicitud)
// res   response (respuesta)

// Crear cliente
exports.crearCliente = async (req, res) => {
  const { apellidos, nombres, dni, telefono, direccion, id_tienda } = req.body

  // Validación básica (requeridos excepto telefono)
  if (!apellidos || !nombres || !dni || !direccion || id_tienda == undefined) {
    return res.status(400).json({ mensaje: 'Falta completar los campos obligatorios' })
  }

  const sql = "INSERT INTO clientes (apellidos, nombres, dni, telefono, direccion, id_tienda) VALUES (?,?,?,?,?,?)"

  try {
    const [result] = await db.query(sql, [apellidos, nombres, dni, telefono, direccion, id_tienda])  
    res.status(201).json({
      id: result.insertId,
      mensaje: 'Cliente registrado correctamente'
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Listar clientes (con INNER JOIN para nombre de tienda)
exports.obtenerClientes = async (req, res) => {
  const sql = `
    SELECT c.id, c.apellidos, c.nombres, c.dni, c.telefono, c.direccion, c.id_tienda, t.tienda 
    FROM clientes c 
    INNER JOIN tiendas t ON c.id_tienda = t.id
    ORDER BY c.id DESC 
  `

  try {
    const [clientes] = await db.query(sql)
    res.status(200).json(clientes)
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Buscar cliente por ID (con INNER JOIN para nombre de tienda)
exports.obtenerClientePorId = async (req, res) => {
  const { id } = req.params
  const sql = `
    SELECT c.id, c.apellidos, c.nombres, c.dni, c.telefono, c.direccion, c.id_tienda, t.tienda 
    FROM clientes c 
    INNER JOIN tiendas t ON c.id_tienda = t.id
    WHERE c.id = ?
  `

  try {
    const [clientes] = await db.query(sql, [id])

    if (clientes.length === 0) {
      return res.status(404).json({ mensaje: 'No encontramos el cliente' })
    }

    res.status(200).json(clientes[0])
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Actualizar cliente (UPDATE directo con todos los campos)
exports.actualizarCliente = async (req, res) => {
  const { id } = req.params
  const { apellidos, nombres, dni, telefono, direccion, id_tienda } = req.body

  // Validación básica (requeridos excepto telefono)
  if (!apellidos || !nombres || !dni || !direccion || id_tienda == undefined) {
    return res.status(400).json({ mensaje: 'Debe ingresar los campos obligatorios' })
  }

  const sql = "UPDATE clientes SET apellidos = ?, nombres = ?, dni = ?, telefono = ?, direccion = ?, id_tienda = ? WHERE id = ?"

  try {
    const [result] = await db.query(sql, [apellidos, nombres, dni, telefono, direccion, id_tienda, id])  // <-- Removido || null para telefono
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'No encontramos el cliente con ese ID' })
    }

    res.status(200).json({ mensaje: 'Cliente actualizado correctamente' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}

// Eliminar cliente
exports.eliminarCliente = async (req, res) => {
  const { id } = req.params
  const sql = "DELETE FROM clientes WHERE id = ?"

  try {
    const [result] = await db.query(sql, [id])

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado para eliminar' })
    }

    res.status(200).json({ mensaje: 'Cliente eliminado correctamente' })
  } catch (e) {
    console.error(e)
    res.status(500).json({ mensaje: 'Error interno del servidor' })
  }
}
