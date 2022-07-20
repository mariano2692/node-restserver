import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    rol:{
        type:String,
        required: [true,'el rol es obligatorio']
    }
});


export const roleModel = mongoose.model('role', roleSchema)