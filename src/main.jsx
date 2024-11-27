/* Importamos el método createRoot para inicializar el proyecto/la aplicacion React.
*Permite crear un contenedor para montar la aplicación React en el DOM */
import { createRoot } from 'react-dom/client'
/* Importamos el componente BrowserRouter para gestionar las rutas de la aplicacion */
/* Todo lo que esté dentro de BrowserRouter puede hacer uso de React Router (como el componente Routes y Route para definir rutas).*/
import { BrowserRouter } from 'react-router-dom'
/* Importamos Bootstrap para aplicar estilos en la aplicación. Esto permite usar clases y componentes de Bootstrap */
import 'bootstrap/dist/css/bootstrap.css'
/* Importa el componente principal de la aplicacion, App */
import App from './App.jsx'

/* Creamos el root de la aplicación y se va a renderiza en el DOM. El elemento con el id 'root' en el HTML es el contenedor donde React montará la aplicacion, y se renderiza el componente <App /> envuelto en <BrowserRouter> para habilitar la navegación. */

createRoot(document.getElementById('root')).render(

    /* Contiene a toda la aplicación para habilitar las rutas de navegación. Esto permitirá que la aplicación maneje rutas de manera eficiente sin recargar la página. */
    <BrowserRouter>
        {/* Aquí se está renderizando el componente App, que es el componente raíz de la aplicación React */}
        <App />
    </BrowserRouter>
)
