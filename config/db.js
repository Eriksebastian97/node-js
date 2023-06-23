import  Sequelize  from "sequelize";
import dotenv from "dotenv"
dotenv.config({path: ".env"})

//crea una nueva instancia y se conecta a la base de datos y agrega los datos a la base de datos

//toma 4 parametros
//nombre de la base de datos
//el usuario y el password
// Y un objeto de configurarion

//tamastime cuando el usuario se registra agrega 2 columnas extras a la tabla de usuario , una cuando fue creado y la otra cuando fue actualizado

//pool , configura como va ser el comportamiento para conexiones nuevas o existenes

//sequelice mantener o reutilizar las conexiones vivas
// acquire:30000 tiempo de elaborar una conexion antes de marcar un error
//idle:10000 son 10seg si no hay visitas para que la conexion finalice
//todo este esto por que consume muchos recursos y hay que liberar espacio de memoria
const db = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER, process.env.DB_PASS,{
    host: process.env.BD_HOST,
    port:3306,
    dialect:"mysql",
    define:{
        timestamps: true
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorAliases:false
})

export default db;