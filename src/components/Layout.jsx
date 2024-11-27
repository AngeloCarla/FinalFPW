/* Importamos el componente 'Outlet' de 'react-router-dom' para renderizar rutas anidadas */
/* Outlet se comporta como un "marcador de posición" para las rutas anidadas porque está esperando que se le pase un componente para que se muestre allí */
import { Outlet } from 'react-router-dom';
/* Se importa el Header que se usará para mostrar la cabecera de todas las páginas, la barra de navegación de las páginas */
import Header from './Header';
/* Se importa el Footer que se usará para mostrar el pie de página de todas las páginas */
import Footer from './Footer';

/* Componente Layout para estructurar otros componentes */
function Layout() {

    /* Retornamos lo que es la parte visual del componente Layout*/
    return (
        <>  
            {/* Contiene el componente Header */}
            <header>
                {/* Componente Header que contiene la barra de navegación */}
                <Header />
            </header>

            {/* Contenedor principal de la página. Se renderizará el contenido principal de las rutas anidadas (subpaginas dentro de una página principal) usando el componente 'Outlet' */}
            <main>
                {/* Dentro de este espacio es donde se renderizan los componentes correspondientes a cada ruta */}
                <Outlet></Outlet>
            </main>
            
            {/* Contiene el componente Footer */}
            <footer>
                {/* Componente Footer que contiene el pie de página */}
                <Footer />
            </footer>
        </>
    )

}

/* Exportamos el componente Layout para que pueda ser utilizado en otras partes del proyecto */
export default Layout;