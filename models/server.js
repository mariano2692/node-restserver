import express from "express"
import cors from "cors";
import  { router } from "../routes/user.js";
import { dbConnection } from "../database/config.js";
import { routerAuth } from "../routes/auth.js";



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
    }

    routes(){
       this.app.use('/api/usuarios',router)
       this.app.use('/api/auth',routerAuth)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo es',this.port)
        })
    }
}