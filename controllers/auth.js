import {response} from "express"
import bcryptsjs from "bcryptjs"
import { Usuarios } from "../models/usuario.js";
import { generarJWT } from "../helpers/generar-jws.js";
import { googleVerify } from "../helpers/google-verify.js";



export const login = async( req, res = response) =>{

    const {correo, password} = req.body;

    try {
        //veriricar email

        const usuario = await Usuarios.findOne({correo})
        if(!usuario) return res.status(400).json({
            msg:'usuario/password no son correctos - correo'
        })

        //usuario activo

        if(usuario.estado === false) return res.status(400).json({
            msg:'usuario/password no son correctos - estado'
        })

        //verificar contraseña
        const validPassword = bcryptsjs.compareSync(password, usuario.password)
        if(!validPassword) return res.status(400).json({
            msg:'usuario/password no son correctos - password'
        })

        //generar JWT

        const token = await generarJWT(usuario.id)

        res.json({
           usuario,
           token
        })

        
    } catch (error) {

        return res.status(500).json({
            msg:'hable con el administrador'
        })
        
    }
   
}

export const googleSingIn = async (req,res= response) => {

    const {id_token} = req.body;

    try {
      const {correo,nombre,img} = await googleVerify(id_token);
      
      let usuario = await Usuarios.findOne({correo})
      if(!usuario){
        const data = {
            nombre,
            correo,
            password:'xD',
            img,
            rol:'USER_ROLE',
            google:true

        }
        usuario = new Usuarios(data);
        await usuario.save();
      }


      if(!usuario.estado) return res.status(401).json({
        msg:'hable con el adminnnn'
      })


      //generar jsw
      const token = generarJWT(usuario.id)

      res.json({
        usuario,
        token
    }) 
    } catch (error) {
      console.log(error)
        
    }

    


}