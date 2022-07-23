import express from "express"
import cors from "cors";
import  { router } from "../routes/user.js";
import { dbConnection } from "../database/config.js";
import { routerAuth } from "../routes/auth.js";
import { routerCat } from "../routes/categorias.js";
import { routerProd } from "../routes/productos.js";
import { searchRouter } from "../routes/buscar.js";
import { uploadRoute } from "../routes/upload.js";
import fileUpload from "express-fileupload";


export class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        //conectar base de datos
        this.conectarDB();
        //middlewares
        this.middlwares();
        //rutas
        this.routes();
      
    }

    async conectarDB(){
        await dbConnection();
    }

    middlwares(){


        //CORS
        this.app.use(cors())
        //parseo y lectura del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))

        //FileUpload - Carga de archivos

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    routes(){
       this.app.use('/api/usuarios',router)
       this.app.use('/api/auth',routerAuth)
       this.app.use('/api/categorias',routerCat)
       this.app.use('/api/productos',routerProd)
       this.app.use('/api/buscar',searchRouter)
       this.app.use('/api/upload',uploadRoute)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo es',this.port)
        })
    }
}