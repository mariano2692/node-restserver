import {Router}  from "express";
import { check } from "express-validator";
import { googleSingIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";


export const routerAuth = Router();


routerAuth.post('/login',[
    check('correo','el correo el obligatorio').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    validarCampos
] ,login)

routerAuth.post('/google',[
    check('id_token','token de google es necesario').notEmpty(),
    validarCampos
] ,googleSingIn)

