import Usuario from "../models/Usuario.js"


//visitamos la funcion y vemos que hace

const formularioLogin = (req,res)=>{
  //render una funcion que se encarga de mostrar una vista , donde se encuntra la vista va a tomar su ubicacion 
  res.render("auth/login",{
    pagina: "Iniciar Sesion"
    
  })
}

const formularioRegistro = (req,res)=>{
  //render una funcion que se encarga de mostrar una vista , donde se encuntra la vista va a tomar su ubicacion 
  res.render("auth/registro",{
    pagina: "Crear Cuenta"
  })
}

//req es lo que enviamos al servidor
//res es la respuesta del servidor
//siempre que se vayas a leer la informacion que se ingresa en un formulario en express vas a utizar req.body
const registrar =async(req,res)=>{


  const usuario = await Usuario.created(req.body)
    
  
  res.json(usuario)
}

const formularioOlvidePassword = (req,res)=>{
  //render una funcion que se encarga de mostrar una vista , donde se encuntra la vista va a tomar su ubicacion 
  res.render("auth/olvide-password",{
    pagina: "Recupera tu Acceso a Bienes Raices"
  })
}

export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar
}