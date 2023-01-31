const fs = require('fs');

/* Permite crear el archivo el cual va a contener las variables de entorno
   para poder ser enviadas al servidor remoto GitHub y poderlas utilizar
   y solucionar el error presentado en Netlify */
fs.writeFileSync('./.env', `API=${process.env.API}\n`); //Con esto ya estamos escribiendo un archivo .env
                                                        //dentro de lo que biene siendo el servidor, porque
                                                        //este script se va a correr a nivel del servidor