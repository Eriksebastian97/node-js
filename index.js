import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import propiedadesRoutes from "./routes/propiedadesRoutes.js";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import db from "./config/db.js";

//crear la App , creamos eo servidor de express
const app = express();

//habilitar lectura de datos de formulario

//app.use es un middew que se manda a todas diferentes peticiones , habilitamos leer la informacion del formulario
app.use(express.urlencoded({ extended: true }));

//Habilitar cookie Parser

app.use(cookieParser());

//Habilitar CSRF
//se refiere a un método de seguro que se usa en los formulario, para que solo con ese token que se genera pueda aceptar los datos de ese formulario del sitio y no otros sitios externos.
app.use(csrf({ cookie: true }));

//conexion a la base de datos

try {
  await db.authenticate();
  //sync() crea la tabla si no esta creada
  db.sync();
  console.log("Conexion correcta a la Base de datos");
} catch (error) {
  console.log(error);
}

//habilitar Pug , set se usa para agregar configuracion
app.set("view engine", "pug");
app.set("views", "./views");

//carpeta publica , en que parte va encontrar los archivos estaticos en diseño e imagenes etc

app.use(express.static("public"));

//Rounting , use busca todas las rutas que inicien con una diagonal
//todas las rutas que inicien con /auth , las va encontrar en el archivo usuarioRoutes
app.use("/auth", usuarioRoutes);
app.use("/", propiedadesRoutes);

//definir un puerto y arrancar el proyecto

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
