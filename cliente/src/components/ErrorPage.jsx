/* Importamos el componente Card de la librería react-bootstrap para mostrar un mensaje del error */
import Card from 'react-bootstrap/Card';

/* Componente que representa la página de error */
function ErrorPage(){

    /* Retornamos lo que es la parte visual del componente ErrorPage */
    return (
        /* Contenedor para centrar la tarjeta */
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            {/* Centrar el texto, darle  un tamaño y color al Card*/}
            <Card className="text-center" style={{ width: '24rem' }} bg="dark" text="white" key="Dark" >
                <Card.Body>
                    { /* Titulo del Card  */}
                    <Card.Title as ='h5'> ¡ERROR! </Card.Title>
                    <Card.Text as='h6'> Ocurrió un error. Por favor, asegurar de ingresar correctamente la direccion.  </Card.Text>
                </Card.Body>
            </Card>
        </div> 
    );
}

/* Exportamos el componente ErrorPage para que pueda ser utilizado en otras partes del proyecto */
export default ErrorPage;