import express from "express";
import { formularioLogin } from "../controllers/usuarioControllers.js";
import { formularioRegistro } from "../controllers/usuarioControllers.js";
import { formularioOlvidePassword } from "../controllers/usuarioControllers.js";
import { registrar } from "../controllers/usuarioControllers.js";

const router = express.Router()


//visitamos /login y se manda a llamar la funcion formularioLogin
router.get("/login",formularioLogin)
router.get("/registro",formularioRegistro)
router.post("/registro",registrar)

router.get("/olvide-password",formularioOlvidePassword)
  
  

 export default router 