import Precio from "../models/Precio.js";
import Categoria from "../models/Categoria.js";
import Propiedad from "../models/Propiedad.js";
import { validationResult } from "express-validator";

//admin va a renderizar lo que halla propiedades/admin
//dejamos barra en true
//si existe barra true en layout/header.pug , se muestra el header
const admin = (req, res) => {
  res.render("propiedades/admin", {
    pagina: "Mis Propiedades"
   
  });
};

//formulario para crear una nueva propiedad
const crear = async (req, res) => {
  //consultar la base de datos del modelo de precio y categorias y poder mostrarlo en sus seccion .

  //traemos todas las categorias y precio osea sus registro con findALL()

  //Categoria y Precio como estan un Promise.All se regresan al arreglo , el primer valo que se retorna va ser el de categoria y el segundo el de precios

  //lo que tengamos en el arreglo se lo pasamos a categoria
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);

  res.render("propiedades/crear", {
    pagina: "Crear Propiedad",
    
    csrfToken: req.csrfToken(),
    categorias: categorias,
    precios: precios,
    datos:{}
  });
};

const guardar = async (req, res) => {
  //validacion

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);

    return res.render("propiedades/crear", {
      pagina: "Crear Propiedad",
      
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos:req.body
    });
  }

  //crear registro
 const {titulo,descripcion , habitaciones , estacionamiento , wc , calle , lat, lng,precio:precioId , categoria:categoriaId} = req.body

 console.log(req.usuario)

//asignar la propiedad que estamos creando la persona que lo registro

//extraemos el valor de id y lo asginamos a usuarioId
const {id:usuarioId} = req.body

  try{
    const propiedadGuardada = await Propiedad.create({
     titulo,
     descripcion,
     habitaciones,
     estacionamiento,
     wc,
     calle,
     lat,
     lng,
     precioId,
     categoriaId,
     usuarioId,
     imagen:""
    })
    const {id} = propiedadGuardada
    res.redirect(`/propiedades/agregar-imagen/${id}`)
  }catch(error){
    console.log(error)
  }
};

const agregarImagen = async(req,res)=>{

  const {id} = req.params

  //validar que la propiedad exista
   const propiedad = await Propiedad.findByPk(id)
   if(!propiedad){
    return res.redirect("/mis-propiedades")
   }


  //validar que la propiedad no este publicada
  //si esta publicado lo redirrencionamos a otra pagina
  if(propiedad.publicado){
    return res.redirect("/mis-propiedades")
  }

  //validar que la propiedad que pertence a quien visita esta pagina

  // console.log(req.usuario)

  console.log(propiedad.usuarioId)

  res.render("propiedades/agregar-imagen",{
   pagina:"Agregar Imagen"
  })
}

export { admin, crear, guardar,agregarImagen };
