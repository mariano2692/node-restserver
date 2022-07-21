import jwt from 'jsonwebtoken'
import { Usuarios } from '../models/usuario.js';


export const validarJWT = async(req,res,next)=>{

   const token = req.header('x-token');

   if(!token) return res.status(401).json({
    msg:'no hay token en la peticion'
   })

   try {

    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //leer usuario que corresponse al uid
    const usuario = await Usuarios.findById(uid)

    if(!usuario) return res.status(401).json({
        msg:'token no existe en DB'
    })

    //verificar que el uid tiene estado en true
    if(!usuario.estado) return res.status(401).json({
        msg:'token no valido - usuario estado false'
    })

    req.usuario = usuario

    next();
   } catch (error) {
    console.log(error);
    res.status(401).json({
        msg:'token no valido'
    })
   }

   

   

}