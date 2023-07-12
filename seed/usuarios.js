//usuario de prueba

import bcrypt from "bcrypt"

const usuarios = [
    {
        nombre:"erik",
        email:"sebas@sebas.com",
        confirmado:1,
        password:bcrypt.hashSync("password",10)
    }
]
export default usuarios