import { roleModel } from "../models/role.js";
import { myModel } from "../models/usuario.js";



export const rolValido= async(rol = '') =>{
    const existeRole = await roleModel.findOne({rol});
    if(!existeRole) throw new Error(`el rol ${rol} no esta registrado en la BBDD`)

}

export const emailExiste = async(correo = '') => {
    const emailExiste = await myModel.findOne({correo});
    if(emailExiste) throw new Error(`el correo ${correo} ya existe`)
}

export const existeUsuarioId = async(id = '') => {
    const existeUsuario = await myModel.findById(id)
    if(!existeUsuario) throw new Error(`no existe el id ${id}`)
}