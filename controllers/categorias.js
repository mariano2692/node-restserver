import { response } from "express";
import { Categoria } from "../models/categoria.js";


//CATEGORIAS GET
export const obtenerCategoria = async (req,res)=>{

    try {

        
    const {limite = 5, desde = 0} = req.query
  

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
        .populate('usuario','nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ])
    res.status(200).json({
       total,
       categorias
    })
        // const categorias = await Categoria.find()
        //                                       .populate('usuario','nombre')
                                              
        // res.status(200).json({
        // ok:true,
        // categorias
        // })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            error
        })
        
    }


}

export const obtenerCategoriaId = async(req,res)=>{
    const id = req.params.id

    try {
        const categoria = await Categoria.findById(id)
                                         .populate('usuario','nombre')

        res.status(200).json({
            ok:true,
            categoria
        })
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
        
    }

 
}

// CATEGORIAS POST
export const crearCategoria = async (req,res=response)=>{

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB) return res.status(400).json({
        msg:`La categoria ${categoriaDB.nombre} ya existe`
    })

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //guardar base de datos

    await categoria.save();

    res.status(201).json(categoria)

}

//CATEGORIA PUT

export const actualizarCategoria = async (req,res)=>{
    const id = req.params.id
    const {estado,usuario,...data} = req.body
    data.nombre = data.nombre.toUpperCase()
    try {

     
      
        // const existeNombre = await Categoria.findOne(data.nombre)
        // if(existeNombre) return res.status(400).json({
        //     ok:false,
        //     msg:'ya existe una categoria con ese nombre'
        // })

        const categoriaActualizada = await Categoria.findByIdAndUpdate(id,data,{new:true})

        res.status(201).json(categoriaActualizada)
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            error
        })
    }
}

export const borrarCategoria = async (req,res)=>{

    const id = req.params.id

    try {
        const categoriaDB = await Categoria.findById(id)

        if(!categoriaDB) return res.status(400).json({
            ok:false,
            msg:'no existe una categoria con ese id'
        })

        await Categoria.findByIdAndUpdate(id,{estado:false})
        res.status(200).json({
            ok:true,
            msg:'categoria eliminada'
        })
    } catch (error) {
        
    }
}