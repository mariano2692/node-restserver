import { response } from "express"

export const usuariosGet =(req ,res=response)=>{

    const {nombre} = req.query;
    res.status(200).json({
        msg:'get api - controlador',
        nombre
    })
}

export const usuariosPut =function(req,res){
    const id = req.params.id

    res.status(201).json({
        msg:'put api -controlador',
        id
    })
}


export const usuariosPost = function(req,res){

    const {nombre, edad}= req.body

    res.status(201).json({
        msg:'post api',
        nombre,edad
    })
}

export const usuariosDelete = function(req,res){
    res.status(200).json({
        msg:'delete api'
    })
}
