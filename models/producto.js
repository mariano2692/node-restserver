import mongoose from "mongoose";
import pkg from "mongoose";
const {Schema} = pkg;

const productoSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true
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
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    descripcion:{
        type:String
    },
    disponibilidad:{
        type:Boolean,
        default:true
    },
    img:{
        type:String
    }
})

productoSchema.methods.toJSON = function(){
    const {__v, estado, ...data} =  this.toObject()
    return data
}

export const Producto = mongoose.model('Producto',productoSchema)