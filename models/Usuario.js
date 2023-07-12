//2 formas de crear tipos de datos de tus modelos sequelize y DataType
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"; //es para hashear los password y tiene una funcion para comparar un password ingresado en un formulario y comparar con el password hasheado en la bse de datos
import db from "../config/db.js";

//define es la forma que definimos un nuevo modelo y adentro el nombre del model y creacion de registros

const Usuario = db.define(
  "usuarios",
  {
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
  },
  {
    //hooks so funciones que podemos agregar a cierto modelo
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
    //scope , es para eliminar cierto campos cuando hacemos una consulta a un modelo en especifico

    scopes: {
      eliminarPassword: {
        attributes: {
          exclude: ["password", "token", "confirmado", "createdAt", "updatedAt"],
        },
      },
    },
});

//halleamos el password , cuando se cree el nuevo registro va a tomar el usuario o el req.body , intercede el password y lo hashea

//req.body es el campo del formulario y accedemos en el mediante usuario.password
//usuario.password reescribe el valor antes de guardarlo en la base datos

//utiliza el valor previo y asigna el hasheo mediante el salt

//exportamos el usuario por ejemplo para hacerlo disponibles en otros lugares por ejemplo en el controlador para listar o actualizar etc

//Metodos Personalizados :
// Todos los Objetos y arreglos tienen un prototype
//contiene todas funciones que podemos utilizar en este tipo de objetos

//Este password va a tomar el password que ingresa el usuario

//usamos bcrypt.compareSync para comparar el password que ingresa el usuario en el formulario de forma string en texto plano con el password hasheado con la base de datos
//password es el que ingresa el usuario
//this.password va ser la instancia de la base de datos
Usuario.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default Usuario;
