import { check, validationResult } from "express-validator"; //check revisa por un campo en especifico y validationResult va a mantener o guardar el resultado de la validacion , me regresa un arreglo con los errores que estableci con el check
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import { generarId,generarJWT } from "../helpers/token.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/emails.js";

//visitamos la funcion y vemos que hace

const formularioLogin = (req, res) => {
  //render una funcion que se encarga de mostrar una vista , donde se encuntra la vista va a tomar su ubicacion y renderiza lo que mostramos en pantalla
  //lo que renderiza esta funcion es lo que tengamos en views/login
  res.render("auth/login", {
    pagina: "Iniciar Sesion",
    csrfToken: req.csrfToken(),
  });
};

const auntenticar = async (req, res) => {
  //validacion

  await check("email")
    .isEmail()
    .withMessage("El email es Obligatorio")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("El Password es obligatorio")
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/login", {
      pagina: "Iniciar Sesion",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  //extremos el email y password del formulario mediante el req.body
  const { email, password } = req.body;
  //Comprobar si el Usuario existe

  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) {
    return res.render("auth/login", {
      pagina: "Iniciar Session",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El usuario No Existe" }],
    });
  }

  //comprobar si el usuario esta confirmado

  // no esta usuario confirmado mostramos una vista con el error
  if (!usuario.confirmado) {
    return res.render("auth/login", {
      pagina: "Iniciar Session",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "Tu cuenta no a sido confirmada" }],
    });
  }

  //Revisar el password
  if (!usuario.verificarPassword(password)) {
    return res.render("auth/login", {
      pagina: "Iniciar Session",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El Password es Incorrecto" }],
    });
  }

  //Auntenticar Usuario

  const token = generarJWT({id:usuario.id  ,  nombre: usuario.nombre})

  // console.log(token)

  //Almacenanamos el JWT  en un cookie , generamos el cookie
//configuramos el cookie
//la parte mas importante es pasarle htppOnly y ponerle true
//lo que va a ser es evitar los ataques cross hai
//esto hace que el cookie no sea accesible desde la API de JavaScript
//secure permite los cookies de conexion segura , en el caso que tengamos certificado SSL , tal ves esa opcion la tengamos en el deployment
  return res.cookie("_token",token,{
    httpOnly:true,
    
    // secure:true
  }).redirect("/mis-propiedades")

};

const formularioRegistro = (req, res) => {
  //es un token publico y ese token publico se genera con una llave privada que comprueba que el request venga desde esta URL
  //Entonces de esta forma evitar el cross and request
  // console.log(req.csrfToken());

  //render una funcion que se encarga de mostrar una vista , donde se encuntra la vista va a tomar su ubicacion
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken(),
  });
};

//req es lo que enviamos al servidor
//res es la respuesta del servidor
//siempre que se vayas a leer la informacion que se ingresa en un formulario en express vas a utizar req.body
const registrar = async (req, res) => {
  //validacion

  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no puede ir vacio")
    .run(req);
  await check("email").isEmail().withMessage("No es un Email").run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El Password debe ser de almenos 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("Los Passwords no son iguales")
    .run(req);

  let resultado = validationResult(req);

  //verificar que el resultado este vacio , crear codigo condional  para que el codigo no se siga ejecutando el de usuario cada ves que creemos la cuenta

  //isEmpety se encarga de decir resultado esta vacio ? si esta vacio va ejecutar el siguiente codigo que la creacion del Usuario y va crear el usuario correctamente

  //return res.json(resultado.array())
  // si el !resultado no esta vacio entonces ahi erroes
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //extraer los datos

  const { nombre, email, password } = req.body;

  //verificar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne({ where: { email } });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken(),
      //generar un arreglo al vuelo
      errores: [{ msg: "el usuario ya esta registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //cuando pasemos la validacion crea un nuevo usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  //Envia email de confirmacion

  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  //mostrar el mensaje de confirmacion
  res.render("templates/mensaje", {
    pagina: "Cuenta creada correctamente",
    mensaje: "Hemos Enviado un Email de Confirmacion , presiona en el enlace",
  });

  // //create crea una nueva instancia , crea un nuevo usuario con la informacion que le estamos pasando
  // const usuario = await Usuario.create(req.body)

  // //muestra en pantalla la informacion en formato json
  // res.json(usuario)
};

//Funcion que comprueba una cuenta
//leemos el token mediante el req.params
const confirmar = async (req, res) => {
  const { token } = req.params;
  // console.log(token)

  //verificar si el token es valido
  const usuario = await Usuario.findOne({ where: { token } });
  //si no existe el usuario
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirma la cuenta",
      mensaje: "Hubo un error al confirmar la cuenta , intenta de nuevo",
      error: true,
    });
  }

  //si Confirma la cuenta
  //Estos valores de usuario estan en la base de datos
  //podemos hacer modificaciones y accedemos a las diferentes tablas de un registro mediante el punto
  usuario.token = null;
  usuario.confirmado = true;
  //lo almacenamos en la base de datos , guardamos esos cambios
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta Confirmada",
    mensaje: "La cuenta se confirmo correctamente",
  });
};

const formularioOlvidePassword = (req, res) => {
  //render una funcion que se encarga de mostrar una vista , donde se encuntra la vista va a tomar su ubicacion
  res.render("auth/olvide-password", {
    pagina: "Recupera tu Acceso a Bienes Raices",
    csrfToken: req.csrfToken(),
  });
};

const resetPassword = async (req, res) => {
  await check("email").isEmail().withMessage("Eso no parace un email").run(req);

  let resultado = validationResult(req);

  //verificar que el resultado este vacio
  //si no esta vacio te muestra el mensaje de error en pantalla
  if (!resultado.isEmpty()) {
    //errores

    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso a Bines Raices",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  //buscar el Usuario , si existe el usuario

  const { email } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso a Bines Raices",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El mail no Pertenece a ningun Usuario" }],
    });
  }

  //Generar un Token y enviar el email
  usuario.token = generarId();
  await usuario.save();

  //enviar un Email
  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token,
  });

  //Renderizar un mensaje
  //mostrar el mensaje de confirmacion
  res.render("templates/mensaje", {
    pagina: "Reestablece tu Password",
    mensaje: "Hemos Enviado un Email con las instrucciones ",
  });
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  //nos va a traer el usuario que quiera modificar su password
  const usuario = await Usuario.findOne({ where: { token } });

  //si no existe usuario
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Restable tu Password",
      mensaje: "Hubo un error al validar tu informacion , intenta de nuevo",
      error: true,
    });
  }

  //mostrar formulario para modificar el password

  res.render("auth/reset-password", {
    pagina: "Reestablece tu Password",
    csrfToken: req.csrfToken(),
  });
};

const nuevoPassword = async (req, res) => {
  //validar el Password

  await check("password")
    .isLength({ min: 6 })
    .withMessage("El Password debe ser de almenos 6 caracteres")
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/reset-password", {
      pagina: "Restable tu Password",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }

  //una ves ingresado el password , leemos el token de req.params
  //y leemos el password ingresado
  const { token } = req.params;
  const { password } = req.body;
  //Identifiar quien hace el cambio
  const usuario = await Usuario.findOne({ where: { token } });

  // console.log(usuario);

  //hashear el nuevo password

  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);

  //eliminar el token

  usuario.token = null;
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    pagina: "Password Reestablecido",
    mensaje: "El Password se Guardo correctamente",
  });
};

export {
  formularioLogin,
  auntenticar,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
  confirmar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
};
