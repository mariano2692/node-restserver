import  { response } from "express";

import fs from "fs";
//CLOUDINARY
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config(process.env.CLOUDINARY_URL)

import { subirArchivo } from "../helpers/subir-archivo.js";
import { Producto } from "../models/producto.js";
import { Usuarios } from "../models/usuario.js";

//PATH - DIRNAME
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const cargarArchivo = async(req,res = response) => {


  try {  
    const nombre = await subirArchivo(req.files,undefined,'imgs')
    res.json({
    nombre
  })
    
  } catch (error) {
    res.send(error)
    
  }

}


//ACTUALIZAR IMAGEN
export const actualizarArchivo = async (req,res=response) => {

  const {coleccion, id} = req.params

  let modelo;

  switch (coleccion) {
    case 'usuarios':

      modelo = await Usuarios.findById(id)
      if(!modelo) return res.status(401).json({
        msg:`no existe un usuario con el id ${id}`
      })
      
      break;
    
    case 'productos':
      modelo = await Producto.findById(id)
      if(!modelo) return res.status(401).json({
        msg:`no existe un producto con el id ${id}`
      })

      break;
  
    default:
      return res.status(500).json({msg:'ola k ase'})
  }
  

  //LIMPIAR IMAGENES PREVIAS
  if(modelo.img){
    const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img)
    if(fs.existsSync(pathImagen)) fs.unlinkSync(pathImagen)
  }


  const nombre = await subirArchivo(req.files,undefined,coleccion)
  modelo.img = await nombre

  await modelo.save();
  


  res.json(modelo)

}

//ACTUALIZAR IMAGEN CLOUDINARY
export const actualizarArchivoCloudinary = async (req,res=response) => {

  const {coleccion, id} = req.params

  let modelo;

  switch (coleccion) {
    case 'usuarios':

      modelo = await Usuarios.findById(id)
      if(!modelo) return res.status(401).json({
        msg:`no existe un usuario con el id ${id}`
      })
      
      break;
    
    case 'productos':
      modelo = await Producto.findById(id)
      if(!modelo) return res.status(401).json({
        msg:`no existe un producto con el id ${id}`
      })

      break;
  
    default:
      return res.status(500).json({msg:'ola k ase'})
  }
  

  //LIMPIAR IMAGENES PREVIAS
  if(modelo.img){
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[nombreArr.length -1]
    const [public_id] = nombre.split('.')
    cloudinary.uploader.destroy(public_id)
    
  }
  const {tempFilePath} = req.files.archivo
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

  modelo.img = secure_url
  await modelo.save();
 

  res.json(modelo)


  
}


//MOSTRAR IMAGEN
export const mostrarArchivo =async(req,res=response)=>{

  const {coleccion, id} = req.params

  let modelo;

  switch (coleccion) {
    case 'usuarios':

      modelo = await Usuarios.findById(id)
      if(!modelo) return res.status(401).json({
        msg:`no existe un usuario con el id ${id}`
      })
      
      break;
    
    case 'productos':
      modelo = await Producto.findById(id)
      if(!modelo) return res.status(401).json({
        msg:`no existe un producto con el id ${id}`
      })

      break;
  
    default:
      return res.status(500).json({msg:'ola k ase'})
  }
  

  //LIMPIAR IMAGENES PREVIAS
  if(modelo.img){
    const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img)
    if(fs.existsSync(pathImagen)) return res.sendFile(pathImagen)
  }

  res.sendFile(path.join(__dirname,'../assets/no-image.jpg'))

}