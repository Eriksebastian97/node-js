//va a proteger la ruta si el usuario no tiene un token o el token no es valido o ya expiro

import Jwt from "jsonwebtoken"; // te firma jwt y tambien te sirve para comprobar unj wt
//vamos a leer el token que tenemos en el cookie
import { Usuario } from "../models/index.js";

const protegerRuta = async (req, res, next) => {
  // console.log("desde el Middleware")

  //verificar si hayn token
  const { _token } = req.cookies;
  if (!_token) {
    return res.redirect("/auth/login");
  }
  //  console.log(req.cookies._token)

  //comprobar el token
  try {
    //verifica el token , verify
    const decoded = Jwt.verify(_token, process.env.JWT_SECRET);
    // console.log(decoded)
    //identifico el jwt es correcto y hace la consulta  a la base de datos con toda la inf del usuario
    const usuario = await Usuario.scope("eliminarPassword").findByPk(
      decoded.id
    );
    // console.log(usuario)

    //almcenar el usuarioal req , al colarlo en el req va estar disponible en cualquier ruta

    if (usuario) {
      req.usuario = usuario;
    } else {
      return res.redirect("/auth/login");
    }

    return next();
  } catch {
    //cualquier comprobacion de token que falle
    //limpiamos el token
    //y lo redirrecionamos al login
    return res.clearCookie("_token").redirect("/auth/login");
  }
};

export default protegerRuta;
