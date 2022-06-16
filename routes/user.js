import {Router}  from "express";
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut}  from "../controllers/usuarios.js";

const router = Router();

// router.use((req,res)=>{

// })

router.get('/',usuariosGet)

router.put('/:id',usuariosPut)

router.post('/',usuariosPost)

router.delete('/',usuariosDelete)

export default router