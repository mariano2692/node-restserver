import {Router}  from "express";
import { check } from "express-validator";
import { actualizarCategoria, borrarCategoria, crearCategoria, obtenerCategoria, obtenerCategoriaId } from "../controllers/categorias.js";
import { existeCategoria } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

export const routerCat = Router();


//obtener todas las categorias
routerCat.get('/',obtenerCategoria);

//obtener una categoria por id

routerCat.get('/:id',[
    check('id','el id debe ser valido de mongodb').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoriaId);

//crear categotia -privado- cualquier persona con token valido

routerCat.post('/',[
    validarJWT,
    check('nombre','el nombre es obligatorio').notEmpty(),
    validarCampos
],crearCategoria);

//actualizar -privado-cualquier persona con token valido
routerCat.put('/:id',[
    check('nombre','el nombre es necesario').notEmpty(),
    check('id','el id debe ser valido de mongodb').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

routerCat.delete('/:id',[
    validarJWT,
    check('id','el id debe ser valido de mongodb').isMongoId(),
    check('id').custom(existeCategoria),
    esAdminRole,
    validarCampos
],borrarCategoria)