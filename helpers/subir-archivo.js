import path from "path";
import { v4 as uuidv4 } from 'uuid';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const subirArchivo =(files,extensionesValidas=['png','jpg','jpeg','gif'],carpeta='')=>{

    return new Promise((resolve,reject)=>{

        const {archivo} = files;

        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]
      
        //validar la extension
        if(!extensionesValidas.includes(extension)) return reject(`la extension ${extension} no es valida`);
      
      
        const nombreTemporal = uuidv4() + '.' + extension
        const uploadPath = path.join( __dirname , '../uploads/',carpeta, nombreTemporal)
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            return reject(err)
          }

          
          resolve(nombreTemporal)
        });
    

    })



}