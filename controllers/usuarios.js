import { response } from "express"
import bcryptsjs from "bcryptjs"
import { myModel } from "../models/usuario.js";






export const usuariosGet = async(req ,res=response)=>{

    const {limite = 5, desde = 0} = req.query
  

    const resp = await Promise.all([
        myModel.countDocuments({estado:true}),
        myModel.find({estado:true})
            .limit(Number(limite))
            .skip(Number(desde))
    ])
    res.status(200).json({
       resp
    })
}

export const usuariosPut = async(req,res)=>{

    const {id} = req.params.id
    const {_id,password, google,correo, ...resto} = req.body

    //validar contra base de datos
    if(password){
        //encriptar la contraseña
        const salt = bcryptsjs.genSaltSync();
        resto.password = bcryptsjs.hashSync(password, salt)
    }

    const usuario = await myModel.findByIdAndUpdate(id,resto)

    res.status(201).json({
        msg:'put api -controlador',
        usuario
    })
}


export const usuariosPost = async(req,res) =>{


    const {nombre,correo,password,rol} = req.body;
    const usuario = new myModel({nombre,correo,password,rol});

    //verificar si el correo existe

   

    //encriptar la contraseña
    const salt = bcryptsjs.genSaltSync();
    usuario.password = bcryptsjs.hashSync(password, salt)

    //guardar
    usuario.save();

    res.status(201).json({
        msg:'post api',
        usuario
    })
}

export const usuariosDelete = async(req,res)=>{

    const {id} = req.params;

    //fisicamente lo borramos
    // const usuario = await myModel.findByIdAndDelete(id)

    const usuario = await myModel.findByIdAndUpdate(id,{estado:false});
   
    res.status(200).json(usuario)
}
