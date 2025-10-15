//Gestionar los archivos binarios => jpg, png, pdf, mp3
//Node > "multer"
const multer = require("multer")
const path = require("path")

const uploadDir = "./public/uploads"

//Gestion de escritura (¿Dónde se guardaran?)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    //NOTA: No podemos guardar el archivo con el nombre original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) //Sufijo único
    cb(null, 'foto-' + uniqueSuffix + path.extname(file.originalname))
  }
})

//Filtro (¿que tipo de archivos está permitido)
const fileFilter = (req, file, cb) => {
  //Expresión regular
  const allowedTypes = /jpej|jpg|png|gif|webp/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = allowedTypes.test(file.mimetype)

  //Si la extensión es correcta, podemos GRABAR el archivo
  if (mimeType && extname){
    return cb(null, true)
  }else{
    cb(new Error('Solo se permiten extensiones de imágenes'))
  }
}

//Configuración "multer"
//* 1024 (Lb) * 1024 (Mb)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
})

//Exportar
module.exports = { upload }