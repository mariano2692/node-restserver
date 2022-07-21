import mongoose from "mongoose";
import pkg from 'mongoose';
const { Schema } = pkg;

const categoriaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: [true,'el nombre es obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuarios',
        required:true
    }
});

categoriaSchema.methods.toJSON = function(){
    const {__v, estado, ...data} =  this.toObject()
    return data
}


export const Categoria = mongoose.model('Categoria', categoriaSchema)