import { response } from "express"
import mongoose from "mongoose"
import { Categoria } from "../models/categoria.js"
import { Producto } from "../models/producto.js"
import { Usuarios } from "../models/usuario.js"



const coleccionPermitida = [
    'usuarios',
    'productos',
    'categorias',
    'roles'
]

const busquedaUsuario = async (termino='',res=response)=>{
    const esMongoID = mongoose.Types.ObjectId.isValid(termino)
    if(esMongoID){
        // return res.status(400).json({
        //     msg:'no es un id valido'
        // })
        const usuario = await Usuarios.findById(termino)
        return res.status(200).json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino,'i')
    const usuario = await Usuarios.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    })
    res.json({
        results:usuario
    })
}

const busquedaProducto = async (termino='',res=response)=>{
    const esMongoID = mongoose.Types.ObjectId.isValid(termino)
    if(esMongoID){
        // return res.status(400).json({
        //     msg:'no es un id valido'
        // })
        const producto = await Producto.findById(termino)
        return res.status(200).json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino,'i')
    const producto = await Producto.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    })
    res.json({
        results:producto
    })
}

const busquedaCategoria = async (termino='',res=response)=>{
    const esMongoID = mongoose.Types.ObjectId.isValid(termino)
    if(esMongoID){
        // return res.status(400).json({
        //     msg:'no es un id valido'
        // })
        const categoria = await Categoria.findById(termino)
        return res.status(200).json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino,'i')
    const categoria = await Categoria.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    })
    res.json({
        results:categoria
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const busqueda = async (req,res) => {

    const {coleccion, termino } = req.params
    if(!coleccionPermitida.includes(coleccion)) return res.status(400).json({
        msg:`las colecciones permitidas son: ${coleccionPermitida}`
    })

    switch (coleccion) {
        case 'usuarios':
            busquedaUsuario(termino,res)   
            break;

        case 'productos':
            busquedaProducto(termino,res)
            break;

        case 'categorias':
            busquedaCategoria(termino,res)
            
            break;
    
        default:
            break;
    }

 
}