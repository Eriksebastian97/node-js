//igual que postcss y tailwind requiren un archivo de configuracion en muchos ejemplos utilizan la version de require , pero nuestro caso son modulos

//requiere una entra y una salida
//la entrada es es el archivo original
//la entra requiere un nombre y una ubicacion
//output es donde quieres que se almacene una ves compilado o procesado por webpack
//filane es el nombre del archivo que se va aguardar en nuestro disco duro , nuestro proyecto
//tambien necesitamos la ubicacion en donde se va a guardar
//tiene que ser una ruta absoluta
//independiente donde estes va detectar la ruta absoluta y va escribir en la carpeta de public

import path from "path"


export default{
  mode:"development",
  entry:{
  mapa: "./src/js/mapa.js",
  agregarImagen:"./src/js/agregarImagen.js"
  },
  output:{
   filename: "[name].js",
   path:path.resolve("public/js")
  }
}