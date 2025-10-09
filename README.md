# Procedimientos

1. 👝 Clonar repositorio
git clone https://github.com/edwleo/electroperu.git

2. ⛏️ Restaurar la BD
```sql
CREATE DATABASE electroperu;
use electroperu;

CREATE TABLE productos
(
   id INT AUTO_INCREMENT PRIMARY KEY,
   descripcion  VARCHAR(50) NOT NULL,
   garantia     TINYINT     NOT NULL,
   precio       DECIMAL(7,2) NOT NULL
)ENGINE = INNODB;


CREATE TABLE tiendas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tienda VARCHAR(50) NOT NULL
);


CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    apellidos VARCHAR(40) NOT NULL,
    nombres VARCHAR(40) NOT NULL,
    dni VARCHAR(8) NOT NULL UNIQUE,
    telefono VARCHAR(9),
    direccion VARCHAR(70),
    id_tienda INT,                  
    FOREIGN KEY (id_tienda) REFERENCES tiendas(id)
);

```

3. 📋 Abrir proyecto _electroperu_ en VSCode

4. Abrir la terminal **CTRL + Ñ** escribir:
```
npm install
```
Se ejecutará la instalación de todas las dependecias definidas en **package.json**

5. Crear e ingresar los parámetros en el archivo **.env**

6. Ejecutar el servidor (_nodemon_)
```
nodemon server
```

7. Verificar cada verbo (GET/POST/PUT/DELETE) utilizando PostMan, ThunderClient