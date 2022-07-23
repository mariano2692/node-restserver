import { Router } from "express";
import { busqueda} from "../controllers/buscar.js";


export const searchRouter = Router();


searchRouter.get('/:coleccion/:termino',busqueda)