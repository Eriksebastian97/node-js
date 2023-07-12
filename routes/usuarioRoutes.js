import express from "express";
import { formularioLogin } from "../controllers/usuarioControllers.js";
import { formularioRegistro } from "../controllers/usuarioControllers.js";
import { formularioOlvidePassword } from "../controllers/usuarioControllers.js";
import { registrar } from "../controllers/usuarioControllers.js";
import { confirmar } from "../controllers/usuarioControllers.js";
import { resetPassword } from "../controllers/usuarioControllers.js";
import { comprobarToken } from "../controllers/usuarioControllers.js";
import { nuevoPassword } from "../controllers/usuarioControllers.js";
import { auntenticar } from "../controllers/usuarioControllers.js";

//habilitamos las rutas mediates express.Router()
const router = express.Router()


//visitamos /login y se manda a llamar la funcion formularioLogin
//todas funciones vienen del controlador
router.get("/login",formularioLogin)
router.post("/login", auntenticar)

router.get("/registro",formularioRegistro)
//se inyeca de forma dinamica en el formulario , cuando demos click en el formulario va a mandar a llamar la funcion de registrar
router.post("/registro",registrar)

//cuando entremos a la url del email , se va a mandar a llamar el controlador de confirmar
router.get("/confirmar/:token",confirmar)

router.get("/olvide-password",formularioOlvidePassword)

router.post("/olvide-password",resetPassword)

//alamcena el nuevo password 
//vamos a tener 2 rutas
//una para entrar y mostrar el formulario
// y la otra para mandar un post con el nuevo password

router.get("/olvide-password/:token",comprobarToken)
router.post("/olvide-password/:token",nuevoPassword)
  

 export default router 