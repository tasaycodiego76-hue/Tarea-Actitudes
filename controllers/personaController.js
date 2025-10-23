const { error } = require('console')
const db = require('../config/db')
const path = require('path')

const obtenerTodas = async (req, res) =>{
  try{
    const sql = "SELECT * FROM personas"
    const [rows] = await db.query(sql) //
    res.json(rows)
  }catch(e){
    console.error(e)
    res.status(500).json({error: 'Error en la conexión'})
  }
}

//req => require (peticion/solicitud)
//req.params : parametro URL
//req. file : Envpia un archivo binario
const crear = async (req, res) => {
  try{
    //1. Recibir los datos del formulario(texto)
    const{apellidos, nombres, dni, telefono} = req.body
    //2. Recibir la fotografia
    const fotografia = req.file ? `/uploads/${req.file.filename}` : null;

    //3. Validacion...

    //4. Guardar nuevo Registro
    const[result] = await db.query("INSERT INTO personas (apellidos, nombres, dni, telefono, fotografia) VALUES (?,?,?,?,?)",
      [apellidos, nombres, dni, telefono, fotografia])

      res.status(201).json({
        id: result.insertId,
        message: 'Registro correcto'
      })

  }catch (e){
    console.error(e)

  }
}

const actualizar = async(req, res) =>{
  //..
}

const eliminar = async(req, res) =>{
  //...
}

//Antes de finalizar este controlador, exportador los objetos (función)

module.exports = {
  obtenerTodas,
  crear,
  actualizar,
  eliminar
}