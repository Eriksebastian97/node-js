import { text } from "express";
import nodemailer from "nodemailer"

const emailRegistro = async(datos)=>{

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT ,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const {email,nombre,token} = datos

      //enviar el email , tranpost va a auntetincarse el mailtrap va acceder a los servicios de mailtrap , nos da acceso a una funcion que es la siguiente 
     
      //primero inicia session y despues tiene acceso a la funcion de enviar un email utilizando esos servicios
      await transport.sendMail({
        from:"BienesRaices.com",
        to:email,
        subject: "Confirma tu cuenta en BienesRaices.com",
        text:"Confirma tu Cuenta en BienesRaices.com",
        html: `
        <p>Hola ${nombre} , comprueba tu cuenta en bienesRaices.com</p>

        <p>Tu cuenta ya esta lista , solo debes de confirmarla en el siguiente enlace:</p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/confirmar/${token}">Confirmar tu cuenta</a>

        <p>si tu no creaste esta cuenta , puedes ignorar el mensaje</p>
        `
      })

}

// se le pase un objeto con todos los datos desde el controlador
//esta funcion toma todos los datos 
//despues los extreamos
//lo utilizamos en el cuerpo de nuestro template
const emailOlvidePassword = async(datos)=>{

  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port:process.env.EMAIL_PORT ,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    const {email,nombre,token} = datos

    //enviar el email , tranpost va a auntetincarse el mailtrap va acceder a los servicios de mailtrap , nos da acceso a una funcion que es la siguiente 
   
    //primero inicia session y despues tiene acceso a la funcion de enviar un email utilizando esos servicios
    await transport.sendMail({
      from:"BienesRaices.com",
      to:email,
      subject: "Restablece tu Password en BienesRaices.com",
      text:"Restablece tu Password en BienesRaices.com",
      html: `
      <p>Hola ${nombre} , has solicitado restablece tu Password en bienesRaices.com</p>

      <p>Sigue el siguiente enlace para generar un password nuevo :</p>
      <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 4000}/auth/olvide-password/${token}"> Reestablecer Password</a>

      <p>Si tu no solicitaste el cambio de password , puedes ignorar el mensaje</p>
      `
    })

}

export {
     emailRegistro,
     emailOlvidePassword


}