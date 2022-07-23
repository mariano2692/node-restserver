import { Router } from "express";
import { check } from "express-validator";
import { actualizarArchivo, actualizarArchivoCloudinary, cargarArchivo, mostrarArchivo } from "../controllers/upload.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import { validarArchivo } from "../middlewares/validar-archivo.js";
import { validarCampos } from "../middlewares/validar-campos.js";


export const uploadRoute = Router();

uploadRoute.put('/:coleccion/:id',[
    validarArchivo,
    check('id','el id debe ser valido de mongodb').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarArchivoCloudinary)

uploadRoute.post('/',[
    validarArchivo
],cargarArchivo)

uploadRoute.get('/:coleccion/:id',[
    check('id','el id debe ser valido de mongodb').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarArchivo)