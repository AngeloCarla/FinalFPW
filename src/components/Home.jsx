/* Importamos el archivo css para darle estilo a este componente */ 
import '../styles/home.css'

/* Componente, Home, que representa la página de inicio de la página */
function Home(){

    /* Retornamos lo que es la parte visual de la página Home, nuestra página de inicio */
    return (
        /* Para agrupar varios elementos */
        <>
        
        {/* Contenedor del video de fondo de la página Home, la página de inicio*/}
            <div className='video-container'>
                {/* El vídeo se reproduce en bucle y sin sonido */}
                <video autoPlay muted loop className='background-video'>
                    {/* Dirección del video de fondo */}
                    <source src="/videos/video-fondo2.mp4" type="video/mp4"></source>
                </video>
                {/* Capa de superposición para agregar efectos visuales encima del video */}
                <div className="overlay"></div>
                {/* Contenido principal que aparece encima del video de fondo */}
                <div className="content">
                    {/* Título de bienvenida */}
                    <h1 className="title">Bienvenido</h1>
                    {/* Descripción de la página*/}
                    <p className="description">Bienvenido/a a la página oficial del Grupo 1. Explora nuestro sitio para conocer más sobre nuestros trabajos y únete a nosotros en este emocionante viaje.</p>
                </div>
            </div>
            
        </>
    );
}

/* Exportamos el componente Home para que pueda ser utilizado en otras partes del proyecto */
export default Home;