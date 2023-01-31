import Template from '@templates/Template.js';
/* Se importa los estilos del proyecto para poderlos utilizar */
import '@styles/main.css';

/* Se importa el archivo en donde se hacen alagunos cambios a los estilos
   que ya estaban establecidos por defecto  */
   import '@styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
