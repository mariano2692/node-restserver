import { response } from "express";
import { Categoria } from "../models/categoria.js";
import { Producto } from "../models/producto.js";

//PRODUCTOS GET

export const obtenerProductos = async (req,res) => {
    const {limite = 5, desde = 0} = req.query
    try {
        
    const [total,productos] = await Promise.all([
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
        .populate('usuario','nombre')
        .populate('categoria','nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ])
    res.status(200).json({
       total,
       productos
    })
        
    } catch (error) {
        
    }

}

export const obtenerProductoId = async (req,res) =>{
    const id = req.params.id
    try {
        const producto = await Producto.findById(id)
       
        res.status(200).json({
            ok:true,
            producto
        })
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            error
        })
    }
}


//CREAR PRODUCTOS

export const crearProductos = async(req,res)=>{
    const {estado,usuario,nombre,...body} = req.body
    const productoDB = await Producto.findOne({nombre})

    if(productoDB)return res.status(400).json({
        ok:false,
        msg:'ya existe un producto con ese nombre'
    })

    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id
        
    }
    const producto = new Producto(data);

    //guardar base de datos

    await producto.save();

    res.status(200).json(producto)

}

//ACTUALIZAR PRODUCTO

export const actualizarProducto =async(req,res)=>{
    const id = req.params.id
    const {estado,usuario,...body}= req.body

    try {

        const productoActualizado = await Producto.findByIdAndUpdate(id,body,{new:true})
        res.status(201).json({
            ok:true,
            productoActualizado
        })
        
    } catch (error) {
        
    }


}

//ELIMINAR PRODUCTO

export const eliminarProducto = async(req,res)=>{
    const id = req.params.id
    try {
        await Producto.findByIdAndUpdate(id,{estado:false})
        res.status(200).json({
            ok:true,
            msg:'producto eliminado'
        })
    } catch (error) {
        
    }

}