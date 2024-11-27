/* Se importa los componentes Routes y Route que permiten la definición de las rutas en la aplicación, es decir, sirve para definir el enrutamiento */
import { Routes, Route } from 'react-router-dom';

/* Importación de los componentes que se mostrarán en las distintas rutas */
/* Se importa el componente ErrorPage que se usará para cuando la URL no coincide con ninguna ruta definida */
import ErrorPage from './components/ErrorPage';
/* Se importa el componente que muestra la página de inicio */
import Home from './components/Home';
/* Se importa el componente Layout que actúa como contenedor para otras páginas */
import Layout from './components/Layout';
/* Se importa el componente AboutUs que nos muestra la información de los integrantes del proyecto */
import AboutUs from './components/AboutUs';
/* Se importa el componente DesafioMatematico para mostrar el juego de desafio matematico */
import DesafioMatematico from './components/DesafioMatematico/ProyectoReact';
/* Se importa Team que es un archivo JSON que contiene información sobre los integrantes del proyecto */
import Team from "./data/Collaborators.json";
/* Se importa el componente BilleterasVirtuales para mostrar su página para la gestión de billeteras */
import BilleterasVirtuales from './components/BilleterasVirtuales/BilleterasVirtuales';
/* Se importa el componente IMC para mostrar su contenido y calcular el imc */
import Imc from './components/Imc/Imc';
/* Se importa el componente JuegoPhaser que contiene el juego de meteoritos */
import JuegoPhaser from './components/JuegoPhaser/JuegoPhaser';
/* Se importa el componente Juego que nos servirá para mostrar el juego del tateti */
import Juego from './components/JuegoTateti/Juego'

import Projects from './components/Projects'

import repositorios from './data/Projects.json'


/*El componente App sirve para estructurar la aplicación. Aqui se configura, gestionan y organizan los demas componentes que conforman la interfaz de usuario de la aplicación.
Su rol principal es organizar y renderizar la interfaz de usuario y gestiona el enrutamiento con React Router, mostrando diferentes componentes, basados en la URL, en los lugares adecuados de la interfaz.*/

function App() {
  //<div className='container'></div>    Si pongo esto en el return la pagina no se ve completa

  /* Renderiza el componente Routes que gestiona las rutas */
  return (
    /*El componente Routes actúa como un contenedor para todas las rutas definidas en el proyecto */
    <Routes>
      {/* Ruta contenedora que usa el Layout para envolver todas las sub-rutas/sub-páginas, es decir, maneja las rutas anidadas*/}
      {/* El path es la URL para que se renderice el componente asociado */}
      {/* Element nos especifica el componente que se va a renderizar segun el path*/}
      {/* El path="/" es la ruta base de la aplicación */}
      <Route path="/" element={<Layout />}>

        {/* Ruta inicial que renderiza el componente Home */}
        {/* El index element se utiliza para definir qué componente debe renderizarse por defecto */}
        <Route index element={<Home />} />
        {/* Ruta que muestra el componente AboutUs y se pasa una propiedad(prop) llamada team cuyo valor es Team que incluye la información de los colaboradores */}
        <Route path="/aboutUs" element={<AboutUs team= {Team} />} />
        {/* Ruta para el desafío matemático */}
        <Route path="/desafioMatematico" element={<DesafioMatematico />} />
        {/* Ruta para el componente de billeteras virtuales */}
        <Route path="/billeterasVirtuales" element={<BilleterasVirtuales />} />
         {/* Ruta para el cálculo del Índice de Masa Corporal (IMC) */}
        <Route path="/imc" element={<Imc />} />
        {/* Ruta para el juego Phaser */}
        <Route path='/juegoPhaser' element={<JuegoPhaser />} />
        {/* Ruta para el juego de Tateti */}
        <Route path='/juegoTateti' element={<Juego />} />
        {/* Ruta para manejar errores, muestra una página de error si la ruta no es válida */}
        <Route path='/projects' element={<Projects proyectos= {repositorios} />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

/* Exportamos el componente App para que pueda ser utilizado en otras partes del proyecto */
export default App;

