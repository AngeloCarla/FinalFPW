/* Importamos el archivo css para darle estilo al componente About Us */
import '../styles/AboutUs.css'
/* Importamos el componente Card de la librería react-bootstrap para estructurar la presentación de 
cada integrante del equipo */
import Card from 'react-bootstrap/Card';

/* Componente que representa la página About Us del proyecto y recibe un prop que representa una lista de los datos de los miembros del equipo */
function AboutUs({ team }) {

    /* Retornamos lo que es la parte visual del componente AboutUs */
    return (
        /* Seccion principal que agrupa los títulos y las tarjetas de los integrantes del equipo.*/
        <section className='AboutUs'>
            {/* Sección con los títulos de presentación */}
            <section className="seccion1">
                {/* Títulos de la página */}
                <h1>Conoce a Nuestro Equipo</h1>
                <h2>Colaboradores</h2>
            </section>
            {/* Sección para los integrantes del equipo */}
            <section className="team">
                {/* Mapea a través de la lista 'team' para mostrar la información de cada integrante */}
                {team.map((t, idx) => (
                    <>  
                        {/* Usamos el componente Card para cada integrante */}
                        <Card className="member" key={idx}>
                            <Card.Body>
                                {/* Se muestra la imagen del integrante, nombre y su descripción */}
                                <Card.Img variant="top" src={t.image} alt={t.name} />
                                <Card.Title>{t.name}</Card.Title>
                                <br />
                                <Card.Text>{t.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            {/* Enlace al perfil de GitHub del integrante */}
                            <Card.Link href={t.github}>{t.githubName}</Card.Link>
                            </Card.Footer>
                        </Card>
                    </>
                ))}
            </section>
        </section>
    );
}

/* Exportamos el componente AboutUs para que pueda ser utilizado en otras partes del proyecto */
export default AboutUs;