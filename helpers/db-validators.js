import { Categoria } from "../models/categoria.js";
import { Producto } from "../models/producto.js";
import { roleModel } from "../models/role.js";
import { Usuarios } from "../models/usuario.js";



export const rolValido= async(rol = '') =>{
    const existeRole = await roleModel.findOne({rol});
    if(!existeRole) throw new Error(`el rol ${rol} no esta registrado en la BBDD`)

}

export const emailExiste = async(correo = '') => {
    const emailExiste = await Usuarios.findOne({correo});
    if(emailExiste) throw new Error(`el correo ${correo} ya existe`)
}

export const existeUsuarioId = async(id = '') => {
    const existeUsuario = await Usuarios.findById(id)
    if(!existeUsuario) throw new Error(`no existe el id ${id}`)
}

export const existeCategoria = async(id='')=>{
    const existeCategoria = await Categoria.findById(id)
    if(!existeCategoria) throw new Error('no existe ese id')
}

export const existeProducto = async (id='') => {
    const existeProducto = await Producto.findById(id)
    if(!existeProducto) throw new Error('el id no existe en la base de datos')
}