//un seeder es una forma de insertar dato masivamente a tu base de datos

import {exit} from "node:process"
import categorias  from "./categorias.js"; //los datos del seed

import precios from "./precios.js";
import usuarios from "./usuarios.js";
import db from "../config/db.js" // la instancia de la conexion de la base de datos
import {Categoria,Precio,Usuario} from "../models/index.js"//los modelos de la base de datos


const importarDatos = async()=>{
    try{
    //autenticar en la base de datos
    await db.authenticate()
    //Generar las columnas
    await db.sync() 

    // insertamos los datos
    //bulkCrate como Categoria es un arreglo son multiples  registros  es el modelo , bulkCrate inserta todos los datos
     
     
    await Promise.all([
        Categoria.bulkCreate(categorias),
        Precio.bulkCreate(precios),
        Usuario.bulkCreate(usuarios)
    ])

     console.log("datos importados correctamente")
     //ademas de finalizar el proceso tambien lo hace rapidamente para que no se siga procesando , tal ves tarda 10s o 15s y con exit() lo finaliza en 1s
     exit(0)

    }catch{
        console.log(error)
        //esta es una forma de terminar los procesos
        exit(1)
    }
}

//limpiar nuestra base de datos
//truncate es necesario , es para eliminar los id previamente y limpiar e iniciar otra ves desde el num 1

const eliminarDatos = async()=>{
    try{
        await Promise.all([
            Categoria.destroy({where:{}, TRUNCATE:true}),
            Precio.destroy({where:{}, TRUNCATE:true})
        ])
        // await db.sync({force:true})

        //await db.sync({force:true}) otra forma tal ves un poco mas dinamica si tenemos varios modelos y no andar escribiendo muchas lineas de codigo .
        console.log("Datos Eliminados Correctamente")
        exit()
    }catch(error){
        console.log(error)
        exit(1)
    }
}


//es la forma de llamar el seeder
//este process.argv es algo interno de node es una forma de pasarle argumentos a un comando desde el comand line es decir desde la terminal
//recuerda que process es un proceso de node.js
//"node ./seed/seeder.js -i" se pasa como argumento y este argv toma ese arreglo mediante su posicion  y manda a llamar la funcion de importarDatos()

if (process.argv[2] === '-i') {
    importarDatos()
    
  }

if (process.argv[2] === '-e') {
    eliminarDatos()
    
  }