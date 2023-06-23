//2 formas de crear tipos de datos de tus modelos sequelize y DataType
import {  DataTypes } from "sequelize";
import db from "../config/db.js";

//define es la forma que definimos un nuevo modelo y adentro el nombre del model y creacion de registros

const Usuario = db.define("usuarios", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: DataTypes.STRING,
  confirmado: DataTypes.BOOLEAN,
});

//exportamos el usuario por ejemplo para hacerlo disponibles en otros lugares por ejemplo en el controlador para lsitar o actualizar etc
export default Usuario