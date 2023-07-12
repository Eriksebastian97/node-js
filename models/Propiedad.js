//creamos el modelo de propiedades donde se van registrar los datos de crear propiedad

import { DataTypes} from "sequelize"
import db from "../config/db.js" //importamos nuestra instancia de base de datos , tiene la informacion de conexion de la base de datos , nombre de bases de datos etc

//agregamos todos los campos que va a tener la tabla propiedad van a ser muchos campos son lo que se muestran en crear.pug
const Propiedad = db.define("propiedades",{
  id:{
    type:DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull:false,
    primaryKey:true
  }, //tenemos un Id mas consistente
   titulo:{
    type:DataTypes.STRING(100),
    allowNull:false
   },
   descripcion:{
    type:DataTypes.TEXT,
    allowNull:false
   },
   habitaciones:{
    type:DataTypes.INTEGER,
    allowNull:false
   },
   estacionamiento:{
    type:DataTypes.INTEGER,
    allowNull:false
   },
   wc:{
    type:DataTypes.INTEGER,
    allowNull:false
   },
   calle:{
    type:DataTypes.STRING(60),
    allowNull:false
   },
   lat:{
    type:DataTypes.STRING,
    allowNull:false
   },
   lng :{
    type:DataTypes.STRING,
    allowNull:false
   },
   //la imagen es de tipo string y no la guardamos como archivo , una base de datos puede guardarlo como archivo pero seria muy pesando tal ves tenemos un hosting de 1mb y se puede llegar a colapsar y corromper la base de datos y seria muy dificil recuperar esa informacion, tambien si se hace mas pesado la base de datos mas lenta va ser la pagina , en este caso solo guardamos la ubicacion donde se almacene
   imagen:{
    type:DataTypes.STRING,
    allowNull:false
   },
   publicado:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
   }


})

export default Propiedad