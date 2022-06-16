import express from "express"
import cors from "cors";
import authRouter from "../routes/user.js";

export class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT

        //middlewares
        this.middlwares();
        //rutas
        this.routes();
      
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
       this.app.use('/api/usuarios', authRouter)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('servidor corriendo es',this.port)
        })
    }
}