import express from "express"
import { body } from "express-validator"
import { admin,crear,guardar ,agregarImagen} from "../controllers/propiedadController.js"
import protegerRuta from "../middleware/protegerRuta.js"

//agregamos express.Router paara utilizar rutas
const router = express.Router()

////visitamos /mis-propiedades y se manda a llamar la funcion admin
//todas funciones vienen del controlador
router.get("/mis-propiedades",protegerRuta,admin)
router.get("/propiedades/crear",protegerRuta,crear)

//la validacion en este caso la vamos a ser el router y no en el controlador como el caso de usuarioController
//la sintaxis es diferente y un poco mejor cuando validamos en el router
//validamos en el router y el resultado lo mostramos en el controlador para mostrarlos en la vista
router.post("/propiedades/crear",protegerRuta,
body("titulo").notEmpty().withMessage("El titulo del anuncio es obligatorio"),
body("descripcion").notEmpty().withMessage("La Descripcion no puede ir vacia").isLength({max:200}).withMessage("La Descripcion es muy larga"),
body("categoria").isNumeric().withMessage("Selecciona una categoria"),
body("precio").isNumeric().withMessage("Selecciona un rango de precios"),
body("habitaciones").isNumeric().withMessage("selecciona la cantidad de habitaciones"),
body("estacionamiento").isNumeric().withMessage("Selecciona la cantidad de estacionamiento"),
body("wc").isNumeric().withMessage("Selecciona la cantida de baños"),
body("wc").notEmpty().withMessage("Ubica la Propiedad en el Mapa"),
guardar)

router.get("/propiedades/agregar-imagen/:id",protegerRuta,agregarImagen)

export default router