/* Importamos el hook 'useState' desde React para manejar el estado dentro del componente. */
import { useState } from 'react';
/* Importamos el archivo css para darle estilo a este componente */

import './styles/imc.css';

/*Importamos los componentes necesarios para el ingreso y envío de datos. También para mostrar una alerta */
import { Card, Button, Form, InputGroup, Alert } from 'react-bootstrap'
/* Importamos el componente Resultado para mostrar el imc del usuario */
import Resultado from './Resultado';
/* Importamos el componente Sugerencia para mostrar la sugerencia según el nivel de peso */
import Sugerencia from './Sugerencia';

/* Componente principal Imc que maneja la lógica para calcular el IMC y mostrar los resultados y sugerencias */
function Imc() {
    /* Declaración de variables de estados */

    /* Almacena el nombre ingresado de tipo string */
    const [nombre, setNombre] = useState('');
    /* Almacena el apellido ingresado de tipo string */
    const [apellido, setApellido] = useState('');
    /* Almacena la altura ingresada de tipo string */
    const [altura, setAltura] = useState('');
    /* Almacena el peso ingresado de tipo string*/
    const [peso, setPeso] = useState('');
    /* Almacena el nivel de peso  de tipo string */
    const [nivelPeso, setNivelPeso] = useState('');
    /* Almacena el resultado del imc. Es null  */
    const [imc, setImc] = useState(null);
    /* Indica si el imc ha sido calculado. Es de tipo boolean */
    const [resultado, setResultado] = useState(false);
    /* Indica si la sugerencia debe ser mostrada. Es de tipo boolean */
    const [sugerencia, setSugerencia] = useState(false); 
    /* Almacena la alerta que se mostrará si no se ingresan datos válidos */
    const [alert, setAlert] = useState('');

    /* Función para calcular el imc según la altura y peso del usuario */
    const calcularImc = () => {
        /* Convierte la altura ingresada a un número float y lo almacena en otra variable */
        const alturaFloat = parseFloat(altura); 
        /* Convierte la altura(float) a metros */
        const alturaMetros = alturaFloat / 100;
        /* Convierte el peso ingresado a un número float y lo almacena en otra variable */
        const pesoFloat = parseFloat(peso);

        /* Valida que los valores de altura y peso sean números validos */
        if (!isNaN(alturaMetros) && !isNaN(pesoFloat)) {
            /* Calcula el imc con una formula y el resultado tendrá dos decimales */
            const resultadoImc = (pesoFloat / (alturaMetros * alturaMetros)).toFixed(2);
            /* Se asigna el 'resultadoImc' a la variable de estado 'imc', con el set */
            setImc(resultadoImc);

            /* Se asigna el nivel de peso según el resultado del imc */
            if (resultadoImc < 18.5) {
                setNivelPeso('Bajo peso');
            } else if (resultadoImc >= 18.5 && resultadoImc <= 24.9) {
                setNivelPeso('Saludable');
            } else if (resultadoImc >= 25.0 && resultadoImc <= 29.9) {
                setNivelPeso('Sobrepeso');
            } else {
                setNivelPeso('Obesidad');
            }
            /* Se establece el 'resultado' en true para que se pueda mostrar */
            setResultado(true);
            /* Se oculta la sugerencia*/
            setSugerencia(false);
            setAlert('');
        } else {
            /* Se ejecuta cuando los valores no son números */ 
            /* Se establece el 'resultado' en false para que no se muestre nada */
            setResultado(false);
            //alert("Ingresa valores validos");
            setAlert("Ingresa valores validos");
        }
    };
    /* Función para reiniciar el formulario y restablecer los estados */
    const reiniciar = () => {
        setNombre('');
        setApellido('');
        setAltura('');
        setPeso('');
        setNivelPeso('');
        setImc(null);
        setResultado(false);
        setSugerencia(false);
        setAlert('');
    };

    /* Función para que muestre las sugerencias sólo si se ha calculado el imc */
    const mostrarSugerencia = () => {
        /* Si el imc ya fue calculado */
        if (resultado) {
            /* Se establece en true a 'sugerencia' para que se pueda mostrar */
            setSugerencia(true);
        }else{
            /* Si no fue calculado muestra una alerta */
            /* Se asigna a 'alerta' un mensaje */
            setAlert("Calcula tu IMC para mostrar tu sugerencia");
        }
    }

    return (
        <>  
            {/* Contenedor principal */}
            <div className="contenedor1">
                {/* Titulo de la página */}
                <h1 className='h1' >Calculadora de Indice de Masa Corporal (IMC)</h1>
                {/* Contiene el formulario */}
                <Card className="contenedor2">
                    <Card.Body>
                        <Form className='formulario' action="" method="dialog">
                            <div className="grupo">
                                <Form.Label>Ingresa tus datos para calcular tu IMC</Form.Label>
                                <br />
                                <InputGroup className="mb-3">
                                    {/* Input para el nombre */}
                                    <InputGroup.Text>Nombre:</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre" required
                                        /* El valor actual del campo de texto se vincula al estado 'nombre' */
                                        value={nombre}
                                        /* Cuando se cambia el valor del input, setNombre toma el valor actual del input  */
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                    {/* Input para el apellido */}
                                    <InputGroup.Text>Apellido:</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Apellido" required
                                        /* El valor actual del campo de texto se vincula al estado 'apellido' */
                                        value={apellido}
                                        /* Cuando se cambia el valor del input, setApellido captura el valor actual del input */
                                        onChange={(e) => setApellido(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                            <div className="grupo">
                                <InputGroup className="mb-3">
                                    {/* Input para la altura */}
                                    <InputGroup.Text>Altura:</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="cm" required min="0" max="3"
                                        /* El valor actual del campo de texto se vincula al estado 'altura' */
                                        value={altura}
                                        /* Cuando se cambia el valor del input, setAltura captura el valor actual del input  */
                                        onChange={(e) => setAltura(e.target.value)}
                                    />
                                    <InputGroup.Text>cm</InputGroup.Text>
                                </InputGroup>
                            </div>
                            <div className="grupo">
                                <InputGroup className="mb-3">
                                    {/* Input para el peso */}
                                    <InputGroup.Text>Peso:</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Kg" required min="0" max="3"
                                        /* El valor actual del campo de texto se vincula al estado 'peso' */
                                        value={peso}
                                        /* Cuando se cambia el valor del input, setPeso toma el valor actual del input  */
                                        onChange={(e) => setPeso(e.target.value)}
                                    />
                                    <InputGroup.Text>kg</InputGroup.Text>
                                </InputGroup>
                            </div>

                            {/* Botón para calcular el IMC */}
                            <Button variant="success" onClick={calcularImc}>Calcular IMC</Button>
                            {/* Botón para mostrar la sugerencia */}
                            <Button variant="success" onClick={mostrarSugerencia}>Sugerencias</Button>
                            {/* Imagen que actúa como botón para resetear los valores */}
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '11vh' }}>
                            <img src="./images/reinicio.png"
                                alt="imagen"
                                style={{ cursor: 'pointer', width: '50px', height: '50px' }}
                                onClick={reiniciar}
                            />
                            </div>
                            
                            {/* Dependiendo del estado de 'alert' se renderiza el componente Alert de bootstrap */}
                            {alert && (
                                <Alert variant="success" className="mt-3">
                                    {alert}
                                </Alert>
                            )}

                            {/* Dependiendo del estado de 'resultado' y 'sugerencia' se renderiza los componentes Resultado y Sugerencia */}
                            {resultado && !sugerencia ? (
                                <Resultado nombre={nombre} apellido={apellido} imc={imc} nivelPeso={nivelPeso} />
                            ) : sugerencia ? (
                                <Sugerencia nivelPeso={nivelPeso} />
                            ) : null}
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

/* Exportamos el componente Imc para que pueda ser utilizado en otras partes del proyecto */
export default Imc;