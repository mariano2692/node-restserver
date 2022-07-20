import {Router}  from "express";
import { check } from "express-validator";
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut}  from "../controllers/usuarios.js";
import { emailExiste, existeUsuarioId, rolValido } from "../helpers/db-validators.js";

 import { validarCampos,validarJWT,esAdminRole,tieneRoles } from "../middlewares/index.js";


export const router = Router();


router.get('/',usuariosGet)

router.put('/:id',[
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(rolValido),
    validarCampos
],usuariosPut)

router.post('/',[
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','el password debe contener mas de 6 caracteres').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol','no es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(rolValido),
    validarCampos
],usuariosPost)

router.delete('/:id',[
    validarJWT,
    tieneRoles('ADMIN_ROLE','VENTAS_ROLE'),
    // esAdminRole,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],usuariosDelete)
