// import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({ 

    nombre:{
        type:String,
        required:[true,'el nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'el correo es obligatorio'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'el password es obligatorio']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required: true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },

})

usuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} =  this.toObject()
    user.uid = _id;
    return user
}

export const Usuarios = mongoose.model('Usuarios', usuarioSchema);
