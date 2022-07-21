import { Router } from "express";
import { check } from "express-validator";
import { actualizarProducto, crearProductos, eliminarProducto, obtenerProductoId, obtenerProductos } from "../controllers/productos.js";
import { existeProducto } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validar-roles.js";



export const routerProd = Router();

//obtener productos
routerProd.get('/',obtenerProductos);

routerProd.get('/:id',[
    check('id','el id no es valido de mongodb').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProductoId);

routerProd.post('/',[
validarJWT,
check('nombre','el nombre es obligatorio').notEmpty(),
validarCampos
],crearProductos);

routerProd.put('/:id',[
    validarJWT,
    check('nombre','el nombre es necesario'),
    check('id','el id debe ser valido de mongodb').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],actualizarProducto);

routerProd.delete('/:id',[
    validarJWT,
    check('id','el id debe ser valido de mongodb').isMongoId(),
    check('id').custom(existeProducto),
    esAdminRole,
    validarCampos
],eliminarProducto);