
/* Se crea la variable path a la cual se le va a signar un require el cual va a
   ayudar a traer un elemnto, para lo cual path ya esta disponible en Node asi que
   no hay que hacer una instalacion de dependencias  ni nada.*/
   const path = require('path');

   /* Se añade el recurso-plugin a nuestro proyecto*/
   /* Se hace el llamado al recurso que instalamos  
      Se añade el plugin a nuestro documento-proyecto*/
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   
   /* Se hace el llamado al recurso que instalamos  
      Se añade el plugin a nuestro documento-proyecto*/
   const MiniCssExtractPlugin = require('mini-css-extract-plugin');
   
   /* Se añade el soporte para el plugin copy-webpack */
   const CopyPlugin = require('copy-webpack-plugin');
     
   /* Se añade el soporte para el plugin dotenv-webpack y poder trbajar
      con las variables de entorno */
   const Dotenv = require('dotenv-webpack');
   
   /* Creacion de un modulo que se va a exportar con un objeto, con la configuracion
      deseada */
   module.exports = {//Creacion de un objeto, en donde le vamos a añadir todas 
                     //las configuraciones, las cuales son:
       
       entry: './src/index.js', //Nos va permitir decir cual es el punto de entrada de nuestra aplicacion 
                               //Se establece cual es el elemento inicial de nuestra aplicacion 
       //Output permite indicar hacia donde vamos a enviar lo que va a preparar 
       //WebPack, en este caso podemos establecer un nombre de carpeta, asi como
       //un nombre de archivo entre otras caracteristicas que podemos ir añadiendo
       output: {//En este objeto vamos a añadir los elementos internos para trabajar
   
            //El metodo resolve nos va a permitir saver en donde se encuentra nuestro 
            //proyecto para poderlo utilizar 
            //Despues le podemos asignar el nombre que nosotros deseemos pero lo recomndado
            //es asignar el nombre de 'dist' porque adentro es donde va la compilacion del proyecto
            path: path.resolve(__dirname, 'dist'),
   
            //Asignacion de un nombre al resultante que en este caso puede ser 
            //filename: 'main.js' por el momento despues se puede asignarle otro nombre
            filename: '[name].[contenthash].js',
   
            //Permite copiar las fuentes en la carpeta de distribucion /dist/assets/images
            assetModuleFilename: 'assets/images/[hash][ext][query]'
       },
   
       /* Permite tener activa la configuracion para modo desarrollo  */
       mode: 'development',

       /* Permite activar el moodo Watch para que se ejecute el proyecto automaticamente 
          cada vez que se haga un cambio en sus elementos*/
       watch: true,

       //Ahora se le debe indicar con que extenciones se va a trabajar en 
       //este proyecto
       resolve: {//objeto para indicar las extensiones que se van a utilizar
   
           //En un arreglo se va a pasar las extensiones que vamos a utilizar 
           extensions: ['.js'],
   
           /* configuración necesaria para poder crear alias a nuestros paths
              Se indica que es un alias con el arroba @ */
           alias: {//Creacion de un objeto en donde se establece cada una de las configuraciones 
                   //que se van a tener
             //Se crean los elementos de cada una de las carpetas que se estan utilizando en nuestro proyecto
             '@utils': path.resolve(__dirname, 'src/utils/'),
             '@templates': path.resolve(__dirname, 'src/templates/'),
             '@styles': path.resolve(__dirname, 'src/styles/'),
             '@images': path.resolve(__dirname, 'src/assets/images/'),
           }
   
       },
   
      /* MODULO PARA AÑADIR LA CONFIGURACION DE Babel */
      module: {//Se establece un objeto para el modulo{}
         //Se establecen las reglas para como vamos a trabajar con diferentes
         //tipos de archivos o elementos dentro del proyecto, se establesen
         //dentro de un arreglo [] y dentro del arreglo establsemos un objeto {}
         rules: [
           {
             test: /\.m?js$/, //test permite saber que tipos de extenciones se van a utilizar
                              //Se establece \.m que indica que cualquier archivo que empiece 
                              //con la letra m en este caaso de module que es la extencion .mjs 
                              //o (?) js 
             exclude: /node_modules/,//Permite indicar que no se debe utilizar nada que
                                     //dentro de la carpeta de node_modules
             use: {//Se pasa internamente lo que es el loader que se va a utilizar
                   //en el cual se le debe indicar que va a utilizar el lodader de babel
                   //babel-loader
               loader: 'babel-loader'
             }
           },
         /* Creacion de una regla para poder reconocer lo que viene siendo nuestro css */
          {
           test: /\.css|.styl$/i, //Logica para poder reconocer los archivos css
           use: [MiniCssExtractPlugin.loader, //Permite indicar cual es el elemento que vamos a tener 
           'css-loader',//Se especifican los loaders que se van a utilizar, en sete caso se especifica eñ 
                       //loader que se intalo anterior mente
           'stylus-loader'
           ],
          },
   
          /* Creacion de una regla para poder añadir la configuracion necesaria para poder 
          trabajar con imágenes y hacer un import de los recursos /resource */
          {
                   test: /\.png/,
                   type: "asset/resource",
                   generator: {
                   filename:'assets/images/[name].[contenthash][ext]'
               }
               },
   
         /* Creacion de una regla para poder añadir la configuracion necesaria para poder 
          trabajar con los tipos de fuentes en nuestro pruyecto*/
   
         /* -------- CODIGO ANTIGUO ----------
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            },
          }
         */
   
     /*----- CODIGO NUEVO ---------- */
     {
       test: /\.(woff|woff2|eot|ttf|otf)$/i,
           type: 'asset/resource',
           generator: {
               filename:'assets/fonts/[name].[contenthash][ext]'
           }
     },
   ],
   },
     /* SE AÑADE LA SECCION DE PLUGINS */
     plugins: [//Se crea un arreglo e interna mente se deben añadir los plugins que estamos utilizando
       new HtmlWebpackPlugin({//Se crea un plugin que es el que agregamos al inicio del archivo
                              //e intenamente se debe crear un objeto {} en donde se van a tener las configuraciones
                              //que se va a añadir a lo que viene siendo el plugin que estamos urilizando los cuales son:
         inject: true,//1. inject el cual permite hacer la insercion de los elementos 
         template: './public/index.html',//2. template indica la ruta en donde se encuentra el template
                                         //del proyecto que en este caso es en el archivo index.html
         filename: './index.html'//3. Permite indicar en donde se va a realizar-almacenar el resultado de la preparacion
                                 // de HTML que se encuentra en el template ./public/index.html
       }),
   
       /* Creacion de nueva instancia par añadir los elemento en ete caso los elementos CSS */
       new MiniCssExtractPlugin({
         filename: 'assets/[name].[contenthash].css'//Permite agregar el arcjivo CSS al assets de la
                                                    //carpeta /dist tenoendo en vuenta la version del 
                                                    //build obtenida con [contenthash]
       }),
   
       /*  Creacion de una nueva instancia para poder realizar la copia de elementos (archivos, carpetas)*/
       new CopyPlugin({
         patterns: [//Se crea un arreglo en el cual se le pasa los elementos que se van a utilizar
           {//Se crea un objeto en el cual se tienen 2 elementos 
             //1. Desde donde se van a mover los elementos (__dirname permite saber donde esta ubicado)
             from: path.resolve(__dirname, "src", "assets/images"),
             //2. Hacia donde se van a mover los elementos 
             to: "assets/images"
           }
         ]
       }),
   
       /* Creacion de una nueva instancia para trabajar con variables de entorno */
       new Dotenv(),
     ],
   

   }