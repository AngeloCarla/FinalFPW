import './styles/Inicio.css';
import Tablero from './Tablero';
import { useState } from 'react';
import {ListGroup} from 'react-bootstrap';

function Inicio({comenzarJuego}) {
  //En este useState se controla que el juego este iniciado o no.
  const [juegoComenzado, setJuegoComenzado] = useState(false);

  return (

    <div className="containerInicio">
      {juegoComenzado ? (
        <Tablero />
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="container text-center text-bg-danger p-3">
            <h1>¡BIENVENIDO AL TATETI!</h1>
          </div>

          <ul className=" container text-center mt-md-4">
            <ListGroup>
              <ListGroup.Item variant="light"> El objetivo de cada jugador es hacer una linea de tres, ya sea horizontal, vertical o diagonal </ListGroup.Item>
              <ListGroup.Item variant="light"> Cada click es un turno intercalado de cada jugador, suerte!</ListGroup.Item>
            </ListGroup>
          </ul>

          <div className="container text-center mt-md-5">
              <button className='buttonStart' onClick={() => {setJuegoComenzado(true);comenzarJuego()}}>Comenzar Juego</button>
          </div>
        </div>
      )}
    </div>
  );
}
//Exportamos el componente.
export default Inicio;
